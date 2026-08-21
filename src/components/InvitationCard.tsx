'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { weddingScheduleChapters, googleMapsDirectionsUrl } from '@/lib/weddingSchedule'
import { groomName, brideName } from '@/lib/weddingData'
import { PearlBorder } from '@/components/decor/PearlBorder'
import { FloralCorner } from '@/components/decor/FloralCorner'
import { WaxSeal } from '@/components/decor/WaxSeal'
import { SatinRibbonBow } from '@/components/decor/SatinRibbon'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// The reception is the event guests actually need directions/timing for.
const receptionChapter = weddingScheduleChapters[weddingScheduleChapters.length - 1]
const receptionEvent = receptionChapter.events[receptionChapter.events.length - 1]

// Vietnamese naming convention: the given name is the last word.
const initial = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? name[0]

const WAVE_PATH =
  'M0 20 C 42 4, 82 4, 124 20 S 208 36, 250 20 S 332 4, 340 20 L340 28 L0 28 Z'

function WaveCap({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 340 28"
      preserveAspectRatio="none"
      className="block h-6 w-full text-white sm:h-7"
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
      aria-hidden
    >
      <path d={WAVE_PATH} fill="currentColor" stroke="var(--color-champagne)" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  )
}

function OrchidSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 70"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M4 66 C 30 50, 46 40, 100 6" />
      {[
        [22, 55],
        [38, 45],
        [55, 34],
        [72, 23],
        [88, 13],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
          <ellipse rx="6" ry="3.5" transform="rotate(-30)" />
          <ellipse rx="6" ry="3.5" transform="rotate(30)" />
          <circle r="1.4" fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  )
}

function LeafSprig({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 44"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M3 40 C 18 34, 32 22, 45 4" strokeLinecap="round" />
      {[
        [11, 33],
        [19, 27],
        [27, 20],
        [34, 13],
        [40, 7],
      ].map(([cx, cy], i) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="6"
          ry="2.8"
          transform={`rotate(${-38 + i * 3} ${cx} ${cy})`}
          fill="currentColor"
          fillOpacity="0.18"
        />
      ))}
    </svg>
  )
}

export function InvitationCard() {
  return (
    <section className="silk-bg relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 mx-auto w-[90%] max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative drop-shadow-[0_30px_60px_-40px_rgba(43,43,43,0.4)]"
        >
          <PearlBorder className="z-20" />

          <SatinRibbonBow className="absolute left-1/2 top-0 z-20 h-10 w-24 -translate-x-1/2 -translate-y-1/2 sm:h-12 sm:w-28" />

          <div className="relative">
            <WaveCap />
          </div>

          <div className="relative bg-white px-8 py-8 text-center sm:px-12">
            <FloralCorner className="pointer-events-none absolute -left-3 -top-3 h-16 w-20 sm:h-20 sm:w-24" />
            <FloralCorner
              flip
              className="pointer-events-none absolute -right-3 -top-3 h-16 w-20 sm:h-20 sm:w-24"
            />

            <div className="relative mx-auto flex h-20 w-36 items-center justify-center">
              <LeafSprig
                flip
                className="absolute -left-3 -top-6 h-8 w-14 rotate-[10deg] text-champagne/70"
              />
              <div className="absolute left-0 flex h-20 w-20 items-center justify-center rounded-full border border-champagne/50">
                <span className="font-heading text-2xl text-champagne">{initial(groomName)}</span>
              </div>
              <div className="absolute right-0 flex h-20 w-20 items-center justify-center rounded-full border border-champagne/50">
                <span className="font-heading text-2xl text-champagne">{initial(brideName)}</span>
              </div>
              <LeafSprig className="absolute -right-3 -bottom-6 h-8 w-14 rotate-[10deg] text-champagne/70" />
            </div>

            <p className="mt-10 font-body text-xs leading-loose tracking-[0.15em] text-text/70 sm:text-sm">
              TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH
              <br />
              ĐẾN THAM DỰ BUỔI TIỆC CHUNG VUI CÙNG
              <br />
              GIA ĐÌNH CHÚNG TÔI
            </p>

            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-text/50">
              Tại nhà hàng tiệc cưới
            </p>
            <p className="script-flourish mt-2 text-4xl text-champagne sm:text-5xl">
              {receptionEvent.venueName ?? receptionEvent.title}
            </p>

            <div className="mt-8 space-y-0.5 text-xs uppercase tracking-[0.18em] text-text/60">
              {receptionEvent.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-8 flex justify-center divide-x divide-champagne/30 border-y border-champagne/30 py-3 text-xs uppercase tracking-[0.2em] text-ink">
              <span className="px-4">{receptionChapter.label}</span>
              <span className="px-4">{receptionChapter.date}</span>
              <span className="px-4">{receptionEvent.time}</span>
            </div>

            <a
              href={googleMapsDirectionsUrl(receptionEvent.fullAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="champagne-glow mt-9 inline-flex items-center gap-1.5 border border-champagne/40 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.25em] text-ink"
            >
              <MapPin size={13} strokeWidth={1.5} />
              Chỉ Đường
            </a>

            <OrchidSprig className="mx-auto mt-10 h-12 w-24 text-champagne/60" />

            <WaxSeal
              className="mx-auto mt-6 h-12 w-12"
              initials={`${initial(groomName)}${initial(brideName)}`}
            />
          </div>

          <WaveCap flip />
        </motion.div>
      </div>
    </section>
  )
}
