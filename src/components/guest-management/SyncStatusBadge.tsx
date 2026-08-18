import { Loader2, CloudCheck, CloudOff, Cloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SyncStatus } from '@/hooks/useGuestServerSync'

const CONFIG: Record<SyncStatus, { label: string; icon: React.ElementType; className: string }> = {
  loading: { label: 'Đang tải guest-list.xlsx...', icon: Loader2, className: 'text-zinc-400' },
  idle: { label: 'Đã đồng bộ guest-list.xlsx', icon: Cloud, className: 'text-zinc-400' },
  saving: { label: 'Đang lưu vào guest-list.xlsx...', icon: Loader2, className: 'text-amber-400' },
  saved: { label: 'Đã lưu vào guest-list.xlsx', icon: CloudCheck, className: 'text-emerald-400' },
  error: { label: 'Không thể đồng bộ guest-list.xlsx', icon: CloudOff, className: 'text-red-400' },
}

export function SyncStatusBadge({ status }: { status: SyncStatus }) {
  const { label, icon: Icon, className } = CONFIG[status]
  const spinning = status === 'loading' || status === 'saving'

  return (
    <div className={cn('flex items-center gap-1.5 text-xs', className)}>
      <Icon className={cn('h-3.5 w-3.5', spinning && 'animate-spin')} />
      {label}
    </div>
  )
}
