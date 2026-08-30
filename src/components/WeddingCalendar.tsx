'use client'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { LadiCanvas, LadiGroup, LadiHeadline, LadiImage, LadiLine } from '@/components/ladi'
import { PlasterBackground } from '@/components/PlasterBackground'
import {
  groomName,
  brideName,
  groomFather,
  groomMother,
  brideFather,
  brideMother,
} from '@/lib/weddingData'
import { weddingOfGroomImage, weddingOfBrideImage } from '@/lib/images'
import { EASE } from '@/lib/motion'
import type { InvitationSide } from '@/components/InvitationCard'

interface WeddingPerson {
  name: string
  image: string
  imageScale: number
  familyLabel: string
  father: string
  mother: string
}

const groomPerson: WeddingPerson = {
  name: groomName,
  image: weddingOfGroomImage,
  imageScale: 1,
  familyLabel: 'Nhà trai',
  father: groomFather,
  mother: groomMother,
}

const bridePerson: WeddingPerson = {
  name: brideName,
  image: weddingOfBrideImage,
  imageScale: 1.4,
  familyLabel: 'Nhà gái',
  father: brideFather,
  mother: brideMother,
}

const SECTION_HEIGHT = 700

const WEEKDAYS = [
  { label: 'thur', left: 0, width: 58 },
  { label: 'fri', left: 61.5, width: 57 },
  { label: 'sat', left: 122, width: 54 },
  { label: 'sun', left: 179.5, width: 54 },
  { label: 'mon', left: 237, width: 58 },
  { label: 'tue', left: 298.5, width: 51 },
  { label: 'wed', left: 353, width: 50 },
]

// Centered on the actual wedding date (weddingDateParts, 20/09/2026 — a
// Thursday-Sunday-Wednesday window: Sun 20 falls at index 3, matching the
// heart decoration's fixed column position below.
const DATES = [
  { label: '17', left: 5, width: 58 },
  { label: '18', left: 66.5, width: 57 },
  { label: '19', left: 127, width: 54 },
  { label: '20', left: 184.5, width: 54 },
  { label: '21', left: 242, width: 58 },
  { label: '22', left: 303.5, width: 51 },
  { label: '23', left: 358, width: 50 },
]

/** Calendar-week strip + "Wedding of" photo pairing, cloned from the
 * summergreen reference (nawngswedding.online/summergreen) — same
 * coordinate frame, recolored into this project's champagne palette, with
 * the reference's stock photos swapped for our own. */
export function WeddingCalendar({ side = 'trai' }: { side?: InvitationSide }) {
  const leftPerson = side === 'gai' ? bridePerson : groomPerson
  const rightPerson = side === 'gai' ? groomPerson : bridePerson

  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <PlasterBackground top={0} left={0} width={420} height={SECTION_HEIGHT} />

        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <LadiHeadline
            top={0}
            left={0}
            width={420}
            fontFamily="var(--font-calendar)"
            fontSize={18}
            letterSpacing={1}
            color="var(--color-champagne)"
            textAlign="center"
            textTransform="uppercase"
          >
            September 2026
          </LadiHeadline>

          <LadiGroup top={41} left={5} width={403} height={19}>
            {WEEKDAYS.map((d) => (
              <LadiHeadline
                key={d.label}
                top={0}
                left={d.left}
                width={d.width}
                fontFamily="var(--font-calendar)"
                fontSize={12}
                color="var(--color-champagne)"
                textAlign="center"
                textTransform="uppercase"
              >
                {d.label}
              </LadiHeadline>
            ))}
          </LadiGroup>

          {DATES.map((d) => (
            <LadiHeadline
              key={d.label}
              top={71}
              left={d.left}
              width={d.width}
              fontFamily="var(--font-calendar)"
              fontSize={12}
              color="var(--color-champagne)"
              textAlign="center"
              textTransform="uppercase"
            >
              {d.label}
            </LadiHeadline>
          ))}

          <LadiGroup top={53} left={187.5} width={48} height={77}>
            <motion.div
              style={{ position: 'absolute', top: 0, left: 0, color: 'var(--color-champagne)' }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={48} strokeWidth={0.75} />
            </motion.div>
            <LadiLine top={45} left={23.5} width={1} height={45} color="var(--color-champagne)" />
          </LadiGroup>

          <LadiHeadline
            top={130}
            left={49}
            width={323}
            fontFamily="var(--font-script-countdown)"
            fontSize={44}
            lineHeight={1.6}
            color="var(--color-champagne)"
            textAlign="center"
          >
            Save the date
          </LadiHeadline>

          <LadiImage
            top={225}
            left={14.5}
            width={188.5}
            height={266}
            src={leftPerson.image}
            alt=""
            objectPosition="center 20%"
            scale={leftPerson.imageScale}
            className="rounded-xl border border-champagne"
          />
          <LadiImage
            top={281}
            left={220}
            width={188.5}
            height={266}
            src={rightPerson.image}
            alt=""
            objectPosition="center 20%"
            scale={rightPerson.imageScale}
            className="rounded-xl border border-champagne"
          />

          <LadiHeadline
            top={196}
            left={125}
            width={323}
            fontFamily="var(--font-script-countdown)"
            fontSize={70}
            lineHeight={1.6}
            color="var(--color-champagne)"
            textAlign="center"
          >
            Wedding of
          </LadiHeadline>

          <LadiHeadline
            top={496}
            left={14.5}
            width={200}
            fontFamily="var(--font-calendar)"
            fontSize={24}
            lineHeight={1.6}
            color="var(--color-champagne)"
            textAlign="left"
            textTransform="uppercase"
          >
            {leftPerson.name}
          </LadiHeadline>

          <LadiHeadline
            top={490}
            left={200}
            width={43}
            fontFamily="var(--font-editorial)"
            fontSize={42}
            lineHeight={1.4}
            color="var(--color-quote)"
            textAlign="left"
          >
            &amp;
          </LadiHeadline>

          <LadiHeadline
            top={552}
            left={220}
            width={188.5}
            fontFamily="var(--font-calendar)"
            fontSize={24}
            lineHeight={1.6}
            color="var(--color-champagne)"
            textAlign="right"
            textTransform="uppercase"
          >
            {rightPerson.name}
          </LadiHeadline>

          <LadiGroup top={540} left={14.5} width={175} height={75}>
            <div
              style={{
                position: 'absolute',
                top: 4,
                left: 0,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'var(--color-champagne)',
              }}
            />
            <LadiLine top={10} left={2.5} width={1} height={65} color="var(--color-champagne)" />
            <LadiHeadline
              top={0}
              left={14}
              width={118}
              fontFamily="var(--font-calendar)"
              fontSize={12}
              letterSpacing={1}
              color="var(--color-champagne)"
              textAlign="left"
              textTransform="uppercase"
            >
              {leftPerson.familyLabel}
            </LadiHeadline>
            <LadiHeadline
              top={20}
              left={14}
              width={161}
              fontFamily="var(--font-calendar)"
              fontSize={12}
              lineHeight={1.5}
              color="#000"
              textAlign="left"
            >
              {leftPerson.father}
              <br />
              {leftPerson.mother}
            </LadiHeadline>
          </LadiGroup>

          <LadiGroup top={595} left={220} width={188.5} height={75}>
            <div
              style={{
                position: 'absolute',
                top: 4,
                left: 180,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'var(--color-champagne)',
              }}
            />
            <LadiLine top={10} left={182.5} width={1} height={65} color="var(--color-champagne)" />
            <LadiHeadline
              top={0}
              left={0}
              width={174.5}
              fontFamily="var(--font-calendar)"
              fontSize={12}
              letterSpacing={1}
              color="var(--color-champagne)"
              textAlign="right"
              textTransform="uppercase"
            >
              {rightPerson.familyLabel}
            </LadiHeadline>
            <LadiHeadline
              top={20}
              left={0}
              width={174.5}
              fontFamily="var(--font-calendar)"
              fontSize={12}
              lineHeight={1.5}
              color="#000"
              textAlign="right"
            >
              {rightPerson.father}
              <br />
              {rightPerson.mother}
            </LadiHeadline>
          </LadiGroup>
        </motion.div>
      </LadiCanvas>
    </section>
  )
}
