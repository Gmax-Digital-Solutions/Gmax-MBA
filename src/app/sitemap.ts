import { MetadataRoute } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gmaxmba.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: APP_URL,                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${APP_URL}/curriculum`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${APP_URL}/auth/signup`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${APP_URL}/auth/signin`,     lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]
}
