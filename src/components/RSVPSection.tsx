'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Loader2, X } from 'lucide-react'
import { rsvpSubmissionSchema, RsvpSubmissionFormData } from '@/lib/rsvpValidation'
import { FloralCorner } from '@/components/decor/FloralCorner'

const fieldClass =
  'peer w-full border-b border-champagne/40 bg-transparent px-1 pb-3 pt-5 font-body text-sm text-ink placeholder-transparent focus:border-champagne focus:outline-none focus:shadow-[0_10px_18px_-16px_rgba(201,169,119,0.9)] transition-[border-color,box-shadow] duration-300'

const floatingLabelClass =
  'pointer-events-none absolute left-1 top-5 text-sm text-text/45 transition-all duration-300 origin-left peer-focus:top-0 peer-focus:scale-[0.72] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.72] peer-[:not(:placeholder-shown)]:text-champagne-dark'

const selectClass =
  'w-full border-b border-champagne/40 bg-transparent px-1 py-3 font-body text-sm text-ink focus:border-champagne focus:outline-none focus:shadow-[0_10px_18px_-16px_rgba(201,169,119,0.9)] transition-[border-color,box-shadow] duration-300'

// The GitHub Pages build is static-exported with no backend, so /api/rsvp
// doesn't exist there — fall back to a message instead of a dead form.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

export function RSVPSection() {
  if (isStaticExport) {
    return (
      <section id="rsvp" className="relative overflow-hidden bg-white py-20 md:py-28">
        <FloralCorner className="pointer-events-none absolute -right-6 -top-6 h-24 w-28 sm:h-28 sm:w-32" />
        <div className="mx-auto w-full max-w-xl px-5 text-center md:px-10">
          <p className="eyebrow mb-4">RSVP</p>
          <h2 className="heading-2 mb-4 text-ink">Rất mong được đón tiếp bạn.</h2>
          <p className="mx-auto max-w-sm font-body text-sm leading-relaxed text-text/80">
            Vui lòng xác nhận sự tham dự của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo
            nhất. Trân trọng cảm ơn! Bạn có thể xác nhận trực tiếp qua điện thoại hoặc tin nhắn
            với cô dâu chú rể.
          </p>
        </div>
      </section>
    )
  }

  return <RSVPForm />
}

function RSVPForm() {
  const [showThankYou, setShowThankYou] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RsvpSubmissionFormData>({
    resolver: zodResolver(rsvpSubmissionSchema),
    defaultValues: { guestCount: 0 },
  })

  const onSubmit = async (data: RsvpSubmissionFormData) => {
    setIsLoading(true)
    setSubmitError(false)
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit RSVP')

      reset()
      setShowThankYou(true)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setSubmitError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-white py-20 md:py-28">
      <FloralCorner className="pointer-events-none absolute -right-6 -top-6 h-24 w-28 sm:h-28 sm:w-32" />
      <div className="mx-auto w-full max-w-xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="eyebrow mb-4">RSVP</p>
          <h2 className="heading-2 mb-4 text-ink">Rất mong được đón tiếp bạn.</h2>
          <p className="mx-auto max-w-sm font-body text-sm leading-relaxed text-text/80">
            Vui lòng xác nhận sự tham dự của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo
            nhất. Trân trọng cảm ơn!
          </p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7"
        >
          <motion.div variants={itemVariants} className="relative">
            <input
              id="guestName"
              type="text"
              placeholder="Họ và tên"
              {...register('guestName')}
              className={fieldClass}
            />
            <label htmlFor="guestName" className={floatingLabelClass}>
              Họ và tên
            </label>
            {errors.guestName && (
              <p className="mt-2 text-xs text-red-500">{errors.guestName.message}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div className="relative">
              <input
                id="phone"
                type="tel"
                placeholder="Số điện thoại"
                {...register('phone')}
                className={fieldClass}
              />
              <label htmlFor="phone" className={floatingLabelClass}>
                Số điện thoại
              </label>
              {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email (không bắt buộc)"
                {...register('email')}
                className={fieldClass}
              />
              <label htmlFor="email" className={floatingLabelClass}>
                Email (không bắt buộc)
              </label>
              {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-text/70">
                Xác nhận tham dự
              </label>
              <select {...register('attending')} defaultValue="" className={selectClass}>
                <option value="" disabled>
                  Chọn phản hồi
                </option>
                <option value="yes">Tôi sẽ tham dự</option>
                <option value="no">Rất tiếc không thể tham dự</option>
              </select>
              {errors.attending && (
                <p className="mt-2 text-xs text-red-500">{errors.attending.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                id="guestCount"
                type="number"
                min={0}
                max={20}
                placeholder="0"
                {...register('guestCount', { valueAsNumber: true })}
                className={fieldClass}
              />
              <label htmlFor="guestCount" className={floatingLabelClass}>
                Số người đi cùng
              </label>
              {errors.guestCount && (
                <p className="mt-2 text-xs text-red-500">{errors.guestCount.message}</p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <textarea
              id="message"
              placeholder="Lời chúc"
              rows={4}
              {...register('message')}
              className={`${fieldClass} resize-none`}
            />
            <label htmlFor="message" className={floatingLabelClass}>
              Lời chúc
            </label>
            {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message.message}</p>}
          </motion.div>

          {submitError && (
            <motion.p
              variants={itemVariants}
              className="rounded-sm bg-red-50 px-4 py-3 text-center text-sm text-red-600"
            >
              Có lỗi xảy ra, vui lòng thử lại sau ít phút.
            </motion.p>
          )}

          <motion.div variants={itemVariants} className="pt-2">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="btn-champagne inline-flex w-full items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.3em] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? 'Đang gửi...' : 'Xác nhận'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>

      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-6"
            onClick={() => setShowThankYou(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white px-8 py-12 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowThankYou(false)}
                aria-label="Đóng"
                className="absolute right-4 top-4 text-text/50 transition-colors hover:text-champagne"
              >
                <X size={20} />
              </button>
              <p className="script-text mb-4 text-4xl text-champagne">Thank You</p>
              <h3 className="heading-3 mb-3 text-ink">Cảm Ơn Bạn</h3>
              <p className="mx-auto max-w-xs font-body text-sm leading-relaxed text-text/80">
                Cảm ơn bạn đã xác nhận tham dự. Thông tin của bạn đang chờ gia đình xác nhận.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
