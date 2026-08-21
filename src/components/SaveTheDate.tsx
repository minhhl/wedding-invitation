'use client'

import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline, LadiLine } from '@/components/ladi'
import { saveTheDateImages } from '@/lib/images'
import { plasterTexture, dreamWordmark } from '@/lib/decor'
import { groomName, brideName, weddingDateParts } from '@/lib/weddingData'

const SECTION_HEIGHT = 982

const QUOTE_LINES = [
  'Some dreams are meant to last forever, just like true love.',
  'When two hearts stay faithful through every season,',
  'forever becomes more than a promise — it becomes reality.',
]

export function SaveTheDate() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <LadiImage top={0} left={0.6} width={420} height={982} src={plasterTexture} alt="" />

        <LadiImage top={0} left={11.6} width={195} height={293} src={saveTheDateImages[0]} alt={`${groomName} & ${brideName}`} priority />
        <LadiImage top={0} left={215.4} width={195} height={293} src={saveTheDateImages[1]} alt={`${groomName} & ${brideName}`} />
        <LadiImage top={301.4} left={11.6} width={195} height={293} src={saveTheDateImages[2]} alt={`${groomName} & ${brideName}`} />
        <LadiImage top={301.4} left={215.4} width={195} height={293} src={saveTheDateImages[3]} alt={`${groomName} & ${brideName}`} />

        {/* Center card, floating over where the four photos meet. */}
        <div
          style={{
            position: 'absolute',
            top: 101,
            left: 159.5,
            width: 103,
            height: 395,
            borderRadius: 5,
            backgroundColor: 'var(--color-offwhite)',
          }}
        />

        <LadiHeadline
          top={122}
          left={159}
          width={104}
          fontFamily="var(--font-heading)"
          fontSize={13}
          lineHeight={1.6}
          letterSpacing={2}
          color="#000"
          textAlign="center"
          textTransform="uppercase"
        >
          Save
          <br />
          the date
        </LadiHeadline>

        <div
          style={{
            position: 'absolute',
            top: 186,
            left: 172,
            width: 79,
            height: 199,
            borderRadius: 5,
            border: '1px solid var(--color-champagne)',
          }}
        />

        <LadiGroup top={179} left={158} width={106} height={222}>
          <LadiHeadline
            top={0}
            left={2}
            width={104}
            fontFamily="var(--font-heading)"
            fontSize={44}
            lineHeight={1.6}
            letterSpacing={3}
            color="var(--color-champagne)"
            textAlign="center"
          >
            {weddingDateParts.day}
          </LadiHeadline>
          <LadiLine top={62} left={14.5} width={78} height={1} color="var(--color-champagne)" />
          <LadiHeadline
            top={68.5}
            left={0}
            width={104}
            fontFamily="var(--font-heading)"
            fontSize={44}
            lineHeight={1.6}
            letterSpacing={3}
            color="var(--color-champagne)"
            textAlign="center"
          >
            {weddingDateParts.month}
          </LadiHeadline>
          <LadiLine top={131.5} left={13} width={78} height={1} color="var(--color-champagne)" />
          <LadiHeadline
            top={142}
            left={2}
            width={104}
            fontFamily="var(--font-heading)"
            fontSize={44}
            lineHeight={1.6}
            letterSpacing={3}
            color="var(--color-champagne)"
            textAlign="center"
          >
            {weddingDateParts.year.slice(2)}
          </LadiHeadline>
        </LadiGroup>

        <LadiHeadline
          top={410}
          left={159}
          width={104}
          fontFamily="var(--font-heading)"
          fontSize={13}
          lineHeight={1.6}
          letterSpacing={2}
          color="#000"
          textAlign="center"
          textTransform="uppercase"
        >
          {groomName}
          <br />
          &amp;
          <br />
          {brideName}
        </LadiHeadline>

        <LadiImage top={647} left={49.7} width={234} height={302} src={dreamWordmark} alt="Dream" />

        <LadiHeadline
          top={677}
          left={220}
          width={165}
          fontFamily="var(--font-heading)"
          fontSize={13}
          lineHeight={1.5}
          color="var(--color-quote)"
          textAlign="left"
          fontStyle="italic"
        >
          {QUOTE_LINES.map((line, i) => (
            <span key={line}>
              {line}
              {i < QUOTE_LINES.length - 1 && <br />}
            </span>
          ))}
        </LadiHeadline>
      </LadiCanvas>
    </section>
  )
}
