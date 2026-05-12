import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM } from '@/lib/data/curriculum'
import Link from 'next/link'
import { BookOpen, CheckCircle2, ArrowRight, Play } from 'lucide-react'

export default async function CurriculumPage() {
  const session = await getServerSession(authOptions)
  const progress = await db.progress.findMany({ where: { userId: session!.user.id } })

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-white mb-2">Curriculum</h1>
        <p className="text-[#a0a0b0] text-sm">4 phases · 12 modules · 29 books · 36 months of structured learning</p>
      </div>
      {CURRICULUM.map(phase => {
        const phaseTasks = phase.modules.flatMap(m => m.tasks)
        const doneTasks = phaseTasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
        const phasePct = Math.round((doneTasks / phaseTasks.length) * 100)
        const colorMap: Record<string, { border: string; text: string; bg: string; bar: string }> = {
          blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/8', bar: 'bg-blue-500' },
          green: { border: 'border-[#2ed8c3]/30', text: 'text-[#2ed8c3]', bg: 'bg-[#2ed8c3]/8', bar: 'bg-[#2ed8c3]' },
          purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/8', bar: 'bg-purple-500' },
          gold: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/8', bar: 'bg-amber-500' },
        }
        const c = colorMap[phase.color] || colorMap.green
        return (
          <div key={phase.id}>
            <div className={`flex items-center justify-between border ${c.border} ${c.bg} rounded-2xl px-6 py-4 mb-4`}>
              <div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${c.text}`}>Phase {phase.number}</span>
                  <h2 className="font-display text-xl font-bold text-white">{phase.title}</h2>
                  <span className="text-xs text-[#606070] font-mono">{phase.months}</span>
                </div>
                <p className="text-[#808090] text-sm mt-1 max-w-xl">{phase.description}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-6">
                <div className={`font-display text-2xl font-bold ${c.text}`}>{phasePct}%</div>
                <div className="text-xs text-[#606070]">{doneTasks}/{phaseTasks.length} tasks</div>
              </div>
            </div>
            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden mb-5">
              <div className={`h-full rounded-full transition-all ${c.bar}`} style={{ width: `${phasePct}%` }} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {phase.modules.map(mod => {
                const modDone = mod.tasks.filter(t => progress.find(r => r.taskId === t.id && r.completed)).length
                const booksDone = mod.books.filter(b => progress.find(r => r.bookId === b.id && r.type === 'book' && r.completed)).length
                const modPct = Math.round((modDone / mod.tasks.length) * 100)
                const isComplete = modPct === 100
                return (
                  <Link key={mod.id} href={`/dashboard/modules/${mod.id}`}
                    className={`group bg-white/[0.02] hover:bg-white/[0.04] border rounded-2xl p-5 transition-all ${isComplete ? 'border-[#2ed8c3]/20' : 'border-white/[0.06] hover:border-white/10'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs font-bold text-[#a0a0b0]">
                          {mod.number}
                        </div>
                        {isComplete && <CheckCircle2 className="w-4 h-4 text-[#2ed8c3]" />}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#404050] group-hover:text-[#a0a0b0] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-0.5 group-hover:text-[#2ed8c3] transition-colors">{mod.title}</h3>
                    <p className="text-[#606070] text-xs mb-3">{mod.tag}</p>
                    <div className="flex items-center gap-4 text-xs text-[#606070] mb-3">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {booksDone}/{mod.books.length} books</span>
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {modDone}/{mod.tasks.length} tasks</span>
                    </div>
                    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${isComplete ? 'bg-[#2ed8c3]' : c.bar}`} style={{ width: `${modPct}%` }} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
