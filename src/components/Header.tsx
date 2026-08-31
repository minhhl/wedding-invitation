'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline } from '@/components/ladi'
import { headerImage } from '@/lib/images'
import { heroBg } from '@/lib/decor'
import { groomName, brideName, weddingDateParts } from '@/lib/weddingData'
import { EASE } from '@/lib/motion'

const SECTION_HEIGHT = 673

export function Header() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          {/* Satin texture base — the real photo covers almost all of it, this
              shows only at the sliver of a fringe (matches the reference site,
              which layers a texture fallback underneath the cover photo). */}
          <LadiImage top={-5} left={0} width={420} height={678} src={heroBg} alt="" />

          <div style={{ position: 'absolute', top: -5, left: 0, width: 420, height: 678, overflow: 'hidden' }}>
            <Image
              src={headerImage}
              alt={`${groomName} & ${brideName}`}
              fill
              priority
              sizes="420px"
              style={{ objectFit: 'cover', objectPosition: 'center center', transform: 'translateX(25px) scale(1.15)' }}
            />
          </div>

          {/* Bottom gradient for text legibility over the photo. */}
          <div
            style={{
              position: 'absolute',
              top: 436.6,
              left: 0,
              width: 419.6,
              height: 236,
              background: 'linear-gradient(rgba(253,251,251,0) 0%, rgba(0,0,0,0.53) 100%)',
            }}
          />
        </motion.div>

        {/* Diagonal name cascade — groom's name upper-left, "and" script
            bridging the middle, bride's name lower-right, per the reference
            template's GROUP83 (each name left-aligned, the second dropped
            down and indented past the first so they overlap instead of
            stacking as plain lines). */}
        <LadiGroup top={510.524} left={66.52} width={286.96} height={116.07}>
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          >
            <LadiHeadline
              top={0}
              left={12.05}
              width={224}
              fontFamily="var(--font-heading)"
              fontSize={40}
              lineHeight={1.6}
              color="var(--color-offwhite)"
              textAlign="left"
              textTransform="uppercase"
              className="whitespace-nowrap"
            >
              {groomName}
            </LadiHeadline>
          </motion.div>

          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          >
            <LadiHeadline
              top={44.07}
              left={106.96}
              width={180}
              fontFamily="var(--font-heading)"
              fontSize={40}
              lineHeight={1.6}
              color="var(--color-offwhite)"
              textAlign="left"
              textTransform="uppercase"
              className="whitespace-nowrap"
            >
              {brideName}
            </LadiHeadline>
          </motion.div>

          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          >
            <LadiHeadline
              top={35}
              left={60}
              width={106}
              fontFamily="var(--font-editorial)"
              fontSize={34}
              lineHeight={1}
              color="var(--color-offwhite)"
              textAlign="left"
            >
              &amp;
            </LadiHeadline>
          </motion.div>
        </LadiGroup>

        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25, ease: EASE }}
        >
          <LadiHeadline
            top={626.594}
            left={121.105}
            width={181}
            fontFamily="var(--font-script)"
            fontSize={28}
            lineHeight={1}
            letterSpacing={5}
            color="var(--color-offwhite)"
            textAlign="center"
          >
            {weddingDateParts.day}.{weddingDateParts.month}.{weddingDateParts.year}
          </LadiHeadline>
        </motion.div>
      </LadiCanvas>
    </section>
  )
}
