import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM, TOTAL_TASKS, TOTAL_BOOKS } from '@/lib/data/curriculum'
import { getStudentProgress } from '@/lib/student-progress'
import { getPlanByDay } from '@/lib/data/daily-plan'
import Link from 'next/link'
import Image from 'next/image'
import { getInitials } from '@/lib/utils'

const typeIcons: Record<string, string> = {
  read:    'menu_book',
  watch:   'videocam',
  task:    'task_alt',
  reflect: 'edit_square',
}
const typeColors: Record<string, string> = {
  read:    'text-primary border-primary',
  watch:   'text-text-tertiary border-transparent',
  task:    'text-text-tertiary border-transparent',
  reflect: 'text-text-tertiary border-transparent',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const userId  = session!.user.id

  const [progressRecords, totalUsers, userRow, recentPosts] = await Promise.all([
    db.progress.findMany({ where: { userId } }),
    db.user.count(),
    db.user.findUnique({
      where:  { id: userId },
      select: { enrolledAt: true, name: true, image: true, role: true },
    }),
    db.post.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true, image: true, role: true } } },
    }),
  ])

  const enrolledAt   = new Date(userRow!.enrolledAt)
  const progress     = await getStudentProgress(userId, enrolledAt)
  const currentDay   = progress.activeDay
  const todayPlan    = getPlanByDay(progress.activeDay)
  const weekNum      = todayPlan?.week ?? Math.ceil(currentDay / 7)
  const isBehind     = progress.isBehind
  const daysBehind   = progress.daysBehind

  const completedTasks = progressRecords.filter(r => r.type === 'task' && r.completed).length
  const completedBooks = progressRecords.filter(r => r.type === 'book' && r.completed).length
  const overallPct     = Math.round((completedTasks / TOTAL_TASKS) * 100)

  // SVG circle math
  const radius     = 88
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (circumference * overallPct) / 100

  // Phase progress
  const phaseProgress = CURRICULUM.map(phase => {
    const tasks = phase.modules.flatMap(m => m.tasks)
    const done  = tasks.filter(t => progressRecords.find(r => r.taskId === t.id && r.completed)).length
    return { ...phase, done, total: tasks.length, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 }
  })

  // Current active module
  const activeModule = (() => {
    for (const phase of CURRICULUM) {
      for (const mod of phase.modules) {
        const done = mod.tasks.filter(t => progressRecords.find(r => r.taskId === t.id && r.completed)).length
        if (done < mod.tasks.length) return { phase, mod, done }
      }
    }
    return null
  })()

  const greetHour = new Date().getHours()
  const greeting  = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="bg-grid min-h-full">

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
        <div>
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-[0.2em] mb-2 block flex items-center gap-2">
            System Online · Day {currentDay}
            {isBehind && (
              <span className="font-label-mono text-[10px] text-status-amber bg-status-amber/10 border border-status-amber/20 rounded-full px-2 py-0.5 normal-case tracking-normal">
                {daysBehind} day{daysBehind > 1 ? 's' : ''} of work waiting — pick up where you left off
              </span>
            )}
          </span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            {greeting}, {userRow?.name?.split(' ')[0]}
          </h2>
          <p className="font-body-lg text-body-lg text-text-secondary mt-1">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Week {weekNum}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-label-mono text-label-mono text-text-tertiary">Phase</span>
            <span className="font-label-caps text-label-caps text-on-surface px-3 py-1 bg-surface-container rounded-full border border-border-subtle">
              {activeModule ? `Phase ${activeModule.phase.number}` : 'Complete'}
            </span>
          </div>
          <div className="h-11 w-11 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
            {userRow?.image ? (
              <Image src={userRow.image} alt={userRow.name || ''} width={48} height={48} className="w-full h-full object-cover" unoptimized />
            ) : (
              <div className="w-full h-full bg-primary/15 flex items-center justify-center">
                <span className="font-label-mono text-sm font-bold text-primary">{getInitials(userRow?.name)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── DASHBOARD GRID ──────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-gutter max-w-container-max mx-auto">

        {/* ── LEFT COLUMN (stats) ─────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">

          {/* Circular progress card */}
          <section className="glass-surface p-6 md:p-8 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-4 left-4 font-label-mono text-label-mono text-text-tertiary uppercase">
              Curriculum Progress
            </div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mt-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle cx="96" cy="96" r={radius} fill="transparent"
                  stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle cx="96" cy="96" r={radius} fill="transparent"
                  stroke="url(#tealGradient)" strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round" />
                <defs>
                  <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2ed8c3', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#585de1', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display-lg text-display-lg text-primary">{overallPct}%</span>
                <span className="font-label-caps text-label-caps text-text-secondary">Overall</span>
              </div>
            </div>
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-6 md:gap-8 w-full">
              <div className="text-center">
                <div className="font-headline-sm text-headline-sm text-on-surface">{completedTasks}/{TOTAL_TASKS}</div>
                <div className="font-label-mono text-label-mono text-text-tertiary">Tasks Done</div>
              </div>
              <div className="text-center">
                <div className="font-headline-sm text-headline-sm text-on-surface">{completedBooks}/{TOTAL_BOOKS}</div>
                <div className="font-label-mono text-label-mono text-text-tertiary">Books Read</div>
              </div>
            </div>
          </section>

          {/* Momentum card */}
          <section className="glass-surface p-6 md:p-8 rounded-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="font-label-mono text-label-mono text-text-tertiary uppercase">Momentum</div>
              <span className="material-symbols-outlined text-status-amber"
                style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="font-display-lg text-display-lg text-on-surface">{progress.completedDays.length}</div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md font-bold text-text-primary">Days Completed</span>
                <span className="font-label-mono text-label-mono text-text-tertiary">
                  {isBehind ? `${daysBehind} day${daysBehind > 1 ? 's' : ''} behind — keep going` : 'On pace, keep building'}
                </span>
              </div>
            </div>
            {/* Phase bars */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-label-caps text-label-caps text-text-secondary">Phase Breakdown</span>
                {activeModule && (
                  <span className="font-label-mono text-label-mono text-primary text-[10px]">
                    Phase {activeModule.phase.number} Active
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {phaseProgress.map(p => {
                  const barColors: Record<string, string> = {
                    blue: 'bg-secondary', teal: 'bg-primary-container', purple: 'bg-tertiary', gold: 'bg-status-amber',
                  }
                  return (
                    <div key={p.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-label-mono text-[10px] text-text-tertiary">P{p.number}</span>
                        <span className="font-label-mono text-[10px] text-text-tertiary">{p.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColors[p.color] || 'bg-primary'}`}
                          style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>

        {/* ── RIGHT COLUMN (focus + feed) ─────────────────────────── */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">

          {/* Active focus / today's plan hero */}
          <section className="relative rounded-xl overflow-hidden min-h-[260px] md:min-h-[320px] group">
            {/* Dark gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface to-background" />
            {/* Teal glow overlay */}
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(46,216,195,0.08) 0%, transparent 70%)' }} />

            <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-12 min-h-[260px] md:min-h-[320px]">
              <div className="font-label-mono text-label-mono text-primary mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {todayPlan ? 'ACTIVE SESSION' : 'PROGRAM COMPLETE'}
              </div>
              <h3 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2 leading-tight">
                {todayPlan ? todayPlan.title : 'All phases complete'}
              </h3>
              <p className="font-body-lg text-body-lg text-text-secondary mb-6 md:mb-8 max-w-xl">
                {todayPlan ? todayPlan.focus : 'Revisit any module or browse the full curriculum.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/dashboard/daily"
                  className="px-6 md:px-8 py-3.5 md:py-4 bg-primary text-on-primary rounded font-label-caps text-label-caps font-bold flex items-center justify-center gap-2 transition-all active:scale-95 hover:brightness-110 shadow-[0_0_15px_rgba(46,216,195,0.2)]">
                  <span className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  {todayPlan ? "Resume Today's Plan" : 'Browse Curriculum'}
                </Link>
                {activeModule && (
                  <Link href={`/dashboard/modules/${activeModule.mod.id}`}
                    className="px-6 md:px-8 py-3.5 md:py-4 bg-white/5 backdrop-blur-md border border-white/10 text-on-surface rounded font-label-caps text-label-caps transition-colors hover:bg-white/10 text-center">
                    View Module Details
                  </Link>
                )}
              </div>
            </div>
          </section>

          {/* Daily schedule + community feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

            {/* Daily schedule */}
            <section className="glass-surface p-5 md:p-6 rounded-xl flex flex-col">
              <div className="flex justify-between items-center mb-5 md:mb-6">
                <h4 className="font-label-caps text-label-caps text-on-surface">Daily Schedule</h4>
                <Link href="/dashboard/daily"
                  className="font-label-mono text-[10px] text-secondary hover:underline transition-colors">
                  OPEN →
                </Link>
              </div>
              <div className="space-y-3 md:space-y-4 flex-1">
                {todayPlan ? todayPlan.tasks.map((task, i) => (
                  <div key={task.id}
                    className={`flex items-start gap-3 md:gap-4 p-3 border-l-2 rounded-r transition-all ${
                      i === 0 ? 'bg-white/[0.03] border-primary' : 'bg-transparent border-transparent'
                    }`}>
                    <span className={`material-symbols-outlined text-[18px] md:text-[20px] flex-shrink-0 ${
                      i === 0 ? 'text-primary' : 'text-text-tertiary'
                    }`} style={{ fontVariationSettings: i === 0 ? "'FILL' 1" : "'FILL' 0" }}>
                      {typeIcons[task.type] || 'task_alt'}
                    </span>
                    <div className="min-w-0">
                      <p className={`font-body-sm text-body-sm font-medium truncate ${
                        i === 0 ? 'text-on-surface' : 'text-text-secondary'
                      }`}>{task.label}: {task.detail.slice(0, 35)}{task.detail.length > 35 ? '...' : ''}</p>
                      <p className="font-label-mono text-[10px] text-text-tertiary">{task.duration}</p>
                    </div>
                  </div>
                )) : (
                  <div className="flex items-center justify-center h-32 text-text-tertiary">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-3xl block mb-2">check_circle</span>
                      <p className="font-label-caps text-label-caps text-[10px]">PROGRAM COMPLETE</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Community feed */}
            <section className="glass-surface p-5 md:p-6 rounded-xl flex flex-col">
              <div className="flex justify-between items-center mb-5 md:mb-6">
                <h4 className="font-label-caps text-label-caps text-on-surface">Community Feed</h4>
                <Link href="/dashboard/community"
                  className="font-label-mono text-[10px] text-secondary hover:underline transition-colors">
                  VIEW ALL
                </Link>
              </div>
              <div className="space-y-4 md:space-y-6 custom-scrollbar overflow-y-auto max-h-[240px] md:max-h-[260px] pr-2 flex-1">
                {recentPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <span className="material-symbols-outlined text-3xl text-text-tertiary block mb-2">forum</span>
                    <p className="font-body-sm text-body-sm text-text-tertiary">No posts yet.</p>
                    <Link href="/dashboard/community" className="font-label-caps text-[10px] text-primary mt-1 hover:underline">
                      Be the first to post →
                    </Link>
                  </div>
                ) : recentPosts.map(post => (
                  <div key={post.id} className="flex gap-3 md:gap-4">
                    <div className="w-8 h-8 rounded-full border border-border-subtle overflow-hidden flex-shrink-0 bg-primary/15 flex items-center justify-center">
                      {post.user.image ? (
                        <Image src={post.user.image} alt={post.user.name || ''} width={32} height={32} className="w-full h-full object-cover" unoptimized />
                      ) : (
                        <span className="font-label-mono text-[9px] font-bold text-primary">{getInitials(post.user.name)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body-sm text-body-sm text-on-surface">
                        <span className="font-bold">{post.user.name || 'Member'}</span>
                        {' '}<span className="text-text-secondary">· {post.type}</span>
                      </p>
                      <p className="font-label-mono text-[10px] text-text-tertiary line-clamp-1 mt-0.5">
                        {post.content.slice(0, 60)}{post.content.length > 60 ? '...' : ''}
                      </p>
                      <p className="font-label-mono text-[10px] text-text-tertiary mt-1">
                        {(() => {
                          const diff = (Date.now() - new Date(post.createdAt).getTime()) / 1000
                          if (diff < 60) return 'just now'
                          if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
                          if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
                          return `${Math.floor(diff / 86400)}d ago`
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="mt-16 md:mt-24 pt-10 md:pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-60">
        <div className="font-headline-sm text-on-surface opacity-50 italic">Gmax MBA</div>
        <p className="font-label-mono text-label-mono text-text-tertiary text-center">
          © {new Date().getFullYear()} Gmax MBA. Institutional Excellence for the Digital Age.
        </p>
        <div className="flex gap-5 md:gap-6 font-body-sm text-body-sm text-text-tertiary">
          {[['Terms', '#'], ['Privacy', '#'], ['Curriculum', '/curriculum']].map(([l, h]) => (
            <Link key={l} href={h} className="hover:text-on-surface transition-colors">{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
