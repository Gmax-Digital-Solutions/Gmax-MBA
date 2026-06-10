'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const roles = [
  { value: 'builder',  label: 'Builder / Maker'        },
  { value: 'founder',  label: 'Founder / Entrepreneur' },
  { value: 'engineer', label: 'Software Engineer'      },
  { value: 'designer', label: 'Designer'               },
  { value: 'other',    label: 'Other'                  },
]

export default function SignUpPage() {
  const router = useRouter()
  const [loading,      setLoading]      = useState(false)
  const [oauthLoading, setOAuthLoading] = useState<string | null>(null)
  const [showPw,       setShowPw]       = useState(false)
  const [form,         setForm]         = useState({ name: '', email: '', password: '', company: '', role: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res  = await fetch('/api/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Registration failed'); return }
      toast.success('Account created!')
      const result = await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      router.push(result?.ok ? '/onboarding' : '/auth/signin')
    } catch { toast.error('Something went wrong') }
    finally { setLoading(false) }
  }

  async function handleOAuth(provider: 'github' | 'google') {
    setOAuthLoading(provider)
    await signIn(provider, { callbackUrl: '/onboarding' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-body-md overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(46,216,195,0.12) 0%, transparent 70%)' }} />
      <div className="fixed inset-0 pointer-events-none z-0 grid-pattern opacity-60" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-20">

        {/* Brand */}
        <div className="flex flex-col items-center mb-8 md:mb-10 text-center animate-fade-up">
          <div className="mb-5 md:mb-6 flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] flex-shrink-0">
              <span className="text-background font-headline-sm font-bold italic text-lg">G</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Gmax MBA</span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-3 tracking-tight">Create your account</h1>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-md">Join free. No credit card. Start Day 1 today.</p>
        </div>

        {/* OAuth buttons */}
        <div className="w-full max-w-[540px] grid grid-cols-2 gap-3 mb-4 animate-fade-up" style={{ animationDelay: '40ms' }}>
          <button onClick={() => handleOAuth('github')} disabled={!!oauthLoading}
            className="flex items-center justify-center gap-2 py-3.5 rounded-lg border border-border-subtle bg-transparent font-label-caps text-label-caps text-text-secondary hover:bg-surface-container hover:border-border-hover transition-all disabled:opacity-60">
            {oauthLoading === 'github' ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="material-symbols-outlined text-lg">terminal</span>}
            Continue with GitHub
          </button>
          <button onClick={() => handleOAuth('google')} disabled={!!oauthLoading}
            className="flex items-center justify-center gap-2 py-3.5 rounded-lg border border-border-subtle bg-transparent font-label-caps text-label-caps text-text-secondary hover:bg-surface-container hover:border-border-hover transition-all disabled:opacity-60">
            {oauthLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="material-symbols-outlined text-lg">data_object</span>}
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[540px] relative mb-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle" /></div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 font-label-caps text-label-caps text-text-tertiary uppercase text-[10px]">Or sign up with email</span>
          </div>
        </div>

        {/* Enrollment card */}
        <div className="glass-card w-full max-w-[540px] rounded-xl p-6 md:p-8 lg:p-10 animate-fade-up" style={{ animationDelay: '80ms' }}>
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-label-caps text-label-caps text-text-tertiary uppercase">Full Name</label>
                <div className="input-focus-glow">
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-caps text-label-caps text-text-tertiary uppercase">Company</label>
                <div className="input-focus-glow">
                  <input type="text" value={form.company} onChange={e => set('company', e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary/50" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-text-tertiary uppercase">Email Address</label>
              <div className="input-focus-glow">
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="john@company.com"
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-text-tertiary uppercase">I am a</label>
              <div className="relative">
                <select required value={form.role} onChange={e => set('role', e.target.value)}
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 font-body-md text-body-md text-text-primary appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer">
                  <option value="" disabled>Select your profile</option>
                  {roles.map(r => <option key={r.value} value={r.value} className="bg-surface-container">{r.label}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary">
                  <span className="material-symbols-outlined text-xl">expand_more</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-text-tertiary uppercase">Password</label>
              <div className="relative input-focus-glow">
                <input type={showPw ? 'text' : 'password'} required value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 pr-12 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary/50" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: `'FILL' ${showPw ? 1 : 0}` }}>
                    {showPw ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-primary-container text-on-primary py-4 rounded-lg font-body-md font-semibold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(46,216,195,0.15)] group disabled:opacity-60 mt-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>Enroll for Free<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></>
              )}
            </button>
          </form>

          <div className="my-6 border-t border-border-subtle" />
          <div className="text-center">
            <p className="font-body-sm text-body-sm text-text-tertiary">
              Already enrolled?{' '}
              <Link href="/auth/signin" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>

        <footer className="mt-10 text-center opacity-40">
          <p className="font-label-mono text-label-mono text-text-tertiary">SECURED ACCESS · INSTITUTIONAL EXCELLENCE FOR THE DIGITAL AGE</p>
        </footer>
      </main>
    </div>
  )
}
