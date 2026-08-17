'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { heroImage } from '@/lib/images'
import { groomName, brideName, weddingDateTime, formatVietnameseDate } from '@/lib/weddingData'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Parallax background photo */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src={heroImage}
          alt="Cô dâu chú rể ôm nhau dưới voan cưới lúc hoàng hôn"
          fill
          priority
          className="object-cover scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-wedding-ivory/95 via-wedding-ivory/80 to-wedding-beige/90" />
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wedding-champagne/10 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-champagne/10 rounded-full -ml-48 -mb-48 blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Top accent */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <p className="subtle-text">Cùng Với Hai Gia Đình</p>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="display-name text-wedding-brown">{groomName}</h1>
          <div className="accent-text my-1">&</div>
          <h1 className="display-name text-wedding-brown">{brideName}</h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p className="text-lg md:text-xl text-wedding-brown/70 font-sans font-light">
            Chúng tôi hân hạnh được chia sẻ khoảnh khắc đặc biệt này cùng bạn
          </p>
        </motion.div>

        {/* Save the date */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="subtle-text mb-3">Lưu Lại Ngày Này</p>
          <p className="text-wedding-brown text-sm md:text-base font-sans mb-1">
            {formatVietnameseDate(weddingDateTime)}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 8, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-10 bg-wedding-gold/40" />
      </motion.div>
    </section>
  )
}
