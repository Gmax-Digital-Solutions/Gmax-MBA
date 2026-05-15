'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { DayPlan } from '@/lib/data/daily-plan'
import { ArrowRight, BookOpen, Youtube, CheckSquare, PenLine, Loader2, Flame, Users, Clock, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 0, label: 'Welcome'   },
  { id: 1, label: 'How it works' },
  { id: 2, label: 'Day 1 preview' },
  { id: 3, label: 'You\'re in' },
]

const typeConfig = {
  read:    { icon: BookOpen,    color: 'text-[#2ed8c3]', bg: 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20', label: 'Read'    },
  watch:   { icon: Youtube,     color: 'text-red-400',   bg: 'bg-red-500/10 border-red-500/20',       label: 'Watch'   },
  task:    { icon: CheckSquare, color: 'text-[#585de1]', bg: 'bg-[#585de1]/10 border-[#585de1]/20',  label: 'Task'    },
  reflect: { icon: PenLine,     color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20',   label: 'Journal' },
}

export function OnboardingClient({ userName, day1, userId }: {
  userName: string; day1: DayPlan | null; userId: string
}) {
  const router = useRouter()
  const [step, setStep]       = useState(0)
  const [loading, setLoading] = useState(false)
  const firstName = userName.split(' ')[0]

  async function finish() {
    setLoading(true)
    try {
      await fetch('/api/users/me', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboarded: true }),
      })
      router.push('/dashboard/daily')
    } catch {
      router.push('/dashboard/daily')
    }
  }

  return (
    <div className="min-h-screen bg-[#241e20] flex flex-col items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2ed8c3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg">

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === step ? 'w-8 bg-[#2ed8c3]' : i < step ? 'w-4 bg-[#2ed8c3]/40' : 'w-4 bg-white/10'
            )} />
          ))}
        </div>

        {/* ── STEP 0 — WELCOME ──────────────────────────────────────────── */}
        {step === 0 && (
          <div className="text-center animate-fade-up">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white border border-white/10 shadow-2xl shadow-black/40">
                <Image src="/logo.png" alt="Gmax MBA" width={80} height={80} className="w-full h-full object-cover" />
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Welcome, {firstName}! 🎉
            </h1>
            <p className="text-[#a0a0b0] text-base leading-relaxed mb-4">
              You just enrolled in the Gmax MBA — a free, self-guided business curriculum built for founders and builders like you.
            </p>
            <p className="text-[#706070] text-sm mb-8">
              Before you dive in, let us show you exactly how this works. Takes 60 seconds.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Clock,  val: '30 min',    label: 'per day'            },
                { icon: Flame,  val: 'Day 1',     label: 'ready now'          },
                { icon: Users,  val: '100% free', label: 'forever'            },
              ].map(s => (
                <div key={s.val} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center">
                  <s.icon className="w-5 h-5 text-[#2ed8c3] mx-auto mb-2" />
                  <div className="font-display text-lg font-bold text-white">{s.val}</div>
                  <div className="text-[10px] text-[#706070]">{s.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)}
              className="w-full flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold py-4 rounded-xl transition-all text-base shadow-lg shadow-[#2ed8c3]/15">
              Show me how it works <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── STEP 1 — HOW IT WORKS ─────────────────────────────────────── */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Here's your daily routine</h2>
              <p className="text-[#a0a0b0] text-sm">Four blocks. 30 minutes total. Every day your dashboard tells you exactly what to do next.</p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                { icon: BookOpen,    color: 'text-[#2ed8c3] bg-[#2ed8c3]/10 border-[#2ed8c3]/20', time: '6:00 AM · 30 min',  title: 'Read',    desc: 'A specific chapter with page numbers. Open the book and read — nothing else.' },
                { icon: Youtube,     color: 'text-red-400 bg-red-500/10 border-red-500/20',         time: '12:00 PM · 20 min', title: 'Watch',   desc: 'A YouTube video with a direct search link. Watch over lunch.' },
                { icon: CheckSquare, color: 'text-[#585de1] bg-[#585de1]/10 border-[#585de1]/20',  time: '5:00 PM · 30 min',  title: 'Task',    desc: 'Apply the concept to your actual business. Not theory — real work.' },
                { icon: PenLine,     color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',   time: 'Evening · 10 min',  title: 'Journal', desc: 'One reflection prompt. What did you learn? How will you apply it?' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
                  <div className={cn('flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border', item.color)}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-semibold text-sm">{item.title}</span>
                      <span className="text-[10px] text-[#706070] font-mono">{item.time}</span>
                    </div>
                    <p className="text-[#a0a0b0] text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-shrink-0 px-5 py-3.5 border border-white/10 text-[#a0a0b0] hover:text-white hover:border-white/20 rounded-xl text-sm transition-all">Back</button>
              <button onClick={() => setStep(2)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold py-3.5 rounded-xl transition-all text-sm">
                Preview Day 1 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 — DAY 1 PREVIEW ───────────────────────────────────── */}
        {step === 2 && (
          <div className="animate-fade-up">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <Flame className="w-3 h-3" /> Day 1 is ready for you
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                {day1?.title || 'What is a Business?'}
              </h2>
              <p className="text-[#a0a0b0] text-sm">{day1?.focus || 'The Personal MBA — Understanding Value Creation'}</p>
            </div>

            <div className="space-y-2 mb-6">
              {(day1?.tasks || []).map((task, i) => {
                const cfg = typeConfig[task.type as keyof typeof typeConfig] || typeConfig.task
                const Icon = cfg.icon
                return (
                  <div key={task.id} className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5">
                    <div className={cn('flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border text-xs', cfg.bg, cfg.color)}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white">{task.label}</div>
                      <div className="text-[11px] text-[#706070] truncate">
                        {task.chapter || task.searchQuery || task.detail.slice(0, 55)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#706070] flex-shrink-0">
                      <Clock className="w-2.5 h-2.5" />{task.duration}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-4 mb-6">
              <p className="text-xs text-[#a0a0b0] leading-relaxed">
                <span className="text-white font-semibold">Everything you need is linked.</span>{' '}
                Book chapters tell you exact pages. Videos open directly on YouTube. Tasks are specific and apply to your business — not generic exercises.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-shrink-0 px-5 py-3.5 border border-white/10 text-[#a0a0b0] hover:text-white hover:border-white/20 rounded-xl text-sm transition-all">Back</button>
              <button onClick={() => setStep(3)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold py-3.5 rounded-xl transition-all text-sm">
                I'm ready <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 — LET'S GO ─────────────────────────────────────────── */}
        {step === 3 && (
          <div className="text-center animate-fade-up">
            <div className="text-6xl mb-5">🚀</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">You're all set, {firstName}!</h2>
            <p className="text-[#a0a0b0] text-base leading-relaxed mb-3">
              Your Day 1 plan is loaded and waiting. Come back every day — even for just 30 minutes — and in a year you'll have more practical business knowledge than most MBAs.
            </p>
            <p className="text-[#706070] text-sm mb-8">
              The best time to start was yesterday. The second best time is right now.
            </p>
            <button onClick={finish} disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[#2ed8c3] hover:bg-[#5ee3d2] disabled:opacity-60 text-[#241e20] font-bold py-4 rounded-xl transition-all text-base shadow-lg shadow-[#2ed8c3]/15">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <Play className="w-5 h-5" />
                  Start Day 1 Now
                </>
              )}
            </button>
            <button onClick={() => setStep(2)} className="mt-3 text-xs text-[#706070] hover:text-[#a0a0b0] transition-colors">← Back</button>
          </div>
        )}

      </div>
    </div>
  )
}
