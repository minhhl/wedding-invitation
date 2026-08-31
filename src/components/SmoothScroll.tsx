'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

// The admin area (Guest Management, RSVP, login) is a dense data tool, not
// the marketing invitation — it should scroll natively/instantly like a
// normal app, not with the eased cinematic feel used on the public pages.
const isAdminRoute = (pathname: string) =>
  pathname.startsWith('/guest-management') || pathname.startsWith('/login')

// In-app browsers (Zalo, Facebook, Instagram, Line, WeChat, TikTok — how
// most guests actually open a shared invitation link) run a stripped-down
// WebView with their own toolbar chrome and touch-event handling. Lenis's
// transform-based virtual scroll fights with that: sections end up
// misaligned/overflowing instead of just looking non-smooth. Native
// scrolling degrades gracefully there, so skip Lenis entirely for them
// rather than risk the broken layout.
const IN_APP_BROWSER_UA = /Zalo|FBAN|FBAV|Instagram|Line\/|MicroMessenger|musical_ly|TikTok/i

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const skipLenis = isAdminRoute(pathname)

  useEffect(() => {
    if (skipLenis) return
    if (IN_APP_BROWSER_UA.test(navigator.userAgent)) return

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.15,
      wheelMultiplier: 1,
    })

    let frameId: number
    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [skipLenis])

  return <>{children}</>
}
