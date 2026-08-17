'use client'

import { Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { InvitationCover } from '@/components/InvitationCover'
import { HeroSection } from '@/components/HeroSection'
import { Countdown } from '@/components/Countdown'
import { FamilyIntroduction } from '@/components/FamilyIntroduction'
import { PhotoGallery } from '@/components/PhotoGallery'
import { WeddingEventsInfo } from '@/components/WeddingEventsInfo'
import { EventTimeline } from '@/components/EventTimeline'
import { DressCode } from '@/components/DressCode'
import { RSVPForm } from '@/components/RSVPForm'
import { GuestBook } from '@/components/GuestBook'
import { GiftInformation } from '@/components/GiftInformation'
import { ClosingMessage } from '@/components/ClosingMessage'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="min-h-screen bg-wedding-ivory">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Suspense fallback={null} key="cover">
            <InvitationCover onOpen={() => setIsOpen(true)} />
          </Suspense>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <HeroSection />
            <Countdown />
            <FamilyIntroduction />
            <PhotoGallery />
            <WeddingEventsInfo />
            <EventTimeline />
            <DressCode />
            <RSVPForm />
            <GuestBook />
            <GiftInformation />
            <ClosingMessage />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
