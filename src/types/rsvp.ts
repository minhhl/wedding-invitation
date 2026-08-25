import { GuestSide } from './guest'

export const RSVP_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const
export type RsvpStatus = (typeof RSVP_STATUSES)[number]

export interface RsvpRequest {
  id: string
  guestName: string
  side: GuestSide
  /** Free-text answer to "who are you attending with?" — not a headcount. */
  companion: string
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
  side: GuestSide
  companion: string
  message: string
  attending: boolean
}

export interface RsvpCounts {
  pending: number
  approved: number
  rejected: number
}
