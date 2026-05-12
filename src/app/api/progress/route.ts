import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const records = await db.progress.findMany({ where: { userId: session.user.id } })
  return NextResponse.json(records)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { moduleId, taskId, bookId, type, completed } = await req.json()
  const upserted = await db.progress.upsert({
    where: { userId_moduleId_taskId: { userId: session.user.id, moduleId, taskId: taskId || '' } },
    update: { completed, updatedAt: new Date() },
    create: { userId: session.user.id, moduleId, taskId: taskId || '', bookId: bookId || null, type, completed },
  })
  return NextResponse.json(upserted)
}
