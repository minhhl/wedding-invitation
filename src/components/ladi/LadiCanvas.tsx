'use client'

import { useLayoutEffect, useRef, useState } from 'react'

const DESIGN_WIDTH = 420

/**
 * Renders children on a fixed 420px-wide design canvas, then uniformly
 * scales the whole thing to fill the container width — edge to edge, on
 * every device — the same technique the Ladipage reference site uses (it
 * forces the viewport's `initial-scale` to `deviceWidth / 420`). We can't
 * touch the global viewport meta tag (that would also scale the unrelated
 * /guest-management admin), so this reproduces it locally with a CSS
 * transform instead, scoped to just the sections that use it.
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
      style={{ position: 'relative', width: '100%', height: height * scale, overflow: 'hidden' }}
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
