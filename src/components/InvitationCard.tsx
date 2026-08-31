'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline } from '@/components/ladi'
import { PlasterBackground } from '@/components/PlasterBackground'
import { googleMapsDirectionsUrl } from '@/lib/weddingSchedule'
import { groomName, brideName, initial } from '@/lib/weddingData'
import { invitationBg, paperCard, flowerBranch, pearl, logo } from '@/lib/decor'
import { EASE, fadeUp, staggerContainer } from '@/lib/motion'

const SECTION_HEIGHT = 935
const PAPER_CARD_HEIGHT = 565

export type InvitationSide = 'trai' | 'gai'

interface InvitationEventDetails {
  chapterLabel: string
  chapterDate: string
  lunarDate: string
  time: string
  title: string
  venueName?: string
  addressLines: string[]
  fullAddress: string
}

// Invitation-card-specific ceremony details, defined independently of
// weddingScheduleChapters (the WeddingTimeline's own data) so editing one
// can't accidentally affect the other. nhà trai's card points at the
// reception (Tiệc Cưới) in Hà Nội, held Sunday 20/09; nhà gái's card points
// at their own reception the day before, at the bride's family home in
// Bắc Ninh — hence the different chapter/lunar dates too.
const invitationEventBySide: Record<InvitationSide, InvitationEventDetails> = {
  trai: {
    chapterLabel: 'Chủ Nhật',
    chapterDate: '20/09/2026',
    lunarDate: 'Tức ngày 10/8 năm Bính Ngọ',
    time: '17:00',
    title: 'Tiệc Cưới',
    venueName: 'Trung Tâm Hội Nghị 133',
    addressLines: ['105 Đường Lý Sơn', 'Ngọc Thụy', 'Bồ Đề', 'Hà Nội'],
    fullAddress: 'Trung Tâm Hội Nghị 133, 105 Đường Lý Sơn, Ngọc Thụy, Bồ Đề, Hà Nội',
  },
  gai: {
    chapterLabel: 'Thứ Bảy',
    chapterDate: '19/09/2026',
    lunarDate: 'Tức ngày 9/8 năm Bính Ngọ',
    time: '16:00',
    title: 'Tiệc Cưới',
    venueName: 'Tư Gia Nhà Gái',
    addressLines: ['Thôn Hồng Tiến', 'Xã Hợp Thịnh', 'Tỉnh Bắc Ninh'],
    // GPS coordinates (21°20'42.2"N 105°57'07.2"E), not the text address —
    // more reliable for Google Maps directions to a rural/hamlet-level
    // location than a street address that may not geocode precisely.
    fullAddress: '21.345056,105.952',
  },
}

const GREETING_LINE: Record<InvitationSide, React.ReactNode> = {
  trai: (
    <>
      Đến dự bữa cơm thân mật chung vui <br /> cùng gia đình chúng tôi
    </>
  ),
  gai: (
    <>
      Đến dự bữa cơm thân mật chung vui <br /> cùng gia đình chúng tôi
    </>
  ),
}

export function InvitationCard({ side = 'trai' }: { side?: InvitationSide }) {
  const [guestName, setGuestName] = useState<string | null>(null)
  const receptionEvent = invitationEventBySide[side]

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get('name')
    if (name?.trim()) setGuestName(name.trim())
  }, [])

  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <PlasterBackground top={0} left={0.5} width={419} height={SECTION_HEIGHT} />

        <motion.div
          style={{ position: 'absolute', top: -40, left: 0.3, width: 420.6, height: 1000 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <LadiImage top={0} left={0} width={420.6} height={1000} src={invitationBg} alt="" objectFit="fill" priority />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 221, left: 9.9, width: 400, height: PAPER_CARD_HEIGHT }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <LadiImage top={0} left={0} width={400} height={PAPER_CARD_HEIGHT} src={paperCard} alt="" />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 479, left: -88.8, width: 250, height: 358 }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <LadiImage top={0} left={0} width={250} height={358} src={flowerBranch} alt="" />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 81, left: 17.5, width: 397, height: 187 }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
        >
          <LadiImage top={108} left={317.6} width={79.5} height={79} src={pearl} alt="" />
          <LadiImage top={136.6} left={299.6} width={50} height={50} src={pearl} alt="" />
          <LadiImage top={0} left={0} width={37.9} height={37.6} src={pearl} alt="" />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 53, left: 114, width: 200, height: 113 }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <LadiGroup top={0} left={0} width={200} height={113} className="flex items-center justify-center">
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
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 273, left: 1.4, width: 429, height: 480 }}
          variants={staggerContainer(0.15, 0.65)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
          <LadiGroup top={0} left={5.7} width={420} height={480}>
            <LadiGroup top={0} left={0} width={420} height={100}>
              <LadiHeadline
                top={0}
                left={0}
                width={420}
                fontFamily="var(--font-heading)"
                fontSize={18}
                letterSpacing={2}
                lineHeight={1.2}
                color="#000"
                textAlign="center"
                textTransform="uppercase"
              >
                Trân trọng kính mời
              </LadiHeadline>
              <LadiHeadline
                top={26}
                left={0}
                width={420}
                fontFamily="var(--font-heading)"
                fontSize={21}
                fontStyle="italic"
                lineHeight={1.4}
                color="var(--color-quote)"
                textAlign="center"
              >
                {guestName ?? 'Quý khách'}
              </LadiHeadline>
              <div
                style={{
                  position: 'absolute',
                  top: 49,
                  left: 110,
                  width: 200,
                  borderBottom: '1px dotted rgba(0,0,0,0.35)',
                }}
              />
              <LadiHeadline
                top={67}
                left={60}
                width={300}
                fontFamily="var(--font-heading)"
                fontSize={18}
                lineHeight={1.1}
                color="#000"
                textAlign="center"
              >
                {GREETING_LINE[side]}
              </LadiHeadline>
            </LadiGroup>

            <LadiGroup top={130} left={0} width={420} height={91}>
              <LadiHeadline
                top={0}
                left={35}
                width={350}
                fontFamily="var(--font-heading)"
                fontSize={16}
                letterSpacing={2}
                lineHeight={1.4}
                color="var(--color-quote)"
                textAlign="center"
                textTransform="uppercase"
              >
                Được tổ chức tại
              </LadiHeadline>
              <LadiHeadline
                top={28}
                left={35}
                width={350}
                fontFamily="var(--font-heading)"
                fontSize={27}
                fontStyle="italic"
                lineHeight={1.4}
                color="var(--color-champagne)"
                textAlign="center"
                fontWeight={600}
                textTransform="uppercase"
              >
                {receptionEvent.venueName ?? receptionEvent.title}
              </LadiHeadline>
            </LadiGroup>

            <LadiGroup top={411} left={141} width={124} height={55} className="flex flex-col items-center">
              <a
                href={googleMapsDirectionsUrl(receptionEvent.fullAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-champagne"
              >
                <MapPin size={21} strokeWidth={1.5} />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 20,
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
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <LadiGroup
            top={278}
            left={50}
            width={321}
            height={51}
            className="flex justify-between border-y border-champagne divide-x divide-champagne"
          >
            <span
              className="flex flex-1 items-center justify-center text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 20, letterSpacing: 0.5, lineHeight: 1, color: 'var(--color-ink)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}
            >
              {receptionEvent.chapterLabel}
            </span>
            <span
              className="flex flex-1 items-center justify-center text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 20, letterSpacing: 0.5, lineHeight: 1, color: 'var(--color-ink)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}
            >
              {receptionEvent.chapterDate}
            </span>
            <span
              className="flex flex-1 items-center justify-center text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 20, letterSpacing: 0.5, lineHeight: 1, color: 'var(--color-ink)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}
            >
              {receptionEvent.time}
            </span>
          </LadiGroup>
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <LadiHeadline
            top={340}
            left={0}
            width={420}
            fontFamily="var(--font-heading)"
            fontSize={18}
            lineHeight={1.6}
            color="var(--color-quote)"
            textAlign="center"
            fontStyle="italic"
          >
            {receptionEvent.lunarDate}
          </LadiHeadline>
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <LadiHeadline
            top={196}
            left={2.3}
            width={408}
            fontFamily="var(--font-heading)"
            fontSize={19}
            lineHeight={1.3}
            letterSpacing={0.5}
            color="#000"
            textAlign="center"
          >
            {receptionEvent.addressLines.join(', ')}
          </LadiHeadline>
          </motion.div>
        </motion.div>
      </LadiCanvas>
    </section>
  )
}
