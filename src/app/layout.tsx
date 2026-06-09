import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gmaxmba.com'

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 5, themeColor: '#171214',
}

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: 'Gmax MBA — Free Business School for Founders & Builders', template: '%s | Gmax MBA' },
  description: 'A free, self-guided MBA program for developers, engineers, and solo founders. 30 minutes a day.',
  keywords: ['free MBA', 'MBA for founders', 'business education for developers', 'startup business skills', 'free business school'],
  authors: [{ name: 'Gmax Digital Solutions', url: APP_URL }],
  icons: { icon: [{ url: '/favicon.ico' }], apple: [{ url: '/icon-192.png' }] },
  manifest: '/site.webmanifest',
  openGraph: { type: 'website', url: APP_URL, siteName: 'Gmax MBA', title: 'Gmax MBA', description: 'Free MBA for founders and builders.', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
  robots: { index: true, follow: true },
  category: 'education',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-text-primary font-body-md overflow-x-hidden antialiased">
        <Providers>
          {children}
          <Toaster position="bottom-right" toastOptions={{
            style: { background: '#2f282a', color: '#f0f0f0', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '13px', fontFamily: 'Outfit, sans-serif' },
            success: { iconTheme: { primary: '#2ed8c3', secondary: '#003731' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#1a0000' } },
          }} />
        </Providers>
      </body>
    </html>
  )
}
