import { Grid3x3, CheckCircle2, DoorOpen, AlertTriangle } from 'lucide-react'
import { TableStats } from '@/types/guest'
import { StatCardConfig, StatCardGrid } from '@/components/guest-management/StatCardGrid'

export function TableStatusCards({ stats }: { stats: TableStats }) {
  const cards: StatCardConfig[] = [
    {
      label: 'Tổng số bàn',
      value: stats.totalTables,
      icon: Grid3x3,
      accent: 'text-sky-400 bg-sky-500/10',
    },
    {
      label: 'Bàn còn chỗ',
      value: stats.tablesWithRoom,
      icon: DoorOpen,
      accent: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      label: 'Bàn đầy',
      value: stats.tablesFull,
      icon: CheckCircle2,
      accent: 'text-amber-400 bg-amber-500/10',
    },
    {
      label: 'Bàn quá tải',
      value: stats.tablesOverloaded,
      icon: AlertTriangle,
      accent: 'text-red-400 bg-red-500/10',
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        Trạng thái bàn
      </h2>
      <StatCardGrid cards={cards} />
    </div>
  )
}
