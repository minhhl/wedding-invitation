'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Bird, Wine, UtensilsCrossed, MapPin, CalendarPlus } from 'lucide-react'
import {
  weddingScheduleChapters,
  googleMapsDirectionsUrl,
  googleCalendarUrl,
  outlookCalendarUrl,
  icsDataUrl,
  type ScheduleEvent,
} from '@/lib/weddingSchedule'
import { groomName, brideName } from '@/lib/weddingData'
import { timelineBackgroundImage } from '@/lib/images'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function EventIcon({ type }: { type: ScheduleEvent['icon'] }) {
  if (type === 'dove') return <Bird size={17} strokeWidth={1.3} />
  if (type === 'wine') return <Wine size={17} strokeWidth={1.3} />
  if (type === 'utensils') return <UtensilsCrossed size={17} strokeWidth={1.3} />
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  )
}

function FloralLineArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 420"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M30 8 C 8 60, 52 108, 30 158 S 8 230, 30 272 S 52 334, 30 410" />
      <circle cx="16" cy="72" r="4" />
      <circle cx="46" cy="134" r="3" />
      <circle cx="14" cy="200" r="3.5" />
      <circle cx="44" cy="264" r="4" />
      <circle cx="18" cy="336" r="3" />
    </svg>
  )
}

function AddToCalendar({ event, title }: { event: ScheduleEvent; title: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const fileSlug = event.title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/\s+/g, '-')

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="champagne-glow inline-flex items-center gap-1.5 border border-champagne/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink"
      >
        <CalendarPlus size={13} strokeWidth={1.5} />
        Thêm Vào Lịch
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 top-full z-20 mt-2 w-48 border border-champagne/25 bg-white py-1.5 text-left shadow-lg"
          >
            <a
              href={googleCalendarUrl(event, title)}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-[0.65rem] uppercase tracking-wider text-text hover:bg-background hover:text-champagne"
            >
              Google Calendar
            </a>
            <a
              href={icsDataUrl(event, title)}
              download={`${fileSlug}.ics`}
              className="block px-4 py-2.5 text-[0.65rem] uppercase tracking-wider text-text hover:bg-background hover:text-champagne"
            >
              Apple Calendar
            </a>
            <a
              href={outlookCalendarUrl(event, title)}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-[0.65rem] uppercase tracking-wider text-text hover:bg-background hover:text-champagne"
            >
              Outlook Calendar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TimelineRow({ event, index }: { event: ScheduleEvent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      className="relative flex gap-6 md:gap-8"
    >
      <span className="relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-champagne/40 bg-background text-champagne md:h-12 md:w-12">
        <EventIcon type={event.icon} />
      </span>

      <div className="flex-1 pb-14 text-left last:pb-0">
        <p className="font-heading text-lg text-champagne md:text-xl">{event.time}</p>
        <h3 className="mt-1 font-heading text-xl uppercase tracking-[0.06em] text-ink md:text-2xl">
          {event.title}
        </h3>
        {event.venueName && (
          <p className="mt-2 font-heading text-sm text-ink/70 md:text-base">{event.venueName}</p>
        )}
        <div className="mt-2 space-y-0.5 text-xs uppercase tracking-[0.18em] text-text/50">
          {event.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={googleMapsDirectionsUrl(event.fullAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="champagne-glow inline-flex items-center gap-1.5 border border-champagne/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink"
          >
            <MapPin size={13} strokeWidth={1.5} />
            Chỉ Đường
          </a>
          <AddToCalendar
            event={event}
            title={`${event.title} — ${groomName} & ${brideName}`}
          />
        </div>
      </div>
    </motion.div>
  )
}

function Chapter({ label, date, events }: (typeof weddingScheduleChapters)[number]) {
  return (
    <div className="mt-16 first:mt-0 md:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-center"
      >
        <p className="font-heading text-2xl uppercase tracking-[0.15em] text-ink md:text-3xl">
          {label}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-champagne">{date}</p>
        <span className="mx-auto mt-5 block h-px w-10 bg-champagne/40" />
      </motion.div>

      <div className="relative mt-10 md:mt-12">
        <div
          aria-hidden
          className="absolute bottom-2 left-[22px] top-2 w-px bg-champagne/20 md:left-6"
        />
        {events.map((event, i) => (
          <TimelineRow key={event.title} event={event} index={i} />
        ))}
      </div>
    </div>
  )
}

export function WeddingDayTimeline() {
  return (
    <section className="silk-bg relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.14] [mask-image:radial-gradient(closest-side,black,transparent)] md:-right-20 md:-top-20 md:h-96 md:w-96"
      >
        <Image
          src={timelineBackgroundImage}
          alt=""
          fill
          className="object-cover grayscale-[20%]"
          sizes="384px"
        />
      </div>

      <FloralLineArt className="pointer-events-none absolute left-2 top-0 hidden h-full w-14 text-champagne/25 md:block" />
      <FloralLineArt className="pointer-events-none absolute right-2 top-0 hidden h-full w-14 scale-x-[-1] text-champagne/25 md:block" />

      <div className="relative z-10 mx-auto w-[90%] max-w-[560px] md:max-w-[640px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center"
        >
          <p className="eyebrow mb-4">Wedding Timeline</p>
          <div className="font-heading text-2xl uppercase tracking-[0.1em] text-ink md:text-3xl">
            <p>{groomName}</p>
            <p className="script-text my-1 text-xl normal-case tracking-normal text-champagne">
              &amp;
            </p>
            <p>{brideName}</p>
          </div>
        </motion.div>

        {weddingScheduleChapters.map((chapter) => (
          <Chapter key={chapter.label} {...chapter} />
        ))}
      </div>
    </section>
  )
}
