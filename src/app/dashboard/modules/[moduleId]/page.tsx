import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getModuleById, ALL_MODULES } from '@/lib/data/curriculum'
import { notFound } from 'next/navigation'
import { ModuleClient } from './client'

export async function generateStaticParams() {
  return ALL_MODULES.map((m) => ({ moduleId: m.id }))
}

// In Next.js 16, params is a Promise in async Server Components
export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = await params

  const module = getModuleById(moduleId)
  if (!module) notFound()

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) notFound()

  const progress = await db.progress.findMany({
    where: {
      userId: session.user.id,
      moduleId: module.id,
    },
  })

  const notes = await db.note.findMany({
    where: {
      userId: session.user.id,
      moduleId: module.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <ModuleClient
      module={module}
      initialProgress={progress}
      initialNotes={notes}
      userId={session.user.id}
    />
  )
}