import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#faf8f5',
          color: '#c9a977',
          fontSize: 96,
          fontStyle: 'italic',
        }}
      >
        &
      </div>
    ),
    { ...size }
  )
}
