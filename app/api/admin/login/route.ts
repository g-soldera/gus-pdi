import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { withRateLimit } from '@/lib/api/middleware'
import { apiSuccess, apiError } from '@/lib/api/responses'
import { logger } from '@/lib/logging'

const COOKIE_NAME = 'admin-session'
const MAX_AGE = 60 * 60 * 8 // 8 horas

export async function POST(req: NextRequest) {
  return withRateLimit(req, async (req) => {
    try {
      const { password } = await req.json().catch(() => ({}))

      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return apiError('Credenciais inválidas', 401)
      }

      const expires = Date.now() + MAX_AGE * 1000
      const payload = String(expires)
      const sig = createHmac('sha256', process.env.ADMIN_SECRET!)
        .update(payload)
        .digest('hex')
      const token = `${payload}.${sig}`

      const res = apiSuccess({ ok: true })
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
        secure: process.env.NODE_ENV === 'production',
      })
      return res
    } catch (err) {
      logger.error('api/admin/login', 'Unexpected error in POST handler', err)
      return apiError('Erro interno', 500)
    }
  })
}
