import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Great_Vibes, Montserrat, Playfair_Display } from 'next/font/google'
import '../styles/globals.css'
import { ogImage } from '@/lib/images'
import { SmoothScroll } from '@/components/SmoothScroll'
import { groomName, brideName } from '@/lib/weddingData'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  variable: '--next-cormorant',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--next-great-vibes',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  variable: '--next-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--next-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: `Thiệp Cưới ${groomName} & ${brideName}`,
  description: `Trân trọng kính mời bạn đến tham dự lễ thành hôn của ${groomName} & ${brideName}`,
  openGraph: {
    title: `Thiệp Cưới ${groomName} & ${brideName}`,
    description: `Trân trọng kính mời bạn đến tham dự lễ thành hôn của ${groomName} & ${brideName}`,
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c9a977',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${greatVibes.variable} ${montserrat.variable} ${playfair.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
