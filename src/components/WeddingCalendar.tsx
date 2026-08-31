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

// Columns run Monday (T2) through Sunday (CN), Vietnamese calendar convention.
// Absolute canvas-relative lefts, shared by the weekday header and the date
// grid so both rows line up.
const COLUMNS = [
  { label: 'th2', left: 5, width: 58 },
  { label: 'th3', left: 65, width: 57 },
  { label: 'th4', left: 124, width: 54 },
  { label: 'th5', left: 180, width: 54 },
  { label: 'th6', left: 236, width: 58 },
  { label: 'th7', left: 296, width: 51 },
  { label: 'cn', left: 349, width: 50 },
]

const ROW_TOPS = [68, 91, 114, 137, 160]

// Full September 2026 grid (Sep 1 is a Tuesday, so it lands in column
// index 1). null cells are the leading/trailing days from Aug/Oct.
const CALENDAR_WEEKS: (number | null)[][] = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, null, null, null, null],
]

// The actual wedding date (weddingDateParts, 20/09/2026), highlighted below.
const WEDDING_DAY = 20

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
            Tháng 9, 2026
          </LadiHeadline>

          <LadiGroup top={41} left={0} width={420} height={19}>
            {COLUMNS.map((col) => (
              <LadiHeadline
                key={col.label}
                top={0}
                left={col.left}
                width={col.width}
                fontFamily="var(--font-calendar)"
                fontSize={12}
                color="var(--color-champagne)"
                textAlign="center"
                textTransform="uppercase"
              >
                {col.label}
              </LadiHeadline>
            ))}
          </LadiGroup>

          {CALENDAR_WEEKS.map((week, rowIndex) =>
            week.map((day, colIndex) => {
              if (day === null) return null
              const col = COLUMNS[colIndex]
              const rowTop = ROW_TOPS[rowIndex]

              if (day === WEDDING_DAY) {
                return (
                  <motion.div
                    key={day}
                    style={{
                      position: 'absolute',
                      top: rowTop - 10,
                      left: col.left + (col.width - 35) / 2,
                      width: 35,
                      height: 35,
                      color: 'var(--color-champagne)',
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Heart size={35} strokeWidth={0} fill="currentColor" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <span
                      style={{
                        position: 'absolute',
                        inset: 0,
                        paddingTop: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-calendar)',
                        fontSize: 12,
                        color: '#fff',
                      }}
                    >
                      {day}
                    </span>
                  </motion.div>
                )
              }

              return (
                <LadiHeadline
                  key={day}
                  top={rowTop}
                  left={col.left}
                  width={col.width}
                  fontFamily="var(--font-calendar)"
                  fontSize={12}
                  color="var(--color-champagne)"
                  textAlign="center"
                >
                  {day}
                </LadiHeadline>
              )
            }),
          )}

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
            <LadiLine top={10} left={2.5} width={1} height={45} color="var(--color-champagne)" />
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
            <LadiLine top={10} left={182.5} width={1} height={45} color="var(--color-champagne)" />
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
              fontSize={11}
              lineHeight={1.6}
              color="#000"
              textAlign="right"
              className="whitespace-nowrap"
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
