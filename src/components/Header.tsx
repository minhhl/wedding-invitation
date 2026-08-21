'use client'

import Image from 'next/image'
import { LadiCanvas, LadiImage, LadiHeadline } from '@/components/ladi'
import { headerImage } from '@/lib/images'
import { heroBg, ampersand } from '@/lib/decor'
import { groomName, brideName, weddingDateParts } from '@/lib/weddingData'

const SECTION_HEIGHT = 673

export function Header() {
  return (
    <section className="relative bg-ink">
      <LadiCanvas height={SECTION_HEIGHT}>
        {/* Satin texture base — the real photo covers almost all of it, this
            shows only at the sliver of a fringe (matches the reference site,
            which layers a texture fallback underneath the cover photo). */}
        <LadiImage top={-5} left={0} width={420} height={678} src={heroBg} alt="" />

        <div style={{ position: 'absolute', top: -5, left: 0, width: 420, height: 678, overflow: 'hidden' }}>
          <Image
            src={headerImage}
            alt={`${groomName} & ${brideName}`}
            fill
            priority
            sizes="420px"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>

        {/* Bottom gradient for text legibility over the photo. */}
        <div
          style={{
            position: 'absolute',
            top: 436.6,
            left: 0,
            width: 419.6,
            height: 236,
            background: 'linear-gradient(rgba(253,251,251,0) 0%, rgba(0,0,0,0.53) 100%)',
          }}
        />

        {/* Names stacked and centered (rather than the source's fixed
            side-by-side boxes) since the real names run longer than the
            template's short placeholder names and would otherwise wrap and
            overlap in a narrow fixed-width box. */}
        <LadiHeadline
          top={493}
          left={10}
          width={400}
          fontFamily="var(--font-heading)"
          fontSize={32}
          lineHeight={1.3}
          color="var(--color-offwhite)"
          textTransform="uppercase"
          textAlign="center"
        >
          {groomName}
        </LadiHeadline>
        <LadiImage top={542} left={175} width={70} height={36} src={ampersand} alt="" />
        <LadiHeadline
          top={577}
          left={10}
          width={400}
          fontFamily="var(--font-heading)"
          fontSize={32}
          lineHeight={1.3}
          color="var(--color-offwhite)"
          textTransform="uppercase"
          textAlign="center"
        >
          {brideName}
        </LadiHeadline>

        <LadiHeadline
          top={627}
          left={121}
          width={181}
          fontFamily="var(--font-script)"
          fontSize={28}
          color="var(--color-offwhite)"
          letterSpacing={5}
          textAlign="center"
        >
          {weddingDateParts.day}.{weddingDateParts.month}.{weddingDateParts.year}
        </LadiHeadline>
      </LadiCanvas>
    </section>
  )
}
