'use client'

import { useLayoutEffect, useRef, useState } from 'react'

const DESIGN_WIDTH = 420

/**
 * Renders children on a fixed 420px-wide design canvas, capped at that
 * width and centered — matching the reference site's actual desktop
 * behavior (a narrow mobile-width card centered on a plain background, not
 * scaled up edge-to-edge). Only shrinks (never grows past 420px) so it
 * still fits on viewports narrower than the design width.
 */
export function LadiCanvas({
  height,
  children,
  className,
}: {
  height: number
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = (width: number) => setScale(width / DESIGN_WIDTH)
    update(el.getBoundingClientRect().width)
    const observer = new ResizeObserver((entries) => update(entries[0].contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: DESIGN_WIDTH,
        margin: '0 auto',
        height: height * scale,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: DESIGN_WIDTH,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
