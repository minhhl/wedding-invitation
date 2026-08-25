import { Suspense } from 'react'
import { AdminSidebar } from '@/components/guest-management/AdminSidebar'
import { StaticAuthGate } from '@/components/guest-management/StaticAuthGate'

export default function GuestManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 md:flex-row">
      <Suspense>
        <AdminSidebar />
      </Suspense>
      {/* Clears the fixed mobile bottom tab bar, plus the home-indicator
          safe area on notched phones; both collapse away at md: where the
          tab bar doesn't render. */}
      <div className="min-w-0 flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <StaticAuthGate>{children}</StaticAuthGate>
      </div>
    </div>
  )
}
