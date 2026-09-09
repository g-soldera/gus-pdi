import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/client'
import { pdiCreateSchema } from '@/lib/schemas/crud'
import { ratelimit } from '@/lib/ratelimit'

/**
 * GET /api/pdi - Fetch all PDI entities by table name
 * Query params: ?table=skills|milestones|projects|resources|personal_info
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const table = searchParams.get('table')

    if (!table) {
      return NextResponse.json(
        { error: 'Missing required query parameter: table' },
        { status: 400 }
      )
    }

    // Validate table name to prevent injection
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
      .order('created_at', { ascending: false })

    if (error) {
      console.error(`[GET /api/pdi] Supabase error for table ${table}:`, error)
      return NextResponse.json(
        { error: 'Database query failed', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data, count: data?.length || 0 })
  } catch (err) {
    console.error('[GET /api/pdi] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/pdi - Create a new PDI entity
 * Body: { table: string, data: object }
 * Rate limited: 5 requests per hour (T-CRUD-02)
 */
export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting (T-CRUD-02: Apply rate limiting using lib/ratelimit.ts on write operations)
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'anonymous'
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

    // Validate table name
    const validTables = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
    if (!validTables.includes(table)) {
      return NextResponse.json(
        { error: 'Invalid table name. Must be one of: skills, milestones, projects, resources, personal_info' },
        { status: 400 }
      )
    }

    // Validate data with Zod schema (T-CRUD-01: Validate all incoming payloads with pdiCreateSchema)
    const parsed = pdiCreateSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const supabase = createPublicClient()
    const { data: insertedData, error } = await supabase
      .from(table as any)
      .insert(parsed.data)
      .select()
      .single()

    if (error) {
      console.error(`[POST /api/pdi] Supabase insert error for table ${table}:`, error)
      return NextResponse.json(
        { error: 'Failed to create entity', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { data: insertedData, message: 'Entity created successfully' },
      { status: 201 }
    )
  } catch (err) {
    console.error('[POST /api/pdi] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
