'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Layers, BarChart3, Users, User,
  CalendarDays, BookMarked, CheckSquare2, Menu, X, MessageSquare, BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const mainLinks = [
  { href: '/dashboard',            icon: 'dashboard',      label: 'Dashboard',  lucide: LayoutDashboard },
  { href: '/dashboard/daily',      icon: 'today',          label: 'Today',      lucide: CheckSquare2,   pulse: true },
  { href: '/dashboard/calendar',   icon: 'calendar_month', label: 'Calendar',   lucide: CalendarDays    },
  { href: '/dashboard/journal',    icon: 'edit_note',      label: 'Journal',    lucide: BookMarked      },
]

const programLinks = [
  { href: '/dashboard/curriculum', icon: 'menu_book',   label: 'Curriculum',  lucide: Layers      },
  { href: '/dashboard/progress',   icon: 'trending_up', label: 'Progress',    lucide: BarChart3   },
  { href: '/dashboard/community',  icon: 'forum',       label: 'Community',   lucide: MessageSquare },
  { href: '/dashboard/members',    icon: 'group',       label: 'Members',     lucide: Users       },
  { href: '/dashboard/profile',    icon: 'person',      label: 'Profile',     lucide: User        },
]

const allLinks = [...mainLinks, ...programLinks]
const mobileMainLinks = mainLinks

export function DashboardSidebar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/dashboard' ? path === href : path.startsWith(href)

  return (
    <>
      {/* ── DESKTOP SIDEBAR ──────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-background border-r border-border-subtle py-8 z-40">

        {/* Logo */}
        <div className="px-6 mb-8">
          <Link href="/dashboard">
            <p className="font-headline-sm text-headline-sm text-on-surface italic mb-0.5">Gmax MBA</p>
            <p className="text-text-secondary text-body-sm opacity-70 font-label-caps text-label-caps">Free Business School</p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto space-y-0.5 px-2">
          {/* Main section */}
          <p className="font-label-caps text-label-caps text-text-tertiary uppercase px-4 py-2 mt-1">Main</p>
          {mainLinks.map(({ href, icon, label, pulse }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative',
                  active
                    ? 'bg-primary/8 text-primary border-r-2 border-primary'
                    : 'text-text-secondary hover:bg-border-subtle hover:text-text-primary'
                )}>
                <span className={cn(
                  'material-symbols-outlined text-xl transition-all',
                  active ? '' : 'group-hover:scale-110'
                )} style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                  {icon}
                </span>
                <span className="font-label-caps text-label-caps">{label}</span>
                {pulse && !active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            )
          })}

          {/* Program section */}
          <p className="font-label-caps text-label-caps text-text-tertiary uppercase px-4 py-2 mt-4">Program</p>
          {programLinks.map(({ href, icon, label }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                  active
                    ? 'bg-primary/8 text-primary border-r-2 border-primary'
                    : 'text-text-secondary hover:bg-border-subtle hover:text-text-primary'
                )}>
                <span className={cn('material-symbols-outlined text-xl transition-all', !active && 'group-hover:scale-110')}
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                  {icon}
                </span>
                <span className="font-label-caps text-label-caps">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-4 mt-4 space-y-3 border-t border-border-subtle pt-4">
          <div className="glass-card rounded-xl p-3 border border-primary/15">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              <span className="font-label-caps text-label-caps text-primary">Phase 1 Active</span>
            </div>
            <p className="text-text-tertiary text-body-sm font-label-mono text-label-mono">Business Foundations</p>
            <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-0 transition-all" />
            </div>
          </div>
          {/* {[
            { href: '/', icon: 'settings', label: 'Settings' },
            { href: '/', icon: 'help',     label: 'Support'  },
          ].map(({ href, icon, label }) => (
            <Link key={label} href={href}
              className="flex items-center gap-3 px-2 py-2 text-text-secondary hover:text-on-surface transition-colors group rounded-lg hover:bg-border-subtle">
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">{icon}</span>
              <span className="font-label-caps text-label-caps">{label}</span>
            </Link>
          ))} */}
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-container/95 backdrop-blur-xl border-t border-border-subtle pb-safe">
        <div className="flex items-center justify-around px-2">
          {mobileMainLinks.map(({ href, icon, label, pulse }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-0.5 py-3 px-3 min-w-[60px] relative">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-all', active && 'bg-primary/10')}>
                  <span className={cn('material-symbols-outlined text-xl transition-colors', active ? 'text-primary' : 'text-text-secondary')}
                    style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
                  {pulse && !active && (
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <span className={cn('font-label-caps text-[9px] tracking-widest transition-colors', active ? 'text-primary' : 'text-text-secondary')}>
                  {label.toUpperCase()}
                </span>
              </Link>
            )
          })}

          {/* More */}
          <button onClick={() => setOpen(true)}
            className="flex flex-col items-center gap-0.5 py-3 px-3 min-w-[60px]">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-text-secondary">menu</span>
            </div>
            <span className="font-label-caps text-[9px] tracking-widest text-text-secondary">MORE</span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE SLIDE-UP SHEET ────────────────────────────────────── */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-container border-t border-border-subtle rounded-t-3xl p-5 md:p-6 pb-10">
            <div className="flex items-center justify-between mb-5">
              <p className="font-headline-sm text-on-surface italic">Gmax MBA</p>
              <button onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-border-subtle flex items-center justify-center text-text-secondary">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allLinks.map(({ href, icon, label }) => {
                const active = isActive(href)
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all',
                      active
                        ? 'bg-primary/8 border-primary/20 text-primary'
                        : 'border-border-subtle text-text-secondary hover:border-border-hover'
                    )}>
                    <span className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
                    <span className="font-label-caps text-label-caps">{label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}
