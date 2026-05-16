import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const type      = searchParams.get('type')
  const moduleTag = searchParams.get('module')
  const cursor    = searchParams.get('cursor')
  const limit     = 20

  const posts = await db.post.findMany({
    where: {
      ...(type && type !== 'all' ? { type } : {}),
      ...(moduleTag ? { moduleTag } : {}),
    },
    include: {
      user: { select: { id: true, name: true, company: true, role: true, image: true } },
      replies: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'asc' },
      },
      reactions: { select: { id: true, userId: true, emoji: true } },
      _count: { select: { replies: true, reactions: true } },
    },
    orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }],
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
  })

  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content, type, moduleTag } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 })
  if (content.length > 2000) return NextResponse.json({ error: 'Post too long (max 2000 chars)' }, { status: 400 })

  const post = await db.post.create({
    data: {
      userId:    session.user.id,
      content:   content.trim(),
      type:      type || 'general',
      moduleTag: moduleTag || null,
    },
    include: {
      user: { select: { id: true, name: true, company: true, role: true, image: true } },
      replies:   { include: { user: { select: { id: true, name: true, image: true } } } },
      reactions: { select: { id: true, userId: true, emoji: true } },
      _count:    { select: { replies: true, reactions: true } },
    },
  })

  return NextResponse.json(post, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  const post = await db.post.findUnique({ where: { id }, select: { userId: true } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { isAdmin: true } })
  if (post.userId !== session.user.id && !user?.isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await db.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
