import { NextResponse } from 'next/server'
import { readRsvpRequestsFromDisk } from '@/lib/rsvpFileStore'

// Protected by src/proxy.ts — requires an admin or viewer session.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const requests = readRsvpRequestsFromDisk()
    requests.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    return NextResponse.json({ requests })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
