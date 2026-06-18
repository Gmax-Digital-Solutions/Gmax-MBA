import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getActiveDayPlan } from '@/lib/student-progress'
import { DailyClient } from './client'

export default async function DailyPage() {
  const session = await getServerSession(authOptions)
  const user    = await db.user.findUnique({
    where:  { id: session!.user.id },
    select: { enrolledAt: true, name: true },
  })

  const enrolledAt = new Date(user!.enrolledAt)
  const { plan, activeDay, isBehind, daysBehind } = await getActiveDayPlan(session!.user.id, enrolledAt)

  // The journal date should reflect the actual calendar date the student
  // is sitting at, not the active day's "would-be" date, so journal
  // entries always key off the real day they're writing on.
  const today = new Date().toISOString().split('T')[0]

  const [dailyTasks, journalEntry] = await Promise.all([
    db.dailyTask.findMany({ where: { userId: session!.user.id, day: plan?.day || 1 } }),
    db.journalEntry.findUnique({
      where: { userId_date: { userId: session!.user.id, date: today } },
    }),
  ])

  return (
    <DailyClient
      plan={plan}
      initialDailyTasks={dailyTasks}
      initialJournalEntry={journalEntry}
      today={today}
      dayNumber={activeDay}
      userName={user!.name || 'Friend'}
      isToday={true}
      isPast={false}
      isFuture={false}
      currentDay={activeDay}
      isBehindSchedule={isBehind}
      daysBehind={daysBehind}
    />
  )
}
