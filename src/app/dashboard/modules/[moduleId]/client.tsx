'use client'
import { useState } from 'react'
import { Module } from '@/lib/data/curriculum'
import { BookOpen, Youtube, Target, FileText, ChevronDown, CheckCircle2, Circle, Loader2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const TABS = ['Overview', 'Books', 'Videos', 'Tasks', 'Notes']

export function ModuleClient({ module, initialProgress, initialNotes, userId }: {
  module: Module; initialProgress: any[]; initialNotes: any[]; userId: string
}) {
  const [tab, setTab] = useState('Overview')
  const [progress, setProgress] = useState(initialProgress)
  const [notes, setNotes] = useState(initialNotes)
  const [saving, setSaving] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)

  const isTaskDone = (taskId: string) => progress.find(p => p.taskId === taskId && p.completed)
  const isBookDone = (bookId: string) => progress.find(p => p.bookId === bookId && p.type === 'book' && p.completed)
  const tasksDone = module.tasks.filter(t => isTaskDone(t.id)).length
  const booksDone = module.books.filter(b => isBookDone(b.id)).length
  const pct = Math.round((tasksDone / module.tasks.length) * 100)

  async function toggleTask(taskId: string, done: boolean) {
    setSaving(taskId)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: module.id, taskId, type: 'task', completed: !done }),
      })
      const data = await res.json()
      setProgress(prev => {
        const filtered = prev.filter(p => p.taskId !== taskId)
        return [...filtered, data]
      })
      toast.success(done ? 'Task unmarked' : 'Task complete! 🎉')
    } catch { toast.error('Failed to save') }
    finally { setSaving(null) }
  }

  async function toggleBook(bookId: string, done: boolean) {
    setSaving(bookId)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: module.id, taskId: `book-${bookId}`, bookId, type: 'book', completed: !done }),
      })
      const data = await res.json()
      setProgress(prev => {
        const filtered = prev.filter(p => p.bookId !== bookId)
        return [...filtered, data]
      })
      toast.success(done ? 'Book unmarked' : '📚 Book marked as read!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(null) }
  }

  async function saveNote() {
    if (!noteText.trim()) return
    setSavingNote(true)
    try {
      const res = await fetch('/api/notes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: module.id, content: noteText, type: 'general' }),
      })
      const data = await res.json()
      setNotes(prev => [data, ...prev])
      setNoteText('')
      toast.success('Note saved!')
    } catch { toast.error('Failed to save note') }
    finally { setSavingNote(false) }
  }

  async function deleteNote(id: string) {
    try {
      await fetch('/api/notes', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      setNotes(prev => prev.filter(n => n.id !== id))
      toast.success('Note deleted')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#606070]">{module.number}</span>
              <span className="text-xs bg-white/[0.05] border border-white/[0.08] text-[#a0a0b0] px-2.5 py-0.5 rounded-full">{module.phase}</span>
              <span className="text-xs bg-white/[0.05] border border-white/[0.08] text-[#606070] px-2.5 py-0.5 rounded-full">{module.tag}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">{module.title}</h1>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-display text-3xl font-bold text-[#2ed8c3]">{pct}%</div>
            <div className="text-xs text-[#606070]">complete</div>
          </div>
        </div>
        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
          <div className="h-full bg-[#2ed8c3] rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-6 mt-3 text-xs text-[#606070]">
          <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> {booksDone}/{module.books.length} books read</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> {tasksDone}/{module.tasks.length} tasks done</span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-white/[0.02] border border-white/[0.06] rounded-xl p-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('flex-1 text-xs font-medium py-2 rounded-lg transition-all', tab === t ? 'bg-[#2ed8c3]/10 text-[#2ed8c3] border border-[#2ed8c3]/20' : 'text-[#808090] hover:text-white')}>
            {t}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'Overview' && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-lg font-bold text-white">Core Deliverable</h2>
          <div className="bg-[#2ed8c3]/8 border border-[#2ed8c3]/15 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-[#2ed8c3]" /><span className="text-xs font-semibold text-[#2ed8c3] uppercase tracking-wider">What You'll Build</span></div>
            <p className="text-[#d0d0d0] text-sm leading-relaxed">{module.deliverable}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
              <div className="font-display text-2xl font-bold text-white mb-1">{module.books.length}</div>
              <div className="text-xs text-[#606070]">Core Books</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
              <div className="font-display text-2xl font-bold text-white mb-1">{module.youtube.length}</div>
              <div className="text-xs text-[#606070]">Video Resources</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
              <div className="font-display text-2xl font-bold text-white mb-1">{module.tasks.length}</div>
              <div className="text-xs text-[#606070]">Action Tasks</div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKS */}
      {tab === 'Books' && (
        <div className="space-y-3">
          {module.books.map(book => {
            const done = !!isBookDone(book.id)
            return (
              <div key={book.id} className={cn('bg-white/[0.02] border rounded-2xl p-5 transition-all', done ? 'border-[#2ed8c3]/20' : 'border-white/[0.06]')}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-0.5">{book.title}</h3>
                    <p className="text-[#606070] text-xs mb-2">{book.author}</p>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">{book.why}</p>
                  </div>
                  <button onClick={() => toggleBook(book.id, done)} disabled={saving === book.id}
                    className={cn('flex-shrink-0 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border transition-all',
                      done ? 'bg-[#2ed8c3]/10 border-[#2ed8c3]/20 text-[#2ed8c3]' : 'border-white/[0.08] text-[#606070] hover:border-white/20 hover:text-white')}>
                    {saving === book.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : done ? <><CheckCircle2 className="w-3.5 h-3.5" /> Read</> : 'Mark Read'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* VIDEOS */}
      {tab === 'Videos' && (
        <div className="space-y-3">
          {module.youtube.map((yt, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/[0.06] hover:border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                <Youtube className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{yt.name}</h3>
                <p className="text-[#a0a0b0] text-sm leading-relaxed">{yt.desc}</p>
                <p className="text-xs text-[#606070] mt-2">Search on YouTube → Save the playlist → Watch during lunch or commute</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TASKS */}
      {tab === 'Tasks' && (
        <div className="space-y-3">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 mb-2">
            <div className="flex items-center gap-2 mb-1"><Target className="w-3.5 h-3.5 text-[#2ed8c3]" /><span className="text-xs font-semibold text-[#2ed8c3]">Deliverable</span></div>
            <p className="text-[#a0a0b0] text-sm">{module.deliverable}</p>
          </div>
          {module.tasks.map(task => {
            const done = !!isTaskDone(task.id)
            return (
              <button key={task.id} onClick={() => toggleTask(task.id, done)} disabled={saving === task.id}
                className={cn('w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all',
                  done ? 'bg-[#2ed8c3]/5 border-[#2ed8c3]/20' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10')}>
                <div className={cn('flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                  done ? 'bg-[#2ed8c3] border-[#2ed8c3]' : 'border-white/20')}>
                  {saving === task.id ? <Loader2 className="w-3 h-3 text-white animate-spin" /> : done && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className={cn('text-sm flex-1', done ? 'line-through text-[#606070]' : 'text-[#d0d0d0]')}>{task.text}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* NOTES */}
      {tab === 'Notes' && (
        <div className="space-y-4">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
            <h3 className="text-white font-semibold text-sm mb-3">Add a Note</h3>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
              placeholder="Write your insights, key takeaways, or application ideas for this module..."
              className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#2ed8c3]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-[#404050] outline-none resize-none min-h-[100px] transition-colors" />
            <button onClick={saveNote} disabled={savingNote || !noteText.trim()}
              className="mt-3 flex items-center gap-2 bg-[#2ed8c3]/10 hover:bg-[#2ed8c3]/20 border border-[#2ed8c3]/20 text-[#2ed8c3] text-xs font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-50">
              {savingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Note
            </button>
          </div>
          {notes.length === 0 ? (
            <div className="text-center py-12 text-[#606070] text-sm">No notes yet. Start capturing your insights.</div>
          ) : notes.map(note => (
            <div key={note.id} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#606070] font-mono">{new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <button onClick={() => deleteNote(note.id)} className="text-xs text-[#606070] hover:text-red-400 transition-colors">Delete</button>
              </div>
              <p className="text-[#d0d0d0] text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
