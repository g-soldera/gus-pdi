import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { apiError, apiValidationError } from './responses'

/**
 * Resultado discriminado da validação de requisição.
 * - success: true → validação passou, use result.data
 * - success: false → validação falhou, retorne result.response
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; response: NextResponse }

/**
 * Valida o corpo de uma requisição contra um schema Zod.
 * 
 * @param req - NextRequest contendo o corpo JSON
 * @param schema - Schema Zod para validação
 * @returns ValidationResult discriminado
 * 
 * @example
 * const result = await validateRequest(req, feedbackSchema)
 * if (!result.success) return result.response
 * const { data } = result
 * // ... use validated data
 */
export async function validateRequest<T>(
  req: NextRequest,
  schema: z.ZodSchema<T>
): Promise<ValidationResult<T>> {
  // Parse JSON body, catching parsing errors
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return {
      success: false,
      response: apiError('Payload inválido', 400),
    }
  }

  // Check for null/undefined body
  if (body === null || body === undefined) {
    return {
      success: false,
      response: apiError('Payload inválido', 400),
    }
  }

  // Validate with Zod schema
  const parsed = schema.safeParse(body)
  
  if (!parsed.success) {
    return {
      success: false,
      response: apiValidationError(parsed.error),
    }
  }

  return {
    success: true,
    data: parsed.data,
  }
}
