import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getPlanByDay, DAILY_PLAN } from '@/lib/data/daily-plan'
import { getStudentProgress } from '@/lib/student-progress'
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

  // Date this specific day corresponds to, for journal lookups — purely
  // a label, since this page can be viewed for any day regardless of
  // where the student's actual progress sits.
  const enrolledAt  = new Date(user!.enrolledAt)
  const dayDate     = new Date(enrolledAt)
  dayDate.setDate(dayDate.getDate() + dayNum - 1)
  const dateStr = dayDate.toISOString().split('T')[0]

  const { activeDay } = await getStudentProgress(session!.user.id, enrolledAt)
  const isPast     = dayNum < activeDay
  const isToday    = dayNum === activeDay
  const isFuture   = dayNum > activeDay

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
      currentDay={activeDay}
    />
  )
}
