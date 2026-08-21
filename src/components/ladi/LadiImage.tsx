import Image from 'next/image'
import type { LadiBox } from './LadiGroup'

/**
 * Positioned image matching a reference-template IMAGE element. Defaults to
 * `object-position: 0% 0%` (top-left) because that's the source stylesheet's
 * own default for `.ladi-image-background` (`background-position: left top`)
 * — several images there are cropped larger than their box and anchored top
 * left, not centered.
 */
export function LadiImage({
  top,
  left,
  width,
  height,
  src,
  alt = '',
  className,
  priority,
  objectPosition = '0% 0%',
  sizes,
}: LadiBox & {
  src: string
  alt?: string
  className?: string
  priority?: boolean
  objectPosition?: string
  sizes?: string
}) {
  return (
    <div className={className} style={{ position: 'absolute', top, left, width, height, overflow: 'hidden' }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? `${width}px`}
        style={{ objectFit: 'cover', objectPosition }}
      />
    </div>
  )
}
