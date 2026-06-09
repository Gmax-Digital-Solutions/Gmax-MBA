'use client'
import { signOut } from 'next-auth/react'
import { getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function DashboardTopbar({ user }: { user: any }) {
  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border-subtle h-14 md:h-16 flex items-center justify-between flex-shrink-0 px-4 md:px-8">
      {/* Mobile: brand name. Desktop: date */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <span className="font-headline-sm text-on-surface opacity-60 italic">Gmax MBA</span>
        </Link>
        <div className="hidden lg:block font-label-mono text-label-mono text-text-tertiary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Bell */}
        <button className="w-8 h-8 rounded-lg border border-border-subtle hover:border-border-hover flex items-center justify-center text-text-secondary hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-base">notifications</span>
        </button>

        {/* User pill */}
        <div className="flex items-center gap-2 bg-white/[0.03] border border-border-subtle rounded-xl px-2.5 py-1.5">
          <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
            {user?.image ? (
              <Image src={user.image} alt={user.name || 'User'} width={24} height={24} className="w-full h-full object-cover" unoptimized />
            ) : (
              <div className="w-full h-full bg-primary/15 flex items-center justify-center">
                <span className="font-label-mono text-[8px] font-bold text-primary">{getInitials(user?.name)}</span>
              </div>
            )}
          </div>
          <span className="font-label-caps text-label-caps text-on-surface hidden sm:block">{user?.name?.split(' ')[0]}</span>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-8 h-8 rounded-lg border border-border-subtle hover:border-status-red/30 hover:bg-status-red/10 flex items-center justify-center text-text-secondary hover:text-status-red transition-all">
          <span className="material-symbols-outlined text-base">logout</span>
        </button>
      </div>
    </header>
  )
}
