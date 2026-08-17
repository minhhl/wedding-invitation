'use client'

import { useCountdown } from '@/hooks/useCountdown'
import { motion, type Variants } from 'framer-motion'
import { weddingDateTime } from '@/lib/weddingData'

export function Countdown() {
  const countdown = useCountdown(weddingDateTime)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  const units = [
    { label: 'Ngày', value: countdown.days },
    { label: 'Giờ', value: countdown.hours },
    { label: 'Phút', value: countdown.minutes },
    { label: 'Giây', value: countdown.seconds },
  ]

  return (
    <section id="countdown" className="relative py-24 bg-wedding-ivory overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-wedding-champagne/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p variants={itemVariants} className="subtle-text mb-4">
          Chương Một — Ngày Hội Ngộ
        </motion.p>
        <motion.h2 variants={itemVariants} className="heading-2 text-wedding-brown mb-16">
          Chỉ Còn Lại
        </motion.h2>

        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {units.map((unit) => (
            <motion.div key={unit.label} variants={itemVariants} className="text-center">
              <div className="font-playfair text-4xl md:text-6xl font-medium text-wedding-brown mb-3">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-[0.65rem] md:text-xs text-wedding-gold uppercase tracking-[0.2em] font-sans font-medium">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
