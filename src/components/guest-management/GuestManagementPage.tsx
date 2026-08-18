'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { useGuestStore } from '@/store/guestStore'
import { useGuestFilters } from '@/hooks/useGuestFilters'
import { useGuestServerSync } from '@/hooks/useGuestServerSync'
import { useRsvpPendingCount } from '@/hooks/useRsvpPendingCount'
import { computeGuestStats, computeTableStats, getTableSummaries } from '@/lib/guestTable'
import { DashboardPanel } from '@/components/guest-management/DashboardPanel'
import { TableWarnings } from '@/components/guest-management/TableWarnings'
import { FilterBar } from '@/components/guest-management/FilterBar'
import { GuestTable } from '@/components/guest-management/GuestTable'
import { ActionsBar } from '@/components/guest-management/ActionsBar'
import { SyncStatusBadge } from '@/components/guest-management/SyncStatusBadge'
import { TABLE_CAPACITY } from '@/types/guest'

export function GuestManagementPage() {
  const guests = useGuestStore((s) => s.guests)
  const hasHydrated = useGuestStore((s) => s.hasHydrated)
  const addGuest = useGuestStore((s) => s.addGuest)
  const updateGuest = useGuestStore((s) => s.updateGuest)
  const removeGuest = useGuestStore((s) => s.removeGuest)
  const clearAll = useGuestStore((s) => s.clearAll)
  const importGuests = useGuestStore((s) => s.importGuests)
  const autoAssignTables = useGuestStore((s) => s.autoAssignTables)

  const syncStatus = useGuestServerSync()
  const pendingRsvpCount = useRsvpPendingCount()

  const stats = useMemo(() => computeGuestStats(guests), [guests])
  const tableSummaries = useMemo(() => getTableSummaries(guests), [guests])
  const tableStats = useMemo(() => computeTableStats(tableSummaries), [tableSummaries])
  const overloadedTableNumbers = useMemo(
    () =>
      new Set(
        tableSummaries.filter((t) => t.totalPeople > TABLE_CAPACITY).map((t) => t.tableNumber)
      ),
    [tableSummaries]
  )

  const {
    search,
    setSearch,
    sideFilter,
    setSideFilter,
    statusFilter,
    setStatusFilter,
    quickTab,
    setQuickTab,
    filteredGuests,
  } = useGuestFilters(guests)

  if (!hasHydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
        Đang tải dữ liệu khách mời...
      </div>
    )
  }

  return (
    <>
      <div className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-2 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-semibold text-zinc-50 sm:text-2xl">
              Quản lý khách mời
            </h1>
            <p className="text-sm text-zinc-400">
              Theo dõi danh sách khách, xác nhận tham dự và phân bàn tự động.
            </p>
          </div>
          <SyncStatusBadge status={syncStatus} />
        </div>
      </div>

      <main className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6">
        {!!pendingRsvpCount && (
          <Link
            href="/guest-management/rsvp"
            className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300 transition-colors hover:bg-amber-500/15"
          >
            <Bell className="h-4 w-4 shrink-0" />
            Có {pendingRsvpCount} yêu cầu RSVP mới cần duyệt.
            <span className="ml-auto text-amber-200 underline underline-offset-2">
              Xem ngay
            </span>
          </Link>
        )}

        <DashboardPanel stats={stats} tableStats={tableStats} />

        <TableWarnings tables={tableSummaries} />

        <ActionsBar
          guests={guests}
          onAddGuest={addGuest}
          onClearAll={clearAll}
          onAutoAssignTables={autoAssignTables}
          onImport={importGuests}
        />

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          sideFilter={sideFilter}
          onSideFilterChange={setSideFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          quickTab={quickTab}
          onQuickTabChange={setQuickTab}
        />

        <GuestTable
          guests={filteredGuests}
          totalGuestCount={guests.length}
          overloadedTableNumbers={overloadedTableNumbers}
          onUpdate={updateGuest}
          onRemove={removeGuest}
        />
      </main>
    </>
  )
}
