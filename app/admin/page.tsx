import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/app/components/ui/badge'

interface Feedback {
  id: string
  content: string
  is_anonymous: boolean
  name: string | null
  email: string | null
  created_at: string
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { page?: string; type?: string }
}) {
  const page = parseInt(searchParams.page || '1', 10)
  const type = searchParams.type || 'all'
  const pageSize = 20
  const offset = (page - 1) * pageSize

  const supabase = createClient()

  let query = supabase
    .from('feedback')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (type === 'anonymous') {
    query = query.eq('is_anonymous', true)
  } else if (type === 'identified') {
    query = query.eq('is_anonymous', false)
  }

  const { data: feedbacks, count, error } = await query

  if (error) {
    return (
      <main className="min-h-screen py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-destructive">Erro ao carregar feedbacks: {error.message}</p>
        </div>
      </main>
    )
  }

  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <main className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Feedbacks recebidos
          </h1>
          <p className="text-muted-foreground">
            Total: {count || 0} feedback{(count || 0) !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          <a
            href="/admin?type=all"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              type === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Todos
          </a>
          <a
            href="/admin?type=anonymous"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              type === 'anonymous'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Anônimos
          </a>
          <a
            href="/admin?type=identified"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              type === 'identified'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Identificados
          </a>
        </div>

        <div className="space-y-4">
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback: Feedback) => (
              <div
                key={feedback.id}
                className="bg-card border border-border rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={feedback.is_anonymous ? 'secondary' : 'default'}>
                      {feedback.is_anonymous ? 'Anônimo' : 'Identificado'}
                    </Badge>
                    {!feedback.is_anonymous && feedback.name && (
                      <span className="text-sm font-medium text-foreground">
                        {feedback.name}
                      </span>
                    )}
                    {!feedback.is_anonymous && feedback.email && (
                      <span className="text-sm text-muted-foreground">
                        ({feedback.email})
                      </span>
                    )}
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {new Date(feedback.created_at).toLocaleString('pt-BR')}
                  </time>
                </div>
                <p className="text-foreground whitespace-pre-wrap">{feedback.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum feedback encontrado
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <a
                href={`/admin?type=${type}&page=${page - 1}`}
                className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                ← Anterior
              </a>
            )}
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </span>
            {page < totalPages && (
              <a
                href={`/admin?type=${type}&page=${page + 1}`}
                className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                Próximo →
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
