'use client'

import { motion, type Variants } from 'framer-motion'

export function ClosingMessage() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative py-28 md:py-36 bg-wedding-brown overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[32rem] h-[32rem] bg-wedding-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.p variants={itemVariants} className="subtle-text text-wedding-champagne mb-8">
          Lời Cuối
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-cormorant italic text-xl md:text-2xl text-wedding-ivory/90 leading-relaxed mb-10"
        >
          Sự hiện diện của bạn chính là món quà quý giá nhất mà chúng tôi có thể nhận được
          trong ngày trọng đại này.
        </motion.p>

        <motion.div variants={itemVariants} className="accent-text text-wedding-gold mb-6">
          &
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="display-name text-wedding-ivory text-3xl md:text-4xl mb-4"
        >
          {process.env.NEXT_PUBLIC_GROOM_NAME} & {process.env.NEXT_PUBLIC_BRIDE_NAME}
        </motion.p>

        <motion.p variants={itemVariants} className="text-wedding-champagne text-xs tracking-[0.3em] uppercase font-sans">
          Hẹn gặp bạn trong ngày cưới
        </motion.p>
      </motion.div>
    </section>
  )
}
