'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { GUEST_SIDES, GUEST_STATUSES } from '@/types/guest'
import { QUICK_TABS, QuickTab, SideFilter, StatusFilter } from '@/types/guestFilters'

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  sideFilter: SideFilter
  onSideFilterChange: (value: SideFilter) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (value: StatusFilter) => void
  quickTab: QuickTab
  onQuickTabChange: (value: QuickTab) => void
}

export function FilterBar({
  search,
  onSearchChange,
  sideFilter,
  onSideFilterChange,
  statusFilter,
  onStatusFilterChange,
  quickTab,
  onQuickTabChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1 rounded-xl border border-zinc-800 bg-zinc-900 p-1">
        {QUICK_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onQuickTabChange(tab)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              quickTab === tab
                ? 'bg-emerald-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên hoặc số điện thoại..."
            className="pl-9"
          />
        </div>

        <div className="w-full sm:w-44">
          <Select
            value={sideFilter}
            onChange={(e) => onSideFilterChange(e.target.value as SideFilter)}
          >
            <option value="Tất cả">Tất cả bên</option>
            {GUEST_SIDES.map((side) => (
              <option key={side} value={side}>
                {side}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full sm:w-44">
          <Select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
          >
            <option value="Mọi trạng thái">Mọi trạng thái</option>
            {GUEST_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  )
}
