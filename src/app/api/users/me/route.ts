import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getStudentProgress } from '@/lib/student-progress'

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
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const progress = await getStudentProgress(session.user.id, new Date(user.enrolledAt))

  return NextResponse.json({
    ...user,
    // Progress-aware day — picks up where the student left off instead
    // of auto-advancing purely from calendar time. Prefer this over
    // deriving a day number from enrolledAt on the client.
    currentDay: progress.activeDay,
    calendarDay: progress.calendarDay,
    isBehindSchedule: progress.isBehind,
    daysBehind: progress.daysBehind,
  })
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
