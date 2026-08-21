// Layered cream florals for corner ornaments — no stock asset matched the
// brief's "white rose / peony / ranunculus / baby's breath" list closely
// enough, so the blooms are built from overlapping petal ellipses instead.
// Petals use a shaded gradient (not a flat cream fill) and the whole cluster
// carries a soft drop shadow — otherwise the brief's near-white tones
// disappear against a white card background.

const TONE_STOPS: Record<string, string> = {
  '#FFFDF8': '#e9dcc0',
  '#F8F3EE': '#e2d3ae',
  '#F6EFE7': '#d9c39c',
}

function RoseBloom({
  x,
  y,
  r,
  fill,
  petals = 7,
}: {
  x: number
  y: number
  r: number
  fill: string
  petals?: number
}) {
  const gradientId = `petalShade-${fill.replace('#', '')}`
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor={TONE_STOPS[fill] ?? '#d9c39c'} />
        </radialGradient>
      </defs>
      {Array.from({ length: petals }, (_, i) => {
        const angle = (360 / petals) * i + r * 3
        return (
          <ellipse
            key={i}
            rx={r}
            ry={r * 0.52}
            fill={`url(#${gradientId})`}
            stroke="#c9a977"
            strokeOpacity={0.55}
            strokeWidth={0.7}
            transform={`rotate(${angle}) translate(${r * 0.55} 0)`}
          />
        )
      })}
      <circle r={r * 0.4} fill="#f3e9d8" stroke="#ad8a5c" strokeOpacity={0.6} strokeWidth={0.5} />
    </g>
  )
}

function BabyBreath({ x, y }: { x: number; y: number }) {
  const dots: Array<[number, number]> = [
    [0, 0],
    [6, -4],
    [10, 3],
    [-5, -6],
    [3, -10],
    [-8, 2],
  ]
  return (
    <g transform={`translate(${x} ${y})`}>
      {dots.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={dx}
          cy={dy}
          r={1.6}
          fill="#fffdf8"
          stroke="#c9a977"
          strokeOpacity={0.5}
          strokeWidth={0.5}
        />
      ))}
    </g>
  )
}

function EucalyptusLeaf({
  x,
  y,
  rotate,
  scale = 1,
}: {
  x: number
  y: number
  rotate: number
  scale?: number
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 C 6 -10, 6 -22, 0 -30 C -6 -22, -6 -10, 0 0 Z"
        fill="#b9c7ac"
        stroke="#8fa07d"
        strokeWidth={0.6}
      />
      <path d="M0 -2 L0 -27" stroke="#8fa07d" strokeWidth={0.5} />
    </g>
  )
}

export function FloralCorner({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 140 120"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden
    >
      <defs>
        <filter id="floralLift" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" floodColor="#8a7565" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#floralLift)">
        <EucalyptusLeaf x={20} y={95} rotate={-25} scale={1.1} />
        <EucalyptusLeaf x={38} y={100} rotate={5} scale={0.95} />
        <EucalyptusLeaf x={10} y={70} rotate={-55} scale={0.85} />
        <RoseBloom x={40} y={55} r={17} fill="#FFFDF8" />
        <RoseBloom x={68} y={30} r={13} fill="#F8F3EE" />
        <RoseBloom x={22} y={28} r={10} fill="#F6EFE7" />
        <BabyBreath x={80} y={65} />
        <BabyBreath x={15} y={50} />
      </g>
    </svg>
  )
}
