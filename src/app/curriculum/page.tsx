import type { Metadata } from 'next'
import Link from 'next/link'
import { CURRICULUM, ALL_BOOKS } from '@/lib/data/curriculum'
import { ArrowRight, BookOpen, CheckCircle, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Curriculum — 12 Modules, 30 Books, 4 Phases',
  description:
    'Explore the full Gmax MBA curriculum: 4 phases, 12 modules, and 30 curated books covering business strategy, marketing, sales, operations, leadership, and corporate finance. Free for founders and builders.',
  openGraph: {
    title: 'Gmax MBA Curriculum — 12 Modules, 30 Books, 4 Phases',
    description:
      'See every module, book, and deliverable in the Gmax MBA program. Free business education for developers, engineers, and solo founders.',
  },
  alternates: { canonical: '/curriculum' },
}

const phaseColors: Record<string, { text: string; border: string; bg: string }> = {
  blue:   { text: 'text-[#7b7fe8]', border: 'border-[#585de1]/30', bg: 'bg-[#585de1]/8'  },
  teal:   { text: 'text-[#2ed8c3]', border: 'border-[#2ed8c3]/30', bg: 'bg-[#2ed8c3]/8'  },
  purple: { text: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/8' },
  gold:   { text: 'text-amber-400',  border: 'border-amber-500/30',  bg: 'bg-amber-500/8'  },
}

export default function CurriculumPublicPage() {
  return (
    <div className="min-h-screen bg-[#241e20]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#241e20]/90 backdrop-blur-xl px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-white text-lg">Gmax MBA</Link>
        <div className="flex items-center gap-3">
          <Link href="/auth/signin" className="text-sm text-[#a0a0b0] hover:text-white transition-colors hidden sm:block">Sign In</Link>
          <Link href="/auth/signup" className="text-sm bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-4 py-2 rounded-lg transition-colors">
            Enroll Free
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20">
        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            4 PHASES · 12 MODULES · 30 BOOKS · FREE FOREVER
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            The Full Curriculum
          </h1>
          <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto leading-relaxed">
            A structured business education from first principles to Fortune 500 thinking.
            Every module comes with curated books, video resources, and a real deliverable
            you apply to your own business.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <Link href="/auth/signup"
              className="flex items-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#2ed8c3]/15">
              <Play className="w-4 h-4" /> Start Free
            </Link>
            <Link href="/" className="text-sm text-[#a0a0b0] hover:text-white border border-white/10 hover:border-white/20 px-6 py-3 rounded-xl transition-all">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* PHASES */}
        <div className="space-y-16">
          {CURRICULUM.map((phase) => {
            const c = phaseColors[phase.color] || phaseColors.teal
            const totalTasks = phase.modules.flatMap(m => m.tasks).length
            const totalBooks = phase.modules.flatMap(m => m.books).length
            return (
              <section key={phase.id} aria-labelledby={`phase-${phase.number}-heading`}>
                {/* Phase header */}
                <div className={`border ${c.border} ${c.bg} rounded-2xl px-5 md:px-7 py-5 mb-6`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className={`font-mono text-xs font-bold ${c.text}`}>Phase {phase.number}</span>
                        <h2 id={`phase-${phase.number}-heading`} className="font-display text-xl md:text-2xl font-bold text-white">
                          {phase.title}
                        </h2>
                        <span className={`text-xs font-mono ${c.text} opacity-70`}>{phase.months}</span>
                      </div>
                      <p className="text-[#a0a0b0] text-sm leading-relaxed max-w-xl">{phase.description}</p>
                    </div>
                    <div className="flex gap-4 text-sm flex-shrink-0">
                      {[
                        { val: phase.modules.length, label: 'modules' },
                        { val: totalBooks,            label: 'books'   },
                        { val: totalTasks,            label: 'tasks'   },
                      ].map(s => (
                        <div key={s.label} className="text-center">
                          <div className={`font-display text-2xl font-bold ${c.text}`}>{s.val}</div>
                          <div className="text-[#606070] text-xs">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div className="space-y-6">
                  {phase.modules.map((mod) => (
                    <article key={mod.id} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-7">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-sm font-bold text-[#a0a0b0] flex-shrink-0">
                          {mod.number}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-white mb-0.5">{mod.title}</h3>
                          <span className="text-xs text-[#606070] bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-full">{mod.tag}</span>
                        </div>
                      </div>

                      {/* Deliverable */}
                      <div className="bg-[#2ed8c3]/6 border border-[#2ed8c3]/12 rounded-xl p-4 mb-5">
                        <p className="text-xs font-semibold text-[#2ed8c3] mb-1.5 uppercase tracking-wider">What You'll Build</p>
                        <p className="text-[#c0c0d0] text-sm leading-relaxed">{mod.deliverable}</p>
                      </div>

                      {/* Books */}
                      <div className="mb-5">
                        <h4 className="text-xs font-semibold text-[#606070] uppercase tracking-wider mb-3 flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5" /> Core Books
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {mod.books.map(book => (
                            <div key={book.id} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                              <div className="text-sm font-semibold text-white mb-0.5 leading-tight">{book.title}</div>
                              <div className="text-xs text-[#606070] mb-2">{book.author}</div>
                              <p className="text-[11px] text-[#808090] leading-relaxed mb-2 line-clamp-2">{book.why}</p>
                              <div className="flex gap-1.5 flex-wrap">
                                {book.freeUrl && (
                                  <a href={book.freeUrl} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] px-2 py-0.5 rounded-md hover:bg-[#2ed8c3]/20 transition-all">
                                    🎁 Free access
                                  </a>
                                )}
                                {book.amazonUrl && (
                                  <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md hover:bg-amber-500/20 transition-all">
                                    Amazon
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tasks preview */}
                      <div>
                        <h4 className="text-xs font-semibold text-[#606070] uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5" /> Action Tasks ({mod.tasks.length})
                        </h4>
                        <ul className="space-y-1.5">
                          {mod.tasks.slice(0, 3).map(task => (
                            <li key={task.id} className="flex items-start gap-2 text-sm text-[#a0a0b0]">
                              <span className="text-[#2ed8c3] mt-0.5 flex-shrink-0 text-xs">→</span>
                              {task.text}
                            </li>
                          ))}
                          {mod.tasks.length > 3 && (
                            <li className="text-xs text-[#504850] pl-4">
                              +{mod.tasks.length - 3} more tasks inside the program
                            </li>
                          )}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* ALL 30 BOOKS — SEO section */}
        <section className="mt-20" aria-label="All 30 books in the curriculum">
          <h2 className="font-display text-3xl font-bold text-white mb-3">All 30 Books</h2>
          <p className="text-[#a0a0b0] text-sm mb-8 leading-relaxed">
            Every book is chosen for practical business impact — not academic theory.
            Each one links to a free access option so cost is never a barrier.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_BOOKS.map((book) => (
              <div key={book.id} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 hover:border-white/10 transition-all">
                <BookOpen className="w-4 h-4 text-[#2ed8c3] flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">{book.title}</div>
                  <div className="text-xs text-[#606070] mb-1.5">{book.author}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {book.freeUrl && (
                      <a href={book.freeUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] px-2 py-0.5 rounded-md hover:bg-[#2ed8c3]/20 transition-all">
                        🎁 Free
                      </a>
                    )}
                    {book.amazonUrl && (
                      <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md hover:bg-amber-500/20 transition-all">
                        Amazon
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 text-center bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-3xl p-10 md:p-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Ready to start?</h2>
          <p className="text-[#a0a0b0] mb-8 max-w-md mx-auto">
            Enroll free. Your Day 1 plan is waiting. No credit card, no paywalls, go at your own pace.
          </p>
          <Link href="/auth/signup"
            className="inline-flex items-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] text-[#241e20] font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-[#2ed8c3]/15">
            <Play className="w-4 h-4" /> Start Day 1 Free <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="mt-6 flex items-center justify-center gap-5 text-xs text-[#606070] flex-wrap">
            {['No credit card', 'No paywalls', 'Go at your pace', 'Free forever'].map(item => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[#2ed8c3]" />{item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-8 px-4 md:px-6 text-center">
        <p className="text-[#606070] text-xs">
          © {new Date().getFullYear()} Gmax MBA · A free initiative by{' '}
          <a href="https://gmaxdigitalsolutions.com" className="text-[#2ed8c3] hover:text-[#5ee3d2] transition-colors">
            Gmax Digital Solutions
          </a>
        </p>
      </footer>
    </div>
  )
}
