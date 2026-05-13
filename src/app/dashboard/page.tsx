import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM, TOTAL_TASKS, TOTAL_BOOKS } from '@/lib/data/curriculum'
import { getTodayPlan } from '@/lib/data/daily-plan'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, Target, Flame, TrendingUp, Clock, CalendarDays, BookMarked, CheckSquare2, Youtube } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const userId = session!.user.id

  const [progressRecords, totalUsers, userRow] = await Promise.all([
    db.progress.findMany({ where: { userId } }),
    db.user.count(),
    db.user.findUnique({ where: { id: userId }, select: { enrolledAt: true, name: true } }),
  ])

  const enrolledAt   = new Date(userRow!.enrolledAt)
  const daysActive   = Math.max(1, Math.floor((Date.now() - enrolledAt.getTime()) / 86400000))
  const todayPlan    = getTodayPlan(enrolledAt)

  const completedTasks = progressRecords.filter(r => r.type === 'task' && r.completed).length
  const completedBooks = progressRecords.filter(r => r.type === 'book' && r.completed).length
  const overallPct     = Math.round((completedTasks / TOTAL_TASKS) * 100)

  const greetHour = new Date().getHours()
  const greeting  = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening'

  const phaseProgress = CURRICULUM.map(phase => {
    const tasks = phase.modules.flatMap(m => m.tasks)
    const done  = tasks.filter(t => progressRecords.find(r => r.taskId === t.id && r.completed)).length
    return { ...phase, done, total: tasks.length, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 }
  })

  const phaseBarColors: Record<string, string> = {
    blue: 'bg-[#585de1]', teal: 'bg-[#2ed8c3]', purple: 'bg-purple-500', gold: 'bg-amber-500',
  }
  const phaseTextColors: Record<string, string> = {
    blue: 'text-[#7b7fe8]', teal: 'text-[#2ed8c3]', purple: 'text-purple-400', gold: 'text-amber-400',
  }

  const typeIcons: Record<string, any> = { read: BookOpen, watch: Youtube, task: CheckSquare2, reflect: BookMarked }
  const typeColors: Record<string, string> = {
    read: 'text-[#2ed8c3] bg-[#2ed8c3]/10 border-[#2ed8c3]/20',
    watch: 'text-red-400 bg-red-500/10 border-red-500/20',
    task: 'text-[#585de1] bg-[#585de1]/10 border-[#585de1]/20',
    reflect: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#706870] text-sm mb-1">{greeting},</p>
          <h1 className="font-display text-3xl font-bold text-white">{userRow?.name?.split(' ')[0]} 👋</h1>
          <p className="text-[#a0a0b0] text-sm mt-1">Day {daysActive} of your MBA journey. Keep building.</p>
        </div>
        <Link href="/dashboard/daily"
          className="flex items-center gap-2 text-sm bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-[#2ed8c3]/15">
          Today's Plan <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Target,     label: 'Overall Progress', value: `${overallPct}%`, sub: `${completedTasks}/${TOTAL_TASKS} tasks`, iconBg: 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20', iconColor: 'text-[#2ed8c3]'  },
          { icon: BookOpen,   label: 'Books Completed',  value: completedBooks,   sub: `of ${TOTAL_BOOKS} total`,                iconBg: 'bg-[#585de1]/10 border-[#585de1]/20', iconColor: 'text-[#7b7fe8]'  },
          { icon: Flame,      label: 'Days Active',      value: daysActive,       sub: 'since enrollment',                       iconBg: 'bg-amber-500/10 border-amber-500/20',  iconColor: 'text-amber-400'  },
          { icon: TrendingUp, label: 'Community',        value: totalUsers,       sub: 'founders enrolled',                      iconBg: 'bg-purple-500/10 border-purple-500/20',iconColor: 'text-purple-400' },
        ].map(stat => (
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

      {/* TODAY'S PLAN PREVIEW + PHASE PROGRESS */}
      <div className="grid grid-cols-3 gap-6">

        {/* TODAY PREVIEW */}
        <div className="col-span-2 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckSquare2 className="w-4 h-4 text-[#2ed8c3]" />
              <h2 className="font-display text-lg font-bold text-white">Today's Plan</h2>
              {todayPlan && <span className="text-xs font-mono text-[#2ed8c3] bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 px-2 py-0.5 rounded-full">Day {todayPlan.day}</span>}
            </div>
            <Link href="/dashboard/daily" className="text-xs text-[#2ed8c3] hover:text-[#5ee3d2] flex items-center gap-1 transition-colors">
              Open full plan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {todayPlan ? (
            <>
              <div className="mb-3">
                <div className="text-white font-semibold mb-0.5">{todayPlan.title}</div>
                <div className="text-xs text-[#a0a0b0]">{todayPlan.focus}</div>
              </div>
              <div className="space-y-2">
                {todayPlan.tasks.map(task => {
                  const Icon = typeIcons[task.type] || CheckSquare2
                  return (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg border text-xs ${typeColors[task.type]}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white">{task.label}</div>
                        <div className="text-[11px] text-[#706870] truncate">
                          {task.chapter || task.searchQuery || task.detail.slice(0, 60)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#706870] flex-shrink-0">
                        <Clock className="w-2.5 h-2.5" />{task.duration}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-6 text-[#706870] text-sm">Program complete — keep going with the curriculum!</div>
          )}
        </div>

        {/* QUICK LINKS + PHASE */}
        <div className="space-y-4">
          {/* Quick links */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <h2 className="font-display text-sm font-bold text-white mb-3">Quick Access</h2>
            <div className="space-y-2">
              {[
                { href: '/dashboard/daily',    icon: CheckSquare2,  label: "Today's Tasks",  color: 'text-[#2ed8c3]', sub: `Day ${daysActive}` },
                { href: '/dashboard/calendar', icon: CalendarDays,  label: 'Calendar',       color: 'text-[#585de1]', sub: 'Study schedule'    },
                { href: '/dashboard/journal',  icon: BookMarked,    label: 'Journal',        color: 'text-amber-400', sub: 'Write & reflect'   },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/10 transition-all group">
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white group-hover:text-[#2ed8c3] transition-colors">{item.label}</div>
                    <div className="text-[11px] text-[#706870]">{item.sub}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#504850] group-hover:text-[#2ed8c3] group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Phase mini-progress */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <h2 className="font-display text-sm font-bold text-white mb-3">Phase Progress</h2>
            <div className="space-y-3">
              {phaseProgress.map(phase => {
                const bar  = phaseBarColors[phase.color]  || 'bg-[#2ed8c3]'
                const text = phaseTextColors[phase.color] || 'text-[#2ed8c3]'
                return (
                  <div key={phase.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={`font-mono font-bold ${text}`}>Phase {phase.number}</span>
                      <span className={text}>{phase.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${bar}`} style={{ width: `${phase.pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
