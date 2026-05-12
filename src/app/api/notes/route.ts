import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const moduleId = searchParams.get('moduleId')
  const notes = await db.note.findMany({
    where: { userId: session.user.id, ...(moduleId ? { moduleId } : {}) },
    orderBy: { updatedAt: 'desc' },
  })
  return NextResponse.json(notes)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { moduleId, content, type, id } = await req.json()
  if (id) {
    const note = await db.note.update({ where: { id }, data: { content, updatedAt: new Date() } })
    return NextResponse.json(note)
  }
  const note = await db.note.create({ data: { userId: session.user.id, moduleId, content, type: type || 'general' } })
  return NextResponse.json(note)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await db.note.delete({ where: { id, userId: session.user.id } })
  return NextResponse.json({ ok: true })
}
