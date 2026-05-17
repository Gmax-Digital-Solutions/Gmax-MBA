import { createClient } from '@supabase/supabase-js'

// Server-side client with service role key (can write to storage)
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars')
  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

export const AVATAR_BUCKET = 'avatar'
