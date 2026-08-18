import 'server-only'
import crypto from 'node:crypto'

export const SESSION_COOKIE_NAME = 'gm_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export const USER_ROLES = ['admin', 'viewer'] as const
export type UserRole = (typeof USER_ROLES)[number]

export interface Session {
  username: string
  role: UserRole
  exp: number
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not set')
  return secret
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
}

export function createSessionToken(session: Omit<Session, 'exp'>): string {
  const payload = Buffer.from(
    JSON.stringify({ ...session, exp: Date.now() + SESSION_TTL_MS })
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | undefined | null): Session | null {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expected = sign(payload)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Session
    if (typeof session.exp !== 'number' || session.exp < Date.now()) return null
    if (!USER_ROLES.includes(session.role)) return null
    return session
  } catch {
    return null
  }
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

interface AuthUser {
  username: string
  password: string
  role: UserRole
}

/** AUTH_USERS is a JSON array: [{"username":"...","password":"...","role":"admin"|"viewer"}, ...] */
function loadUsers(): AuthUser[] {
  const raw = process.env.AUTH_USERS
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (u): u is AuthUser =>
        typeof u?.username === 'string' &&
        typeof u?.password === 'string' &&
        (u?.role === 'admin' || u?.role === 'viewer')
    )
  } catch {
    return []
  }
}

/** Checks username/password against every account configured via AUTH_USERS. */
export function checkCredentials(username: string, password: string): UserRole | null {
  for (const user of loadUsers()) {
    if (
      timingSafeStringEqual(username, user.username) &&
      timingSafeStringEqual(password, user.password)
    ) {
      return user.role
    }
  }
  return null
}
