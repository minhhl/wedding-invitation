'use client'

import { motion, type Variants } from 'framer-motion'
import { LadiCanvas, LadiImage } from '@/components/ladi'
import { endlessRomanceImages, timelinePhoto } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'
import { ornamentQuoteB } from '@/lib/decor'
import { EASE, staggerContainer } from '@/lib/motion'

const SECTION_HEIGHT = 534
const [, left1, , right2] = endlessRomanceImages

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
}

export function PolaroidCollection() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT} className="bg-[rgb(230,225,212)]">
        <motion.div
          style={{ position: 'absolute', top: 12, left: 14, width: 393, height: 128, zIndex: 10 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <LadiImage top={0} left={0} width={393} height={128} src={ornamentQuoteB} alt="" />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          variants={staggerContainer(0.12, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={photoVariants} style={{ position: 'absolute', top: 112, left: 15, width: 228, height: 398.5 }}>
            <LadiImage top={0} left={0} width={228} height={398.5} src={left1} alt={`${groomName} & ${brideName}`} />
          </motion.div>
          <motion.div variants={photoVariants} style={{ position: 'absolute', top: 112, left: 248.8, width: 158, height: 194 }}>
            <LadiImage
              top={0}
              left={0}
              width={158}
              height={194}
              src={timelinePhoto}
              alt={`${groomName} & ${brideName}`}
              objectPosition="center"
            />
          </motion.div>
          <motion.div variants={photoVariants} style={{ position: 'absolute', top: 312, left: 248.8, width: 158, height: 198.5 }}>
            <LadiImage top={0} left={0} width={158} height={198.5} src={right2} alt={`${groomName} & ${brideName}`} />
          </motion.div>
        </motion.div>
      </LadiCanvas>
    </section>
  )
}
