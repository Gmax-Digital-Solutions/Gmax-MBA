'use client'
import { useState, useEffect } from 'react'
import { PenLine, Loader2, Trash2, Calendar, BookOpen, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { DAILY_PLAN } from '@/lib/data/daily-plan'

const moodOptions = [
  { value: 'great', emoji: '🔥', label: 'Great', color: 'text-orange-400 border-orange-400/30 bg-orange-400/10' },
  { value: 'good',  emoji: '😊', label: 'Good',  color: 'text-[#2ed8c3] border-[#2ed8c3]/30 bg-[#2ed8c3]/10' },
  { value: 'okay',  emoji: '😐', label: 'Okay',  color: 'text-amber-400 border-amber-400/30 bg-amber-400/10'  },
  { value: 'tough', emoji: '😤', label: 'Tough', color: 'text-[#585de1] border-[#585de1]/30 bg-[#585de1]/10'  },
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

  useEffect(() => {
    Promise.all([
      fetch('/api/journal').then(r => r.json()),
      fetch(`/api/journal?date=${today}`).then(r => r.json()),
      fetch('/api/users/me').then(r => r.json()),
    ]).then(([all, todayEnt, user]) => {
      setEntries(Array.isArray(all) ? all : [])
      if (todayEnt) { setTodayEntry(todayEnt.content || ''); setTodayMood(todayEnt.mood || '') }
      if (user?.enrolledAt) {
        const dayNum = Math.floor((Date.now() - new Date(user.enrolledAt).getTime()) / 86400000) + 1
        setCurrentDay(dayNum)
      }
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
        const filtered = prev.filter(e => e.date !== today)
        return [data, ...filtered]
      })
      toast.success('Journal saved!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  async function deleteEntry(date: string) {
    try {
      await fetch('/api/journal', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date }) })
      setEntries(prev => prev.filter(e => e.date !== date))
      if (selected?.date === date) setSelected(null)
      toast.success('Entry deleted')
    } catch { toast.error('Failed to delete') }
  }

  const todayPlan = DAILY_PLAN.find(p => p.day === currentDay)
  const filtered = entries.filter(e => e.content?.toLowerCase().includes(search.toLowerCase()) || e.date?.includes(search))

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-1">Learning Journal</h1>
        <p className="text-[#a0a0b0] text-sm">Capture insights, reflections, and ideas from every study session.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT — today's entry + list */}
        <div className="col-span-2 space-y-5">

          {/* TODAY */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PenLine className="w-4 h-4 text-amber-400" />
                <h2 className="font-display text-base font-bold text-white">Today's Entry</h2>
                <span className="text-xs text-[#706870] font-mono">{today}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#706870] mr-1">Mood:</span>
                {moodOptions.map(m => (
                  <button key={m.value} onClick={() => setTodayMood(m.value === todayMood ? '' : m.value)}
                    className={cn('text-base transition-all hover:scale-110', todayMood === m.value ? 'opacity-100 scale-110' : 'opacity-35 hover:opacity-70')}
                    title={m.label}>
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>

            {todayPlan && (
              <div className="mb-3 flex items-center gap-2 text-xs text-[#706870] bg-white/[0.03] rounded-xl px-3 py-2 border border-white/[0.05]">
                <BookOpen className="w-3 h-3 text-[#2ed8c3]" />
                <span>Day {todayPlan.day} · {todayPlan.title}</span>
                {todayPlan.tasks.find(t => t.type === 'reflect') && (
                  <span className="ml-auto text-amber-400 italic">
                    "{todayPlan.tasks.find(t => t.type === 'reflect')!.detail.slice(0, 60)}..."
                  </span>
                )}
              </div>
            )}

            <textarea
              value={todayEntry}
              onChange={e => setTodayEntry(e.target.value)}
              placeholder={`What did you learn today?\nHow does it apply to your business?\nWhat will you do differently?`}
              className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-amber-500/30 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#504850] outline-none resize-none min-h-[160px] leading-relaxed transition-colors"
            />

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-[#706870]">{todayEntry.length} characters</span>
              <button onClick={saveTodayJournal} disabled={saving || !todayEntry.trim()}
                className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-40">
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '✍️'} Save Entry
              </button>
            </div>
          </div>

          {/* PAST ENTRIES */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-white">All Entries</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#706870]" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search entries..."
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-[#504850] outline-none w-44 focus:border-white/15 transition-colors" />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-[#706870]" /></div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-8 text-[#706870] text-sm">No journal entries yet. Start writing today.</div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {filtered.map(entry => {
                  const moodOpt = moodOptions.find(m => m.value === entry.mood)
                  const dayPlan = DAILY_PLAN.find(p => p.day === entry.day)
                  return (
                    <button key={entry.id} onClick={() => setSelected(selected?.id === entry.id ? null : entry)}
                      className={cn('w-full text-left p-4 rounded-xl border transition-all',
                        selected?.id === entry.id ? 'border-[#585de1]/30 bg-[#585de1]/8' : 'border-white/[0.05] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]')}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-[#706870]" />
                          <span className="text-xs font-mono text-[#a0a0b0]">{entry.date}</span>
                          {dayPlan && <span className="text-[10px] text-[#706870]">· Day {entry.day} — {dayPlan.title}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          {moodOpt && <span className="text-sm">{moodOpt.emoji}</span>}
                          <button onClick={e => { e.stopPropagation(); deleteEntry(entry.date) }}
                            className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center text-[#706870] hover:text-red-400 transition-all">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#a0a0b0] leading-relaxed line-clamp-2">{entry.content}</p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — selected entry detail */}
        <div className="space-y-4">
          {selected ? (
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sticky top-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#a0a0b0]">{selected.date}</span>
                <div className="flex items-center gap-2">
                  {moodOptions.find(m => m.value === selected.mood) && (
                    <span className={cn('text-xs px-2 py-0.5 rounded-full border font-semibold', moodOptions.find(m => m.value === selected.mood)!.color)}>
                      {moodOptions.find(m => m.value === selected.mood)!.emoji} {moodOptions.find(m => m.value === selected.mood)!.label}
                    </span>
                  )}
                  <button onClick={() => deleteEntry(selected.date)} className="text-[#706870] hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {DAILY_PLAN.find(p => p.day === selected.day) && (
                <div className="text-xs text-[#2ed8c3] mb-3 font-semibold">
                  Day {selected.day} · {DAILY_PLAN.find(p => p.day === selected.day)!.title}
                </div>
              )}
              <p className="text-sm text-[#d0d0d0] leading-relaxed whitespace-pre-wrap">{selected.content}</p>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 text-center">
              <PenLine className="w-8 h-8 text-[#504850] mx-auto mb-3" />
              <p className="text-sm text-[#706870]">Select an entry to read it in full</p>
            </div>
          )}

          {/* STATS */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-[#706870] uppercase tracking-wider mb-3">Journal Stats</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0b0]">Total entries</span>
                <span className="text-white font-bold">{entries.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0b0]">Total words</span>
                <span className="text-white font-bold">{entries.reduce((acc, e) => acc + (e.content?.split(' ').length || 0), 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0b0]">Mood breakdown</span>
                <div className="flex gap-1">
                  {moodOptions.map(m => {
                    const count = entries.filter(e => e.mood === m.value).length
                    return count > 0 ? <span key={m.value} className="text-xs">{m.emoji} {count}</span> : null
                  })}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0b0]">Avg entry length</span>
                <span className="text-white font-bold">
                  {entries.length > 0 ? Math.round(entries.reduce((acc, e) => acc + (e.content?.length || 0), 0) / entries.length) : 0} chars
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
