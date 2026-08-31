import { notFound } from 'next/navigation'
import { InvitationCard, type InvitationSide } from '@/components/InvitationCard'

// Required for the static GitHub Pages export (output: 'export') — both
// values get pre-rendered at build time instead of on demand.
export function generateStaticParams() {
  return [{ side: 'trai' }, { side: 'gai' }]
}

// Card-only preview for the invite-link generator (src/components/
// guest-management/InviteLinkGenerator.tsx) — just the InvitationCard
// section, not the full site, so previewing a generated link doesn't
// require scrolling past the hero/gallery/RSVP to see the personalized
// greeting. The real shareable link still points at /nha-trai or /nha-gai.
export default async function InviteLinkPreviewPage({
  params,
}: {
  params: Promise<{ side: string }>
}) {
  const { side } = await params
  if (side !== 'trai' && side !== 'gai') notFound()

  return (
    <main className="bg-white">
      <InvitationCard side={side as InvitationSide} showMonogram={false} />
    </main>
  )
}
