'use client'
import { signOut } from 'next-auth/react'
import { LogOut, Bell } from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { resetPostHog } from '@/lib/posthog'
import Image from 'next/image'
import Link from 'next/link'

export function DashboardTopbar({ user }: { user: any }) {
  const handleSignOut = () => {
    resetPostHog()
    signOut({ callbackUrl: '/' })
  }

  return (
    <header className="sticky top-0 z-30 bg-[#241e20]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 h-14 flex items-center justify-between flex-shrink-0">
      {/* Mobile: show logo. Desktop: show date */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2.5 lg:hidden">
          <div className="w-7 h-7 rounded-lg overflow-hidden bg-white border border-white/10 flex-shrink-0">
            <Image src="/logo.png" alt="Gmax MBA" width={28} height={28} className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-bold text-white text-base">Gmax MBA</span>
        </Link>
        <div className="hidden lg:block text-sm text-[#706870]">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg border border-white/[0.06] hover:border-white/10 flex items-center justify-center text-[#706870] hover:text-white transition-colors">
          <Bell className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-2.5 py-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#2ed8c3]/15 border border-[#2ed8c3]/25 flex items-center justify-center text-[10px] font-bold text-[#2ed8c3]">
            {getInitials(user?.name)}
          </div>
          <span className="text-sm text-white font-medium hidden sm:block">{user?.name?.split(' ')[0]}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="w-8 h-8 rounded-lg border border-white/[0.06] hover:border-red-500/30 hover:bg-red-500/10 flex items-center justify-center text-[#706870] hover:text-red-400 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  )
}
