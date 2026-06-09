'use client'
import { useState, useEffect } from 'react'
import { DAILY_PLAN } from '@/lib/data/daily-plan'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const MONTHS   = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS_DOW = ['MON','TUE','WED','THU','FRI','SAT','SUN']

const typeIcons: Record<string, string> = {
  read:    'description',
  watch:   'play_circle',
  task:    'calculate',
  reflect: 'history_edu',
}
const typeColors: Record<string, string> = {
  read:    'text-primary',
  watch:   'text-primary',
  task:    'text-status-amber',
  reflect: 'text-text-tertiary',
}

export default function CalendarPage() {
  const [today]       = useState(new Date())
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [enrolledAt, setEnrolledAt]     = useState<Date | null>(null)
  const [completedDays, setCompleted]   = useState<Set<number>>(new Set())
  const [partialDays, setPartial]       = useState<Set<number>>(new Set())
  const [selectedDay, setSelectedDay]   = useState<number | null>(null)
  const [currentDay, setCurrentDay]     = useState(1)
  const [daysActive, setDaysActive]     = useState(0)

  useEffect(() => {
    Promise.all([
      fetch('/api/users/me').then(r => r.json()),
      fetch('/api/daily').then(r => r.json()),
    ]).then(([user, tasks]) => {
      if (!user.enrolledAt) return
      const ea  = new Date(user.enrolledAt)
      setEnrolledAt(ea)
      const cd  = Math.floor((Date.now() - ea.getTime()) / 86400000) + 1
      const da  = Math.max(1, Math.floor((Date.now() - ea.getTime()) / 86400000))
      setCurrentDay(cd)
      setDaysActive(da)

      const byDay: Record<number, { total: number; done: number }> = {}
      ;(tasks as any[]).forEach((t: any) => {
        if (!byDay[t.day]) byDay[t.day] = { total: 0, done: 0 }
        byDay[t.day].total++
        if (t.done) byDay[t.day].done++
      })
      const done    = new Set<number>()
      const partial = new Set<number>()
      Object.entries(byDay).forEach(([day, { total, done: d }]) => {
        const dayNum   = parseInt(day)
        const plan     = DAILY_PLAN.find(p => p.day === dayNum)
        const planTotal = plan?.tasks.length || total
        if (d >= planTotal)   done.add(dayNum)
        else if (d > 0)       partial.add(dayNum)
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

  // Build calendar grid — Monday-first
  const firstDayOfMonth = new Date(current.year, current.month, 1)
  const firstDayDow = (firstDayOfMonth.getDay() + 6) % 7 // 0=Mon
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate()
  const totalCells  = Math.ceil((firstDayDow + daysInMonth) / 7) * 7

  const selectedPlan = selectedDay ? DAILY_PLAN.find(p => p.day === selectedDay) : null
  const selectedDone = selectedDay ? completedDays.has(selectedDay) : false
  const selectedPart = selectedDay ? partialDays.has(selectedDay) : false

  return (
    <div className="relative">
      {/* Teal dot-grid bg tint */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(rgba(46,216,195,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 pb-8">

        {/* ── LEFT: CALENDAR ──────────────────────────────────────────── */}
        <div className="flex-[2] flex flex-col gap-5">

          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {MONTHS[current.month]} {current.year}
              </h2>
              <p className="font-label-mono text-label-mono text-text-secondary mt-1.5 uppercase tracking-widest">
                Academic Cycle · Week {Math.ceil((currentDay) / 7)}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={prevMonth}
                className="glass-card p-2 rounded-lg hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-on-surface">chevron_left</span>
              </button>
              <button onClick={nextMonth}
                className="glass-card p-2 rounded-lg hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-on-surface">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="glass-card rounded-xl overflow-hidden">
            {/* Day labels */}
            <div className="grid grid-cols-7 border-b border-border-subtle">
              {DAYS_DOW.map(d => (
                <div key={d} className="py-3 md:py-4 text-center font-label-mono text-label-mono text-text-tertiary">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7" style={{ gridTemplateRows: `repeat(${totalCells / 7}, minmax(70px, 1fr))` }}>
              {Array(totalCells).fill(null).map((_, i) => {
                const dayOfMonth = i - firstDayDow + 1
                const isThisMonth = dayOfMonth >= 1 && dayOfMonth <= daysInMonth
                if (!isThisMonth) {
                  return (
                    <div key={i} className="border-r border-b border-border-subtle p-2 md:p-3 bg-surface-container/30 last:border-r-0" />
                  )
                }

                const date    = new Date(current.year, current.month, dayOfMonth)
                const dayNum  = getDayNumber(date)
                const plan    = dayNum ? DAILY_PLAN.find(p => p.day === dayNum) : null
                const isToday = date.toDateString() === today.toDateString()
                const isFuture = dayNum ? dayNum > currentDay : false
                const isDone   = dayNum ? completedDays.has(dayNum) : false
                const isPartial = dayNum ? partialDays.has(dayNum) : false
                const isSelected = dayNum === selectedDay
                const isRight = (i + 1) % 7 === 0

                return (
                  <div key={i}
                    onClick={() => plan && !isFuture && dayNum && setSelectedDay(isSelected ? null : dayNum)}
                    className={cn(
                      'border-b border-border-subtle p-2 md:p-3 relative transition-all',
                      !isRight && 'border-r',
                      // States
                      isDone     && !isSelected && 'bg-primary/10 cursor-pointer hover:bg-primary/20',
                      isPartial  && !isDone && !isSelected && 'bg-status-amber/10 cursor-pointer hover:bg-status-amber/20',
                      isSelected && isDone  && 'bg-primary/20 ring-1 ring-inset ring-primary/40 cursor-pointer',
                      isSelected && !isDone && 'bg-status-amber/20 ring-1 ring-inset ring-status-amber/40 cursor-pointer',
                      isToday    && !isSelected && 'border-primary/40 teal-pulse',
                      isFuture   && 'opacity-30',
                      plan && !isFuture && !isDone && !isPartial && !isSelected && 'cursor-pointer hover:bg-border-subtle group',
                      !plan && !isFuture && 'cursor-default',
                    )}
                    style={isToday && !isSelected ? undefined : undefined}
                    {...(isToday && !isSelected ? { 'data-today': 'true' } : {})}>

                    {/* Day number */}
                    <span className={cn(
                      'font-label-mono text-label-mono block',
                      isDone     ? 'text-primary'      :
                      isPartial  ? 'text-status-amber' :
                      isToday    ? 'text-primary'       :
                      isFuture   ? 'text-text-tertiary' :
                      'text-text-secondary group-hover:text-primary transition-colors'
                    )}>
                      {String(dayOfMonth).padStart(2, '0')}
                    </span>

                    {/* Selected label */}
                    {isSelected && (
                      <div className="mt-1 hidden md:block">
                        <p className={cn('font-label-caps text-label-caps text-[9px]', isDone ? 'text-primary' : 'text-status-amber')}>
                          {isDone ? 'COMPLETE' : isPartial ? 'IN PROGRESS' : 'SELECTED'}
                        </p>
                        {plan && <p className="font-body-sm text-body-sm text-on-surface line-clamp-1 text-[10px] mt-0.5">{plan.title}</p>}
                      </div>
                    )}

                    {/* Today badge */}
                    {isToday && !isSelected && (
                      <>
                        <div className="absolute inset-0 border-2 border-primary/25 pointer-events-none rounded-none" />
                        <span className="absolute bottom-1.5 right-1.5 font-label-caps text-[8px] text-primary hidden md:block">TODAY</span>
                      </>
                    )}

                    {/* Completed check */}
                    {isDone && !isSelected && (
                      <span className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 material-symbols-outlined text-primary text-sm md:text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}

                    {/* Partial indicator */}
                    {isPartial && !isDone && !isSelected && (
                      <span className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 material-symbols-outlined text-status-amber text-sm md:text-base"
                        style={{ fontVariationSettings: "'FILL' 0" }}>pending</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 md:gap-8 items-center px-1">
            {[
              { dot: 'bg-primary',       label: 'COMPLETE'    },
              { dot: 'bg-status-amber',  label: 'IN PROGRESS' },
              { dot: 'bg-secondary',     label: 'SELECTED'    },
              { dot: 'bg-text-tertiary', label: 'NOT STARTED' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={cn('w-2 h-2 md:w-2.5 md:h-2.5 rounded-full', l.dot)} />
                <span className="font-label-caps text-label-caps text-text-secondary text-[9px] md:text-[11px]">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: DAY DETAIL PANEL ──────────────────────────────────── */}
        <div className="flex-[1]">
          <div className={cn(
            'glass-card rounded-xl p-6 md:p-8 lg:sticky lg:top-6 space-y-6 md:space-y-8 transition-all',
            selectedDay ? 'active-glow' : ''
          )}>
            {selectedPlan ? (
              <>
                {/* Status + date */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      'px-2 py-1 border rounded font-label-caps text-label-caps text-[10px]',
                      selectedDone
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : selectedPart
                          ? 'bg-status-amber/10 text-status-amber border-status-amber/30'
                          : 'bg-border-subtle text-text-secondary border-border-subtle'
                    )}>
                      {selectedDone ? 'COMPLETE' : selectedPart ? 'IN PROGRESS' : 'NOT STARTED'}
                    </span>
                    <span className="font-label-mono text-label-mono text-text-tertiary">
                      DAY {selectedPlan.day}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                    Day {selectedPlan.day}: {selectedPlan.title}
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                    {selectedPlan.focus}
                  </p>
                </div>

                {/* Task list */}
                <div className="space-y-3">
                  <p className="font-label-caps text-label-caps text-text-tertiary">DAILY CURRICULUM</p>
                  <div className="space-y-2">
                    {selectedPlan.tasks.map(task => (
                      <div key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-border-subtle hover:border-primary/50 transition-colors group">
                        <span className={cn('material-symbols-outlined text-xl flex-shrink-0', typeColors[task.type])}
                          style={{ fontVariationSettings: "'FILL' 0" }}>
                          {typeIcons[task.type]}
                        </span>
                        <div className="min-w-0">
                          <span className="font-body-sm text-body-sm text-on-surface truncate block">{task.label}</span>
                          <span className="font-label-mono text-label-mono text-text-tertiary text-[10px] truncate block">
                            {task.chapter || task.searchQuery || task.detail.slice(0, 40)}
                          </span>
                        </div>
                        <span className="font-label-mono text-label-mono text-text-tertiary text-[10px] flex-shrink-0 ml-auto">
                          {task.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={selectedDay === currentDay ? '/dashboard/daily' : `/dashboard/daily/${selectedDay}`}
                  className="w-full py-3.5 md:py-4 bg-primary text-black font-label-caps text-label-caps flex justify-center items-center gap-2 group hover:scale-[1.02] active:scale-[0.98] transition-transform rounded-lg block text-center">
                  {selectedDay === currentDay ? "OPEN TODAY'S PLAN" : selectedDone ? 'REVIEW THIS DAY' : 'COMPLETE THIS DAY'}
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>

                {/* Stats */}
                <div className="pt-5 md:pt-8 border-t border-border-subtle flex justify-between">
                  <div>
                    <p className="font-label-caps text-label-caps text-text-tertiary mb-1">DAYS ACTIVE</p>
                    <p className="font-headline-sm text-headline-sm text-primary">{daysActive}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-caps text-label-caps text-text-tertiary mb-1">COMPLETED</p>
                    <p className="font-headline-sm text-headline-sm text-primary">
                      {completedDays.size} <span className="text-body-sm italic font-normal text-text-secondary">Days</span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center space-y-4">
                <span className="material-symbols-outlined text-4xl md:text-5xl text-text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 0" }}>calendar_month</span>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface mb-2">Select a Day</p>
                  <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
                    Click any past or current day to view its plan, tasks, and open it for completion.
                  </p>
                </div>
                <div className="pt-4 border-t border-border-subtle w-full flex justify-between">
                  <div>
                    <p className="font-label-caps text-label-caps text-text-tertiary mb-1">DAYS ACTIVE</p>
                    <p className="font-headline-sm text-headline-sm text-primary">{daysActive}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-caps text-label-caps text-text-tertiary mb-1">COMPLETED</p>
                    <p className="font-headline-sm text-headline-sm text-primary">
                      {completedDays.size} <span className="text-body-sm italic font-normal text-text-secondary">Days</span>
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/daily"
                  className="w-full py-3.5 bg-primary-container text-on-primary font-label-caps text-label-caps flex justify-center items-center gap-2 group hover:scale-[1.02] active:scale-[0.98] transition-transform rounded-lg">
                  GO TO TODAY — DAY {currentDay}
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
