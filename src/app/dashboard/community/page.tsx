'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ALL_MODULES } from '@/lib/data/curriculum'
import { getInitials } from '@/lib/utils'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import Image from 'next/image'
import {
  Send, Loader2, MessageSquare, Trash2, Pin, PinOff,
  Flame, Lightbulb, Trophy, Link2, LayoutGrid, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react'

// ── TYPES ──────────────────────────────────────────────────────────────────
type User    = { id: string; name: string | null; company?: string | null; role?: string; image?: string | null }
type Reply   = { id: string; postId: string; userId: string; content: string; createdAt: string; user: User }
type PostRx  = { id: string; userId: string; emoji: string }
type Post    = {
  id: string; userId: string; content: string; type: string; moduleTag?: string | null
  pinned: boolean; createdAt: string; user: User; replies: Reply[]; reactions: PostRx[]
  _count: { replies: number; reactions: number }
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────
const POST_TYPES = [
  { value: 'all',      label: 'All Posts',  icon: LayoutGrid, color: '' },
  { value: 'question', label: 'Questions',  icon: MessageSquare, color: 'text-[#585de1]' },
  { value: 'win',      label: 'Wins',       icon: Trophy,        color: 'text-amber-400' },
  { value: 'insight',  label: 'Insights',   icon: Lightbulb,     color: 'text-[#2ed8c3]' },
  { value: 'resource', label: 'Resources',  icon: Link2,         color: 'text-purple-400' },
  { value: 'general',  label: 'General',    icon: Flame,         color: 'text-[#a0a0b0]' },
]

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  question: { label: 'Question', color: 'text-[#585de1]', bg: 'bg-[#585de1]/10 border-[#585de1]/20', icon: MessageSquare },
  win:      { label: 'Win 🎉',   color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: Trophy        },
  insight:  { label: 'Insight',  color: 'text-[#2ed8c3]', bg: 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20',icon: Lightbulb     },
  resource: { label: 'Resource', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20',icon: Link2        },
  general:  { label: 'General',  color: 'text-[#a0a0b0]', bg: 'bg-white/[0.05] border-white/[0.08]', icon: Flame        },
}

const EMOJIS = ['👍', '🔥', '💡']
const ROLE_COLORS: Record<string, string> = {
  founder:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  engineer: 'bg-[#585de1]/10 text-[#7b7fe8] border-[#585de1]/20',
  builder:  'bg-[#2ed8c3]/10 text-[#2ed8c3] border-[#2ed8c3]/20',
  designer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  other:    'bg-white/[0.05] text-[#a0a0b0] border-white/[0.08]',
}

// ── HELPERS ────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

// ── AVATAR ─────────────────────────────────────────────────────────────────
function Avatar({ user, size = 8 }: { user: User; size?: number }) {
  const px = size * 4
  if (user.image) {
    return (
      <div className="rounded-xl overflow-hidden flex-shrink-0 border border-white/10"
        style={{ width: px, height: px, minWidth: px }}>
        <Image
          src={user.image}
          alt={user.name || 'User'}
          width={px} height={px}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    )
  }
  return (
    <div className="rounded-xl bg-[#2ed8c3]/15 border border-[#2ed8c3]/25 flex items-center justify-center font-display font-bold text-[#2ed8c3] flex-shrink-0"
      style={{ width: px, height: px, minWidth: px, fontSize: size * 1.6 }}>
      {getInitials(user.name)}
    </div>
  )
}

// ── REACTION BAR ───────────────────────────────────────────────────────────
function ReactionBar({ post, currentUserId, onReact }: { post: Post; currentUserId: string; onReact: (postId: string, emoji: string) => void }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {EMOJIS.map(emoji => {
        const count  = post.reactions.filter(r => r.emoji === emoji).length
        const reacted = post.reactions.some(r => r.emoji === emoji && r.userId === currentUserId)
        return (
          <button key={emoji} onClick={() => onReact(post.id, emoji)}
            className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all',
              reacted
                ? 'bg-[#2ed8c3]/15 border-[#2ed8c3]/30 text-[#2ed8c3]'
                : 'bg-white/[0.03] border-white/[0.06] text-[#706870] hover:border-white/15 hover:text-white')}>
            <span>{emoji}</span>
            {count > 0 && <span>{count}</span>}
          </button>
        )
      })}
    </div>
  )
}

// ── REPLY ITEM ─────────────────────────────────────────────────────────────
function ReplyItem({ reply, currentUserId, isAdmin, onDelete }: {
  reply: Reply; currentUserId: string; isAdmin: boolean; onDelete: (id: string) => void
}) {
  const canDelete = reply.userId === currentUserId || isAdmin
  return (
    <div className="flex gap-3 group">
      <Avatar user={reply.user} size={7} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-sm font-semibold text-white">{reply.user.name || 'Anonymous'}</span>
          <span className="text-[10px] text-[#606070] font-mono">{timeAgo(reply.createdAt)}</span>
        </div>
        <p className="text-sm text-[#c0c0d0] leading-relaxed whitespace-pre-wrap break-words">{reply.content}</p>
      </div>
      {canDelete && (
        <button onClick={() => onDelete(reply.id)}
          className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-[#606070] hover:text-red-400 transition-all mt-0.5">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

// ── POST CARD ─────────────────────────────────────────────────────────────
function PostCard({ post, currentUserId, isAdmin, onDelete, onReact, onReply, onPin, onDeleteReply }: {
  post: Post; currentUserId: string; isAdmin: boolean
  onDelete: (id: string) => void
  onReact: (postId: string, emoji: string) => void
  onReply: (postId: string, content: string) => Promise<void>
  onPin: (id: string, pinned: boolean) => void
  onDeleteReply: (id: string, postId: string) => void
}) {
  const [showReplies, setShowReplies] = useState(false)
  const [replying, setReplying]       = useState(false)
  const [replyText, setReplyText]     = useState('')
  const [sendingReply, setSendingReply] = useState(false)
  const cfg     = TYPE_CONFIG[post.type] || TYPE_CONFIG.general
  const modName = post.moduleTag ? ALL_MODULES.find(m => m.id === post.moduleTag)?.title : null
  const canDelete = post.userId === currentUserId || isAdmin

  async function handleReply() {
    if (!replyText.trim()) return
    setSendingReply(true)
    await onReply(post.id, replyText)
    setReplyText('')
    setReplying(false)
    setShowReplies(true)
    setSendingReply(false)
  }

  return (
    <div className={cn('bg-white/[0.02] border rounded-2xl p-4 md:p-5 transition-all',
      post.pinned ? 'border-[#2ed8c3]/25 bg-[#2ed8c3]/4' : 'border-white/[0.07] hover:border-white/10')}>

      {/* Pinned badge */}
      {post.pinned && (
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#2ed8c3] mb-3">
          <Pin className="w-3 h-3" /> Pinned by admin
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar user={post.user} size={9} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">{post.user.name || 'Anonymous'}</span>
            {post.user.role && (
              <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border font-semibold', ROLE_COLORS[post.user.role] || ROLE_COLORS.other)}>
                {post.user.role}
              </span>
            )}
            {post.user.company && <span className="text-[11px] text-[#606070]">· {post.user.company}</span>}
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-[10px] text-[#606070] font-mono">{timeAgo(post.createdAt)}</span>
            {/* Post type badge */}
            <span className={cn('inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-semibold', cfg.bg, cfg.color)}>
              <cfg.icon className="w-2.5 h-2.5" />{cfg.label}
            </span>
            {/* Module tag */}
            {modName && (
              <span className="text-[10px] bg-white/[0.05] border border-white/[0.08] text-[#a0a0b0] px-2 py-0.5 rounded-full">
                {modName}
              </span>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isAdmin && (
            <button onClick={() => onPin(post.id, !post.pinned)}
              className={cn('w-7 h-7 rounded-lg border flex items-center justify-center transition-all',
                post.pinned ? 'border-[#2ed8c3]/30 bg-[#2ed8c3]/10 text-[#2ed8c3]' : 'border-white/[0.07] text-[#606070] hover:border-white/15 hover:text-white')}>
              {post.pinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
            </button>
          )}
          {canDelete && (
            <button onClick={() => onDelete(post.id)}
              className="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-[#606070] hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-[#d0d0d0] text-sm leading-relaxed whitespace-pre-wrap break-words mb-4">{post.content}</p>

      {/* Reactions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <ReactionBar post={post} currentUserId={currentUserId} onReact={onReact} />
        <div className="flex items-center gap-2">
          <button onClick={() => { setShowReplies(!showReplies); setReplying(false) }}
            className="flex items-center gap-1.5 text-xs text-[#706870] hover:text-[#a0a0b0] transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            {post.replies.length > 0 ? `${post.replies.length} ${post.replies.length === 1 ? 'reply' : 'replies'}` : 'Reply'}
            {post.replies.length > 0 && (showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
          </button>
          {!showReplies && (
            <button onClick={() => { setReplying(!replying); setShowReplies(true) }}
              className="text-xs text-[#2ed8c3] hover:text-[#5ee3d2] transition-colors font-medium">
              + Reply
            </button>
          )}
        </div>
      </div>

      {/* Replies section */}
      {showReplies && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
          {post.replies.map(reply => (
            <ReplyItem key={reply.id} reply={reply} currentUserId={currentUserId} isAdmin={isAdmin}
              onDelete={id => onDeleteReply(id, post.id)} />
          ))}

          {/* Reply input */}
          <div className="flex gap-2.5 mt-3">
            <Avatar user={{ id: currentUserId, name: 'You' }} size={7} />
            <div className="flex-1 flex gap-2">
              <input value={replyText} onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReply() } }}
                placeholder="Write a reply... (Enter to send)"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/40 rounded-xl px-3 py-2 text-sm text-white placeholder-[#504850] outline-none transition-colors" />
              <button onClick={handleReply} disabled={sendingReply || !replyText.trim()}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-[#2ed8c3]/10 hover:bg-[#2ed8c3]/20 border border-[#2ed8c3]/20 text-[#2ed8c3] rounded-xl transition-all disabled:opacity-40">
                {sendingReply ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── COMPOSE BOX ────────────────────────────────────────────────────────────
function ComposeBox({ currentUser, onPost }: { currentUser: User; onPost: (post: Post) => void }) {
  const [content, setContent]   = useState('')
  const [type, setType]         = useState('general')
  const [moduleTag, setModuleTag] = useState('')
  const [posting, setPosting]   = useState(false)
  const [expanded, setExpanded] = useState(false)
  const maxChars = 2000

  async function handlePost() {
    if (!content.trim() || posting) return
    setPosting(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type, moduleTag: moduleTag || null }),
      })
      if (!res.ok) { toast.error('Failed to post'); return }
      const post = await res.json()
      onPost(post)
      setContent(''); setType('general'); setModuleTag(''); setExpanded(false)
      toast.success('Posted! 🎉')
    } catch { toast.error('Something went wrong') }
    finally { setPosting(false) }
  }

  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 md:p-5">
      <div className="flex gap-3">
        <Avatar user={currentUser} size={9} />
        <div className="flex-1 min-w-0">
          <textarea
            value={content}
            onChange={e => { setContent(e.target.value); if (!expanded) setExpanded(true) }}
            onFocus={() => setExpanded(true)}
            placeholder="Share a win, ask a question, post an insight..."
            rows={expanded ? 4 : 2}
            className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#2ed8c3]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-[#504850] outline-none resize-none transition-all leading-relaxed"
          />

          {expanded && (
            <div className="mt-3 space-y-3">
              {/* Type selector */}
              <div className="flex gap-2 flex-wrap">
                {POST_TYPES.slice(1).map(t => (
                  <button key={t.value} onClick={() => setType(t.value)}
                    className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all',
                      type === t.value
                        ? 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20 text-[#2ed8c3]'
                        : 'border-white/[0.07] text-[#706870] hover:border-white/15 hover:text-white')}>
                    <t.icon className={cn('w-3 h-3', t.value === type ? 'text-[#2ed8c3]' : t.color)} />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Module tag */}
              <select value={moduleTag} onChange={e => setModuleTag(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.07] focus:border-[#2ed8c3]/40 rounded-xl px-3 py-2 text-xs text-white outline-none transition-colors w-full sm:w-auto">
                <option value="" className="bg-[#2c2528]">Tag a module (optional)</option>
                {ALL_MODULES.map(m => (
                  <option key={m.id} value={m.id} className="bg-[#2c2528]">{m.number} — {m.title}</option>
                ))}
              </select>

              {/* Footer row */}
              <div className="flex items-center justify-between gap-3">
                <span className={cn('text-xs font-mono', content.length > maxChars * 0.9 ? 'text-red-400' : 'text-[#606070]')}>
                  {content.length}/{maxChars}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => { setExpanded(false); setContent('') }}
                    className="px-4 py-2 text-xs text-[#706870] hover:text-white border border-white/[0.07] hover:border-white/15 rounded-xl transition-all">
                    Cancel
                  </button>
                  <button onClick={handlePost} disabled={posting || !content.trim() || content.length > maxChars}
                    className="flex items-center gap-2 px-5 py-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] disabled:opacity-40 text-[#241e20] font-bold text-xs rounded-xl transition-all">
                    {posting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function CommunityPage() {
  const { data: session } = useSession()
  const [posts, setPosts]         = useState<Post[]>([])
  const [loading, setLoading]     = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter]       = useState('all')
  const [moduleFilter, setModuleFilter] = useState('')
  const [isAdmin, setIsAdmin]     = useState(false)
  const [memberCount, setMemberCount] = useState(0)
  const pollRef = useRef<NodeJS.Timeout | null>(null)

  const currentUser: User = {
    id:      session?.user?.id || '',
    name:    session?.user?.name || 'You',
    company: (session?.user as any)?.company,
    role:    (session?.user as any)?.role,
  }

  const fetchPosts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('type', filter)
      if (moduleFilter) params.set('module', moduleFilter)
      const res = await fetch(`/api/posts?${params}`)
      if (res.ok) setPosts(await res.json())
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [filter, moduleFilter])

  useEffect(() => {
    fetchPosts()
    // Poll every 30 seconds for new posts
    pollRef.current = setInterval(() => fetchPosts(true), 30000)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [fetchPosts])

  useEffect(() => {
    // Load admin status and member count
    fetch('/api/users/me').then(r => r.json()).then(u => setIsAdmin(u.isAdmin || false))
    fetch('/api/users/count').then(r => r.json()).then(d => setMemberCount(d.count || 0)).catch(() => {})
  }, [])

  function handleNewPost(post: Post) {
    setPosts(prev => [post, ...prev])
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return
    const res = await fetch('/api/posts', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) setPosts(prev => prev.filter(p => p.id !== id))
    else toast.error('Failed to delete')
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

  async function handleReply(postId: string, content: string) {
    const res = await fetch('/api/posts/replies', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content }),
    })
    if (!res.ok) { toast.error('Failed to reply'); return }
    const reply = await res.json()
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, reply], _count: { ...p._count, replies: p._count.replies + 1 } } : p
    ))
    toast.success('Reply sent!')
  }

  async function handleDeleteReply(id: string, postId: string) {
    const res = await fetch('/api/posts/replies', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, replies: p.replies.filter(r => r.id !== id), _count: { ...p._count, replies: p._count.replies - 1 } }
          : p
      ))
    } else toast.error('Failed to delete reply')
  }

  async function handlePin(id: string, pinned: boolean) {
    const res = await fetch('/api/posts/pin', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, pinned }),
    })
    if (res.ok) setPosts(prev => prev.map(p => p.id === id ? { ...p, pinned } : p))
    else toast.error('Failed to pin')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Community</h1>
          <p className="text-[#a0a0b0] text-sm">Share wins, ask questions, and learn together.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fetchPosts(true)} disabled={refreshing}
            className="flex items-center gap-1.5 text-xs text-[#706070] hover:text-[#a0a0b0] border border-white/[0.07] hover:border-white/15 px-3 py-2 rounded-xl transition-all">
            <RefreshCw className={cn('w-3.5 h-3.5', refreshing && 'animate-spin')} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-[#2ed8c3] animate-pulse" />
            <span className="text-[#2ed8c3] font-semibold text-sm">{memberCount || '—'}</span>
            <span className="text-[#606070] text-xs hidden sm:inline">members</span>
          </div>
        </div>
      </div>

      {/* COMPOSE */}
      <ComposeBox currentUser={currentUser} onPost={handleNewPost} />

      {/* FILTERS */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {POST_TYPES.map(t => (
          <button key={t.value} onClick={() => setFilter(t.value)}
            className={cn('flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all whitespace-nowrap',
              filter === t.value
                ? 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20 text-[#2ed8c3]'
                : 'border-white/[0.07] text-[#706870] hover:border-white/15 hover:text-white')}>
            <t.icon className="w-3 h-3" />
            {t.label}
          </button>
        ))}
      </div>

      {/* MODULE FILTER */}
      <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}
        className="bg-white/[0.03] border border-white/[0.07] focus:border-[#2ed8c3]/40 rounded-xl px-3 py-2 text-xs text-[#a0a0b0] outline-none transition-colors w-full sm:w-auto">
        <option value="" className="bg-[#2c2528]">All modules</option>
        {ALL_MODULES.map(m => (
          <option key={m.id} value={m.id} className="bg-[#2c2528]">{m.number} — {m.title}</option>
        ))}
      </select>

      {/* FEED */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-[#606070]" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-display text-lg font-bold text-white mb-1">No posts yet</h3>
          <p className="text-[#706070] text-sm">Be the first to share something with the community.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUser.id}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onReact={handleReact}
              onReply={handleReply}
              onPin={handlePin}
              onDeleteReply={handleDeleteReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}
