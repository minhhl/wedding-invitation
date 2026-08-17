import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import '../styles/globals.css'
import { ogImage } from '@/lib/images'
import { SmoothScroll } from '@/components/SmoothScroll'
import { groomName, brideName } from '@/lib/weddingData'

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--next-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  variable: '--next-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--next-inter',
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
  themeColor: '#3d3024',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
