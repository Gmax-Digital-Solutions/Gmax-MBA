'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Loader2, Save, Github, Globe, Twitter, Building2, User, Camera, X, Upload } from 'lucide-react'
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
  const [saving, setSaving]             = useState(false)
  const [loaded, setLoaded]             = useState(false)
  const [uploading, setUploading]       = useState(false)
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [dragOver, setDragOver]         = useState(false)
  const fileInputRef                    = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    name: '', company: '', bio: '', role: 'builder',
    twitter: '', github: '', website: '',
  })

  useEffect(() => {
    fetch('/api/users/me').then(r => r.json()).then(data => {
      setForm({
        name: data.name || '', company: data.company || '', bio: data.bio || '',
        role: data.role || 'builder', twitter: data.twitter || '',
        github: data.github || '', website: data.website || '',
      })
      setCurrentImage(data.image || null)
      setLoaded(true)
    })
  }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  // ── AVATAR UPLOAD ─────────────────────────────────────────────────────────
  function handleFileSelect(file: File | null) {
    if (!file) return
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, WebP, or GIF image')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }
    // Show local preview instantly
    const reader = new FileReader()
    reader.onload = e => setPreviewUrl(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function uploadAvatar(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('avatar', file)
      const res = await fetch('/api/upload/avatar', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Upload failed'); return }
      setCurrentImage(data.imageUrl)
      setPreviewUrl(null)
      await update({ image: data.imageUrl })
      toast.success('Profile photo updated! 🎉')
    } catch {
      toast.error('Upload failed — please try again')
    } finally {
      setUploading(false)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) { handleFileSelect(file); uploadAvatar(file) }
    e.target.value = '' // reset so same file can be re-selected
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) { handleFileSelect(file); uploadAvatar(file) }
  }

  function clearPreview() {
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ── PROFILE SAVE ──────────────────────────────────────────────────────────
  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      await update({ name: form.name })
      toast.success('Profile saved!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  if (!loaded) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-5 h-5 animate-spin text-[#606070]" />
    </div>
  )

  const displayImage = previewUrl || currentImage
  const initials     = getInitials(form.name || session?.user?.name)

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Profile</h1>
        <p className="text-[#a0a0b0] text-sm">How you appear to the community.</p>
      </div>

      {/* ── AVATAR CARD ──────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6">
        <h2 className="font-display text-sm font-bold text-white mb-4">Profile Photo</h2>

        <div className="flex items-center gap-5 flex-wrap">
          {/* Avatar preview */}
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10 cursor-pointer group relative"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}>
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt="Profile photo"
                  width={80} height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-[#2ed8c3]/20 border border-[#2ed8c3]/30 flex items-center justify-center">
                  <span className="font-display font-bold text-[#2ed8c3] text-2xl">{initials}</span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                <Camera className="w-6 h-6 text-white" />
              </div>
              {/* Loading overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
                  <Loader2 className="w-6 h-6 text-[#2ed8c3] animate-spin" />
                </div>
              )}
            </div>
            {/* Clear preview button */}
            {previewUrl && !uploading && (
              <button onClick={clearPreview}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 border-[#241e20] flex items-center justify-center">
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            )}
          </div>

          {/* Upload zone */}
          <div
            className={`flex-1 min-w-[180px] border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-[#2ed8c3] bg-[#2ed8c3]/8'
                : 'border-white/[0.12] hover:border-white/25 hover:bg-white/[0.02]'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}>
            <Upload className="w-5 h-5 text-[#606070] mx-auto mb-2" />
            <p className="text-sm text-white font-medium mb-0.5">
              {uploading ? 'Uploading...' : 'Click or drag & drop'}
            </p>
            <p className="text-xs text-[#606070]">JPEG, PNG, WebP · Max 5MB</p>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {/* Hint */}
        <p className="text-[11px] text-[#504850] mt-3">
          Your photo is cropped to a square and resized to 400×400px automatically.
          It appears next to your posts in the community feed.
        </p>
      </div>

      {/* ── BASIC INFO ───────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6 space-y-4">
        <h2 className="font-display text-sm font-bold text-white">Basic Info</h2>
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
          <textarea value={form.bio} onChange={e => set('bio', e.target.value)}
            placeholder="What are you building? What's your story?" rows={3}
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#2ed8c3]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-[#404050] outline-none resize-none transition-colors" />
        </div>
      </div>

      {/* ── LINKS ────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 md:p-6 space-y-4">
        <h2 className="font-display text-sm font-bold text-white">Links</h2>
        {[
          { key: 'twitter', icon: Twitter, placeholder: '@yourhandle',   label: 'Twitter / X' },
          { key: 'github',  icon: Github,  placeholder: 'github.com/you', label: 'GitHub'     },
          { key: 'website', icon: Globe,   placeholder: 'yoursite.com',  label: 'Website'     },
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

      {/* Save button */}
      <button onClick={save} disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-[#2ed8c3] hover:bg-[#5ee3d2] disabled:opacity-60 text-[#241e20] font-bold py-3.5 rounded-xl transition-all text-sm">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Profile</>}
      </button>
    </div>
  )
}
