import type { LadiBox } from './LadiGroup'

/** Thin decorative divider matching a reference-template LINE element. */
export function LadiLine({
  top,
  left,
  width,
  height = 1,
  color,
  className,
}: LadiBox & { color: string; className?: string }) {
  return (
    <div
      className={className}
      style={{ position: 'absolute', top, left, width, height, backgroundColor: color }}
    />
  )
}
