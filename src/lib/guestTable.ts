import { Guest, GuestStats, TableStats, TableSummary, TABLE_CAPACITY } from '@/types/guest'

/**
 * Bin-packs every "Sẽ đến" guest into sequential tables of TABLE_CAPACITY seats,
 * counting each guest's full party size (not guest count). Used only by the
 * explicit "Phân bàn tự động" action — it overwrites any manual table numbers.
 */
export function assignTables(guests: Guest[]): Guest[] {
  let currentTable = 1
  let seatsUsed = 0

  return guests.map((guest) => {
    if (guest.status !== 'Sẽ đến') {
      return guest.table === null ? guest : { ...guest, table: null }
    }

    if (seatsUsed > 0 && seatsUsed + guest.partySize > TABLE_CAPACITY) {
      currentTable += 1
      seatsUsed = 0
    }
    seatsUsed += guest.partySize

    return guest.table === currentTable ? guest : { ...guest, table: currentTable }
  })
}

/**
 * Only clears table numbers off guests who are no longer "Sẽ đến". Does not
 * repack seating, so manual table numbers and (possibly temporary) overload
 * states from user edits are preserved.
 */
export function normalizeGuestTables(guests: Guest[]): Guest[] {
  return guests.map((guest) =>
    guest.status !== 'Sẽ đến' && guest.table !== null ? { ...guest, table: null } : guest
  )
}

export function computeGuestStats(guests: Guest[]): GuestStats {
  const totalGuests = guests.length
  const totalPeople = guests.reduce((sum, g) => sum + (g.partySize || 0), 0)

  const confirmed = guests.filter((g) => g.status === 'Sẽ đến')
  const confirmedGuests = confirmed.length
  const confirmedPeople = confirmed.reduce((sum, g) => sum + (g.partySize || 0), 0)
  const estimatedTables = Math.ceil(confirmedPeople / TABLE_CAPACITY)

  return { totalGuests, totalPeople, confirmedGuests, confirmedPeople, estimatedTables }
}

/** Real seat totals per table number, from guest.table + guest.partySize — never guest count. */
export function getTableSummaries(guests: Guest[]): TableSummary[] {
  const byTable = new Map<number, TableSummary>()

  for (const guest of guests) {
    if (guest.status !== 'Sẽ đến' || guest.table === null) continue
    const existing = byTable.get(guest.table)
    if (existing) {
      existing.totalPeople += guest.partySize
      existing.guestIds.push(guest.id)
    } else {
      byTable.set(guest.table, {
        tableNumber: guest.table,
        totalPeople: guest.partySize,
        guestIds: [guest.id],
      })
    }
  }

  return [...byTable.values()].sort((a, b) => a.tableNumber - b.tableNumber)
}

/**
 * Sum of partySize for confirmed guests already seated at `table`, optionally
 * excluding one guest (used when re-checking a guest that's being edited).
 * Used to validate a table before an RSVP approval assigns it.
 */
export function getTableTotal(guests: Guest[], table: number, excludeGuestId?: string): number {
  return guests
    .filter((g) => g.status === 'Sẽ đến' && g.table === table && g.id !== excludeGuestId)
    .reduce((sum, g) => sum + g.partySize, 0)
}

export function computeTableStats(summaries: TableSummary[]): TableStats {
  let tablesWithRoom = 0
  let tablesFull = 0
  let tablesOverloaded = 0

  for (const table of summaries) {
    if (table.totalPeople > TABLE_CAPACITY) tablesOverloaded += 1
    else if (table.totalPeople === TABLE_CAPACITY) tablesFull += 1
    else tablesWithRoom += 1
  }

  return {
    totalTables: summaries.length,
    tablesWithRoom,
    tablesFull,
    tablesOverloaded,
  }
}
