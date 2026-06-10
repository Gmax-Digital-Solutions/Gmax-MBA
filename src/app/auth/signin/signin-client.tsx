'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [loading,    setLoading]    = useState(false)
  const [oauthLoading, setOAuth]    = useState<string | null>(null)
  const [showPw,     setShowPw]     = useState(false)
  const [form,       setForm]       = useState({ email: '', password: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const result = await signIn('credentials', { ...form, redirect: false })
    if (result?.ok) {
      toast.success('Welcome back!')
      try {
        const res  = await fetch('/api/users/me')
        const user = await res.json()
        router.push(user.onboarded ? '/dashboard' : '/onboarding')
      } catch { router.push('/dashboard') }
    } else {
      toast.error('Invalid email or password')
      setLoading(false)
    }
  }

  async function handleOAuth(provider: 'github' | 'google') {
    setOAuth(provider)
    await signIn(provider, { callbackUrl: '/onboarding' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-body-md">
      <div className="fixed inset-0 pointer-events-none z-0 grid-pattern" />
      <div className="fixed top-[-10%] right-[-10%] w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-2/5 h-2/5 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-20 md:py-24">
        <div className="w-full max-w-[440px] animate-fade-up">

          {/* Brand */}
          <div className="flex flex-col items-center mb-10 md:mb-12">
            <div className="w-14 h-14 md:w-16 md:h-16 glass-card border border-primary/20 rounded-xl flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-2 block uppercase">Gmax MBA</span>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2 text-center">Welcome back</h1>
            <p className="font-body-md text-body-md text-text-secondary text-center">Return to your learning journey.</p>
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button onClick={() => handleOAuth('github')} disabled={!!oauthLoading}
              className="flex items-center justify-center gap-2 py-3 rounded-lg border border-border-subtle bg-transparent font-label-caps text-label-caps text-text-secondary hover:bg-surface-container hover:border-border-hover transition-all disabled:opacity-60">
              {oauthLoading === 'github'
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <span className="material-symbols-outlined text-lg">terminal</span>}
              GitHub
            </button>
            <button onClick={() => handleOAuth('google')} disabled={!!oauthLoading}
              className="flex items-center justify-center gap-2 py-3 rounded-lg border border-border-subtle bg-transparent font-label-caps text-label-caps text-text-secondary hover:bg-surface-container hover:border-border-hover transition-all disabled:opacity-60">
              {oauthLoading === 'google'
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <span className="material-symbols-outlined text-lg">data_object</span>}
              Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle" /></div>
            <div className="relative flex justify-center">
              <span className="bg-[#1c181a] px-4 font-label-caps text-label-caps text-text-tertiary uppercase">Or sign in with email</span>
            </div>
          </div>

          {/* Form card */}
          <div className="glass-card rounded-xl p-6 md:p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-text-tertiary uppercase ml-1 block">Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary text-lg transition-colors group-focus-within:text-primary"
                    style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                  <input id="email" type="email" required value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="name@example.com"
                    className="w-full bg-surface-container border border-border-subtle rounded-lg py-3.5 pl-12 pr-4 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-caps text-label-caps text-text-tertiary uppercase">Password</label>
                  <Link href="/auth/forgot-password" className="font-label-caps text-label-caps text-primary hover:opacity-80 transition-opacity">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary text-lg transition-colors group-focus-within:text-primary"
                    style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                  <input id="password" type={showPw ? 'text' : 'password'} required
                    value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full bg-surface-container border border-border-subtle rounded-lg py-3.5 pl-12 pr-12 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: `'FILL' ${showPw ? 1 : 0}` }}>
                      {showPw ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <button type="submit" disabled={loading}
                  className="w-full bg-primary-container text-on-primary-fixed font-label-caps text-label-caps py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(46,216,195,0.25)] transition-all active:scale-[0.98] group disabled:opacity-60">
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <><span>Sign In</span><span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span></>}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center">
            <p className="font-body-sm text-body-sm text-text-secondary">
              New here?{' '}
              <Link href="/auth/signup" className="text-primary font-bold ml-1 hover:underline underline-offset-4 decoration-primary/30">
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full py-8 border-t border-border-subtle bg-surface-dim">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-margin-desktop gap-4 max-w-container-max mx-auto">
          <span className="font-headline-sm text-on-surface opacity-50 italic">Gmax MBA</span>
          <div className="flex gap-5 flex-wrap justify-center">
            {[['Terms', '#'], ['Privacy', '#'], ['Curriculum', '/curriculum']].map(([l, h]) => (
              <Link key={l} href={h} className="font-label-mono text-label-mono text-text-tertiary hover:text-on-surface transition-colors">{l}</Link>
            ))}
          </div>
          <span className="font-body-sm text-body-sm text-text-tertiary">© {new Date().getFullYear()} Gmax MBA.</span>
        </div>
      </footer>
    </div>
  )
}
