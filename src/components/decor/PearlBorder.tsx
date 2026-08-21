import { cn } from '@/lib/utils'

interface PearlSpec {
  x: number
  y: number
  size: number
  opacity: number
}

// Deterministic PRNG (mulberry32) — positions must be identical on server and
// client render, so this can't use Math.random().
function mulberry32(seed: number) {
  let state = seed
  return function random() {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildPerimeter(perEdge: number, seed: number): PearlSpec[] {
  const random = mulberry32(seed)
  const edges: Array<[number, number, number, number]> = [
    [3, 0, 97, 0],
    [100, 3, 100, 97],
    [97, 100, 3, 100],
    [0, 97, 0, 3],
  ]
  const pearls: PearlSpec[] = []
  for (const [x0, y0, x1, y1] of edges) {
    for (let i = 0; i < perEdge; i++) {
      const t = (i + 0.5) / perEdge
      pearls.push({
        x: x0 + (x1 - x0) * t + (random() - 0.5) * 1.1,
        y: y0 + (y1 - y0) * t + (random() - 0.5) * 1.1,
        size: 4.5 + random() * 4,
        opacity: 0.78 + random() * 0.22,
      })
    }
  }
  return pearls
}

const PEARLS = buildPerimeter(9, 1337)

// A string of ivory 3D beads traced around a card's edge — the CSS radial
// gradient fakes a specular highlight + core shadow per pearl so no bitmap
// asset is needed.
export function PearlBorder({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden>
      {PEARLS.map((pearl, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${pearl.x}%`,
            top: `${pearl.y}%`,
            width: pearl.size,
            height: pearl.size,
            opacity: pearl.opacity,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle at 32% 28%, #ffffff 0%, #fdf9f1 32%, #ecdfc4 68%, #c9b488 100%)',
            boxShadow: '0 1px 2px rgba(90, 70, 40, 0.35)',
          }}
        />
      ))}
    </div>
  )
}
