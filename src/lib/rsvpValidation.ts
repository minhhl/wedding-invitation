import { z } from 'zod'

export const rsvpSubmissionSchema = z.object({
  guestName: z.string().trim().min(2, 'Vui lòng nhập họ và tên'),
  phone: z
    .string()
    .trim()
    .min(8, 'Số điện thoại không hợp lệ')
    .max(20, 'Số điện thoại không hợp lệ'),
  email: z.union([z.literal(''), z.string().trim().email('Email không hợp lệ')]).optional(),
  guestCount: z
    .number()
    .int('Số người đi cùng phải là số nguyên')
    .min(0, 'Số người đi cùng không được âm')
    .max(20, 'Số người đi cùng tối đa 20'),
  message: z.string().trim().max(500, 'Lời chúc không được quá 500 ký tự').optional(),
  attending: z.enum(['yes', 'no'], { error: 'Vui lòng xác nhận tham dự' }),
})

export type RsvpSubmissionFormData = z.infer<typeof rsvpSubmissionSchema>
