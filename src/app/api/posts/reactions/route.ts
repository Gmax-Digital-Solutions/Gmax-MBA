import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { postId, emoji } = await req.json()
  const validEmojis = ['👍', '🔥', '💡']
  if (!postId || !validEmojis.includes(emoji)) {
    return NextResponse.json({ error: 'Invalid postId or emoji' }, { status: 400 })
  }

  const existing = await db.reaction.findUnique({
    where: { postId_userId_emoji: { postId, userId: session.user.id, emoji } },
  })

  if (existing) {
    // Toggle off
    await db.reaction.delete({ where: { id: existing.id } })
    return NextResponse.json({ action: 'removed', emoji })
  } else {
    // Toggle on
    const reaction = await db.reaction.create({
      data: { postId, userId: session.user.id, emoji },
    })
    return NextResponse.json({ action: 'added', emoji, id: reaction.id })
  }
}
