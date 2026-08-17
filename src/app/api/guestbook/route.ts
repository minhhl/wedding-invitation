import { supabase } from '@/lib/supabase'
import { guestBookSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate with Zod
    const validData = guestBookSchema.parse(body)

    // Insert into Supabase
    const { data, error } = await supabase
      .from('guest_book')
      .insert([
        {
          guest_name: validData.guestName,
          message: validData.message,
          approved: false, // Require moderation
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save guest book entry' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message!',
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
    // Get all approved guest book entries
    const { data, error } = await supabase
      .from('guest_book')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      throw error
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guest book entries' },
      { status: 500 }
    )
  }
}
