'use client'

import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { RsvpRequest } from '@/types/rsvp'
import { Guest, GUEST_GROUPS, GUEST_SIDES, TABLE_CAPACITY } from '@/types/guest'
import { getTableTotal } from '@/lib/guestTable'
import { ApprovePayload } from '@/hooks/useRsvpRequests'

interface RsvpApproveDialogProps {
  request: RsvpRequest | null
  onOpenChange: (open: boolean) => void
  onConfirm: (payload: ApprovePayload) => Promise<{ ok: boolean; error?: string }>
}

export function RsvpApproveDialog({ request, onOpenChange, onConfirm }: RsvpApproveDialogProps) {
  const [mode, setMode] = useState<'new' | 'link'>('new')
  const [side, setSide] = useState<string>(GUEST_SIDES[0])
  const [group, setGroup] = useState<string>(GUEST_GROUPS[0])
  const [guestQuery, setGuestQuery] = useState('')
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null)
  const [tableInput, setTableInput] = useState('')
  const [guests, setGuests] = useState<Guest[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!request) return
    setMode('new')
    setSide(GUEST_SIDES[0])
    setGroup(GUEST_GROUPS[0])
    setGuestQuery('')
    setSelectedGuestId(null)
    setTableInput('')
    setError(null)
    fetch('/api/guests')
      .then((res) => (res.ok ? res.json() : { guests: [] }))
      .then((data: { guests: Guest[] }) => setGuests(data.guests))
      .catch(() => setGuests([]))
  }, [request])

  const totalGuests = (request?.guestCount ?? 0) + 1

  const matches = useMemo(() => {
    const q = guestQuery.trim().toLowerCase()
    if (!q) return []
    return guests.filter((g) => g.name.toLowerCase().includes(q)).slice(0, 8)
  }, [guests, guestQuery])

  const table = tableInput.trim() === '' ? null : Number(tableInput)
  const tableValid = table === null || (Number.isFinite(table) && table >= 1)

  const capacityPreview = useMemo(() => {
    if (!request?.attending || table === null || !tableValid) return null
    const excludeId = mode === 'link' ? (selectedGuestId ?? undefined) : undefined
    const current = getTableTotal(guests, table, excludeId)
    const combined = current + totalGuests
    return { current, combined, overLimit: combined > TABLE_CAPACITY }
  }, [request, table, tableValid, guests, mode, selectedGuestId, totalGuests])

  if (!request) return null

  const canSubmit =
    tableValid &&
    !capacityPreview?.overLimit &&
    (mode === 'new' ? !!side && !!group : !!selectedGuestId)

  async function handleConfirm() {
    if (!request) return
    setSubmitting(true)
    setError(null)
    const payload: ApprovePayload =
      mode === 'new'
        ? { mode: 'new', side, group, table }
        : { mode: 'link', guestId: selectedGuestId as string, table }
    const result = await onConfirm(payload)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error ?? 'Duyệt RSVP thất bại.')
      return
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={!!request} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Tạo Guest Profile từ RSVP này?</DialogTitle>
          <DialogDescription>
            {request.guestName} · {totalGuests} khách ({request.attending ? 'sẽ tham dự' : 'không tham dự'})
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-zinc-200">
              <input
                type="radio"
                checked={mode === 'new'}
                onChange={() => setMode('new')}
                className="h-4 w-4 accent-emerald-600"
              />
              Tạo Guest mới
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-200">
              <input
                type="radio"
                checked={mode === 'link'}
                onChange={() => setMode('link')}
                className="h-4 w-4 accent-emerald-600"
              />
              Ghép vào Guest đã tồn tại
            </label>
          </div>

          {mode === 'new' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Bên</label>
                <Select value={side} onChange={(e) => setSide(e.target.value)}>
                  {GUEST_SIDES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Nhóm</label>
                <Select value={group} onChange={(e) => setGroup(e.target.value)}>
                  {GUEST_GROUPS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-400">Tìm kiếm khách mời...</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  value={guestQuery}
                  onChange={(e) => {
                    setGuestQuery(e.target.value)
                    setSelectedGuestId(null)
                  }}
                  placeholder="Nguyễn Văn A"
                  className="pl-9"
                />
              </div>
              {guestQuery && !selectedGuestId && (
                <div className="max-h-40 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-900">
                  {matches.length === 0 && (
                    <p className="px-3 py-2 text-sm text-zinc-500">Không tìm thấy khách phù hợp.</p>
                  )}
                  {matches.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => {
                        setSelectedGuestId(g.id)
                        setGuestQuery(g.name)
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-800"
                    >
                      <span>{g.name}</span>
                      <span className="text-xs text-zinc-500">{g.phone}</span>
                    </button>
                  ))}
                </div>
              )}
              {selectedGuestId && (
                <p className="text-xs text-emerald-400">Đã chọn: {guestQuery}</p>
              )}
            </div>
          )}

          {request.attending && (
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">
                Gán bàn (tùy chọn)
              </label>
              <Input
                type="number"
                min={1}
                value={tableInput}
                onChange={(e) => setTableInput(e.target.value)}
                placeholder="Để trống nếu chưa xếp bàn"
              />
              {capacityPreview && (
                <p
                  className={cn(
                    'mt-2 flex items-start gap-1.5 text-xs',
                    capacityPreview.overLimit ? 'text-red-400' : 'text-zinc-400'
                  )}
                >
                  {capacityPreview.overLimit && <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                  Bàn {table} hiện có {capacityPreview.current} khách + RSVP mới {totalGuests} khách ={' '}
                  {capacityPreview.combined} khách.
                  {capacityPreview.overLimit && ` Vượt giới hạn ${TABLE_CAPACITY}. Vui lòng chọn bàn khác.`}
                </p>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={submitting}>
            Hủy
          </Button>
          <Button onClick={handleConfirm} disabled={!canSubmit || submitting}>
            Xác nhận Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
