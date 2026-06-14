import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const day    = searchParams.get('day')
  const taskId = searchParams.get('taskId')

  if (day) {
    const summaries = await db.bookSummary.findMany({
      where:  { dayNumber: parseInt(day) },
      select: { id: true, title: true, readTime: true, bookTitle: true, taskId: true, content: true },
    })
    return NextResponse.json(summaries)
  }

  if (taskId) {
    const summary = await db.bookSummary.findFirst({
      where:  { taskId },
      select: { id: true, title: true, readTime: true, bookTitle: true, taskId: true, content: true },
    })
    return NextResponse.json(summary || null)
  }

  return NextResponse.json({ error: 'day or taskId param required' }, { status: 400 })
}
