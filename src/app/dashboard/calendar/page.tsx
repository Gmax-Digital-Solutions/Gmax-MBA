'use client'
import { useState, useEffect } from 'react'
import { DAILY_PLAN } from '@/lib/data/daily-plan'
import { ChevronLeft, ChevronRight, BookOpen, Youtube, CheckSquare, PenLine } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS_OF_WEEK = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const typeColors = {
  read:    'bg-[#2ed8c3]/80',
  watch:   'bg-red-400/80',
  task:    'bg-[#585de1]/80',
  reflect: 'bg-amber-400/80',
}

export default function CalendarPage() {
  const [today] = useState(new Date())
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [enrolledAt, setEnrolledAt] = useState<Date | null>(null)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/users/me').then(r => r.json()).then(u => {
      if (u.enrolledAt) setEnrolledAt(new Date(u.enrolledAt))
    })
    fetch('/api/daily').then(r => r.json()).then(tasks => {
      const doneDays = [...new Set((tasks as any[]).filter(t => t.done).map((t: any) => t.day))] as number[]
      setCompletedDays(doneDays)
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

  const firstDay = new Date(current.year, current.month, 1).getDay()
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate()
  const selectedPlan = selectedDay ? DAILY_PLAN.find(p => p.day === selectedDay) : null

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-1">Calendar</h1>
        <p className="text-[#a0a0b0] text-sm">Your daily study schedule mapped to the calendar.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* CALENDAR */}
        <div className="col-span-2 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6">
          {/* Nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-white/[0.07] hover:border-white/15 flex items-center justify-center text-[#a0a0b0] hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-display text-lg font-bold text-white">{MONTHS[current.month]} {current.year}</h2>
            <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-white/[0.07] hover:border-white/15 flex items-center justify-center text-[#a0a0b0] hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-[#706870] uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const date = new Date(current.year, current.month, i + 1)
              const dayNum = getDayNumber(date)
              const plan = dayNum ? DAILY_PLAN.find(p => p.day === dayNum) : null
              const isToday = date.toDateString() === today.toDateString()
              const isPast = date < today
              const isDone = dayNum ? completedDays.includes(dayNum) : false
              const isSat = date.getDay() === 6
              const isSun = date.getDay() === 0
              const isSelected = dayNum === selectedDay

              return (
                <button key={i} onClick={() => dayNum && plan && setSelectedDay(dayNum)}
                  className={cn(
                    'aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all text-sm relative',
                    isToday ? 'bg-[#2ed8c3]/15 border-2 border-[#2ed8c3]/50 text-[#2ed8c3] font-bold' :
                    isSelected ? 'bg-[#585de1]/20 border border-[#585de1]/40 text-white' :
                    isDone ? 'bg-[#2ed8c3]/8 border border-[#2ed8c3]/20 text-[#2ed8c3]' :
                    plan ? 'hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/10 text-white cursor-pointer' :
                    isSat || isSun ? 'text-[#504850]' : 'text-[#706870]',
                  )}>
                  <span className="text-xs leading-none">{i + 1}</span>
                  {plan && (
                    <div className="flex gap-0.5 mt-1">
                      {plan.tasks.slice(0, 3).map(t => (
                        <div key={t.id} className={cn('w-1 h-1 rounded-full', typeColors[t.type])} />
                      ))}
                    </div>
                  )}
                  {isDone && (
                    <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#2ed8c3]" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-4 pt-4 border-t border-white/[0.06] flex-wrap">
            {[
              { color: 'bg-[#2ed8c3]/80', label: 'Read' },
              { color: 'bg-red-400/80',   label: 'Watch' },
              { color: 'bg-[#585de1]/80', label: 'Task' },
              { color: 'bg-amber-400/80', label: 'Journal' },
              { color: 'bg-[#2ed8c3]',    label: 'Completed', dot: true },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-[#706870]">
                <div className={cn('rounded-full', l.dot ? 'w-2 h-2' : 'w-1.5 h-1.5', l.color)} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="space-y-4">
          {selectedPlan ? (
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#2ed8c3] font-bold">Day {selectedPlan.day}</span>
                <span className="text-xs text-[#706870]">Week {selectedPlan.week}</span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1">{selectedPlan.title}</h3>
              <p className="text-xs text-[#a0a0b0] mb-4">{selectedPlan.focus}</p>
              <div className="space-y-2">
                {selectedPlan.tasks.map(task => {
                  const icons = { read: BookOpen, watch: Youtube, task: CheckSquare, reflect: PenLine }
                  const Icon = icons[task.type]
                  const colors = { read: 'text-[#2ed8c3]', watch: 'text-red-400', task: 'text-[#585de1]', reflect: 'text-amber-400' }
                  return (
                    <div key={task.id} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <Icon className={cn('w-3.5 h-3.5 flex-shrink-0 mt-0.5', colors[task.type])} />
                      <div>
                        <div className="text-xs font-semibold text-white">{task.label}</div>
                        <div className="text-[11px] text-[#706870] mt-0.5 leading-relaxed">
                          {task.chapter || task.searchQuery || task.detail.slice(0, 60) + '...'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link href="/dashboard/daily" className="mt-4 w-full flex items-center justify-center gap-2 bg-[#2ed8c3]/10 hover:bg-[#2ed8c3]/20 border border-[#2ed8c3]/20 text-[#2ed8c3] text-xs font-semibold py-2.5 rounded-xl transition-all">
                Go to Today's Plan →
              </Link>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
              <p className="text-[#706870] text-sm text-center py-4">Click a day to see the plan</p>
            </div>
          )}

          {/* Quick stats */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-[#706870] uppercase tracking-wider mb-3">This Month</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0b0]">Days completed</span>
                <span className="text-[#2ed8c3] font-bold">{completedDays.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0b0]">Program days</span>
                <span className="text-white font-bold">{DAILY_PLAN.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0b0]">Weeks planned</span>
                <span className="text-white font-bold">{Math.max(...DAILY_PLAN.map(d => d.week))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
