import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import { ogImage } from '@/lib/images'
import { SmoothScroll } from '@/components/SmoothScroll'
import { groomName, brideName } from '@/lib/weddingData'
import {
  arnoProLightDisplay,
  vipHastegi,
  bhnEcatherina,
  ghiocityItalic,
  openSans,
} from '@/lib/fonts'

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
  themeColor: '#CB9D45',
}

const fontVariables = [
  arnoProLightDisplay.variable,
  vipHastegi.variable,
  bhnEcatherina.variable,
  ghiocityItalic.variable,
  openSans.variable,
].join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={fontVariables}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
