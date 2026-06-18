import { db } from '@/lib/db'
import { getActiveDayNumber, getCalendarDay, getPlanByDay, type DayPlan } from '@/lib/data/daily-plan'

/**
 * Fetches the distinct set of day numbers for which this user has
 * completed at least one task, then derives the day they should land
 * on — picking up where they left off instead of auto-skipping ahead
 * just because calendar days passed.
 *
 * This is the single source of truth for "what day is it for this
 * student" across the whole app. Every page that previously computed
 * `currentDay` from enrolledAt + Date.now() directly should call this
 * instead.
 */
export async function getStudentProgress(userId: string, enrolledAt: Date) {
  const completedRows = await db.dailyTask.findMany({
    where:   { userId, done: true },
    select:  { day: true },
    distinct: ['day'],
  })

  const completedDays = completedRows.map(r => r.day)
  const calendarDay   = getCalendarDay(enrolledAt)
  const activeDay      = getActiveDayNumber(enrolledAt, completedDays)
  const isBehind       = activeDay < calendarDay
  const daysBehind      = Math.max(0, calendarDay - activeDay)

  return {
    /** The day number the student should actually be working on. */
    activeDay,
    /** What the calendar alone would say — the "unlocked through" ceiling. */
    calendarDay,
    /** True if the student has unfinished work from previous days. */
    isBehind,
    /** How many days of content they're currently behind on. */
    daysBehind,
    /** All days with at least one completed task, sorted ascending. */
    completedDays: completedDays.sort((a, b) => a - b),
  }
}

/** Convenience: active day's full DayPlan, or null past the end of the curriculum. */
export async function getActiveDayPlan(userId: string, enrolledAt: Date): Promise<{
  plan: DayPlan | null
  activeDay: number
  calendarDay: number
  isBehind: boolean
  daysBehind: number
}> {
  const progress = await getStudentProgress(userId, enrolledAt)
  return {
    plan: getPlanByDay(progress.activeDay),
    activeDay: progress.activeDay,
    calendarDay: progress.calendarDay,
    isBehind: progress.isBehind,
    daysBehind: progress.daysBehind,
  }
}
