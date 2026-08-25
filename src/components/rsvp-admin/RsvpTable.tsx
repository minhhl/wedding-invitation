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

function EmptyState() {
  return <p className="px-4 py-10 text-center text-sm text-zinc-500">Không có yêu cầu RSVP nào.</p>
}

function RequestActions({
  request,
  isAdmin,
  onView,
  onApprove,
  onReject,
}: {
  request: RsvpRequest
  isAdmin: boolean
  onView: (request: RsvpRequest) => void
  onApprove: (request: RsvpRequest) => void
  onReject: (request: RsvpRequest) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => onView(request)}>
        <Eye className="h-3.5 w-3.5" />
        View
      </Button>
      {request.status === 'PENDING' && isAdmin && (
        <>
          <Button size="sm" onClick={() => onApprove(request)}>
            <Check className="h-3.5 w-3.5" />
            Approve
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onReject(request)}>
            <X className="h-3.5 w-3.5" />
            Reject
          </Button>
        </>
      )}
    </div>
  )
}

export function RsvpTable({ requests, isAdmin, onView, onApprove, onReject }: RsvpTableProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      {/* Card list on mobile — mirrors GuestTable's approach so the whole
          admin area scrolls the same way instead of forcing sideways
          scrolling inside a cramped table. */}
      <div className="flex flex-col gap-3 p-3 md:hidden">
        {requests.length === 0 ? (
          <EmptyState />
        ) : (
          requests.map((r) => (
            <div key={r.id} className="flex flex-col gap-2.5 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium text-zinc-100">{r.guestName}</p>
                  <p className="text-xs text-zinc-500">{r.attending ? 'Sẽ tham dự' : 'Không tham dự'}</p>
                </div>
                <span
                  className={cn(
                    'inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium',
                    STATUS_STYLES[r.status]
                  )}
                >
                  {STATUS_LABELS[r.status]}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                <div>
                  <span className="text-xs text-zinc-500">Bên: </span>
                  <span className="text-zinc-300">{r.side}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Đi cùng: </span>
                  <span className="text-zinc-300">{r.companion || '—'}</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500">Đăng ký: {formatDate(r.submittedAt)}</p>
              {r.status === 'APPROVED' && (
                <span className="w-fit rounded-full bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-400">
                  {r.creationMode === 'link' ? 'Linked Guest' : 'Đã tạo Guest'}
                </span>
              )}

              <RequestActions request={r} isAdmin={isAdmin} onView={onView} onApprove={onApprove} onReject={onReject} />
            </div>
          ))
        )}
      </div>

      {/* Full table from md: up. */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-900">
            <tr className="border-b border-zinc-800 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 min-w-[180px]">Khách</th>
              <th className="px-4 py-3 min-w-[120px]">Bên</th>
              <th className="px-4 py-3 min-w-[160px]">Người đi cùng</th>
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
                <td className="px-4 py-3 text-zinc-300">{r.side}</td>
                <td className="px-4 py-3 text-zinc-300">{r.companion || '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                        STATUS_STYLES[r.status]
                      )}
                    >
                      {STATUS_LABELS[r.status]}
                    </span>
                    {r.status === 'APPROVED' && (
                      <span className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-400">
                        {r.creationMode === 'link' ? 'Linked Guest' : 'Đã tạo Guest'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(r.submittedAt)}</td>
                <td className="px-4 py-3">
                  <RequestActions request={r} isAdmin={isAdmin} onView={onView} onApprove={onApprove} onReject={onReject} />
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
