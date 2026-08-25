import { z } from 'zod'
import { GUEST_SIDES } from '@/types/guest'

export const rsvpSubmissionSchema = z.object({
  guestName: z.string().trim().min(2, 'Vui lòng nhập tên của bạn'),
  side: z.enum(GUEST_SIDES, { error: 'Vui lòng chọn bạn là khách mời của ai' }),
  companion: z.string().trim().max(200, 'Vui lòng rút gọn nội dung').optional(),
  message: z.string().trim().max(500, 'Lời chúc không được quá 500 ký tự').optional(),
  attending: z.enum(['yes', 'no'], { error: 'Vui lòng xác nhận tham dự' }),
})

export type RsvpSubmissionFormData = z.infer<typeof rsvpSubmissionSchema>
