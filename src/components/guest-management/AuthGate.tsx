'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getSessionWithRole } from '@/lib/supabaseAuth'

/**
 * There's no server to protect /guest-management/* — the static export has
 * none, and even `npm run dev`/`start` skip real route protection in favor
 * of one code path for both. Real enforcement lives in the Supabase RLS
 * policies (see supabase/schema.sql); this only redirects signed-out
 * visitors away from the UI.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    getSessionWithRole().then((session) => {
      if (cancelled) return
      if (!session) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`)
        return
      }
      setReady(true)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!ready) return null

  return <>{children}</>
}
