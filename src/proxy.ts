import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth'

export const config = {
  matcher: ['/guest-management/:path*', '/login', '/api/guests/:path*', '/api/rsvp-requests/:path*'],
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value)

  if (pathname === '/login') {
    // Already signed in — no need to show the login form again.
    if (session) return NextResponse.redirect(new URL('/guest-management', request.url))
    return NextResponse.next()
  }

  const isApi = pathname.startsWith('/api/')

  if (!session) {
    if (isApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Approving/rejecting RSVP requests is an admin-only action.
  const isRsvpMutation =
    pathname.startsWith('/api/rsvp-requests/') &&
    (pathname.endsWith('/approve') || pathname.endsWith('/reject'))
  if (isRsvpMutation && session.role !== 'admin') {
    return NextResponse.json(
      { error: 'Chỉ Admin mới có quyền thực hiện thao tác này.' },
      { status: 403 }
    )
  }

  return NextResponse.next()
}
