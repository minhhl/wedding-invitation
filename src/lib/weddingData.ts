export const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Hoàng Minh'
export const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Minh Ngọc'

/** ISO 8601 with +07:00 offset */
export const weddingDateISO = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-09-20T00:00:00+07:00'
export const weddingDateTime = new Date(weddingDateISO)

export const weddingDateParts = {
  day: '20',
  month: '09',
  year: '2026',
}
