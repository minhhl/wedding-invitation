'use client'

import { useMemo, useState } from 'react'
import { useRsvpRequests } from '@/hooks/useRsvpRequests'
import { useSession } from '@/hooks/useSession'
import { RsvpRequest, RsvpStatus } from '@/types/rsvp'
import { RsvpStatsCards } from '@/components/rsvp-admin/RsvpStatsCards'
import { RsvpTable } from '@/components/rsvp-admin/RsvpTable'
import { RsvpDetailDialog } from '@/components/rsvp-admin/RsvpDetailDialog'
import { RsvpApproveDialog } from '@/components/rsvp-admin/RsvpApproveDialog'
import { RsvpRejectDialog } from '@/components/rsvp-admin/RsvpRejectDialog'
import { cn } from '@/lib/utils'

const TABS: Array<{ label: string; value: RsvpStatus | 'ALL' }> = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
]

export function RsvpRequestsPage() {
  const { requests, loading, error, approve, reject } = useRsvpRequests()
  const session = useSession()
  const isAdmin = session?.role === 'admin'

  const [tab, setTab] = useState<RsvpStatus | 'ALL'>('ALL')
  const [viewing, setViewing] = useState<RsvpRequest | null>(null)
  const [approving, setApproving] = useState<RsvpRequest | null>(null)
  const [rejecting, setRejecting] = useState<RsvpRequest | null>(null)

  const counts = useMemo(
    () => ({
      pending: requests.filter((r) => r.status === 'PENDING').length,
      approved: requests.filter((r) => r.status === 'APPROVED').length,
      rejected: requests.filter((r) => r.status === 'REJECTED').length,
    }),
    [requests]
  )

  const filtered = useMemo(
    () => (tab === 'ALL' ? requests : requests.filter((r) => r.status === tab)),
    [requests, tab]
  )

  return (
    <>
      <div className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <h1 className="text-xl font-semibold text-zinc-50 sm:text-2xl">RSVP Requests</h1>
          <p className="text-sm text-zinc-400">
            Duyệt yêu cầu RSVP từ khách trước khi tạo hồ sơ khách mời chính thức.
          </p>
        </div>
      </div>

      <main className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6">
        <RsvpStatsCards counts={counts} />

        <div className="flex flex-wrap gap-1 rounded-xl border border-zinc-800 bg-zinc-900 p-1">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                tab === t.value
                  ? 'bg-emerald-600 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {loading ? (
          <p className="text-sm text-zinc-500">Đang tải...</p>
        ) : (
          <RsvpTable
            requests={filtered}
            isAdmin={isAdmin}
            onView={setViewing}
            onApprove={setApproving}
            onReject={setRejecting}
          />
        )}
      </main>

      <RsvpDetailDialog request={viewing} onOpenChange={(open) => !open && setViewing(null)} />

      <RsvpApproveDialog
        request={approving}
        onOpenChange={(open) => !open && setApproving(null)}
        onConfirm={(payload) => approve(approving!.id, payload)}
      />

      <RsvpRejectDialog
        request={rejecting}
        onOpenChange={(open) => !open && setRejecting(null)}
        onConfirm={async (reason) => {
          const result = await reject(rejecting!.id, reason)
          if (result.ok) setRejecting(null)
        }}
      />
    </>
  )
}
