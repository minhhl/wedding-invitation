// Real wedding photography, served from /public/photos/gallery.

// next/image's basePath auto-prefixing doesn't apply once `images.unoptimized`
// is on (required for the GitHub Pages static export), so it's added by hand
// here — matches the basePath computed in next.config.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const photo = (file: string) => `${basePath}/photos/gallery/${file}`

// Header — full-bleed cover photo
export const headerImage = photo('HTC03433.jpg')

export const ogImage = headerImage

// Save The Date — 4-photo grid with an overlaid date card
export const saveTheDateImages = [
  photo('HTC02750.jpg'),
  photo('HTC02904.jpg'),
  photo('HTC03057.jpg'),
  photo('HTC03120.jpg'),
]

// Invitation Card — faint corner background photo
export const invitationBackgroundImage = photo('HTC03199.jpg')

// Dream section — small polaroid-style photo beside the quote
export const dreamPolaroidImage = photo('HTC02889.jpg')

// Endless Romance gallery — two-up row followed by a 2x2 grid
export const endlessRomanceImages = [
  photo('HTC03983.jpg'),
  photo('HTC04025.jpg'),
  photo('HTC04032.jpg'),
  photo('HTC04050.jpg'),
  photo('HTC04088.jpg'),
  photo('HTC04093.jpg'),
]

// Thank You footer — wide closing photo
export const footerImage = photo('HTC03937.jpg')
