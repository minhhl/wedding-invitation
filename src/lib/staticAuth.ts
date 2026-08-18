// Client-side-only "auth" used exclusively by the GitHub Pages static export,
// which has no server to verify a password against. This is NOT real
// security: NEXT_PUBLIC_STATIC_AUTH_USERS is baked into the public JS bundle,
// so anyone can read the credentials via view-source. It only exists so
// /login and /guest-management aren't dead links on that deployment — the
// real, server-verified login (src/lib/auth.ts + src/proxy.ts) is what
// protects the app when it's actually run as a server (`npm run dev`/`start`).

export const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

const STORAGE_KEY = 'static-auth-session'

export type StaticRole = 'admin' | 'viewer'

export interface StaticSession {
  username: string
  role: StaticRole
}

interface StaticAuthUser extends StaticSession {
  password: string
}

function loadStaticUsers(): StaticAuthUser[] {
  try {
    const raw = process.env.NEXT_PUBLIC_STATIC_AUTH_USERS
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (u): u is StaticAuthUser =>
        typeof u?.username === 'string' &&
        typeof u?.password === 'string' &&
        (u?.role === 'admin' || u?.role === 'viewer')
    )
  } catch {
    return []
  }
}

export function checkStaticCredentials(username: string, password: string): StaticSession | null {
  const user = loadStaticUsers().find((u) => u.username === username && u.password === password)
  return user ? { username: user.username, role: user.role } : null
}

export function getStaticSession(): StaticSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StaticSession) : null
  } catch {
    return null
  }
}

export function setStaticSession(session: StaticSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearStaticSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}
