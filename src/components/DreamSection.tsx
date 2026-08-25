'use client'

import { Heart } from 'lucide-react'
import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline, LadiLine } from '@/components/ladi'
import { PlasterBackground } from '@/components/PlasterBackground'
import { dreamPolaroidImage } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'
import { fabricDrape, photoFrame, pearl } from '@/lib/decor'

const SECTION_HEIGHT = 759

export function DreamSection() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <PlasterBackground top={0} left={0} width={420} height={SECTION_HEIGHT} />
        <LadiImage top={-37} left={-14} width={433} height={796} src={fabricDrape} alt="" objectFit="fill" scale={1.025} />

        <LadiGroup top={37} left={55} width={372} height={422}>
          <LadiImage top={22} left={38} width={267} height={262} src={dreamPolaroidImage} alt={`${groomName} & ${brideName}`} />
          <LadiImage top={0} left={0} width={372} height={422} src={photoFrame} alt="" />
          <LadiHeadline
            top={307}
            left={23}
            width={302}
            fontFamily="var(--font-heading)"
            fontSize={30}
            lineHeight={1.2}
            letterSpacing={7}
            color="var(--color-champagne)"
            textAlign="center"
            textTransform="uppercase"
          >
            Love forever
          </LadiHeadline>
        </LadiGroup>

        <LadiImage top={298} left={349} width={80} height={79} src={pearl} alt="" />
        <LadiImage top={138} left={24} width={38} height={38} src={pearl} alt="" />
        <LadiImage top={392} left={5} width={50} height={50} src={pearl} alt="" />

        <LadiLine top={399} left={210} width={1} height={24} color="var(--color-champagne)" />
        <LadiLine top={473} left={210} width={1} height={24} color="var(--color-champagne)" />
        <LadiLine top={545} left={210} width={1} height={24} color="var(--color-champagne)" />
        <div style={{ position: 'absolute', top: 615, left: 203, color: 'var(--color-champagne)' }}>
          <Heart size={14} strokeWidth={1.5} fill="var(--color-champagne)" />
        </div>

        <LadiHeadline
          top={431}
          left={52}
          width={302}
          fontFamily="var(--font-heading)"
          fontSize={24}
          lineHeight={1.2}
          color="var(--color-quote)"
          textAlign="center"
        >
          Two hearts
        </LadiHeadline>
        <LadiHeadline
          top={505}
          left={52}
          width={302}
          fontFamily="var(--font-heading)"
          fontSize={24}
          lineHeight={1.2}
          color="var(--color-quote)"
          textAlign="center"
        >
          One journey
        </LadiHeadline>
        <LadiHeadline
          top={577}
          left={52}
          width={302}
          fontFamily="var(--font-heading)"
          fontSize={24}
          lineHeight={1.2}
          color="var(--color-quote)"
          textAlign="center"
        >
          A lifetime of love
        </LadiHeadline>
      </LadiCanvas>
    </section>
  )
}
