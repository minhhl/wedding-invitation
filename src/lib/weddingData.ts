export const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Hoàng Minh'
export const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Minh Ngọc'

// Full legal names, used only in the formal invitation-details card text.
export const groomFullName = process.env.NEXT_PUBLIC_GROOM_FULL_NAME || 'Hoàng Lê Minh'
export const brideFullName = process.env.NEXT_PUBLIC_BRIDE_FULL_NAME || 'Nguyễn Minh Ngọc'

// Parents' names for the invitation-details section.
export const groomFather = process.env.NEXT_PUBLIC_GROOM_FATHER || 'Ông Hoàng Văn Lâm'
export const groomMother = process.env.NEXT_PUBLIC_GROOM_MOTHER || 'Bà Lê Thị Hải'
export const brideFather = process.env.NEXT_PUBLIC_BRIDE_FATHER || 'Ông Nguyễn Thanh Tùng (Cố phụ)'
export const brideMother = process.env.NEXT_PUBLIC_BRIDE_MOTHER || 'Bà Nguyễn Thị Quý'

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
