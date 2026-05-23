import type { Metadata } from 'next'
import SignInClient from './signin-client'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Gmax MBA account and continue your learning journey.',
  robots: { index: false, follow: false },
}

export default function SignInPage() {
    return <SignInClient />
}

