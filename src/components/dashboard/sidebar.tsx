'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Layers, BarChart3, Users, User, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/dashboard',            icon: LayoutDashboard, label: 'Dashboard'  },
  { href: '/dashboard/curriculum', icon: Layers,          label: 'Curriculum' },
  { href: '/dashboard/progress',   icon: BarChart3,       label: 'Progress'   },
  { href: '/dashboard/community',  icon: Users,           label: 'Community'  },
  { href: '/dashboard/profile',    icon: User,            label: 'Profile'    },
]

export function DashboardSidebar() {
  const path = usePathname()
  return (
    <aside className="fixed inset-y-0 left-0 w-[220px] bg-[#0a0a0f] border-r border-white/[0.06] flex flex-col z-40">
      {/* LOGO */}
      <div className="p-4 border-b border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-white/10">
            <Image
              src="/logo.png"
              alt="Gmax MBA"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <div className="font-display font-bold text-white text-base leading-tight">Gmax MBA</div>
            <div className="text-[10px] text-[#706870] tracking-wider font-mono uppercase">Dashboard</div>
          </div>
        </Link>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <div className="text-[9px] font-semibold text-[#504850] tracking-widest uppercase px-3 py-2">Navigation</div>
        {links.map(({ href, icon: Icon, label }) => {
          const active = href === '/dashboard' ? path === href : path.startsWith(href)
          return (
            <Link key={href} href={href} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all border',
              active
                ? 'bg-[#2ed8c3]/10 text-[#2ed8c3] border-[#2ed8c3]/20'
                : 'text-[#908890] hover:text-white hover:bg-white/[0.04] border-transparent'
            )}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* PHASE BADGE */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="bg-[#2ed8c3]/8 border border-[#2ed8c3]/15 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#2ed8c3]" />
            <span className="text-xs font-semibold text-[#2ed8c3]">Phase 1 Active</span>
          </div>
          <div className="text-[11px] text-[#706870] leading-relaxed">Business Foundations · Months 1–4</div>
          <div className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-[#2ed8c3] rounded-full w-0 transition-all" />
          </div>
        </div>
      </div>
    </aside>
  )
}
