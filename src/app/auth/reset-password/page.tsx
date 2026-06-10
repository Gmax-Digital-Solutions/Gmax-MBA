'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

function ResetForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const token        = searchParams.get('token')
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [showPw,    setShowPw]    = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { toast.error('Passwords do not match'); return }
    if (password.length < 8)  { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/reset-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Failed to reset'); return }
      setDone(true)
      setTimeout(() => router.push('/auth/signin'), 2000)
    } catch { toast.error('Something went wrong') }
    finally { setLoading(false) }
  }

  if (!token) return (
    <div className="text-center space-y-4">
      <p className="text-text-secondary">Invalid reset link. Please request a new one.</p>
      <Link href="/auth/forgot-password" className="text-primary hover:underline font-label-caps text-label-caps">Request new link</Link>
    </div>
  )

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 mb-6">
      {done ? (
        <div className="text-center space-y-4 py-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h3 className="font-headline-sm text-on-surface">Password updated!</h3>
          <p className="text-text-secondary text-body-sm">Redirecting you to sign in...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-text-tertiary uppercase ml-1 block">New Password</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary text-lg transition-colors group-focus-within:text-primary"
                style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
              <input type={showPw ? 'text' : 'password'} required value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-surface-container border border-border-subtle rounded-lg py-3.5 pl-12 pr-12 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: `'FILL' ${showPw ? 1 : 0}` }}>
                  {showPw ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-text-tertiary uppercase ml-1 block">Confirm Password</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary text-lg transition-colors group-focus-within:text-primary"
                style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
              <input type={showPw ? 'text' : 'password'} required value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-surface-container border border-border-subtle rounded-lg py-3.5 pl-12 pr-4 font-label-mono text-label-mono text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary" />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary-container text-on-primary-fixed font-label-caps text-label-caps py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(46,216,195,0.25)] transition-all active:scale-[0.98] group disabled:opacity-60">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <><span>Set New Password</span><span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span></>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-body-md">
      <div className="fixed inset-0 pointer-events-none z-0 grid-pattern" />
      <div className="fixed top-[-10%] right-[-10%] w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-[440px] animate-fade-up">
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 glass-card border border-primary/20 rounded-xl flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
            </div>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-2 block uppercase">Gmax MBA</span>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2 text-center">Set new password</h1>
            <p className="font-body-md text-body-md text-text-secondary text-center">Choose a strong password for your account.</p>
          </div>
          <Suspense fallback={<div className="glass-card rounded-xl p-8 text-center text-text-secondary">Loading...</div>}>
            <ResetForm />
          </Suspense>
          <div className="text-center">
            <Link href="/auth/signin" className="font-body-sm text-body-sm text-text-secondary hover:text-primary transition-colors">← Back to Sign In</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
