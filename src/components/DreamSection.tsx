'use client'

import { Heart } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline, LadiLine } from '@/components/ladi'
import { PlasterBackground } from '@/components/PlasterBackground'
import { dreamPolaroidImage } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'
import { fabricDrape, photoFrame, pearl } from '@/lib/decor'
import { EASE, fadeUp, staggerContainer } from '@/lib/motion'

const SECTION_HEIGHT = 759

const pearlVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.5, ease: EASE } },
}

export function DreamSection() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <PlasterBackground top={0} left={0} width={420} height={SECTION_HEIGHT} />

        <motion.div
          style={{ position: 'absolute', top: -37, left: -14, width: 433, height: 796 }}
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <LadiImage top={0} left={0} width={433} height={796} src={fabricDrape} alt="" objectFit="fill" scale={1.025} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 37, left: 55, width: 372, height: 422 }}
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          <LadiGroup top={0} left={0} width={372} height={422}>
            <LadiImage
              top={22}
              left={38}
              width={267}
              height={262}
              src={dreamPolaroidImage}
              alt={`${groomName} & ${brideName}`}
              objectPosition="center"
            />
            <LadiImage top={0} left={0} width={372} height={422} src={photoFrame} alt="" />
            <LadiHeadline
              top={307}
              left={23}
              width={302}
              fontFamily="var(--font-heading)"
              fontSize={30}
              lineHeight={1.2}
              letterSpacing={7}
              color="var(--color-champagne)"
              textAlign="center"
              textTransform="uppercase"
            >
              Love forever
            </LadiHeadline>
          </LadiGroup>
        </motion.div>

        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          variants={staggerContainer(0.15, 0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={pearlVariants} style={{ position: 'absolute', inset: 0 }}>
            <LadiImage top={298} left={349} width={80} height={79} src={pearl} alt="" />
          </motion.div>
          <motion.div variants={pearlVariants} style={{ position: 'absolute', inset: 0 }}>
            <LadiImage top={138} left={24} width={38} height={38} src={pearl} alt="" />
          </motion.div>
          <motion.div variants={pearlVariants} style={{ position: 'absolute', inset: 0 }}>
            <LadiImage top={392} left={5} width={50} height={50} src={pearl} alt="" />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          variants={staggerContainer(0.18, 0.7)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={lineVariants} style={{ position: 'absolute', top: 399, left: 210, width: 1, height: 24, transformOrigin: 'top' }}>
            <LadiLine top={0} left={0} width={1} height={24} color="var(--color-champagne)" />
          </motion.div>
          <motion.div variants={lineVariants} style={{ position: 'absolute', top: 473, left: 210, width: 1, height: 24, transformOrigin: 'top' }}>
            <LadiLine top={0} left={0} width={1} height={24} color="var(--color-champagne)" />
          </motion.div>
          <motion.div variants={lineVariants} style={{ position: 'absolute', top: 545, left: 210, width: 1, height: 24, transformOrigin: 'top' }}>
            <LadiLine top={0} left={0} width={1} height={24} color="var(--color-champagne)" />
          </motion.div>
          <motion.div variants={fadeUp} style={{ position: 'absolute', top: 615, left: 203, color: 'var(--color-champagne)' }}>
            <Heart size={14} strokeWidth={1.5} fill="var(--color-champagne)" />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          variants={staggerContainer(0.15, 1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
            <LadiHeadline
              top={431}
              left={52}
              width={302}
              fontFamily="var(--font-heading)"
              fontSize={24}
              lineHeight={1.2}
              color="var(--color-quote)"
              textAlign="center"
            >
              Two hearts
            </LadiHeadline>
          </motion.div>
          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
            <LadiHeadline
              top={505}
              left={52}
              width={302}
              fontFamily="var(--font-heading)"
              fontSize={24}
              lineHeight={1.2}
              color="var(--color-quote)"
              textAlign="center"
            >
              One journey
            </LadiHeadline>
          </motion.div>
          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
            <LadiHeadline
              top={577}
              left={52}
              width={302}
              fontFamily="var(--font-heading)"
              fontSize={24}
              lineHeight={1.2}
              color="var(--color-quote)"
              textAlign="center"
            >
              A lifetime of love
            </LadiHeadline>
          </motion.div>
        </motion.div>
      </LadiCanvas>
    </section>
  )
}
