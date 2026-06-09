'use client'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = ['overview', 'books', 'videos', 'tasks', 'notes'] as const
type Tab = typeof TABS[number]

const phaseColors: Record<string, { text: string; border: string; bg: string }> = {
  blue:   { text: 'text-secondary',    border: 'border-l-secondary',    bg: 'bg-secondary/10'    },
  teal:   { text: 'text-primary',      border: 'border-l-primary',      bg: 'bg-primary/10'      },
  purple: { text: 'text-purple-400',   border: 'border-l-purple-400',   bg: 'bg-purple-500/10'   },
  gold:   { text: 'text-status-amber', border: 'border-l-status-amber', bg: 'bg-status-amber/10' },
}

export function ModuleClient({ module, phase, progress, notes: initialNotes, tasksDone, booksDone, pct, userId }: {
  module: any; phase: any; progress: any[]; notes: any[]
  tasksDone: number; booksDone: number; pct: number; userId: string
}) {
  const [activeTab, setActiveTab]   = useState<Tab>('overview')
  const [completedTasks, setCompleted] = useState<Set<string>>(
    new Set(progress.filter(r => r.type === 'task' && r.completed).map(r => r.taskId))
  )
  const [readBooks, setReadBooks]   = useState<Set<string>>(
    new Set(progress.filter(r => r.type === 'book' && r.completed).map(r => r.bookId))
  )
  const [noteText, setNoteText]     = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [notes, setNotes]           = useState(initialNotes)
  const [deletingNote, setDeletingNote] = useState<string | null>(null)

  const phaseColor = phaseColors[phase.color] || phaseColors.teal
  const doneTasks  = module.tasks.filter((t: any) => completedTasks.has(t.id)).length
  const modPct     = module.tasks.length ? Math.round((doneTasks / module.tasks.length) * 100) : 0

  async function toggleTask(taskId: string) {
    const nowDone = !completedTasks.has(taskId)
    try {
      await fetch('/api/progress', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, moduleId: module.id, type: 'task', completed: nowDone }),
      })
      setCompleted(prev => { const s = new Set(prev); nowDone ? s.add(taskId) : s.delete(taskId); return s })
      toast.success(nowDone ? '✅ Task complete!' : 'Unmarked')
    } catch { toast.error('Failed to save') }
  }

  async function toggleBook(bookId: string) {
    const nowRead = !readBooks.has(bookId)
    try {
      await fetch('/api/progress', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, moduleId: module.id, type: 'book', completed: nowRead }),
      })
      setReadBooks(prev => { const s = new Set(prev); nowRead ? s.add(bookId) : s.delete(bookId); return s })
      toast.success(nowRead ? '📚 Marked as read!' : 'Unmarked')
    } catch { toast.error('Failed to save') }
  }

  async function saveNote() {
    if (!noteText.trim()) return
    setSavingNote(true)
    try {
      const res = await fetch('/api/notes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: module.id, content: noteText }),
      })
      const data = await res.json()
      setNotes(prev => [{ id: data.id, content: data.content, createdAt: data.createdAt }, ...prev])
      setNoteText('')
      toast.success('Note saved!')
    } catch { toast.error('Failed to save note') }
    finally { setSavingNote(false) }
  }

  async function deleteNote(noteId: string) {
    setDeletingNote(noteId)
    try {
      await fetch('/api/notes', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: noteId }),
      })
      setNotes(prev => prev.filter(n => n.id !== noteId))
      toast.success('Note deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeletingNote(null) }
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">

      {/* ── MODULE HEADER ─────────────────────────────────────── */}
      <section className="glass-card rounded-xl p-6 md:p-8 mb-6 md:mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-5 md:mb-6">
            <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
              {module.number}
            </span>
            <span className={cn('font-label-caps text-[10px] tracking-widest border px-3 py-1 rounded', phaseColor.text, phaseColor.bg, `border-${phaseColor.text.split('-')[1]}-400/30`)}>
              Phase {phase.number}: {phase.title}
            </span>
            <span className="font-label-caps text-[10px] tracking-widest text-text-primary bg-white/5 px-3 py-1 rounded">
              {module.tag}
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight">{module.title}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-end">
            <div className="space-y-2">
              <div className="flex justify-between items-end mb-2">
                <span className="font-label-caps text-xs text-text-secondary">OVERALL COMPLETION</span>
                <span className="font-display-lg text-2xl md:text-3xl text-primary">{modPct}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full progress-gradient rounded-full transition-all duration-700"
                  style={{ width: `${modPct}%` }} />
              </div>
            </div>
            <div className="flex gap-5 md:gap-8 border-l border-border-subtle pl-5 md:pl-8">
              {[
                { label: 'BOOKS',  val: `${booksDone}/${module.books.length}` },
                { label: 'TASKS',  val: `${doneTasks}/${module.tasks.length}` },
                { label: 'STATUS', val: modPct === 100 ? 'Done' : modPct > 0 ? 'Active' : 'Pending' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-text-tertiary font-label-caps text-[10px] mb-1">{s.label}</div>
                  <div className="font-display-lg text-lg md:text-xl">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TAB BAR ────────────────────────────────────────────── */}
      <div className="flex border-b border-border-subtle mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 md:px-6 py-3 md:py-4 font-label-caps text-[10px] md:text-xs tracking-widest border-b-2 transition-all whitespace-nowrap',
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            )}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ──────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          <div className="lg:col-span-2 glass-card rounded-xl p-6 md:p-8 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="font-headline-sm mb-4">What You'll Build</h3>
            <p className="text-text-secondary leading-relaxed mb-6">{module.deliverable}</p>
            <ul className="space-y-3">
              {module.tasks.slice(0, 3).map((task: any) => (
                <li key={task.id} className="flex items-start gap-3 text-sm text-text-primary">
                  <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {task.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:space-y-6">
            {[
              { label: 'READING LIST', val: module.books.length, icon: 'menu_book',  tab: 'books'   },
              { label: 'VIDEO SEARCH', val: module.books.length, icon: 'play_circle', tab: 'videos' },
              { label: 'ASSIGNMENTS',  val: module.tasks.length, icon: 'assignment', tab: 'tasks'   },
            ].map(s => (
              <button key={s.tab} onClick={() => setActiveTab(s.tab as Tab)}
                className="w-full glass-card rounded-xl p-5 md:p-6 flex justify-between items-center group hover:bg-white/5 transition-colors text-left">
                <div>
                  <div className="text-text-tertiary font-label-caps text-[10px] mb-1">{s.label}</div>
                  <div className="font-display-lg text-xl md:text-2xl">0{s.val}</div>
                </div>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">{s.icon}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── BOOKS TAB ─────────────────────────────────────────── */}
      {activeTab === 'books' && (
        <div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 md:p-6 mb-6 md:mb-8 flex items-start gap-3 md:gap-4">
            <span className="material-symbols-outlined text-primary text-2xl md:text-3xl flex-shrink-0">info</span>
            <p className="text-sm text-text-primary leading-relaxed">
              Every book below has a free access option. Cost is never a barrier. Start with the first book and work through them in order.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {module.books.map((book: any) => {
              const read = readBooks.has(book.id)
              return (
                <div key={book.id} className={cn('glass-card rounded-xl p-5 md:p-6 flex gap-4 md:gap-6 group transition-all', read && 'border-primary/20 bg-primary/[0.02]')}>
                  {/* Book spine */}
                  <div className={cn('w-20 md:w-28 h-32 md:h-44 flex-shrink-0 rounded border flex items-center justify-center', read ? 'bg-primary/10 border-primary/20' : 'bg-surface-variant border-border-subtle')}>
                    <span className={cn('material-symbols-outlined text-3xl', read ? 'text-primary' : 'text-text-tertiary')}
                      style={{ fontVariationSettings: read ? "'FILL' 1" : "'FILL' 0" }}>menu_book</span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="font-headline-sm text-base md:text-lg mb-1 group-hover:text-primary transition-colors leading-tight">{book.title}</h4>
                    <p className="text-text-tertiary text-xs font-label-caps mb-2 md:mb-3">{book.author}</p>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3 md:mb-4 flex-1 line-clamp-3 italic">{book.why}</p>
                    <div className="flex gap-2 mb-3 md:mb-4 flex-wrap">
                      {book.freeUrl && (
                        <a href={book.freeUrl} target="_blank" rel="noopener noreferrer"
                          className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary px-3 py-1.5 rounded text-[10px] font-label-caps transition-all">
                          🎁 FREE ACCESS
                        </a>
                      )}
                      {book.googleBooksUrl && (
                        <a href={book.googleBooksUrl} target="_blank" rel="noopener noreferrer"
                          className="bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 text-secondary px-3 py-1.5 rounded text-[10px] font-label-caps transition-all">
                          GOOGLE BOOKS
                        </a>
                      )}
                      {book.amazonUrl && (
                        <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer"
                          className="bg-white/[0.06] hover:bg-white/10 px-3 py-1.5 rounded text-[10px] font-label-caps text-text-secondary transition-all">
                          AMAZON
                        </a>
                      )}
                    </div>
                    <button onClick={() => toggleBook(book.id)}
                      className={cn(
                        'w-full py-2 border rounded text-[10px] font-label-caps transition-all',
                        read
                          ? 'border-primary bg-primary text-surface-container-lowest'
                          : 'border-primary/30 text-primary hover:bg-primary hover:text-surface'
                      )}>
                      {read ? '✓ READ' : 'MARK AS READ'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── VIDEOS TAB ────────────────────────────────────────── */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {module.books.map((book: any, i: number) => (
            <div key={book.id} className="glass-card rounded-xl overflow-hidden group">
              <div className="aspect-video bg-surface-variant relative overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-white/20 group-hover:text-primary transition-colors"
                  style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-red-600 rounded-full flex-shrink-0" />
                  <span className="text-[10px] font-label-caps text-text-tertiary">YOUTUBE</span>
                </div>
                <h4 className="font-headline-sm text-base md:text-lg mb-2 leading-tight">{book.title}</h4>
                <p className="text-xs text-text-secondary mb-4 leading-relaxed line-clamp-2">
                  Video lecture and discussion on: {book.why}
                </p>
                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(book.title + ' business')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary text-xs font-label-caps hover:underline">
                  SEARCH ON YOUTUBE
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TASKS TAB ─────────────────────────────────────────── */}
      {activeTab === 'tasks' && (
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-xl p-5 md:p-6 border-l-4 border-l-primary mb-6 md:mb-8">
            <div className="flex items-start gap-3 md:gap-4">
              <span className="material-symbols-outlined text-primary mt-0.5">construction</span>
              <div>
                <h4 className="font-bold mb-1">Module Deliverable</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{module.deliverable}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h3 className="font-headline-sm">Checklist</h3>
              <div className="text-xs font-label-caps text-text-tertiary">
                COMPLETED: <span className="text-primary">{doneTasks}/{module.tasks.length}</span>
              </div>
            </div>
            {/* Progress mini bar */}
            <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-6 md:mb-8">
              <div className="h-full progress-gradient rounded-full transition-all duration-500"
                style={{ width: `${modPct}%` }} />
            </div>
            <div className="space-y-4 md:space-y-6">
              {module.tasks.map((task: any) => {
                const done = completedTasks.has(task.id)
                return (
                  <label key={task.id}
                    className="flex items-start gap-3 md:gap-4 cursor-pointer group"
                    onClick={() => toggleTask(task.id)}>
                    <div className={cn(
                      'w-5 h-5 md:w-6 md:h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5',
                      done
                        ? 'border-primary bg-primary text-surface-container-lowest'
                        : 'border-border-subtle group-hover:border-primary'
                    )}>
                      {done && <span className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}>check</span>}
                    </div>
                    <span className={cn('text-sm md:text-base leading-relaxed', done ? 'text-text-primary line-through opacity-50' : 'text-text-primary')}>
                      {task.text}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── NOTES TAB ─────────────────────────────────────────── */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-5 md:space-y-6">
            <div className="glass-card rounded-xl p-5 md:p-6">
              <label className="font-label-caps text-[10px] text-text-tertiary mb-3 md:mb-4 block">SCRATCHPAD</label>
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Start typing your module notes here..."
                className="w-full h-64 md:h-96 bg-surface-container border-none text-text-primary font-label-mono text-sm focus:ring-1 focus:ring-primary rounded-lg p-4 md:p-6 custom-scrollbar resize-none outline-none placeholder:text-text-tertiary"
              />
              <div className="mt-4 md:mt-6 flex items-center justify-between">
                <span className="font-label-mono text-[10px] text-text-tertiary">{noteText.length} chars</span>
                <button onClick={saveNote} disabled={savingNote || !noteText.trim()}
                  className="bg-primary text-surface font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-lg text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
                  {savingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  SAVE NOTE
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-label-caps text-[10px] text-text-tertiary mb-2">PAST REVISIONS</h4>
            {notes.length === 0 ? (
              <div className="glass-card rounded-xl p-5 text-center">
                <span className="material-symbols-outlined text-2xl text-text-tertiary block mb-2">note_alt</span>
                <p className="font-body-sm text-text-tertiary text-sm">No notes yet for this module.</p>
              </div>
            ) : notes.map((note: any) => (
              <div key={note.id}
                className={cn('glass-card rounded-xl p-3 md:p-4 border-l-2 border-l-primary/30 hover:bg-white/5 transition-colors group')}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="text-xs text-text-tertiary">
                    {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <button onClick={() => deleteNote(note.id)} disabled={deletingNote === note.id}
                    className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-status-red transition-all flex-shrink-0">
                    {deletingNote === note.id
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : <span className="material-symbols-outlined text-sm">delete</span>}
                  </button>
                </div>
                <p className="text-sm font-medium line-clamp-2 leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
