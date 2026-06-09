import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM, TOTAL_TASKS, TOTAL_BOOKS, ALL_BOOKS } from '@/lib/data/curriculum'
import Link from 'next/link'

const phaseConfig: Record<string, {
  icon: string; color: string; bar: string
  glow: string; ring: string; tag: string
}> = {
  blue:   { icon: 'rocket_launch', color: 'text-secondary',    bar: 'from-secondary to-secondary-container',   glow: 'progress-glow-blue',   ring: 'bg-secondary',    tag: 'bg-secondary/10 text-secondary border-secondary/20'    },
  teal:   { icon: 'rocket_launch', color: 'text-primary',      bar: 'from-primary to-secondary',               glow: 'progress-glow-teal',   ring: 'bg-primary',      tag: 'bg-primary/10 text-primary border-primary/20'          },
  purple: { icon: 'hub',           color: 'text-tertiary',     bar: 'from-tertiary to-tertiary-container',     glow: 'progress-glow-purple', ring: 'bg-tertiary',     tag: 'bg-tertiary/10 text-tertiary border-tertiary/20'        },
  gold:   { icon: 'architecture',  color: 'text-status-amber', bar: 'from-status-amber to-status-amber',       glow: 'progress-glow-amber',  ring: 'bg-status-amber', tag: 'bg-status-amber/10 text-status-amber border-status-amber/20' },
}

export default async function ProgressPage() {
  const session = await getServerSession(authOptions)
  const userId  = session!.user.id

  const [progress, user] = await Promise.all([
    db.progress.findMany({ where: { userId } }),
    db.user.findUnique({ where: { id: userId }, select: { enrolledAt: true } }),
  ])

  const enrolledAt     = new Date(user!.enrolledAt)
  const daysActive     = Math.max(1, Math.floor((Date.now() - enrolledAt.getTime()) / 86400000))
  const completedTasks = progress.filter(r => r.type === 'task' && r.completed).length
  const completedBooks = progress.filter(r => r.type === 'book' && r.completed).length
  const totalPct       = Math.round((completedTasks / TOTAL_TASKS) * 100)

  // SVG circle for top stat
  const radius      = 36
  const circ        = 2 * Math.PI * radius
  const dashOffset  = circ - (circ * totalPct) / 100

  // Phase data with real progress
  const phases = CURRICULUM.map(phase => {
    const tasks   = phase.modules.flatMap(m => m.tasks)
    const done    = tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
    const pct     = tasks.length ? Math.round((done / tasks.length) * 100) : 0
    const cfg     = phaseConfig[phase.color] || phaseConfig.teal
    const isActive = pct > 0 && pct < 100
    const isLocked = !isActive && pct === 0 && CURRICULUM
      .filter(p => p.number < phase.number)
      .some(p => {
        const pt   = p.modules.flatMap(m => m.tasks)
        const pd   = pt.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
        return pd < pt.length * 0.3
      })
    return { ...phase, done, total: tasks.length, pct, cfg, isActive, isLocked }
  })

  const activePhase = phases.find(p => p.isActive) || phases.find(p => p.pct < 100)

  return (
    <div className="relative">
      {/* Atmospheric glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-6 mb-10 md:mb-12">
          <div className="space-y-2">
            <h1 className="font-display-lg text-display-lg-mobile md:text-[44px] text-text-primary leading-tight">
              Academic Progress
            </h1>
            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-mono text-[10px] uppercase tracking-wider">
                Gmax Program
              </span>
              <span className="text-text-tertiary font-body-md italic">
                Business Foundations → CEO Mastery
              </span>
            </div>
          </div>
          {activePhase && (
            <div className="flex items-center gap-3 bg-surface-container p-2 rounded-xl border border-border-subtle flex-shrink-0">
              <div className="px-3 md:px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-primary font-label-caps text-[10px] mb-1">Current Focus</p>
                <p className="text-text-primary font-semibold text-sm">{activePhase.title}</p>
              </div>
              <Link href="/dashboard/curriculum" className="pr-2 text-text-tertiary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          )}
        </div>

        {/* ── STATS ROW ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">

          {/* Circular progress */}
          <div className="glass-card p-5 md:p-6 rounded-xl flex flex-col items-center text-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle cx="40" cy="40" r={radius} fill="transparent" stroke="#58f5df"
                  strokeDasharray={circ} strokeDashoffset={dashOffset}
                  strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-label-mono text-base md:text-lg text-primary">{totalPct}%</span>
              </div>
            </div>
            <p className="text-text-tertiary font-label-caps text-[9px] md:text-[10px] mb-1 uppercase tracking-widest">Curriculum</p>
            <p className="text-text-primary font-headline-sm text-base md:text-xl">Progress</p>
          </div>

          {/* Books read */}
          <div className="glass-card p-5 md:p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="p-1.5 md:p-2 rounded-lg bg-status-amber/10 text-status-amber border border-status-amber/20">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
              </div>
              <span className="font-label-mono text-[10px] md:text-xs text-status-amber">{TOTAL_BOOKS - completedBooks} left</span>
            </div>
            <p className="text-text-tertiary font-label-caps text-[9px] md:text-[10px] mb-1 uppercase tracking-widest">Books Read</p>
            <div className="flex items-baseline gap-2">
              <span className="text-text-primary font-label-mono text-2xl md:text-3xl">{completedBooks}</span>
              <span className="text-text-tertiary font-label-mono text-xs md:text-sm">/ {TOTAL_BOOKS}</span>
            </div>
          </div>

          {/* Days active */}
          <div className="glass-card p-5 md:p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="p-1.5 md:p-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
              </div>
              <span className="font-label-mono text-[10px] md:text-xs text-secondary">Keep going</span>
            </div>
            <p className="text-text-tertiary font-label-caps text-[9px] md:text-[10px] mb-1 uppercase tracking-widest">Days Active</p>
            <div className="flex items-baseline gap-2">
              <span className="text-text-primary font-label-mono text-2xl md:text-3xl">{daysActive}</span>
              <span className="text-text-tertiary font-label-mono text-xs md:text-sm">Total</span>
            </div>
          </div>

          {/* Tasks done */}
          <div className="glass-card p-5 md:p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="p-1.5 md:p-2 rounded-lg bg-tertiary/10 text-tertiary border border-tertiary/20">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_turned_in</span>
              </div>
              <span className="font-label-mono text-[10px] md:text-xs text-tertiary">{TOTAL_TASKS - completedTasks} left</span>
            </div>
            <p className="text-text-tertiary font-label-caps text-[9px] md:text-[10px] mb-1 uppercase tracking-widest">Tasks Done</p>
            <div className="flex items-baseline gap-2">
              <span className="text-text-primary font-label-mono text-2xl md:text-3xl">{completedTasks}</span>
              <span className="text-text-tertiary font-label-mono text-xs md:text-sm">/ {TOTAL_TASKS}</span>
            </div>
          </div>
        </div>

        {/* ── PHASE BREAKDOWN ─────────────────────────────────────── */}
        <section className="mb-14 md:mb-20">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="font-headline-sm text-xl md:text-2xl text-text-primary flex items-center gap-4">
              Phase Breakdown
              <span className="h-px w-20 md:w-32 bg-gradient-to-r from-border-subtle to-transparent" />
            </h2>
            <Link href="/dashboard/curriculum"
              className="text-text-tertiary hover:text-primary flex items-center gap-1.5 transition-colors">
              <span className="font-label-caps text-[10px] uppercase hidden sm:inline">View Full Curriculum</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-8 md:space-y-10 relative">
            {/* Vertical connector line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border-subtle hidden md:block" />

            {phases.map((phase) => {
              const cfg = phase.cfg
              return (
                <div key={phase.id}
                  className={`relative md:pl-12 group transition-opacity ${phase.isLocked ? 'opacity-50 hover:opacity-80' : ''}`}>

                  {/* Phase dot */}
                  <div className={`hidden md:flex absolute left-0 top-1 w-10 h-10 rounded-full items-center justify-center z-10 ring-4 ring-background
                    ${phase.pct === 100 ? 'bg-primary progress-glow-teal' :
                      phase.isActive ? cfg.ring + ' ' + cfg.glow :
                      'bg-surface-container'}`}>
                    <span className={`material-symbols-outlined ${phase.pct > 0 ? 'text-on-primary' : 'text-text-tertiary'}`}
                      style={{ fontVariationSettings: phase.pct > 0 ? "'FILL' 1" : "'FILL' 0" }}>
                      {cfg.icon}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 md:gap-6">
                    {/* Phase title row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Mobile dot */}
                        <div className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${phase.pct === 100 ? 'bg-primary' : phase.isActive ? cfg.ring : 'bg-surface-container'}`}>
                          <span className={`material-symbols-outlined text-sm ${phase.pct > 0 ? 'text-on-primary' : 'text-text-tertiary'}`}
                            style={{ fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
                        </div>
                        <h3 className="font-headline-sm text-lg md:text-xl text-text-primary">
                          Phase {phase.number}: {phase.title}
                        </h3>
                        {phase.isActive && (
                          <span className={`px-2 py-0.5 rounded border font-label-mono text-[10px] ${cfg.tag}`}>ACTIVE</span>
                        )}
                        {phase.pct === 100 && (
                          <span className="px-2 py-0.5 rounded border font-label-mono text-[10px] bg-primary/10 text-primary border-primary/20">COMPLETE</span>
                        )}
                        {phase.isLocked && (
                          <span className="px-2 py-0.5 rounded border font-label-mono text-[10px] bg-surface-container text-text-tertiary border-border-subtle">LOCKED</span>
                        )}
                      </div>
                      <span className={`font-label-mono text-sm flex-shrink-0 ${cfg.color}`}>
                        {phase.pct}% COMPLETE
                      </span>
                    </div>

                    {/* Phase progress bar */}
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${cfg.bar} transition-all duration-1000`}
                        style={{ width: `${phase.pct}%` }}
                      />
                    </div>

                    {/* Module mini-bars */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {phase.modules.map(mod => {
                        const modDone = mod.tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
                        const modPct  = mod.tasks.length ? Math.round((modDone / mod.tasks.length) * 100) : 0
                        return (
                          <Link key={mod.id} href={`/dashboard/modules/${mod.id}`}
                            className={`glass-card p-3 md:p-4 rounded-lg border-l-4 hover:border-l-4 transition-all ${
                              modPct === 100 ? 'border-l-primary' :
                              modPct > 0 ? `border-l-primary/60` : 'border-l-border-subtle'
                            }`}>
                            <p className="font-label-caps text-[9px] text-text-tertiary uppercase mb-2 truncate">{mod.tag}</p>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full bg-gradient-to-r ${cfg.bar} transition-all`}
                                style={{ width: `${modPct}%` }} />
                            </div>
                            <p className="font-label-mono text-[10px] text-text-tertiary mt-1.5">{modPct}%</p>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── BOOK TRACKER ────────────────────────────────────────── */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="space-y-1">
              <h2 className="font-headline-sm text-2xl md:text-3xl text-text-primary">Library Tracker</h2>
              <p className="text-text-tertiary font-body-md">Recommended curriculum for engineering founders.</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
              <span className="font-label-mono text-status-amber text-xs">
                {Math.round((completedBooks / TOTAL_BOOKS) * 100)}% TOTAL READ
              </span>
              <div className="w-40 md:w-48 h-1.5 bg-surface-container rounded-full overflow-hidden progress-glow-amber">
                <div className="h-full bg-status-amber rounded-full transition-all"
                  style={{ width: `${Math.round((completedBooks / TOTAL_BOOKS) * 100)}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {ALL_BOOKS.map(book => {
              const read = !!progress.find(r => r.bookId === book.id && r.type === 'book' && r.completed)
              return (
                <div key={book.id}
                  className={`glass-card flex gap-4 md:gap-6 p-4 md:p-5 rounded-xl group transition-all ${
                    read ? 'border-primary/20' : ''
                  }`}>
                  {/* Book spine / cover placeholder */}
                  <div className={`w-16 md:w-20 h-24 md:h-28 flex-shrink-0 rounded border overflow-hidden relative flex items-center justify-center ${
                    read ? 'bg-primary/10 border-primary/20' : 'bg-surface-container border-border-subtle'
                  }`}>
                    {read ? (
                      <span className="material-symbols-outlined text-primary text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                    ) : (
                      <span className="material-symbols-outlined text-text-tertiary text-2xl">menu_book</span>
                    )}
                  </div>

                  {/* Book info */}
                  <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded border font-label-mono text-[9px] uppercase mb-1.5 ${
                        read ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-container text-text-tertiary border-border-subtle'
                      }`}>
                        {book.id.split('-')[1] ? `Module ${book.id.split('-')[1]}` : 'Core Reading'}
                      </span>
                      <h4 className="font-headline-sm text-base md:text-lg text-text-primary leading-tight truncate">{book.title}</h4>
                      <p className="text-text-tertiary text-xs md:text-sm mt-0.5">{book.author}</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap mt-2">
                      {read ? (
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <span className="text-text-primary font-label-mono text-[10px] uppercase">Completed</span>
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-wrap">
                          {book.freeUrl && (
                            <a href={book.freeUrl} target="_blank" rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label-caps text-[10px] uppercase tracking-wider hover:brightness-110 transition-all">
                              Free Access
                            </a>
                          )}
                          {book.amazonUrl && (
                            <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-surface-container border border-border-subtle text-text-secondary rounded-lg font-label-caps text-[10px] uppercase tracking-wider hover:border-border-hover transition-all">
                              Amazon
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}
