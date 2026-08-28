'use client'

import { motion, type Variants } from 'framer-motion'
import { LadiCanvas, LadiImage } from '@/components/ladi'
import { endlessRomanceImages } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'
import { ornamentQuoteB } from '@/lib/decor'
import { EASE, staggerContainer } from '@/lib/motion'

const SECTION_HEIGHT = 950
const [wide, left1, right1, right2] = endlessRomanceImages

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
}

export function PolaroidCollection() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT} className="bg-[rgb(230,225,212)]">
        <motion.div
          style={{ position: 'absolute', top: 12, left: 14, width: 393, height: 410 }}
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <LadiImage
            top={0}
            left={0}
            width={393}
            height={410}
            src={wide}
            alt={`${groomName} & ${brideName}`}
            objectPosition="center"
            priority
          />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 428, left: 14, width: 393, height: 128, zIndex: 10 }}
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
          <motion.div variants={photoVariants} style={{ position: 'absolute', top: 528, left: 13.8, width: 228, height: 398.5 }}>
            <LadiImage top={0} left={0} width={228} height={398.5} src={left1} alt={`${groomName} & ${brideName}`} />
          </motion.div>
          <motion.div variants={photoVariants} style={{ position: 'absolute', top: 528, left: 248.8, width: 158, height: 194 }}>
            <LadiImage
              top={0}
              left={0}
              width={158}
              height={194}
              src={right1}
              alt={`${groomName} & ${brideName}`}
              objectPosition="center"
            />
          </motion.div>
          <motion.div variants={photoVariants} style={{ position: 'absolute', top: 728, left: 248.8, width: 158, height: 198.5 }}>
            <LadiImage top={0} left={0} width={158} height={198.5} src={right2} alt={`${groomName} & ${brideName}`} />
          </motion.div>
        </motion.div>
      </LadiCanvas>
    </section>
  )
}
