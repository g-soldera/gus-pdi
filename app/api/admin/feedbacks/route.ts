import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logging'
import { apiSuccess, apiError } from '@/lib/api/responses'

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: feedbacks, error } = await supabase
      .from('feedback')
      .select('id, content, is_anonymous, name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      logger.error('api/admin/feedbacks', 'Database query failed', error)
      return apiError('Erro ao buscar feedbacks.', 500)
    }

    return apiSuccess(feedbacks)
  } catch (err) {
    logger.error('api/admin/feedbacks', 'Unexpected error in GET handler', err)
    return apiError('Erro interno.', 500)
  }
}
