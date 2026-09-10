import { NextRequest, NextResponse } from 'next/server'
import { ratelimit } from '@/lib/ratelimit'
import { apiRateLimitError } from './responses'

/**
 * Extrai o endereço IP do cliente da requisição.
 * 
 * @param req - NextRequest
 * @returns Endereço IP ou '127.0.0.1' como fallback
 * 
 * @example
 * const ip = getIP(req)
 * const { success } = await ratelimit.limit(ip)
 */
export function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

/**
 * Middleware de rate limiting que envolve um handler de rota.
 * Verifica o limite de requisições antes de executar o handler.
 * 
 * @param req - NextRequest
 * @param handler - Função handler da rota
 * @returns NextResponse do handler ou erro 429 se limite excedido
 * 
 * @example
 * export async function POST(req: NextRequest) {
 *   return withRateLimit(req, async (req) => {
 *     // ... implementation
 *   })
 * }
 */
export async function withRateLimit(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const ip = getIP(req)
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)

  if (!success) {
    return apiRateLimitError(limit, remaining, reset)
  }

  return handler(req)
}
