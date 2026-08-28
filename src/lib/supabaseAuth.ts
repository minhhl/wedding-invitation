import { supabase } from '@/lib/supabase'
import type { UserRole } from '@/lib/authRoles'

export interface SessionInfo {
  username: string
  role: UserRole
}

// Login is by plain username/password, but Supabase Auth requires an email
// under the hood — so each account gets a hidden synthetic one that's never
// shown in the UI. Must match the mapping in scripts/seed-supabase-users.mjs.
const EMAIL_DOMAIN = 'wedding.local'

export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@${EMAIL_DOMAIN}`
}

/** Signs in with Supabase Auth (via the synthetic email) and resolves the caller's profile. */
export async function signInWithUsername(
  username: string,
  password: string
): Promise<{ session: SessionInfo | null; error: string | null }> {
  if (!supabase) return { session: null, error: 'Supabase is not configured' }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: usernameToEmail(username),
    password,
  })
  if (error || !data.session) {
    return { session: null, error: 'Sai tên đăng nhập hoặc mật khẩu.' }
  }

  const profile = await fetchProfile(data.session.user.id)
  if (!profile) {
    await supabase.auth.signOut()
    return { session: null, error: 'Tài khoản chưa được cấp quyền truy cập.' }
  }

  return { session: profile, error: null }
}

export async function signOut(): Promise<void> {
  await supabase?.auth.signOut()
}

/** Resolves to null while signed out (or when Supabase isn't configured). */
export async function getSessionWithRole(): Promise<SessionInfo | null> {
  if (!supabase) return null

  const { data } = await supabase.auth.getSession()
  const user = data.session?.user
  if (!user) return null

  return fetchProfile(user.id)
}

async function fetchProfile(userId: string): Promise<SessionInfo | null> {
  const { data } = await supabase!
    .from('profiles')
    .select('username, role')
    .eq('id', userId)
    .maybeSingle()
  return data as SessionInfo | null
}
