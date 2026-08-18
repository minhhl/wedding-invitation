'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { polaroidCollectionImages } from '@/lib/images'

const rotations = [-4, 3, -2, 5]
const offsets = ['md:mt-0', 'md:mt-10', 'md:mt-3', 'md:mt-14']

export function PolaroidCollection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 px-6 md:grid-cols-4 md:gap-x-4">
        {polaroidCollectionImages.map((item, i) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`polaroid ${offsets[i % offsets.length]}`}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="photo-tone object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </div>
            <p className="pt-3 text-center font-heading text-xs italic text-text/60">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
