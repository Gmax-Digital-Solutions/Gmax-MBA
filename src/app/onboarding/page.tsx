import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { OnboardingClient } from './client'

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  const user = await db.user.findUnique({
    where:  { id: session.user.id },
    select: { name: true, onboarded: true },
  })

  if (user?.onboarded) redirect('/dashboard')

  return <OnboardingClient userName={user?.name || 'Friend'} />
}
