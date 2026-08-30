'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LadiGroup, LadiHeadline, LadiImage, LadiCanvas } from '@/components/ladi'
import { PlasterBackground } from '@/components/PlasterBackground'
import { weddingDateTime } from '@/lib/weddingData'
import { paperStrip } from '@/lib/decor'
import { EASE } from '@/lib/motion'

const SECTION_HEIGHT = 200

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft {
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000))
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const pad = (n: number) => n.toString().padStart(2, '0')

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

const ITEM_WIDTH = 91.5

/** Live DD:HH:MM:SS countdown to the wedding date, cloned from the GROUP38
 * block (nawngswedding.online/maiphuongvietduc) — same coordinate frame,
 * same two script/slab fonts, recolored into this project's champagne palette. */
export function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft(weddingDateTime))
    const id = setInterval(() => setTimeLeft(getTimeLeft(weddingDateTime)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <PlasterBackground top={0} left={0} width={420} height={SECTION_HEIGHT} />

        <LadiImage top={64} left={-2} width={420} height={134} src={paperStrip} alt="" />

        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <LadiHeadline
            top={0}
            left={56.5}
            width={307}
            fontFamily="var(--font-script-countdown)"
            fontSize={60}
            lineHeight={1.6}
            color="var(--color-champagne)"
            textAlign="center"
          >
            Our wedding day
          </LadiHeadline>

          <LadiGroup top={92} left={27} width={366} height={67}>
            {UNITS.map(({ key, label }, i) => (
              <LadiHeadline
                key={`label-${key}`}
                top={54}
                left={8 + i * ITEM_WIDTH}
                width={71}
                fontFamily="var(--font-slab)"
                fontSize={12}
                lineHeight={1.1}
                color="#000"
                textAlign="center"
              >
                {label}
              </LadiHeadline>
            ))}

            <div style={{ position: 'absolute', top: 0, left: 0, width: 366, height: 65, display: 'flex' }}>
              {UNITS.map(({ key }) => (
                <div
                  key={`value-${key}`}
                  style={{
                    flex: `0 0 ${ITEM_WIDTH}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-slab)',
                    fontSize: 36,
                    letterSpacing: 1,
                    color: 'var(--color-champagne)',
                  }}
                >
                  {timeLeft ? (key === 'days' ? timeLeft.days : pad(timeLeft[key])) : '00'}
                </div>
              ))}
            </div>

            {[0, 1, 2].map((i) => (
              <LadiHeadline
                key={`colon-${i}`}
                top={12}
                left={72 + i * ITEM_WIDTH}
                width={32}
                fontFamily="var(--font-heading)"
                fontSize={38}
                lineHeight={1.1}
                color="var(--color-champagne)"
                textAlign="center"
              >
                :
              </LadiHeadline>
            ))}
          </LadiGroup>
        </motion.div>
      </LadiCanvas>
    </section>
  )
}
