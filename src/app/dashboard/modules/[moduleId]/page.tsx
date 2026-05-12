import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getModuleById, ALL_MODULES } from '@/lib/data/curriculum'
import { notFound } from 'next/navigation'
import { ModuleClient } from './client'

export async function generateStaticParams() {
  return ALL_MODULES.map(m => ({ moduleId: m.id }))
}

export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = getModuleById(params.moduleId)
  if (!module) notFound()
  const session = await getServerSession(authOptions)
  const progress = await db.progress.findMany({ where: { userId: session!.user.id, moduleId: module.id } })
  const notes = await db.note.findMany({ where: { userId: session!.user.id, moduleId: module.id }, orderBy: { createdAt: 'desc' } })
  return <ModuleClient module={module} initialProgress={progress} initialNotes={notes} userId={session!.user.id} />
}
