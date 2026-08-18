import { AlertTriangle } from 'lucide-react'
import { TableSummary, TABLE_CAPACITY } from '@/types/guest'

export function TableWarnings({ tables }: { tables: TableSummary[] }) {
  const overloaded = tables.filter((t) => t.totalPeople > TABLE_CAPACITY)
  if (overloaded.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      {overloaded.map((table) => (
        <div
          key={table.tableNumber}
          className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            <span className="font-medium">
              Bàn số {table.tableNumber} hiện có {table.totalPeople}/{TABLE_CAPACITY} người.
            </span>{' '}
            Vui lòng chuyển bớt khách sang bàn khác.
          </p>
        </div>
      ))}
    </div>
  )
}
