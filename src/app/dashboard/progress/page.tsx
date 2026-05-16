import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM, TOTAL_TASKS, TOTAL_BOOKS, ALL_BOOKS } from '@/lib/data/curriculum'

export default async function ProgressPage() {
  const session = await getServerSession(authOptions)
  const progress = await db.progress.findMany({ where: { userId: session!.user.id } })
  const user     = await db.user.findUnique({ where: { id: session!.user.id }, select: { enrolledAt: true } })

  const daysActive     = Math.max(1, Math.floor((Date.now() - new Date(user!.enrolledAt).getTime()) / 86400000))
  const completedTasks = progress.filter(r => r.type === 'task' && r.completed).length
  const completedBooks = progress.filter(r => r.type === 'book' && r.completed).length
  const totalPct       = Math.round((completedTasks / TOTAL_TASKS) * 100)
  const monthsLeft     = Math.max(0, 36 - Math.floor(daysActive / 30))

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Progress Report</h1>
        <p className="text-[#a0a0b0] text-sm">Day {daysActive} of your 36-month MBA journey</p>
      </div>

      {/* Stats — 2 cols mobile, 4 desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Overall Progress', value: `${totalPct}%`, sub: `${completedTasks}/${TOTAL_TASKS} tasks` },
          { label: 'Books Read',       value: completedBooks,  sub: `of ${TOTAL_BOOKS} total`              },
          { label: 'Days Enrolled',    value: daysActive,      sub: 'since day one'                        },
          { label: 'Months Left',      value: monthsLeft,      sub: 'in the program'                       },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-5">
            <div className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-[10px] text-[#606070] uppercase tracking-wider font-semibold leading-tight">{s.label}</div>
            <div className="text-xs text-[#505060] mt-0.5 hidden sm:block">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Phase breakdown */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6">
        <h2 className="font-display text-lg font-bold text-white mb-5">Phase-by-Phase Breakdown</h2>
        <div className="space-y-6">
          {CURRICULUM.map(phase => {
            const tasks = phase.modules.flatMap(m => m.tasks)
            const done  = tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
            const pct   = Math.round((done / tasks.length) * 100)
            const colors: Record<string, string> = {
              blue: 'bg-[#585de1] text-[#7b7fe8]', teal: 'bg-[#2ed8c3] text-[#2ed8c3]',
              purple: 'bg-purple-500 text-purple-400', gold: 'bg-amber-500 text-amber-400',
            }
            const [barColor, textColor] = (colors[phase.color] || colors.teal).split(' ')
            return (
              <div key={phase.id}>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-mono font-bold ${textColor}`}>Phase {phase.number}</span>
                    <span className="text-white font-semibold text-sm">{phase.title}</span>
                    <span className="text-[#606070] text-xs font-mono hidden sm:inline">{phase.months}</span>
                  </div>
                  <span className={`font-display font-bold ${textColor}`}>{pct}%</span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden mb-3">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                </div>
                {/* Module sub-bars — 2 col mobile, 4 col desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {phase.modules.map(mod => {
                    const mDone = mod.tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
                    const mPct  = Math.round((mDone / mod.tasks.length) * 100)
                    return (
                      <div key={mod.id} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                        <div className="font-mono text-[10px] text-[#606070] mb-1">{mod.number}</div>
                        <div className="text-[11px] text-white font-medium leading-tight mb-2 line-clamp-2">{mod.title}</div>
                        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${mPct}%` }} />
                        </div>
                        <div className="text-[10px] text-[#606070] mt-1">{mPct}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Book tracker */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6">
        <h2 className="font-display text-lg font-bold text-white mb-4">Book Tracker — {completedBooks}/{TOTAL_BOOKS} Read</h2>
        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden mb-5">
          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.round((completedBooks / TOTAL_BOOKS) * 100)}%` }} />
        </div>
        {/* 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ALL_BOOKS.map(book => {
            const read = !!progress.find(r => r.bookId === book.id && r.type === 'book' && r.completed)
            return (
              <div key={book.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${read ? 'bg-[#2ed8c3]/5 border-[#2ed8c3]/15' : 'border-white/[0.04] hover:border-white/[0.08]'}`}>
                <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${read ? 'bg-[#2ed8c3]' : 'border border-white/20'}`}>
                  {read && <span className="text-[#241e20] text-[8px] font-bold">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium truncate ${read ? 'text-[#a0a0b0]' : 'text-white'}`}>{book.title}</div>
                  <div className="text-[10px] text-[#606070] truncate mb-1.5">{book.author}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {book.freeUrl && (
                      <a href={book.freeUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] px-2 py-0.5 rounded-md hover:bg-[#2ed8c3]/20 transition-all whitespace-nowrap">
                        🎁 Free
                      </a>
                    )}
                    {book.amazonUrl && (
                      <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md hover:bg-amber-500/20 transition-all whitespace-nowrap">
                        Amazon
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
