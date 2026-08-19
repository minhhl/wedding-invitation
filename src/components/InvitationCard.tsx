'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { weddingScheduleChapters, googleMapsDirectionsUrl } from '@/lib/weddingSchedule'
import { groomName, brideName } from '@/lib/weddingData'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// The reception is the event guests actually need directions/timing for.
const receptionChapter = weddingScheduleChapters[weddingScheduleChapters.length - 1]
const receptionEvent = receptionChapter.events[receptionChapter.events.length - 1]

// Vietnamese naming convention: the given name is the last word.
const initial = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? name[0]
const monogram = `${initial(groomName)} · ${initial(brideName)}`

const WAVE_PATH =
  'M0 20 C 42 4, 82 4, 124 20 S 208 36, 250 20 S 332 4, 340 20 L340 28 L0 28 Z'

const PEARL_POSITIONS = [10, 27, 50, 73, 90]

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
          <div className="relative">
            <WaveCap />
            {PEARL_POSITIONS.map((left, i) => (
              <span
                key={left}
                className="absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgba(43,43,43,0.25)] sm:h-2.5 sm:w-2.5"
                style={{ left: `${left}%`, opacity: 0.55 + (i % 2) * 0.45 }}
              />
            ))}
          </div>

          <div className="bg-white px-8 py-8 text-center sm:px-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-champagne/50">
              <span className="script-text text-2xl text-champagne">{monogram}</span>
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
          </div>

          <WaveCap flip />
        </motion.div>
      </div>
    </section>
  )
}
