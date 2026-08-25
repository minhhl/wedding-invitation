'use client'

import { useCallback, useEffect, useState } from 'react'
import { RsvpRequest } from '@/types/rsvp'

export type ApprovePayload =
  | { mode: 'new'; side: string; group: string; totalGuests: number; table?: number | null }
  | { mode: 'link'; guestId: string; totalGuests: number; table?: number | null }

export function useRsvpRequests() {
  const [requests, setRequests] = useState<RsvpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/rsvp-requests')
      if (!res.ok) throw new Error('Không tải được danh sách RSVP.')
      const data: { requests: RsvpRequest[] } = await res.json()
      setRequests(data.requests)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  async function approve(id: string, payload: ApprovePayload): Promise<{ ok: boolean; error?: string }> {
    const res = await fetch(`/api/rsvp-requests/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.error ?? 'Duyệt RSVP thất bại.' }
    await reload()
    return { ok: true }
  }

  async function reject(id: string, reason: string): Promise<{ ok: boolean; error?: string }> {
    const res = await fetch(`/api/rsvp-requests/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.error ?? 'Từ chối RSVP thất bại.' }
    await reload()
    return { ok: true }
  }

  return { requests, loading, error, reload, approve, reject }
}
