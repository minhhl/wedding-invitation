'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import {
  groomName,
  brideName,
  groomFullName,
  brideFullName,
  groomFather,
  groomMother,
  brideFather,
  brideMother,
  initial,
} from '@/lib/weddingData'
import { logo } from '@/lib/decor'
import { Header } from '@/components/Header'
import { googleMapsDirectionsUrl } from '@/lib/weddingSchedule'
import type { InvitationSide } from '@/components/InvitationCard'

// Ceremony-panel (left) and reception-panel (middle) details, per side.
// Defined independently of weddingScheduleChapters/InvitationCard's own
// data — same reasoning as InvitationCard.tsx: each printed surface owns
// its text so editing one can't silently break another.
interface PanelDetails {
  title: string
  venueLabel: string
  addressLines: string[]
  chapterLabel: string
  date: string
  time: string
  lunarDate: string
  fullAddress?: string
}

const CEREMONY_BY_SIDE: Record<InvitationSide, PanelDetails> = {
  trai: {
    title: 'Lễ Thành Hôn',
    venueLabel: 'Được tổ chức tại tư gia Nhà Trai',
    addressLines: ['Số 10, Ngõ 49/1/32 Đức Giang', 'Việt Hưng, Hà Nội'],
    chapterLabel: 'Chủ Nhật',
    date: '20.09.2026',
    time: '15h15',
    lunarDate: 'Tức ngày 10/8 năm Bính Ngọ',
  },
  gai: {
    title: 'Lễ Vu Quy',
    venueLabel: 'Được tổ chức tại tư gia Nhà Gái',
    addressLines: ['Thôn Hồng Tiến, Xã Hợp Thịnh', 'Tỉnh Bắc Ninh'],
    chapterLabel: 'Chủ Nhật',
    date: '20.09.2026',
    time: '13h15',
    lunarDate: 'Tức ngày 10/8 năm Bính Ngọ',
  },
}

const RECEPTION_BY_SIDE: Record<InvitationSide, PanelDetails> = {
  trai: {
    title: 'Trung Tâm Hội Nghị 133',
    venueLabel: 'Được tổ chức tại',
    addressLines: ['Số 105, Đường Lý Sơn', 'Ngọc Thụy, Bồ Đề, Hà Nội'],
    chapterLabel: 'Chủ Nhật',
    date: '20.09.2026',
    time: '17h00',
    lunarDate: 'Tức ngày 10/8 năm Bính Ngọ',
    fullAddress: 'Trung Tâm Hội Nghị 133, 105 Đường Lý Sơn, Ngọc Thụy, Bồ Đề, Hà Nội',
  },
  gai: {
    title: 'Tư Gia Nhà Gái',
    venueLabel: 'Được tổ chức tại',
    addressLines: ['Thôn Hồng Tiến, Xã Hợp Thịnh', 'Tỉnh Bắc Ninh'],
    chapterLabel: 'Thứ Bảy',
    date: '19.09.2026',
    time: '16h00',
    lunarDate: 'Tức ngày 9/8 năm Bính Ngọ',
    // GPS coordinates — see the same note in InvitationCard.tsx.
    fullAddress: '21.345287,105.951984',
  },
}

const sideFamilyLabel: Record<InvitationSide, string> = { trai: 'Nhà Trai', gai: 'Nhà Gái' }

function PanelDivider() {
  return <div className="h-px w-full shrink-0 bg-ink/15" aria-hidden />
}

// Renders a parent's name, shrinking a trailing honorific like "(Cố phụ)"
// down to 8px instead of matching the name's own size.
function ParentName({ name }: { name: string }) {
  const match = name.match(/^(.*?)\s*(\(.*\))$/)
  if (!match) return <>{name}</>
  const [, base, suffix] = match
  return (
    <>
      {base}{' '}
      <span style={{ fontSize: '8px' }}>{suffix}</span>
    </>
  )
}

export function PaperInvitation({ side = 'trai' }: { side?: InvitationSide }) {
  const ceremony = CEREMONY_BY_SIDE[side]
  const reception = RECEPTION_BY_SIDE[side]
  const [guestName, setGuestName] = useState<string | null>(null)

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get('name')
    if (name?.trim()) setGuestName(name.trim())
  }, [])

  // The hosting side's family is listed first — mirrors WeddingCalendar.tsx's
  // leftPerson/rightPerson swap.
  const trai = { label: sideFamilyLabel.trai, father: groomFather, mother: groomMother }
  const gai = { label: sideFamilyLabel.gai, father: brideFather, mother: brideMother }
  const familyBlocks = side === 'gai' ? [gai, trai] : [trai, gai]
  const coupleNames = side === 'gai' ? [brideFullName, groomFullName] : [groomFullName, brideFullName]

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-200">
      <div className="mx-auto flex w-full max-w-[385px] flex-col overflow-hidden rounded-sm border border-ink/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        {/* Panel 3 — Save the Date cover, shown first (the card's front).
            The real site header, not a re-styled copy, so it always matches. */}
        <Header />

        <PanelDivider />

        {/* Panel 1 — the earlier ceremony (Lễ Thành Hôn / Lễ Vu Quy) */}
        <section className="flex w-full flex-col items-center gap-4 px-3 py-10 text-center">
          <div className="relative h-20 w-32">
            <Image src={logo} alt="" fill sizes="128px" style={{ objectFit: 'contain' }} />
            <div className="absolute inset-0 flex items-center justify-center gap-8">
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-champagne">
                {initial(groomName)}
              </span>
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-champagne">
                {initial(brideName)}
              </span>
            </div>
          </div>
          <p
            style={{ fontFamily: 'var(--font-script-flourish)', fontSize: '26px' }}
            className="text-champagne"
          >
            {ceremony.title}
          </p>
          <p className="text-[11px] uppercase tracking-[0.15em] text-quote">{ceremony.venueLabel}</p>
          <p className="text-sm leading-relaxed text-ink">
            {ceremony.addressLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < ceremony.addressLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-quote">
            Vào lúc {ceremony.time} · {ceremony.chapterLabel}
          </p>
          <p style={{ fontFamily: 'var(--font-calendar)' }} className="text-2xl text-champagne">
            {ceremony.date}
          </p>
          <p className="text-xs italic text-quote">{ceremony.lunarDate}</p>
          <p className="mt-2 text-sm text-ink">Rất hân hạnh được đón tiếp!</p>

          <div className="mt-4 grid w-full grid-cols-2 gap-3 border-t border-ink/10 pt-4 text-left text-[11px] text-ink/80">
            {familyBlocks.map((family) => (
              <div key={family.label}>
                <p className="font-medium uppercase tracking-[0.1em] text-champagne">{family.label}</p>
                <p><ParentName name={family.father} /></p>
                <p><ParentName name={family.mother} /></p>
              </div>
            ))}
          </div>
        </section>

        <PanelDivider />

        {/* Panel 2 — the main reception invitation */}
        <section className="flex w-full flex-col items-center gap-4 px-3 py-10 text-center">
          <p
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-ink"
          >
            Trân trọng kính mời
          </p>
          {/* Dotted line — shows the guest's name when the page is opened
              via a personalized link (?name=...), same as InvitationCard;
              left blank otherwise for hand-writing on a printed card. */}
          <div className="flex h-6 w-52 items-end justify-center border-b border-dotted border-ink/40">
            {guestName && (
              <span style={{ fontFamily: 'var(--font-heading)' }} className="text-sm italic text-ink">
                {guestName}
              </span>
            )}
          </div>
          <p className="text-sm text-ink/80">
            Đến dự bữa cơm thân mật
            <br />
            chung vui cùng gia đình chúng tôi
          </p>

          <div className="flex flex-col gap-1">
            {coupleNames.map((name) => (
              <p key={name} style={{ fontFamily: 'var(--font-calendar)' }} className="text-lg uppercase tracking-[0.1em] text-champagne">
                {name}
              </p>
            ))}
          </div>

          <p className="text-[11px] uppercase tracking-[0.15em] text-quote">{reception.venueLabel}</p>
          <p
            style={{ fontFamily: 'var(--font-heading)', fontSize: '22px' }}
            className="font-semibold italic uppercase text-champagne"
          >
            {reception.title}
          </p>
          <p className="text-sm leading-relaxed text-ink">
            {reception.addressLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < reception.addressLines.length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="flex w-full divide-x divide-champagne border-y border-champagne text-sm">
            <div className="flex-1 py-2 text-center font-medium uppercase tracking-[0.1em] text-ink">{reception.time}</div>
            <div className="flex-1 py-2 uppercase tracking-[0.1em] text-ink">
              {reception.chapterLabel} {reception.date}
            </div>
          </div>

          <p className="text-xs italic text-quote">{reception.lunarDate}</p>
          <p className="mt-4 text-xs text-ink/80">
            Sự hiện diện của Quý khách
            <br />
            là niềm vinh dự cho gia đình chúng tôi!
          </p>
        </section>

        <PanelDivider />

        {/* Directions to the reception venue, at the very bottom of the card. */}
        <section className="flex w-full flex-col items-center gap-2 py-6 text-center">
          <a
            href={googleMapsDirectionsUrl(reception.fullAddress ?? '')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-champagne"
          >
            <MapPin size={20} strokeWidth={1.5} />
            <span
              style={{ fontFamily: 'var(--font-heading)' }}
              className="text-sm uppercase tracking-[0.15em]"
            >
              Chỉ đường
            </span>
          </a>
        </section>
      </div>
    </div>
  )
}
