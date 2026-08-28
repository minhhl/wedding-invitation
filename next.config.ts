import type { NextConfig } from 'next'

// Set only by the GitHub Pages workflow (.github/workflows/deploy.yml), which
// also strips src/app/api before building — route handlers can't run as
// static files. Everything else (login, Guest Management, RSVP) talks
// straight to Supabase from the browser, so it builds statically as-is.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'
// Single source of truth for the GitHub Pages subpath — also read directly
// by src/lib/images.ts, since next/image's basePath auto-prefixing doesn't
// apply to plain <img> src once `images.unoptimized` is on (required for
// static export), so local asset paths have to be prefixed by hand.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: 'export' as const, basePath } : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

export default nextConfig
