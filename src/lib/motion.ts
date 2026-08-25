import type { Variants } from 'framer-motion'

// Shared "expo-out" easing reads as a slow, deliberate settle rather than a
// mechanical linear/ease-in-out — the smooth, upscale feel used across every
// section's scroll-reveal animation.
export const EASE = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export function staggerContainer(staggerChildren = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}
