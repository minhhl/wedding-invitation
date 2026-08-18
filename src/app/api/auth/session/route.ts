import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/serverSession'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ session: null })
  return NextResponse.json({ session: { username: session.username, role: session.role } })
}
