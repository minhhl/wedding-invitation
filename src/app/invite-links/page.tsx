import type { Metadata } from 'next'
import { InviteLinkGenerator } from '@/components/guest-management/InviteLinkGenerator'

export const metadata: Metadata = {
  title: 'Tạo link mời',
  description: 'Tạo link thiệp mời riêng cho từng khách, theo nhà trai hoặc nhà gái.',
}

export default function InviteLinksPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
        <InviteLinkGenerator />
      </main>
    </div>
  )
}
