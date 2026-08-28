import { Guest } from '@/types/guest'

/** snake_case shape of the `guests` table (see supabase/schema.sql). */
export interface GuestRow {
  id: string
  name: string
  phone: string
  side: string
  group: string
  party_size: number
  status: string
  table_number: number | null
  note: string
  source: string
}

export function guestToRow(guest: Guest): GuestRow {
  return {
    id: guest.id,
    name: guest.name,
    phone: guest.phone,
    side: guest.side,
    group: guest.group,
    party_size: guest.partySize,
    status: guest.status,
    table_number: guest.table,
    note: guest.note,
    source: guest.source,
  }
}

export function rowToGuest(row: GuestRow): Guest {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    side: row.side as Guest['side'],
    group: row.group as Guest['group'],
    partySize: row.party_size,
    status: row.status as Guest['status'],
    table: row.table_number,
    note: row.note,
    source: row.source as Guest['source'],
  }
}
