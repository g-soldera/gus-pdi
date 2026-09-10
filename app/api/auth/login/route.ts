import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { loginSchema } from '@/lib/schemas/auth'
import { withRateLimit } from '@/lib/api/middleware'
import { validateRequest } from '@/lib/api/validation'
import { apiSuccess, apiError, apiValidationError } from '@/lib/api/responses'
import { logger } from '@/lib/logging'

const COOKIE_NAME = 'pdi-session'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export async function POST(req: NextRequest) {
  return withRateLimit(req, async (req) => {
    try {
      // Validate with Zod schema (T-AUTH-01: Validate request body using strict Zod schema)
      const result = await validateRequest(req, loginSchema)
      if (!result.success) return result.response
      const { email, password } = result.data

      // Verify credentials against environment variables
      const validEmail = process.env.ADMIN_EMAIL
      const validPassword = process.env.ADMIN_PASSWORD

      if (!validEmail || !validPassword) {
        logger.error('api/auth/login', 'Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables')
        return apiError('Erro de configuração do servidor', 500)
      }

      if (email !== validEmail || password !== validPassword) {
        return apiError('Credenciais inválidas', 401)
      }

      // Create secure session token with HMAC signature
      const expires = Date.now() + MAX_AGE * 1000
      const payload = String(expires)
      const secret = process.env.ADMIN_SECRET

      if (!secret) {
        logger.error('api/auth/login', 'Missing ADMIN_SECRET environment variable')
        return apiError('Erro de configuração do servidor', 500)
      }

      const sig = createHmac('sha256', secret)
        .update(payload)
        .digest('hex')
      const token = `${payload}.${sig}`

      // Set httpOnly session cookie (T-AUTH-02: Use secure httpOnly cookies for session storage)
      const res = apiSuccess({ success: true, message: 'Login realizado com sucesso' })
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
        secure: process.env.NODE_ENV === 'production',
      })

      return res
    } catch (err) {
      logger.error('api/auth/login', 'Unexpected error in POST handler', err)
      return apiError('Erro interno', 500)
    }
  })
}

export async function GET() {
  return apiError('Método não permitido', 405)
}
