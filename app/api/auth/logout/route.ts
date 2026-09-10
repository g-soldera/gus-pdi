import { NextRequest, NextResponse } from 'next/server'
import { apiSuccess, apiError } from '@/lib/api/responses'
import { logger } from '@/lib/logging'

const COOKIE_NAME = 'pdi-session'

export async function POST(req: NextRequest) {
  try {
    // Clear the session cookie
    const res = apiSuccess({ success: true, message: 'Logout realizado com sucesso' })
    res.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Expire immediately
      secure: process.env.NODE_ENV === 'production',
    })

    return res
  } catch (err) {
    logger.error('api/auth/logout', 'Unexpected error in POST handler', err)
    return apiError('Erro interno', 500)
  }
}

export async function GET() {
  return apiError('Método não permitido', 405)
}
