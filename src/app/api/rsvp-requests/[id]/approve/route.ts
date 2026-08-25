import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/serverSession'
import { readRsvpRequestsFromDisk, writeRsvpRequestsToDisk } from '@/lib/rsvpFileStore'
import { createGuestId, readGuestsFromDisk, writeGuestsToDisk } from '@/lib/guestFileStore'
import { getTableTotal } from '@/lib/guestTable'
import {
  Guest,
  GUEST_GROUPS,
  GUEST_SIDES,
  GuestGroup,
  GuestSide,
  MAX_PARTY_SIZE,
  TABLE_CAPACITY,
} from '@/types/guest'

// Role check (admin-only) is enforced by src/proxy.ts.
export const dynamic = 'force-dynamic'

function parseTable(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) && n >= 1 ? Math.round(n) : null
}

function parseTotalGuests(value: unknown): number | null {
  const n = Number(value)
  return Number.isFinite(n) && n >= 1 && n <= MAX_PARTY_SIZE ? Math.round(n) : null
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ error: 'Bạn không có quyền thực hiện thao tác này.' }, { status: 401 })

  const { id } = await params
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  const mode = body?.mode
  if (!body || (mode !== 'new' && mode !== 'link')) {
    return NextResponse.json({ error: 'Dữ liệu duyệt không hợp lệ.' }, { status: 400 })
  }
  const guestId = typeof body.guestId === 'string' ? body.guestId : ''

  const requests = readRsvpRequestsFromDisk()
  const requestIndex = requests.findIndex((r) => r.id === id)
  if (requestIndex === -1) {
    return NextResponse.json({ error: 'Không tìm thấy yêu cầu RSVP.' }, { status: 404 })
  }
  const rsvpRequest = requests[requestIndex]
  if (rsvpRequest.status !== 'PENDING') {
    return NextResponse.json({ error: 'Yêu cầu RSVP này đã được xử lý.' }, { status: 409 })
  }

  const totalGuests = parseTotalGuests(body.totalGuests)
  if (rsvpRequest.attending && totalGuests === null) {
    return NextResponse.json({ error: 'Vui lòng nhập tổng số khách hợp lệ.' }, { status: 400 })
  }

  const guests = readGuestsFromDisk()
  const partySize = totalGuests ?? 1
  const status = rsvpRequest.attending ? ('Sẽ đến' as const) : ('Không đến' as const)
  const table = rsvpRequest.attending ? parseTable(body.table) : null

  if (table !== null) {
    const excludeGuestId = mode === 'link' ? guestId : undefined
    const currentTotal = getTableTotal(guests, table, excludeGuestId)
    const combined = currentTotal + partySize
    if (combined > TABLE_CAPACITY) {
      return NextResponse.json(
        {
          error: `⚠ Bàn ${table} hiện có ${currentTotal} khách + RSVP mới ${partySize} khách = ${combined} khách. Vượt giới hạn ${TABLE_CAPACITY}. Vui lòng chọn bàn khác.`,
        },
        { status: 400 }
      )
    }
  }

  let linkedGuestId: string

  if (mode === 'new') {
    const side = typeof body.side === 'string' ? body.side : ''
    const group = typeof body.group === 'string' ? body.group : ''
    if (!(GUEST_SIDES as readonly string[]).includes(side)) {
      return NextResponse.json({ error: 'Vui lòng chọn bên (Nhà trai/Nhà gái).' }, { status: 400 })
    }
    if (!(GUEST_GROUPS as readonly string[]).includes(group)) {
      return NextResponse.json({ error: 'Vui lòng chọn nhóm khách.' }, { status: 400 })
    }

    const newGuest: Guest = {
      id: createGuestId(),
      name: rsvpRequest.guestName,
      phone: '',
      side: side as GuestSide,
      group: group as GuestGroup,
      partySize,
      status,
      table,
      note: [rsvpRequest.companion && `Đi cùng: ${rsvpRequest.companion}`, rsvpRequest.message]
        .filter(Boolean)
        .join(' — '),
      source: 'RSVP',
    }
    guests.push(newGuest)
    linkedGuestId = newGuest.id
  } else {
    const existing = guests.find((g) => g.id === guestId)
    if (!existing) {
      return NextResponse.json({ error: 'Không tìm thấy khách mời để liên kết.' }, { status: 404 })
    }
    existing.status = status
    existing.partySize = partySize
    existing.table = table
    linkedGuestId = existing.id
  }

  writeGuestsToDisk(guests)

  const now = new Date().toISOString()
  requests[requestIndex] = {
    ...rsvpRequest,
    status: 'APPROVED',
    approvedAt: now,
    approvedBy: session.username,
    linkedGuestId,
    creationMode: mode,
    updatedAt: now,
  }
  writeRsvpRequestsToDisk(requests)

  return NextResponse.json({ ok: true, request: requests[requestIndex] })
}
