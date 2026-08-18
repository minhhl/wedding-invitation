'use client'

import { Eye, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RsvpRequest, RsvpStatus } from '@/types/rsvp'

const STATUS_STYLES: Record<RsvpStatus, string> = {
  PENDING: 'text-amber-300 bg-amber-500/10',
  APPROVED: 'text-emerald-300 bg-emerald-500/10',
  REJECTED: 'text-red-300 bg-red-500/10',
}

const STATUS_LABELS: Record<RsvpStatus, string> = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface RsvpTableProps {
  requests: RsvpRequest[]
  isAdmin: boolean
  onView: (request: RsvpRequest) => void
  onApprove: (request: RsvpRequest) => void
  onReject: (request: RsvpRequest) => void
}

export function RsvpTable({ requests, isAdmin, onView, onApprove, onReject }: RsvpTableProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-900">
            <tr className="border-b border-zinc-800 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 min-w-[180px]">Khách</th>
              <th className="px-4 py-3 min-w-[140px]">Điện thoại</th>
              <th className="px-4 py-3 min-w-[110px]">Người đi cùng</th>
              <th className="px-4 py-3 min-w-[110px]">Trạng thái</th>
              <th className="px-4 py-3 min-w-[160px]">Ngày đăng ký</th>
              <th className="px-4 py-3 min-w-[220px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/40">
                <td className="px-4 py-3">
                  <div className="font-medium text-zinc-100">{r.guestName}</div>
                  <div className="text-xs text-zinc-500">
                    {r.attending ? 'Sẽ tham dự' : 'Không tham dự'}
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-300">{r.phone}</td>
                <td className="px-4 py-3 text-zinc-300">{r.guestCount}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                      STATUS_STYLES[r.status]
                    )}
                  >
                    {STATUS_LABELS[r.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(r.submittedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onView(r)}>
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                    {r.status === 'PENDING' && isAdmin && (
                      <>
                        <Button size="sm" onClick={() => onApprove(r)}>
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => onReject(r)}>
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                  Không có yêu cầu RSVP nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
