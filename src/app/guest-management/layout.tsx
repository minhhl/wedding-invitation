import { Suspense } from 'react'
import { AdminSidebar } from '@/components/guest-management/AdminSidebar'
import { StaticAuthGate } from '@/components/guest-management/StaticAuthGate'

export default function GuestManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <Suspense>
        <AdminSidebar />
      </Suspense>
      <div className="min-w-0 flex-1">
        <StaticAuthGate>{children}</StaticAuthGate>
      </div>
    </div>
  )
}
