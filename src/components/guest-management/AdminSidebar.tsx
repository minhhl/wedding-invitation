'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Mail,
  MessageCircleHeart,
  BarChart3,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  ExternalLink,
  Lock,
  Menu,
  Link as LinkIcon,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSession } from '@/hooks/useSession'
import { useRsvpPendingCount } from '@/hooks/useRsvpPendingCount'
import { clearStaticSession, IS_STATIC_EXPORT } from '@/lib/staticAuth'

interface NavLeaf {
  label: string
  href?: string
  external?: boolean
  comingSoon?: boolean
  badge?: number | null
}

interface NavSection {
  key: string
  label: string
  icon: React.ElementType
  href?: string
  comingSoon?: boolean
  children?: NavLeaf[]
}

const COLLAPSE_KEY = 'admin-sidebar-collapsed'
const OPEN_SECTIONS_KEY = 'admin-sidebar-open-sections'
const DEFAULT_OPEN_SECTIONS = ['guests', 'rsvp']

function isLeafActive(leaf: NavLeaf, pathname: string, statusParam: string | null): boolean {
  if (!leaf.href || leaf.external) return false
  const [hrefPath, hrefQuery] = leaf.href.split('?')
  if (hrefPath.split('#')[0] !== pathname) return false
  const hrefStatus = hrefQuery ? new URLSearchParams(hrefQuery).get('status') : null
  return hrefStatus === statusParam
}

export function AdminSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const session = useSession()
  const pendingCount = useRsvpPendingCount()

  const [collapsed, setCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>(DEFAULT_OPEN_SECTIONS)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === '1')
    const stored = localStorage.getItem(OPEN_SECTIONS_KEY)
    if (stored) {
      try {
        setOpenSections(JSON.parse(stored))
      } catch {
        // ignore malformed value
      }
    }
  }, [])

  // Close the mobile drawer whenever the route actually changes (a nav tap
  // navigates before this runs, so this catches back/forward too).
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0')
      return next
    })
  }

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      localStorage.setItem(OPEN_SECTIONS_KEY, JSON.stringify(next))
      return next
    })
  }

  async function logout() {
    if (IS_STATIC_EXPORT) {
      clearStaticSession()
      router.push('/login')
      return
    }
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const statusParam = searchParams.get('status')

  const sections: NavSection[] = [
    { key: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, href: '/guest-management#dashboard' },
    {
      key: 'guests',
      label: 'Quản lý khách mời',
      icon: Users,
      children: [
        { label: 'Danh sách khách', href: '/guest-management' },
        { label: 'Phân bàn', href: '/guest-management#guest-table' },
      ],
    },
    {
      key: 'invitations',
      label: 'Thiệp mời',
      icon: Mail,
      children: [
        { label: 'Thiệp cưới', href: '/', external: true },
        { label: 'Tạo Link Mời', href: '/guest-management/invite-links' },
      ],
    },
    {
      key: 'rsvp',
      label: 'Quản lý RSVP',
      icon: MessageCircleHeart,
      children: [
        {
          label: 'Yêu cầu RSVP',
          href: '/guest-management/rsvp?status=PENDING',
          badge: pendingCount || null,
        },
        { label: 'RSVP đã duyệt', href: '/guest-management/rsvp?status=APPROVED' },
        { label: 'RSVP đã từ chối', href: '/guest-management/rsvp?status=REJECTED' },
      ],
    },
    { key: 'reports', label: 'Thống kê RSVP', icon: BarChart3, href: '/guest-management/rsvp' },
  ]

  const navProps = { sections, pathname, statusParam, openSections, toggleSection }

  return (
    <>
      {/* Desktop: permanent sidebar */}
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 transition-[width] duration-200 md:flex',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b border-zinc-800 px-4">
          {!collapsed && <span className="truncate text-sm font-semibold text-zinc-100">Quản Trị Đám Cưới</span>}
          <button
            type="button"
            onClick={toggleCollapsed}
            className="ml-auto rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            aria-label={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <NavList {...navProps} collapsed={collapsed} />
        </nav>

        <SessionFooter session={session} collapsed={collapsed} onLogout={logout} />
      </aside>

      {/* Mobile: sticky top app bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-3 md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-800 active:bg-zinc-800"
          aria-label="Mở menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="truncate text-sm font-semibold text-zinc-100">Quản Trị Đám Cưới</span>
        <Link
          href="/guest-management/rsvp?status=PENDING"
          className="relative ml-auto rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-800 active:bg-zinc-800"
          aria-label="Yêu cầu RSVP"
        >
          <MessageCircleHeart className="h-5 w-5" />
          {!!pendingCount && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {pendingCount}
            </span>
          )}
        </Link>
      </header>

      {/* Mobile: slide-in drawer, opened from the top bar's hamburger */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 animate-in fade-in-0"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-zinc-800 bg-zinc-950 shadow-xl animate-in slide-in-from-left duration-200">
            <div className="flex h-14 items-center gap-2 border-b border-zinc-800 px-4">
              <span className="truncate text-sm font-semibold text-zinc-100">Quản Trị Đám Cưới</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="ml-auto rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                aria-label="Đóng menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              <NavList {...navProps} collapsed={false} onNavigate={() => setDrawerOpen(false)} />
            </nav>

            <SessionFooter session={session} collapsed={false} onLogout={logout} />
          </div>
        </div>
      )}

      {/* Mobile: bottom tab bar for one-thumb navigation between the most-used sections */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-zinc-800 bg-zinc-950 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <BottomTabLink href="/guest-management" pathname={pathname} icon={Users} label="Khách mời" />
        <BottomTabLink
          href="/guest-management/rsvp"
          pathname={pathname}
          icon={MessageCircleHeart}
          label="RSVP"
          badge={pendingCount || null}
        />
        <BottomTabLink
          href="/guest-management/invite-links"
          pathname={pathname}
          icon={LinkIcon}
          label="Link mời"
        />
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-zinc-400 transition-colors active:bg-zinc-800/60"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[11px] font-medium">Thêm</span>
        </button>
      </nav>
    </>
  )
}

interface NavListProps {
  sections: NavSection[]
  pathname: string
  statusParam: string | null
  openSections: string[]
  toggleSection: (key: string) => void
  collapsed: boolean
  onNavigate?: () => void
}

function NavList({
  sections,
  pathname,
  statusParam,
  openSections,
  toggleSection,
  collapsed,
  onNavigate,
}: NavListProps) {
  return (
    <ul className="flex flex-col gap-0.5">
      {sections.map((section) => {
        const hasChildren = !!section.children?.length
        const sectionActive =
          !hasChildren && section.href ? section.href.split('#')[0] === pathname : false
        const sectionOpen = openSections.includes(section.key)
        const badgeTotal = section.children?.reduce((sum, c) => sum + (c.badge || 0), 0) || null

        return (
          <li key={section.key}>
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                disabled={section.comingSoon}
                title={collapsed ? section.label : undefined}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-zinc-100',
                  section.comingSoon && 'cursor-not-allowed opacity-50 hover:bg-transparent'
                )}
              >
                <section.icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate text-left">{section.label}</span>
                    {!!badgeTotal && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                        {badgeTotal}
                      </span>
                    )}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 shrink-0 transition-transform', sectionOpen && 'rotate-180')}
                    />
                  </>
                )}
              </button>
            ) : (
              <SidebarLink
                href={section.href}
                active={sectionActive}
                collapsed={collapsed}
                comingSoon={section.comingSoon}
                icon={section.icon}
                label={section.label}
                onNavigate={onNavigate}
              />
            )}

            {hasChildren && !collapsed && sectionOpen && (
              <ul className="ml-5 mt-0.5 flex flex-col gap-0.5 border-l border-zinc-800 pl-3">
                {section.children!.map((leaf) => (
                  <li key={leaf.label}>
                    <SidebarLink
                      href={leaf.href}
                      active={isLeafActive(leaf, pathname, statusParam)}
                      collapsed={false}
                      comingSoon={leaf.comingSoon}
                      external={leaf.external}
                      label={leaf.label}
                      badge={leaf.badge}
                      onNavigate={onNavigate}
                      leaf
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function SessionFooter({
  session,
  collapsed,
  onLogout,
}: {
  session: ReturnType<typeof useSession>
  collapsed: boolean
  onLogout: () => void
}) {
  if (!session) return null
  return (
    <div className="border-t border-zinc-800 p-3">
      <div className={cn('flex items-center gap-2', collapsed && 'justify-center')}>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-zinc-200">{session.username}</p>
            <p className="text-xs text-zinc-500">{session.role === 'admin' ? 'Quản trị viên' : 'Người xem'}</p>
          </div>
        )}
        <button
          type="button"
          onClick={onLogout}
          title="Đăng xuất"
          className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function BottomTabLink({
  href,
  pathname,
  icon: Icon,
  label,
  badge,
}: {
  href: string
  pathname: string
  icon: React.ElementType
  label: string
  badge?: number | null
}) {
  const active = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        'relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors active:bg-zinc-800/60',
        active ? 'text-emerald-400' : 'text-zinc-400'
      )}
    >
      <Icon className="h-5 w-5" />
      {!!badge && (
        <span className="absolute right-[22%] top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
      <span className="text-[11px] font-medium">{label}</span>
    </Link>
  )
}

interface SidebarLinkProps {
  href?: string
  active: boolean
  collapsed: boolean
  comingSoon?: boolean
  external?: boolean
  icon?: React.ElementType
  label: string
  badge?: number | null
  leaf?: boolean
  onNavigate?: () => void
}

function SidebarLink({
  href,
  active,
  collapsed,
  comingSoon,
  external,
  icon: Icon,
  label,
  badge,
  leaf,
  onNavigate,
}: SidebarLinkProps) {
  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {!collapsed && <span className="flex-1 truncate text-left">{label}</span>}
      {!collapsed && !!badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      {!collapsed && comingSoon && (
        <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
          Sắp ra mắt
        </span>
      )}
      {!collapsed && external && <ExternalLink className="h-3 w-3 shrink-0 text-zinc-500" />}
    </>
  )

  const className = cn(
    'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
    leaf && 'py-1.5',
    comingSoon
      ? 'cursor-not-allowed text-zinc-600'
      : active
        ? 'bg-emerald-600/15 text-emerald-300'
        : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-zinc-100',
    active && !comingSoon && 'border-l-2 border-emerald-500 -ml-px pl-[9px]'
  )

  if (comingSoon || !href) {
    return (
      <span className={className} title={collapsed ? label : 'Sắp ra mắt'}>
        {Icon ? <Icon className="h-4 w-4 shrink-0" /> : <Lock className="h-3.5 w-3.5 shrink-0" />}
        {!collapsed && <span className="flex-1 truncate text-left">{label}</span>}
        {!collapsed && (
          <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
            Sắp ra mắt
          </span>
        )}
      </span>
    )
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} title={collapsed ? label : undefined}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} onClick={onNavigate} className={className} title={collapsed ? label : undefined}>
      {content}
    </Link>
  )
}
