'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from '@posthog/react'
import { SessionProvider } from 'next-auth/react'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

export function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Only initialize in the browser and when env vars are available
    if (!POSTHOG_KEY || !POSTHOG_HOST) {
      console.warn('PostHog: Missing API key or host')
      return
    }

    // Prevent duplicate initialization during hot reloads
    if ((window as any).posthog?.__loaded) return

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      defaults: '2026-01-30',
      autocapture: true,
      capture_pageview: true,
      persistence: 'localStorage',
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SessionProvider>{children}</SessionProvider>
    </PHProvider>
  )
}