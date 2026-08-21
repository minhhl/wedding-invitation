export function SatinRibbonBow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 70" className={className} aria-hidden>
      <defs>
        <linearGradient id="ribbonSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ad8a5c" />
          <stop offset="35%" stopColor="#e6d3ab" />
          <stop offset="50%" stopColor="#c9a977" />
          <stop offset="65%" stopColor="#e6d3ab" />
          <stop offset="100%" stopColor="#9c7c50" />
        </linearGradient>
      </defs>
      <path d="M70 38 L52 68 L64 62 L70 50 Z" fill="url(#ribbonSheen)" />
      <path d="M70 38 L88 68 L76 62 L70 50 Z" fill="url(#ribbonSheen)" />
      <path
        d="M70 38 C 40 22, 20 30, 24 44 C 28 56, 52 50, 70 38 Z"
        fill="url(#ribbonSheen)"
        stroke="#8a6c42"
        strokeWidth={0.5}
      />
      <path
        d="M70 38 C 100 22, 120 30, 116 44 C 112 56, 88 50, 70 38 Z"
        fill="url(#ribbonSheen)"
        stroke="#8a6c42"
        strokeWidth={0.5}
      />
      <ellipse cx="70" cy="38" rx="9" ry="10" fill="url(#ribbonSheen)" stroke="#8a6c42" strokeWidth={0.6} />
    </svg>
  )
}
