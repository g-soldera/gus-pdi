'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/logging'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to structured logger
    logger.error('app/error-boundary', 'React error boundary caught error', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Algo deu errado
        </h2>
        <p className="text-muted-foreground mb-6">
          Ocorreu um erro inesperado. Tente novamente ou recarregue a página.
        </p>
        {error.digest && (
          <p className="text-sm text-muted-foreground mb-6">
            Código de erro: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  )
}
