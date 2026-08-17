'use client'

import { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface GuestMessage {
  id: string
  guest_name: string
  message: string
  created_at: string
}

export function GuestBook() {
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadMessages() {
      try {
        const response = await fetch('/api/guestbook')
        const { data } = await response.json()
        if (isMounted && Array.isArray(data)) {
          setMessages(data)
        }
      } catch (error) {
        console.error('Error loading guest book:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadMessages()

    const channel = supabase
      .channel('guest_book_public')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guest_book', filter: 'approved=eq.true' },
        (payload) => {
          setMessages((prev) => [payload.new as GuestMessage, ...prev])
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
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

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
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
        {!isLoading && messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 paper-card p-10"
          >
            <p className="text-wedding-brown/60 font-cormorant italic text-lg">
              Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc cho chúng tôi.
            </p>
          </motion.div>
        ) : (
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
                      {msg.guest_name}
                    </h3>
                    <p className="text-wedding-brown/50 text-xs font-sans mt-1">
                      {formatDate(msg.created_at)}
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
        )}

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
