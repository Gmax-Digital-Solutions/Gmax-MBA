import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM } from '@/lib/data/curriculum'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const phaseConfig = {
  blue:   { accent: 'border-secondary',    label: 'text-secondary',    bar: 'bg-secondary',    tag: 'bg-secondary/10 text-secondary',    progress: 'text-secondary'    },
  teal:   { accent: 'border-primary',      label: 'text-primary',      bar: 'bg-primary',      tag: 'bg-primary/10 text-primary',        progress: 'text-primary'      },
  purple: { accent: 'border-tertiary',     label: 'text-tertiary',     bar: 'bg-tertiary',     tag: 'bg-tertiary/10 text-tertiary',      progress: 'text-tertiary'     },
  gold:   { accent: 'border-status-amber', label: 'text-status-amber', bar: 'bg-status-amber', tag: 'bg-status-amber/10 text-status-amber', progress: 'text-status-amber' },
}

export default async function CurriculumPage() {
  const session  = await getServerSession(authOptions)
  const progress = await db.progress.findMany({ where: { userId: session!.user.id } })

  return (
    <main className="pb-16 dot-pattern min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <header className="mb-12 md:mb-16">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-3">
            The Curriculum
          </h1>
          <p className="text-text-secondary font-body-lg">
            Absolute mastery across 4 phases, 12 modules, and 30 business texts.
          </p>
        </header>

        {/* Phases */}
        <div className="space-y-16 md:space-y-24">
          {CURRICULUM.map((phase) => {
            const cfg       = phaseConfig[phase.color as keyof typeof phaseConfig] || phaseConfig.teal
            const allTasks  = phase.modules.flatMap(m => m.tasks)
            const allBooks  = phase.modules.flatMap(m => m.books)
            const doneTasks = allTasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
            const doneModules = phase.modules.filter(mod => {
              const mt  = mod.tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
              return mt === mod.tasks.length
            }).length
            const phasePct  = allTasks.length ? Math.round((doneTasks / allTasks.length) * 100) : 0
            const isLocked  = phase.number > 1 && CURRICULUM
              .filter(p => p.number < phase.number)
              .some(p => {
                const pt  = p.modules.flatMap(m => m.tasks)
                const done = pt.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
                return done < pt.length * 0.5 // unlock when 50% of previous phase done
              })

            return (
              <section key={phase.id}>
                {/* Phase header */}
                <div className={`mb-8 border-l-4 ${cfg.accent} pl-5 md:pl-6`}>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 md:mb-6">
                    <div>
                      <span className={`font-label-mono text-label-mono ${cfg.label} uppercase tracking-widest block mb-2`}>
                        Phase 0{phase.number}
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">{phase.title}</h2>
                      <p className="text-text-secondary text-body-sm mt-1 hidden md:block">{phase.description}</p>
                    </div>
                    <div className="flex gap-6 md:gap-8 flex-shrink-0">
                      <div>
                        <span className="block font-label-mono text-label-mono text-text-tertiary mb-1">DURATION</span>
                        <span className="font-body-md text-text-primary">{phase.months}</span>
                      </div>
                      <div>
                        <span className="block font-label-mono text-label-mono text-text-tertiary mb-1">PROGRESS</span>
                        <span className={`font-body-md ${cfg.progress}`}>{doneModules}/{phase.modules.length} Modules</span>
                      </div>
                    </div>
                  </div>
                  {/* Phase progress bar */}
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cfg.bar} transition-all duration-1000`}
                      style={{ width: `${phasePct}%` }}
                    />
                  </div>
                </div>

                {/* Module cards */}
                <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-gutter transition-opacity', isLocked && 'opacity-40')}>
                  {phase.modules.map((mod) => {
                    const modDone     = mod.tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
                    const booksDone   = mod.books.filter(b => progress.find(r => r.bookId === b.id && r.type === 'book' && r.completed)).length
                    const modPct      = mod.tasks.length ? Math.round((modDone / mod.tasks.length) * 100) : 0
                    const isComplete  = modPct === 100

                    return (
                      <Link key={mod.id} href={isLocked ? '#' : `/dashboard/modules/${mod.id}`}
                        className={cn(
                          'glass-surface border border-border-subtle rounded-xl p-5 md:p-6 transition-all group block',
                          !isLocked && 'hover:border-border-hover teal-glow cursor-pointer',
                          isLocked && 'cursor-not-allowed'
                        )}>
                        {/* Card header */}
                        <div className="flex justify-between items-start mb-5 md:mb-6">
                          <span className="font-label-mono text-label-mono text-text-tertiary">{mod.number}</span>
                          <span className={cn(
                            'material-symbols-outlined transition-colors text-xl',
                            isComplete ? 'text-primary' : 'text-text-tertiary opacity-30'
                          )} style={{ fontVariationSettings: isComplete ? "'FILL' 1" : "'FILL' 0" }}>
                            check_circle
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={cn(
                          'font-headline-sm text-headline-sm text-on-surface mb-2 transition-colors leading-tight',
                          !isLocked && 'group-hover:text-primary'
                        )}>
                          {mod.title}
                        </h3>

                        {/* Tag */}
                        <span className={cn('inline-block px-2.5 py-1 rounded font-label-caps text-label-caps mb-6 md:mb-8 text-[10px]', cfg.tag)}>
                          {mod.tag.toUpperCase()}
                        </span>

                        {/* Stats */}
                        <div className="flex items-center gap-4 md:gap-6 text-text-secondary text-body-sm mb-4">
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px]">menu_book</span>
                            {booksDone}/{mod.books.length} Books
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px]">task_alt</span>
                            {modDone}/{mod.tasks.length} Tasks
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-700', isComplete ? 'bg-primary' : cfg.bar)}
                            style={{ width: modPct > 0 ? `${modPct}%` : '0%' }}
                          />
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Lock overlay message for future phases */}
                {isLocked && (
                  <div className="glass-surface border border-border-subtle rounded-xl p-8 md:p-12 text-center mt-4">
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-text-tertiary mb-3 block"
                      style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Phase Locked</h3>
                    <p className="text-text-secondary text-body-sm">Complete at least 50% of the previous phase to unlock.</p>
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
