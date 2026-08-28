'use client'

import { useEffect, useRef, useState } from 'react'
import { useGuestStore } from '@/store/guestStore'
import { Guest } from '@/types/guest'
import { supabase } from '@/lib/supabase'
import { guestToRow, rowToGuest, type GuestRow } from '@/lib/guestSupabaseRows'

const SAVE_DEBOUNCE_MS = 800

export type SyncStatus = 'loading' | 'idle' | 'saving' | 'saved' | 'error'

/**
 * The `guests` Supabase table is the source of truth: on mount, load it and
 * overwrite the local store; after that, debounce-save every store change
 * back to Supabase. localStorage (handled by the store's persist middleware)
 * still acts as an instant offline cache.
 *
 * `lastSyncedRef` tracks the exact guests array reference last read from or
 * written to Supabase. The save effect only fires when the live `guests`
 * reference has actually diverged from it — a plain "skip the first save"
 * boolean flag is not safe here because React Strict Mode double-invokes
 * effects in development, and a stray extra invocation can consume the flag
 * before the real load finishes, letting an initial (possibly stale/empty)
 * state get saved over the table.
 */
export function useGuestServerSync(): SyncStatus {
  const guests = useGuestStore((s) => s.guests)
  const setGuests = useGuestStore((s) => s.setGuests)
  const hasHydrated = useGuestStore((s) => s.hasHydrated)

  const [status, setStatus] = useState<SyncStatus>('loading')
  const lastSyncedRef = useRef<Guest[] | null>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!hasHydrated || !supabase) return
    let cancelled = false

    supabase
      .from('guests')
      .select('*')
      .then(({ data, error }) => {
        if (cancelled) return
        if (!error && data) {
          setGuests((data as GuestRow[]).map(rowToGuest))
          // Read back the store's own (normalized) array reference, not the
          // raw fetched one — setGuests may return a new array instance.
          lastSyncedRef.current = useGuestStore.getState().guests
        }
        setStatus(error ? 'error' : 'idle')
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated])

  useEffect(() => {
    if (status === 'loading' || !supabase) return
    if (guests === lastSyncedRef.current) return

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setStatus('saving')

      const previousIds = new Set((lastSyncedRef.current ?? []).map((g) => g.id))
      const currentIds = new Set(guests.map((g) => g.id))
      const removedIds = [...previousIds].filter((id) => !currentIds.has(id))

      try {
        if (guests.length > 0) {
          const { error } = await supabase!.from('guests').upsert(guests.map(guestToRow))
          if (error) throw error
        }
        if (removedIds.length > 0) {
          const { error } = await supabase!.from('guests').delete().in('id', removedIds)
          if (error) throw error
        }
        lastSyncedRef.current = guests
        setStatus('saved')
      } catch {
        setStatus('error')
      }
    }, SAVE_DEBOUNCE_MS)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [guests, status])

  return status
}
