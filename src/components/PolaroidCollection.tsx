'use client'

import { LadiCanvas, LadiImage } from '@/components/ladi'
import { endlessRomanceImages } from '@/lib/images'
import { groomName, brideName } from '@/lib/weddingData'
import { plasterTexture, ornamentQuoteB } from '@/lib/decor'

const SECTION_HEIGHT = 1237
const [wide, left1, right1, right2, left2, right3] = endlessRomanceImages

export function PolaroidCollection() {
  return (
    <section className="relative bg-background">
      <LadiCanvas height={SECTION_HEIGHT}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#e6e1d4' }} />
        <LadiImage top={-24} left={0.4} width={420} height={972} src={plasterTexture} alt="" />

        <LadiImage top={12} left={14} width={393} height={410} src={wide} alt={`${groomName} & ${brideName}`} priority />
        <LadiImage top={428} left={14} width={393} height={128} src={ornamentQuoteB} alt="" />

        <LadiImage top={528} left={13.8} width={228} height={398.5} src={left1} alt={`${groomName} & ${brideName}`} />
        <LadiImage top={528} left={248.8} width={158} height={194} src={right1} alt={`${groomName} & ${brideName}`} />
        <LadiImage top={728} left={248.8} width={158} height={198.5} src={right2} alt={`${groomName} & ${brideName}`} />
        <LadiImage top={933} left={13.8} width={193} height={245} src={left2} alt={`${groomName} & ${brideName}`} />
        <LadiImage top={933} left={213.8} width={193} height={245} src={right3} alt={`${groomName} & ${brideName}`} />
      </LadiCanvas>
    </section>
  )
}
