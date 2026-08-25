import { Clock, CheckCircle2, XCircle } from 'lucide-react'
import { RsvpCounts } from '@/types/rsvp'
import { StatCardConfig, StatCardGrid } from '@/components/guest-management/StatCardGrid'

export function RsvpStatsCards({ counts }: { counts: RsvpCounts }) {
  const cards: StatCardConfig[] = [
    {
      label: 'RSVP chờ duyệt',
      value: counts.pending,
      icon: Clock,
      accent: 'text-amber-400 bg-amber-500/10',
    },
    {
      label: 'RSVP đã duyệt',
      value: counts.approved,
      icon: CheckCircle2,
      accent: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      label: 'RSVP đã từ chối',
      value: counts.rejected,
      icon: XCircle,
      accent: 'text-red-400 bg-red-500/10',
    },
  ]

  return <StatCardGrid cards={cards} />
}
