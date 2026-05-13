import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const day = searchParams.get('day')
  const tasks = await db.dailyTask.findMany({
    where: { userId: session.user.id, ...(day ? { day: parseInt(day) } : {}) },
  })
  return NextResponse.json(tasks)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { day, taskId, done } = await req.json()
  const task = await db.dailyTask.upsert({
    where: { userId_day_taskId: { userId: session.user.id, day, taskId } },
    update: { done, updatedAt: new Date() },
    create: { userId: session.user.id, day, taskId, done },
  })
  return NextResponse.json(task)
}
