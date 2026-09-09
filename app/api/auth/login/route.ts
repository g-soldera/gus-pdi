import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { loginSchema } from '@/lib/schemas/auth'

const COOKIE_NAME = 'pdi-session'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
    }

    // Validate with Zod schema (T-AUTH-01: Validate request body using strict Zod schema)
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid credentials format.', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    // Verify credentials against environment variables
    const validEmail = process.env.ADMIN_EMAIL
    const validPassword = process.env.ADMIN_PASSWORD

    if (!validEmail || !validPassword) {
      console.error('[auth/login] Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    if (email !== validEmail || password !== validPassword) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    // Create secure session token with HMAC signature
    const expires = Date.now() + MAX_AGE * 1000
    const payload = String(expires)
    const secret = process.env.ADMIN_SECRET

    if (!secret) {
      console.error('[auth/login] Missing ADMIN_SECRET environment variable')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    const sig = createHmac('sha256', secret)
      .update(payload)
      .digest('hex')
    const token = `${payload}.${sig}`

    // Set httpOnly session cookie (T-AUTH-02: Use secure httpOnly cookies for session storage)
    const res = NextResponse.json({ success: true, message: 'Login successful.' })
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
      secure: process.env.NODE_ENV === 'production',
    })

    return res
  } catch (err) {
    console.error('[auth/login] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
