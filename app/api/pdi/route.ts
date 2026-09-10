import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/client'
import { pdiCreateSchema } from '@/lib/schemas/crud'
import { withRateLimit } from '@/lib/api/middleware'
import { apiSuccess, apiError, apiValidationError } from '@/lib/api/responses'

/**
 * GET /api/pdi - Fetch all PDI entities by table name
 * Query params: ?table=skills|milestones|projects|resources|personal_info
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const table = searchParams.get('table')

    if (!table) {
      return apiError('Parâmetro obrigatório ausente: table', 400)
    }

    // Validate table name to prevent injection
    const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
    if (!validTables.includes(table)) {
      return apiError(`Tabela inválida. Deve ser: ${validTables.join(', ')}`, 400)
    }

    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from(table as any)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(`[GET /api/pdi] Supabase error for table ${table}:`, error)
      return apiError('Falha na consulta ao banco', 500, error.message)
    }

    return apiSuccess({ data, count: data?.length || 0 })
  } catch (err) {
    console.error('[GET /api/pdi] Unexpected error:', err)
    return apiError('Erro interno', 500)
  }
}

/**
 * POST /api/pdi - Create a new PDI entity
 * Body: { table: string, data: object }
 * Rate limited: 5 requests per hour (T-CRUD-02)
 */
export async function POST(req: NextRequest) {
  return withRateLimit(req, async (req) => {
    try {
      // Parse and validate request body
      const body = await req.json().catch(() => null)
      if (!body || !body.table || !body.data) {
        return apiError('Payload inválido. Esperado: { table: string, data: object }', 400)
      }

      const { table, data } = body

      // Validate table name
      const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
      if (!validTables.includes(table)) {
        return apiError(`Tabela inválida. Deve ser: ${validTables.join(', ')}`, 400)
      }

      // Validate data with Zod schema (T-CRUD-01: Validate all incoming payloads with pdiCreateSchema)
      const parsed = pdiCreateSchema.safeParse(data)
      if (!parsed.success) {
        return apiValidationError(parsed.error)
      }

      // Insert into Supabase
      const supabase = createPublicClient()
      
      // Dynamic table access with type assertion for flexible CRUD
      const query = supabase.from(table as any) as any
      const { data: insertedData, error } = await query
        .insert(parsed.data)
        .select()
        .single()

      if (error) {
        console.error(`[POST /api/pdi] Supabase insert error for table ${table}:`, error)
        return apiError('Falha ao criar entidade', 500, error.message)
      }

      return apiSuccess({ data: insertedData, message: 'Entidade criada com sucesso' }, 201)
    } catch (err) {
      console.error('[POST /api/pdi] Unexpected error:', err)
      return apiError('Erro interno', 500)
    }
  })
}
