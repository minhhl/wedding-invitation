'use client'

import { useEffect, useState } from 'react'
import { RsvpRequest } from '@/types/rsvp'

/** null = still loading. Used for the nav badge and the pending-RSVP banner. */
export function useRsvpPendingCount(): number | null {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/rsvp-requests')
      .then((res) => (res.ok ? res.json() : { requests: [] }))
      .then((data: { requests: RsvpRequest[] }) => {
        if (cancelled) return
        setCount(data.requests.filter((r) => r.status === 'PENDING').length)
      })
      .catch(() => {
        if (!cancelled) setCount(0)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return count
}
