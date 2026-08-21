import { Header } from '@/components/Header'
import { SaveTheDate } from '@/components/SaveTheDate'
import { InvitationCard } from '@/components/InvitationCard'
import { InvitationCardBride } from '@/components/InvitationCardBride'
import { DreamSection } from '@/components/DreamSection'
import { WeddingTimeline } from '@/components/WeddingTimeline'
import { PolaroidCollection } from '@/components/PolaroidCollection'
import { RSVPSection } from '@/components/RSVPSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <InvitationCardBride />
      <InvitationCard />
      <SaveTheDate />
      <DreamSection />
      <WeddingTimeline />
      <PolaroidCollection />
      <RSVPSection />
    </main>
  )
}
