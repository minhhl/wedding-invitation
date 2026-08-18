'use client'

import { useEffect, useRef, useState } from 'react'
import { useGuestStore } from '@/store/guestStore'
import { Guest } from '@/types/guest'

const SAVE_DEBOUNCE_MS = 800

export type SyncStatus = 'loading' | 'idle' | 'saving' | 'saved' | 'error'

/**
 * src/data/guest-list.xlsx is the source of truth: on mount, load it and
 * overwrite the local store; after that, debounce-save every store change
 * back to the file via /api/guests. localStorage (handled by the store's
 * persist middleware) still acts as an instant offline cache.
 *
 * `lastSyncedRef` tracks the exact guests array reference last read from or
 * written to the file. The save effect only fires when the live `guests`
 * reference has actually diverged from it — a plain "skip the first save"
 * boolean flag is not safe here because React Strict Mode double-invokes
 * effects in development, and a stray extra invocation can consume the flag
 * before the real load finishes, letting an initial (possibly stale/empty)
 * state get saved over the file.
 */
export function useGuestServerSync(): SyncStatus {
  const guests = useGuestStore((s) => s.guests)
  const setGuests = useGuestStore((s) => s.setGuests)
  const hasHydrated = useGuestStore((s) => s.hasHydrated)

  const [status, setStatus] = useState<SyncStatus>('loading')
  const lastSyncedRef = useRef<Guest[] | null>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!hasHydrated) return
    let cancelled = false

    fetch('/api/guests')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('load failed'))))
      .then((data: { guests?: Guest[] }) => {
        if (cancelled) return
        if (Array.isArray(data.guests)) {
          setGuests(data.guests)
          // Read back the store's own (normalized) array reference, not the
          // raw fetched one — setGuests may return a new array instance.
          lastSyncedRef.current = useGuestStore.getState().guests
        }
        setStatus('idle')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated])

  useEffect(() => {
    if (status === 'loading') return
    if (guests === lastSyncedRef.current) return

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      setStatus('saving')
      fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests }),
      })
        .then((res) => {
          if (res.ok) lastSyncedRef.current = guests
          setStatus(res.ok ? 'saved' : 'error')
        })
        .catch(() => setStatus('error'))
    }, SAVE_DEBOUNCE_MS)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [guests, status])

  return status
}
