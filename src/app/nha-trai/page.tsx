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
  title: `Thiệp Cưới Nhà Trai - ${groomName} & ${brideName}`,
  description: `Trân trọng kính mời bạn đến dự lễ Thành Hôn và chung vui cùng gia đình nhà trai ${groomName} & ${brideName}`,
}

export default function NhaTraiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <InvitationCard side="trai" />
      <SaveTheDate />
      <DreamSection />
      <WeddingTimeline />
      <PolaroidCollection />
      <RSVPSection side="trai" />
    </main>
  )
}
