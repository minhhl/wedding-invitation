'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RsvpRequest } from '@/types/rsvp'

interface RsvpRejectDialogProps {
  request: RsvpRequest | null
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string) => Promise<void>
}

export function RsvpRejectDialog({ request, onOpenChange, onConfirm }: RsvpRejectDialogProps) {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleConfirm() {
    setSubmitting(true)
    try {
      await onConfirm(reason)
      setReason('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={!!request}
      onOpenChange={(open) => {
        if (!open) setReason('')
        onOpenChange(open)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Từ chối RSVP của {request?.guestName}?</DialogTitle>
          <DialogDescription>Khách sẽ không được tạo thành Guest. Bạn có thể ghi lý do (tùy chọn).</DialogDescription>
        </DialogHeader>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Lý do từ chối (optional)"
          rows={3}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={submitting}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={submitting}>
            Từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
