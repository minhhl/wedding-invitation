import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { rsvpSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validData = rsvpSchema.parse(body)

    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase is not configured — RSVP response was not persisted:', validData)
      return NextResponse.json(
        { success: true, message: 'RSVP received (not persisted — Supabase not configured)' },
        { status: 201 }
      )
    }

    const { data, error } = await supabase
      .from('rsvp_responses')
      .insert([
        {
          guest_name: validData.guestName,
          attendance: validData.attendance,
          guest_count: validData.guestCount,
          side: validData.side,
          wishes: validData.wishes || '',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save RSVP response' }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, message: 'RSVP response saved successfully', data },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('API error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
