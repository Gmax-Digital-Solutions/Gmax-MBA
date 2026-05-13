import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  if (date) {
    const entry = await db.journalEntry.findUnique({ where: { userId_date: { userId: session.user.id, date } } })
    return NextResponse.json(entry)
  }
  const entries = await db.journalEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' },
    take: 60,
  })
  return NextResponse.json(entries)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { date, day, content, mood } = await req.json()
  const entry = await db.journalEntry.upsert({
    where: { userId_date: { userId: session.user.id, date } },
    update: { content, mood, updatedAt: new Date() },
    create: { userId: session.user.id, date, day, content, mood },
  })
  return NextResponse.json(entry)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { date } = await req.json()
  await db.journalEntry.delete({ where: { userId_date: { userId: session.user.id, date } } })
  return NextResponse.json({ ok: true })
}
