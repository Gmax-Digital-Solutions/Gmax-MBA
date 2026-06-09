'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { getInitials } from '@/lib/utils'

const ROLES = [
  { value: 'founder',  label: 'Founder / CEO'       },
  { value: 'engineer', label: 'Lead Engineer'        },
  { value: 'builder',  label: 'Builder / Maker'      },
  { value: 'designer', label: 'Designer / Creative'  },
  { value: 'other',    label: 'Other Executive'      },
]

export default function ProfilePage() {
  const [user,         setUser]         = useState<any>(null)
  const [name,         setName]         = useState('')
  const [company,      setCompany]      = useState('')
  const [role,         setRole]         = useState('')
  const [bio,          setBio]          = useState('')
  const [twitter,      setTwitter]      = useState('')
  const [github,       setGithub]       = useState('')
  const [website,      setWebsite]      = useState('')
  const [saving,       setSaving]       = useState(false)
  const [uploading,    setUploading]    = useState(false)
  const [preview,      setPreview]      = useState<string | null>(null)
  const [dragOver,     setDragOver]     = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/users/me').then(r => r.json()).then(u => {
      setUser(u)
      setName(u.name || '')
      setCompany(u.company || '')
      setRole(u.role || '')
      setBio(u.bio || '')
      setTwitter(u.twitter || '')
      setGithub(u.github || '')
      setWebsite(u.website || '')
    })
  }, [])

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image file'); return }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return }
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload/avatar', { method: 'POST', body: fd })
      const data = await res.json()
      
      if (!res.ok) { 
        console.error('[UPLOAD] Error:', data)
        toast.error(data.error || 'Upload failed')
        return 
      }
      
      setUser((prev: any) => ({ ...prev, image: data.url }))
      toast.success('Photo updated!')
    } catch (err) { 
      console.error('[UPLOAD] Exception:', err)
      toast.error('Upload failed') 
    }
    finally { setUploading(false) }
  }, [])

  async function handleSave() {
    if (!name.trim()) { toast.error('Name is required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, role, bio, twitter, github, website }),
      })
      if (!res.ok) { toast.error('Failed to save'); return }
      const updated = await res.json()
      setUser(updated)
      toast.success('Profile updated!')
    } catch { toast.error('Something went wrong') }
    finally { setSaving(false) }
  }

  const avatarSrc = preview || user?.image
  const profilePct = Math.round(
    ([name, company, role, bio, twitter, github, website].filter(Boolean).length / 7) * 100
  )

  return (
    <div className="bg-grid min-h-full">
      {/* Atmospheric glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-12">
          <div className="space-y-2">
            <h1 className="font-display-lg text-display-lg-mobile md:text-[44px] text-text-primary leading-tight">
              Mastery Profile
            </h1>
            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-mono text-[10px] uppercase tracking-wider">
                Gmax Member
              </span>
              <span className="text-text-tertiary font-body-md italic hidden sm:inline">
                Visible to all program members
              </span>
            </div>
          </div>
          {user && (
            <p className="text-right hidden md:block flex-shrink-0">
              <span className="block text-text-tertiary font-label-caps text-[10px] uppercase tracking-widest">Enrolled</span>
              <span className="text-text-primary font-label-mono text-xs">
                {new Date(user.enrolledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6 md:space-y-8">

            {/* Avatar + profile card */}
            <section className="glass-card p-6 md:p-8 rounded-xl flex flex-col items-center text-center">
              <div className="relative group mb-5 md:mb-6">
                {/* Avatar display */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                  className={`w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 cursor-pointer transition-all
                    ${dragOver ? 'border-primary shadow-[0_0_20px_rgba(46,216,195,0.3)]' : 'border-border-hover hover:border-primary/50'}
                    bg-surface-container relative`}>
                  {uploading && (
                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  )}
                  {avatarSrc ? (
                    <Image src={avatarSrc} alt={name || 'Profile'} width={128} height={128}
                      className="w-full h-full object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-primary/10 gap-2">
                      <span className="material-symbols-outlined text-primary text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                      {name && (
                        <span className="font-label-mono text-sm font-bold text-primary">{getInitials(name)}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Camera button */}
                <button onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-9 h-9 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary shadow-lg hover:scale-105 active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-lg md:text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                </button>

                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              </div>

              <p className="font-label-caps text-[10px] text-text-tertiary mb-4 md:mb-6">
                Click or drag &amp; drop · JPEG, PNG, WebP · Max 5MB
              </p>

              <h2 className="font-headline-sm text-xl md:text-2xl text-text-primary">
                {name || 'Your Name'}
              </h2>
              <p className="text-text-tertiary text-sm mb-5 md:mb-6">
                {ROLES.find(r => r.value === role)?.label || 'Program Member'}
              </p>

              {/* Profile completion */}
              <div className="w-full pt-5 md:pt-6 border-t border-border-subtle">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest">Profile Completion</span>
                  <span className="font-label-mono text-[10px] text-primary">{profilePct}%</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${profilePct}%` }} />
                </div>
              </div>
            </section>

            {/* Support card */}
            <div className="glass-card p-5 md:p-6 rounded-xl space-y-3">
              <h3 className="font-headline-sm text-lg text-text-primary">Visibility</h3>
              <p className="text-text-tertiary text-xs leading-relaxed">
                Your profile is visible to all members in the Gmax community directory. Social links are optional.
              </p>
              <div className="pt-2 space-y-2">
                {[
                  { icon: 'group',        text: 'Visible to all members' },
                  { icon: 'lock',         text: 'Email stays private'    },
                  { icon: 'edit',         text: 'Edit anytime'           },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-text-tertiary">
                    <span className="material-symbols-outlined text-sm text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    <span className="text-xs font-body-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN ─────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">

            {/* Core Credentials */}
            <section className="glass-card p-6 md:p-8 rounded-xl relative overflow-hidden">
              {/* Left teal bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl" />

              <h2 className="font-headline-sm text-xl md:text-2xl text-text-primary flex items-center gap-4 mb-6 md:mb-8">
                Core Credentials
                <span className="h-px w-16 md:w-20 bg-gradient-to-r from-border-subtle to-transparent" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest block">Full Name *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-primary focus:shadow-[0_0_10px_rgba(88,245,223,0.1)] rounded px-4 py-2.5 text-text-primary text-sm font-label-mono outline-none transition-all placeholder:text-text-tertiary" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest block">Company / Project</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Acme AI"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-primary focus:shadow-[0_0_10px_rgba(88,245,223,0.1)] rounded px-4 py-2.5 text-text-primary text-sm font-label-mono outline-none transition-all placeholder:text-text-tertiary" />
                </div>
              </div>

              <div className="mt-5 md:mt-8 space-y-2">
                <label className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest block">Professional Role</label>
                <div className="relative">
                  <select value={role} onChange={e => setRole(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-primary rounded px-4 py-2.5 text-text-primary text-sm font-label-mono outline-none appearance-none cursor-pointer transition-all">
                    <option value="" className="bg-surface-container">Select your role...</option>
                    {ROLES.map(r => (
                      <option key={r.value} value={r.value} className="bg-surface-container">{r.label}</option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-tertiary pointer-events-none text-xl">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="mt-5 md:mt-8 space-y-2">
                <label className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest block">Professional Bio</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)}
                  placeholder="Briefly describe your focus and technical background..."
                  rows={4}
                  maxLength={300}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-primary focus:shadow-[0_0_10px_rgba(88,245,223,0.1)] rounded px-4 py-3 text-text-primary text-sm font-label-mono outline-none resize-none transition-all placeholder:text-text-tertiary" />
                <div className="flex justify-end">
                  <span className="font-label-mono text-[10px] text-text-tertiary">{bio.length} / 300 characters</span>
                </div>
              </div>
            </section>

            {/* External Channels */}
            <section className="space-y-4 md:space-y-6">
              <h2 className="font-headline-sm text-xl md:text-2xl text-text-primary flex items-center gap-4">
                External Channels
                <span className="h-px w-16 md:w-20 bg-gradient-to-r from-border-subtle to-transparent" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Twitter */}
                <div className="glass-card p-4 md:p-5 rounded-xl border-l-4 border-l-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 md:p-2 rounded bg-primary/5 border border-primary/20 text-primary">
                      <span className="material-symbols-outlined text-lg">alternate_email</span>
                    </div>
                    <span className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest">Twitter / X</span>
                  </div>
                  <input type="text" value={twitter} onChange={e => setTwitter(e.target.value)}
                    placeholder="@handle"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-primary rounded px-3 py-2 text-xs font-label-mono text-text-primary outline-none transition-all placeholder:text-text-tertiary" />
                </div>

                {/* GitHub */}
                <div className="glass-card p-4 md:p-5 rounded-xl border-l-4 border-l-secondary">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 md:p-2 rounded bg-secondary/5 border border-secondary/20 text-secondary">
                      <span className="material-symbols-outlined text-lg">code</span>
                    </div>
                    <span className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest">GitHub</span>
                  </div>
                  <input type="text" value={github} onChange={e => setGithub(e.target.value)}
                    placeholder="username"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-primary rounded px-3 py-2 text-xs font-label-mono text-text-primary outline-none transition-all placeholder:text-text-tertiary" />
                </div>

                {/* Website */}
                <div className="glass-card p-4 md:p-5 rounded-xl border-l-4 border-l-tertiary">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1.5 md:p-2 rounded bg-tertiary/5 border border-tertiary/20 text-tertiary">
                      <span className="material-symbols-outlined text-lg">language</span>
                    </div>
                    <span className="font-label-caps text-[10px] text-text-tertiary uppercase tracking-widest">Portfolio</span>
                  </div>
                  <input type="text" value={website} onChange={e => setWebsite(e.target.value)}
                    placeholder="https://"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-primary rounded px-3 py-2 text-xs font-label-mono text-text-primary outline-none transition-all placeholder:text-text-tertiary" />
                </div>
              </div>
            </section>

            {/* Save */}
            <footer className="pt-2">
              <button onClick={handleSave} disabled={saving}
                className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-3 hover:shadow-[0_0_15px_rgba(46,216,195,0.2)] active:scale-[0.99] transition-all uppercase tracking-[0.2em] text-xs disabled:opacity-60">
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                )}
                {saving ? 'Saving...' : 'Commit Profile Changes'}
              </button>
            </footer>

          </div>
        </div>
      </div>
    </div>
  )
}
