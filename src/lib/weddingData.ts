export const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Hoàng Minh'
export const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Minh Ngọc'

export const groomFamily = {
  title: 'Nhà Trai',
  father: 'Hoàng Văn Lâm',
  mother: 'Lê Thị Hải',
}

export const brideFamily = {
  title: 'Nhà Gái',
  father: 'Nguyễn Thanh Tùng',
  fatherNote: 'Cố Phụ',
  mother: 'Nguyễn Thị Quý',
}

export interface WeddingEventData {
  id: string
  title: string
  /** ISO 8601 with +07:00 offset */
  datetime: string
  dayLabel: string
  time: string
  venue: string
  address: string
}

export const weddingEvents: WeddingEventData[] = [
  {
    id: 'brides-family',
    title: 'Lễ Nhà Gái',
    datetime: '2026-09-19T16:00:00+07:00',
    dayLabel: 'Thứ Bảy',
    time: '16:00',
    venue: 'Tư Gia Nhà Gái',
    address: 'Thôn Hồng Tiến, Xã Hợp Thịnh, Tỉnh Bắc Ninh',
  },
  {
    id: 'ceremony',
    title: 'Lễ Thành Hôn',
    datetime: '2026-09-20T15:15:00+07:00',
    dayLabel: 'Chủ Nhật',
    time: '15:15',
    venue: 'Tư Gia Nhà Trai',
    address: 'Số 10, Hẻm 49/1/32, Phố Đức Giang, Phường Việt Hưng, Hà Nội',
  },
  {
    id: 'reception',
    title: 'Tiệc Cưới',
    datetime: '2026-09-20T17:00:00+07:00',
    dayLabel: 'Chủ Nhật',
    time: '17:00',
    venue: 'Trung Tâm Hội Nghị 133',
    address: 'Số 105 Đường Lý Sơn, Ngọc Thụy, Bồ Đề, Hà Nội',
  },
]

/** The moment the site counts down to — the ceremony itself. */
export const weddingDateTime = new Date(weddingEvents[1].datetime)

export function formatVietnameseDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function googleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

// VietQR bank short-codes, keyed by lowercase name/alias — covers the banks
// most commonly used in Vietnamese wedding gift transfers.
const vietQrBankCodes: Record<string, string> = {
  vietcombank: 'vietcombank',
  vcb: 'vietcombank',
  techcombank: 'techcombank',
  tcb: 'techcombank',
  bidv: 'bidv',
  vietinbank: 'vietinbank',
  agribank: 'agribank',
  mbbank: 'mbbank',
  mb: 'mbbank',
  acb: 'acb',
  vpbank: 'vpbank',
  tpbank: 'tpbank',
  sacombank: 'sacombank',
  hdbank: 'hdbank',
  vib: 'vib',
  msb: 'msb',
  ocb: 'ocb',
  scb: 'scb',
  eximbank: 'eximbank',
  seabank: 'seabank',
  shb: 'shb',
  vietcapitalbank: 'vietcapitalbank',
  bacabank: 'bacabank',
  namabank: 'namabank',
}

export function resolveVietQrBankCode(bankName: string): string {
  const key = bankName.trim().toLowerCase().replace(/\s+/g, '')
  return vietQrBankCodes[key] ?? key
}

/** VietQR quick-link image — a scannable bank-transfer QR, no API key required. */
export function vietQrImageUrl(
  bankCode: string,
  accountNumber: string,
  accountHolder: string
): string {
  const params = new URLSearchParams({ accountName: accountHolder })
  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?${params.toString()}`
}

function toGCalStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function googleCalendarUrl(event: WeddingEventData, durationHours = 2): string {
  const start = new Date(event.datetime)
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} — ${groomName} & ${brideName}`,
    dates: `${toGCalStamp(event.datetime)}/${toGCalStamp(end.toISOString())}`,
    details: `${event.title} tại ${event.venue}`,
    location: event.address,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
