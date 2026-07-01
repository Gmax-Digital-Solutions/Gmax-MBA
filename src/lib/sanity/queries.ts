export const postsQuery = `
  *[_type == "post"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    featured,
    coverImage,
    publishedAt,
    readTime,
    author
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    featured,
    coverImage,
    publishedAt,
    readTime,
    author,
    body
  }
`

export const postSlugsQuery = `
  *[_type == "post"] { "slug": slug.current }
`
