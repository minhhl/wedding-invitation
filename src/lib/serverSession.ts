import 'server-only'
import { cookies } from 'next/headers'
import { Session, SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth'

/** Only usable in Server Components / Route Handlers — not in proxy.ts. */
export async function getServerSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value)
}
