// Real wedding photography, served from ImageKit so photos are resized,
// compressed, and format-converted on the fly — the GitHub Pages static
// export has no server to do that itself (`images.unoptimized` is on
// there), so serving pre-transformed URLs is what actually saves bytes.
import { buildSrc } from '@imagekit/javascript'

const urlEndpoint =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/minhngocwd'

// None of these render wider than the 420px design canvas (see LadiCanvas),
// so one width comfortably covers every usage at retina density.
const photo = (file: string) =>
  buildSrc({
    urlEndpoint,
    src: `/gallery/${file}`,
    transformation: [{ width: 900, quality: 80, format: 'auto' }],
  })

// Header — full-bleed cover photo
export const headerImage = photo('HTC03975.jpg')

export const ogImage = headerImage

// Save The Date — 4-photo grid with an overlaid date card
export const saveTheDateImages = [
  photo('HTC04181.jpg'),
  photo('HTC04088.jpg'),
  photo('HTC04348.jpg'),
  photo('HTC04025.jpg'),
]

// Invitation Card — faint corner background photo
export const invitationBackgroundImage = photo('HTC03983.jpg')

// Dream section — small polaroid-style photo beside the quote
export const dreamPolaroidImage = photo('HTC03937.jpg')

// Wedding-day timeline — tall photo beside the schedule list
export const timelinePhoto = photo('HTC04093.jpg')

// Endless Romance gallery — wide photo plus a two-up row
export const endlessRomanceImages = [
  photo('HTC03975.jpg'),
  photo('HTC04032.jpg'),
  photo('HTC04032.jpg'),
  photo('HTC03983.jpg'),
]

// Thank You footer — wide closing photo
export const footerImage = photo('HTC04348.jpg')
