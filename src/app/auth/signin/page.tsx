


'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Gmax MBA account and continue your learning journey.',
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const result = await signIn('credentials', { ...form, redirect: false })

    if (result?.ok) {
      toast.success('Welcome back!')
      // Check onboarded status before redirecting
      try {
        const res = await fetch('/api/users/me')
        const user = await res.json()
        if (!user.onboarded) {
          router.push('/onboarding')
        } else {
          router.push('/dashboard')
        }
      } catch {
        router.push('/dashboard')
      }
    } else {
      toast.error('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#241e20] flex flex-col items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2ed8c3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-6 md:mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-2">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white border border-white/10 shadow-xl shadow-black/30">
              <Image src="/logo.png" alt="Gmax MBA" width={64} height={64} className="w-full h-full object-cover" priority />
            </div>
            <span className="font-display font-bold text-white text-lg md:text-xl">Gmax MBA</span>
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1 mt-3">Welcome back</h1>
          <p className="text-[#a0a0b0] text-sm">Continue your learning journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-4 md:space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Email Address</label>
            <input type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-[#504850] outline-none transition-colors" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Your password"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-[#504850] outline-none transition-colors" required />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#706870] hover:text-[#a0a0b0] transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] disabled:opacity-60 text-[#241e20] font-bold py-3.5 rounded-xl transition-all text-sm">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
          <p className="text-center text-xs text-[#706870]">
            New here?{' '}
            <Link href="/auth/signup" className="text-[#2ed8c3] hover:text-[#5ee3d2] transition-colors">
              Create a free account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
