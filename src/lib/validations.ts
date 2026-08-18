import { z } from 'zod'

export const rsvpSchema = z.object({
  guestName: z.string().min(2, 'Vui lòng nhập tên của bạn'),
  attendance: z.enum(['yes', 'no'], {
    error: 'Vui lòng xác nhận tham dự',
  }),
  guestCount: z.enum(['alone', 'plus1', 'plus2', 'plus3'], {
    error: 'Vui lòng chọn số lượng khách đi cùng',
  }),
  side: z.enum(['groom', 'bride'], {
    error: 'Vui lòng chọn bạn là khách nhà trai hay nhà gái',
  }),
  wishes: z.string().max(500, 'Lời chúc không được quá 500 ký tự').optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>

export const guestCountLabels: Record<RSVPFormData['guestCount'], string> = {
  alone: 'Chỉ mình tôi',
  plus1: 'Đi cùng 1 khách',
  plus2: 'Đi cùng 2 khách',
  plus3: 'Đi cùng 3 khách trở lên',
}

export const sideLabels: Record<RSVPFormData['side'], string> = {
  groom: 'Khách nhà trai',
  bride: 'Khách nhà gái',
}
