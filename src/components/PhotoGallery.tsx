'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { galleryImages } from '@/lib/images'

export function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === null ? prev : (prev + 1) % galleryImages.length))
  }

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? prev : (prev - 1 + galleryImages.length) % galleryImages.length
    )
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const swipeThreshold = 50
    if (deltaX > swipeThreshold) handlePrev()
    else if (deltaX < -swipeThreshold) handleNext()
    touchStartX.current = null
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="gallery" className="relative py-20 bg-wedding-beige/50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subtle-text mb-4">Khoảnh Khắc</p>
          <h2 className="heading-2 text-wedding-brown">Album Ảnh</h2>
        </motion.div>

        {/* Gallery masonry */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              role="button"
              tabIndex={0}
              aria-label={`Xem ảnh: ${image.title}`}
              className="group mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-wedding-gold"
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedIndex(index)
                }
              }}
            >
              <div
                className={`relative bg-wedding-ivory overflow-hidden rounded-lg ${
                  index % 3 === 0 ? 'aspect-[3/4]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wedding-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-sans font-semibold">{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh toàn màn hình"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedIndex(null)}
                aria-label="Đóng"
                className="absolute -top-12 right-0 text-white hover:text-wedding-gold transition-colors duration-300 z-10"
              >
                <X size={32} />
              </button>

              {/* Image container */}
              <div className="relative h-96 md:h-[500px] w-full rounded-lg overflow-hidden">
                <Image
                  src={galleryImages[selectedIndex].src}
                  alt={galleryImages[selectedIndex].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Navigation buttons */}
              <button
                onClick={handlePrev}
                aria-label="Ảnh trước"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-wedding-gold transition-colors duration-300 z-20"
              >
                <ChevronLeft size={40} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Ảnh tiếp theo"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-wedding-gold transition-colors duration-300 z-20"
              >
                <ChevronRight size={40} />
              </button>

              {/* Image info */}
              <div className="text-center mt-4">
                <p className="text-white font-sans">
                  {selectedIndex + 1} / {galleryImages.length}
                </p>
                {galleryImages[selectedIndex].title && (
                  <p className="text-wedding-gold font-playfair text-lg mt-2">
                    {galleryImages[selectedIndex].title}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
