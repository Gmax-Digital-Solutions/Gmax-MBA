'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

export type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  featured?: boolean
  coverImage?: { asset?: { _ref: string }; [key: string]: unknown }
  publishedAt?: string
  readTime?: number
  author?: { name?: string }
}

const CATEGORIES = [
  { label: 'ALL INSIGHTS', value: 'all' },
  { label: 'STRATEGY',     value: 'strategy' },
  { label: 'FINANCE',      value: 'finance' },
  { label: 'MARKETING',    value: 'marketing' },
  { label: 'SALES',        value: 'sales' },
  { label: 'LEADERSHIP',   value: 'leadership' },
  { label: 'OPERATIONS',   value: 'operations' },
]

const POSTS_PER_PAGE = 6

function formatShort(str?: string) {
  if (!str) return ''
  return new Date(str)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    .toUpperCase()
}

function formatLong(str?: string) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [page, setPage] = useState(1)
  const mainRef = useRef<HTMLElement>(null)

  // Atmosphere: subtle parallax on the dot grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      if (mainRef.current) {
        mainRef.current.style.backgroundPosition = `${x * 10}px ${y * 10}px`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const featuredPost = posts.find(p => p.featured) ?? posts[0]

  const filteredPosts =
    activeCategory === 'all'
      ? posts.filter(p => p._id !== featuredPost?._id)
      : posts.filter(p => p.category === activeCategory)

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const paginated  = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const showHero   = activeCategory === 'all' && !!featuredPost

  function pickCategory(cat: string) {
    setActiveCategory(cat)
    setPage(1)
  }

  return (
    <>
      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border-subtle">
        <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link href="/" className="font-headline-md text-[22px] font-bold text-primary tracking-tighter">
            Gmax MBA
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard/daily"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
              CURRICULUM
            </Link>
            <Link href="/blog"
              className="font-label-caps text-label-caps text-primary border-b-2 border-primary pb-1">
              JOURNAL
            </Link>
            <Link href="/dashboard/community"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
              COMMUNITY
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined">search</span>
            </button>
            <Link href="/dashboard"
              className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-caps text-label-caps font-bold hover:opacity-80 active:scale-95 transition-all">
              APPLY NOW
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <main
        ref={mainRef}
        className="pt-32 pb-24 min-h-screen"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(46,216,195,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-container-max mx-auto px-margin-desktop">

          {/* Header */}
          <header className="mb-16 text-center md:text-left max-w-4xl">
            <span className="font-label-mono text-label-mono text-primary-container block mb-4 uppercase tracking-[0.2em]">
              GMAX MBA · Insights
            </span>
            <h1 className="font-display-lg text-display-lg text-text-primary mb-6">
              The Gmax MBA Blog
            </h1>
            <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl">
              Executive perspectives on engineering leadership, tactical growth, and
              the intersection of technology and business strategy.
            </p>
          </header>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-16 items-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => pickCategory(cat.value)}
                className={`border px-4 py-2 rounded-full font-label-mono text-label-mono transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'border-border-subtle text-on-surface-variant hover:border-primary-container hover:text-primary-container'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Hero */}
          {showHero && featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="block mb-24">
              <article
                className="relative group overflow-hidden rounded-xl bg-surface-container border border-border-subtle cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_12px_40px_-12px_rgba(88,245,223,0.2)]"
                style={{
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex flex-col lg:flex-row h-full min-h-[440px]">
                  {/* Text panel */}
                  <div className="lg:w-7/12 p-10 lg:p-16 flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
                        FEATURED
                      </span>
                      {featuredPost.category && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border-subtle" />
                          <span className="font-label-mono text-label-mono text-text-secondary uppercase">
                            {featuredPost.category}
                          </span>
                        </>
                      )}
                    </div>
                    <h2 className="font-display-lg text-display-lg text-text-primary mb-6 group-hover:text-primary transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="font-body-lg text-body-lg text-text-secondary mb-8 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-6 mt-auto font-label-mono text-label-mono text-text-secondary uppercase">
                      {featuredPost.readTime && (
                        <span>{featuredPost.readTime} Min Read</span>
                      )}
                      {featuredPost.readTime && featuredPost.publishedAt && <span>•</span>}
                      {featuredPost.publishedAt && (
                        <span>{formatLong(featuredPost.publishedAt)}</span>
                      )}
                      <span className="ml-auto text-primary flex items-center gap-2">
                        READ ARTICLE
                        <span
                          className="material-symbols-outlined transition-transform duration-500 group-hover:translate-x-1"
                          style={{ fontVariationSettings: "'FILL' 0" }}
                        >
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Image panel */}
                  <div className="lg:w-5/12 bg-surface-container-low relative overflow-hidden hidden lg:block">
                    <div className="absolute inset-0 opacity-40 z-0">
                      <div
                        className="w-full h-full"
                        style={{
                          background:
                            'radial-gradient(circle at center, rgba(88,245,223,0.2) 0%, transparent 70%)',
                        }}
                      />
                    </div>
                    {/* Fade into the text panel */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-surface-container z-10" />
                    {featuredPost.coverImage ? (
                      <Image
                        src={urlFor(featuredPost.coverImage).width(900).height(600).url()}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 0px, 45vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                    )}
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Post Grid */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map(post => (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <article className="group bg-surface-container border border-border-subtle rounded-xl p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_12px_40px_-12px_rgba(88,245,223,0.2)]">
                    <div className="mb-6">
                      <span className="inline-block font-label-mono text-label-mono text-primary border border-primary/20 px-2 py-1 rounded bg-primary/5 uppercase">
                        {post.category ?? 'Insight'}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-text-primary mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="font-body-md text-body-md text-text-secondary mb-8 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto pt-6 border-t border-border-subtle flex justify-between items-center font-label-mono text-label-mono text-text-secondary">
                      <div className="flex gap-3 items-center">
                        {post.readTime && <span>{post.readTime} MIN</span>}
                        {post.readTime && post.publishedAt && <span>•</span>}
                        {post.publishedAt && <span>{formatShort(post.publishedAt)}</span>}
                      </div>
                      <span
                        className="text-primary material-symbols-outlined text-[20px] transition-transform duration-500 group-hover:translate-x-1"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        arrow_right_alt
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 font-body-md text-text-secondary">
              No posts in this category yet — check back soon.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-24 flex justify-center items-center gap-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded border border-border-subtle text-text-secondary hover:text-primary transition-colors disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <div className="flex gap-2 font-label-mono text-label-mono">
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  const n = i + 1
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-10 h-10 flex items-center justify-center rounded border transition-all ${
                        page === n
                          ? 'bg-primary/10 text-primary border-primary/30'
                          : 'border-border-subtle text-text-secondary hover:border-primary/30 hover:text-primary'
                      }`}
                    >
                      {n}
                    </button>
                  )
                })}
                {totalPages > 3 && (
                  <>
                    <span className="w-10 h-10 flex items-center justify-center text-text-tertiary">
                      ...
                    </span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className={`w-10 h-10 flex items-center justify-center rounded border transition-all ${
                        page === totalPages
                          ? 'bg-primary/10 text-primary border-primary/30'
                          : 'border-border-subtle text-text-secondary hover:border-primary/30 hover:text-primary'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded border border-border-subtle text-text-secondary hover:text-primary transition-colors disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-surface-container-lowest border-t border-border-subtle w-full py-12 px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-container-max mx-auto">
          <div className="flex flex-col gap-4">
            <div className="font-headline-sm text-headline-sm text-primary">Gmax MBA</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Forging the next generation of technical executives through rigorous
              academic focus and elite community access.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-label-mono text-label-mono text-primary mb-2 uppercase tracking-wider">
              ACADEMICS
            </div>
            <Link href="/dashboard/daily"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Curriculum
            </Link>
            <Link href="/dashboard/modules"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Faculty
            </Link>
            <Link href="/dashboard"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Admissions
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-label-mono text-label-mono text-primary mb-2 uppercase tracking-wider">
              RESOURCES
            </div>
            <Link href="/blog"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Journal
            </Link>
            <Link href="/dashboard/curriculum"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Academic Rigor
            </Link>
            <Link href="/"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Press
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-label-mono text-label-mono text-primary mb-2 uppercase tracking-wider">
              LEGAL
            </div>
            <Link href="/"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Privacy Policy
            </Link>
            <Link href="/"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-surface-tint hover:underline decoration-primary-container transition-colors">
              Contact
            </Link>
            <div className="mt-4 flex gap-4">
              <button className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center hover:border-primary hover:text-primary transition-all text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">public</span>
              </button>
              <button className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center hover:border-primary hover:text-primary transition-all text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-container-max mx-auto mt-12 pt-8 border-t border-border-subtle/30 text-center">
          <p className="font-label-mono text-label-mono text-on-surface-variant">
            © {new Date().getFullYear()} Gmax MBA Institutional. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
