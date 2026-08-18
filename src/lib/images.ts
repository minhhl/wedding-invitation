// Real wedding photography, served from /public/photos/gallery.

const photo = (file: string) => `/photos/gallery/${file}`

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

// Wedding Timeline — faint corner background photo
export const timelineBackgroundImage = photo('HTC03199.jpg')

// Polaroid Collection — the site's photo album
export const polaroidCollectionImages = [
  { src: photo('HTC03983.jpg'), caption: 'Golden Hour' },
  { src: photo('HTC04025.jpg'), caption: 'Quiet Moments' },
  { src: photo('HTC04032.jpg'), caption: 'First Light' },
  { src: photo('HTC04050.jpg'), caption: 'Together' },
]

// Thank You footer — wide closing photo
export const footerImage = photo('HTC03937.jpg')
