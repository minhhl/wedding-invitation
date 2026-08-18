import {
  Guest,
  GuestGroup,
  GuestImportDraft,
  GuestSide,
  GuestStatus,
  GUEST_GROUPS,
  GUEST_SIDES,
  GUEST_STATUSES,
} from '@/types/guest'

export const EXCEL_SHEET_NAME = 'DanhSachKhachMoi'

export const EXCEL_COLUMNS = [
  'Tên khách',
  'SĐT',
  'Bên',
  'Nhóm',
  'Số người',
  'Xác nhận',
  'Bàn',
  'Ghi chú',
] as const

export type GuestExcelRow = Record<(typeof EXCEL_COLUMNS)[number], string | number>

export const EXCEL_COLUMN_WIDTHS = [
  { wch: 22 },
  { wch: 14 },
  { wch: 10 },
  { wch: 12 },
  { wch: 10 },
  { wch: 12 },
  { wch: 8 },
  { wch: 40 },
]

export function guestToRow(guest: Guest): GuestExcelRow {
  return {
    'Tên khách': guest.name,
    'SĐT': guest.phone,
    'Bên': guest.side,
    'Nhóm': guest.group,
    'Số người': guest.partySize,
    'Xác nhận': guest.status,
    'Bàn': guest.table ?? '',
    'Ghi chú': guest.note,
  }
}

function normalizeEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  const str = String(value ?? '').trim()
  return (allowed as readonly string[]).includes(str) ? (str as T) : fallback
}

function normalizePhone(value: unknown): string {
  if (typeof value === 'number') return String(value)
  return String(value ?? '').trim()
}

/** Số người: integer >= 1. Blank, 0, negative, or non-numeric all fall back to 1. */
function normalizePartySize(value: unknown): number {
  const raw = Number(value)
  return Number.isFinite(raw) && raw >= 1 ? Math.round(raw) : 1
}

/** Bàn: integer >= 1 if present and valid, otherwise unassigned. */
function normalizeTable(value: unknown): number | null {
  const raw = Number(value)
  return Number.isFinite(raw) && raw >= 1 ? Math.round(raw) : null
}

export function rowToGuestDraft(row: Record<string, unknown>): GuestImportDraft {
  const status = normalizeEnum<GuestStatus>(row['Xác nhận'], GUEST_STATUSES, 'Chưa mời')
  return {
    name: String(row['Tên khách'] ?? '').trim(),
    phone: normalizePhone(row['SĐT']),
    side: normalizeEnum<GuestSide>(row['Bên'], GUEST_SIDES, 'Nhà trai'),
    group: normalizeEnum<GuestGroup>(row['Nhóm'], GUEST_GROUPS, 'Khác'),
    partySize: normalizePartySize(row['Số người']),
    status,
    // Only a confirmed guest may hold a table seat.
    table: status === 'Sẽ đến' ? normalizeTable(row['Bàn']) : null,
    note: String(row['Ghi chú'] ?? '').trim(),
  }
}
