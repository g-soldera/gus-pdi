import React from 'react';
import { Milestone, Skill, Resource } from '@/types/pdi';
import { Modal } from './Modal';
import { StatusBadge } from '../StatusBadge';
import { ProgressBar } from '../ProgressBar';
import { calculateDaysRemaining, formatDate } from '@/app/utils/helpers';
import { Calendar, Clock, Target, BookOpen, Code, FileText, CheckSquare, Square } from 'lucide-react';

interface MilestoneModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
  allSkills: Skill[];
  allResources: Resource[];
  onSkillClick: (skill: Skill) => void;
  onResourceClick: (category: string, categoryResources: Resource[], selectedResourceId?: string) => void;
}

export function MilestoneModal({ 
  milestone, 
  isOpen, 
  onClose, 
  allSkills, 
  allResources,
  onSkillClick,
  onResourceClick,
}: MilestoneModalProps) {
  if (!milestone) return null;

  const daysRemaining = calculateDaysRemaining(milestone.deadline);
  const relatedSkills = allSkills.filter(s => 
    milestone.relatedSkills.includes(s.id)
  );
  const relatedResources = allResources.filter(r => 
    milestone.relatedResources.includes(r.id)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={milestone.title}>
      <div className="p-6 space-y-6">
        {/* Status and Progress */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={milestone.status} />
            {milestone.status !== 'completed' && daysRemaining > 0 && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {daysRemaining} dias restantes
              </span>
            )}
          </div>
          <ProgressBar progress={milestone.progress} showLabel />
        </div>

        {/* Description */}
        <div>
          <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <FileText className="w-4 h-4" />
            Descrição
          </h3>
          <p className="text-foreground">{milestone.description}</p>
        </div>

        {/* Objectives Checklist */}
        {milestone.objectives && milestone.objectives.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckSquare className="w-4 h-4" />
              Objetivos de Evolução
            </h3>
            <div className="space-y-3">
              {milestone.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                  {obj.completed ? (
                    <CheckSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <span className={obj.completed ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    {obj.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deadline */}
        <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-muted-foreground">Prazo</div>
            <div className="font-medium">{formatDate(milestone.deadline)}</div>
          </div>
        </div>

        {/* Notes (if completed) */}
        {milestone.notes && (
          <div className="p-4 bg-success-light/50 border border-[var(--completed)] rounded-lg">
            <h3 className="flex items-center gap-2 text-sm font-medium text-[var(--completed)] mb-2">
              <Target className="w-4 h-4" />
              Reflexão pós-conclusão
            </h3>
            <p className="text-sm text-foreground">{milestone.notes}</p>
          </div>
        )}

        {/* Related Skills */}
        {relatedSkills.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Code className="w-4 h-4" />
              Habilidades Relacionadas
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {relatedSkills.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => onSkillClick(skill)}
                  className="p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group border border-transparent hover:border-primary"
                >
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {skill.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <BookOpen className="w-4 h-4" />
              Recursos Utilizados
            </h3>
            <div className="space-y-2">
              {relatedResources.map(resource => {
                const parent = resource.parentCategory || resource.category;
                const categoryResources = allResources.filter(r => (r.parentCategory || r.category) === parent);
                return (
                  <button
                    key={resource.id}
                    onClick={() => onResourceClick(parent, categoryResources, resource.id)}
                    className="w-full text-left p-3 bg-muted/50 rounded-lg hover:border-primary hover:ring-2 hover:ring-primary/40 border border-transparent transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{resource.name}</div>
                      <StatusBadge status={resource.status} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {resource.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
