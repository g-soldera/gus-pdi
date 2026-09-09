'use client'

import { useState } from 'react'
import { X, Award } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'

interface Skill {
  id: string
  name: string
  level: number
  description: string
  category: string
  requirements?: Array<{ id: string; text: string }>
}

interface PortfolioSkillCardProps {
  skill: Skill
  onBack: () => void
}

export default function PortfolioSkillCard({ skill, onBack }: PortfolioSkillCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold">{skill.name}</h2>
            <p className="text-muted-foreground mt-1">{skill.category}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Level Indicator */}
          <div className="flex items-center justify-between bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div>
              <p className="text-sm text-muted-foreground">Nível atual</p>
              <p className="text-2xl font-bold text-primary">
                {skill.level.toFixed(1)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Capacidade</p>
              <p className="text-lg font-medium">
                {skill.level < 2 ? 'Iniciante' : skill.level < 3 ? 'Básico' : skill.level < 4 ? 'Intermediário' : skill.level < 5 ? 'Avançado' : 'Especialista'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Requirements/Micro-skills */}
          {skill.requirements && skill.requirements.length > 0 && (
            <div>
              <div 
                className="flex items-center justify-between mb-3 cursor-pointer hover:text-primary transition-colors"
                onClick={() => setExpanded(!expanded)}
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Micro-skills ({skill.requirements.length})
                </h3>
                <span className="text-sm text-muted-foreground">
                  {expanded ? 'Ocultar' : 'Expandir'}
                </span>
              </div>

              <div className={`space-y-2 ${expanded ? 'max-h-[50vh]' : 'max-h-[200px]'}`}>
                {skill.requirements.map((req, index) => (
                  <div 
                    key={req.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <p className="text-sm flex-1">{req.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20 flex justify-end">
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  )
}
