import * as XLSX from 'xlsx'
import { Guest, GuestImportDraft, GuestSide, GUEST_SIDES } from '@/types/guest'
import { computeGuestStats, computeTableStats, getTableSummaries } from '@/lib/guestTable'
import {
  EXCEL_COLUMN_WIDTHS,
  EXCEL_COLUMNS,
  EXCEL_SHEET_NAME,
  guestToRow,
  rowToGuestDraft,
} from '@/lib/guestExcelRows'

function buildWorkbook(guests: Guest[], sheetName: string) {
  const worksheet = XLSX.utils.json_to_sheet(guests.map(guestToRow), {
    header: [...EXCEL_COLUMNS],
  })
  worksheet['!cols'] = EXCEL_COLUMN_WIDTHS
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  return workbook
}

export function exportGuestsToExcel(
  guests: Guest[],
  filename = 'guest-list.xlsx',
  sheetName = EXCEL_SHEET_NAME
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
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryRows), 'TongQuan')
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
    filename
  )
}

export function exportConfirmedGuests(guests: Guest[]) {
  exportGuestsToExcel(
    guests.filter((g) => g.status === 'Sẽ đến'),
    'danh-sach-se-den.xlsx'
  )
}

export function exportUnrespondedGuests(guests: Guest[]) {
  exportGuestsToExcel(
    guests.filter((g) => g.status === 'Chưa mời' || g.status === 'Đã mời'),
    'danh-sach-chua-phan-hoi.xlsx'
  )
}

export async function importGuestsFromExcelFile(file: File): Promise<GuestImportDraft[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' })
  return rows.map(rowToGuestDraft).filter((draft) => draft.name.length > 0)
}
