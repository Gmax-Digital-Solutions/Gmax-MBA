import { getServerSession } from 'next-auth'
import { authOptions }      from '@/lib/auth'
import { db }               from '@/lib/db'
import { notFound }         from 'next/navigation'
import Image                from 'next/image'
import Link                 from 'next/link'
import { getInitials }      from '@/lib/utils'
import { TOTAL_TASKS }      from '@/lib/data/curriculum'

const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  founder:  { label: 'Founder',  color: 'text-status-amber', bg: 'bg-status-amber/10', border: 'border-status-amber/20' },
  engineer: { label: 'Engineer', color: 'text-primary',      bg: 'bg-primary/10',       border: 'border-primary/20'      },
  builder:  { label: 'Builder',  color: 'text-secondary',    bg: 'bg-secondary/10',     border: 'border-secondary/20'    },
  designer: { label: 'Designer', color: 'text-purple-400',   bg: 'bg-purple-500/10',    border: 'border-purple-500/20'   },
  other:    { label: 'Member',   color: 'text-text-secondary', bg: 'bg-surface-container', border: 'border-border-subtle' },
}

export default async function MemberProfilePage({ params }: { params: { userId: string } }) {
  const session = await getServerSession(authOptions)

  const member = await db.user.findUnique({
    where:  { id: params.userId },
    select: {
      id: true, name: true, company: true, role: true, bio: true,
      image: true, twitter: true, github: true, website: true,
      enrolledAt: true,
      _count:    { select: { progress: true, posts: true } },
      progress:  { where: { completed: true }, select: { id: true } },
    },
  })
  if (!member) notFound()

  const isMe    = session?.user?.id === member.id
  const cfg     = ROLE_CONFIG[member.role || 'other'] || ROLE_CONFIG.other
  const daysIn  = Math.max(1, Math.floor((Date.now() - new Date(member.enrolledAt).getTime()) / 86400000))
  const pct     = Math.round((member.progress.length / TOTAL_TASKS) * 100)

  return (
    <div className="relative dot-grid min-h-full">
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Back */}
        <Link href="/dashboard/members"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary font-label-caps text-label-caps transition-colors mb-8">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Directory
        </Link>

        {/* Profile card */}
        <div className="glass-card rounded-2xl p-8 md:p-10 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-primary/20 flex-shrink-0 bg-surface-container flex items-center justify-center">
              {member.image ? (
                <Image src={member.image} alt={member.name || ''} width={96} height={96}
                  className="w-full h-full object-cover" unoptimized />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${cfg.bg}`}>
                  <span className={`font-label-mono font-bold text-2xl ${cfg.color}`}>{getInitials(member.name)}</span>
                </div>
              )}
            </div>

            {/* Name + details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="font-headline-sm text-headline-sm text-on-surface">{member.name || 'Anonymous'}</h1>
                {isMe && (
                  <span className="font-label-mono text-[9px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">YOU</span>
                )}
              </div>
              {member.company && (
                <p className="text-text-secondary text-body-sm mb-3 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">business</span>
                  {member.company}
                </p>
              )}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-label-caps text-[10px] ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                {cfg.label}
              </span>
            </div>

            {isMe && (
              <Link href="/dashboard/profile"
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 border border-border-subtle hover:border-primary/30 text-text-secondary hover:text-primary rounded-lg font-label-caps text-label-caps transition-all text-xs">
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit Profile
              </Link>
            )}
          </div>

          {/* Bio */}
          {member.bio && (
            <p className="font-body-md text-text-secondary leading-relaxed mb-8 border-l-2 border-primary/20 pl-4">{member.bio}</p>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-t border-b border-border-subtle">
            {[
              { label: 'Days In Program', val: daysIn,              color: 'text-primary'      },
              { label: 'Tasks Completed', val: member.progress.length, color: 'text-secondary' },
              { label: 'Progress',        val: `${pct}%`,            color: 'text-primary'      },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className={`font-display-lg text-2xl md:text-3xl font-bold mb-1 ${s.color}`}>{s.val}</div>
                <div className="font-label-caps text-[9px] text-text-tertiary uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="font-label-caps text-[10px] text-text-tertiary uppercase">Curriculum Progress</span>
              <span className="font-label-mono text-[10px] text-primary">{pct}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full progress-gradient rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-label-caps text-[10px] text-text-tertiary uppercase mr-2">Connect</p>
            {member.twitter && (
              <a href={`https://twitter.com/${member.twitter.replace('@','')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-text-secondary hover:text-primary hover:border-primary/30 transition-all font-label-caps text-label-caps">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
                Twitter
              </a>
            )}
            {member.github && (
              <a href={`https://github.com/${member.github.replace('@','')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-text-secondary hover:text-primary hover:border-primary/30 transition-all font-label-caps text-label-caps">
                <span className="material-symbols-outlined text-sm">code</span>
                GitHub
              </a>
            )}
            {member.website && (
              <a href={member.website.startsWith('http') ? member.website : `https://${member.website}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-text-secondary hover:text-primary hover:border-primary/30 transition-all font-label-caps text-label-caps">
                <span className="material-symbols-outlined text-sm">public</span>
                Website
              </a>
            )}
            {!member.twitter && !member.github && !member.website && (
              <span className="text-text-tertiary font-body-sm italic text-sm">No links added yet.</span>
            )}
          </div>
        </div>

        {/* Enrolled date */}
        <p className="text-center font-label-mono text-label-mono text-text-tertiary">
          Member since {new Date(member.enrolledAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
