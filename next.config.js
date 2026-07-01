/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {},
  serverExternalPackages: ['@prisma/client', 'bcryptjs', 'sharp'],
  async headers() {
    return [
      {
        // Security + SEO headers for all pages
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff'          },
          { key: 'X-Frame-Options',           value: 'DENY'             },
          { key: 'X-XSS-Protection',          value: '1; mode=block'    },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(ico|png|jpg|jpeg|svg|webp|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // OG image - shorter cache so updates propagate
        source: '/og-image.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
