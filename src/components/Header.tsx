'use client'

import Image from 'next/image'
import { LadiCanvas, LadiImage } from '@/components/ladi'
import { headerImage } from '@/lib/images'
import { heroBg, ampersand } from '@/lib/decor'
import { groomName, brideName, weddingDateParts } from '@/lib/weddingData'

const SECTION_HEIGHT = 673

export function Header() {
  return (
    <section className="relative bg-white">
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
      </LadiCanvas>

      {/* The name/date caption sits outside the scaled canvas on purpose: it
          keeps a mobile-sized, capped-width text block at every viewport
          instead of blowing up to match the canvas's edge-to-edge photo
          scaling on wide screens. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[7%] flex justify-center px-6">
        <div className="flex max-w-xs flex-col items-center text-center text-white">
          <p
            className="font-heading uppercase leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', letterSpacing: '0.04em' }}
          >
            {groomName}
          </p>
          <span className="relative my-1 h-6 w-16">
            <Image src={ampersand} alt="&" fill className="object-contain" />
          </span>
          <p
            className="font-heading uppercase leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', letterSpacing: '0.04em' }}
          >
            {brideName}
          </p>
          <p
            className="mt-3 font-script"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', letterSpacing: '0.15em' }}
          >
            {weddingDateParts.day}.{weddingDateParts.month}.{weddingDateParts.year}
          </p>
        </div>
      </div>
    </section>
  )
}
