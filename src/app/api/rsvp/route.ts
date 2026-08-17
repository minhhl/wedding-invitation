import { supabase } from '@/lib/supabase'
import { rsvpSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate with Zod
    const validData = rsvpSchema.parse(body)

    // Insert into Supabase
    const { data, error } = await supabase
      .from('rsvp_responses')
      .insert([
        {
          full_name: validData.fullName,
          phone_number: validData.phoneNumber,
          number_of_guests: validData.numberOfGuests,
          attendance: validData.attendance,
          wishes: validData.wishes || '',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save RSVP response' },
        { status: 500 }
      )
    }

    // A wish left with the RSVP doubles as a guestbook entry — the guest
    // already identified themselves, so it's auto-approved and shows live.
    if (validData.wishes && validData.wishes.trim().length > 0) {
      const { error: guestBookError } = await supabase.from('guest_book').insert([
        {
          guest_name: validData.fullName,
          message: validData.wishes,
          approved: true,
          created_at: new Date().toISOString(),
        },
      ])
      if (guestBookError) {
        console.error('Supabase guest_book error:', guestBookError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'RSVP response saved successfully',
        data: data,
      },
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

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get all approved RSVP responses
    const { data, error } = await supabase
      .from('rsvp_responses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      throw error
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSVP responses' },
      { status: 500 }
    )
  }
}
