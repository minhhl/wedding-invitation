import * as XLSX from 'xlsx'
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
import { computeGuestStats, computeTableStats, getTableSummaries } from '@/lib/guestTable'

const EXCEL_COLUMNS = [
  'Tên khách',
  'SĐT',
  'Bên',
  'Nhóm',
  'Số người',
  'Xác nhận',
  'Bàn',
  'Ghi chú',
] as const

type GuestExcelRow = Record<(typeof EXCEL_COLUMNS)[number], string | number>

function guestToRow(guest: Guest): GuestExcelRow {
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

function buildWorkbook(guests: Guest[], sheetName: string) {
  const worksheet = XLSX.utils.json_to_sheet(guests.map(guestToRow), {
    header: [...EXCEL_COLUMNS],
  })
  worksheet['!cols'] = [
    { wch: 22 },
    { wch: 14 },
    { wch: 10 },
    { wch: 12 },
    { wch: 10 },
    { wch: 12 },
    { wch: 8 },
    { wch: 28 },
  ]
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  return workbook
}

export function exportGuestsToExcel(
  guests: Guest[],
  filename = 'guest-list.xlsx',
  sheetName = 'DanhSachKhachMoi'
) {
  const workbook = buildWorkbook(guests, sheetName)
  XLSX.writeFile(workbook, filename)
}

export function exportSummaryReport(guests: Guest[], filename = 'bao-cao-tong-hop.xlsx') {
  const stats = computeGuestStats(guests)
  const tableStats = computeTableStats(getTableSummaries(guests))
  const bySide = GUEST_SIDES.map((side) => {
    const rows = guests.filter((g) => g.side === side)
    const confirmed = rows.filter((g) => g.status === 'Sẽ đến')
    return {
      Bên: side,
      'Số khách': rows.length,
      'Tổng người': rows.reduce((sum, g) => sum + g.partySize, 0),
      'Sẽ đến (khách)': confirmed.length,
      'Sẽ đến (người)': confirmed.reduce((sum, g) => sum + g.partySize, 0),
    }
  })

  const summaryRows = [
    { 'Chỉ số': 'Tổng số khách', 'Giá trị': stats.totalGuests },
    { 'Chỉ số': 'Tổng số người', 'Giá trị': stats.totalPeople },
    { 'Chỉ số': 'Khách sẽ đến', 'Giá trị': stats.confirmedGuests },
    { 'Chỉ số': 'Người sẽ đến', 'Giá trị': stats.confirmedPeople },
    { 'Chỉ số': 'Ước tính số bàn', 'Giá trị': stats.estimatedTables },
    { 'Chỉ số': 'Tổng số bàn đang dùng', 'Giá trị': tableStats.totalTables },
    { 'Chỉ số': 'Bàn còn chỗ', 'Giá trị': tableStats.tablesWithRoom },
    { 'Chỉ số': 'Bàn đầy', 'Giá trị': tableStats.tablesFull },
    { 'Chỉ số': 'Bàn quá tải', 'Giá trị': tableStats.tablesOverloaded },
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(summaryRows),
    'TongQuan'
  )
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(bySide), 'TheoBen')
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(guests.map(guestToRow), { header: [...EXCEL_COLUMNS] }),
    'ChiTiet'
  )
  XLSX.writeFile(workbook, filename)
}

export function exportGuestsBySide(guests: Guest[], side: GuestSide) {
  const filename = side === 'Nhà trai' ? 'danh-sach-nha-trai.xlsx' : 'danh-sach-nha-gai.xlsx'
  exportGuestsToExcel(
    guests.filter((g) => g.side === side),
    filename,
    'DanhSachKhachMoi'
  )
}

export function exportConfirmedGuests(guests: Guest[]) {
  exportGuestsToExcel(
    guests.filter((g) => g.status === 'Sẽ đến'),
    'danh-sach-se-den.xlsx',
    'DanhSachKhachMoi'
  )
}

export function exportUnrespondedGuests(guests: Guest[]) {
  exportGuestsToExcel(
    guests.filter((g) => g.status === 'Chưa mời' || g.status === 'Đã mời'),
    'danh-sach-chua-phan-hoi.xlsx',
    'DanhSachKhachMoi'
  )
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

function rowToGuestDraft(row: Record<string, unknown>): GuestImportDraft {
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

export async function importGuestsFromExcelFile(file: File): Promise<GuestImportDraft[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' })
  return rows
    .map(rowToGuestDraft)
    .filter((draft) => draft.name.length > 0)
}
