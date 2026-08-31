'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Music2, Music3, Music4 } from 'lucide-react'

const NOTE_ICONS = [Music, Music2, Music3, Music4]

// Served from /public (not bundled via assets/, see src/lib/decor.ts) since
// an <audio src> needs a plain URL, not the StaticImageData object webpack's
// asset/resource loader gives image imports — so the static-export basePath
// has to be prefixed by hand, same as src/components/guest-management/InviteLinkGenerator.tsx.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const musicSrc = `${basePath}/music/JVKE-golden-hour.m4a`

const LOVE_LETTERS = ['L', 'O', 'V', 'E']

interface XPath {
  x0: number
  x1: number
  x2: number
}

interface FloatingLetter {
  letter: string
  icon: typeof NOTE_ICONS[number]
  letterPath: XPath
  iconPath: XPath
  delay: number
  duration: number
  size: number
}

const randomXPath = (spread: number): XPath => ({
  x0: (Math.random() - 0.5) * spread,
  x1: (Math.random() - 0.5) * spread * 1.5,
  x2: (Math.random() - 0.5) * spread,
})

// Re-rolled fresh each time playback starts (tied to the isPlaying dep below)
// — only ever runs client-side since it's gated on isPlaying, which starts
// false on the server, so there's no SSR/hydration mismatch from the
// randomness. Every letter shares the same duration and rises on a fixed
// per-index stagger so L, O, V, E always launch in that order, one at a
// time, on every loop. The note icon and its letter drift along their own,
// independently-randomized horizontal path rather than moving as one glued
// unit — only their vertical rise/fade stay in sync.
function randomizedLoveLetters(): FloatingLetter[] {
  const duration = 2
  const stagger = 0.45
  return LOVE_LETTERS.map((letter, i) => ({
    letter,
    icon: NOTE_ICONS[Math.floor(Math.random() * NOTE_ICONS.length)],
    letterPath: randomXPath(24),
    iconPath: randomXPath(24),
    delay: i * stagger,
    duration,
    size: 13 + Math.random() * 12,
  }))
}

/**
 * Floating background-music toggle, fixed to the bottom-right corner on
 * every page. Tries to autoplay the instant the page loads; most browsers
 * still block audio with sound before any user interaction, so this also
 * falls back to starting on the visitor's first click/touch/keydown anywhere
 * on the page — after either one fires, it's a plain play/pause toggle.
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const floatingLetters = useMemo(() => (isPlaying ? randomizedLoveLetters() : []), [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let started = false
    const tryAutoplay = () => {
      if (started) return
      audio
        .play()
        .then(() => {
          started = true
          setIsPlaying(true)
        })
        .catch(() => {
          // Blocked — leave it for the next attempt (interaction, or the
          // visitor starting it manually via the toggle button).
        })
    }

    tryAutoplay()

    const events: (keyof WindowEventMap)[] = ['click', 'touchstart', 'keydown']
    events.forEach((event) => window.addEventListener(event, tryAutoplay))
    return () => events.forEach((event) => window.removeEventListener(event, tryAutoplay))
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true))
    }
  }

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop />
      <div className="fixed bottom-5 right-5 z-50 flex items-center">
        {floatingLetters.length > 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {floatingLetters.map((item: FloatingLetter, i: number) => {
              const sharedMotion = {
                animate: {
                  opacity: [0, 1, 1, 0],
                  y: [0, -22, -40, -58],
                  scale: [0.6, 1, 1, 0.7],
                },
                transition: {
                  duration: item.duration,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: 'easeOut' as const,
                },
              }
              return (
                <span key={i} className="absolute flex items-center gap-0.5">
                  <motion.span
                    className="text-champagne"
                    initial={{ opacity: 0, y: 0, x: item.iconPath.x0, scale: 0.6 }}
                    animate={{ ...sharedMotion.animate, x: [item.iconPath.x0, item.iconPath.x1, item.iconPath.x2, item.iconPath.x0] }}
                    transition={sharedMotion.transition}
                  >
                    <item.icon size={item.size * 0.7} strokeWidth={2} />
                  </motion.span>
                  <motion.span
                    className="font-heading font-semibold uppercase text-champagne"
                    style={{ fontSize: item.size }}
                    initial={{ opacity: 0, y: 0, x: item.letterPath.x0, scale: 0.6 }}
                    animate={{ ...sharedMotion.animate, x: [item.letterPath.x0, item.letterPath.x1, item.letterPath.x2, item.letterPath.x0] }}
                    transition={sharedMotion.transition}
                  >
                    {item.letter}
                  </motion.span>
                </span>
              )
            })}
          </div>
        )}

        <motion.button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Tắt nhạc' : 'Phát nhạc'}
          aria-pressed={isPlaying}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-white shadow-lg"
          animate={
            isPlaying
              ? { scale: [1, 1.1, 1], boxShadow: ['0 0 0 0 rgba(203,157,69,0.5)', '0 0 0 10px rgba(203,157,69,0)', '0 0 0 0 rgba(203,157,69,0)'] }
              : { scale: 1 }
          }
          transition={isPlaying ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <motion.span
            className="flex items-center justify-center"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
          >
            <Music2 size={20} strokeWidth={1.75} />
          </motion.span>
        </motion.button>
      </div>
    </>
  )
}
