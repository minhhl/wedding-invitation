'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { saveTheDateImages } from '@/lib/images'
import { groomName, brideName, weddingDateParts } from '@/lib/weddingData'

export function SaveTheDate() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto w-[92%] max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <div className="relative grid aspect-[3/4] grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden sm:gap-2">
          {saveTheDateImages.map((src, i) => (
            <div key={src} className="relative overflow-hidden bg-champagne-light/30">
              <Image
                src={src}
                alt={`${groomName} & ${brideName}`}
                fill
                priority={i === 0}
                className="photo-tone object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 260px, 300px"
              />
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center border border-champagne/40 bg-white/95 px-4 py-6 text-center shadow-xl backdrop-blur-sm sm:w-[40%] md:w-[50%] lg:w-[58%] lg:px-6 lg:py-8"
          >
            <div className="heading-3 uppercase leading-[1.15] tracking-[0.1em] text-ink">
              <div>Save</div>
              <div>The</div>
              <div>Date</div>
            </div>

            <div className="my-4 flex flex-col items-center gap-1.5 sm:gap-2 md:my-5">
              {[weddingDateParts.day, weddingDateParts.month, weddingDateParts.year.slice(2)].map(
                (part) => (
                  <span
                    key={part}
                    className="w-12 border border-champagne/50 py-1 font-heading text-sm text-champagne sm:w-14 sm:text-base lg:w-16 lg:text-lg"
                  >
                    {part}
                  </span>
                )
              )}
            </div>

            <div className="space-y-1 text-[0.55rem] font-medium uppercase tracking-[0.2em] text-text sm:text-[0.6rem] lg:text-[0.65rem]">
              <div>{groomName}</div>
              <div className="script-text text-base normal-case tracking-normal text-champagne">
                &amp;
              </div>
              <div>{brideName}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
