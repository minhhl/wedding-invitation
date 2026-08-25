import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rsvpSubmissionSchema } from '@/lib/rsvpValidation'
import { readRsvpRequestsFromDisk, writeRsvpRequestsToDisk } from '@/lib/rsvpFileStore'
import { RsvpRequest } from '@/types/rsvp'

// Public endpoint — guests submit RSVPs without logging in. Requests land as
// PENDING and only become a Guest once an admin approves them from
// /guest-management/rsvp.
export const dynamic = 'force-dynamic'

function createId() {
  return `rsvp-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = rsvpSubmissionSchema.parse(body)

    const now = new Date().toISOString()
    const request: RsvpRequest = {
      id: createId(),
      guestName: data.guestName,
      side: data.side,
      companion: data.companion || '',
      message: data.message || '',
      attending: data.attending === 'yes',
      status: 'PENDING',
      submittedAt: now,
      approvedAt: null,
      approvedBy: null,
      linkedGuestId: null,
      creationMode: null,
      rejectionReason: null,
      createdAt: now,
      updatedAt: now,
    }

    const requests = readRsvpRequestsFromDisk()
    requests.push(request)
    writeRsvpRequestsToDisk(requests)

    return NextResponse.json(
      { success: true, message: 'RSVP request received and pending review' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dữ liệu không hợp lệ', details: error.issues },
        { status: 400 }
      )
    }
    console.error('RSVP submit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
