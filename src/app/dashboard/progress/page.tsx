import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM, TOTAL_TASKS, TOTAL_BOOKS, ALL_BOOKS } from '@/lib/data/curriculum'

export default async function ProgressPage() {
  const session = await getServerSession(authOptions)
  const progress = await db.progress.findMany({ where: { userId: session!.user.id } })
  const user = await db.user.findUnique({ where: { id: session!.user.id }, select: { enrolledAt: true } })

  const daysActive = Math.max(1, Math.floor((Date.now() - new Date(user!.enrolledAt).getTime()) / 86400000))
  const completedTasks = progress.filter(r => r.type === 'task' && r.completed).length
  const completedBooks = progress.filter(r => r.type === 'book' && r.completed).length
  const totalPct = Math.round((completedTasks / TOTAL_TASKS) * 100)
  const monthsElapsed = Math.floor(daysActive / 30)
  const monthsLeft = Math.max(0, 36 - monthsElapsed)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-2">Progress Report</h1>
        <p className="text-[#a0a0b0] text-sm">Day {daysActive} of your 36-month MBA journey</p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Overall Progress', value: `${totalPct}%`, sub: `${completedTasks}/${TOTAL_TASKS} tasks` },
          { label: 'Books Read', value: completedBooks, sub: `of ${TOTAL_BOOKS} total` },
          { label: 'Days Enrolled', value: daysActive, sub: 'since day one' },
          { label: 'Months Left', value: monthsLeft, sub: 'in the program' },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
            <div className="font-display text-3xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-[10px] text-[#606070] uppercase tracking-wider font-semibold">{s.label}</div>
            <div className="text-xs text-[#505060] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* PHASE BREAKDOWN */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-white mb-6">Phase-by-Phase Breakdown</h2>
        <div className="space-y-6">
          {CURRICULUM.map(phase => {
            const tasks = phase.modules.flatMap(m => m.tasks)
            const done = tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
            const pct = Math.round((done / tasks.length) * 100)
            const colors: Record<string, string> = { blue: 'bg-blue-500 text-blue-400', green: 'bg-[#2ed8c3] text-[#2ed8c3]', purple: 'bg-purple-500 text-purple-400', gold: 'bg-amber-500 text-amber-400' }
            const [barColor, textColor] = (colors[phase.color] || colors.teal).split(' ')
            return (
              <div key={phase.id}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className={`text-xs font-mono font-bold ${textColor} mr-2`}>Phase {phase.number}</span>
                    <span className="text-white font-semibold text-sm">{phase.title}</span>
                    <span className="text-[#606070] text-xs ml-2 font-mono">{phase.months}</span>
                  </div>
                  <span className={`font-display font-bold ${textColor}`}>{pct}%</span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {phase.modules.map(mod => {
                    const modDone = mod.tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
                    const modPct = Math.round((modDone / mod.tasks.length) * 100)
                    return (
                      <div key={mod.id} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                        <div className="font-mono text-[10px] text-[#606070] mb-1">{mod.number}</div>
                        <div className="text-xs text-white font-medium leading-tight mb-2" style={{ fontSize: '11px' }}>{mod.title.split(' ').slice(0, 3).join(' ')}</div>
                        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${modPct}%` }} />
                        </div>
                        <div className="text-[10px] text-[#606070] mt-1">{modPct}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* BOOK TRACKER */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-white mb-5">Book Tracker — {completedBooks}/{TOTAL_BOOKS} Read</h2>
        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden mb-6">
          <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${Math.round((completedBooks / TOTAL_BOOKS) * 100)}%` }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ALL_BOOKS.map(book => {
            const read = !!progress.find(r => r.bookId === book.id && r.type === 'book' && r.completed)
            return (
              <div key={book.id} className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-all ${read ? 'bg-[#2ed8c3]/5 border-[#2ed8c3]/15' : 'border-white/[0.04]'}`}>
                <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${read ? 'bg-[#2ed8c3]' : 'border border-white/20'}`}>
                  {read && <span className="text-white text-[8px] font-bold">✓</span>}
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-medium truncate ${read ? 'text-[#a0a0b0]' : 'text-white'}`}>{book.title}</div>
                  <div className="text-[10px] text-[#606070] truncate">{book.author}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
