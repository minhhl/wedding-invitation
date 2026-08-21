// The 4 real custom fonts extracted from the Ladipage reference template
// (nawngs.com/naunhatmau), matched from the obfuscated font-family names in
// its stylesheet to the .otf files it actually loads from its CDN.
import localFont from 'next/font/local'
import { Open_Sans } from 'next/font/google'

// Workhorse display serif — used for most headings/labels across every section.
export const arnoProLightDisplay = localFont({
  src: '../../assets/fonts/arnopro-lightdisplay-20260602100300-eemuc.otf',
  variable: '--font-arno-pro',
  display: 'swap',
})

// Script font used once, for the hero date ("23.10.2026" in the reference).
export const vipHastegi = localFont({
  src: '../../assets/fonts/1ftv-vip-hastegi-20260601031950-f5ogd.otf',
  variable: '--font-vip-hastegi',
  display: 'swap',
})

// Medium-weight serif used for the love-story subheadings.
export const bhnEcatherina = localFont({
  src: '../../assets/fonts/bhn-bp-ecatherina-medium-1-20260507120244-5bemf.otf',
  variable: '--font-ecatherina',
  display: 'swap',
})

// Italic script used for the venue name.
export const ghiocityItalic = localFont({
  src: '../../assets/fonts/ghiocityanddhisthes-italic-20260623105043-2bpp3.otf',
  variable: '--font-ghiocity',
  display: 'swap',
})

// Script font from the "tonewhitenude" reference — used for the couple's
// names on the bride-side invitation card.
export const janeLotus = localFont({
  src: '../../assets/fonts/svn-janelotus-20260728033147-8ofpf.otf',
  variable: '--font-janelotus',
  display: 'swap',
})

// Body copy — the reference's global `body { font-family: "Open Sans" }`.
export const openSans = Open_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-open-sans',
  display: 'swap',
})
