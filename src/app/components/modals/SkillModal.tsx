import React from 'react';
import { Skill, Milestone, Resource, Project } from '@/types/pdi';
import { Modal } from './Modal';
import { SkillRating } from '../SkillRating';
import { getProficiencyLabel } from '@/app/utils/helpers';
import { Code, Heart, BookOpen, Target, Briefcase, Award, CheckCircle2, Lock } from 'lucide-react';

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  allMilestones: Milestone[];
  allResources: Resource[];
  allProjects: Project[];
  onResourceClick: (category: string, categoryResources: Resource[], selectedResourceId?: string) => void;
}

export function SkillModal({ skill, isOpen, onClose, allMilestones, allResources, allProjects, onResourceClick }: SkillModalProps) {
  if (!skill) return null;

  const relatedMilestones = allMilestones.filter(m => 
    m.relatedSkills.includes(skill.id)
  );

  const relatedResources = allResources.filter(r => 
    r.relatedSkills.includes(skill.id)
  );

  const relatedProjects = allProjects.filter(p => 
    p.relatedSkills.includes(skill.id)
  );

  const proficiencyDescriptions = {
    1: 'Conhecimento básico, ainda em aprendizado inicial',
    2: 'Consigo realizar tarefas simples com supervisão',
    3: 'Trabalho de forma independente em tarefas rotineiras',
    4: 'Domínio avançado, capaz de resolver problemas complexos',
    5: 'Especialista, referência e mentor para outros',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={skill.name}>
      <div className="p-6 space-y-6">
        {/* Type Badge */}
        <div className="flex items-center gap-3">
          {skill.type === 'hard' ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-primary-lighter text-primary rounded-full text-sm">
              <Code className="w-4 h-4" />
              <span>Hard Skill</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-info-light text-info rounded-full text-sm">
              <Heart className="w-4 h-4" />
              <span>Soft Skill</span>
            </div>
          )}
          <span className="text-sm text-muted-foreground">{skill.category}</span>
        </div>

        {/* Rating & Leveling */}
        <div className="bg-gradient-to-r from-card to-muted/40 p-4 rounded-xl border border-border/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Maestria Calculada</h3>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md font-mono">
              {(skill.requirements ? (skill.requirements.filter(r => true).length / skill.requirements.length) * 100 : 0).toFixed(0)}% Concluído
            </span>
          </div>
          
          <SkillRating 
            level={skill.level} 
            size="lg" 
            requirementsCount={skill.requirements?.length}
            unlockedCount={skill.requirements ? Math.round(((skill.level - 1) / 4) * skill.requirements.length) : 0}
          />
        </div>

        {/* Micro-Skills / Badges Grid (Design Compacto Gamificado) */}
        {skill.requirements && skill.requirements.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Award className="w-4 h-4 text-amber-500" />
                Conquistas de Dominância
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                {Math.round(((skill.level - 1) / 4) * skill.requirements.length)} / {skill.requirements.length} unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skill.requirements.map((req, idx) => {
                const unlockedCount = Math.round(((skill.level - 1) / 4) * skill.requirements!.length);
                const isUnlocked = idx < unlockedCount;

                return (
                  <div
                    key={req.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs transition-all ${
                      isUnlocked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-foreground font-medium shadow-2xs'
                        : 'bg-muted/20 border-border/40 text-muted-foreground opacity-50 hover:opacity-75'
                    }`}
                  >
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="line-clamp-2">{req.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-2">Descrição</h3>
          <p className="text-foreground">{skill.description}</p>
        </div>

        {/* Related Milestones */}
        {relatedMilestones.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Target className="w-4 h-4" />
              Marcos Relacionados
            </h3>
            <div className="space-y-2">
              {relatedMilestones.map(milestone => (
                <a
                  key={milestone.id}
                  href={`#milestone-${milestone.id}`}
                  onClick={onClose}
                  className="block p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                >
                  <div className="font-medium group-hover:text-primary transition-colors">
                    {milestone.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {milestone.progress}% completo
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Briefcase className="w-4 h-4" />
              Projetos que Utilizaram
            </h3>
            <div className="space-y-2">
              {relatedProjects.map(project => (
                <a
                  key={project.id}
                  href={`#project-${project.id}`}
                  onClick={onClose}
                  className="block p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                >
                  <div className="font-medium group-hover:text-primary transition-colors">
                    {project.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {project.impact}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <BookOpen className="w-4 h-4" />
              Recursos para Desenvolvimento
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
                    <div className="font-medium">{resource.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
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
