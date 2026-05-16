import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { postId, content } = await req.json()
  if (!postId || !content?.trim()) return NextResponse.json({ error: 'postId and content required' }, { status: 400 })
  if (content.length > 1000) return NextResponse.json({ error: 'Reply too long (max 1000 chars)' }, { status: 400 })

  const reply = await db.reply.create({
    data: { postId, userId: session.user.id, content: content.trim() },
    include: { user: { select: { id: true, name: true, image: true } } },
  })

  return NextResponse.json(reply, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  const reply = await db.reply.findUnique({ where: { id }, select: { userId: true } })
  if (!reply) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { isAdmin: true } })
  if (reply.userId !== session.user.id && !user?.isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await db.reply.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
