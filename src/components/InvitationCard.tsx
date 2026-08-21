'use client'

import { ChevronRight } from 'lucide-react'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline, LadiLine } from '@/components/ladi'
import { weddingScheduleChapters, googleMapsDirectionsUrl } from '@/lib/weddingSchedule'
import {
  groomName,
  brideName,
  groomFather,
  groomMother,
  brideFather,
  brideMother,
  initial,
} from '@/lib/weddingData'
import { plasterTexture, invitationBg, paperCard, flowerBranch, pearl, logo } from '@/lib/decor'

const SECTION_HEIGHT = 1027

// The reception is the event guests actually need directions/timing for.
const receptionChapter = weddingScheduleChapters[weddingScheduleChapters.length - 1]
const receptionEvent = receptionChapter.events[receptionChapter.events.length - 1]

export function InvitationCard() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <LadiImage top={0} left={0.5} width={419} height={1027} src={plasterTexture} alt="" />
        <LadiImage top={0} left={0.3} width={420.6} height={993} src={invitationBg} alt="" />
        <LadiImage top={221} left={9.9} width={400} height={567} src={paperCard} alt="" />
        <LadiImage top={481} left={-88.8} width={250} height={358} src={flowerBranch} alt="" />

        <LadiGroup top={81} left={17.5} width={397} height={187}>
          <LadiImage top={108} left={317.6} width={79.5} height={79} src={pearl} alt="" />
          <LadiImage top={136.6} left={299.6} width={50} height={50} src={pearl} alt="" />
          <LadiImage top={0} left={0} width={37.9} height={37.6} src={pearl} alt="" />
        </LadiGroup>

        <LadiGroup top={53} left={114} width={200} height={113} className="flex items-center justify-center">
          <LadiImage top={0} left={0} width={200} height={113} src={logo} alt="" />
          <LadiHeadline
            top={17}
            left={21}
            width={72}
            fontFamily="var(--font-heading)"
            fontSize={60}
            color="var(--color-champagne)"
            textAlign="center"
          >
            {initial(groomName)}
          </LadiHeadline>
          <LadiHeadline
            top={17}
            left={98}
            width={72}
            fontFamily="var(--font-heading)"
            fontSize={60}
            color="var(--color-champagne)"
            textAlign="center"
          >
            {initial(brideName)}
          </LadiHeadline>
        </LadiGroup>

        <LadiGroup top={265} left={1.4} width={429} height={463}>
          <LadiGroup top={0} left={5.7} width={420} height={463}>
            <LadiHeadline
              top={0}
              left={43}
              width={334}
              fontFamily="var(--font-heading)"
              fontSize={15}
              lineHeight={1.6}
              color="#000"
              textAlign="center"
              textTransform="uppercase"
            >
              Trân trọng kính mời quý khách
              <br />
              đến dự buổi tiệc chung vui cùng gia đình chúng tôi tại
            </LadiHeadline>

            <LadiGroup top={66.5} left={0} width={420} height={99}>
              <LadiHeadline
                top={0}
                left={6}
                width={408}
                fontFamily="var(--font-script-flourish)"
                fontSize={28}
                lineHeight={1.6}
                color="var(--color-champagne)"
                textAlign="center"
              >
                {receptionEvent.venueName ?? receptionEvent.title}
              </LadiHeadline>
            </LadiGroup>

            <LadiGroup top={412} left={153} width={124} height={55} className="flex flex-col items-center">
              <a
                href={googleMapsDirectionsUrl(receptionEvent.fullAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-champagne"
              >
                <ChevronRight size={20} strokeWidth={1.5} style={{ transform: 'rotate(90deg)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 19,
                    lineHeight: 1.6,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  chỉ đường
                </span>
              </a>
            </LadiGroup>
          </LadiGroup>

          <LadiGroup
            top={209}
            left={50}
            width={321}
            height={51}
            className="flex items-center justify-between border-y border-black divide-x divide-black"
          >
            <span
              className="flex-1 text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 20, lineHeight: 1.6, color: '#000' }}
            >
              {receptionChapter.label}
            </span>
            <span
              className="flex-1 text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 20, lineHeight: 1.6, color: '#000' }}
            >
              {receptionChapter.date}
            </span>
            <span
              className="flex-1 text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 20, lineHeight: 1.6, color: '#000' }}
            >
              {receptionEvent.time}
            </span>
          </LadiGroup>

          <LadiGroup top={313} left={0} width={429} height={58}>
            <LadiHeadline
              top={0}
              left={0}
              width={192}
              fontFamily='"EB Garamond", serif'
              fontSize={15}
              lineHeight={1.3}
              color="#000"
              textAlign="right"
            >
              NHÀ TRAI
              <br />
              {groomFather}
              <br />
              {groomMother}
            </LadiHeadline>
            <LadiLine top={0} left={208.7} width={1} height={58} color="#000" />
            <LadiHeadline
              top={0}
              left={237.25}
              width={192}
              fontFamily='"EB Garamond", serif'
              fontSize={15}
              lineHeight={1.3}
              color="#000"
              textAlign="left"
            >
              NHÀ GÁI
              <br />
              {brideFather}
              <br />
              {brideMother}
            </LadiHeadline>
          </LadiGroup>

          <LadiHeadline
            top={175}
            left={2.3}
            width={408}
            fontFamily="var(--font-heading)"
            fontSize={16}
            lineHeight={1.2}
            letterSpacing={1}
            color="#000"
            textAlign="center"
          >
            {receptionEvent.addressLines.join(', ')}
          </LadiHeadline>
        </LadiGroup>
      </LadiCanvas>
    </section>
  )
}
