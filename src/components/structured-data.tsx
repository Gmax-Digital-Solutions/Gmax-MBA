const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gmaxmba.com'

export function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id':    `${APP_URL}/#organization`,
        name:     'Gmax MBA',
        url:       APP_URL,
        logo: {
          '@type':  'ImageObject',
          url:      `${APP_URL}/logo.png`,
          width:     500,
          height:    500,
        },
        sameAs: ['https://gmaxdigitals.com'],
      },
      {
        '@type':       'WebSite',
        '@id':         `${APP_URL}/#website`,
        url:            APP_URL,
        name:          'Gmax MBA',
        description:   'Free MBA-level business education for founders and builders.',
        publisher:     { '@id': `${APP_URL}/#organization` },
      },
      {
        '@type':       'Course',
        '@id':         `${APP_URL}/#course`,
        name:          'Gmax MBA — Free Business School for Founders & Builders',
        description:   'A free, self-guided 36-month MBA curriculum for developers, engineers, and solo founders. Covers business fundamentals, strategy, marketing, sales, operations, leadership, and corporate finance.',
        url:            APP_URL,
        provider:      { '@id': `${APP_URL}/#organization` },
        educationalLevel:    'Professional',
        inLanguage:          'en',
        isAccessibleForFree: true,
        offers: {
          '@type':       'Offer',
          price:          '0',
          priceCurrency: 'USD',
          availability:  'https://schema.org/InStock',
          url:           `${APP_URL}/auth/signup`,
        },
        hasCourseInstance: {
          '@type':        'CourseInstance',
          courseMode:     'online',
          courseWorkload: 'PT30M',
          instructor: {
            '@type': 'Organization',
            name:    'Gmax Digital Solutions',
          },
        },
        about: [
          { '@type': 'Thing', name: 'Business Strategy'  },
          { '@type': 'Thing', name: 'Marketing'          },
          { '@type': 'Thing', name: 'Sales'              },
          { '@type': 'Thing', name: 'Financial Literacy' },
          { '@type': 'Thing', name: 'Leadership'         },
          { '@type': 'Thing', name: 'Entrepreneurship'   },
          { '@type': 'Thing', name: 'Corporate Finance'  },
          { '@type': 'Thing', name: 'Venture Capital'    },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name:    'Is Gmax MBA really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:    'Yes. Gmax MBA is completely free. No credit card, no paywalls, no time limits. Every book, video, and deliverable is accessible at no cost.',
            },
          },
          {
            '@type': 'Question',
            name:    'How long does the program take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:    'The structured curriculum spans 36 months at 30 minutes per day. You go at your own pace — the program tracks where you are and resumes where you left off.',
            },
          },
          {
            '@type': 'Question',
            name:    'Who is Gmax MBA for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:    'Gmax MBA is built for developers, software engineers, solo founders, and technical co-founders who want practical business and leadership skills without going back to school.',
            },
          },
          {
            '@type': 'Question',
            name:    'What books are included?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:    'The curriculum includes 30 curated books across 12 modules — including The Personal MBA, Good Strategy / Bad Strategy, Building a StoryBrand, Never Split the Difference, and more. Every book links to a free access option.',
            },
          },
          {
            '@type': 'Question',
            name:    'Do I need a business to enroll?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:    "No. You can enroll whether you're pre-idea, early-stage, or running an existing company. Every lesson includes an application task you adapt to your current situation.",
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
