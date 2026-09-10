import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/client'
import { z } from 'zod'
import { withRateLimit } from '@/lib/api/middleware'
import { apiSuccess, apiError, apiValidationError } from '@/lib/api/responses'
import { logger } from '@/lib/logging'

/**
 * Schema for objective completion payload
 * Requires justification and admin password verification
 */
const objectiveUpdateSchema = z.object({
  completed: z.boolean(),
  justification: z.string().min(10, 'Justification must be at least 10 characters'),
  password: z.string().min(1, 'Password is required'),
})

/**
 * PATCH /api/milestones/[id]/objectives/[objId]
 * Update a milestone objective completion status with justification audit trail
 * 
 * Requirements: MCF-01 to MCF-04
 * Threat mitigation: T-05-03 (password verification), T-05-04 (input validation)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; objId: string }> }
) {
  return withRateLimit(req, async (req) => {
    try {
      const { id: milestoneId, objId } = await params
      
      // Parse and validate request body
      const body = await req.json().catch(() => null)
      if (!body) {
        return apiError('Payload JSON inválido', 400)
      }

      // Validate with Zod schema (T-05-04: input validation and sanitization)
      const parsed = objectiveUpdateSchema.safeParse(body)
      if (!parsed.success) {
        return apiValidationError(parsed.error)
      }

      const { completed, justification, password } = parsed.data

      // T-05-03: Enforce inline password verification against ADMIN_PASSWORD
      const adminPassword = process.env.ADMIN_PASSWORD
      if (!adminPassword) {
        logger.error('api/milestones/objectives', 'ADMIN_PASSWORD not configured')
        return apiError('Erro de configuração do servidor', 500)
      }

      if (password !== adminPassword) {
        return apiError('Senha inválida', 401)
      }

      // Fetch milestone from database
      const supabase = createPublicClient()
      const { data, error: fetchError } = await supabase
        .from('milestones')
        .select('objectives')
        .eq('id', milestoneId)
        .single()

      if (fetchError || !data) {
        logger.error('api/milestones/objectives', 'Milestone not found', fetchError)
        return apiError('Milestone não encontrado', 404)
      }

      // Parse objectives array with explicit type assertion
      type Objective = {
        text: string
        completed: boolean
        completionJustification?: string
      }
      
      const milestoneData = data as { objectives: Objective[] }
      const objectives = milestoneData.objectives || []

      // Find objective by index (objId is 0-based index)
      const objIndex = parseInt(objId, 10)
      if (isNaN(objIndex) || objIndex < 0 || objIndex >= objectives.length) {
        return apiError('ID de objetivo inválido', 400)
      }

      // Update objective with completion status and justification audit trail
      objectives[objIndex] = {
        ...objectives[objIndex],
        completed,
        completionJustification: completed ? justification : undefined,
      }

      // Update milestone in database
      const { data: updatedMilestone, error: updateError } = await supabase
        .from('milestones')
        // @ts-ignore Supabase type generation doesn't handle JSONB columns well
        .update({ objectives })
        .eq('id', milestoneId)
        .select()
        .single()

      if (updateError) {
        logger.error('api/milestones/objectives', 'Update failed', updateError)
        return apiError('Falha ao atualizar objetivo', 500, updateError.message)
      }

      return apiSuccess({
        data: updatedMilestone,
        message: 'Objetivo atualizado com sucesso',
      })
    } catch (err) {
      logger.error('api/milestones/objectives', 'Unexpected error in PATCH handler', err)
      return apiError('Erro interno', 500)
    }
  })
}
