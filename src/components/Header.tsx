'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { headerImage } from '@/lib/images'
import { groomName, brideName, weddingDateParts } from '@/lib/weddingData'

export function Header() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={headerImage}
          alt={`${groomName} & ${brideName}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 text-center text-white md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display-name text-[clamp(2.25rem,9vw,5.5rem)] uppercase"
        >
          {groomName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="script-text my-1 text-[clamp(1.5rem,4vw,2.5rem)] text-champagne-light sm:my-2"
        >
          &amp;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display-name text-[clamp(2.25rem,9vw,5.5rem)] uppercase"
        >
          {brideName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-7 text-xs tracking-[0.35em] text-white/85 sm:mt-8 md:text-sm"
        >
          {weddingDateParts.day}.{weddingDateParts.month}.{weddingDateParts.year}
        </motion.p>
      </div>
    </section>
  )
}
