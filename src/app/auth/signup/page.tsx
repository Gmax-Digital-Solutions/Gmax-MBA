import type { Metadata } from 'next'
import SignUpClient from './signup-client'


export const metadata: Metadata = {
  title: 'Enroll Free — Start Your MBA Journey Today',
  description: 'Create your free Gmax MBA account. No credit card required. Start Day 1 today and build real business skills in 30 minutes a day.',
  openGraph: {
    title: 'Enroll Free — Gmax MBA',
    description: 'Join hundreds of founders and builders going through the program. Completely free, forever.',
  },
}


export default function SignUpPage() {
  return <SignUpClient />
}