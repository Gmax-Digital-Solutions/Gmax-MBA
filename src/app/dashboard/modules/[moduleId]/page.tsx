import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CURRICULUM } from '@/lib/data/curriculum'
import { notFound } from 'next/navigation'
import { ModuleClient } from './client'

export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  const session  = await getServerSession(authOptions)
  const userId   = session!.user.id

  // Find module across all phases
  let foundMod: any = null
  let foundPhase: any = null
  for (const phase of CURRICULUM) {
    const mod = phase.modules.find(m => m.id === params.moduleId)
    if (mod) { foundMod = mod; foundPhase = phase; break }
  }
  if (!foundMod) notFound()

  const [progress, notes] = await Promise.all([
    db.progress.findMany({ where: { userId } }),
    db.note.findMany({
      where:   { userId, moduleId: params.moduleId },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const tasksDone  = foundMod.tasks.filter((t: any) => progress.find((r: any) => r.taskId === t.id && r.completed)).length
  const booksDone  = foundMod.books.filter((b: any) => progress.find((r: any) => r.bookId === b.id && r.type === 'book' && r.completed)).length
  const pct        = foundMod.tasks.length ? Math.round((tasksDone / foundMod.tasks.length) * 100) : 0

  return (
    <ModuleClient
      module={foundMod}
      phase={foundPhase}
      progress={progress}
      notes={notes.map((n: any) => ({
        id: n.id, content: n.content,
        createdAt: n.createdAt.toISOString(),
      }))}
      tasksDone={tasksDone}
      booksDone={booksDone}
      pct={pct}
      userId={userId}
    />
  )
}
