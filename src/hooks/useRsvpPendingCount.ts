'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

/** null = still loading. Used for the nav badge and the pending-RSVP banner. */
export function useRsvpPendingCount(): number | null {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    if (!supabase) {
      setCount(0)
      return
    }

    let cancelled = false
    supabase
      .from('rsvp_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'PENDING')
      .then(({ count, error }) => {
        if (cancelled) return
        setCount(error ? 0 : (count ?? 0))
      })
    return () => {
      cancelled = true
    }
  }, [])

  return count
}
