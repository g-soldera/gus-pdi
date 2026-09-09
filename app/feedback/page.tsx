import FeedbackForm from './FeedbackForm'

export default function FeedbackPage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Feedback
          </h1>
          <p className="text-muted-foreground">
            Compartilhe suas impressões, sugestões ou críticas sobre mim
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <FeedbackForm />
        </div>
      </div>
    </main>
  )
}
