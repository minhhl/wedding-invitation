export function WaxSeal({ className, initials }: { className?: string; initials: string }) {
  return (
    <svg viewBox="0 0 80 88" className={className} aria-hidden>
      <defs>
        <radialGradient id="waxGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#d9b378" />
          <stop offset="55%" stopColor="#ad8a5c" />
          <stop offset="100%" stopColor="#8a6c42" />
        </radialGradient>
      </defs>
      <path
        d="M40 4 C 58 4, 74 16, 75 34 C 76 46, 70 50, 71 58 C 72 68, 62 66, 58 72 C 52 80, 46 78, 40 82 C 34 78, 28 80, 22 72 C 18 66, 8 68, 9 58 C 10 50, 4 46, 5 34 C 6 16, 22 4, 40 4 Z"
        fill="url(#waxGradient)"
      />
      <circle cx="40" cy="38" r="26" fill="none" stroke="#f3e2bd" strokeOpacity="0.5" strokeWidth="1" />
      <text
        x="40"
        y="48"
        textAnchor="middle"
        fontSize="26"
        fontFamily="var(--font-script)"
        fill="#f6e9c9"
      >
        {initials}
      </text>
    </svg>
  )
}
