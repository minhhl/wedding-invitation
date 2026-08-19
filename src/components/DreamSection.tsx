'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { dreamPolaroidImage } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface DreamLetter {
  char: string
  top: number
  left: number
  size: number
  rotate: number
}

// Fixed design canvas (px) — scaled as a whole via the wrapper below, so the
// hand-tuned overlap between letters stays identical at every breakpoint.
const CANVAS_WIDTH = 330
const CANVAS_HEIGHT = 560

const DREAM_LETTERS: DreamLetter[] = [
  { char: 'D', top: 0, left: 0, size: 210, rotate: -2 },
  { char: 'R', top: 14, left: 118, size: 185, rotate: 3 },
  { char: 'E', top: 158, left: -12, size: 210, rotate: -1.5 },
  { char: 'A', top: 182, left: 128, size: 195, rotate: 2.5 },
  { char: 'M', top: 342, left: 8, size: 235, rotate: -1.5 },
]

const QUOTE_LINES = [
  'Some dreams are meant to last forever,',
  'just like true love.',
  'When two hearts stay faithful',
  'through every season,',
  'forever becomes more than a promise —',
  'it becomes reality.',
]

export function DreamSection() {
  return (
    <section className="silk-bg relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-[3fr_2fr] md:gap-8 md:px-10">
        <div className="flex justify-center md:justify-start">
          <div
            className="relative origin-top scale-[0.62] sm:scale-[0.78] md:scale-[0.92] lg:scale-105"
            style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          >
            {DREAM_LETTERS.map((letter, i) => (
              <motion.span
                key={letter.char}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1, delay: i * 0.15, ease: EASE }}
                className="absolute font-editorial leading-none"
                style={{
                  top: letter.top,
                  left: letter.left,
                  fontSize: letter.size,
                  color: 'var(--color-ivory-gold)',
                  transform: `rotate(${letter.rotate}deg)`,
                }}
              >
                {letter.char}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="text-center md:text-left"
        >
          <p className="font-editorial text-base italic leading-loose text-text/75 sm:text-lg">
            {QUOTE_LINES.map((line, i) => (
              <span key={line}>
                {line}
                {i < QUOTE_LINES.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        className="polaroid relative z-10 mx-auto mt-20 w-[72%] max-w-[280px] md:mt-24"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={dreamPolaroidImage}
            alt={`${groomName} & ${brideName}`}
            fill
            className="photo-tone object-cover"
            sizes="(max-width: 768px) 72vw, 280px"
          />
        </div>
        <p className="pt-4 text-center font-heading text-lg uppercase tracking-[0.15em] text-champagne">
          Love Forever
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        className="relative z-10 mx-auto mt-16 flex max-w-xs flex-col items-center gap-5 text-center font-heading text-base uppercase tracking-[0.1em] text-ink/80 md:mt-20"
      >
        <span>Two hearts</span>
        <span className="h-px w-8 bg-champagne/40" />
        <span>One journey</span>
        <span className="h-px w-8 bg-champagne/40" />
        <span>A lifetime of love</span>
      </motion.div>

      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-white md:h-16"
        aria-hidden
      >
        <path
          d="M0 30 C 60 10, 120 50, 200 30 S 340 10, 400 30 L 400 60 L 0 60 Z"
          fill="currentColor"
          opacity="0.65"
        />
      </svg>
    </section>
  )
}
