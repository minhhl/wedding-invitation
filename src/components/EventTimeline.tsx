'use client'

import { motion, type Variants } from 'framer-motion'
import { weddingEvents } from '@/lib/weddingData'

export function EventTimeline() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-20 md:py-24 bg-wedding-brown overflow-hidden">
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subtle-text mb-4">Lịch Trình</p>
          <h2 className="heading-2 text-wedding-ivory">Hai Ngày Trọng Đại</h2>
        </motion.div>

        <motion.ol
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {weddingEvents.map((event) => (
            <motion.li
              key={event.id}
              variants={itemVariants}
              className="flex items-baseline gap-6 md:gap-10 border-b border-wedding-champagne/15 pb-8 last:border-b-0"
            >
              <div className="w-24 md:w-32 flex-shrink-0 text-right">
                <p className="font-playfair text-2xl md:text-3xl text-wedding-gold">{event.time}</p>
              </div>
              <div className="w-px self-stretch bg-wedding-champagne/25" />
              <div>
                <p className="text-[0.65rem] text-wedding-champagne uppercase tracking-[0.25em] font-sans mb-1">
                  {event.dayLabel} · {new Date(event.datetime).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
                <p className="font-cormorant text-xl md:text-2xl text-wedding-ivory">{event.title}</p>
                <p className="text-wedding-ivory/50 text-sm font-sans mt-1">{event.venue}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
