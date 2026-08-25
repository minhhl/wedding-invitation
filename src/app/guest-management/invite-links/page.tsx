import type { Metadata } from 'next'
import { InviteLinkGenerator } from '@/components/guest-management/InviteLinkGenerator'

export const metadata: Metadata = {
  title: 'Tạo link mời',
  description: 'Tạo link thiệp mời riêng cho từng khách, theo nhà trai hoặc nhà gái.',
}

export default function InviteLinksPage() {
  return (
    <>
      <div className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <h1 className="text-xl font-semibold text-zinc-50 sm:text-2xl">Tạo link mời</h1>
          <p className="text-sm text-zinc-400">
            Tạo link thiệp mời riêng cho từng khách, theo nhà trai hoặc nhà gái.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <InviteLinkGenerator />
      </main>
    </>
  )
}
