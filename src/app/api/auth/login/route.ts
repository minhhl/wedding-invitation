import { NextResponse } from 'next/server'
import { checkCredentials, createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!username || !password) {
    return NextResponse.json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' }, { status: 400 })
  }

  const role = checkCredentials(username, password)
  if (!role) {
    return NextResponse.json({ error: 'Sai tên đăng nhập hoặc mật khẩu.' }, { status: 401 })
  }

  const token = createSessionToken({ username, role })
  const response = NextResponse.json({ username, role })
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
