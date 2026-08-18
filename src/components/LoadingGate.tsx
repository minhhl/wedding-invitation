'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { groomName, brideName } from '@/lib/weddingData'

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/** A simple monogram gate — like a book cover you open before the first page. */
export function LoadingGate({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="loading-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2 font-heading text-4xl tracking-[0.35em] text-ink md:text-5xl"
            >
              <span>{initials(groomName)}</span>
              <span className="script-text text-2xl text-champagne md:text-3xl">&amp;</span>
              <span>{initials(brideName)}</span>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => setEntered(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1 }}
              className="group mt-14 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-text/70 transition-colors duration-500 hover:text-champagne"
            >
              Enter Our Story
              <span className="h-px w-8 bg-champagne transition-all duration-500 group-hover:w-12" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
