import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { SaveTheDate } from '@/components/SaveTheDate'
import { InvitationCard } from '@/components/InvitationCard'
import { DreamSection } from '@/components/DreamSection'
import { WeddingTimeline } from '@/components/WeddingTimeline'
import { PolaroidCollection } from '@/components/PolaroidCollection'
import { RSVPSection } from '@/components/RSVPSection'
import { groomName, brideName } from '@/lib/weddingData'

export const metadata: Metadata = {
  title: `Thiệp Cưới Nhà Gái - ${groomName} & ${brideName}`,
  description: `Trân trọng kính mời bạn đến dự lễ Vu Quy và chung vui cùng gia đình nhà gái ${groomName} & ${brideName}`,
}

export default function NhaGaiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <InvitationCard side="gai" />
      <SaveTheDate />
      <DreamSection />
      <WeddingTimeline />
      <PolaroidCollection />
      <RSVPSection side="gai" />
    </main>
  )
}
