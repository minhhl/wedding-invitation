import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

// Only used by the in-app photo uploader (Guest Management → Ảnh cưới),
// which therefore only works when this app runs as a server (`npm run dev`/
// `start`) — this route can't exist on the static GitHub Pages export.
// Signs an upload token per ImageKit's client-side upload auth scheme:
// https://imagekit.io/docs/api-reference/upload-file/upload-file#authentication-parameters
export const dynamic = 'force-dynamic'

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  if (!privateKey) {
    return NextResponse.json({ error: 'IMAGEKIT_PRIVATE_KEY is not set' }, { status: 500 })
  }

  const token = crypto.randomUUID()
  const expire = Math.floor(Date.now() / 1000) + 5 * 60
  const signature = crypto.createHmac('sha1', privateKey).update(token + expire).digest('hex')

  return NextResponse.json({ token, expire, signature })
}
