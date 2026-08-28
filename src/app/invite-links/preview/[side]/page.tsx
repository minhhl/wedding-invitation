import { notFound } from 'next/navigation'
import { InvitationCard, type InvitationSide } from '@/components/InvitationCard'

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
    <main className="min-h-screen bg-white">
      <InvitationCard side={side as InvitationSide} />
    </main>
  )
}
