'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Download, Check, Gem, Loader2 } from 'lucide-react'
import { copyToClipboard } from '@/utils/helpers'
import { resolveVietQrBankCode, vietQrImageUrl } from '@/lib/weddingData'

interface BankInfo {
  name: string
  bankName: string
  accountNumber: string
  accountHolder: string
}

const bankAccounts: BankInfo[] = [
  {
    name: 'Chú Rể',
    bankName: process.env.NEXT_PUBLIC_GROOM_BANK_NAME || 'Vietcombank',
    accountNumber: process.env.NEXT_PUBLIC_GROOM_ACCOUNT_NUMBER || '1234567890',
    accountHolder: process.env.NEXT_PUBLIC_GROOM_ACCOUNT_HOLDER || 'Hoàng Minh',
  },
  {
    name: 'Cô Dâu',
    bankName: process.env.NEXT_PUBLIC_BRIDE_BANK_NAME || 'Vietcombank',
    accountNumber: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT_NUMBER || '0987654321',
    accountHolder: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT_HOLDER || 'Minh Ngọc',
  },
]

function BankCard({ account }: { account: BankInfo }) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const qrUrl = vietQrImageUrl(
    resolveVietQrBankCode(account.bankName),
    account.accountNumber,
    account.accountHolder
  )

  const handleCopy = async () => {
    await copyToClipboard(account.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `qr-mung-cuoi-${account.name === 'Chú Rể' ? 'chu-re' : 'co-dau'}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading QR:', error)
      window.open(qrUrl, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group paper-card p-6 md:p-8 transition-transform duration-500 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Gem className="text-wedding-gold w-6 h-6" strokeWidth={1.5} />
          <h3 className="heading-4 text-wedding-brown">{account.name}</h3>
        </div>
      </div>

      {/* QR code */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40 md:w-48 md:h-48 bg-white rounded-lg overflow-hidden border border-wedding-champagne/30 shadow-sm">
          <Image
            src={qrUrl}
            alt={`Mã QR chuyển khoản mừng cưới cho ${account.name}`}
            fill
            className="object-contain p-2"
            sizes="192px"
            unoptimized
          />
        </div>
      </div>

      {/* Bank info */}
      <div className="space-y-3 mb-6">
        <div>
          <p className="text-xs text-wedding-brown/60 uppercase tracking-widest font-sans font-semibold mb-1">
            Ngân Hàng
          </p>
          <p className="text-wedding-brown font-sans">{account.bankName}</p>
        </div>

        <div>
          <p className="text-xs text-wedding-brown/60 uppercase tracking-widest font-sans font-semibold mb-1">
            Chủ Tài Khoản
          </p>
          <p className="text-wedding-brown font-sans">{account.accountHolder}</p>
        </div>

        <div>
          <p className="text-xs text-wedding-brown/60 uppercase tracking-widest font-sans font-semibold mb-1">
            Số Tài Khoản
          </p>
          <div className="flex items-center justify-between bg-white/30 rounded-md px-3 py-2">
            <p className="text-wedding-brown font-sans font-semibold tracking-widest">
              {account.accountNumber}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              aria-label={copied ? 'Đã sao chép số tài khoản' : 'Sao chép số tài khoản'}
              className="text-wedding-gold hover:text-wedding-brown transition-colors duration-200"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Check size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Copy size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex-1 px-4 py-2 bg-wedding-champagne/30 hover:bg-wedding-champagne/50 text-wedding-gold rounded-md text-xs font-sans font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
        >
          <Copy size={14} />
          Sao Chép
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 px-4 py-2 bg-wedding-brown/10 hover:bg-wedding-brown/20 text-wedding-brown rounded-md text-xs font-sans font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          Tải QR
        </motion.button>
      </div>
    </motion.div>
  )
}

export function GiftInformation() {
  return (
    <section className="relative py-20 bg-wedding-ivory overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-champagne/5 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subtle-text mb-4">Mừng Cưới</p>
          <h2 className="heading-2 text-wedding-brown mb-4">Quà Mừng Cưới</h2>
          <p className="text-wedding-brown/70 font-sans max-w-2xl mx-auto">
            Cảm ơn tình yêu thương và sự chúc phúc của bạn dành cho chúng tôi
          </p>
        </motion.div>

        {/* Bank cards grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {bankAccounts.map((account, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <BankCard account={account} />
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="p-6 bg-wedding-champagne/10 border border-wedding-champagne/30 rounded-lg text-center"
        >
          <p className="text-wedding-brown/70 font-sans text-sm leading-relaxed">
            Lời chúc của bạn là quà tặng quý nhất cho chúng tôi. Việc bạn có mặt ở đám cưới là điều quan trọng nhất.
            <br />
            <span className="text-wedding-gold font-semibold">Xin cảm ơn rất nhiều!</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
