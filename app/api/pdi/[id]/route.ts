import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/client'
import { pdiUpdateSchema } from '@/lib/schemas/crud'
import { ratelimit } from '@/lib/ratelimit'

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
      return NextResponse.json(
        { error: 'Missing required query parameter: table' },
        { status: 400 }
      )
    }

    // Validate table name
    const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
    if (!validTables.includes(table)) {
      return NextResponse.json(
        { error: 'Invalid table name. Must be one of: skills, milestones, projects, resources, personal_info' },
        { status: 400 }
      )
    }

    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from(table as any)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Entity not found' },
          { status: 404 }
        )
      }
      console.error(`[GET /api/pdi/${id}] Supabase error for table ${table}:`, error)
      return NextResponse.json(
        { error: 'Database query failed', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (err) {
    const { id } = await params
    console.error(`[GET /api/pdi/${id}] Unexpected error:`, err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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
  try {
    // Apply rate limiting (T-CRUD-02: Apply rate limiting using lib/ratelimit.ts on write operations)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous'
    const { success, remaining, limit, reset } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          limit,
          remaining,
          reset: new Date(reset).toISOString(),
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await req.json().catch(() => null)
    if (!body || !body.table || !body.data) {
      return NextResponse.json(
        { error: 'Invalid payload. Expected { table: string, data: object }' },
        { status: 400 }
      )
    }

    const { table, data } = body
    const { id } = await params

    // Validate table name
    const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
    if (!validTables.includes(table)) {
      return NextResponse.json(
        { error: 'Invalid table name. Must be one of: skills, milestones, projects, resources, personal_info' },
        { status: 400 }
      )
    }

    // Validate data with Zod schema (T-CRUD-01: Validate all incoming payloads with pdiUpdateSchema)
    const parsed = pdiUpdateSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
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
        return NextResponse.json(
          { error: 'Entity not found' },
          { status: 404 }
        )
      }
      console.error(`[PUT /api/pdi/${id}] Supabase update error for table ${table}:`, error)
      return NextResponse.json(
        { error: 'Failed to update entity', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { data: updatedData, message: 'Entity updated successfully' }
    )
  } catch (err) {
    const { id } = await params
    console.error(`[PUT /api/pdi/${id}] Unexpected error:`, err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
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
  try {
    // Apply rate limiting (T-CRUD-02: Apply rate limiting using lib/ratelimit.ts on write operations)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous'
    const { success, remaining, limit, reset } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          limit,
          remaining,
          reset: new Date(reset).toISOString(),
        },
        { status: 429 }
      )
    }

    const { searchParams } = new URL(req.url)
    const table = searchParams.get('table')
    const { id } = await params

    if (!table) {
      return NextResponse.json(
        { error: 'Missing required query parameter: table' },
        { status: 400 }
      )
    }

    // Validate table name
    const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
    if (!validTables.includes(table)) {
      return NextResponse.json(
        { error: 'Invalid table name. Must be one of: skills, milestones, projects, resources, personal_info' },
        { status: 400 }
      )
    }

    // Delete from Supabase
    const supabase = createPublicClient()
    const { error } = await supabase
      .from(table as any)
      .delete()
      .eq('id', id)

    if (error) {
      console.error(`[DELETE /api/pdi/${id}] Supabase delete error for table ${table}:`, error)
      return NextResponse.json(
        { error: 'Failed to delete entity', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Entity deleted successfully' }
    )
  } catch (err) {
    const { id } = await params
    console.error(`[DELETE /api/pdi/${id}] Unexpected error:`, err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
