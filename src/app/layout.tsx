import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gmaxmba.com'

export const viewport: Viewport = {
  width:        'device-width',
  initialScale:  1,
  maximumScale:  5,
  themeColor:   '#241e20',
}

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    default:  'Gmax MBA — Free Business School for Founders & Builders',
    template: '%s | Gmax MBA',
  },
  description:
    'A free, self-guided MBA program for developers, engineers, and solo founders. 30 minutes a day. Real business skills — strategy, marketing, sales, finance, and leadership — applied to your actual company.',

  keywords: [
    'free MBA', 'MBA for founders', 'business education for developers',
    'startup business skills', 'free business school', 'entrepreneur education',
    'solo founder MBA', 'business for engineers', 'free business course',
    'startup strategy', 'marketing for founders', 'financial intelligence',
    'leadership for founders', 'business fundamentals free',
    'Gmax MBA', 'Gmax Digital Solutions',
  ],

  authors:   [{ name: 'Gmax Digital Solutions', url: APP_URL }],
  creator:   'Gmax Digital Solutions',
  publisher: 'Gmax Digital Solutions',

  icons: {
    icon:     [{ url: '/favicon.ico', sizes: 'any' }],
    apple:    [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },

  manifest: '/site.webmanifest',

  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:          APP_URL,
    siteName:    'Gmax MBA',
    title:       'Gmax MBA — Free Business School for Founders & Builders',
    description: 'A free, self-guided MBA program for developers, engineers, and solo founders. 30 minutes a day. Strategy, marketing, sales, finance & leadership — applied to your real business.',
    images: [{
      url:    '/og-image.png',
      width:   1200,
      height:  630,
      alt:    'Gmax MBA — Free Business School for Founders & Builders',
    }],
  },

  twitter: {
    card:        'summary_large_image',
    site:        '@GmaxDigital',
    creator:     '@GmaxDigital',
    title:       'Gmax MBA — Free Business School for Founders & Builders',
    description: 'Free MBA-level business education for developers, engineers, and solo founders. 30 minutes a day. No paywalls ever.',
    images:      ['/og-image.png'],
  },

  robots: {
    index:        true,
    follow:       true,
    googleBot: {
      index:                  true,
      follow:                 true,
      'max-video-preview':   -1,
      'max-image-preview':   'large',
      'max-snippet':         -1,
    },
  },

  alternates: {
    canonical: APP_URL,
  },

  category: 'education',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#241e20] text-[#f0f0f0] antialiased" suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background:   '#2c2528',
                color:        '#f0f0f0',
                border:       '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                fontSize:     '13px',
              },
              success: { iconTheme: { primary: '#2ed8c3', secondary: '#241e20' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#241e20' } },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
