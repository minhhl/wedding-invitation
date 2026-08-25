'use client'

import { useState } from 'react'
import { ChevronDown, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GuestStats, TableStats } from '@/types/guest'
import { StatsCards } from '@/components/guest-management/StatsCards'
import { TableStatusCards } from '@/components/guest-management/TableStatusCards'

// Always starts closed on page load — the toggle only affects the current session.
export function DashboardPanel({ stats, tableStats }: { stats: GuestStats; tableStats: TableStats }) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <section className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-expanded={!collapsed}
        className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-left text-sm text-zinc-200 transition-colors hover:bg-zinc-800/60"
      >
        <span className="flex min-w-0 items-center gap-2 font-medium">
          <LayoutDashboard className="h-4 w-4 shrink-0 text-zinc-400" />
          Tổng quan
          {collapsed && (
            <span className="truncate text-xs font-normal text-zinc-500">
              {stats.totalGuests} khách · {stats.totalPeople} người · {stats.confirmedGuests} sẽ đến ·{' '}
              {tableStats.totalTables} bàn
              {tableStats.tablesOverloaded > 0 && (
                <span className="text-red-400"> · {tableStats.tablesOverloaded} bàn quá tải</span>
              )}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-zinc-400 transition-transform', collapsed && '-rotate-90')}
        />
      </button>

      {!collapsed && (
        <div className="flex flex-col gap-4">
          <StatsCards stats={stats} />
          <TableStatusCards stats={tableStats} />
        </div>
      )}
    </section>
  )
}
