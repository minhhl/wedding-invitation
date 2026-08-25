'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline, LadiLine } from '@/components/ladi'
import { PlasterBackground } from '@/components/PlasterBackground'
import { weddingScheduleChapters, googleMapsDirectionsUrl } from '@/lib/weddingSchedule'
import {
  groomName,
  brideName,
  groomFather,
  groomMother,
  brideFather,
  brideMother,
  lunarDateLabelSunday,
  initial,
} from '@/lib/weddingData'
import { invitationBg, paperCard, flowerBranch, pearl, logo } from '@/lib/decor'
import { EASE, fadeUp, staggerContainer } from '@/lib/motion'

const SECTION_HEIGHT = 1027

// The reception is the event guests actually need directions/timing for.
const receptionChapter = weddingScheduleChapters[weddingScheduleChapters.length - 1]
const receptionEvent = receptionChapter.events[receptionChapter.events.length - 1]

export function InvitationCard() {
  const [guestName, setGuestName] = useState<string | null>(null)

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get('name')
    if (name?.trim()) setGuestName(name.trim())
  }, [])

  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <PlasterBackground top={0} left={0.5} width={419} height={1027} />

        <motion.div
          style={{ position: 'absolute', top: -40, left: 0.3, width: 420.6, height: 993 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <LadiImage top={0} left={0} width={420.6} height={993} src={invitationBg} alt="" objectFit="fill" />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 221, left: 9.9, width: 400, height: 567 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <LadiImage top={0} left={0} width={400} height={567} src={paperCard} alt="" />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: 481, left: -88.8, width: 250, height: 358 }}
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
          style={{ position: 'absolute', top: 273, left: 1.4, width: 429, height: 463 }}
          variants={staggerContainer(0.15, 0.65)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
          <LadiGroup top={0} left={5.7} width={420} height={463}>
            <LadiGroup top={0} left={0} width={420} height={100}>
              <LadiHeadline
                top={0}
                left={0}
                width={420}
                fontFamily="var(--font-heading)"
                fontSize={15}
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
                fontSize={18}
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
                left={95}
                width={230}
                fontFamily="var(--font-heading)"
                fontSize={15}
                lineHeight={1.1}
                color="#000"
                textAlign="center"
              >
                Đến dự bữa cơm thân mật chung <br /> vui cùng gia đình chúng tôi
              </LadiHeadline>
            </LadiGroup>

            <LadiGroup top={118} left={0} width={420} height={99}>
              <LadiHeadline
                top={0}
                left={35}
                width={350}
                fontFamily="var(--font-heading)"
                fontSize={20}
                fontStyle="italic"
                lineHeight={1.4}
                color="var(--color-champagne)"
                textAlign="center"
                textTransform="uppercase"
              >
                {receptionEvent.venueName ?? receptionEvent.title}
              </LadiHeadline>
            </LadiGroup>

            <LadiGroup top={409} left={141} width={124} height={55} className="flex flex-col items-center">
              <a
                href={googleMapsDirectionsUrl(receptionEvent.fullAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-champagne"
              >
                <MapPin size={20} strokeWidth={1.5} />
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
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
          <LadiGroup
            top={205}
            left={50}
            width={321}
            height={51}
            className="flex justify-between border-y border-champagne divide-x divide-champagne"
          >
            <span
              className="flex flex-1 items-center justify-center text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 19, letterSpacing: 0.5, lineHeight: 1, color: 'var(--color-ink)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}
            >
              {receptionChapter.label}
            </span>
            <span
              className="flex flex-1 items-center justify-center text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 19, letterSpacing: 0.5, lineHeight: 1, color: 'var(--color-ink)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}
            >
              {receptionChapter.date}
            </span>
            <span
              className="flex flex-1 items-center justify-center text-center"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 19, letterSpacing: 0.5, lineHeight: 1, color: 'var(--color-ink)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}
            >
              {receptionEvent.time}
            </span>
          </LadiGroup>
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
          <LadiHeadline
            top={270}
            left={0}
            width={420}
            fontFamily="var(--font-heading)"
            fontSize={13}
            lineHeight={1.6}
            color="var(--color-quote)"
            textAlign="center"
            fontStyle="italic"
          >
            {lunarDateLabelSunday}
          </LadiHeadline>
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
          <LadiGroup top={311} left={0} width={429} height={80}>
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
              <br />
              {groomMother}
            </LadiHeadline>
            <LadiLine top={0} left={208.7} width={1} height={80} color="#000" />
            <LadiHeadline
              top={0}
              left={225}
              width={175}
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
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: 'absolute', inset: 0 }}>
          <LadiHeadline
            top={162}
            left={2.3}
            width={408}
            fontFamily="var(--font-heading)"
            fontSize={18}
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
