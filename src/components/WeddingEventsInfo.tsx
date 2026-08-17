'use client'

import { motion } from 'framer-motion'
import { CalendarDays, CalendarPlus, Church, Clock, Home, Landmark, Navigation, Wine } from 'lucide-react'
import {
  weddingEvents,
  formatVietnameseDate,
  googleMapsUrl,
  googleCalendarUrl,
  type WeddingEventData,
} from '@/lib/weddingData'

const icons: Record<string, React.ReactNode> = {
  'brides-family': <Home size={26} strokeWidth={1.5} />,
  ceremony: <Church size={26} strokeWidth={1.5} />,
  reception: <Wine size={26} strokeWidth={1.5} />,
}

function EventCard({ event, isReverse }: { event: WeddingEventData; isReverse?: boolean }) {
  const date = formatVietnameseDate(new Date(event.datetime))

  return (
    <motion.div
      initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`flex ${isReverse ? 'flex-row-reverse' : 'flex-row'} gap-6 items-center`}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="hidden md:flex flex-shrink-0 w-16 h-16 items-center justify-center bg-wedding-champagne/20 rounded-full text-wedding-gold"
      >
        {icons[event.id]}
      </motion.div>

      {/* Content */}
      <motion.div
        whileHover={{ translateY: -5 }}
        className="flex-1 paper-card p-6 md:p-8 transition-transform duration-500 hover:-translate-y-1"
      >
        <h3 className="heading-4 text-wedding-brown mb-4">{event.title}</h3>

        <div className="space-y-3">
          {/* Date */}
          <div className="flex items-start gap-3">
            <CalendarDays className="text-wedding-gold w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-wedding-brown/70 text-sm font-sans">{date}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <Clock className="text-wedding-gold w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-wedding-brown/70 text-sm font-sans">{event.time}</p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3">
            <Landmark className="text-wedding-gold w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-wedding-brown font-sans font-semibold text-sm">{event.venue}</p>
              <p className="text-wedding-brown/60 text-xs mt-1">{event.address}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-2">
          <motion.a
            href={googleMapsUrl(event.address)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wedding-champagne/10 hover:bg-wedding-champagne/20 text-wedding-gold rounded-full text-xs font-sans font-semibold transition-all duration-300"
          >
            <Navigation size={14} />
            Chỉ Đường
          </motion.a>
          <motion.a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-wedding-champagne/10 hover:bg-wedding-champagne/20 text-wedding-gold rounded-full text-xs font-sans font-semibold transition-all duration-300"
          >
            <CalendarPlus size={14} />
            Thêm Vào Lịch
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function WeddingEventsInfo() {
  return (
    <section className="relative py-20 bg-wedding-ivory overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-champagne/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subtle-text mb-4">Chương Ba — Lời Hứa</p>
          <h2 className="heading-2 text-wedding-brown">Thông Tin Lễ Cưới</h2>
        </motion.div>

        {/* Events */}
        <div className="space-y-12">
          {weddingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} isReverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
