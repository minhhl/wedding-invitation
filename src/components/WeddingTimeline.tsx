'use client'

import { motion, type Variants } from 'framer-motion'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline } from '@/components/ladi'
import { PlasterBackground } from '@/components/PlasterBackground'
import { weddingScheduleChapters } from '@/lib/weddingSchedule'
import { groomName, brideName } from '@/lib/weddingData'
import { timelinePhoto } from '@/lib/images'
import { EASE } from '@/lib/motion'
import {
  timelineWordmark,
  iconCar,
  iconFood,
  iconDance,
  ringsPair,
  pearl,
} from '@/lib/decor'
import type { ScheduleEvent } from '@/lib/weddingSchedule'

const SECTION_HEIGHT = 505

// Photo column on the left, its icon overlapping the photo's edge, then a
// pearl bead threaded on the vertical line marking each row, then time +
// label text further right — icon | pearl | text, left to right.
const TIMELINE_TOP = 101 // flush with the wordmark's bottom edge (top 0 + height 101)
const PHOTO_WIDTH = 273 // 65% of the 420 design width
const PHOTO_HEIGHT = 400
const PEARL_D = 24
const PEARL_R = PEARL_D / 2
// Icons sit in their own fixed square (objectFit "contain", centered) so
// every icon aligns to the same right edge and vertical center regardless of
// its own native aspect ratio. Both the icon and the pearl are centered on
// the same row-center Y, with a fixed gap between the icon's right edge and
// the pearl's left edge.
const ICON_BOX = 60 // 40 * 1.5
const ICON_PEARL_GAP = 20
const ICON_LEFT = PHOTO_WIDTH - PEARL_R - ICON_PEARL_GAP - ICON_BOX
const TEXT_LEFT = PHOTO_WIDTH + PEARL_R + 16
const TEXT_WIDTH = 420 - TEXT_LEFT - 16

const rowContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.7, staggerChildren: 0.15 } },
}
const rowItemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

// Keyed by ScheduleEvent['icon'] so the row list always matches whatever
// chapters/events weddingScheduleChapters holds — adding, removing, or
// reordering days/events never leaves a row pointing at a missing chapter.
const iconByType: Record<ScheduleEvent['icon'], string> = {
  dove: iconCar,
  rings: ringsPair,
  utensils: iconFood,
  wine: iconFood,
}

const rows = weddingScheduleChapters
  .flatMap((chapter) => chapter.events)
  .map((event) => ({ icon: iconByType[event.icon], event }))

// Evenly space the medallions from just below the photo's top edge to just
// above its bottom edge, regardless of how many rows there are.
const ROW_MARGIN = 58
const rowCenters = rows.map(
  (_, i) => TIMELINE_TOP + ROW_MARGIN + ((PHOTO_HEIGHT - ROW_MARGIN * 2) * i) / (rows.length - 1)
)

function timeLabel(time: string) {
  return time.replace(':', 'H')
}

export function WeddingTimeline() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <PlasterBackground top={0} left={0.4} width={420} height={SECTION_HEIGHT} />

        <LadiGroup top={5} left={0} width={420} height={SECTION_HEIGHT - 10}>
          <motion.div
            style={{ position: 'absolute', top: 0, left: 15.5, width: 387, height: 101 }}
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <LadiImage top={0} left={0} width={387} height={101} src={timelineWordmark} alt="Timeline" />
          </motion.div>

          <motion.div
            style={{ position: 'absolute', top: TIMELINE_TOP, left: 0, width: 420, height: PHOTO_HEIGHT }}
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
          >
            <div
              className="bg-[rgb(230,225,212)]"
              style={{
                position: 'absolute',
                top: 0,
                left: PHOTO_WIDTH,
                width: 420 - PHOTO_WIDTH,
                height: PHOTO_HEIGHT,
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: PHOTO_WIDTH,
                height: PHOTO_HEIGHT,
                overflow: 'hidden',
              }}
            >
              <LadiImage
                top={0}
                left={0}
                width={PHOTO_WIDTH}
                height={PHOTO_HEIGHT}
                src={timelinePhoto}
                alt={`${groomName} & ${brideName}`}
                objectPosition="50% 20%"
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' }} />
            </div>
          </motion.div>

          <motion.div
            style={{
              position: 'absolute',
              top: rowCenters[0],
              left: PHOTO_WIDTH - 0.5,
              width: 1,
              height: rowCenters[rowCenters.length - 1] - rowCenters[0],
              backgroundColor: 'var(--color-ivory-gold)',
              transformOrigin: 'top',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          />

          <motion.div
            style={{ position: 'absolute', inset: 0 }}
            variants={rowContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {rows.map((row, i) => (
              <motion.div
                key={row.event.title}
                variants={rowItemVariants}
                style={{ position: 'absolute', inset: 0 }}
              >
                <LadiImage
                  top={rowCenters[i] - ICON_BOX / 2}
                  left={ICON_LEFT}
                  width={ICON_BOX}
                  height={ICON_BOX}
                  src={row.icon}
                  alt=""
                  objectFit="contain"
                  objectPosition="50% 50%"
                  className="[filter:brightness(0)_invert(1)] opacity-90"
                />

                <LadiImage
                  top={rowCenters[i] - PEARL_R}
                  left={PHOTO_WIDTH - PEARL_R}
                  width={PEARL_D}
                  height={PEARL_D}
                  src={pearl}
                  alt=""
                />

                <LadiHeadline
                  top={rowCenters[i] - 24}
                  left={TEXT_LEFT}
                  width={TEXT_WIDTH}
                  fontFamily="var(--font-heading)"
                  fontSize={20}
                  letterSpacing={1.5}
                  color="var(--color-ink)"
                  textAlign="left"
                >
                  {timeLabel(row.event.time)}
                </LadiHeadline>
                <LadiHeadline
                  top={rowCenters[i] + 4}
                  left={TEXT_LEFT}
                  width={TEXT_WIDTH}
                  fontFamily="var(--font-body)"
                  fontSize={12}
                  letterSpacing={2}
                  color="var(--color-text)"
                  textAlign="left"
                  textTransform="uppercase"
                >
                  {row.event.title}
                </LadiHeadline>
              </motion.div>
            ))}
          </motion.div>
        </LadiGroup>
      </LadiCanvas>
    </section>
  )
}
