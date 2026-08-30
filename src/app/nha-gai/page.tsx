import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { MusicPlayer } from '@/components/MusicPlayer'
import { InvitationCard } from '@/components/InvitationCard'
import { WeddingCountdown } from '@/components/WeddingCountdown'
import { WeddingCalendar } from '@/components/WeddingCalendar'
import { DreamSection } from '@/components/DreamSection'
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
      <MusicPlayer />
      <Header />
      <InvitationCard side="gai" />
      <WeddingCountdown />
      <WeddingCalendar side="gai" />
      <DreamSection />
      <PolaroidCollection />
      <RSVPSection side="gai" />
    </main>
  )
}
