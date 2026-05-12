import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Gmax MBA — Free Business School for Founders & Builders',
  description: 'A free, practical, founder-focused MBA program for developers, solo founders, and engineers who want real business and leadership skills.',
  keywords: ['MBA', 'startup', 'founders', 'business education', 'free MBA', 'leadership', 'entrepreneurship'],
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: 'Gmax MBA — Free Business School for Founders & Builders',
    description: 'Practical MBA-level business education for developers, founders, and engineers. Completely free.',
    type: 'website',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'Gmax MBA' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08080c] text-[#f0f0f0] antialiased">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: '#08080c', color: '#f0f0f0', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '13px' },
              success: { iconTheme: { primary: '#2ed8c3', secondary: '#241e20' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#241e20' } },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
