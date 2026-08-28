'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getSessionWithRole, type SessionInfo } from '@/lib/supabaseAuth'

export type { SessionInfo }

export function useSession() {
  const [session, setSession] = useState<SessionInfo | null | undefined>(undefined)

  useEffect(() => {
    if (!supabase) {
      setSession(null)
      return
    }

    let cancelled = false
    getSessionWithRole().then((s) => {
      if (!cancelled) setSession(s)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      getSessionWithRole().then((s) => {
        if (!cancelled) setSession(s)
      })
    })

    return () => {
      cancelled = true
      subscription.subscription.unsubscribe()
    }
  }, [])

  return session // undefined = loading, null = signed out
}
