import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

const COOKIE_NAME = 'admin-session'
const MAX_AGE = 60 * 60 * 8 // 8 horas

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json().catch(() => ({}))

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
    }

    const expires = Date.now() + MAX_AGE * 1000
    const payload = String(expires)
    const sig = createHmac('sha256', process.env.ADMIN_SECRET!)
      .update(payload)
      .digest('hex')
    const token = `${payload}.${sig}`

    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
      secure: process.env.NODE_ENV === 'production',
    })
    return res
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
