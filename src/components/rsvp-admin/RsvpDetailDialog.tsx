'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RsvpRequest } from '@/types/rsvp'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-zinc-800 py-2 last:border-0">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</span>
      <span className="text-sm text-zinc-100">{value || '—'}</span>
    </div>
  )
}

export function RsvpDetailDialog({
  request,
  onOpenChange,
}: {
  request: RsvpRequest | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={!!request} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết RSVP</DialogTitle>
        </DialogHeader>
        {request && (
          <div className="flex flex-col">
            <Row label="Họ tên" value={request.guestName} />
            <Row label="Khách mời của" value={request.side} />
            <Row label="Đi cùng" value={request.companion} />
            <Row label="Xác nhận tham dự" value={request.attending ? 'Sẽ tham dự' : 'Không tham dự'} />
            <Row label="Lời chúc" value={request.message} />
            <Row label="Ngày gửi RSVP" value={new Date(request.submittedAt).toLocaleString('vi-VN')} />
            {request.status !== 'PENDING' && (
              <Row
                label="Đã xử lý"
                value={`${request.status === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'} bởi ${request.approvedBy ?? '—'}${
                  request.approvedAt ? ` · ${new Date(request.approvedAt).toLocaleString('vi-VN')}` : ''
                }`}
              />
            )}
            {request.status === 'REJECTED' && request.rejectionReason && (
              <Row label="Lý do từ chối" value={request.rejectionReason} />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
