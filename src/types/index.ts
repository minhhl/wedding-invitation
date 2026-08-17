export interface RSVPRecord {
  id: string
  fullName: string
  phoneNumber: string
  numberOfGuests: number
  attendance: 'yes' | 'no'
  wishes?: string
  createdAt: string
}

export interface GuestBook {
  id: string
  guestName: string
  message: string
  createdAt: string
  approved: boolean
}

export interface WeddingEvent {
  id: string
  title: string
  date: string
  time: string
  venue: string
  address: string
  description?: string
  mapUrl?: string
}

export interface WeddingConfig {
  groomName: string
  brideName: string
  weddingDate: string
  ceremonyTime: string
  receptionTime: string
  ceremonyVenue: string
  ceremonyAddress: string
  receptionVenue: string
  receptionAddress: string
  groomBankName: string
  groomAccountNumber: string
  groomAccountHolder: string
  brideBankName: string
  brideAccountNumber: string
  brideAccountHolder: string
}
