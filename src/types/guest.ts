export const GUEST_SIDES = ['Nhà trai', 'Nhà gái'] as const
export type GuestSide = (typeof GUEST_SIDES)[number]

export const GUEST_GROUPS = [
  'Họ hàng',
  'Bạn bè',
  'Đồng nghiệp',
  'Đồng nghiệp FPT',
  'Đồng nghiệp BB',
  'Đối tác',
  'Hàng xóm',
  'Khác',
] as const
export type GuestGroup = (typeof GUEST_GROUPS)[number]

export const GUEST_STATUSES = ['Chưa mời', 'Đã mời', 'Sẽ đến', 'Không đến'] as const
export type GuestStatus = (typeof GUEST_STATUSES)[number]

export const GUEST_SOURCES = ['MANUAL', 'IMPORT_EXCEL', 'RSVP'] as const
export type GuestSource = (typeof GUEST_SOURCES)[number]

export const GUEST_SOURCE_LABELS: Record<GuestSource, string> = {
  MANUAL: 'Thủ công',
  IMPORT_EXCEL: 'Nhập từ Excel',
  RSVP: 'RSVP',
}

export interface Guest {
  id: string
  name: string
  phone: string
  side: GuestSide
  group: GuestGroup
  partySize: number
  status: GuestStatus
  table: number | null
  note: string
  source: GuestSource
}

export type GuestDraft = Omit<Guest, 'id' | 'table'>

/** Used for Excel import, where a "Bàn" value may already be present in the file. */
export type GuestImportDraft = GuestDraft & { table: number | null }

export const TABLE_CAPACITY = 10
export const MAX_PARTY_SIZE = 20

export interface GuestStats {
  totalGuests: number
  totalPeople: number
  confirmedGuests: number
  confirmedPeople: number
  estimatedTables: number
}

export interface TableSummary {
  tableNumber: number
  totalPeople: number
  guestIds: string[]
}

export interface TableStats {
  totalTables: number
  tablesWithRoom: number
  tablesFull: number
  tablesOverloaded: number
}
