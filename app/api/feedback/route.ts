import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { ratelimit } from '@/lib/ratelimit'
import { feedbackSchema } from '@/lib/schemas/feedback'
import { createClient } from '@/lib/supabase/server'

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req)
    const { success, limit, remaining, reset } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente mais tarde.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': new Date(reset).toUTCString(),
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          },
        }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
    }

    const parsed = feedbackSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { content, isAnonymous, name, email, honeypot } = parsed.data

    if (honeypot !== undefined && honeypot !== '') {
      return NextResponse.json({ success: true }, { status: 201 })
    }

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
      return NextResponse.json({ error: 'Erro ao salvar.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[feedback] unexpected:', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: 'Método não permitido.' }, { status: 405 })
}
