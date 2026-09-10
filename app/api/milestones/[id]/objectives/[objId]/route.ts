import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/client'
import { z } from 'zod'

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
  try {
    const { id: milestoneId, objId } = await params
    
    // Parse and validate request body
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    // Validate with Zod schema (T-05-04: input validation and sanitization)
    const parsed = objectiveUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { completed, justification, password } = parsed.data

    // T-05-03: Enforce inline password verification against ADMIN_PASSWORD
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('[PATCH /api/milestones/objectives] ADMIN_PASSWORD not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Fetch milestone from database
    const supabase = createPublicClient()
    const { data, error: fetchError } = await supabase
      .from('milestones')
      .select('objectives')
      .eq('id', milestoneId)
      .single()

    if (fetchError || !data) {
      console.error('[PATCH /api/milestones/objectives] Milestone not found:', fetchError)
      return NextResponse.json(
        { error: 'Milestone not found' },
        { status: 404 }
      )
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
      return NextResponse.json(
        { error: 'Invalid objective ID' },
        { status: 400 }
      )
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
      console.error('[PATCH /api/milestones/objectives] Update failed:', updateError)
      return NextResponse.json(
        { error: 'Failed to update objective', details: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: updatedMilestone,
      message: 'Objective updated successfully',
    })
  } catch (err) {
    console.error('[PATCH /api/milestones/objectives] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
