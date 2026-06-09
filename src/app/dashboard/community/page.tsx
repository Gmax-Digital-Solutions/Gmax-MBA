'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ALL_MODULES } from '@/lib/data/curriculum'
import { getInitials } from '@/lib/utils'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

type User    = { id: string; name: string | null; company?: string | null; role?: string; image?: string | null }
type Reply   = { id: string; postId: string; userId: string; content: string; createdAt: string; user: User }
type PostRx  = { id: string; userId: string; emoji: string }
type Post    = { id: string; userId: string; content: string; type: string; moduleTag?: string | null; pinned: boolean; createdAt: string; user: User; replies: Reply[]; reactions: PostRx[]; _count: { replies: number; reactions: number } }

const POST_TYPES = [
  { value: 'all',      label: 'All Posts'  },
  { value: 'question', label: 'Questions'  },
  { value: 'win',      label: 'Wins'       },
  { value: 'insight',  label: 'Insights'   },
  { value: 'resource', label: 'Resources'  },
  { value: 'general',  label: 'General'    },
]

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  question: { label: 'Question', color: 'text-[#585de1]', bg: 'bg-[#585de1]/10', border: 'border-[#585de1]/20', icon: 'help'           },
  win:      { label: 'Win',      color: 'text-status-amber', bg: 'bg-status-amber/10', border: 'border-status-amber/20', icon: 'military_tech' },
  insight:  { label: 'Insight',  color: 'text-primary',   bg: 'bg-primary/10',   border: 'border-primary/20',   icon: 'lightbulb'      },
  resource: { label: 'Resource', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'attachment'    },
  general:  { label: 'General',  color: 'text-text-secondary', bg: 'bg-surface-container', border: 'border-border-subtle', icon: 'forum' },
}

const ROLE_COLORS: Record<string, string> = {
  founder:  'bg-status-amber/10 text-status-amber',
  engineer: 'bg-primary/10 text-primary',
  builder:  'bg-secondary/10 text-secondary',
  designer: 'bg-purple-500/10 text-purple-400',
  other:    'bg-surface-bright text-text-secondary',
}

const REACTIONS = [
  { emoji: '👍', icon: 'thumb_up'           },
  { emoji: '🔥', icon: 'local_fire_department' },
  { emoji: '💡', icon: 'lightbulb'           },
]

function timeAgo(dateStr: string) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60)    return 'Just Now'
  if (diff < 3600)  return `${Math.floor(diff / 60)}h ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function Avatar({ user, size = 10 }: { user: User; size?: number }) {
  const px = size * 4
  if (user.image) return (
    <div className="rounded-full overflow-hidden flex-shrink-0 border border-border-subtle" style={{ width: px, height: px }}>
      <Image src={user.image} alt={user.name || ''} width={px} height={px} className="w-full h-full object-cover" unoptimized />
    </div>
  )
  return (
    <div className="rounded-full flex-shrink-0 border border-border-subtle bg-surface-bright flex items-center justify-center"
      style={{ width: px, height: px }}>
      <span className="font-label-mono font-bold text-primary" style={{ fontSize: size * 1.4 }}>{getInitials(user.name)}</span>
    </div>
  )
}

export default function CommunityPage() {
  const { data: session } = useSession()
  const [posts, setPosts]         = useState<Post[]>([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('all')
  const [isAdmin, setIsAdmin]     = useState(false)
  const [memberCount, setMemberCount] = useState(0)
  const [content, setContent]     = useState('')
  const [postType, setPostType]   = useState('general')
  const [moduleTag, setModuleTag] = useState('')
  const [posting, setPosting]     = useState(false)
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})
  const [sendingReply, setSendingReply] = useState<string | null>(null)
  const pollRef = useRef<NodeJS.Timeout | null>(null)

  const currentUser: User = {
    id:   session?.user?.id || '',
    name: session?.user?.name || 'You',
    image: (session?.user as any)?.image,
  }

  const fetchPosts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('type', filter)
      const res = await fetch(`/api/posts?${params}`)
      if (res.ok) setPosts(await res.json())
    } finally { if (!silent) setLoading(false) }
  }, [filter])

  useEffect(() => {
    fetchPosts()
    pollRef.current = setInterval(() => fetchPosts(true), 30000)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [fetchPosts])

  useEffect(() => {
    fetch('/api/users/me').then(r => r.json()).then(u => setIsAdmin(u.isAdmin || false))
    fetch('/api/users/count').then(r => r.json()).then(d => setMemberCount(d.count || 0)).catch(() => {})
  }, [])

  async function handlePost() {
    if (!content.trim() || posting) return
    setPosting(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type: postType, moduleTag: moduleTag || null }),
      })
      if (!res.ok) { toast.error('Failed to post'); return }
      const post = await res.json()
      setPosts(prev => [post, ...prev])
      setContent(''); setPostType('general'); setModuleTag('')
      toast.success('Posted!')
    } catch { toast.error('Something went wrong') }
    finally { setPosting(false) }
  }

  async function handleReact(postId: string, emoji: string) {
    const res = await fetch('/api/posts/reactions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, emoji }),
    })
    if (!res.ok) return
    const { action } = await res.json()
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      const reactions = action === 'added'
        ? [...p.reactions, { id: Date.now().toString(), userId: currentUser.id, emoji }]
        : p.reactions.filter(r => !(r.userId === currentUser.id && r.emoji === emoji))
      return { ...p, reactions }
    }))
  }

  async function handleReply(postId: string) {
    const text = replyTexts[postId]?.trim()
    if (!text) return
    setSendingReply(postId)
    try {
      const res = await fetch('/api/posts/replies', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: text }),
      })
      if (!res.ok) { toast.error('Failed to reply'); return }
      const reply = await res.json()
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: [...p.replies, reply] } : p))
      setReplyTexts(prev => ({ ...prev, [postId]: '' }))
      toast.success('Reply sent!')
    } catch { toast.error('Failed') }
    finally { setSendingReply(null) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return
    const res = await fetch('/api/posts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setPosts(prev => prev.filter(p => p.id !== id))
  }

  async function handlePin(id: string, pinned: boolean) {
    const res = await fetch('/api/posts/pin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, pinned }) })
    if (res.ok) setPosts(prev => prev.map(p => p.id === id ? { ...p, pinned } : p))
  }

  function toggleReplies(postId: string) {
    setExpandedReplies(prev => {
      const next = new Set(prev)
      next.has(postId) ? next.delete(postId) : next.add(postId)
      return next
    })
  }

  return (
    <div className="relative grid-dots min-h-full">
      {/* Atmospheric glow */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Sticky subheader */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border-subtle flex justify-between items-center px-0 py-4 mb-6 -mx-4 md:-mx-8 px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-6">
          <h2 className="font-headline-sm text-headline-sm font-bold text-text-primary">Community</h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps text-text-secondary uppercase hidden sm:inline">
              {memberCount} Members
            </span>
            <span className="font-label-caps text-label-caps text-text-secondary uppercase sm:hidden">
              {memberCount}
            </span>
          </div>
        </div>
        <button onClick={() => fetchPosts(true)} className="p-2 text-text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>

      <div className="max-w-[800px] mx-auto relative z-10">

        {/* ── COMPOSE BOX ─────────────────────────────────────────── */}
        <section className="glass-surface rounded-xl p-5 md:p-6 mb-6 md:mb-8">
          <div className="flex gap-3 md:gap-4">
            <Avatar user={currentUser} size={10} />
            <div className="flex-1 space-y-4">
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handlePost() }}
                placeholder="Share a win, ask a question, or post an insight..."
                rows={2}
                className="w-full bg-transparent border-none focus:ring-0 outline-none font-body-md text-text-primary placeholder:text-text-tertiary resize-none custom-scrollbar"
              />
              <div className="flex flex-wrap gap-2 items-center">
                {/* Post type buttons */}
                {[
                  { val: 'question', label: 'QUESTION', color: 'text-[#585de1]',     border: 'border-[#585de1]/30',     bg: 'bg-[#585de1]/5',     hbg: 'hover:bg-[#585de1]/10',    icon: 'help'            },
                  { val: 'win',      label: 'WIN',      color: 'text-status-amber',   border: 'border-status-amber/30',  bg: 'bg-status-amber/5',  hbg: 'hover:bg-status-amber/10', icon: 'military_tech'   },
                  { val: 'insight',  label: 'INSIGHT',  color: 'text-primary',        border: 'border-primary/30',       bg: 'bg-primary/5',       hbg: 'hover:bg-primary/10',      icon: 'lightbulb'       },
                  { val: 'resource', label: 'RESOURCE', color: 'text-purple-400',     border: 'border-purple-500/30',    bg: 'bg-purple-500/5',    hbg: 'hover:bg-purple-500/10',   icon: 'attachment'      },
                ].map(t => (
                  <button key={t.val} onClick={() => setPostType(t.val === postType ? 'general' : t.val)}
                    className={cn(
                      'flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full border font-label-caps text-label-caps transition-colors',
                      t.color, t.border, t.hbg,
                      postType === t.val ? t.bg + ' font-bold' : 'bg-transparent'
                    )}>
                    <span className="material-symbols-outlined text-sm">{t.icon}</span>
                    <span className="hidden sm:inline">{t.label}</span>
                  </button>
                ))}

                {/* Module tag */}
                <select value={moduleTag} onChange={e => setModuleTag(e.target.value)}
                  className="bg-surface-container border border-border-subtle rounded-lg font-label-caps text-label-caps text-text-secondary focus:border-primary focus:ring-0 py-1.5 px-2 text-[10px] outline-none hidden md:block">
                  <option value="">Module tag...</option>
                  {ALL_MODULES.map(m => <option key={m.id} value={m.id} className="bg-surface-container">{m.number} — {m.title}</option>)}
                </select>

                {/* Post button */}
                <button onClick={handlePost} disabled={posting || !content.trim()}
                  className="ml-auto px-4 md:px-6 py-2 bg-primary text-black font-bold rounded-lg text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2">
                  {posting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  Post
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER TABS ─────────────────────────────────────────── */}
        <nav className="flex gap-5 md:gap-8 mb-6 md:mb-8 border-b border-border-subtle overflow-x-auto whitespace-nowrap pb-1 custom-scrollbar">
          {POST_TYPES.map(t => (
            <button key={t.value} onClick={() => setFilter(t.value)}
              className={cn(
                'pb-4 border-b-2 font-label-caps tracking-widest uppercase transition-colors flex-shrink-0 text-[10px] md:text-label-caps',
                filter === t.value
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary font-medium'
              )}>
              {t.label}
            </button>
          ))}
        </nav>

        {/* ── FEED ────────────────────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-text-tertiary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 glass-surface rounded-xl">
            <span className="material-symbols-outlined text-4xl text-text-tertiary block mb-3"
              style={{ fontVariationSettings: "'FILL' 0" }}>forum</span>
            <p className="font-headline-sm text-on-surface mb-1">No posts yet</p>
            <p className="font-body-sm text-text-secondary">Be the first to share something with the community.</p>
          </div>
        ) : (
          <div className="space-y-5 md:space-y-6">
            {posts.map(post => {
              const cfg         = TYPE_CONFIG[post.type] || TYPE_CONFIG.general
              const modName     = post.moduleTag ? ALL_MODULES.find(m => m.id === post.moduleTag)?.title : null
              const canDelete   = post.userId === currentUser.id || isAdmin
              const showReplies = expandedReplies.has(post.id)

              return (
                <article key={post.id}
                  className={cn(
                    'glass-surface rounded-xl p-5 md:p-6 transition-all',
                    post.pinned && 'border-l-4 border-l-primary'
                  )}>

                  {/* Pinned badge */}
                  {post.pinned && (
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                        <span className="font-label-caps text-[10px] font-bold tracking-widest uppercase">Pinned by Admin</span>
                      </div>
                      <span className="font-label-mono text-label-mono text-text-tertiary uppercase">{timeAgo(post.createdAt)}</span>
                    </div>
                  )}

                  {/* Post header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar user={post.user} size={10} />
                      <div>
                        <h4 className="text-text-primary font-bold flex items-center gap-2 flex-wrap">
                          {post.user.name || 'Member'}
                          {post.user.role && (
                            <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-bold tracking-tight uppercase', ROLE_COLORS[post.user.role] || ROLE_COLORS.other)}>
                              {post.user.role}
                            </span>
                          )}
                          {isAdmin && (
                            <button onClick={() => handlePin(post.id, !post.pinned)}
                              className="text-text-tertiary hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-sm"
                                style={{ fontVariationSettings: post.pinned ? "'FILL' 1" : "'FILL' 0" }}>push_pin</span>
                            </button>
                          )}
                        </h4>
                        <p className="text-text-tertiary text-xs flex items-center gap-1.5">
                          {post.user.company && <span>{post.user.company} ·</span>}
                          <span className="font-label-mono">{timeAgo(post.createdAt)}</span>
                          {modName && <span className="text-primary ml-1">· {modName}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn('px-2 py-1 rounded border font-label-caps text-[10px] font-bold uppercase tracking-widest', cfg.color, cfg.bg, cfg.border)}>
                        {cfg.label}
                      </div>
                      {canDelete && (
                        <button onClick={() => handleDelete(post.id)}
                          className="text-text-tertiary hover:text-status-red transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Post content */}
                  <p className={cn(
                    'mb-4 md:mb-6 leading-relaxed',
                    post.type === 'win' || post.type === 'question'
                      ? 'font-headline-sm text-headline-sm text-text-primary italic'
                      : 'font-body-md text-text-primary'
                  )}>
                    {post.content}
                  </p>

                  {/* Reactions + replies */}
                  <div className="flex items-center gap-3 md:gap-6">
                    {REACTIONS.map(r => {
                      const count   = post.reactions.filter(rx => rx.emoji === r.emoji).length
                      const reacted = post.reactions.some(rx => rx.emoji === r.emoji && rx.userId === currentUser.id)
                      return (
                        <button key={r.emoji} onClick={() => handleReact(post.id, r.emoji)}
                          className={cn(
                            'flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full transition-all',
                            reacted ? 'bg-primary/10 text-primary' : 'bg-surface-bright/30 text-text-secondary hover:text-primary'
                          )}>
                          <span className="material-symbols-outlined text-[16px] md:text-[18px]"
                            style={{ fontVariationSettings: reacted ? "'FILL' 1" : "'FILL' 0" }}>{r.icon}</span>
                          {count > 0 && <span className="font-label-mono text-xs">{count}</span>}
                        </button>
                      )
                    })}
                    <button onClick={() => toggleReplies(post.id)}
                      className="ml-auto text-primary font-label-caps font-bold hover:underline text-[10px] md:text-label-caps flex items-center gap-1.5">
                      {post.replies.length > 0 ? `${post.replies.length} ${post.replies.length === 1 ? 'Reply' : 'Replies'}` : 'Reply'}
                    </button>
                  </div>

                  {/* Replies thread */}
                  {showReplies && (
                    <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border-subtle space-y-4">
                      {post.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar user={reply.user} size={8} />
                          <div className="flex-1 bg-surface-container rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-body-sm text-text-primary font-semibold text-sm">{reply.user.name}</span>
                              <span className="font-label-mono text-[10px] text-text-tertiary">{timeAgo(reply.createdAt)}</span>
                            </div>
                            <p className="font-body-sm text-text-secondary leading-relaxed">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                      {/* Reply input */}
                      <div className="flex gap-3 mt-2">
                        <Avatar user={currentUser} size={8} />
                        <div className="flex-1 flex gap-2">
                          <input
                            value={replyTexts[post.id] || ''}
                            onChange={e => setReplyTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReply(post.id) } }}
                            placeholder="Write a reply... (Enter to send)"
                            className="flex-1 bg-surface-container border border-border-subtle focus:border-primary rounded-lg px-3 py-2 font-body-sm text-text-primary placeholder:text-text-tertiary outline-none transition-colors text-sm"
                          />
                          <button onClick={() => handleReply(post.id)} disabled={sendingReply === post.id || !replyTexts[post.id]?.trim()}
                            className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-lg transition-all disabled:opacity-40">
                            {sendingReply === post.id
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
