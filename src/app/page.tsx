import { Header } from '@/components/Header'
import { SaveTheDate } from '@/components/SaveTheDate'
import { InvitationCard } from '@/components/InvitationCard'
import { DreamSection } from '@/components/DreamSection'
import { WeddingTimeline } from '@/components/WeddingTimeline'
import { PolaroidCollection } from '@/components/PolaroidCollection'
import { RSVPSection } from '@/components/RSVPSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <InvitationCard />
      <SaveTheDate />
      <DreamSection />
      <WeddingTimeline />
      <PolaroidCollection />
      <RSVPSection />
    </main>
  )
}
