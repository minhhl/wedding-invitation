'use client'

import { MapPin } from 'lucide-react'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline, LadiLine } from '@/components/ladi'
import { weddingScheduleChapters, googleMapsDirectionsUrl } from '@/lib/weddingSchedule'
import {
  groomName,
  brideName,
  groomFather,
  groomMother,
  brideFather,
  brideMother,
  lunarDateLabelSaturday,
  initial,
} from '@/lib/weddingData'
import {
  plasterTexture,
  pearl,
  brideCardPaper,
  brideCardAmpersand,
  brideCardOrchidCorner,
  brideCardOrchidTop,
  brideCardMonogramFrame,
  brideCardOrchidSpray,
} from '@/lib/decor'

const SECTION_HEIGHT = 1044

// Bride's side: the reception/meal held at the bride's family home.
const brideChapter = weddingScheduleChapters[0]
const brideEvent = brideChapter.events[1]

export function InvitationCardBride() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <LadiImage top={0} left={0} width={420} height={SECTION_HEIGHT} src={plasterTexture} alt="" />

        {/* Monogram badge */}
        <LadiGroup top={82} left={130} width={170} height={177} className="flex items-center justify-center">
          <LadiImage top={0} left={0} width={170} height={177} src={brideCardMonogramFrame} alt="" />
          <LadiHeadline
            top={64}
            left={31}
            width={55}
            fontFamily="var(--font-heading)"
            fontSize={34}
            letterSpacing={4}
            color="var(--color-taupe)"
            textAlign="center"
          >
            {initial(brideName)}
          </LadiHeadline>
          <LadiLine top={71} left={84} width={1} height={39} color="var(--color-taupe)" />
          <LadiHeadline
            top={64}
            left={97}
            width={55}
            fontFamily="var(--font-heading)"
            fontSize={34}
            letterSpacing={4}
            color="var(--color-taupe)"
            textAlign="center"
          >
            {initial(groomName)}
          </LadiHeadline>
        </LadiGroup>

        <LadiImage top={-3} left={0} width={311} height={281} src={brideCardOrchidCorner} alt="" />
        <LadiImage top={0} left={256} width={162} height={95} src={brideCardOrchidTop} alt="" />

        {/* Main card */}
        <LadiGroup top={334} left={-5} width={429} height={596}>
          <LadiImage top={0} left={16} width={398} height={596} src={brideCardPaper} alt="" />

          <LadiHeadline
            top={52}
            left={60}
            width={323}
            fontFamily="var(--font-heading)"
            fontSize={14}
            lineHeight={1.4}
            color="var(--color-taupe)"
            textAlign="center"
            textTransform="uppercase"
          >
            Trân trọng kính mời bạn đến dự buổi tiệc
            <br />
            chung vui cùng chúng tôi
          </LadiHeadline>

          <LadiGroup top={91} left={84} width={277} height={88} className="flex items-center justify-center">
            <LadiHeadline
              top={24}
              left={0}
              width={132}
              fontFamily="var(--font-bride-script)"
              fontSize={30}
              lineHeight={1.6}
              color="var(--color-taupe)"
              textAlign="center"
            >
              {brideName}
            </LadiHeadline>
            <LadiImage top={0} left={99} width={73} height={88} src={brideCardAmpersand} alt="" />
            <LadiHeadline
              top={24}
              left={118}
              width={159}
              fontFamily="var(--font-bride-script)"
              fontSize={30}
              lineHeight={1.6}
              color="var(--color-taupe)"
              textAlign="center"
            >
              {groomName}
            </LadiHeadline>
          </LadiGroup>

          <LadiGroup top={196} left={11} width={408} height={107}>
            <LadiHeadline
              top={0}
              left={38}
              width={333}
              fontFamily="var(--font-heading)"
              fontSize={14}
              lineHeight={1.6}
              color="var(--color-taupe)"
              textAlign="center"
              textTransform="uppercase"
            >
              Được tổ chức tại tư gia
            </LadiHeadline>
            <LadiHeadline
              top={18}
              left={29}
              width={350}
              fontFamily="var(--font-heading)"
              fontSize={34}
              letterSpacing={1}
              lineHeight={1.6}
              color="var(--color-taupe)"
              textAlign="center"
              textTransform="uppercase"
            >
              Nhà Gái
            </LadiHeadline>
            <LadiHeadline
              top={73}
              left={0}
              width={408}
              fontFamily="var(--font-heading)"
              fontSize={14}
              lineHeight={1.2}
              color="var(--color-taupe)"
              textAlign="center"
            >
              {brideEvent.addressLines.join(', ')}
            </LadiHeadline>
          </LadiGroup>

          <LadiHeadline
            top={366}
            left={37}
            width={352}
            fontFamily="var(--font-heading)"
            fontSize={14}
            lineHeight={1.6}
            color="var(--color-taupe)"
            textAlign="center"
            fontStyle="italic"
          >
            {lunarDateLabelSaturday}
          </LadiHeadline>

          <LadiGroup top={317} left={61} width={310} height={43} className="flex items-center justify-between">
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 6,
                border: '2px dotted rgba(0,0,0,0.15)',
              }}
            />
            <span
              className="flex-1 text-center uppercase"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-taupe)', whiteSpace: 'nowrap' }}
            >
              {brideChapter.label}
            </span>
            <span
              className="flex-1 text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-taupe)', whiteSpace: 'nowrap' }}
            >
              {brideChapter.date}
            </span>
            <span
              className="flex-1 text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-taupe)', whiteSpace: 'nowrap' }}
            >
              {brideEvent.time}
            </span>
          </LadiGroup>

          <LadiGroup top={406} left={0} width={429} height={55}>
            <LadiHeadline
              top={0}
              left={0}
              width={192}
              fontFamily='"EB Garamond", serif'
              fontSize={14}
              lineHeight={1.3}
              color="var(--color-taupe)"
              textAlign="right"
            >
              NHÀ GÁI
              <br />
              {brideFather}
              <br />
              {brideMother}
            </LadiHeadline>
            <LadiLine top={0} left={208.7} width={1} height={50} color="var(--color-taupe)" />
            <LadiHeadline
              top={0}
              left={237.25}
              width={192}
              fontFamily='"EB Garamond", serif'
              fontSize={14}
              lineHeight={1.3}
              color="var(--color-taupe)"
              textAlign="left"
            >
              NHÀ TRAI
              <br />
              {groomFather}
              <br />
              {groomMother}
            </LadiHeadline>
          </LadiGroup>

          <LadiGroup top={487} left={152} width={132} height={48} className="flex flex-col items-center">
            <a
              href={googleMapsDirectionsUrl(brideEvent.fullAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1"
              style={{ color: 'var(--color-taupe)' }}
            >
              <MapPin size={18} strokeWidth={1.5} />
              <span
                className="uppercase"
                style={{ fontFamily: 'var(--font-heading)', fontSize: 14, lineHeight: 1.6 }}
              >
                xem chỉ đường
              </span>
            </a>
          </LadiGroup>
        </LadiGroup>

        <LadiImage top={779} left={224} width={243} height={243} src={brideCardOrchidSpray} alt="" />
        <LadiImage top={917} left={224} width={39} height={39} src={pearl} alt="" />
      </LadiCanvas>
    </section>
  )
}
