'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/logging'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('app/admin/error-boundary', 'Admin panel error', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Erro no painel administrativo
        </h2>
        <p className="text-muted-foreground mb-6">
          Ocorreu um erro no painel administrativo. Tente novamente ou volte para o início.
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
            href="/admin"
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            Voltar ao painel
          </a>
        </div>
      </div>
    </div>
  )
}
