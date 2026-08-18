import type { MetadataRoute } from 'next'
import { groomName, brideName } from '@/lib/weddingData'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  const coupleName = `${groomName} & ${brideName}`

  return {
    name: `Thiệp Cưới ${coupleName}`,
    short_name: coupleName,
    description: `Trân trọng kính mời bạn đến tham dự lễ thành hôn của ${coupleName}`,
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f5',
    theme_color: '#c9a977',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
