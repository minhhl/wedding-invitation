'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Users, ClipboardList, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSession } from '@/hooks/useSession'
import { useRsvpPendingCount } from '@/hooks/useRsvpPendingCount'

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const session = useSession()
  const pendingCount = useRsvpPendingCount()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const tabs = [
    { href: '/guest-management', label: 'Khách mời', icon: Users, badge: null as number | null },
    { href: '/guest-management/rsvp', label: 'RSVP Requests', icon: ClipboardList, badge: pendingCount },
  ]

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 sm:px-6">
        <nav className="flex gap-1 py-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-zinc-800 text-zinc-50'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {!!tab.badge && (
                  <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                    {tab.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {session && (
          <div className="flex items-center gap-3 py-2 text-sm text-zinc-400">
            <span>
              {session.username}{' '}
              <span className="text-zinc-500">· {session.role === 'admin' ? 'Admin' : 'Viewer'}</span>
            </span>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <LogOut className="h-3.5 w-3.5" />
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
