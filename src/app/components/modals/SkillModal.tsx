import React from 'react';
import { Skill, Milestone, Resource, Project } from '@/types/pdi';
import { Modal } from './Modal';
import { SkillRating } from '../SkillRating';
import { getProficiencyLabel } from '@/app/utils/helpers';
import { Code, Heart, BookOpen, Target, Briefcase } from 'lucide-react';

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

        {/* Rating */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-2">Nível de Proficiência</h3>
          <div className="flex items-center gap-4 mb-3">
            <SkillRating level={skill.level} size="lg" />
            <span className="text-lg font-medium">{getProficiencyLabel(skill.level)}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {proficiencyDescriptions[skill.level]}
          </p>
        </div>

        {/* Proficiency Scale */}
        <div className="bg-muted/50 rounded-xl p-4">
          <h3 className="text-sm font-medium mb-3">Régua de Proficiência</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  level === skill.level ? 'bg-primary/10 border border-primary' : ''
                }`}
              >
                <SkillRating level={level as 1 | 2 | 3 | 4 | 5} size="sm" />
                <span className={`text-sm ${
                  level === skill.level ? 'font-medium text-primary' : 'text-muted-foreground'
                }`}>
                  {getProficiencyLabel(level as 1 | 2 | 3 | 4 | 5)}
                </span>
              </div>
            ))}
          </div>
        </div>

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
