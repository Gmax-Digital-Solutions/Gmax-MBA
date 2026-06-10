import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { MembersClient } from './client'
import { TOTAL_TASKS } from '@/lib/data/curriculum'

export default async function MembersPage() {
  const session = await getServerSession(authOptions)

  const members = await db.user.findMany({
    select: {
      id: true, name: true, company: true, role: true, bio: true,
      image: true, twitter: true, github: true, website: true,
      enrolledAt: true,
      progress: { where: { completed: true }, select: { id: true } },
    },
    orderBy: { enrolledAt: 'asc' },
  })

  return (
    <MembersClient
      members={members.map(m => ({
        id:        m.id,
        name:      m.name,
        company:   m.company,
        role:      m.role,
        bio:       m.bio,
        image:     m.image,
        twitter:   m.twitter,
        github:    m.github,
        website:   m.website,
        enrolledAt: m.enrolledAt.toISOString(),
        tasksDone: m.progress.length,
        totalTasks: TOTAL_TASKS,
      }))}
      currentUserId={session!.user.id}
    />
  )
}
