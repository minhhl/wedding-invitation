import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/wedding-invitation',
  images: {
    unoptimized: true,
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
