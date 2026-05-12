import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM, TOTAL_TASKS, TOTAL_BOOKS, ALL_MODULES } from '@/lib/data/curriculum'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, Target, Flame, TrendingUp, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const userId = session!.user.id

  const [progressRecords, totalUsers] = await Promise.all([
    db.progress.findMany({ where: { userId } }),
    db.user.count(),
  ])

  const completedTasks = progressRecords.filter(r => r.type === 'task' && r.completed).length
  const completedBooks = progressRecords.filter(r => r.type === 'book' && r.completed).length
  const overallPct    = Math.round((completedTasks / TOTAL_TASKS) * 100)

  const enrolledAt = await db.user.findUnique({ where: { id: userId }, select: { enrolledAt: true, name: true } })
  const daysActive = Math.max(1, Math.floor((Date.now() - new Date(enrolledAt!.enrolledAt).getTime()) / 86400000))

  const greetHour = new Date().getHours()
  const greeting  = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening'

  const phaseProgress = CURRICULUM.map(phase => {
    const phaseTasks = phase.modules.flatMap(m => m.tasks)
    const done = phaseTasks.filter(t => progressRecords.find(r => r.taskId === t.id && r.completed)).length
    return { ...phase, done, total: phaseTasks.length, pct: phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0 }
  })

  const currentPhase  = phaseProgress.find(p => p.pct < 100) || phaseProgress[0]

  const statItems = [
    { icon: Target,    label: 'Overall Progress', value: `${overallPct}%`, sub: `${completedTasks}/${TOTAL_TASKS} tasks`,   iconBg: 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20',  iconColor: 'text-[#2ed8c3]'  },
    { icon: BookOpen,  label: 'Books Completed',  value: completedBooks,   sub: `of ${TOTAL_BOOKS} total`,                  iconBg: 'bg-[#585de1]/10 border-[#585de1]/20',  iconColor: 'text-[#7b7fe8]'  },
    { icon: Flame,     label: 'Days Active',       value: daysActive,       sub: 'since enrollment',                         iconBg: 'bg-amber-500/10 border-amber-500/20',  iconColor: 'text-amber-400'  },
    { icon: TrendingUp,label: 'Community',         value: totalUsers,       sub: 'founders enrolled',                        iconBg: 'bg-purple-500/10 border-purple-500/20',iconColor: 'text-purple-400' },
  ]

  const phaseBarColors: Record<string, string> = {
    blue:   'bg-[#585de1]', green: 'bg-[#2ed8c3]',
    purple: 'bg-purple-500', gold: 'bg-amber-500',
  }
  const phaseTextColors: Record<string, string> = {
    blue:   'text-[#7b7fe8]', green: 'text-[#2ed8c3]',
    purple: 'text-purple-400', gold: 'text-amber-400',
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#706870] text-sm mb-1">{greeting},</p>
          <h1 className="font-display text-3xl font-bold text-white">{enrolledAt?.name?.split(' ')[0]} 👋</h1>
          <p className="text-[#a0a0b0] text-sm mt-1">Day {daysActive} of your MBA journey. Keep building.</p>
        </div>
        <Link href="/dashboard/curriculum"
          className="flex items-center gap-2 text-sm bg-[#2ed8c3]/10 hover:bg-[#2ed8c3]/20 border border-[#2ed8c3]/20 text-[#2ed8c3] px-4 py-2.5 rounded-xl transition-all">
          Continue Learning <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        {statItems.map(stat => (
          <div key={stat.label} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${stat.iconBg}`}>
              <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
            </div>
            <div className="font-display text-3xl font-bold text-white mb-0.5">{stat.value}</div>
            <div className="text-[10px] text-[#706870] uppercase tracking-wider font-semibold">{stat.label}</div>
            <div className="text-xs text-[#504850] mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* PHASE PROGRESS */}
        <div className="col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="font-display text-lg font-bold text-white mb-5">Phase Progress</h2>
          <div className="space-y-4">
            {phaseProgress.map(phase => {
              const bar  = phaseBarColors[phase.color]  || 'bg-[#2ed8c3]'
              const text = phaseTextColors[phase.color] || 'text-[#2ed8c3]'
              return (
                <div key={phase.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold ${text}`}>Phase {phase.number}</span>
                      <span className="text-sm text-[#a0a0b0]">{phase.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#706070] font-mono">{phase.done}/{phase.total}</span>
                      <span className={`text-xs font-bold ${text}`}>{phase.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${phase.pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* THIS WEEK */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="font-display text-lg font-bold text-white mb-1">This Week</h2>
          <p className="text-[#706870] text-xs mb-5">Current focus area</p>
          <div className="bg-[#2ed8c3]/8 border border-[#2ed8c3]/15 rounded-xl p-4 mb-4">
            <div className="text-xs font-semibold text-[#2ed8c3] mb-1">{currentPhase.title}</div>
            <div className="text-xs text-[#706870]">{currentPhase.months}</div>
          </div>
          <div className="space-y-2">
            {[
              { icon: '📖', text: 'Read 30 min — morning'     },
              { icon: '▶️', text: 'Watch 1 YT lecture'        },
              { icon: '✍️', text: '1hr deep study block'      },
              { icon: '🏢', text: 'Apply to your business'    },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2.5 text-xs text-[#908890]">
                <span>{item.icon}</span><span>{item.text}</span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/curriculum"
            className="mt-5 w-full flex items-center justify-center gap-2 bg-[#2ed8c3]/10 hover:bg-[#2ed8c3]/20 border border-[#2ed8c3]/20 text-[#2ed8c3] text-xs font-semibold py-2.5 rounded-xl transition-all">
            Open Curriculum <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* START MODULES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-white">Start Here — Phase 1 Modules</h2>
          <Link href="/dashboard/curriculum" className="text-xs text-[#2ed8c3] hover:text-[#5ee3d2] flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {ALL_MODULES.slice(0, 2).map(mod => {
            const tasksDone = progressRecords.filter(r => r.moduleId === mod.id && r.type === 'task' && r.completed).length
            const pct = Math.round((tasksDone / mod.tasks.length) * 100)
            return (
              <Link key={mod.id} href={`/dashboard/modules/${mod.id}`}
                className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-2xl p-6 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-sm font-bold text-[#a0a0b0]">
                    {mod.number}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#706870]">
                    <Clock className="w-3 h-3" />{mod.tasks.length} tasks
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#2ed8c3] transition-colors">{mod.title}</h3>
                <p className="text-[#706870] text-xs mb-4">{mod.tag}</p>
                <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2ed8c3] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-xs text-[#706070] mt-1.5">{tasksDone}/{mod.tasks.length} tasks complete</div>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}
