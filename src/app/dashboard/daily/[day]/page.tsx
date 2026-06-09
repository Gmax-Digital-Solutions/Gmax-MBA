import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getPlanByDay, DAILY_PLAN } from '@/lib/data/daily-plan'
import { notFound } from 'next/navigation'
import { DailyClient } from '../client'

export async function generateStaticParams() {
  return DAILY_PLAN.map(p => ({ day: String(p.day) }))
}

export default async function SpecificDayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params
  const dayNum = parseInt(day)
  if (isNaN(dayNum) || dayNum < 1) notFound()

  const plan = getPlanByDay(dayNum)
  if (!plan) notFound()

  const session  = await getServerSession(authOptions)
  const user     = await db.user.findUnique({
    where:  { id: session!.user.id },
    select: { enrolledAt: true, name: true },
  })

  // Date this day corresponds to for the user
  const enrolledAt  = new Date(user!.enrolledAt)
  const dayDate     = new Date(enrolledAt)
  dayDate.setDate(dayDate.getDate() + dayNum - 1)
  const dateStr = dayDate.toISOString().split('T')[0]

  const currentDay = Math.floor((Date.now() - enrolledAt.getTime()) / 86400000) + 1
  const isPast     = dayNum < currentDay
  const isToday    = dayNum === currentDay
  const isFuture   = dayNum > currentDay

  const [dailyTasks, journalEntry] = await Promise.all([
    db.dailyTask.findMany({ where: { userId: session!.user.id, day: dayNum } }),
    db.journalEntry.findUnique({ where: { userId_date: { userId: session!.user.id, date: dateStr } } }),
  ])

  return (
    <DailyClient
      plan={plan}
      initialDailyTasks={dailyTasks}
      initialJournalEntry={journalEntry}
      today={dateStr}
      dayNumber={dayNum}
      userName={user!.name || 'Friend'}
      isPast={isPast}
      isToday={isToday}
      isFuture={isFuture}
      currentDay={currentDay}
    />
  )
}
