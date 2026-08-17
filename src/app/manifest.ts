import type { MetadataRoute } from 'next'
import { groomName, brideName } from '@/lib/weddingData'

export default function manifest(): MetadataRoute.Manifest {
  const coupleName = `${groomName} & ${brideName}`

  return {
    name: `Thiệp Cưới ${coupleName}`,
    short_name: coupleName,
    description: `Trân trọng kính mời bạn đến tham dự lễ thành hôn của ${coupleName}`,
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f4ef',
    theme_color: '#3d3024',
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
