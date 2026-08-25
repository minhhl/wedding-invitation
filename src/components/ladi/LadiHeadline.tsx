import type { CSSProperties } from 'react'
import type { LadiBox } from './LadiGroup'

/** Positioned text block matching a reference-template HEADLINE element. */
export function LadiHeadline({
  top,
  left,
  width,
  fontFamily,
  fontSize,
  color,
  letterSpacing,
  lineHeight,
  textAlign = 'center',
  textTransform,
  fontStyle,
  fontWeight,
  className,
  children,
}: LadiBox & {
  fontFamily: string
  fontSize: number | string
  color: string
  letterSpacing?: number | string
  lineHeight?: number | string
  textAlign?: CSSProperties['textAlign']
  textTransform?: CSSProperties['textTransform']
  fontStyle?: CSSProperties['fontStyle']
  fontWeight?: CSSProperties['fontWeight']
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className} style={{ position: 'absolute', top, left, width }}>
      <p
        style={{
          margin: 0,
          fontFamily,
          fontSize,
          color,
          letterSpacing,
          lineHeight,
          textAlign,
          textTransform,
          fontStyle,
          fontWeight,
          wordBreak: 'break-word',
        }}
      >
        {children}
      </p>
    </div>
  )
}
