import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/app/contexts/ThemeContext'
import '@/styles/index.css'

export const metadata: Metadata = {
  title: 'PDI | Gustavo Soldera',
  description: 'Plano de Desenvolvimento Individual - Gustavo Soldera',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/img/certification-favicon.svg" />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
