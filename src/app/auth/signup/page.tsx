

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
  title: 'Enroll Free — Start Your MBA Journey Today',
  description: 'Create your free Gmax MBA account. No credit card required. Start Day 1 today and build real business skills in 30 minutes a day.',
  openGraph: {
    title: 'Enroll Free — Gmax MBA',
    description: 'Join hundreds of founders and builders going through the program. Completely free, forever.',
  },
}

const roles = [
  { value: 'builder',  label: 'Builder / Maker'        },
  { value: 'founder',  label: 'Founder / Entrepreneur' },
  { value: 'engineer', label: 'Software Engineer'      },
  { value: 'designer', label: 'Designer'               },
  { value: 'other',    label: 'Other'                  },
]

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', role: 'builder' })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Registration failed'); return }

      toast.success('Account created! Setting things up...')

      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })

      if (result?.ok) {
        // New users always go to onboarding first
        router.push('/onboarding')
      } else {
        router.push('/auth/signin')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#241e20] flex flex-col items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2ed8c3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-6 md:mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-2">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white border border-white/10 shadow-xl shadow-black/30">
              <Image src="/logo.png" alt="Gmax MBA" width={64} height={64} className="w-full h-full object-cover" priority />
            </div>
            <span className="font-display font-bold text-white text-lg md:text-xl">Gmax MBA</span>
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1 mt-3">Create your account</h1>
          <p className="text-[#a0a0b0] text-sm">Join free. No credit card. Start Day 1 today.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Full Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Alex Johnson"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-[#504850] outline-none transition-colors" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Company / Project</label>
              <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="My Startup"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-[#504850] outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Email Address *</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-[#504850] outline-none transition-colors" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">I am a *</label>
            <select value={form.role} onChange={e => set('role', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors">
              {roles.map(r => <option key={r.value} value={r.value} className="bg-[#2c2528]">{r.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Password *</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-[#504850] outline-none transition-colors" required />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#706870] hover:text-[#a0a0b0] transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] disabled:opacity-60 text-[#241e20] font-bold py-3.5 rounded-xl transition-all text-sm">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Enroll for Free <ArrowRight className="w-4 h-4" /></>}
          </button>
          <p className="text-center text-xs text-[#706870]">
            Already enrolled?{' '}
            <Link href="/auth/signin" className="text-[#2ed8c3] hover:text-[#5ee3d2] transition-colors">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
