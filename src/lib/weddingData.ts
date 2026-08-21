export const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Hoàng Minh'
export const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Minh Ngọc'

// Parents' names for the invitation-details section. No real values exist
// yet — fill these in via env vars (same pattern as groom/bride name above).
export const groomFather = process.env.NEXT_PUBLIC_GROOM_FATHER || 'Ông [Tên cha chú rể]'
export const groomMother = process.env.NEXT_PUBLIC_GROOM_MOTHER || 'Bà [Tên mẹ chú rể]'
export const brideFather = process.env.NEXT_PUBLIC_BRIDE_FATHER || 'Ông [Tên cha cô dâu]'
export const brideMother = process.env.NEXT_PUBLIC_BRIDE_MOTHER || 'Bà [Tên mẹ cô dâu]'

// Vietnamese naming convention: the given name is the last word.
export const initial = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? name[0]

/** ISO 8601 with +07:00 offset */
export const weddingDateISO = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-09-20T00:00:00+07:00'
export const weddingDateTime = new Date(weddingDateISO)

export const weddingDateParts = {
  day: '20',
  month: '09',
  year: '2026',
}
