'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Switch } from '@/app/components/ui/switch'

export default function FeedbackForm() {
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const charCount = content.length
  const canSubmit = charCount >= 10 && charCount <= 2000 && !isLoading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          isAnonymous,
          name: isAnonymous ? null : name,
          email: isAnonymous ? null : email,
          honeypot,
        }),
      })

      const data = await res.json()

      if (res.status === 429) {
        toast.error(data.error || 'Muitas tentativas. Aguarde antes de enviar novamente.')
        return
      }

      if (!res.ok) {
        toast.error(data.error || 'Erro ao enviar feedback.')
        return
      }

      toast.success('Feedback enviado com sucesso!')
      setContent('')
      setName('')
      setEmail('')
    } catch (err) {
      toast.error('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="content">Seu feedback</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Compartilhe suas impressões, sugestões ou críticas..."
          className="min-h-[150px] resize-none"
          required
        />
        <p className="text-xs text-muted-foreground text-right">
          {charCount}/2000 caracteres
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />
        <Label htmlFor="anonymous" className="cursor-pointer">
          Enviar anonimamente
        </Label>
      </div>

      {!isAnonymous && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required={!isAnonymous}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (opcional)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
        </div>
      )}

      <input
        type="text"
        name="honeypot"
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: 'none' }}
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <Button
        type="submit"
        disabled={!canSubmit}
        className="w-full"
      >
        {isLoading ? 'Enviando...' : 'Enviar feedback'}
      </Button>

      <p className="text-xs text-muted-foreground">
        Ao enviar feedback identificado, seus dados (nome e email) serão armazenados apenas para eventual resposta. 
        Não compartilhamos suas informações com terceiros.
      </p>
    </form>
  )
}
