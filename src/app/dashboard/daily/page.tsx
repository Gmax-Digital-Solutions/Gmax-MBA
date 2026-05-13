import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getTodayPlan } from '@/lib/data/daily-plan'
import { DailyClient } from './client'

export default async function DailyPage() {
  const session = await getServerSession(authOptions)
  const user = await db.user.findUnique({
    where: { id: session!.user.id },
    select: { enrolledAt: true, name: true }
  })
  const plan = getTodayPlan(new Date(user!.enrolledAt))
  const today = new Date().toISOString().split('T')[0]
  const daysElapsed = Math.floor((Date.now() - new Date(user!.enrolledAt).getTime()) / 86400000) + 1

  const [dailyTasks, journalEntry] = await Promise.all([
    db.dailyTask.findMany({ where: { userId: session!.user.id, day: plan?.day || 1 } }),
    db.journalEntry.findUnique({ where: { userId_date: { userId: session!.user.id, date: today } } }),
  ])

  return (
    <DailyClient
      plan={plan}
      initialDailyTasks={dailyTasks}
      initialJournalEntry={journalEntry}
      today={today}
      dayNumber={daysElapsed}
      userName={user!.name || 'Friend'}
    />
  )
}
