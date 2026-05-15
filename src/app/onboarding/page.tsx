import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { OnboardingClient } from './client'
import { getTodayPlan } from '@/lib/data/daily-plan'

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, enrolledAt: true, onboarded: true },
  })

  // Already onboarded — go to dashboard
  if (user?.onboarded) redirect('/dashboard')

  const day1 = getTodayPlan(new Date(user!.enrolledAt))

  return <OnboardingClient userName={user?.name || 'there'} day1={day1} userId={session.user.id} />
}
