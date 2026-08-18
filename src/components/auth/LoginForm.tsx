'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  checkStaticCredentials,
  getStaticSession,
  IS_STATIC_EXPORT,
  setStaticSession,
} from '@/lib/staticAuth'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // On a normal server, proxy.ts already redirects a signed-in visitor away
  // from /login server-side. The static export has no proxy, so do the same
  // check client-side there.
  useEffect(() => {
    if (IS_STATIC_EXPORT && getStaticSession()) {
      router.replace(searchParams.get('next') || '/guest-management')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (IS_STATIC_EXPORT) {
      const session = checkStaticCredentials(username, password)
      if (!session) {
        setError('Sai tên đăng nhập hoặc mật khẩu.')
        setLoading(false)
        return
      }
      setStaticSession(session)
      router.push(searchParams.get('next') || '/guest-management')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Đăng nhập thất bại.')
        return
      }
      const next = searchParams.get('next') || '/guest-management'
      router.push(next)
      router.refresh()
    } catch {
      setError('Không thể kết nối máy chủ.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="text-lg font-semibold text-zinc-50">Đăng nhập quản trị</h1>
          <p className="text-sm text-zinc-400">Truy cập Quản lý khách mời &amp; RSVP</p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">Tên đăng nhập</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">Mật khẩu</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  )
}
