'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { endlessRomanceImages } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function PolaroidCollection() {
  const [wide, tall, ...grid] = endlessRomanceImages

  return (
    <section className="bg-white py-20 md:py-28">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="script-flourish mb-10 text-center text-5xl text-champagne md:mb-14 md:text-6xl"
      >
        Endless Romance
      </motion.p>

      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {[wide, tall].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden bg-champagne-light/30"
            >
              <Image
                src={src}
                alt={`${groomName} & ${brideName}`}
                fill
                className="photo-tone object-cover"
                sizes="(max-width: 768px) 50vw, 480px"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:mt-2 sm:gap-2 md:grid-cols-4">
          {grid.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
              className="relative aspect-square overflow-hidden bg-champagne-light/30"
            >
              <Image
                src={src}
                alt={`${groomName} & ${brideName}`}
                fill
                className="photo-tone object-cover"
                sizes="(max-width: 768px) 50vw, 240px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
