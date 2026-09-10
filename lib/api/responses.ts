import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Retorna uma resposta de sucesso padronizada com dados e status HTTP.
 * 
 * @param data - Dados a serem retornados na resposta
 * @param status - Código de status HTTP (padrão: 200)
 * @returns NextResponse com dados JSON
 * 
 * @example
 * return apiSuccess({ id: 1, name: 'Skill' }, 201)
 */
export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

/**
 * Retorna uma resposta de erro padronizada com mensagem e detalhes opcionais.
 * 
 * @param message - Mensagem de erro em português para o usuário
 * @param status - Código de status HTTP (padrão: 500)
 * @param details - Detalhes técnicos do erro (não exposto em produção se for Error object)
 * @returns NextResponse com erro JSON
 * 
 * @example
 * return apiError('Erro ao salvar feedback', 500, dbError)
 */
export function apiError(message: string, status = 500, details?: unknown): NextResponse {
  const errorResponse: { error: string; details?: unknown } = { error: message }
  
  // Only include details if provided
  if (details !== undefined) {
    // If details is an Error object, only include message in production
    if (details instanceof Error && process.env.NODE_ENV === 'production') {
      errorResponse.details = details.message
    } else {
      errorResponse.details = details
    }
  }
  
  return NextResponse.json(errorResponse, { status })
}

/**
 * Retorna uma resposta de erro de validação formatada a partir de um ZodError.
 * 
 * @param zodError - Erro de validação do Zod
 * @returns NextResponse com detalhes de validação JSON (status 400)
 * 
 * @example
 * const parsed = schema.safeParse(data)
 * if (!parsed.success) return apiValidationError(parsed.error)
 */
export function apiValidationError(zodError: ZodError): NextResponse {
  return NextResponse.json(
    {
      error: 'Validação falhou',
      details: zodError.flatten().fieldErrors,
    },
    { status: 400 }
  )
}

/**
 * Retorna uma resposta de erro de rate limit com headers apropriados.
 * 
 * @param limit - Limite máximo de requisições
 * @param remaining - Requisições restantes
 * @param reset - Timestamp (ms) quando o limite reseta
 * @returns NextResponse com erro 429 e headers de rate limit
 * 
 * @example
 * if (!success) return apiRateLimitError(limit, remaining, reset)
 */
export function apiRateLimitError(limit: number, remaining: number, reset: number): NextResponse {
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

/**
 * Retorna uma resposta 404 para recurso não encontrado.
 * 
 * @param resource - Nome do recurso não encontrado
 * @returns NextResponse com erro 404
 * 
 * @example
 * return apiNotFound('Milestone')
 */
export function apiNotFound(resource: string): NextResponse {
  return NextResponse.json(
    { error: `Recurso não encontrado: ${resource}` },
    { status: 404 }
  )
}
