'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getInitials, cn } from '@/lib/utils'

const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  founder:  { label: 'Founder',  color: 'text-status-amber', bg: 'bg-status-amber/10', border: 'border-status-amber/20', icon: 'rocket_launch' },
  engineer: { label: 'Engineer', color: 'text-primary',      bg: 'bg-primary/10',       border: 'border-primary/20',      icon: 'terminal'      },
  builder:  { label: 'Builder',  color: 'text-secondary',    bg: 'bg-secondary/10',     border: 'border-secondary/20',    icon: 'construction'  },
  designer: { label: 'Designer', color: 'text-purple-400',   bg: 'bg-purple-500/10',    border: 'border-purple-500/20',   icon: 'palette'       },
  other:    { label: 'Member',   color: 'text-text-secondary', bg: 'bg-surface-container', border: 'border-border-subtle', icon: 'person'        },
}

const FILTERS = [
  { value: 'all',      label: 'All'       },
  { value: 'founder',  label: 'Founders'  },
  { value: 'engineer', label: 'Engineers' },
  { value: 'builder',  label: 'Builders'  },
  { value: 'designer', label: 'Designers' },
]

const PER_PAGE = 50

type Member = {
  id: string; name: string | null; company: string | null; role: string | null
  bio: string | null; image: string | null; twitter: string | null
  github: string | null; website: string | null; enrolledAt: string
  tasksDone: number; totalTasks: number
}

export function MembersClient({ members, currentUserId }: { members: Member[]; currentUserId: string }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage]     = useState(1)

  const filtered = useMemo(() => {
    let list = members
    if (filter !== 'all') list = list.filter(m => (m.role || 'other') === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(m =>
        m.name?.toLowerCase().includes(q) ||
        m.company?.toLowerCase().includes(q) ||
        m.bio?.toLowerCase().includes(q)
      )
    }
    return list
  }, [members, filter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // role breakdown counts
  const roleCounts = FILTERS.filter(f => f.value !== 'all').map(f => ({
    ...f,
    count: members.filter(m => (m.role || 'other') === f.value).length,
    cfg:   ROLE_CONFIG[f.value] || ROLE_CONFIG.other,
  }))

  return (
    <div className="relative dot-grid min-h-full">
      {/* Atmospheric glows */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />
      <div className="fixed bottom-10 right-10 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10">

        {/* ── PAGE HEADER ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-primary/10 text-primary font-label-mono text-[10px] rounded uppercase tracking-widest">
                Elite Network
              </span>
              <span className="text-text-tertiary font-label-mono text-label-mono">
                · {members.length} Members
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-text-primary">Cohort Directory</h1>
          </div>

          {/* Search */}
          <div className="flex items-center bg-surface-container px-4 py-2 rounded-full border border-border-subtle focus-within:border-primary transition-colors w-full md:w-72">
            <span className="material-symbols-outlined text-text-tertiary text-sm mr-2">search</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search members..."
              className="bg-transparent border-none outline-none font-label-mono text-body-sm placeholder:text-text-tertiary w-full focus:ring-0 text-text-primary"
            />
          </div>
        </div>

        {/* ── ROLE BREAKDOWN ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
          {roleCounts.map(r => (
            <div key={r.value} className="glass-card shimmer-top p-4 rounded-xl flex items-center gap-3">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', r.cfg.bg, 'border', r.cfg.border)}>
                <span className={cn('material-symbols-outlined text-lg', r.cfg.color)}
                  style={{ fontVariationSettings: "'FILL' 1" }}>{r.cfg.icon}</span>
              </div>
              <div>
                <div className={cn('font-label-mono font-bold text-lg leading-none', r.cfg.color)}>{r.count}</div>
                <div className="font-label-caps text-label-caps text-text-tertiary mt-0.5">{r.label}s</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTER PILLS ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 md:mb-10 scrollbar-hide flex-wrap md:flex-nowrap">
          {FILTERS.map(f => (
            <button key={f.value} onClick={() => { setFilter(f.value); setPage(1) }}
              className={cn(
                'px-4 md:px-5 py-2 rounded-full font-label-caps text-label-caps transition-all whitespace-nowrap flex-shrink-0',
                filter === f.value
                  ? 'bg-primary text-on-primary shadow-[0_0_10px_rgba(46,216,195,0.3)]'
                  : 'bg-surface-container-high border border-border-subtle text-text-secondary hover:border-primary/50 hover:text-primary'
              )}>
              {f.label}
              {f.value !== 'all' && (
                <span className="ml-1.5 opacity-60">
                  ({members.filter(m => (m.role || 'other') === f.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── MEMBER GRID ─────────────────────────────────────────── */}
        {paginated.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-xl">
            <span className="material-symbols-outlined text-4xl text-text-tertiary block mb-3">group_off</span>
            <p className="font-headline-sm text-on-surface mb-1">No members found</p>
            <p className="font-body-sm text-text-secondary">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {paginated.map(member => {
              const cfg    = ROLE_CONFIG[member.role || 'other'] || ROLE_CONFIG.other
              const isMe   = member.id === currentUserId
              const daysIn = Math.max(1, Math.floor((Date.now() - new Date(member.enrolledAt).getTime()) / 86400000))
              const pct    = member.totalTasks > 0
                ? Math.round((member.tasksDone / member.totalTasks) * 100)
                : 0

              return (
                <article key={member.id}
                  className={cn(
                    'glass-card rounded-xl p-6 flex flex-col group',
                    isMe && 'border-primary/30'
                  )}>

                  {/* Avatar row */}
                  <div className="flex items-start justify-between mb-5 md:mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-primary/20 p-0.5 md:p-1 group-hover:border-primary/50 transition-colors">
                        {member.image ? (
                          <Image src={member.image} alt={member.name || ''} width={64} height={64}
                            className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            unoptimized />
                        ) : (
                          <div className={cn('w-full h-full rounded-full flex items-center justify-center', cfg.bg)}>
                            <span className={cn('font-label-mono font-bold text-base', cfg.color)}>
                              {getInitials(member.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      {isMe && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-primary border-2 border-background rounded-full" />
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-label-mono text-[10px] text-text-tertiary uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                        Day {daysIn}
                      </span>
                    </div>
                  </div>

                  {/* Name + company */}
                  <div className="mb-5 md:mb-6">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className="font-headline-sm text-headline-sm text-text-primary">{member.name || 'Anonymous'}</h3>
                      {isMe && (
                        <span className="text-[9px] font-label-mono text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-full">YOU</span>
                      )}
                    </div>
                    {member.company && (
                      <p className="font-body-sm text-body-sm text-text-secondary">{member.company}</p>
                    )}
                    {member.bio && (
                      <p className="font-body-sm text-text-tertiary text-xs mt-2 line-clamp-2 leading-relaxed">{member.bio}</p>
                    )}
                  </div>

                  {/* Focus / role + progress */}
                  <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
                    <div>
                      <span className="font-label-caps text-[10px] text-text-tertiary uppercase block mb-2 tracking-widest">Role</span>
                      <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 border font-label-caps text-[10px] rounded-full', cfg.color, cfg.bg, cfg.border)}>
                        <span className="material-symbols-outlined text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
                        {cfg.label}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest">Progress</span>
                        <span className="font-label-mono text-[10px] text-primary">{pct}%</span>
                      </div>
                      <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    {member.twitter && (
                      <a href={`https://twitter.com/${member.twitter.replace('@','')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border-subtle text-text-tertiary hover:text-primary hover:border-primary/30 transition-all font-label-caps text-[9px]">
                        <span className="material-symbols-outlined text-xs">tag</span>
                      </a>
                    )}
                    {member.github && (
                      <a href={`https://github.com/${member.github.replace('@','')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border-subtle text-text-tertiary hover:text-primary hover:border-primary/30 transition-all font-label-caps text-[9px]">
                        <span className="material-symbols-outlined text-xs">code</span>
                      </a>
                    )}
                    {member.website && (
                      <a href={member.website.startsWith('http') ? member.website : `https://${member.website}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border-subtle text-text-tertiary hover:text-primary hover:border-primary/30 transition-all font-label-caps text-[9px]">
                        <span className="material-symbols-outlined text-xs">public</span>
                      </a>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href={isMe ? '/dashboard/profile' : `/dashboard/members/${member.id}`}
                    className="w-full mt-auto py-3 border border-border-subtle rounded-lg text-text-primary font-label-caps text-label-caps hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 text-center block">
                    {isMe ? 'Edit Profile' : 'View Profile'}
                  </Link>
                </article>
              )
            })}
          </div>
        )}

        {/* ── PAGINATION ──────────────────────────────────────────── */}
        <div className="mt-12 md:mt-16 flex flex-col items-center gap-4">
          <div className="text-text-tertiary font-label-mono text-[11px] uppercase tracking-[0.2em]">
            Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} members
          </div>
          <nav className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-lg border border-border-subtle text-text-tertiary transition-all',
                page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:border-primary/50 hover:text-primary'
              )}>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-lg font-label-mono transition-all',
                  p === page
                    ? 'bg-primary text-on-primary shadow-[0_0_10px_rgba(46,216,195,0.2)]'
                    : 'border border-border-subtle text-text-tertiary hover:border-primary/50 hover:text-primary'
                )}>
                {p}
              </button>
            ))}

            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-lg border border-border-subtle text-text-tertiary transition-all',
                page === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:border-primary/50 hover:text-primary'
              )}>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </nav>
        </div>

      </div>
    </div>
  )
}
