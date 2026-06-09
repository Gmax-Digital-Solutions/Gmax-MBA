'use client'
import { useState, useEffect } from 'react'
import { DAILY_PLAN } from '@/lib/data/daily-plan'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const moodOptions = [
  { value: 'focused',    emoji: '🎯', label: 'Focused'    },
  { value: 'creative',   emoji: '💡', label: 'Creative'   },
  { value: 'balanced',   emoji: '⚖️', label: 'Balanced'   },
  { value: 'challenged', emoji: '🌪️', label: 'Challenged' },
  { value: 'drained',    emoji: '🔋', label: 'Drained'    },
]

export default function JournalPage() {
  const today = new Date().toISOString().split('T')[0]

  const [entries, setEntries]         = useState<any[]>([])
  const [todayEntry, setTodayEntry]   = useState('')
  const [todayMood, setTodayMood]     = useState('')
  const [saving, setSaving]           = useState(false)
  const [search, setSearch]           = useState('')
  const [selected, setSelected]       = useState<any | null>(null)
  const [loading, setLoading]         = useState(true)
  const [currentDay, setCurrentDay]   = useState(1)
  const [daysStreak, setDaysStreak]   = useState(0)

  useEffect(() => {
    Promise.all([
      fetch('/api/journal').then(r => r.json()),
      fetch(`/api/journal?date=${today}`).then(r => r.json()),
      fetch('/api/users/me').then(r => r.json()),
    ]).then(([all, todayEnt, user]) => {
      const allEntries = Array.isArray(all) ? all : []
      setEntries(allEntries)
      if (todayEnt?.content) { setTodayEntry(todayEnt.content); setTodayMood(todayEnt.mood || '') }
      if (user?.enrolledAt) {
        const dayNum = Math.floor((Date.now() - new Date(user.enrolledAt).getTime()) / 86400000) + 1
        setCurrentDay(dayNum)
      }
      // Calculate streak
      let streak = 0
      const now = new Date()
      for (let i = 0; i < 365; i++) {
        const d = new Date(now); d.setDate(d.getDate() - i)
        const ds = d.toISOString().split('T')[0]
        if (allEntries.find((e: any) => e.date === ds)) streak++
        else break
      }
      setDaysStreak(streak)
      setLoading(false)
    })
  }, [today])

  async function saveTodayJournal() {
    if (!todayEntry.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/journal', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, day: currentDay, content: todayEntry, mood: todayMood }),
      })
      const data = await res.json()
      setEntries(prev => {
        const filtered = prev.filter((e: any) => e.date !== today)
        return [data, ...filtered]
      })
      toast.success('Entry saved!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  async function deleteEntry(date: string) {
    try {
      await fetch('/api/journal', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date }),
      })
      setEntries(prev => prev.filter((e: any) => e.date !== date))
      if (selected?.date === date) setSelected(null)
      toast.success('Entry deleted')
    } catch { toast.error('Failed to delete') }
  }

  const todayPlan   = DAILY_PLAN.find(p => p.day === currentDay)
  const filtered    = entries.filter((e: any) =>
    e.content?.toLowerCase().includes(search.toLowerCase()) || e.date?.includes(search)
  )
  const totalWords  = entries.reduce((acc: number, e: any) => acc + (e.content?.split(' ').length || 0), 0)

  // Mood bar percentages
  const moodCounts  = moodOptions.map(m => ({
    ...m,
    count: entries.filter((e: any) => e.mood === m.value).length,
  }))
  const totalMoods  = moodCounts.reduce((a, m) => a + m.count, 0)

  const moodBarColors: Record<string, string> = {
    focused: 'bg-status-amber', creative: 'bg-primary',
    balanced: 'bg-text-tertiary', challenged: 'bg-status-red', drained: 'bg-secondary',
  }

  return (
    <div className="max-w-container-max mx-auto">
      <div className="grid grid-cols-12 gap-gutter">

        {/* ── LEFT COLUMN (today + entry) ───────────────────────────── */}
        <div className="col-span-12 lg:col-span-8 space-y-8">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-text-primary">Daily Journal</h2>
              <p className="font-label-mono text-label-mono text-status-amber mt-1">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2 text-text-tertiary">
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span className="font-label-mono text-label-mono">Streak: {daysStreak} Days</span>
            </div>
          </header>

          {/* Today's entry card */}
          <section className="glass-surface p-6 md:p-8 rounded-xl space-y-6">

            {/* Card header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-status-amber/10 flex items-center justify-center text-status-amber flex-shrink-0">
                  <span className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}>edit_square</span>
                </div>
                <div>
                  <h3 className="font-body-lg text-body-lg font-semibold text-text-primary">Today's Entry</h3>
                  <p className="font-body-sm text-body-sm text-text-tertiary">Capturing your learning & decisions.</p>
                </div>
              </div>
              {todayPlan && (
                <div className="bg-surface-container px-3 md:px-4 py-2 rounded-full border border-border-subtle flex-shrink-0">
                  <span className="font-label-mono text-label-mono text-status-amber text-[10px] md:text-xs">
                    Day {currentDay} · {todayPlan.title}
                  </span>
                </div>
              )}
            </div>

            {/* Mood selector */}
            <div className="space-y-3">
              <p className="font-label-caps text-label-caps text-text-secondary">Current Cognitive State</p>
              <div className="flex gap-2 md:gap-4 flex-wrap">
                {moodOptions.map(m => (
                  <button key={m.value} onClick={() => setTodayMood(todayMood === m.value ? '' : m.value)}
                    title={m.label}
                    className={cn(
                      'w-11 h-11 md:w-12 md:h-12 rounded-lg border transition-all flex items-center justify-center text-xl',
                      todayMood === m.value
                        ? 'bg-status-amber/10 border-status-amber grayscale-0'
                        : 'bg-surface-container border-transparent hover:bg-status-amber/10 hover:border-status-amber grayscale hover:grayscale-0'
                    )}>
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection prompt */}
            {todayPlan?.tasks.find(t => t.type === 'reflect') && (
              <p className="italic font-headline-sm text-xl md:text-headline-sm text-text-secondary opacity-70 leading-relaxed">
                "{todayPlan.tasks.find(t => t.type === 'reflect')!.detail}"
              </p>
            )}

            {/* Textarea */}
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={todayEntry}
                  onChange={e => setTodayEntry(e.target.value)}
                  placeholder="Start writing your reflection here..."
                  className="w-full h-64 md:h-80 bg-surface-container border border-border-subtle rounded-lg p-5 md:p-6 font-label-mono text-body-md focus:ring-1 focus:ring-status-amber focus:border-status-amber transition-all resize-none custom-scrollbar text-text-primary placeholder:text-text-tertiary outline-none"
                />
                <div className="absolute bottom-3 md:bottom-4 right-4 md:right-6 font-label-mono text-label-mono text-text-tertiary">
                  {todayEntry.length.toLocaleString()} chars
                </div>
              </div>
            </div>

            {/* Save action */}
            <div className="flex justify-end pt-2 md:pt-4">
              <button onClick={saveTodayJournal} disabled={saving || !todayEntry.trim()}
                className="bg-status-amber text-black px-8 md:px-10 py-3.5 md:py-4 rounded-lg font-label-caps text-label-caps tracking-widest hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <span className="material-symbols-outlined text-[18px]">save</span>
                )}
                Save Entry
              </button>
            </div>
          </section>

          {/* Selected entry full view (mobile) */}
          {selected && (
            <section className="glass-surface p-6 rounded-xl lg:hidden space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono text-text-tertiary">{selected.date}</span>
                <div className="flex items-center gap-3">
                  {moodOptions.find(m => m.value === selected.mood) && (
                    <span className="text-xl">{moodOptions.find(m => m.value === selected.mood)!.emoji}</span>
                  )}
                  <button onClick={() => deleteEntry(selected.date)} className="text-text-tertiary hover:text-status-red transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
              {DAILY_PLAN.find(p => p.day === selected.day) && (
                <p className="font-label-mono text-label-mono text-status-amber text-xs">
                  Day {selected.day} · {DAILY_PLAN.find(p => p.day === selected.day)!.title}
                </p>
              )}
              <p className="font-body-md text-body-md text-text-primary leading-relaxed whitespace-pre-wrap">{selected.content}</p>
              <button onClick={() => setSelected(null)} className="font-label-caps text-label-caps text-text-tertiary hover:text-text-primary transition-colors text-xs">
                CLOSE
              </button>
            </section>
          )}
        </div>

        {/* ── RIGHT COLUMN ──────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">

          {/* Past reflections */}
          <section className="glass-surface rounded-xl flex flex-col" style={{ height: '500px' }}>
            <div className="p-5 md:p-6 border-b border-border-subtle flex-shrink-0">
              <h3 className="font-headline-sm text-headline-sm text-text-primary mb-4">Past Reflections</h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary text-[20px]">search</span>
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search archive..."
                  className="w-full bg-surface-container border border-border-subtle rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm text-text-primary focus:ring-1 focus:ring-status-amber focus:border-status-amber transition-all outline-none placeholder:text-text-tertiary" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-3 md:space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-3xl text-text-tertiary block mb-2">edit_note</span>
                  <p className="font-body-sm text-body-sm text-text-tertiary">No entries yet. Start writing today.</p>
                </div>
              ) : (
                filtered.map((entry: any) => {
                  const mood = moodOptions.find(m => m.value === entry.mood)
                  const isSelected = selected?.date === entry.date
                  return (
                    <div key={entry.id}
                      onClick={() => setSelected(isSelected ? null : entry)}
                      className={cn(
                        'p-4 rounded-lg border transition-all cursor-pointer group',
                        isSelected
                          ? 'bg-status-amber/5 border-status-amber/30'
                          : 'bg-surface-container/50 border-border-subtle hover:bg-surface-container hover:border-border-hover'
                      )}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-surface-container rounded text-[10px] font-label-mono text-text-secondary uppercase">
                          {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <div className="flex items-center gap-2">
                          {mood && <span className="text-lg">{mood.emoji}</span>}
                          <button
                            onClick={e => { e.stopPropagation(); deleteEntry(entry.date) }}
                            className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-status-red transition-all">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-primary line-clamp-2 leading-relaxed">
                        {entry.content}
                      </p>
                      {DAILY_PLAN.find(p => p.day === entry.day) && (
                        <p className="font-label-mono text-[10px] text-text-tertiary mt-1.5">
                          Day {entry.day} · {DAILY_PLAN.find(p => p.day === entry.day)!.title}
                        </p>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </section>

          {/* Selected entry full view (desktop) */}
          {selected && (
            <section className="glass-surface p-5 md:p-6 rounded-xl hidden lg:block space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono text-text-tertiary">{selected.date}</span>
                <div className="flex items-center gap-3">
                  {moodOptions.find(m => m.value === selected.mood) && (
                    <span className="text-lg">{moodOptions.find(m => m.value === selected.mood)!.emoji}</span>
                  )}
                  <button onClick={() => deleteEntry(selected.date)} className="text-text-tertiary hover:text-status-red transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
              {DAILY_PLAN.find(p => p.day === selected.day) && (
                <p className="font-label-mono text-label-mono text-status-amber text-[10px]">
                  Day {selected.day} · {DAILY_PLAN.find(p => p.day === selected.day)!.title}
                </p>
              )}
              <p className="font-body-sm text-body-sm text-text-primary leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar">
                {selected.content}
              </p>
            </section>
          )}

          {/* Journal analytics */}
          <section className="glass-surface p-5 md:p-6 rounded-xl space-y-5 md:space-y-6">
            <h3 className="font-label-caps text-label-caps text-text-secondary">Journal Analytics</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: 'Total Entries', val: entries.length },
                { label: 'Total Words',   val: totalWords > 999 ? `${(totalWords / 1000).toFixed(1)}k` : totalWords },
              ].map(s => (
                <div key={s.label} className="bg-surface-container rounded-lg p-3 md:p-4 border border-border-subtle">
                  <p className="font-label-mono text-label-mono text-text-tertiary">{s.label}</p>
                  <p className="font-headline-sm text-headline-sm text-status-amber mt-1">{s.val}</p>
                </div>
              ))}
            </div>

            {/* Mood bar */}
            <div className="space-y-3">
              <p className="font-label-mono text-[10px] text-text-tertiary uppercase">Mood Distribution</p>
              <div className="h-2 w-full flex rounded-full overflow-hidden gap-px">
                {totalMoods === 0 ? (
                  <div className="h-full bg-surface-container w-full rounded-full" />
                ) : moodCounts.filter(m => m.count > 0).map(m => (
                  <div key={m.value}
                    className={cn('h-full transition-all', moodBarColors[m.value])}
                    style={{ width: `${(m.count / totalMoods) * 100}%` }}
                    title={`${m.label}: ${m.count}`} />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {moodCounts.filter(m => m.count > 0).map(m => (
                  <div key={m.value} className="flex items-center gap-1.5">
                    <span className={cn('w-1.5 h-1.5 rounded-full', moodBarColors[m.value])} />
                    <span className="font-label-mono text-[10px] text-text-tertiary">{m.emoji} {m.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Decorative quote */}
          <div className="p-6 md:p-8 text-center">
            <p className="font-body-sm text-body-sm italic text-text-tertiary">
              "The unexamined life is not worth living."
              <span className="block mt-2 not-italic font-label-caps text-[10px]">— Socrates</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
