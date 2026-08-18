import { NextResponse } from 'next/server'
import { Guest, GUEST_GROUPS, GUEST_SIDES, GUEST_SOURCES, GUEST_STATUSES } from '@/types/guest'
import { readGuestsFromDisk, writeGuestsToDisk } from '@/lib/guestFileStore'

// This route reads/writes a local .xlsx file, so responses must never be cached.
export const dynamic = 'force-dynamic'

function isValidGuest(value: unknown): value is Guest {
  if (typeof value !== 'object' || value === null) return false
  const g = value as Record<string, unknown>
  return (
    typeof g.id === 'string' &&
    typeof g.name === 'string' &&
    typeof g.phone === 'string' &&
    (GUEST_SIDES as readonly string[]).includes(g.side as string) &&
    (GUEST_GROUPS as readonly string[]).includes(g.group as string) &&
    typeof g.partySize === 'number' &&
    (GUEST_STATUSES as readonly string[]).includes(g.status as string) &&
    (g.table === null || typeof g.table === 'number') &&
    typeof g.note === 'string' &&
    (GUEST_SOURCES as readonly string[]).includes(g.source as string)
  )
}

export async function GET() {
  try {
    const guests = readGuestsFromDisk()
    return NextResponse.json({ guests })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const guests = Array.isArray(body?.guests) ? body.guests : null

    if (!guests || !guests.every(isValidGuest)) {
      return NextResponse.json({ error: 'Dữ liệu khách mời không hợp lệ.' }, { status: 400 })
    }

    writeGuestsToDisk(guests)
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
