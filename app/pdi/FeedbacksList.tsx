'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { MessageSquare } from 'lucide-react'

interface Feedback {
  id: string
  content: string
  is_anonymous: boolean
  name: string | null
  email: string | null
  created_at: string
}

export default function FeedbacksList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      {feedbacks.map((feedback) => (
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
    </div>
  )
}
