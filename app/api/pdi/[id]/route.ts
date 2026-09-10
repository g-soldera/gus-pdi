import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/client'
import { pdiUpdateSchema } from '@/lib/schemas/crud'
import { withRateLimit } from '@/lib/api/middleware'
import { apiSuccess, apiError, apiValidationError } from '@/lib/api/responses'
import { logger } from '@/lib/logging'

/**
 * GET /api/pdi/[id] - Fetch a single PDI entity by ID
 * Query params: ?table=skills|milestones|projects|resources|personal_info
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(req.url)
    const table = searchParams.get('table')
    const { id } = await params

    if (!table) {
      return apiError('Parâmetro obrigatório ausente: table', 400)
    }

    // Validate table name
    const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
    if (!validTables.includes(table)) {
      return apiError(`Tabela inválida. Deve ser: ${validTables.join(', ')}`, 400)
    }

    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from(table as any)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return apiError('Entidade não encontrada', 404)
      }
      logger.error('api/pdi/[id]', `Supabase query failed for table: ${table}`, error)
      return apiError('Falha na consulta ao banco', 500, error.message)
    }

    return apiSuccess({ data })
  } catch (err) {
    logger.error('api/pdi/[id]', 'Unexpected error in GET handler', err)
    return apiError('Erro interno', 500)
  }
}

/**
 * PUT /api/pdi/[id] - Update a PDI entity
 * Body: { table: string, data: object }
 * Rate limited: 5 requests per hour (T-CRUD-02)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withRateLimit(req, async (req) => {
    try {
      // Parse and validate request body
      const body = await req.json().catch(() => null)
      if (!body || !body.table || !body.data) {
        return apiError('Payload inválido. Esperado: { table: string, data: object }', 400)
      }

      const { table, data } = body
      const { id } = await params

      // Validate table name
      const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
      if (!validTables.includes(table)) {
        return apiError(`Tabela inválida. Deve ser: ${validTables.join(', ')}`, 400)
      }

      // Validate data with Zod schema (T-CRUD-01: Validate all incoming payloads with pdiUpdateSchema)
      const parsed = pdiUpdateSchema.safeParse(data)
      if (!parsed.success) {
        return apiValidationError(parsed.error)
      }

      // Update in Supabase
      const supabase = createPublicClient()
      
      // Dynamic table access with type assertion for flexible CRUD
      const query = supabase.from(table as any) as any
      const { data: updatedData, error } = await query
        .update(parsed.data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return apiError('Entidade não encontrada', 404)
        }
        logger.error('api/pdi/[id]', `Supabase update failed for table: ${table}`, error)
        return apiError('Falha ao atualizar entidade', 500, error.message)
      }

      return apiSuccess({ data: updatedData, message: 'Entidade atualizada com sucesso' })
    } catch (err) {
      logger.error('api/pdi/[id]', 'Unexpected error in PUT handler', err)
      return apiError('Erro interno', 500)
    }
  })
}

/**
 * DELETE /api/pdi/[id] - Delete a PDI entity
 * Query params: ?table=skills|milestones|projects|resources|personal_info
 * Rate limited: 5 requests per hour (T-CRUD-02)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withRateLimit(req, async (req) => {
    try {
      const { searchParams } = new URL(req.url)
      const table = searchParams.get('table')
      const { id } = await params

      if (!table) {
        return apiError('Parâmetro obrigatório ausente: table', 400)
      }

      // Validate table name
      const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
      if (!validTables.includes(table)) {
        return apiError(`Tabela inválida. Deve ser: ${validTables.join(', ')}`, 400)
      }

      // Delete from Supabase
      const supabase = createPublicClient()
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id)

      if (error) {
        logger.error('api/pdi/[id]', `Supabase delete failed for table: ${table}`, error)
        return apiError('Falha ao deletar entidade', 500, error.message)
      }

      return apiSuccess({ message: 'Entidade deletada com sucesso' })
    } catch (err) {
      logger.error('api/pdi/[id]', 'Unexpected error in DELETE handler', err)
      return apiError('Erro interno', 500)
    }
  })
}
