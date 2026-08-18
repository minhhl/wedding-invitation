import { cn } from '@/lib/utils'

export interface StatCardConfig {
  label: string
  value: number
  icon: React.ElementType
  accent: string
}

export function StatCardGrid({ cards }: { cards: StatCardConfig[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">{card.label}</span>
            <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', card.accent)}>
              <card.icon className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-zinc-50">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
