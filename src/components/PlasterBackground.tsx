import type { LadiBox } from '@/components/ladi'
import { plasterTexture } from '@/lib/decor'

// Natural image is 862×1300; tiling at the canvas's own 420px design width
// keeps the paper grain the same apparent size in every section instead of
// each section's object-fit:cover stretching/cropping it to a different zoom.
const TILE_WIDTH = 420

/**
 * Paper-grain backdrop, repeated vertically at a fixed scale so the texture
 * reads as one continuous sheet from section to section instead of being
 * blown up differently to fill whatever height each section happens to be.
 */
export function PlasterBackground({
  top = 0,
  left = 0,
  width,
  height,
  className,
}: Partial<LadiBox> & { className?: string }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        backgroundImage: `url(${plasterTexture})`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${TILE_WIDTH}px auto`,
        backgroundPosition: 'top left',
      }}
    />
  )
}
