import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: feedbacks, error } = await supabase
      .from('feedback')
      .select('id, content, is_anonymous, name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('[feedbacks] db error:', error.message)
      return NextResponse.json({ error: 'Erro ao buscar feedbacks.' }, { status: 500 })
    }

    return NextResponse.json(feedbacks)
  } catch (err) {
    console.error('[feedbacks] unexpected:', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
