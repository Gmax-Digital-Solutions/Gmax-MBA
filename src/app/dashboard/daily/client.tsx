'use client'
import { useState } from 'react'
import { DayPlan, DayTask } from '@/lib/data/daily-plan'
import { BookOpen, Youtube, CheckSquare, PenLine, ExternalLink, Loader2, ChevronDown, ChevronUp, Clock, Flame } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

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

export function DailyClient({ plan, initialDailyTasks, initialJournalEntry, today, dayNumber, userName }: {
  plan: DayPlan | null
  initialDailyTasks: any[]
  initialJournalEntry: any
  today: string
  dayNumber: number
  userName: string
}) {
  const [tasks, setTasks]           = useState(initialDailyTasks)
  const [journal, setJournal]       = useState(initialJournalEntry?.content || '')
  const [mood, setMood]             = useState(initialJournalEntry?.mood || '')
  const [saving, setSaving]         = useState<string | null>(null)
  const [savingJournal, setSavingJournal] = useState(false)
  const [expandedTask, setExpandedTask]   = useState<string | null>(null)

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">You've completed the structured program!</h2>
        <p className="text-[#a0a0b0]">Keep going with the curriculum at your own pace.</p>
      </div>
    )
  }

  const isTaskDone = (taskId: string) => tasks.find(t => t.taskId === taskId && t.done)
  const completedCount = plan.tasks.filter(t => isTaskDone(t.id)).length
  const allDone = completedCount === plan.tasks.length

  async function toggleTask(task: DayTask) {
    setSaving(task.id)
    const done = !isTaskDone(task.id)
    try {
      const res = await fetch('/api/daily', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: plan!.day, taskId: task.id, done }),
      })
      const data = await res.json()
      setTasks(prev => {
        const filtered = prev.filter(t => t.taskId !== task.id)
        return [...filtered, data]
      })
      if (done) toast.success(task.type === 'reflect' ? '✍️ Journal task done!' : '✅ Nicely done!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(null) }
  }

  async function saveJournal() {
    if (!journal.trim()) return
    setSavingJournal(true)
    try {
      await fetch('/api/journal', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, day: plan!.day, content: journal, mood }),
      })
      toast.success('Journal saved!')
    } catch { toast.error('Failed to save journal') }
    finally { setSavingJournal(false) }
  }

  const greetHour = new Date().getHours()
  const greeting = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[#706870] text-xs mb-1">{greeting}, {userName.split(' ')[0]} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <h1 className="font-display text-2xl font-bold text-white">{plan.title}</h1>
            <p className="text-[#a0a0b0] text-sm mt-1">{plan.focus}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="flex items-center gap-1.5 justify-end mb-1">
              <Flame className="w-3.5 h-3.5 text-[#2ed8c3]" />
              <span className="text-xs font-mono font-bold text-[#2ed8c3]">Day {plan.day}</span>
            </div>
            <div className="text-xs text-[#706870]">Week {plan.week} · Phase {plan.phase}</div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-[#706870] mb-1.5">
            <span>Today's progress</span>
            <span className="text-[#2ed8c3] font-semibold">{completedCount}/{plan.tasks.length} done</span>
          </div>
          <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#2ed8c3] to-[#585de1] rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / plan.tasks.length) * 100}%` }} />
          </div>
        </div>

        {allDone && (
          <div className="mt-4 bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 rounded-xl px-4 py-3 text-center">
            <span className="text-[#2ed8c3] font-semibold text-sm">🎉 Day {plan.day} complete! Come back tomorrow for Day {plan.day + 1}.</span>
          </div>
        )}
      </div>

      {/* DAILY TASKS */}
      <div className="space-y-3">
        {plan.tasks.map((task, idx) => {
          const cfg = typeConfig[task.type]
          const done = !!isTaskDone(task.id)
          const expanded = expandedTask === task.id
          const Icon = cfg.icon

          return (
            <div key={task.id} className={cn('border rounded-2xl overflow-hidden transition-all', done ? 'border-[#2ed8c3]/20 bg-[#2ed8c3]/4' : 'border-white/[0.07] bg-white/[0.02]')}>
              {/* HEADER ROW */}
              <div className="flex items-center gap-4 p-5">
                {/* Step number */}
                <div className={cn('flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border',
                  done ? 'bg-[#2ed8c3] border-[#2ed8c3] text-[#241e20]' : 'border-white/10 text-[#706870]')}>
                  {done ? '✓' : idx + 1}
                </div>

                {/* Type badge */}
                <div className={cn('flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold', cfg.bg, cfg.color)}>
                  <Icon className="w-3 h-3" />
                  {cfg.label}
                </div>

                {/* Label + detail */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-sm font-semibold', done ? 'text-[#706870] line-through' : 'text-white')}>{task.label}</span>
                    {task.duration && (
                      <span className="flex items-center gap-1 text-[10px] text-[#706870] bg-white/[0.04] px-2 py-0.5 rounded-full">
                        <Clock className="w-2.5 h-2.5" />{task.duration}
                      </span>
                    )}
                  </div>
                  <p className={cn('text-xs mt-0.5 truncate', done ? 'text-[#504850]' : 'text-[#a0a0b0]')}>
                    {task.chapter || task.searchQuery || task.detail.slice(0, 70) + '...'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setExpandedTask(expanded ? null : task.id)}
                    className="w-7 h-7 rounded-lg border border-white/[0.07] hover:border-white/15 flex items-center justify-center text-[#706870] hover:text-white transition-all">
                    {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => toggleTask(task)} disabled={saving === task.id}
                    className={cn('px-3 py-1.5 rounded-lg text-xs font-bold transition-all border',
                      done ? 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20 text-[#2ed8c3]'
                           : 'bg-white/[0.04] border-white/[0.08] text-[#a0a0b0] hover:border-[#2ed8c3]/30 hover:text-[#2ed8c3]')}>
                    {saving === task.id ? <Loader2 className="w-3 h-3 animate-spin" /> : done ? 'Done ✓' : 'Mark Done'}
                  </button>
                </div>
              </div>

              {/* EXPANDED DETAIL */}
              {expanded && (
                <div className="px-5 pb-5 pt-0 border-t border-white/[0.06]">
                  <div className="pt-4 space-y-3">
                    {task.chapter && (
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#2ed8c3] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-[#706870] uppercase tracking-wider mb-0.5">Book Reference</div>
                          <div className="text-sm text-white">{task.detail}</div>
                          <div className="text-xs text-[#2ed8c3] mt-1 font-mono">{task.chapter}</div>
                        </div>
                      </div>
                    )}
                    {task.searchQuery && (
                      <div className="flex items-start gap-2">
                        <Youtube className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[10px] text-[#706870] uppercase tracking-wider mb-0.5">YouTube Search</div>
                          <div className="text-sm text-white mb-2">{task.detail}</div>
                          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(task.searchQuery)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                            <ExternalLink className="w-3 h-3" />
                            Search on YouTube: "{task.searchQuery}"
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
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* JOURNAL SECTION */}
      <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-amber-400" />
            <h2 className="font-display text-base font-bold text-white">Today's Journal</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#706870]">How was today?</span>
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
          placeholder={`Day ${plan.day} — ${plan.title}\n\nWhat did I learn today? How does it apply to my business? What will I do differently?`}
          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-[#504850] outline-none resize-none min-h-[140px] leading-relaxed transition-colors font-sans"
        />

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[#706870]">{journal.length} characters</span>
          <button onClick={saveJournal} disabled={savingJournal || !journal.trim()}
            className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-40">
            {savingJournal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '✍️'} Save Journal
          </button>
        </div>
      </div>

    </div>
  )
}
