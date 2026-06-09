'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { DAILY_PLAN } from '@/lib/data/daily-plan'
import { cn } from '@/lib/utils'

const STEPS = [1, 2, 3, 4] as const
type Step = typeof STEPS[number]

const DAILY_TASKS = [
  { icon: 'menu_book',   color: 'text-primary',      label: 'Deep Read',       dur: '10 MIN', desc: 'Specific chapters from curated MBA texts, applied to your business.'        },
  { icon: 'play_circle', color: 'text-status-red',   label: 'Watch',           dur: '08 MIN', desc: 'Direct YouTube link — expert breakdowns and case studies.'                  },
  { icon: 'assignment',  color: 'text-secondary',    label: 'Execution Task',  dur: '07 MIN', desc: 'One practical deliverable you apply to your actual company today.'           },
  { icon: 'history_edu', color: 'text-status-amber', label: 'Journal',         dur: '05 MIN', desc: 'Synthesize what you learned into your permanent knowledge base.'            },
]

const TRUST_BADGES = [
  { icon: 'verified',          label: 'ELITE CURRICULUM' },
  { icon: 'security',          label: 'SECURE ACCESS'    },
  { icon: 'school',            label: 'OPEN NETWORK'     },
  { icon: 'workspace_premium', label: 'MBA CERTIFIED'    },
]

export function OnboardingClient({ userName }: { userName: string }) {
  const router  = useRouter()
  const [step, setStep]       = useState<Step>(1)
  const [saving, setSaving]   = useState(false)
  const day1Plan = DAILY_PLAN[0]

  async function completeOnboarding() {
    setSaving(true)
    try {
      await fetch('/api/users/me', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboarded: true }),
      })
      router.push('/dashboard')
    } catch {
      toast.error('Something went wrong')
      setSaving(false)
    }
  }

  function advance(to: Step) {
    setStep(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-background text-text-primary font-body-md min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 dot-grid" />
      <div className="fixed top-[-10%] right-[-10%] w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">

        {/* ── STEP INDICATOR ─────────────────────────────────── */}
        <nav className="flex items-center gap-2 md:gap-3 mb-10 md:mb-12">
          {STEPS.map(s => (
            <div key={s} className={cn(
              'rounded-full flex items-center justify-center transition-all duration-300',
              s < step  ? 'w-4 h-4 bg-primary' :
              s === step ? 'w-3 h-3 bg-primary shadow-[0_0_8px_#58f5df]' :
              'w-2.5 h-2.5 bg-surface-container'
            )}>
              {s < step && (
                <span className="material-symbols-outlined text-on-primary"
                  style={{ fontSize: '10px', fontVariationSettings: "'FILL' 1" }}>check</span>
              )}
            </div>
          ))}
          <span className="font-label-mono text-label-mono text-text-tertiary ml-2">
            Step {step} of 4
          </span>
        </nav>

        <div className="w-full max-w-2xl">

          {/* ── STEP 1: WELCOME ─────────────────────────────── */}
          {step === 1 && (
            <section className="flex flex-col items-center text-center animate-fade-up">
              {/* Logo mark */}
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 md:mb-8 rounded-xl bg-primary flex items-center justify-center"
                style={{ boxShadow: '0 0 15px rgba(46,216,195,0.3)' }}>
                <span className="font-display-lg text-headline-md text-on-primary font-bold italic">G</span>
              </div>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-3 md:mb-4 leading-tight">
                Welcome, {userName.split(' ')[0]}
              </h1>
              <p className="text-text-secondary font-body-lg max-w-md mb-10 md:mb-12 leading-relaxed">
                You're about to start a high-performance journey designed for elite engineers and founders. 30 minutes a day. Real skills. Zero cost.
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full mb-10 md:mb-12">
                {[
                  { label: 'COMMITMENT', val: '30 min/day'  },
                  { label: 'START',      val: 'Day 1 Ready' },
                  { label: 'ACCESS',     val: 'Free Forever' },
                ].map(s => (
                  <div key={s.label} className="glass-card p-5 md:p-6 rounded-xl text-left border-l-2 border-l-primary">
                    <span className="font-label-mono text-label-mono text-primary block mb-2">{s.label}</span>
                    <span className="font-headline-sm text-headline-sm block">{s.val}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => advance(2)}
                className="w-full md:w-auto px-10 md:px-12 py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded-lg hover:brightness-110 active:scale-95 transition-all"
                style={{ boxShadow: '0 0 15px rgba(46,216,195,0.2)' }}>
                START YOUR JOURNEY →
              </button>
            </section>
          )}

          {/* ── STEP 2: DAILY ROUTINE ───────────────────────── */}
          {step === 2 && (
            <section className="flex flex-col items-center animate-fade-up">
              <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md mb-2 text-center">Daily Routine</h2>
              <p className="text-text-secondary font-body-md mb-8 md:mb-10 text-center">Precision-engineered for the modern founder.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full mb-8 md:mb-10">
                {DAILY_TASKS.map((task, i) => (
                  <div key={i} className="glass-card p-5 md:p-6 rounded-xl hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span className={cn('material-symbols-outlined text-2xl', task.color)}
                        style={{ fontVariationSettings: "'FILL' 1" }}>{task.icon}</span>
                      <span className="font-label-mono text-label-mono text-text-tertiary">{task.dur}</span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm mb-1">{task.label}</h4>
                    <p className="text-text-secondary text-body-sm leading-relaxed">{task.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button onClick={() => advance(1)}
                  className="px-6 py-3.5 border border-border-subtle text-text-secondary rounded-lg font-label-caps text-label-caps hover:border-border-hover hover:text-text-primary transition-all">
                  ← Back
                </button>
                <button onClick={() => advance(3)}
                  className="flex-1 md:flex-none px-10 md:px-12 py-3.5 bg-primary text-on-primary font-label-caps text-label-caps rounded-lg hover:brightness-110 active:scale-95 transition-all">
                  VIEW DAY 1 →
                </button>
              </div>
            </section>
          )}

          {/* ── STEP 3: DAY 1 PREVIEW ───────────────────────── */}
          {step === 3 && (
            <section className="flex flex-col items-center animate-fade-up">
              <div className="bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-5 md:mb-6">
                <span className="text-primary font-label-mono text-label-mono">DAY 1 IS READY</span>
              </div>
              <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md mb-6 md:mb-8 text-center">
                First Session Preview
              </h2>

              {day1Plan && (
                <div className="w-full glass-card rounded-2xl overflow-hidden mb-8 md:mb-12 shimmer-top">
                  {/* Hero */}
                  <div className="relative p-6 md:p-8 bg-gradient-to-br from-primary/8 via-surface to-surface-container">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                      <span className="font-label-mono text-label-mono text-primary block mb-2">Foundation Module 01</span>
                      <h3 className="font-headline-sm text-headline-sm text-text-primary">{day1Plan.title}</h3>
                      <p className="text-text-secondary text-body-sm mt-1">{day1Plan.focus}</p>
                    </div>
                  </div>
                  {/* Tasks preview */}
                  <div className="p-6 md:p-8 space-y-3 md:space-y-4">
                    {day1Plan.tasks.map(task => {
                      const icons: Record<string, string> = { read: 'menu_book', watch: 'play_circle', task: 'assignment', reflect: 'history_edu' }
                      const colors: Record<string, string> = { read: 'text-primary/60', watch: 'text-status-red/60', task: 'text-secondary/60', reflect: 'text-status-amber/60' }
                      return (
                        <div key={task.id} className="flex items-center gap-3 md:gap-4 text-text-secondary">
                          <span className={cn('material-symbols-outlined flex-shrink-0', colors[task.type] || 'text-primary/60')}
                            style={{ fontVariationSettings: "'FILL' 1" }}>{icons[task.type] || 'check_circle'}</span>
                          <div className="min-w-0">
                            <p className="font-body-md text-text-primary">{task.label}</p>
                            {task.duration && (
                              <span className="font-label-mono text-[10px] text-text-tertiary">{task.duration}</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    <p className="text-xs text-text-tertiary pt-2 border-t border-border-subtle">
                      These tasks were built specifically for founders and builders.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 w-full md:w-auto">
                <button onClick={() => advance(2)}
                  className="px-6 py-3.5 border border-border-subtle text-text-secondary rounded-lg font-label-caps text-label-caps hover:border-border-hover hover:text-text-primary transition-all">
                  ← Back
                </button>
                <button onClick={() => advance(4)}
                  className="flex-1 md:flex-none px-10 md:px-12 py-3.5 bg-primary text-on-primary font-label-caps text-label-caps rounded-lg hover:brightness-110 active:scale-95 transition-all">
                  CONFIRM & LAUNCH →
                </button>
              </div>
            </section>
          )}

          {/* ── STEP 4: LAUNCH ──────────────────────────────── */}
          {step === 4 && (
            <section className="flex flex-col items-center text-center animate-fade-up">
              <div className="text-5xl md:text-6xl mb-6 md:mb-8 animate-float">🚀</div>

              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-3 md:mb-4">
                You're all set!
              </h2>
              <p className="text-text-secondary font-body-lg max-w-md mb-10 md:mb-12 leading-relaxed">
                Success in Gmax MBA isn't about speed — it's about consistency. Your curriculum is now live and tailored for your growth as a technical leader.
              </p>

              {/* CTA */}
              <div className="w-full mb-10 md:mb-12">
                <button onClick={completeOnboarding} disabled={saving}
                  className="w-full flex items-center justify-center gap-3 py-4 md:py-5 bg-primary text-on-primary font-headline-sm rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
                  style={{ boxShadow: '0 0 20px rgba(46,216,195,0.25)' }}>
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  )}
                  {saving ? 'Setting things up...' : 'Start Day 1 Now'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full pt-6 md:pt-8 border-t border-border-subtle">
                {TRUST_BADGES.map(badge => (
                  <div key={badge.icon} className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}>{badge.icon}</span>
                    <span className="font-label-caps text-[9px] md:text-label-caps text-text-tertiary text-center leading-tight">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Back link */}
              <button onClick={() => advance(3)}
                className="mt-6 font-label-caps text-label-caps text-text-tertiary hover:text-text-secondary transition-colors">
                ← Go back
              </button>
            </section>
          )}

        </div>
      </main>
    </div>
  )
}
