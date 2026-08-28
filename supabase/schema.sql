-- Wedding invitation — full Supabase schema.
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
--
-- Replaces the old rsvp_responses-only setup: guests, RSVP requests, and
-- admin login/roles now all live in Supabase instead of local files, so the
-- app behaves the same whether it's running as a server (`npm run dev` /
-- `npm start`) or built as the static GitHub Pages export.
--
-- After running this, create the admin/viewer accounts with
-- scripts/seed-supabase-users.mjs (see README "Database Setup (Supabase)").

drop table if exists rsvp_responses;
-- Some Supabase projects come with a starter `profiles` table from the
-- dashboard's quickstart template — drop it so ours (below) can be created
-- with the exact columns this app needs.
drop table if exists profiles cascade;

-- Maps a Supabase Auth user to an app role + display username. Only the
-- service-role seed script writes to this table — regular sign-ins only
-- ever read it. Login is by plain username/password (see src/lib/
-- supabaseAuth.ts), not email — Supabase Auth still requires an email
-- under the hood, so each user gets a hidden synthetic one
-- (`<username>@wedding.local`) that's never shown in the UI.
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  role text not null check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Authenticated can read profiles"
  on profiles for select
  to authenticated
  using (true);

create table guests (
  id text primary key,
  name text not null,
  phone text not null default '',
  side text not null check (side in ('Nhà trai', 'Nhà gái')),
  "group" text not null,
  party_size int not null default 1,
  status text not null check (status in ('Chưa mời', 'Đã mời', 'Sẽ đến', 'Không đến')),
  table_number int,
  note text not null default '',
  source text not null check (source in ('MANUAL', 'IMPORT_EXCEL', 'RSVP')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table guests enable row level security;

-- Any signed-in user (admin or viewer) can manage the guest list — same as
-- the old /api/guests route, which never restricted this to admins.
create policy "Authenticated can manage guests"
  on guests for all
  to authenticated
  using (true)
  with check (true);

create table rsvp_requests (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  side text not null check (side in ('Nhà trai', 'Nhà gái')),
  companion text not null default '',
  message text not null default '',
  attending boolean not null,
  status text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  submitted_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by text,
  linked_guest_id text references guests(id) on delete set null,
  creation_mode text check (creation_mode in ('new', 'link')),
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table rsvp_requests enable row level security;

-- Public RSVP submission — anyone can insert a pending request, but can't
-- read anything back (no anon select policy) or set it to anything but
-- PENDING.
create policy "Anyone can submit an RSVP"
  on rsvp_requests for insert
  to anon
  with check (status = 'PENDING');

create policy "Authenticated can read RSVP requests"
  on rsvp_requests for select
  to authenticated
  using (true);

-- Approve/reject is admin-only — same restriction src/proxy.ts used to
-- enforce for POST /api/rsvp-requests/:id/{approve,reject}.
create policy "Admins can update RSVP requests"
  on rsvp_requests for update
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (true);
