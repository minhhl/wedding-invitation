'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getStaticSession, IS_STATIC_EXPORT } from '@/lib/staticAuth'

/**
 * On a normal server, src/proxy.ts protects /guest-management/* before the
 * page ever renders. The static export has no server to run that on, so this
 * does the same check client-side, purely against localStorage. It's a no-op
 * (renders immediately) when not statically exported — proxy.ts already
 * handled it server-side by the time this would mount.
 */
export function StaticAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(!IS_STATIC_EXPORT)

  useEffect(() => {
    if (!IS_STATIC_EXPORT) return
    if (!getStaticSession()) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
      return
    }
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!ready) return null

  return <>{children}</>
}
