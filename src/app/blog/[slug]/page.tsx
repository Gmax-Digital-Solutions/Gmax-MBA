import { client }              from '@/lib/sanity/client'
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity/queries'
import { urlFor }              from '@/lib/sanity/image'
import { PortableText }        from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import Image                   from 'next/image'
import Link                    from 'next/link'
import { notFound }            from 'next/navigation'
import type { Metadata }       from 'next'

export const revalidate = 60

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  coverImage?: { asset?: { _ref: string }; [key: string]: unknown }
  publishedAt?: string
  readTime?: number
  author?: { name?: string }
  body?: unknown[]
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(postSlugsQuery)
  return slugs.filter(Boolean).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post: Post | null = await client.fetch(postBySlugQuery, {
    slug: params.slug,
  })
  if (!post) return {}
  return {
    title:       post.title,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      images:      post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : [],
    },
  }
}

// ── Portable Text component map ──────────────────────────────────────────────

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body-lg text-body-lg text-text-secondary mb-6 leading-relaxed">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-headline-md text-headline-md text-text-primary mt-12 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-headline-sm text-headline-sm text-text-primary mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-body-lg text-body-lg font-semibold text-text-primary mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-6 my-8 text-text-secondary italic font-body-lg text-body-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-surface-container-high text-primary px-2 py-0.5 rounded font-label-mono text-label-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary-container transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(1200).height(675).url()}
            alt={value.alt ?? ''}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center font-label-mono text-label-mono text-text-tertiary mt-3">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 font-body-lg text-body-lg text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 font-body-lg text-body-lg text-text-secondary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post: Post | null = await client.fetch(postBySlugQuery, {
    slug: params.slug,
  })
  if (!post) notFound()

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day:   'numeric',
        year:  'numeric',
      })
    : null

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border-subtle">
        <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link href="/" className="font-headline-md text-[22px] font-bold text-primary tracking-tight">
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
          <Link href="/dashboard"
            className="bg-primary-container text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps font-bold hover:opacity-80 active:scale-95 transition-all">
            APPLY NOW
          </Link>
        </div>
      </nav>

      {/* Article */}
      <main
        className="pt-32 pb-24 min-h-screen"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(46,216,195,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[800px] mx-auto px-margin-desktop">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-label-mono text-label-mono text-text-secondary hover:text-primary transition-colors mb-12"
          >
            <span className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 0" }}>
              arrow_back
            </span>
            BACK TO JOURNAL
          </Link>

          {/* Header */}
          <header className="mb-12">
            {post.category && (
              <span className="inline-block font-label-mono text-label-mono text-primary border border-primary/20 px-3 py-1 rounded bg-primary/5 uppercase mb-6">
                {post.category}
              </span>
            )}
            <h1 className="font-display-lg text-display-lg text-text-primary mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-body-lg text-body-lg text-text-secondary mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border-subtle font-label-mono text-label-mono text-text-secondary uppercase">
              {post.author?.name && (
                <span className="text-text-primary">{post.author.name}</span>
              )}
              {post.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-outline hidden md:block" />
                  <span>{post.readTime} min read</span>
                </>
              )}
              {publishedDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-outline hidden md:block" />
                  <span>{publishedDate}</span>
                </>
              )}
            </div>
          </header>

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 border border-border-subtle">
              <Image
                src={urlFor(post.coverImage).width(1600).height(900).url()}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          )}

          {/* Body */}
          {post.body && (
            <div className="prose-gmax">
              <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
            </div>
          )}

          {/* End card */}
          <div className="mt-16 p-8 rounded-xl border border-border-subtle"
            style={{ background: 'rgba(88,245,223,0.04)' }}>
            <p className="font-label-mono text-label-mono text-primary uppercase tracking-wider mb-3">
              Gmax MBA · Insights
            </p>
            <p className="font-body-md text-body-md text-text-secondary mb-6">
              More executive perspectives on strategy, finance, and leadership.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-label-mono text-label-mono text-primary hover:text-primary-container transition-colors"
            >
              Browse all articles
              <span className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 0" }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle w-full py-12 px-margin-desktop"
        style={{ backgroundColor: '#120d0f' }}>
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-label-mono text-label-mono text-on-surface-variant">
            © {new Date().getFullYear()} Gmax MBA. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
