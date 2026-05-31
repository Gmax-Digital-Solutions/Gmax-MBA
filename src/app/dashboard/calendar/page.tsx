'use client'
import { useState, useEffect } from 'react'
import { DAILY_PLAN } from '@/lib/data/daily-plan'
import { ChevronLeft, ChevronRight, BookOpen, Youtube, CheckSquare, PenLine, ArrowRight, Flame } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const MONTHS   = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS_DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const typeColors = {
  read:    'bg-[#2ed8c3]/80',
  watch:   'bg-red-400/80',
  task:    'bg-[#585de1]/80',
  reflect: 'bg-amber-400/80',
}
const typeIcons = {
  read:    BookOpen,
  watch:   Youtube,
  task:    CheckSquare,
  reflect: PenLine,
}

export default function CalendarPage() {
  const [today]        = useState(new Date())
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [enrolledAt, setEnrolledAt]   = useState<Date | null>(null)
  const [completedDays, setCompleted] = useState<Set<number>>(new Set())
  const [partialDays, setPartial]     = useState<Set<number>>(new Set())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [currentDay, setCurrentDay]   = useState(1)

  useEffect(() => {
    Promise.all([
      fetch('/api/users/me').then(r => r.json()),
      fetch('/api/daily').then(r => r.json()),
    ]).then(([user, tasks]) => {
      if (!user.enrolledAt) return
      const ea = new Date(user.enrolledAt)
      setEnrolledAt(ea)
      const cd = Math.floor((Date.now() - ea.getTime()) / 86400000) + 1
      setCurrentDay(cd)

      // Group tasks by day
      const byDay: Record<number, { total: number; done: number }> = {}
      ;(tasks as any[]).forEach((t: any) => {
        if (!byDay[t.day]) byDay[t.day] = { total: 0, done: 0 }
        byDay[t.day].total++
        if (t.done) byDay[t.day].done++
      })

      const done    = new Set<number>()
      const partial = new Set<number>()
      Object.entries(byDay).forEach(([day, { total, done: d }]) => {
        const dayNum = parseInt(day)
        // Get the plan's task count for this day
        const plan = DAILY_PLAN.find(p => p.day === dayNum)
        const planTotal = plan?.tasks.length || total
        if (d >= planTotal)      done.add(dayNum)
        else if (d > 0)          partial.add(dayNum)
      })
      setCompleted(done)
      setPartial(partial)
    })
  }, [])

  function getDayNumber(date: Date): number | null {
    if (!enrolledAt) return null
    const diff = Math.floor((date.getTime() - enrolledAt.getTime()) / 86400000)
    return diff >= 0 ? diff + 1 : null
  }

  function prevMonth() {
    setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 })
  }
  function nextMonth() {
    setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 })
  }

  const firstDay    = new Date(current.year, current.month, 1).getDay()
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate()
  const selectedPlan = selectedDay ? DAILY_PLAN.find(p => p.day === selectedDay) : null
  const isFuture    = (dayNum: number) => dayNum > currentDay
  const isPast      = (dayNum: number) => dayNum < currentDay
  const isTodayDay  = (dayNum: number) => dayNum === currentDay

  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Calendar</h1>
        <p className="text-[#a0a0b0] text-sm">Click any past or current day to open it and complete tasks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

        {/* ── CALENDAR ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 md:p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth}
              className="w-8 h-8 rounded-lg border border-white/[0.07] hover:border-white/15 flex items-center justify-center text-[#a0a0b0] hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-display text-lg font-bold text-white">{MONTHS[current.month]} {current.year}</h2>
            <button onClick={nextMonth}
              className="w-8 h-8 rounded-lg border border-white/[0.07] hover:border-white/15 flex items-center justify-center text-[#a0a0b0] hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_DOW.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-[#706870] uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}

            {Array(daysInMonth).fill(null).map((_, i) => {
              const d      = i + 1
              const date   = new Date(current.year, current.month, d)
              const dayNum = getDayNumber(date)
              const plan   = dayNum ? DAILY_PLAN.find(p => p.day === dayNum) : null
              const todayDate = date.toDateString() === today.toDateString()
              const future = dayNum ? isFuture(dayNum) : false
              const past   = dayNum ? isPast(dayNum)   : false
              const isSelected = dayNum === selectedDay
              const done   = dayNum ? completedDays.has(dayNum) : false
              const partial = dayNum ? partialDays.has(dayNum)  : false

              return (
                <button
                  key={d}
                  onClick={() => dayNum && plan && !future && setSelectedDay(isSelected ? null : dayNum)}
                  disabled={!plan || future}
                  className={cn(
                    'aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all text-sm relative',
                    todayDate ? 'bg-[#2ed8c3]/15 border-2 border-[#2ed8c3]/50 text-[#2ed8c3] font-bold' :
                    isSelected ? 'bg-[#585de1]/20 border border-[#585de1]/40 text-white' :
                    done      ? 'bg-[#2ed8c3]/10 border border-[#2ed8c3]/25 text-[#2ed8c3] hover:bg-[#2ed8c3]/15 cursor-pointer' :
                    partial   ? 'bg-amber-500/10 border border-amber-500/25 text-amber-400 hover:bg-amber-500/15 cursor-pointer' :
                    plan && !future ? 'hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/10 text-white cursor-pointer' :
                    future    ? 'text-[#404040] cursor-not-allowed opacity-40' :
                    'text-[#706870]'
                  )}>
                  <span className="text-xs leading-none">{d}</span>
                  {plan && !future && (
                    <div className="flex gap-0.5 mt-1">
                      {plan.tasks.slice(0, 3).map(t => (
                        <div key={t.id} className={cn('w-1 h-1 rounded-full', done ? 'bg-[#2ed8c3]' : typeColors[t.type])} />
                      ))}
                    </div>
                  )}
                  {/* Completion indicator */}
                  {done && (
                    <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#2ed8c3] flex items-center justify-center">
                      <span className="text-[#241e20] text-[6px] font-bold">✓</span>
                    </div>
                  )}
                  {partial && !done && (
                    <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.06] flex-wrap text-xs text-[#706870]">
            {[
              { dot: 'bg-[#2ed8c3]',   label: 'Complete'   },
              { dot: 'bg-amber-400',    label: 'In progress'},
              { dot: 'bg-[#585de1]',    label: 'Selected'   },
              { dot: 'bg-white/20',     label: 'Not started'},
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={cn('w-2 h-2 rounded-full', l.dot)} />{l.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── SIDE PANEL ────────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Selected day detail */}
          {selectedPlan ? (
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 md:p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className={cn('w-3.5 h-3.5', isTodayDay(selectedDay!) ? 'text-[#2ed8c3]' : 'text-amber-400')} />
                  <span className={cn('text-xs font-mono font-bold', isTodayDay(selectedDay!) ? 'text-[#2ed8c3]' : 'text-amber-400')}>
                    Day {selectedPlan.day}
                  </span>
                  {completedDays.has(selectedDay!) && (
                    <span className="text-[10px] bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] px-2 py-0.5 rounded-full font-semibold">
                      ✓ Complete
                    </span>
                  )}
                  {partialDays.has(selectedDay!) && !completedDays.has(selectedDay!) && (
                    <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-semibold">
                      In progress
                    </span>
                  )}
                  {isPast(selectedDay!) && !completedDays.has(selectedDay!) && !partialDays.has(selectedDay!) && (
                    <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-semibold">
                      Not done
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#606070]">Week {selectedPlan.week}</span>
              </div>

              <h3 className="font-display text-base font-bold text-white mb-0.5">{selectedPlan.title}</h3>
              <p className="text-xs text-[#a0a0b0] mb-4">{selectedPlan.focus}</p>

              {/* Task preview */}
              <div className="space-y-2 mb-4">
                {selectedPlan.tasks.map(task => {
                  const Icon = typeIcons[task.type]
                  const colors = {
                    read:    'text-[#2ed8c3]',
                    watch:   'text-red-400',
                    task:    'text-[#585de1]',
                    reflect: 'text-amber-400',
                  }
                  return (
                    <div key={task.id} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <Icon className={cn('w-3.5 h-3.5 flex-shrink-0 mt-0.5', colors[task.type])} />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white">{task.label}</div>
                        <div className="text-[11px] text-[#706870] mt-0.5 leading-relaxed truncate">
                          {task.chapter || task.searchQuery || task.detail.slice(0, 50)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA — open day */}
              <Link
                href={isTodayDay(selectedDay!) ? '/dashboard/daily' : `/dashboard/daily/${selectedDay}`}
                className={cn(
                  'w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl transition-all',
                  isTodayDay(selectedDay!)
                    ? 'bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] shadow-lg shadow-[#2ed8c3]/15'
                    : completedDays.has(selectedDay!)
                      ? 'bg-[#2ed8c3]/10 hover:bg-[#2ed8c3]/20 border border-[#2ed8c3]/20 text-[#2ed8c3]'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400'
                )}>
                {isTodayDay(selectedDay!)
                  ? <><Flame className="w-3.5 h-3.5" /> Open Today's Plan</>
                  : completedDays.has(selectedDay!)
                    ? <><ArrowRight className="w-3.5 h-3.5" /> Review Day {selectedDay}</>
                    : <><ArrowRight className="w-3.5 h-3.5" /> Complete Day {selectedDay}</>
                }
              </Link>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 text-center">
              <CalendarDaysEmpty />
              <p className="text-[#706070] text-sm">Click any past or current day to see its plan</p>
            </div>
          )}

          {/* Quick stats */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 md:p-5">
            <h3 className="text-xs font-semibold text-[#706870] uppercase tracking-wider mb-3">Your Progress</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Days completed',   val: completedDays.size,  color: 'text-[#2ed8c3]' },
                { label: 'Days in progress', val: partialDays.size,    color: 'text-amber-400' },
                { label: 'Current day',      val: `Day ${currentDay}`, color: 'text-white'     },
                { label: 'Days planned',     val: DAILY_PLAN.length,   color: 'text-[#a0a0b0]' },
              ].map(s => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span className="text-[#a0a0b0]">{s.label}</span>
                  <span className={cn('font-bold', s.color)}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Go to today shortcut */}
          <Link href="/dashboard/daily"
            className="w-full flex items-center justify-center gap-2 bg-[#2ed8c3]/10 hover:bg-[#2ed8c3]/20 border border-[#2ed8c3]/20 text-[#2ed8c3] text-xs font-semibold py-2.5 rounded-xl transition-all">
            <Flame className="w-3.5 h-3.5" /> Go to Today — Day {currentDay}
          </Link>

        </div>
      </div>
    </div>
  )
}

function CalendarDaysEmpty() {
  return (
    <div className="flex items-center justify-center py-6">
      <ChevronLeft className="w-6 h-6 text-[#404050]" />
    </div>
  )
}
