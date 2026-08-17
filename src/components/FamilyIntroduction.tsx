'use client'

import { motion, type Variants } from 'framer-motion'
import { groomFamily, brideFamily } from '@/lib/weddingData'

interface FamilyColumnProps {
  title: string
  father: string
  fatherNote?: string
  mother: string
}

function FamilyColumn({ title, father, fatherNote, mother }: FamilyColumnProps) {
  return (
    <div className="text-center px-4">
      <p className="subtle-text mb-8">{title}</p>
      <div className="space-y-6">
        <div>
          <p className="text-[0.7rem] text-wedding-brown/50 uppercase tracking-[0.2em] font-sans mb-2">
            Bố
          </p>
          <p className="font-cormorant text-2xl md:text-3xl text-wedding-brown font-medium">
            {father}
            {fatherNote && (
              <span className="block text-sm font-sans italic text-wedding-brown/50 mt-1 tracking-normal">
                ({fatherNote})
              </span>
            )}
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] text-wedding-brown/50 uppercase tracking-[0.2em] font-sans mb-2">
            Mẹ
          </p>
          <p className="font-cormorant text-2xl md:text-3xl text-wedding-brown font-medium">
            {mother}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FamilyIntroduction() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-24 md:py-32 bg-wedding-beige/40 overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-wedding-champagne/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="subtle-text mb-4">Với Tất Cả Yêu Thương</p>
          <h2 className="heading-2 text-wedding-brown">Hai Gia Đình</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-16 md:gap-10 items-start">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FamilyColumn
              title={groomFamily.title}
              father={groomFamily.father}
              mother={groomFamily.mother}
            />
          </motion.div>

          <div className="hidden md:block w-px bg-wedding-champagne/30" />

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <FamilyColumn
              title={brideFamily.title}
              father={brideFamily.father}
              fatherNote={brideFamily.fatherNote}
              mother={brideFamily.mother}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
