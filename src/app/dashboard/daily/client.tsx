'use client'
import { useState } from 'react'
import { DayPlan, DayTask } from '@/lib/data/daily-plan'
import { BookOpen, Youtube, CheckSquare, PenLine, ExternalLink, Loader2, ChevronDown, ChevronUp, Clock, Flame, ArrowLeft, ArrowRight, CalendarDays, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const typeConfig = {
  read:    { icon: BookOpen,    color: 'text-[#2ed8c3]', bg: 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20', label: 'Read'    },
  watch:   { icon: Youtube,     color: 'text-red-400',   bg: 'bg-red-500/10 border-red-500/20',       label: 'Watch'   },
  task:    { icon: CheckSquare, color: 'text-[#585de1]', bg: 'bg-[#585de1]/10 border-[#585de1]/20',  label: 'Task'    },
  reflect: { icon: PenLine,     color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20',   label: 'Journal' },
}

const moodOptions = [
  { value: 'great', emoji: '🔥', label: 'Great' },
  { value: 'good',  emoji: '😊', label: 'Good'  },
  { value: 'okay',  emoji: '😐', label: 'Okay'  },
  { value: 'tough', emoji: '😤', label: 'Tough' },
]

export function DailyClient({ plan, initialDailyTasks, initialJournalEntry, today, dayNumber, userName, isPast = false, isToday = true, isFuture = false, currentDay }: {
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
  const router = useRouter()
  const [tasks, setTasks]               = useState(initialDailyTasks)
  const [journal, setJournal]           = useState(initialJournalEntry?.content || '')
  const [mood, setMood]                 = useState(initialJournalEntry?.mood || '')
  const [saving, setSaving]             = useState<string | null>(null)
  const [savingJournal, setSavingJournal] = useState(false)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">Program complete!</h2>
        <p className="text-[#a0a0b0] mb-6">You've finished the structured program. Keep going with the curriculum at your own pace.</p>
        <Link href="/dashboard/curriculum" className="flex items-center gap-2 bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-[#2ed8c3]/20">
          Browse Curriculum →
        </Link>
      </div>
    )
  }

  // Future day — locked
  if (isFuture) {
    return (
      <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
        <DayNavBar dayNumber={dayNumber} currentDay={currentDay} plan={plan} />
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 text-center">
          <Lock className="w-10 h-10 text-[#504850] mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-white mb-2">Day {dayNumber} is coming</h2>
          <p className="text-[#a0a0b0] text-sm mb-2">This day hasn't arrived yet.</p>
          <p className="text-[#606070] text-xs mb-6">Focus on today's plan first — the program is designed to build knowledge sequentially.</p>
          <Link href="/dashboard/daily" className="inline-flex items-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-6 py-3 rounded-xl text-sm transition-all">
            Go to Today — Day {currentDay}
          </Link>
        </div>
      </div>
    )
  }

  const isTaskDone     = (taskId: string) => tasks.find(t => t.taskId === taskId && t.done)
  const completedCount = plan.tasks.filter(t => isTaskDone(t.id)).length
  const allDone        = completedCount === plan.tasks.length

  async function toggleTask(task: DayTask) {
    setSaving(task.id)
    const nowDone = !isTaskDone(task.id)
    try {
      const res = await fetch('/api/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day:            plan!.day,
          taskId:         task.id,
          done:           nowDone,
          moduleId:       task.moduleId       || null,
          progressTaskId: task.progressTaskId || null,
          progressBookId: task.progressBookId || null,
        }),
      })
      const data = await res.json()
      setTasks(prev => [...prev.filter(t => t.taskId !== task.id), data])
      if (nowDone) toast.success(isPast ? '✅ Marked done — progress updated!' : task.progressTaskId || task.progressBookId ? '✅ Done — progress bar updated!' : '✅ Nicely done!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(null) }
  }

  async function saveJournal() {
    if (!journal.trim()) return
    setSavingJournal(true)
    try {
      await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, day: plan!.day, content: journal, mood }),
      })
      toast.success('Journal saved!')
    } catch { toast.error('Failed to save journal') }
    finally { setSavingJournal(false) }
  }

  const greetHour = new Date().getHours()
  const greeting  = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">

      {/* Day navigation bar */}
      <DayNavBar dayNumber={dayNumber} currentDay={currentDay} plan={plan} />

      {/* Past day banner */}
      {isPast && (
        <div className="flex items-center gap-3 bg-amber-500/8 border border-amber-500/20 rounded-xl px-4 py-3">
          <CalendarDays className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-amber-400 text-sm font-semibold">Past Day</span>
            <span className="text-[#a0a0b0] text-sm"> — You can still complete tasks and update your journal.</span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6">
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="min-w-0">
            <p className="text-[#706870] text-xs mb-1">
              {isToday ? `${greeting}, ${userName.split(' ')[0]}` : isPast ? `Day ${dayNumber} — Past` : `Day ${dayNumber}`}
              {' · '}{new Date(today + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">{plan.title}</h1>
            <p className="text-[#a0a0b0] text-xs md:text-sm mt-1 line-clamp-1">{plan.focus}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 justify-end mb-0.5">
              <Flame className={cn('w-3 h-3', isPast ? 'text-amber-400' : 'text-[#2ed8c3]')} />
              <span className={cn('text-xs font-mono font-bold', isPast ? 'text-amber-400' : 'text-[#2ed8c3]')}>Day {plan.day}</span>
            </div>
            <div className="text-[10px] text-[#706870]">Week {plan.week} · Phase {plan.phase}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-[#706870] mb-1.5">
            <span>{isPast ? 'Completed tasks' : "Today's progress"}</span>
            <span className={cn('font-semibold', allDone ? 'text-[#2ed8c3]' : isPast ? 'text-amber-400' : 'text-[#2ed8c3]')}>
              {completedCount}/{plan.tasks.length} done
            </span>
          </div>
          <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', allDone ? 'bg-[#2ed8c3]' : isPast ? 'bg-amber-500' : 'bg-gradient-to-r from-[#2ed8c3] to-[#585de1]')}
              style={{ width: `${(completedCount / plan.tasks.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-[10px] text-[#504850] mt-2">
          ✓ Completing tasks here {isPast ? 'still updates' : 'automatically updates'} your overall program progress bar
        </p>

        {allDone && (
          <div className="mt-3 bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 rounded-xl px-4 py-2.5 text-center">
            <span className="text-[#2ed8c3] font-semibold text-sm">🎉 All tasks complete for Day {plan.day}!</span>
          </div>
        )}
      </div>

      {/* TASK LIST */}
      <div className="space-y-3">
        {plan.tasks.map((task, idx) => {
          const cfg      = typeConfig[task.type]
          const done     = !!isTaskDone(task.id)
          const expanded = expandedTask === task.id
          const Icon     = cfg.icon
          const syncs    = !!(task.progressTaskId || task.progressBookId)

          return (
            <div key={task.id}
              className={cn('border rounded-2xl overflow-hidden transition-all',
                done ? 'border-[#2ed8c3]/20 bg-[#2ed8c3]/4' : 'border-white/[0.07] bg-white/[0.02]')}>

              <div className="flex items-center gap-2 md:gap-4 p-3 md:p-5">
                {/* Step number */}
                <div className={cn(
                  'flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold border',
                  done ? 'bg-[#2ed8c3] border-[#2ed8c3] text-[#241e20]' : 'border-white/10 text-[#706870]'
                )}>
                  {done ? '✓' : idx + 1}
                </div>

                {/* Type badge */}
                <div className={cn('hidden sm:flex flex-shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold', cfg.bg, cfg.color)}>
                  <Icon className="w-3 h-3" />
                  {cfg.label}
                </div>

                {/* Label + detail */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('text-sm font-semibold', done ? 'text-[#706870] line-through' : 'text-white')}>
                      {task.label}
                    </span>
                    <span className={cn('sm:hidden text-[10px] px-1.5 py-0.5 rounded border font-semibold', cfg.bg, cfg.color)}>
                      {cfg.label}
                    </span>
                    {task.duration && (
                      <span className="hidden md:flex items-center gap-1 text-[10px] text-[#706870] bg-white/[0.04] px-2 py-0.5 rounded-full">
                        <Clock className="w-2.5 h-2.5" />{task.duration}
                      </span>
                    )}
                    {syncs && !done && (
                      <span className="hidden sm:inline text-[10px] text-[#2ed8c3]/60 bg-[#2ed8c3]/8 border border-[#2ed8c3]/15 px-2 py-0.5 rounded-full">
                        syncs to progress
                      </span>
                    )}
                  </div>
                  <p className={cn('text-xs mt-0.5 truncate', done ? 'text-[#504850]' : 'text-[#a0a0b0]')}>
                    {task.chapter || task.searchQuery || task.detail.slice(0, 55) + '...'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => setExpandedTask(expanded ? null : task.id)}
                    className="w-7 h-7 rounded-lg border border-white/[0.07] hover:border-white/15 flex items-center justify-center text-[#706870] hover:text-white transition-all">
                    {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => toggleTask(task)} disabled={saving === task.id}
                    className={cn(
                      'px-2.5 md:px-3 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap',
                      done
                        ? 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20 text-[#2ed8c3]'
                        : isPast
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
                          : 'bg-white/[0.04] border-white/[0.08] text-[#a0a0b0] hover:border-[#2ed8c3]/30 hover:text-[#2ed8c3]'
                    )}>
                    {saving === task.id
                      ? <Loader2 className="w-3 h-3 animate-spin" />
                      : done ? '✓ Done' : isPast ? 'Complete' : 'Mark Done'}
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded && (
                <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-white/[0.06]">
                  <div className="pt-3 space-y-3">
                    {task.chapter && (
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#2ed8c3] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-[#706870] uppercase tracking-wider mb-0.5">Book Reference</div>
                          <div className="text-sm text-white font-medium">{task.detail}</div>
                          <div className="text-xs text-[#2ed8c3] mt-1 font-mono">{task.chapter}</div>
                        </div>
                      </div>
                    )}
                    {task.searchQuery && (
                      <div className="flex items-start gap-2">
                        <Youtube className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-[#706870] uppercase tracking-wider mb-0.5">YouTube Search</div>
                          <div className="text-sm text-white mb-2">{task.detail}</div>
                          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(task.searchQuery)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                            <ExternalLink className="w-3 h-3" /> Search on YouTube →
                          </a>
                        </div>
                      </div>
                    )}
                    {task.type === 'task' && !task.searchQuery && (
                      <div className="flex items-start gap-2">
                        <CheckSquare className="w-3.5 h-3.5 text-[#585de1] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-[#706870] uppercase tracking-wider mb-0.5">Your Task</div>
                          <div className="text-sm text-[#d0d0d0] leading-relaxed">{task.detail}</div>
                        </div>
                      </div>
                    )}
                    {task.type === 'reflect' && (
                      <div className="flex items-start gap-2">
                        <PenLine className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-[#706870] uppercase tracking-wider mb-0.5">Reflection Prompt</div>
                          <div className="text-sm text-[#d0d0d0] leading-relaxed italic">"{task.detail}"</div>
                        </div>
                      </div>
                    )}
                    {syncs && (
                      <div className="flex items-center gap-2 text-[10px] text-[#2ed8c3]/70 bg-[#2ed8c3]/8 border border-[#2ed8c3]/15 rounded-lg px-3 py-2">
                        <span>↗</span>
                        <span>Completing this {isPast ? 'still counts toward' : 'updates'} your overall program progress bar.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* JOURNAL */}
      <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-amber-400" />
            <h2 className="font-display text-base font-bold text-white">
              {isPast ? `Journal — Day ${plan.day}` : "Today's Journal"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#706870] hidden sm:inline">{isPast ? 'Edit your entry' : 'How was today?'}</span>
            {moodOptions.map(m => (
              <button key={m.value} onClick={() => setMood(m.value)}
                className={cn('text-lg transition-all hover:scale-110', mood === m.value ? 'opacity-100 scale-110' : 'opacity-40')}
                title={m.label}>
                {m.emoji}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={journal}
          onChange={e => setJournal(e.target.value)}
          placeholder={isPast
            ? `Day ${plan.day} — ${plan.title}\n\nLooking back: what did you learn? What can you apply now?`
            : `Day ${plan.day} — ${plan.title}\n\nWhat did I learn today? How does it apply to my business?`
          }
          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-[#504850] outline-none resize-none min-h-[120px] md:min-h-[140px] leading-relaxed transition-colors"
        />

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[#706870]">{journal.length} chars</span>
          <button onClick={saveJournal} disabled={savingJournal || !journal.trim()}
            className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-40">
            {savingJournal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '✍️'} {isPast ? 'Update Journal' : 'Save'}
          </button>
        </div>
      </div>

    </div>
  )
}

// ── DAY NAVIGATION BAR ────────────────────────────────────────────────────────
function DayNavBar({ dayNumber, currentDay, plan }: { dayNumber: number; currentDay?: number; plan: DayPlan }) {
  const isToday  = dayNumber === currentDay
  const hasPrev  = dayNumber > 1
  const hasNext  = currentDay ? dayNumber < currentDay : false

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Prev day */}
      <Link
        href={hasPrev ? `/dashboard/daily/${dayNumber - 1}` : '#'}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all',
          hasPrev
            ? 'border-white/[0.08] text-[#a0a0b0] hover:border-white/15 hover:text-white'
            : 'border-white/[0.04] text-[#404040] cursor-not-allowed pointer-events-none'
        )}>
        <ArrowLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Day {dayNumber - 1}</span>
        <span className="sm:hidden">Prev</span>
      </Link>

      {/* Centre — current day info */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        {!isToday && (
          <Link href="/dashboard/daily"
            className="flex items-center gap-1.5 text-xs text-[#2ed8c3] hover:text-[#5ee3d2] bg-[#2ed8c3]/8 border border-[#2ed8c3]/15 px-3 py-1.5 rounded-lg transition-all">
            <Flame className="w-3 h-3" />
            Go to Today (Day {currentDay})
          </Link>
        )}
        <Link href="/dashboard/calendar"
          className="flex items-center gap-1.5 text-xs text-[#706870] hover:text-[#a0a0b0] border border-white/[0.07] hover:border-white/15 px-3 py-1.5 rounded-lg transition-all">
          <CalendarDays className="w-3 h-3" />
          <span className="hidden sm:inline">Calendar</span>
        </Link>
      </div>

      {/* Next day */}
      <Link
        href={hasNext ? `/dashboard/daily/${dayNumber + 1}` : '#'}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all',
          hasNext
            ? 'border-white/[0.08] text-[#a0a0b0] hover:border-white/15 hover:text-white'
            : 'border-white/[0.04] text-[#404040] cursor-not-allowed pointer-events-none'
        )}>
        <span className="hidden sm:inline">Day {dayNumber + 1}</span>
        <span className="sm:hidden">Next</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}
