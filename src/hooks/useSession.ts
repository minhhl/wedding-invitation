'use client'

import { useEffect, useState } from 'react'
import type { UserRole } from '@/lib/auth'

export interface SessionInfo {
  username: string
  role: UserRole
}

export function useSession() {
  const [session, setSession] = useState<SessionInfo | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetch('/api/auth/session')
      .then((res) => (res.ok ? res.json() : { session: null }))
      .then((data: { session: SessionInfo | null }) => {
        if (!cancelled) setSession(data.session)
      })
      .catch(() => {
        if (!cancelled) setSession(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return session // undefined = loading, null = signed out
}
