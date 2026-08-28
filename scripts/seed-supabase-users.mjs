// One-off script: creates the admin/viewer accounts in Supabase Auth +
// `profiles` (see supabase/schema.sql). Run once per environment, after the
// schema has been applied.
//
// Login is by plain username/password (src/lib/supabaseAuth.ts) — Supabase
// Auth still needs an email under the hood, so each account gets a hidden
// synthetic one (`<username>@wedding.local`), matching the mapping in
// src/lib/supabaseAuth.ts's usernameToEmail().
//
// Usage:
//   1. Add SUPABASE_SECRET_KEY to .env.local (Project Settings → API — this
//      is a secret; never commit it).
//   2. Fill in ACCOUNTS below.
//   3. node --env-file=.env.local scripts/seed-supabase-users.mjs
//   4. Remove SUPABASE_SECRET_KEY from .env.local — nothing else needs it.

import { createClient } from '@supabase/supabase-js'

const EMAIL_DOMAIN = 'wedding.local'

const ACCOUNTS = [
  // { username: 'minh', password: 'change-me', role: 'admin' },
  // { username: 'ngoc', password: 'change-me', role: 'admin' },
  // { username: 'viewer', password: 'change-me', role: 'viewer' },
]

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!url || !secretKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in the environment.')
  process.exit(1)
}

if (ACCOUNTS.length === 0) {
  console.error('ACCOUNTS is empty — fill it in before running this script.')
  process.exit(1)
}

const supabase = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

for (const account of ACCOUNTS) {
  const username = account.username.trim().toLowerCase()
  const email = `${username}@${EMAIL_DOMAIN}`

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: account.password,
    email_confirm: true,
  })

  if (error) {
    console.error(`✗ ${username}: ${error.message}`)
    continue
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: data.user.id, username, role: account.role })

  if (profileError) {
    console.error(`✗ ${username} created but profile insert failed: ${profileError.message}`)
    continue
  }

  console.log(`✓ ${username} (${account.role})`)
}
