'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Layers, BarChart3, Users, User,
  GraduationCap, CalendarDays, BookMarked, CheckSquare2, Menu, X, MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const links = [
  { href: '/dashboard',            icon: LayoutDashboard, label: 'Dashboard'  },
  { href: '/dashboard/daily',      icon: CheckSquare2,    label: 'Today'      },
  { href: '/dashboard/calendar',   icon: CalendarDays,    label: 'Calendar'   },
  { href: '/dashboard/journal',    icon: BookMarked,      label: 'Journal'    },
  { href: '/dashboard/curriculum', icon: Layers,          label: 'Curriculum' },
  { href: '/dashboard/progress',   icon: BarChart3,       label: 'Progress'   },
  { href: '/dashboard/community',  icon: MessageSquare,   label: 'Community'  },
  { href: '/dashboard/members',    icon: Users,           label: 'Members'    },
  { href: '/dashboard/profile',    icon: User,            label: 'Profile'    },
]

const mobileLinks = links.slice(0, 4)

export function DashboardSidebar() {
  const path = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/dashboard' ? path === href : path.startsWith(href)

  return (
    <>
      {/* ── DESKTOP SIDEBAR ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[220px] bg-[#1e191b] border-r border-white/[0.06] flex-col z-40">
        <div className="p-4 border-b border-white/[0.06]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-white/10">
              <Image src="/logo.png" alt="Gmax MBA" width={40} height={40} className="w-full h-full object-cover" priority />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base leading-tight">Gmax MBA</div>
              <div className="text-[10px] text-[#706870] tracking-wider font-mono uppercase">Dashboard</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <div className="text-[9px] font-semibold text-[#504850] tracking-widest uppercase px-3 py-2">Main</div>
          {links.slice(0, 4).map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all border',
              isActive(href)
                ? 'bg-[#2ed8c3]/10 text-[#2ed8c3] border-[#2ed8c3]/20'
                : 'text-[#908890] hover:text-white hover:bg-white/[0.04] border-transparent'
            )}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {href === '/dashboard/daily' && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2ed8c3] animate-pulse" />
              )}
            </Link>
          ))}

          <div className="text-[9px] font-semibold text-[#504850] tracking-widest uppercase px-3 py-2 mt-2">Program</div>
          {links.slice(4).map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all border',
              isActive(href)
                ? 'bg-[#2ed8c3]/10 text-[#2ed8c3] border-[#2ed8c3]/20'
                : 'text-[#908890] hover:text-white hover:bg-white/[0.04] border-transparent'
            )}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

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

      {/* ── MOBILE BOTTOM NAV ───────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#1e191b]/95 backdrop-blur-xl border-t border-white/[0.08] pb-safe">
        <div className="flex items-center justify-around px-2">
          {mobileLinks.map(({ href, icon: Icon, label }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-0.5 py-3 px-3 min-w-[60px] relative">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-all', active ? 'bg-[#2ed8c3]/15' : '')}>
                  <Icon className={cn('w-5 h-5 transition-colors', active ? 'text-[#2ed8c3]' : 'text-[#706870]')} />
                  {href === '/dashboard/daily' && !active && (
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#2ed8c3] animate-pulse" />
                  )}
                </div>
                <span className={cn('text-[10px] font-medium transition-colors', active ? 'text-[#2ed8c3]' : 'text-[#706870]')}>{label}</span>
              </Link>
            )
          })}
          <button onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 py-3 px-3 min-w-[60px]">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <Menu className="w-5 h-5 text-[#706870]" />
            </div>
            <span className="text-[10px] font-medium text-[#706870]">More</span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE SLIDE-UP MENU ────────────────────────────────────── */}
      {mobileMenuOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#1e191b] border-t border-white/[0.08] rounded-t-3xl p-6 pb-10 animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-white/10">
                  <Image src="/logo.png" alt="Gmax MBA" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="font-display font-bold text-white">Gmax MBA</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-[#a0a0b0]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {links.map(({ href, icon: Icon, label }) => {
                const active = isActive(href)
                return (
                  <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                    className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all',
                      active
                        ? 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20 text-[#2ed8c3]'
                        : 'bg-white/[0.03] border-white/[0.06] text-[#a0a0b0] hover:border-white/10')}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                )
              })}
            </div>
            <div className="mt-4 bg-[#2ed8c3]/8 border border-[#2ed8c3]/15 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#2ed8c3]" />
                <span className="text-xs font-semibold text-[#2ed8c3]">Phase 1 Active</span>
              </div>
              <div className="text-[11px] text-[#706870]">Business Foundations · Months 1–4</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
