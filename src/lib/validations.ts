import { z } from 'zod'

export const rsvpSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập tên của bạn'),
  phoneNumber: z.string().min(10, 'Vui lòng nhập số điện thoại hợp lệ'),
  numberOfGuests: z.number().min(1, 'Vui lòng chọn số lượng khách'),
  attendance: z.enum(['yes', 'no'], {
    error: 'Vui lòng chọn xác nhận tham dự',
  }),
  wishes: z.string().max(500, 'Lời chúc không được quá 500 ký tự').optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>

export const guestBookSchema = z.object({
  guestName: z.string().min(2, 'Vui lòng nhập tên'),
  message: z.string().min(5, 'Lời chúc phải có ít nhất 5 ký tự').max(500, 'Lời chúc không được quá 500 ký tự'),
})

export type GuestBookData = z.infer<typeof guestBookSchema>
