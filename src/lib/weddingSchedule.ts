export interface ScheduleEvent {
  icon: 'dove' | 'rings' | 'wine' | 'utensils'
  time: string
  title: string
  venueName?: string
  addressLines: string[]
  fullAddress: string
  startISO: string
  endISO: string
}

export interface ScheduleChapter {
  label: string
  date: string
  events: ScheduleEvent[]
}

export const weddingScheduleChapters: ScheduleChapter[] = [
  {
    label: 'Chủ Nhật',
    date: '20/09/2026',
    events: [
       {
        icon: 'dove',
        time: '13:15',
        title: 'Lễ Vu Quy',
        addressLines: ['Thôn Hồng Tiến', 'Xã Hợp Thịnh', 'Tỉnh Bắc Ninh'],
        // GPS coordinates — see the same note in InvitationCard.tsx.
        fullAddress: '21.345287,105.951984',
        startISO: '2026-09-19T13:15:00+07:00',
        endISO: '2026-09-19T15:15:00+07:00',
      },
      {
        icon: 'rings',
        time: '15:15',
        title: 'Lễ Thành Hôn',
        addressLines: ['Số 10, Ngõ 49/1/32 Đức Giang', 'Việt Hưng', 'Hà Nội'],
        fullAddress: 'Số 10, Ngõ 49/1/32 Đức Giang, Việt Hưng, Hà Nội',
        startISO: '2026-09-20T15:15:00+07:00',
        endISO: '2026-09-20T17:15:00+07:00',
      },
      {
        icon: 'wine',
        time: '17:00',
        title: 'Tiệc Cưới',
        venueName: 'Trung Tâm Hội Nghị 133',
        addressLines: ['105 Đường Lý Sơn', 'Ngọc Thụy', 'Bồ Đề', 'Hà Nội'],
        fullAddress: 'Trung Tâm Hội Nghị 133, 105 Đường Lý Sơn, Ngọc Thụy, Bồ Đề, Hà Nội',
        startISO: '2026-09-20T17:00:00+07:00',
        endISO: '2026-09-20T19:00:00+07:00',
      },
    ],
  },
]

export function googleMapsDirectionsUrl(destination: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
}

function toICSDateUTC(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function googleCalendarUrl(event: ScheduleEvent, title: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toICSDateUTC(event.startISO)}/${toICSDateUTC(event.endISO)}`,
    location: event.fullAddress,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function outlookCalendarUrl(event: ScheduleEvent, title: string): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    startdt: event.startISO,
    enddt: event.endISO,
    location: event.fullAddress,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function icsDataUrl(event: ScheduleEvent, title: string): string {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${toICSDateUTC(event.startISO)}`,
    `DTEND:${toICSDateUTC(event.endISO)}`,
    `SUMMARY:${title}`,
    `LOCATION:${event.fullAddress}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}
