import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, name: true, email: true, company: true, bio: true,
      role: true, twitter: true, github: true, website: true,
      enrolledAt: true, image: true, onboarded: true,
    },
  })
  return NextResponse.json(user)
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { name, company, bio, role, twitter, github, website, onboarded } = body
  const user = await db.user.update({
    where: { id: session.user.id },
    data: {
      ...(name      !== undefined && { name }),
      ...(company   !== undefined && { company }),
      ...(bio       !== undefined && { bio }),
      ...(role      !== undefined && { role }),
      ...(twitter   !== undefined && { twitter }),
      ...(github    !== undefined && { github }),
      ...(website   !== undefined && { website }),
      ...(onboarded !== undefined && { onboarded }),
      lastSeen: new Date(),
    },
    select: { id: true, name: true, email: true, company: true, role: true, onboarded: true },
  })
  return NextResponse.json(user)
}
