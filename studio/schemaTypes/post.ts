import {defineField, defineType} from 'sanity'

const CATEGORIES = [
  {title: 'Strategy',   value: 'strategy'},
  {title: 'Finance',    value: 'finance'},
  {title: 'Marketing',  value: 'marketing'},
  {title: 'Sales',      value: 'sales'},
  {title: 'Leadership', value: 'leadership'},
  {title: 'Operations', value: 'operations'},
]

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description shown on card grid and featured hero.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: CATEGORIES, layout: 'radio'},
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Pin this post as the hero article on the blog index.',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Used in the featured hero panel and as the og:image.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {name: 'name', title: 'Name', type: 'string'},
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal',     value: 'normal'},
            {title: 'Heading 2',  value: 'h2'},
            {title: 'Heading 3',  value: 'h3'},
            {title: 'Heading 4',  value: 'h4'},
            {title: 'Quote',      value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold',   value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Code',   value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt',     type: 'string', title: 'Alt text'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title:    'title',
      subtitle: 'category',
      media:    'coverImage',
    },
  },
})
