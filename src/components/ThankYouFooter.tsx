'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { footerImage } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'

export function ThankYouFooter() {
  return (
    <footer className="relative h-[85svh] min-h-[560px] w-full overflow-hidden bg-ink md:h-[90svh]">
      <Image
        src={footerImage}
        alt={`${groomName} & ${brideName}`}
        fill
        className="photo-tone object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/40 to-ink/15" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9 }}
        className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-[100px] text-center text-white"
      >
        <p className="max-w-md font-heading text-lg italic leading-relaxed md:text-xl">
          Hẹn gặp bạn trong ngày đặc biệt nhất của chúng mình.
        </p>
        <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-white/80">
          Sẽ thật hạnh phúc khi có bạn ở đó, cùng sẻ chia niềm vui và chứng kiến khoảnh khắc ý
          nghĩa này của chúng mình.
        </p>

        <p className="script-text mt-9 text-5xl text-champagne-light md:text-6xl">Thank you!</p>

        <p className="mt-8 text-xs uppercase tracking-[0.35em] text-white/75">
          {groomName} &amp; {brideName}
        </p>
      </motion.div>
    </footer>
  )
}
