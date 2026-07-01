import { client } from '@/lib/sanity/client'
import { postsQuery } from '@/lib/sanity/queries'
import BlogClient from './BlogClient'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | Gmax MBA Insights',
  description:
    'Executive perspectives on strategy, leadership, and the intersection of technology and business.',
}

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery)
  return <BlogClient posts={posts} />
}
