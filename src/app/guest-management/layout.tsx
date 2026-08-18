import { AdminNav } from '@/components/guest-management/AdminNav'

export default function GuestManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <AdminNav />
      {children}
    </div>
  )
}
