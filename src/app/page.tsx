import { Header } from '@/components/Header'
import { SaveTheDate } from '@/components/SaveTheDate'
import { InvitationCard } from '@/components/InvitationCard'
import { DreamSection } from '@/components/DreamSection'
import { PolaroidCollection } from '@/components/PolaroidCollection'
import { RSVPSection } from '@/components/RSVPSection'
import { ThankYouFooter } from '@/components/ThankYouFooter'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <InvitationCard />
      <SaveTheDate />
      <DreamSection />
      <PolaroidCollection />
      <RSVPSection />
      <ThankYouFooter />
    </main>
  )
}
