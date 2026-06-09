import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  // Send users who haven't completed onboarding back to it
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { onboarded: true },
  })
  if (!user?.onboarded) redirect('/onboarding')

  return (
    <div className="min-h-screen bg-[#171214] flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px]">
        <DashboardTopbar user={session.user} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
