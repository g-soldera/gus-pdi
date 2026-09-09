import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * Client for public read operations (anon key).
 * Write operations protected by RLS + Phase 04 auth middleware.
 * 
 * Usage:
 * - Use this client for public-facing pages (dashboard, timeline, resources)
 * - Write operations require password validation via API routes in Phase 04
 * - RLS policies block direct writes via anon key
 */
export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}
