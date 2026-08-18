import { Users, UsersRound, UserCheck, LayoutGrid } from 'lucide-react'
import { GuestStats } from '@/types/guest'
import { StatCardConfig, StatCardGrid } from '@/components/guest-management/StatCardGrid'

export function StatsCards({ stats }: { stats: GuestStats }) {
  const cards: StatCardConfig[] = [
    {
      label: 'Khách mời',
      value: stats.totalGuests,
      icon: Users,
      accent: 'text-sky-400 bg-sky-500/10',
    },
    {
      label: 'Tổng người tham dự',
      value: stats.totalPeople,
      icon: UsersRound,
      accent: 'text-violet-400 bg-violet-500/10',
    },
    {
      label: 'Sẽ đến',
      value: stats.confirmedGuests,
      icon: UserCheck,
      accent: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      label: 'Ước tính bàn',
      value: stats.estimatedTables,
      icon: LayoutGrid,
      accent: 'text-amber-400 bg-amber-500/10',
    },
  ]

  return <StatCardGrid cards={cards} />
}
