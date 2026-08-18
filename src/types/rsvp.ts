export const RSVP_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const
export type RsvpStatus = (typeof RSVP_STATUSES)[number]

export interface RsvpRequest {
  id: string
  guestName: string
  phone: string
  email: string
  /** Companions only — does not include the requester themself. */
  guestCount: number
  message: string
  attending: boolean
  status: RsvpStatus
  submittedAt: string
  approvedAt: string | null
  approvedBy: string | null
  linkedGuestId: string | null
  /** How linkedGuestId was produced — null until approved. */
  creationMode: 'new' | 'link' | null
  rejectionReason: string | null
  createdAt: string
  updatedAt: string
}

export interface RsvpSubmission {
  guestName: string
  phone: string
  email: string
  guestCount: number
  message: string
  attending: boolean
}

export interface RsvpCounts {
  pending: number
  approved: number
  rejected: number
}
