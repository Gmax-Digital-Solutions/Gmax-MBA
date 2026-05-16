import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getInitials } from '@/lib/utils'
import { Users, Building2, Globe, Github, Twitter } from 'lucide-react'

const roleColors: Record<string, string> = {
  founder:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  engineer: 'bg-[#585de1]/10 text-[#7b7fe8] border-[#585de1]/20',
  builder:  'bg-[#2ed8c3]/10 text-[#2ed8c3] border-[#2ed8c3]/20',
  designer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  other:    'bg-white/[0.05] text-[#a0a0b0] border-white/[0.08]',
}
const roleLabels: Record<string, string> = {
  founder: 'Founder', engineer: 'Engineer', builder: 'Builder', designer: 'Designer', other: 'Member'
}

export default async function MembersPage() {
  const session = await getServerSession(authOptions)
  const [users, total, progressCounts] = await Promise.all([
    db.user.findMany({
      select: {
        id: true, name: true, company: true, role: true,
        bio: true, twitter: true, github: true, website: true, enrolledAt: true,
      },
      orderBy: { enrolledAt: 'asc' },
      take: 100,
    }),
    db.user.count(),
    db.progress.groupBy({
      by: ['userId'],
      where: { completed: true, type: 'task' },
      _count: { id: true },
    }),
  ])

  const progressMap = Object.fromEntries(progressCounts.map(p => [p.userId, p._count.id]))

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Members</h1>
          <p className="text-[#a0a0b0] text-sm">Founders and builders going through the program.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 flex-shrink-0">
          <Users className="w-4 h-4 text-[#2ed8c3]" />
          <span className="text-white font-semibold text-sm">{total}</span>
          <span className="text-[#606070] text-xs hidden sm:inline">enrolled</span>
        </div>
      </div>

      {/* Role breakdown */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {Object.entries(roleLabels).map(([role, label]) => {
          const count = users.filter(u => u.role === role).length
          return (
            <div key={role} className={`border rounded-xl p-2 md:p-3 text-center ${roleColors[role]}`}>
              <div className="font-display text-lg md:text-xl font-bold mb-0.5">{count}</div>
              <div className="text-[10px] md:text-xs font-medium leading-tight">{label}s</div>
            </div>
          )
        })}
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {users.map(u => {
          const tasks = progressMap[u.id] || 0
          const isYou = u.id === session!.user.id
          return (
            <div key={u.id}
              className={`bg-white/[0.02] border rounded-2xl p-4 md:p-5 transition-all hover:bg-white/[0.04]
                ${isYou ? 'border-[#2ed8c3]/25' : 'border-white/[0.06] hover:border-white/10'}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#2ed8c3]/15 border border-[#2ed8c3]/25 flex items-center justify-center text-sm font-bold text-[#2ed8c3] flex-shrink-0 font-display">
                  {getInitials(u.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-white font-semibold text-sm truncate">{u.name || 'Anonymous'}</span>
                    {isYou && (
                      <span className="text-[10px] bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 text-[#2ed8c3] px-1.5 py-0.5 rounded-full font-semibold">You</span>
                    )}
                  </div>
                  {u.company && (
                    <div className="flex items-center gap-1 text-xs text-[#606070] mt-0.5">
                      <Building2 className="w-2.5 h-2.5 flex-shrink-0" />
                      <span className="truncate">{u.company}</span>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${roleColors[u.role] || roleColors.other}`}>
                  {roleLabels[u.role] || 'Member'}
                </span>
              </div>

              {u.bio && (
                <p className="text-[#808090] text-xs leading-relaxed mb-3 line-clamp-2">{u.bio}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-[#606070]">
                  <span className="text-[#a0a0b0] font-semibold">{tasks}</span> tasks done
                </div>
                <div className="flex items-center gap-2">
                  {u.twitter && (
                    <a href={`https://twitter.com/${u.twitter.replace('@', '')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-[#606070] hover:text-[#7b7fe8] transition-colors">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {u.github && (
                    <a href={`https://github.com/${u.github.replace('github.com/', '')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-[#606070] hover:text-white transition-colors">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {u.website && (
                    <a href={u.website.startsWith('http') ? u.website : `https://${u.website}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-[#606070] hover:text-[#2ed8c3] transition-colors">
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
