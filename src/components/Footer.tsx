'use client'

import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { groomName, brideName } from '@/lib/weddingData'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 bg-wedding-brown text-wedding-ivory border-t-2 border-wedding-champagne/30">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="heading-4 text-wedding-gold mb-3">
              {groomName} & {brideName}
            </h3>
            <p className="text-wedding-ivory/70 text-sm font-sans">
              Cảm ơn vì sự có mặt và lời chúc của bạn
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h4 className="text-wedding-gold font-sans font-semibold mb-3 text-sm tracking-widest uppercase">
              Liên Kết
            </h4>
            <ul className="space-y-2 text-xs text-wedding-ivory/70 font-sans">
              <li>
                <a href="#home" className="hover:text-wedding-gold transition-colors">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-wedding-gold transition-colors">
                  Album Ảnh
                </a>
              </li>
              <li>
                <a href="#rsvp" className="hover:text-wedding-gold transition-colors">
                  Phản Hồi
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="text-wedding-gold font-sans font-semibold mb-3 text-sm tracking-widest uppercase">
              Liên Hệ
            </h4>
            <p className="text-xs text-wedding-ivory/70 font-sans space-y-1.5">
              <span className="flex items-center justify-center md:justify-end gap-2">
                <Mail size={13} strokeWidth={1.5} /> contact@wedding.com
              </span>
              <span className="flex items-center justify-center md:justify-end gap-2">
                <Phone size={13} strokeWidth={1.5} /> +84 (0) 123 456 789
              </span>
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-gradient-to-r from-wedding-ivory/0 via-wedding-champagne/50 to-wedding-ivory/0 mb-6" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <p className="text-xs text-wedding-ivory/60 font-sans">
            © {currentYear} {groomName} & {brideName}. Đã đăng ký bản quyền.
          </p>
          <p className="text-sm text-wedding-gold font-cormorant italic">
            Yêu thương, mãi mãi.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
