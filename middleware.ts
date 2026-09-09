import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

const COOKIE_NAME = 'admin-session'

function isValidToken(token: string | undefined, secret: string): boolean {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  
  const expires = parseInt(payload, 10)
  if (Date.now() > expires) return false
  
  const expected = createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  return sig === expected
}

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  
  if (req.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = req.cookies.get(COOKIE_NAME)?.value
  const secret = process.env.ADMIN_SECRET ?? ''

  if (!isValidToken(token, secret)) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
