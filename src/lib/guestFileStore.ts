import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import * as XLSX from 'xlsx'
import { Guest } from '@/types/guest'
import {
  EXCEL_COLUMN_WIDTHS,
  EXCEL_COLUMNS,
  EXCEL_SHEET_NAME,
  guestToRow,
  rowToGuestDraft,
} from '@/lib/guestExcelRows'

const GUEST_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'guest-list.xlsx')

export function createGuestId() {
  return `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
const createId = createGuestId

/** Reads guest-list.xlsx from disk. Creates an empty file on first run. */
export function readGuestsFromDisk(): Guest[] {
  if (!fs.existsSync(GUEST_FILE_PATH)) {
    writeGuestsToDisk([])
    return []
  }

  const workbook = XLSX.readFile(GUEST_FILE_PATH)
  const sheetName = workbook.SheetNames.includes(EXCEL_SHEET_NAME)
    ? EXCEL_SHEET_NAME
    : workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' })

  let generatedNewId = false
  const guests = rows
    .map((row) => {
      const existingId = String(row['ID'] ?? '').trim()
      if (existingId) return { id: existingId, ...rowToGuestDraft(row) }
      generatedNewId = true
      return { id: createId(), ...rowToGuestDraft(row) }
    })
    .filter((guest) => guest.name.length > 0)

  // Persist any freshly-generated ids immediately so a *different* request
  // reading the file a moment later (e.g. an RSVP approval) sees the same
  // ids rather than generating its own — ids aren't stable otherwise.
  if (generatedNewId) writeGuestsToDisk(guests)

  return guests
}

/** Overwrites guest-list.xlsx on disk with the given guest list. */
export function writeGuestsToDisk(guests: Guest[]): void {
  const worksheet = XLSX.utils.json_to_sheet(guests.map(guestToRow), {
    header: [...EXCEL_COLUMNS],
  })
  worksheet['!cols'] = EXCEL_COLUMN_WIDTHS

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, EXCEL_SHEET_NAME)

  fs.mkdirSync(path.dirname(GUEST_FILE_PATH), { recursive: true })
  XLSX.writeFile(workbook, GUEST_FILE_PATH)
}
