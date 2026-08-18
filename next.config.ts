import type { NextConfig } from 'next'

// Set only by the GitHub Pages workflow (.github/workflows/deploy.yml), which
// also strips src/app/api, src/app/guest-management, src/app/login, and
// src/proxy.ts before building — none of those can run as static files.
// Local `npm run dev` / `npm run build` never set this, so the full app
// (login, Guest Management, RSVP) keeps working as a normal Node.js server.
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
  // xlsx's package.json "browser" field otherwise gets picked up when
  // bundling the /api/guests route, which strips its Node `fs` access.
  serverExternalPackages: ['xlsx'],
}

export default nextConfig
