'use client'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSent(true)
    } catch { toast.error('Something went wrong') }
    finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-body-md">
      <div className="fixed inset-0 pointer-events-none z-0 grid-pattern" />
      <div className="fixed top-[-10%] right-[-10%] w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-[440px] animate-fade-up">

          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 glass-card border border-primary/20 rounded-xl flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
            </div>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-2 block uppercase">Gmax MBA</span>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2 text-center">Forgot password?</h1>
            <p className="font-body-md text-body-md text-text-secondary text-center max-w-sm">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          {sent ? (
            <div className="glass-card rounded-xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
              </div>
              <h3 className="font-headline-sm text-on-surface">Check your inbox</h3>
              <p className="text-text-secondary text-body-sm leading-relaxed">
                If <span className="text-primary">{email}</span> is registered, you'll receive a reset link within a few minutes.
              </p>
              <p className="text-text-tertiary text-xs">Check your spam folder if you don't see it.</p>
              <Link href="/auth/signin"
                className="block w-full text-center bg-primary/10 border border-primary/20 text-primary font-label-caps text-label-caps py-3 rounded-lg hover:bg-primary/20 transition-all mt-4">
                ← Back to Sign In
              </Link>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 md:p-8 mb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-text-tertiary uppercase ml-1 block">Email Address</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary text-lg transition-colors group-focus-within:text-primary"
                      style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                    <input id="email" type="email" required value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-surface-container border border-border-subtle rounded-lg py-3.5 pl-12 pr-4 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary" />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-primary-container text-on-primary-fixed font-label-caps text-label-caps py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(46,216,195,0.25)] transition-all active:scale-[0.98] group disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <><span>Send Reset Link</span><span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                  )}
                </button>
              </form>
            </div>
          )}

          <div className="text-center">
            <Link href="/auth/signin" className="font-body-sm text-body-sm text-text-secondary hover:text-primary transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
