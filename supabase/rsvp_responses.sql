-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query) once
-- per project. Matches the "Database Setup (Supabase)" section in README.md —
-- only needed for the static GitHub Pages export, where the RSVP form inserts
-- straight into Supabase from the browser using the anon key.

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('Nhà trai', 'Nhà gái')),
  companion TEXT,
  message TEXT,
  attending BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- The anon key is public, so only allow it to insert — not read/update/delete.
-- View submissions from the Supabase dashboard (Table Editor) instead.
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public RSVP submissions"
  ON rsvp_responses FOR INSERT
  TO anon
  WITH CHECK (true);
