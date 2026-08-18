export interface RSVPRecord {
  id: string
  guestName: string
  attendance: 'yes' | 'no'
  guestCount: 'alone' | 'plus1' | 'plus2' | 'plus3'
  side: 'groom' | 'bride'
  wishes?: string
  createdAt: string
}
