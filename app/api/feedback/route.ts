import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { feedbackSchema } from '@/lib/schemas/feedback'
import { createClient } from '@/lib/supabase/server'
import { withRateLimit, getIP } from '@/lib/api/middleware'
import { validateRequest } from '@/lib/api/validation'
import { apiSuccess, apiError } from '@/lib/api/responses'

export async function POST(req: NextRequest) {
  return withRateLimit(req, async (req) => {
    try {
      const result = await validateRequest(req, feedbackSchema)
      if (!result.success) return result.response
      const { content, isAnonymous, name, email, honeypot } = result.data

      if (honeypot !== undefined && honeypot !== '') {
        return apiSuccess({ success: true }, 201)
      }

      const ip = getIP(req)
      const ipHash = createHash('sha256')
        .update(ip + process.env.IP_HASH_SECRET!)
        .digest('hex')

      const supabase = createClient()
      const { error: dbError } = await supabase.from('feedback').insert({
        content,
        is_anonymous: isAnonymous,
        name: isAnonymous ? null : (name ?? null),
        email: isAnonymous ? null : (email ?? null),
        ip_hash: ipHash,
      })

      if (dbError) {
        console.error('[feedback] db error:', dbError.message)
        return apiError('Erro ao salvar.', 500)
      }

      return apiSuccess({ success: true }, 201)
    } catch (err) {
      console.error('[feedback] unexpected:', err)
      return apiError('Erro interno.', 500)
    }
  })
}

export function GET() {
  return apiError('Método não permitido.', 405)
}
