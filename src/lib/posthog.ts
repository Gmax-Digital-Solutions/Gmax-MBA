import posthog from 'posthog-js'

const isBrowser = typeof window !== 'undefined'
const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

export const initPostHog = () => {
  if (!isBrowser || !POSTHOG_API_KEY || !POSTHOG_HOST) return
  if ((window as any).posthog?.__loaded) return

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false,
    persistence: 'localStorage',
    disable_session_recording: false,
    disable_cookie: false,
  })

  if (isBrowser) {
    window.addEventListener('error', (event) => {
      if (!(window as any).posthog?.__loaded) return
      posthog.capture('client error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error?.message,
        stack: event.error?.stack,
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      if (!(window as any).posthog?.__loaded) return
      const reason = event.reason instanceof Error ? event.reason.message : String(event.reason)
      const stack = event.reason instanceof Error ? event.reason.stack : undefined
      posthog.capture('unhandled rejection', { reason, stack })
    })
  }
}

export const captureEvent = (event: string, props?: Record<string, any>) => {
  if (!isBrowser || !(window as any).posthog?.__loaded) return
  posthog.capture(event, props)
}

export const identifyUser = (distinctId: string, properties?: Record<string, any>) => {
  if (!isBrowser || !(window as any).posthog?.__loaded) return
  posthog.identify(distinctId)
  if (properties && typeof posthog.people?.set === 'function') {
    posthog.people.set(properties)
  }
}

export const resetPostHog = () => {
  if (!isBrowser) return
  if (typeof posthog.reset === 'function') {
    posthog.reset()
  }
  ;(window as any).posthog = undefined
}

export const capturePageView = (path?: string) => {
  if (!isBrowser || !(window as any).posthog?.__loaded) return
  posthog.capture('$pageview', {
    path: path || window.location.pathname,
    url: window.location.href,
    title: document.title,
  })
}

export const getFeatureFlag = <T = boolean>(flagKey: string, defaultValue: T) => {
  if (!isBrowser || !(window as any).posthog?.__loaded || typeof posthog.getFeatureFlag !== 'function') {
    return defaultValue
  }

  const value = posthog.getFeatureFlag(flagKey)
  return value === undefined ? defaultValue : (value as T)
}

export const onFeatureFlags = (callback: () => void) => {
  if (!isBrowser || typeof posthog.onFeatureFlags !== 'function') return
  posthog.onFeatureFlags(callback)
}
