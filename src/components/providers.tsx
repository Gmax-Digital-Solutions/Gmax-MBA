'use client'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { capturePageView, initPostHog } from '@/lib/posthog'

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    initPostHog()
  }, [])

  useEffect(() => {
    if (!pathname) return
    capturePageView(pathname)
  }, [pathname])

  return <SessionProvider>{children}</SessionProvider>
}
