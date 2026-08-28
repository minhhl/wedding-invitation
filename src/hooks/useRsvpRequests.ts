'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getSessionWithRole } from '@/lib/supabaseAuth'
import { useGuestStore } from '@/store/guestStore'
import { getTableTotal } from '@/lib/guestTable'
import { Guest, GUEST_SIDES, GUEST_GROUPS, MAX_PARTY_SIZE, TABLE_CAPACITY } from '@/types/guest'
import { RsvpRequest } from '@/types/rsvp'

export type ApprovePayload =
  | { mode: 'new'; side: string; group: string; totalGuests: number; table?: number | null }
  | { mode: 'link'; guestId: string; totalGuests: number; table?: number | null }

interface RsvpRequestRow {
  id: string
  guest_name: string
  side: string
  companion: string
  message: string
  attending: boolean
  status: string
  submitted_at: string
  approved_at: string | null
  approved_by: string | null
  linked_guest_id: string | null
  creation_mode: string | null
  rejection_reason: string | null
  created_at: string
  updated_at: string
}

function rowToRequest(row: RsvpRequestRow): RsvpRequest {
  return {
    id: row.id,
    guestName: row.guest_name,
    side: row.side as RsvpRequest['side'],
    companion: row.companion,
    message: row.message,
    attending: row.attending,
    status: row.status as RsvpRequest['status'],
    submittedAt: row.submitted_at,
    approvedAt: row.approved_at,
    approvedBy: row.approved_by,
    linkedGuestId: row.linked_guest_id,
    creationMode: row.creation_mode as RsvpRequest['creationMode'],
    rejectionReason: row.rejection_reason,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function createGuestId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useRsvpRequests() {
  const [requests, setRequests] = useState<RsvpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    if (!supabase) {
      setError('Supabase chưa được cấu hình.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('rsvp_requests')
      .select('*')
      .order('submitted_at', { ascending: false })
    if (error) {
      setError('Không tải được danh sách RSVP.')
    } else {
      setRequests((data as RsvpRequestRow[]).map(rowToRequest))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  async function approve(id: string, payload: ApprovePayload): Promise<{ ok: boolean; error?: string }> {
    if (!supabase) return { ok: false, error: 'Supabase chưa được cấu hình.' }

    const rsvpRequest = requests.find((r) => r.id === id)
    if (!rsvpRequest) return { ok: false, error: 'Không tìm thấy yêu cầu RSVP.' }
    if (rsvpRequest.status !== 'PENDING') return { ok: false, error: 'Yêu cầu RSVP này đã được xử lý.' }

    const totalGuests = Math.round(payload.totalGuests)
    if (rsvpRequest.attending && (!Number.isFinite(totalGuests) || totalGuests < 1 || totalGuests > MAX_PARTY_SIZE)) {
      return { ok: false, error: 'Vui lòng nhập tổng số khách hợp lệ.' }
    }

    const session = await getSessionWithRole()
    if (!session || session.role !== 'admin') {
      return { ok: false, error: 'Bạn không có quyền thực hiện thao tác này.' }
    }

    const guests = useGuestStore.getState().guests
    const partySize = rsvpRequest.attending ? totalGuests : 1
    const status = rsvpRequest.attending ? ('Sẽ đến' as const) : ('Không đến' as const)
    const table = rsvpRequest.attending && payload.table != null ? Math.round(payload.table) : null

    if (table !== null) {
      const excludeGuestId = payload.mode === 'link' ? payload.guestId : undefined
      const currentTotal = getTableTotal(guests, table, excludeGuestId)
      const combined = currentTotal + partySize
      if (combined > TABLE_CAPACITY) {
        return {
          ok: false,
          error: `⚠ Bàn ${table} hiện có ${currentTotal} khách + RSVP mới ${partySize} khách = ${combined} khách. Vượt giới hạn ${TABLE_CAPACITY}. Vui lòng chọn bàn khác.`,
        }
      }
    }

    let linkedGuestId: string

    if (payload.mode === 'new') {
      if (!(GUEST_SIDES as readonly string[]).includes(payload.side)) {
        return { ok: false, error: 'Vui lòng chọn bên (Nhà trai/Nhà gái).' }
      }
      if (!(GUEST_GROUPS as readonly string[]).includes(payload.group)) {
        return { ok: false, error: 'Vui lòng chọn nhóm khách.' }
      }

      const newGuest: Guest = {
        id: createGuestId(),
        name: rsvpRequest.guestName,
        phone: '',
        side: payload.side as Guest['side'],
        group: payload.group as Guest['group'],
        partySize,
        status,
        table,
        note: [rsvpRequest.companion && `Đi cùng: ${rsvpRequest.companion}`, rsvpRequest.message]
          .filter(Boolean)
          .join(' — '),
        source: 'RSVP',
      }
      useGuestStore.setState((s) => ({ guests: [...s.guests, newGuest] }))
      linkedGuestId = newGuest.id
    } else {
      const existing = guests.find((g) => g.id === payload.guestId)
      if (!existing) return { ok: false, error: 'Không tìm thấy khách mời để liên kết.' }
      useGuestStore.getState().updateGuest(payload.guestId, { status, partySize, table })
      linkedGuestId = payload.guestId
    }

    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('rsvp_requests')
      .update({
        status: 'APPROVED',
        approved_at: now,
        approved_by: session.username,
        linked_guest_id: linkedGuestId,
        creation_mode: payload.mode,
        updated_at: now,
      })
      .eq('id', id)
      .eq('status', 'PENDING')
      .select()
      .maybeSingle()

    if (error || !data) {
      return { ok: false, error: 'Duyệt RSVP thất bại — yêu cầu có thể đã được xử lý.' }
    }

    await reload()
    return { ok: true }
  }

  async function reject(id: string, reason: string): Promise<{ ok: boolean; error?: string }> {
    if (!supabase) return { ok: false, error: 'Supabase chưa được cấu hình.' }

    const session = await getSessionWithRole()
    if (!session || session.role !== 'admin') {
      return { ok: false, error: 'Bạn không có quyền thực hiện thao tác này.' }
    }

    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('rsvp_requests')
      .update({
        status: 'REJECTED',
        rejection_reason: reason.trim() || null,
        approved_at: now,
        approved_by: session.username,
        updated_at: now,
      })
      .eq('id', id)
      .eq('status', 'PENDING')
      .select()
      .maybeSingle()

    if (error || !data) {
      return { ok: false, error: 'Từ chối RSVP thất bại — yêu cầu có thể đã được xử lý.' }
    }

    await reload()
    return { ok: true }
  }

  return { requests, loading, error, reload, approve, reject }
}
