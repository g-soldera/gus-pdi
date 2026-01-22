import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink, Zap } from 'lucide-react';
import { Project, Skill, Milestone } from '@/types/pdi';
import { StatusBadge } from './StatusBadge';

interface PortfolioProps {
  projects: Project[];
  skills: Skill[];
  milestones: Milestone[];
  onProjectClick: (project: Project) => void;
  onSkillClick: (skill: Skill) => void;
  onMilestoneClick: (milestone: Milestone) => void;
}

export function Portfolio({ projects, skills, milestones, onProjectClick, onSkillClick, onMilestoneClick }: PortfolioProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  // Handle deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('project-')) {
      const projectId = hash.replace('project-', '');
      setExpandedProjects(prev => new Set(prev).add(projectId));
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, []);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const next = new Set<string>();
      if (!prev.has(projectId)) {
        next.add(projectId);
      }
      return next;
    });
  };

  return (
    <section id="portfolio" className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">Portfolio de Projetos</h2>
          <p className="text-muted-foreground">
            Principais entregas e impacto técnico-estratégico
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.has(project.id);

            return (
              <motion.div
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="self-start"
              >
                <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-visible min-h-[320px] flex flex-col">
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl mb-2">{project.title}</h3>
                        <StatusBadge status={project.status} />
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent transition-colors ${project.urlTooltip ? 'tooltip' : ''}`}
                          aria-label="Visitar projeto"
                          title={project.urlTooltip}
                        >
                          <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>

                      {/* Impact Badge */}
                      {project.impact && (
                        <div className="flex items-start gap-2 p-3 bg-success-light rounded-lg">
                          <Zap className="w-4 h-4 text-[var(--completed)] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-[var(--completed)]">
                            <span className="font-medium">Impacto:</span> {project.impact}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => toggleProject(project.id)}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors w-full justify-center py-2 mt-auto"
                    >
                      <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-border"
                      >
                        <div className="p-6 bg-muted/30 space-y-4">
                          {project.relatedSkills.length > 0 && (
                            <div>
                              <h4 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                Skills Aplicadas
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {project.relatedSkills.map(skillId => {
                                  const skill = skills.find(s => s.id === skillId);
                                  return (
                                    <button
                                      key={skillId}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (skill) onSkillClick(skill);
                                      }}
                                      className="p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group border border-transparent hover:border-primary text-left"
                                    >
                                      <div className="text-sm font-medium group-hover:text-primary transition-colors">
                                        {skill?.name || skillId}
                                      </div>
                                      {skill && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                          {skill.category}
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {project.relatedMilestones.length > 0 && (
                            <div>
                              <h4 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                Marcos Relacionados
                              </h4>
                              <div className="space-y-2">
                                {project.relatedMilestones.map(milestoneId => {
                                  const milestone = milestones.find(m => m.id === milestoneId);
                                  return (
                                    <button
                                      key={milestoneId}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (milestone) onMilestoneClick(milestone);
                                      }}
                                      className="w-full text-left p-3 bg-muted/50 rounded-lg hover:border-primary hover:ring-2 hover:ring-primary/40 border border-transparent transition-all"
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <div className="font-medium">
                                          {milestone?.displayName || milestone?.title || milestoneId}
                                        </div>
                                        {milestone && <StatusBadge status={milestone.status} />}
                                      </div>
                                      {milestone && (
                                        <div className="text-sm text-muted-foreground">
                                          {milestone.progress}% completo
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
