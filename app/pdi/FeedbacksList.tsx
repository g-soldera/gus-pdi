'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'

interface Feedback {
  id: string
  content: string
  is_anonymous: boolean
  name: string | null
  email: string | null
  created_at: string
}

const ITEMS_PER_PAGE = 5

export default function FeedbacksList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/admin/feedbacks')
        if (!res.ok) {
          setError('Não foi possível carregar os feedbacks')
          return
        }
        const data = await res.json()
        setFeedbacks(data)
      } catch (err) {
        setError('Erro ao buscar feedbacks')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  const totalPages = Math.ceil(feedbacks.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentFeedbacks = feedbacks.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Carregando feedbacks...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MessageSquare className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">Nenhum feedback recebido ainda</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {currentFeedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Badge variant={feedback.is_anonymous ? 'secondary' : 'default'}>
                {feedback.is_anonymous ? 'Anônimo' : 'Identificado'}
              </Badge>
              {!feedback.is_anonymous && feedback.name && (
                <span className="font-medium text-foreground">{feedback.name}</span>
              )}
              {!feedback.is_anonymous && feedback.email && (
                <span className="text-sm text-muted-foreground">
                  ({feedback.email})
                </span>
              )}
            </div>
            <time className="text-xs text-muted-foreground">
              {new Date(feedback.created_at).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </div>
          <p className="text-foreground whitespace-pre-wrap leading-relaxed">
            {feedback.content}
          </p>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próxima
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
