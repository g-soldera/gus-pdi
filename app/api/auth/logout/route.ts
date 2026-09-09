import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'pdi-session'

export async function POST(req: NextRequest) {
  try {
    // Clear the session cookie
    const res = NextResponse.json({ success: true, message: 'Logout successful.' })
    res.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Expire immediately
      secure: process.env.NODE_ENV === 'production',
    })

    return res
  } catch (err) {
    console.error('[auth/logout] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
