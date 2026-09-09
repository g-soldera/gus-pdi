import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          gus.pdi
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Plano de Desenvolvimento Individual — Analytics Engineer → AI Security Specialist
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Deixar feedback
          </Link>
          
          <Link
            href="/pdi"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors font-medium"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
