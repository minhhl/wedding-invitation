'use client'

import { LadiCanvas, LadiGroup, LadiImage, LadiHeadline } from '@/components/ladi'
import { weddingScheduleChapters } from '@/lib/weddingSchedule'
import { groomName, brideName } from '@/lib/weddingData'
import { timelinePhoto } from '@/lib/images'
import {
  timelineWordmark,
  dresscode,
  pearl,
  iconCar,
  iconFood,
  iconDance,
  ringsPair,
  plasterTexture,
} from '@/lib/decor'
import type { ScheduleEvent } from '@/lib/weddingSchedule'

const SECTION_HEIGHT = 859

const [dayOne, dayTwo] = weddingScheduleChapters
const rows: { icon: string; iconSize: { w: number; h: number }; event: ScheduleEvent }[] = [
  { icon: iconCar, iconSize: { w: 55, h: 50 }, event: dayOne.events[0] },
  { icon: ringsPair, iconSize: { w: 77, h: 50 }, event: dayTwo.events[0] },
  { icon: iconFood, iconSize: { w: 63, h: 45 }, event: dayOne.events[1] },
  { icon: iconDance, iconSize: { w: 56, h: 71 }, event: dayTwo.events[1] },
]

const rowTops = [0, 106.45, 225.7, 330.25]
const dresscodeColors = ['#897153', '#c7a881', '#e6e1d4', '#ffffff']

function timeLabel(time: string) {
  return time.replace(':', 'h')
}

export function WeddingTimeline() {
  return (
    <section className="relative bg-white">
      <LadiCanvas height={SECTION_HEIGHT}>
        <LadiImage top={1} left={0.4} width={420} height={836} src={plasterTexture} alt="" />

        <LadiGroup top={5} left={0} width={430} height={566}>
          <LadiImage top={0} left={15.5} width={387} height={101} src={timelineWordmark} alt="Timeline" />

          <div
            style={{
              position: 'absolute',
              top: 109.7,
              left: 266.6,
              width: 153,
              height: 456,
              backgroundColor: '#e6e1d4',
            }}
          />

          <div style={{ position: 'absolute', top: 109.7, left: 0, width: 267, height: 456, overflow: 'hidden' }}>
            <LadiImage top={0} left={0} width={266} height={456} src={timelinePhoto} alt={`${groomName} & ${brideName}`} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          </div>

          <LadiGroup top={137} left={173.5} width={256} height={401}>
            {rows.map((row, i) => (
              <LadiGroup key={row.event.title} top={rowTops[i]} left={0} width={250} height={71}>
                <LadiImage
                  top={(71 - row.iconSize.h) / 2}
                  left={0}
                  width={row.iconSize.w}
                  height={row.iconSize.h}
                  src={row.icon}
                  alt=""
                />
                <LadiImage
                  top={(71 - 30) / 2 + 6}
                  left={row.iconSize.w - 6}
                  width={30}
                  height={30}
                  src={pearl}
                  alt=""
                />
                <LadiHeadline
                  top={12}
                  left={row.iconSize.w + 44}
                  width={137}
                  fontFamily="var(--font-heading)"
                  fontSize={20}
                  letterSpacing={2}
                  color="#3d3636"
                  textAlign="left"
                >
                  {timeLabel(row.event.time)}
                </LadiHeadline>
                <LadiHeadline
                  top={42}
                  left={row.iconSize.w + 44}
                  width={137}
                  fontFamily="var(--font-heading)"
                  fontSize={16}
                  color="var(--color-quote)"
                  textAlign="left"
                >
                  {row.event.title.toLowerCase()}
                </LadiHeadline>
              </LadiGroup>
            ))}
          </LadiGroup>
        </LadiGroup>

        <LadiImage top={623} left={51} width={330} height={92} src={dresscode} alt="Dresscode" />
        <LadiGroup top={737} left={81} width={256} height={55}>
          {dresscodeColors.map((color, i) => (
            <div
              key={color}
              style={{
                position: 'absolute',
                top: 0,
                left: i * 67.7,
                width: 55,
                height: 55,
                borderRadius: '50%',
                backgroundColor: color,
                border: color === '#ffffff' ? '1px solid #e6e1d4' : undefined,
              }}
            />
          ))}
        </LadiGroup>
      </LadiCanvas>
    </section>
  )
}
