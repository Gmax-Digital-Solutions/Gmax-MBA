import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'tgpn5q9x',
  dataset:   'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
