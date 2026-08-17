'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { rsvpSchema, RSVPFormData } from '@/lib/validations'
import { Loader2 } from 'lucide-react'

export function RSVPForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
  })

  const onSubmit = async (data: RSVPFormData) => {
    setIsLoading(true)
    setSubmitError(false)
    try {
      // Submit to API
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit RSVP')
      }

      await response.json()

      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setSubmitError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="rsvp" className="relative py-20 bg-wedding-beige/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-wedding-champagne/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="subtle-text mb-4">Xác Nhận Tham Dự</p>
          <h2 className="heading-2 text-wedding-brown mb-4">Thư Phản Hồi</h2>
          <p className="text-wedding-brown/70 font-sans">
            Vui lòng xác nhận sự tham dự của bạn trước ngày 1 tháng 11
          </p>
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="paper-card p-8 md:p-12 space-y-6"
              >
                {/* Full Name */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-sans font-semibold text-wedding-brown mb-2">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên đầy đủ"
                    {...register('fullName')}
                    className={`w-full px-4 py-3 bg-white/50 border-2 rounded-lg font-sans focus:outline-none transition-all duration-300 ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-wedding-champagne/30 focus:border-wedding-gold'
                    }`}
                  />
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-2 font-sans"
                    >
                      {errors.fullName.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Phone Number */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-sans font-semibold text-wedding-brown mb-2">
                    Số Điện Thoại *
                  </label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    {...register('phoneNumber')}
                    className={`w-full px-4 py-3 bg-white/50 border-2 rounded-lg font-sans focus:outline-none transition-all duration-300 ${
                      errors.phoneNumber
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-wedding-champagne/30 focus:border-wedding-gold'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-2 font-sans"
                    >
                      {errors.phoneNumber.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Number of Guests */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-sans font-semibold text-wedding-brown mb-2">
                    Số Lượng Khách *
                  </label>
                  <select
                    {...register('numberOfGuests', { valueAsNumber: true })}
                    className={`w-full px-4 py-3 bg-white/50 border-2 rounded-lg font-sans focus:outline-none transition-all duration-300 ${
                      errors.numberOfGuests
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-wedding-champagne/30 focus:border-wedding-gold'
                    }`}
                  >
                    <option value="">Chọn số lượng</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'người' : 'người'}
                      </option>
                    ))}
                  </select>
                  {errors.numberOfGuests && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-2 font-sans"
                    >
                      {errors.numberOfGuests.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Attendance */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-sans font-semibold text-wedding-brown mb-4">
                    Xác Nhận Tham Dự *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'yes', label: 'Tôi sẽ tham dự' },
                      { value: 'no', label: 'Rất tiếc tôi không thể tham dự' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value={option.value}
                          {...register('attendance')}
                          className="w-4 h-4 accent-wedding-gold cursor-pointer"
                        />
                        <span className="text-wedding-brown font-sans">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.attendance && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-2 font-sans"
                    >
                      {errors.attendance.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Wishes */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-sans font-semibold text-wedding-brown mb-2">
                    Lời Chúc (Tùy Chọn)
                  </label>
                  <textarea
                    placeholder="Gửi lời chúc tốt đẹp cho chúng tôi..."
                    rows={4}
                    {...register('wishes')}
                    className="w-full px-4 py-3 bg-white/50 border-2 border-wedding-champagne/30 rounded-lg font-sans focus:outline-none focus:border-wedding-gold transition-all duration-300 resize-none"
                  />
                  {errors.wishes && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-2 font-sans"
                    >
                      {errors.wishes.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit error */}
                {submitError && (
                  <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm font-sans text-center bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                  >
                    Có lỗi xảy ra, vui lòng thử lại sau ít phút.
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 brushed-gold rounded-sm font-sans font-semibold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {isLoading && <Loader2 size={18} className="animate-spin" />}
                    {isLoading ? 'Đang Gửi...' : 'Xác Nhận'}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="paper-card p-10 md:p-16 text-center space-y-5"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                className="accent-text mb-2"
              >
                &
              </motion.div>
              <h3 className="heading-3 text-wedding-brown">Cảm Ơn Bạn</h3>
              <p className="text-wedding-brown/70 font-cormorant italic text-lg md:text-xl leading-relaxed max-w-md mx-auto">
                Cảm ơn bạn đã trở thành một phần trong ngày đặc biệt của chúng tôi.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
