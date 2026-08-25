import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/serverSession'
import { readRsvpRequestsFromDisk, writeRsvpRequestsToDisk } from '@/lib/rsvpFileStore'

// Role check (admin-only) is enforced by src/proxy.ts.
export const dynamic = 'force-dynamic'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ error: 'Bạn không có quyền thực hiện thao tác này.' }, { status: 401 })

  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const reason = typeof body?.reason === 'string' ? body.reason.trim() : ''

  const requests = readRsvpRequestsFromDisk()
  const requestIndex = requests.findIndex((r) => r.id === id)
  if (requestIndex === -1) {
    return NextResponse.json({ error: 'Không tìm thấy yêu cầu RSVP.' }, { status: 404 })
  }
  if (requests[requestIndex].status !== 'PENDING') {
    return NextResponse.json({ error: 'Yêu cầu RSVP này đã được xử lý.' }, { status: 409 })
  }

  const now = new Date().toISOString()
  requests[requestIndex] = {
    ...requests[requestIndex],
    status: 'REJECTED',
    rejectionReason: reason || null,
    approvedAt: now,
    approvedBy: session.username,
    updatedAt: now,
  }
  writeRsvpRequestsToDisk(requests)

  return NextResponse.json({ ok: true, request: requests[requestIndex] })
}
