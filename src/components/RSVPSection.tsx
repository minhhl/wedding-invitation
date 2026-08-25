'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ChevronDown, Loader2, X } from 'lucide-react'
import { rsvpSubmissionSchema, RsvpSubmissionFormData } from '@/lib/rsvpValidation'
import { PlasterBackground } from '@/components/PlasterBackground'
import { plasterTexture } from '@/lib/decor'
import { footerImage } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'
import { GUEST_SIDES, type GuestSide } from '@/types/guest'
import { EASE } from '@/lib/motion'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { InvitationSide } from '@/components/InvitationCard'

// Maps the /nha-trai and /nha-gai routes' own "trai"/"gai" side to the
// matching GUEST_SIDES option, so the RSVP form pre-selects who the guest
// was invited by instead of leaving them to pick it themselves.
const GUEST_SIDE_BY_INVITATION_SIDE: Record<InvitationSide, GuestSide> = {
  trai: 'Nhà trai',
  gai: 'Nhà gái',
}

const fieldClass =
  'w-full rounded-xl border border-champagne/45 bg-white px-4 py-2.5 font-body text-sm text-ink placeholder:text-text/40 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/30 transition-colors duration-300'

const selectClass = `${fieldClass} appearance-none pr-9`

// The GitHub Pages build is static-exported with no backend, so /api/rsvp
// doesn't exist there — submit straight to Supabase from the browser
// instead. If Supabase isn't configured either, fall back to a message
// instead of a dead form.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

function ClosingPhoto() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[420px] overflow-hidden bg-white">
      <Image
        src={footerImage}
        alt={`${groomName} & ${brideName}`}
        fill
        className="photo-tone object-cover"
        sizes="420px"
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }} />
      <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-20 text-center text-white">
        <p
          className="max-w-md font-heading text-sm leading-relaxed md:text-base"
          style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.45)' }}
        >
          Hẹn gặp bạn trong ngày đặc biệt nhất của chúng mình. Sẽ thật hạnh phúc khi có bạn ở đó,
          cùng sẻ chia niềm vui và chứng kiến khoảnh khắc ý nghĩa này của chúng mình.
        </p>
        <p
          className="mt-5 font-editorial text-3xl"
          style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.45)' }}
        >
          Thank you!
        </p>
      </div>
    </div>
  )
}

export function RSVPSection({ side }: { side?: InvitationSide } = {}) {
  if (isStaticExport && !isSupabaseConfigured) {
    return (
      <section id="rsvp" className="relative overflow-hidden bg-white">
        <PlasterBackground className="pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto w-full max-w-[420px] px-6 py-16 text-center md:py-20">
          <p className="eyebrow mb-4">RSVP</p>
          <h2 className="heading-2 mb-4 text-ink">Rất mong được đón tiếp bạn.</h2>
          <p className="mx-auto font-body text-sm leading-relaxed text-text/80">
            Vui lòng xác nhận sự tham dự của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo
            nhất. Trân trọng cảm ơn! Bạn có thể xác nhận trực tiếp qua điện thoại hoặc tin nhắn
            với cô dâu chú rể.
          </p>
        </div>
        <ClosingPhoto />
      </section>
    )
  }

  return <RSVPForm side={side} />
}

function RSVPForm({ side }: { side?: InvitationSide }) {
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
  })

  const onSubmit = async (data: RsvpSubmissionFormData) => {
    setIsLoading(true)
    setSubmitError(false)
    try {
      if (isStaticExport) {
        if (!supabase) throw new Error('Supabase is not configured')
        const { error } = await supabase.from('rsvp_responses').insert({
          guest_name: data.guestName,
          side: data.side,
          companion: data.companion || null,
          message: data.message || null,
          attending: data.attending === 'yes',
        })
        if (error) throw error
      } else {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error('Failed to submit RSVP')
      }

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, staggerChildren: 0.1 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-[420px] px-6 py-16 md:py-20">
        <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: `url(${plasterTexture})`, backgroundRepeat: 'repeat', backgroundSize: '420px auto' }}
      />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <p className="mx-auto font-body text-sm leading-relaxed text-text/80">
            Vui lòng xác nhận sự tham dự của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo
            nhất. <br /> Trân trọng cảm ơn!
          </p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <input
              id="guestName"
              type="text"
              placeholder="Tên của bạn"
              {...register('guestName')}
              className={fieldClass}
            />
            {errors.guestName && (
              <p className="mt-2 text-xs text-red-500">{errors.guestName.message}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <textarea
              id="message"
              placeholder="Gửi lời chúc đến cô dâu chú rể"
              rows={4}
              {...register('message')}
              className={`${fieldClass} resize-none`}
            />
            {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <select
              id="attending"
              {...register('attending')}
              defaultValue=""
              className={selectClass}
            >
              <option value="" disabled>
                Xác nhận tham dự?
              </option>
              <option value="yes">Có, tôi sẽ tham dự</option>
              <option value="no">Rất tiếc, tôi không thể tham dự</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text/50"
            />
            {errors.attending && (
              <p className="mt-2 text-xs text-red-500">{errors.attending.message}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              id="companion"
              type="text"
              placeholder="Bạn có tham dự cùng ai không?"
              {...register('companion')}
              className={fieldClass}
            />
            {errors.companion && (
              <p className="mt-2 text-xs text-red-500">{errors.companion.message}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <select
              id="side"
              {...register('side')}
              defaultValue={side ? GUEST_SIDE_BY_INVITATION_SIDE[side] : ''}
              className={selectClass}
            >
              <option value="" disabled>
                Bạn là khách mời của ai?
              </option>
              {GUEST_SIDES.map((side) => (
                <option key={side} value={side}>
                  {side}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text/50"
            />
            {errors.side && <p className="mt-2 text-xs text-red-500">{errors.side.message}</p>}
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
              className="btn-champagne inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold uppercase tracking-[0.3em] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? 'Đang gửi...' : 'Xác nhận'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>

      <ClosingPhoto />

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
              className="relative w-full max-w-sm overflow-hidden bg-white text-center shadow-2xl"
            >
              <button
                onClick={() => setShowThankYou(false)}
                aria-label="Đóng"
                className="absolute right-4 top-4 z-10 text-white/80 transition-colors hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="relative h-40 w-full">
                <Image src={footerImage} alt={`${groomName} & ${brideName}`} fill className="photo-tone object-cover" sizes="384px" />
              </div>
              <div
                className="px-8 py-10"
                style={{ backgroundImage: `url(${plasterTexture})`, backgroundSize: 'cover' }}
              >
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-quote)' }}>
                  Cảm ơn bạn đã dành thời gian phản hồi! Chúng mình vô cùng trân quý sự quan tâm của
                  bạn
                </p>
                <p className="mt-4 font-editorial text-2xl" style={{ color: 'var(--color-quote)' }}>
                  Thank you!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
