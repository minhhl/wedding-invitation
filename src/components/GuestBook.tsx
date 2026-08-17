'use client'

import { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Heart } from 'lucide-react'

interface GuestMessage {
  id: number
  name: string
  message: string
  timestamp: Date
}

// Sample guest messages
const sampleMessages: GuestMessage[] = [
  {
    id: 1,
    name: 'Nguyễn Thanh',
    message: 'Cảm ơn vì lời mời. Chúc hai bạn hôn hạnh phúc và bình an!',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: 'Trần Hương',
    message: 'Hai bạn trông rất hạnh phúc. Chúc mừng các bạn!',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    name: 'Lê Anh',
    message: 'Một lễ cưới đẹp và ý nghĩa. Chúc hạnh phúc mãi mãi!',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
]

export function GuestBook() {
  const [messages, setMessages] = useState<GuestMessage[]>([])

  useEffect(() => {
    setMessages(sampleMessages)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Vừa xong'
    if (diffMins < 60) return `${diffMins} phút trước`
    if (diffHours < 24) return `${diffHours} giờ trước`
    if (diffDays < 7) return `${diffDays} ngày trước`

    return date.toLocaleDateString('vi-VN')
  }

  return (
    <section className="relative py-20 bg-wedding-ivory overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-wedding-champagne/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subtle-text mb-4">Lời Chúc Từ Khách Mời</p>
          <h2 className="heading-2 text-wedding-brown mb-4">Sổ Lưu Bút</h2>
          <p className="text-wedding-brown/70 font-sans">
            Lời chúc từ những người thân yêu
          </p>
        </motion.div>

        {/* Messages grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              variants={itemVariants}
              whileHover={{ translateY: -4 }}
              className="group paper-card p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-wedding-brown font-sans font-semibold">
                    {msg.name}
                  </h3>
                  <p className="text-wedding-brown/50 text-xs font-sans mt-1">
                    {formatDate(msg.timestamp)}
                  </p>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-wedding-gold"
                >
                  <Heart size={20} fill="currentColor" />
                </motion.div>
              </div>

              {/* Message */}
              <p className="text-wedding-brown/70 font-sans text-sm leading-relaxed">
                {msg.message}
              </p>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                className="mt-4 h-0.5 bg-gradient-to-r from-wedding-champagne/0 via-wedding-champagne/50 to-wedding-champagne/0 origin-left"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-wedding-brown/70 font-sans mb-4">
            Bạn có muốn gửi lời chúc cho chúng tôi?
          </p>
          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 brushed-gold rounded-sm font-sans font-semibold text-sm tracking-widest uppercase"
          >
            Gửi Lời Chúc
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
