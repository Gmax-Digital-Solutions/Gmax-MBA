import { MetadataRoute } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gmaxmba.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:    '/',
        disallow: ['/dashboard/', '/onboarding/', '/api/'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host:     APP_URL,
  }
}
