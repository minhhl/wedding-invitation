'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import { groomName, brideName } from '@/lib/weddingData'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
}

interface InvitationCoverProps {
  onOpen: () => void
}

export function InvitationCover({ onOpen }: InvitationCoverProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const searchParams = useSearchParams()
  const guestName = searchParams.get('to')?.trim()

  useEffect(() => {
    const newParticles = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
    }))
    setParticles(newParticles)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(16px)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="relative min-h-screen bg-wedding-ivory overflow-hidden flex items-center justify-center"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-wedding-beige/50 to-wedding-ivory" />

      {/* Ambient floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-wedding-champagne/40 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Main invitation card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="paper-card flex items-center justify-center">
          <div className="text-center px-6 py-12 md:py-16 space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="subtle-text">Trân Trọng Kính Mời</p>
            </motion.div>

            {guestName && (
              <motion.div variants={itemVariants}>
                <p className="font-cormorant italic text-2xl md:text-3xl text-wedding-brown">
                  {guestName}
                </p>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <p className="text-wedding-brown/70 text-sm md:text-base font-sans">
                Đến tham dự lễ thành hôn của
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div>
                <p className="display-name text-3xl md:text-4xl text-wedding-brown">
                  {groomName}
                </p>
              </div>
              <div>
                <p className="accent-text">&</p>
              </div>
              <div>
                <p className="display-name text-3xl md:text-4xl text-wedding-brown">
                  {brideName}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6">
              <button
                onClick={onOpen}
                className="px-10 py-4 brushed-gold rounded-sm font-sans font-semibold text-sm tracking-widest uppercase"
              >
                Mở Thiệp
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
