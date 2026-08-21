export interface LadiBox {
  top: number
  left: number
  width?: number
  height?: number
}

/**
 * A positioned container matching the reference template's GROUP elements.
 * Children's own top/left are relative to THIS box, not the page — mirrors
 * the source site's own nesting so the extracted per-element coordinates
 * (only ever meaningful relative to their immediate parent) stay correct
 * without needing to be flattened into absolute page coordinates by hand.
 */
export function LadiGroup({
  top,
  left,
  width,
  height,
  children,
  className,
}: LadiBox & { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ position: 'absolute', top, left, width, height }}>
      {children}
    </div>
  )
}
