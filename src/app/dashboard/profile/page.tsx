'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Loader2, Save, Github, Globe, Twitter, Building2, User } from 'lucide-react'
import { getInitials } from '@/lib/utils'

const roles = [
  { value: 'builder',  label: 'Builder / Maker'        },
  { value: 'founder',  label: 'Founder / Entrepreneur' },
  { value: 'engineer', label: 'Software Engineer'      },
  { value: 'designer', label: 'Designer'               },
  { value: 'other',    label: 'Other'                  },
]

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', bio: '', role: 'builder', twitter: '', github: '', website: '' })

  useEffect(() => {
    fetch('/api/users/me').then(r => r.json()).then(data => {
      setForm({ name: data.name || '', company: data.company || '', bio: data.bio || '', role: data.role || 'builder', twitter: data.twitter || '', github: data.github || '', website: data.website || '' })
      setLoaded(true)
    })
  }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/users/me', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      await update({ name: form.name })
      toast.success('Profile updated!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  if (!loaded) return <div className="flex items-center justify-center h-64"><Loader2 className="w-5 h-5 animate-spin text-[#606070]" /></div>

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Profile</h1>
        <p className="text-[#a0a0b0] text-sm">How you appear to the community.</p>
      </div>

      {/* Avatar card */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#2ed8c3]/20 border border-[#2ed8c3]/30 flex items-center justify-center text-xl font-bold text-[#2ed8c3] font-display flex-shrink-0">
          {getInitials(form.name || session?.user?.name)}
        </div>
        <div className="min-w-0">
          <div className="text-white font-semibold truncate">{form.name || session?.user?.name || 'Your Name'}</div>
          <div className="text-[#606070] text-sm truncate">{session?.user?.email}</div>
          <div className="text-xs text-[#2ed8c3] mt-1 bg-[#2ed8c3]/10 border border-[#2ed8c3]/20 px-2.5 py-0.5 rounded-full inline-block">
            {roles.find(r => r.value === form.role)?.label || 'Builder'}
          </div>
        </div>
      </div>

      {/* Basic info */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6 space-y-4">
        <h2 className="font-display text-base font-bold text-white">Basic Info</h2>
        {/* Stack on mobile, grid on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#606070]" />
              <input value={form.name} onChange={e => set('name', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl pl-9 pr-4 py-3 text-sm text-white outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Company / Project</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#606070]" />
              <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Your startup"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-[#404050] outline-none transition-colors" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#a0a0b0] mb-2">I am a</label>
          <select value={form.role} onChange={e => set('role', e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors">
            {roles.map(r => <option key={r.value} value={r.value} className="bg-[#2c2528]">{r.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#a0a0b0] mb-2">Bio</label>
          <textarea value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="What are you building?" rows={3}
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-[#404050] outline-none resize-none transition-colors" />
        </div>
      </div>

      {/* Links */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6 space-y-4">
        <h2 className="font-display text-base font-bold text-white">Links</h2>
        {[
          { key: 'twitter', icon: Twitter, placeholder: '@yourhandle',  label: 'Twitter / X' },
          { key: 'github',  icon: Github,  placeholder: 'github.com/you', label: 'GitHub'    },
          { key: 'website', icon: Globe,   placeholder: 'yoursite.com', label: 'Website'     },
        ].map(({ key, icon: Icon, placeholder, label }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-[#a0a0b0] mb-2">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#606070]" />
              <input value={(form as any)[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-[#404050] outline-none transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] disabled:opacity-60 text-[#241e20] font-bold py-3.5 rounded-xl transition-all text-sm">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Profile</>}
      </button>
    </div>
  )
}