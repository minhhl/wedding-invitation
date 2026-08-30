import { Header } from '@/components/Header'
import { MusicPlayer } from '@/components/MusicPlayer'
import { InvitationCard } from '@/components/InvitationCard'
import { WeddingCountdown } from '@/components/WeddingCountdown'
import { WeddingCalendar } from '@/components/WeddingCalendar'
import { DreamSection } from '@/components/DreamSection'
import { PolaroidCollection } from '@/components/PolaroidCollection'
import { RSVPSection } from '@/components/RSVPSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <MusicPlayer />
      <Header />
      <InvitationCard />
      <WeddingCountdown />
      <WeddingCalendar />
      <DreamSection />
      <PolaroidCollection />
      <RSVPSection />
    </main>
  )
}
