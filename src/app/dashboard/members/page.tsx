import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { MembersClient } from './client'

export default async function MembersPage() {
  const session = await getServerSession(authOptions)

  const [members, totalTasks] = await Promise.all([
    db.user.findMany({
      select: {
        id: true, name: true, company: true, role: true, bio: true,
        image: true, twitter: true, github: true, website: true,
        enrolledAt: true,
        _count: { select: { progress: true } },
        progress: { where: { completed: true }, select: { id: true } },
      },
      orderBy: { enrolledAt: 'asc' },
    }),
    // total tasks in program for progress %
    db.progress.groupBy({ by: ['userId'], _count: { id: true } }),
  ])

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
        totalTasks: m._count.progress,
      }))}
      currentUserId={session!.user.id}
    />
  )
}
