'use client'
import { useState } from 'react'
import { DayPlan, DayTask } from '@/lib/data/daily-plan'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const TYPE_CONFIG = {
  read:    { icon: 'menu_book',   color: 'text-primary',      bg: 'bg-primary/10',       border: 'border-primary/20',       label: 'Read'    },
  watch:   { icon: 'play_circle', color: 'text-status-red',   bg: 'bg-status-red/10',    border: 'border-status-red/20',    label: 'Watch'   },
  task:    { icon: 'task_alt',    color: 'text-secondary',    bg: 'bg-secondary/10',     border: 'border-secondary/20',     label: 'Task'    },
  reflect: { icon: 'edit_square', color: 'text-status-amber', bg: 'bg-status-amber/10',  border: 'border-status-amber/20',  label: 'Journal' },
} as const

const MOODS = [
  { value: 'great',     emoji: '🔥' },
  { value: 'good',      emoji: '😊' },
  { value: 'okay',      emoji: '😐' },
  { value: 'tough',     emoji: '😤' },
]

export function DailyClient({
  plan, initialDailyTasks, initialJournalEntry, today,
  dayNumber, userName, isPast = false, isToday = true,
  isFuture = false, currentDay,
}: {
  plan: DayPlan | null
  initialDailyTasks: any[]
  initialJournalEntry: any
  today: string
  dayNumber: number
  userName: string
  isPast?: boolean
  isToday?: boolean
  isFuture?: boolean
  currentDay?: number
}) {
  const [tasks, setTasks]             = useState(initialDailyTasks)
  const [journal, setJournal]         = useState(initialJournalEntry?.content || '')
  const [mood, setMood]               = useState(initialJournalEntry?.mood || '')
  const [saving, setSaving]           = useState<string | null>(null)
  const [savingJournal, setSavingJournal] = useState(false)
  const [expanded, setExpanded]       = useState<string | null>(null)

  // ── No plan ────────────────────────────────────────────────────
  if (!plan) return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-24 text-center px-4">
      <div className="text-5xl mb-4">🎓</div>
      <h2 className="font-headline-sm text-headline-sm text-text-primary mb-2">Program complete!</h2>
      <p className="text-text-secondary mb-6">You've finished all 30 days. Keep going with the full curriculum.</p>
      <Link href="/dashboard/curriculum"
        className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-primary/20">
        Browse Curriculum →
      </Link>
    </div>
  )

  // ── Future day ─────────────────────────────────────────────────
  if (isFuture) return (
    <div className="max-w-4xl mx-auto space-y-6 dot-pattern pb-12">
      <DayNavBar dayNumber={dayNumber} currentDay={currentDay} />
      <div className="glass-card rounded-xl p-8 border border-dashed border-white/10 flex flex-col items-center text-center opacity-60">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-text-tertiary">lock</span>
        </div>
        <h4 className="font-headline-sm text-headline-sm text-text-secondary mb-2">Day {dayNumber} is coming</h4>
        <p className="font-body-sm text-text-tertiary mb-6">Focus on today's plan first.</p>
        <Link href="/dashboard/daily"
          className="px-6 py-2 rounded-full border border-border-subtle text-text-tertiary font-label-mono text-xs hover:border-primary hover:text-primary transition-all">
          GO TO TODAY — DAY {currentDay}
        </Link>
      </div>
    </div>
  )

  const isTaskDone     = (taskId: string) => tasks.some(t => t.taskId === taskId && t.done)
  const completedCount = plan.tasks.filter(t => isTaskDone(t.id)).length
  const allDone        = completedCount === plan.tasks.length

  async function toggleTask(task: DayTask) {
    setSaving(task.id)
    const nowDone = !isTaskDone(task.id)
    try {
      const res = await fetch('/api/daily', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day:            plan?.day, taskId: task.id, done: nowDone,
          moduleId:       task.moduleId       || null,
          progressTaskId: task.progressTaskId || null,
          progressBookId: task.progressBookId || null,
        }),
      })
      const data = await res.json()
      setTasks(prev => [...prev.filter(t => t.taskId !== task.id), data])
      if (nowDone) toast.success(task.progressTaskId || task.progressBookId ? '✅ Done — progress updated!' : '✅ Done!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(null) }
  }

  async function saveJournal() {
    if (!journal.trim()) return
    setSavingJournal(true)
    try {
      await fetch('/api/journal', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, day: plan?.day, content: journal, mood }),
      })
      toast.success('Reflection saved!')
    } catch { toast.error('Failed to save') }
    finally { setSavingJournal(false) }
  }

  const greetHour = new Date().getHours()
  const greeting  = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-4xl mx-auto dot-pattern pb-12">

      {/* ── DAY NAV BAR ───────────────────────────────────────── */}
      <DayNavBar dayNumber={dayNumber} currentDay={currentDay} />

      {/* ── PAST DAY BANNER ───────────────────────────────────── */}
      {isPast && (
        <div className="flex items-center gap-3 bg-status-amber/8 border border-status-amber/20 rounded-xl px-4 py-3 mb-5 mt-2">
          <span className="material-symbols-outlined text-status-amber flex-shrink-0">calendar_today</span>
          <p className="font-body-sm text-text-secondary">
            <span className="text-status-amber font-semibold">Past Day</span> — you can still complete tasks and update your journal.
          </p>
        </div>
      )}

      {/* ── DAY HEADER CARD ───────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-5 mt-2 relative overflow-hidden">
        <div className="flex justify-between items-start mb-5 md:mb-6 gap-2">
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-full border',
            isPast ? 'bg-status-amber/5 border-status-amber/10' : 'bg-primary/5 border-primary/10'
          )}>
            <span className={cn('material-symbols-outlined text-sm fill-icon', isPast ? 'text-status-amber' : 'text-primary')}
              style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <span className={cn('font-label-mono text-label-mono tracking-tighter', isPast ? 'text-status-amber' : 'text-primary')}>
              DAY {plan.day}
            </span>
          </div>
          <span className="font-label-caps text-label-caps text-text-tertiary tracking-widest uppercase text-right">
            Week {plan.week} · Phase {plan.phase}
          </span>
        </div>

        <h1 className="font-headline-md text-headline-md text-text-primary mb-2 leading-tight">{plan.title}</h1>
        <p className="text-text-secondary text-sm mb-6 leading-relaxed">{plan.focus}</p>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-end mb-1">
            <span className="font-label-mono text-label-mono text-text-secondary uppercase">
              {isPast ? 'Completed Tasks' : 'Course Progress'}
            </span>
            <span className={cn('font-label-mono text-label-mono', allDone ? 'text-primary' : isPast ? 'text-status-amber' : 'text-primary')}>
              {completedCount}/{plan.tasks.length} Done
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', isPast && !allDone ? 'bg-status-amber' : 'gradient-progress')}
              style={{ width: `${(completedCount / plan.tasks.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-[10px] text-text-tertiary mt-2">✓ Completing tasks {isPast ? 'still updates' : 'updates'} your overall progress bar</p>
      </div>

      {/* ── COMPLETION BANNER ─────────────────────────────────── */}
      {allDone && (
        <div className="glass-card border border-primary/30 bg-primary/5 rounded-xl p-4 mb-5 flex items-center justify-center gap-3">
          <span className="text-xl">🎉</span>
          <span className="font-body-md text-primary font-semibold">All tasks complete for Day {plan.day}!</span>
        </div>
      )}

      {/* ── TASK LIST ─────────────────────────────────────────── */}
      <div className="space-y-4">
        {plan.tasks.map((task, idx) => {
          const cfg      = TYPE_CONFIG[task.type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.task
          const done     = isTaskDone(task.id)
          const isOpen   = expanded === task.id
          const syncs    = !!(task.progressTaskId || task.progressBookId)
          const isJournal = task.type === 'reflect'

          // Journal task — special card
          if (isJournal) return (
            <div key={task.id}
              className={cn('glass-card rounded-xl p-5 transition-all', done ? 'border-primary/20' : 'border-status-amber/20')}>
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <div className="flex items-center gap-4 md:gap-5">
                  <div className={cn(
                    'w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-label-mono text-sm border',
                    done ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-status-amber/5 border-status-amber/20 text-status-amber'
                  )}>
                    {done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
                      <div className={cn('flex items-center gap-1.5 px-2 py-0.5 rounded border', cfg.bg, cfg.border)}>
                        <span className={cn('material-symbols-outlined text-[14px]', cfg.color)}>{cfg.icon}</span>
                        <span className={cn('font-label-mono text-[10px] uppercase', cfg.color)}>{cfg.label}</span>
                      </div>
                      {task.duration && (
                        <span className="font-label-mono text-[10px] text-text-tertiary">{task.duration}</span>
                      )}
                    </div>
                    <h3 className={cn('font-body-md', done ? 'text-text-primary line-through opacity-60' : 'text-text-primary')}>
                      {task.label}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <button onClick={() => setExpanded(isOpen ? null : task.id)}
                    className="material-symbols-outlined text-text-tertiary cursor-pointer hover:text-text-primary transition-colors">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </button>
                  <button onClick={() => toggleTask(task)} disabled={saving === task.id}
                    className={cn(
                      'px-3 md:px-5 py-1.5 rounded-lg border text-sm font-semibold transition-all whitespace-nowrap',
                      done
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : isPast
                          ? 'border-status-amber/30 text-status-amber hover:bg-status-amber/5'
                          : 'border-status-amber/30 text-status-amber hover:bg-status-amber/5'
                    )}>
                    {saving === task.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : done ? 'Done' : 'Open Journal'}
                  </button>
                </div>
              </div>

              {/* Inline journal */}
              <div className="bg-surface-container/50 border border-border-subtle rounded-xl p-5 md:p-6">
                <div className="mb-5 md:mb-6">
                  <span className="font-label-mono text-[10px] text-text-tertiary uppercase block mb-3">How are you feeling about today's concepts?</span>
                  <div className="flex gap-2 md:gap-4 flex-wrap">
                    {MOODS.map(m => (
                      <button key={m.value} onClick={() => setMood(mood === m.value ? '' : m.value)}
                        className={cn(
                          'w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl border transition-all',
                          mood === m.value
                            ? 'border-status-amber bg-status-amber/10 grayscale-0'
                            : 'bg-surface border-border-subtle hover:border-status-amber grayscale hover:grayscale-0'
                        )}>
                        {m.emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-mono text-[10px] text-text-tertiary uppercase block">Reflection Prompt</label>
                  {task.detail && (
                    <p className="text-sm text-text-primary mb-3 leading-relaxed italic">"{task.detail}"</p>
                  )}
                  <textarea
                    value={journal}
                    onChange={e => setJournal(e.target.value)}
                    placeholder={`Day ${plan.day} — ${plan.title}\n\nType your thoughts here...`}
                    className="w-full bg-surface-container-lowest border border-border-subtle rounded-lg p-4 font-label-mono text-sm text-text-primary focus:ring-1 focus:ring-status-amber focus:border-status-amber outline-none transition-all h-32 resize-none placeholder:text-text-tertiary custom-scrollbar"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={saveJournal} disabled={savingJournal || !journal.trim()}
                    className="flex items-center gap-2 px-5 md:px-6 py-2.5 bg-status-amber text-surface-container-lowest font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50">
                    {savingJournal ? <Loader2 className="w-4 h-4 animate-spin" /> : '✍️'}
                    {isPast ? 'Update Reflection' : 'Save Reflection'}
                  </button>
                </div>
              </div>
            </div>
          )

          // Regular task card
          return (
            <div key={task.id}
              className={cn(
                'glass-card rounded-xl p-5 transition-all',
                done ? 'border-primary/20 bg-primary/5' : isOpen ? 'border-l-2 border-l-secondary' : ''
              )}>

              {/* Task header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-5 min-w-0">
                  <div className={cn(
                    'w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-label-mono text-sm border flex-shrink-0',
                    done ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-white/5 border-white/10 text-text-secondary'
                  )}>
                    {done ? '✓' : idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
                      <div className={cn('flex items-center gap-1.5 px-2 py-0.5 rounded border flex-shrink-0', cfg.bg, cfg.border)}>
                        <span className={cn('material-symbols-outlined text-[14px]', cfg.color)}>{cfg.icon}</span>
                        <span className={cn('font-label-mono text-[10px] uppercase hidden sm:inline', cfg.color)}>{cfg.label}</span>
                      </div>
                      {task.duration && (
                        <span className="font-label-mono text-[10px] text-text-tertiary">{task.duration}</span>
                      )}
                      {syncs && !done && (
                        <span className="hidden md:inline text-[9px] font-label-mono text-primary/60 bg-primary/8 border border-primary/15 px-2 py-0.5 rounded-full">↗ syncs to progress</span>
                      )}
                    </div>
                    <h3 className={cn('font-body-md truncate', done ? 'text-text-primary line-through opacity-60' : 'text-text-primary font-medium')}>
                      {task.label}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                  <button onClick={() => setExpanded(isOpen ? null : task.id)}
                    className="material-symbols-outlined text-text-tertiary cursor-pointer hover:text-text-primary transition-colors">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </button>
                  {done ? (
                    <button onClick={() => toggleTask(task)} disabled={saving === task.id}
                      className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary text-sm font-semibold whitespace-nowrap">
                      {saving === task.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="material-symbols-outlined text-sm">check</span>}
                      Done
                    </button>
                  ) : (
                    <button onClick={() => toggleTask(task)} disabled={saving === task.id}
                      className={cn(
                        'px-3 md:px-5 py-1.5 rounded-lg font-bold text-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap',
                        isPast
                          ? 'bg-status-amber text-surface-container-lowest'
                          : 'bg-primary text-surface-container-lowest'
                      )}>
                      {saving === task.id ? <Loader2 className="w-4 h-4 animate-spin" /> : isPast ? 'Complete' : 'Mark Done'}
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-border-subtle">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-4">
                      {task.chapter && (
                        <div>
                          <span className="font-label-mono text-[10px] text-text-tertiary uppercase block mb-1">Reference Material</span>
                          <div className="bg-surface-container p-3 rounded-lg border border-border-subtle flex items-start gap-3">
                            <span className="material-symbols-outlined text-secondary mt-0.5">auto_stories</span>
                            <div>
                              <p className="text-sm text-text-secondary leading-relaxed">{task.detail}</p>
                              <p className="font-label-mono text-[11px] text-primary mt-1 italic">{task.chapter}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {!task.chapter && task.detail && (
                        <div>
                          <span className="font-label-mono text-[10px] text-text-tertiary uppercase block mb-1">Instructions</span>
                          <p className="text-sm text-text-secondary leading-relaxed">{task.detail}</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {task.searchQuery && (
                        <div>
                          <span className="font-label-mono text-[10px] text-text-tertiary uppercase block mb-1">YouTube Search</span>
                          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(task.searchQuery)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold text-status-red hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">search</span>
                            SEARCH ON YOUTUBE
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </a>
                        </div>
                      )}
                      {syncs && (
                        <div className="flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-lg px-3 py-2 text-[10px] font-label-mono text-primary/70">
                          <span>↗</span>
                          <span>Completing this {isPast ? 'still counts toward' : 'updates'} your overall progress bar.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DayNavBar({ dayNumber, currentDay }: { dayNumber: number; currentDay?: number }) {
  const isToday  = dayNumber === currentDay
  const hasPrev  = dayNumber > 1
  const hasNext  = currentDay ? dayNumber < currentDay : false

  return (
    <div className="flex items-center justify-between mb-6 md:mb-8">
      <Link href={hasPrev ? `/dashboard/daily/${dayNumber - 1}` : '#'}
        className={cn(
          'flex items-center gap-2 font-label-mono text-label-mono transition-colors',
          hasPrev ? 'text-text-secondary hover:text-primary' : 'text-text-tertiary pointer-events-none opacity-30'
        )}>
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="hidden sm:inline">← DAY {dayNumber - 1}</span>
        <span className="sm:hidden">Prev</span>
      </Link>

      <div className="flex items-center gap-2 md:gap-4">
        {!isToday && (
          <Link href="/dashboard/daily"
            className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 md:px-4 py-2 hover:bg-primary/15 transition-all"
            style={{ boxShadow: '0 0 15px rgba(46,216,195,0.15)' }}>
            <span className="material-symbols-outlined text-primary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <span className="text-primary font-bold text-xs md:text-sm tracking-wide">GO TO TODAY</span>
          </Link>
        )}
        <Link href="/dashboard/calendar"
          className="flex items-center gap-1.5 border border-border-subtle rounded-full px-3 py-2 text-text-secondary hover:text-primary hover:border-primary/30 transition-all">
          <span className="material-symbols-outlined text-sm">calendar_month</span>
          <span className="hidden md:inline font-label-caps text-label-caps">Calendar</span>
        </Link>
      </div>

      <Link href={hasNext ? `/dashboard/daily/${dayNumber + 1}` : '#'}
        className={cn(
          'flex items-center gap-2 font-label-mono text-label-mono transition-colors',
          hasNext ? 'text-text-secondary hover:text-primary' : 'text-text-tertiary pointer-events-none opacity-30'
        )}>
        <span className="hidden sm:inline">DAY {dayNumber + 1} →</span>
        <span className="sm:hidden">Next</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </Link>
    </div>
  )
}
