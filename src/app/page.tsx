import { LoadingGate } from '@/components/LoadingGate'
import { Header } from '@/components/Header'
import { SaveTheDate } from '@/components/SaveTheDate'
import { WeddingDayTimeline } from '@/components/WeddingDayTimeline'
import { DreamSection } from '@/components/DreamSection'
import { PolaroidCollection } from '@/components/PolaroidCollection'
import { RSVPSection } from '@/components/RSVPSection'
import { ThankYouFooter } from '@/components/ThankYouFooter'

export default function Home() {
  return (
    <LoadingGate>
      <main className="min-h-screen bg-background">
        <Header />
        <SaveTheDate />
        <WeddingDayTimeline />
        <DreamSection />
        <PolaroidCollection />
        <RSVPSection />
        <ThankYouFooter />
      </main>
    </LoadingGate>
  )
}
