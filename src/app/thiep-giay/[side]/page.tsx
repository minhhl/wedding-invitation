import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PaperInvitation } from '@/components/PaperInvitation'
import type { InvitationSide } from '@/components/InvitationCard'
import { groomName, brideName } from '@/lib/weddingData'

// Required for the static GitHub Pages export (output: 'export') — both
// values get pre-rendered at build time instead of on demand.
export function generateStaticParams() {
  return [{ side: 'trai' }, { side: 'gai' }]
}

export const metadata: Metadata = {
  title: `Thiệp Cưới ${groomName} & ${brideName} — Bản in`,
}

// A print-card-style view of the invitation (three panels: ceremony,
// reception, save-the-date cover) — a different read on the same wedding
// facts as InvitationCard, not a replacement for it.
export default async function PaperInvitationPage({
  params,
}: {
  params: Promise<{ side: string }>
}) {
  const { side } = await params
  if (side !== 'trai' && side !== 'gai') notFound()

  return <PaperInvitation side={side as InvitationSide} />
}
