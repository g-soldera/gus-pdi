import React from 'react';
import { motion } from 'motion/react';
import { Award, Book, Briefcase, Code } from 'lucide-react';
import { Milestone, Skill, Project, Resource } from '@/types/pdi';

interface StatsProps {
  milestones: Milestone[];
  skills: Skill[];
  projects: Project[];
  resources: Resource[];
}

export function Stats({ milestones, skills, projects, resources }: StatsProps) {
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = milestones.length;
  const hardSkills = skills.filter(s => s.type === 'hard').length;
  const softSkills = skills.filter(s => s.type === 'soft').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const activeResources = resources.length;
  const completedResources = resources.filter(r => r.status === 'completed').length;
  const averageSkillLevel = skills.length
    ? skills.reduce((sum, skill) => sum + (skill.level || 0), 0) / skills.length
    : 0;

  const toPercent = (completed: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  const milestoneProgress = toPercent(completedMilestones, totalMilestones);
  const projectProgress = toPercent(completedProjects, projects.length);
  const resourceProgress = toPercent(completedResources, activeResources);
  const skillProgress = Math.round((averageSkillLevel / 5) * 100);

  const stats = [
    {
      icon: Award,
      label: 'Marcos',
      value: `${milestoneProgress}%`,
      description: `${completedMilestones} de ${totalMilestones} marcos concluídos`,
      color: 'text-[var(--completed)]',
      bgColor: 'bg-success-light',
      href: '#milestones',
      progress: milestoneProgress,
    },
    {
      icon: Code,
      label: 'Skills',
      value: `${skillProgress}%`,
      description: `Média de domínio: ${averageSkillLevel.toFixed(1)}/5`,
      color: 'text-primary',
      bgColor: 'bg-primary-lighter',
      href: '#skills',
      progress: skillProgress,
    },
    {
      icon: Briefcase,
      label: 'Projetos',
      value: `${projectProgress}%`,
      description: `${completedProjects} de ${projects.length} projetos concluídos`,
      color: 'text-[var(--info)]',
      bgColor: 'bg-info-light',
      href: '#portfolio',
      progress: projectProgress,
    },
    {
      icon: Book,
      label: 'Aprendizado',
      value: `${resourceProgress}%`,
      description: `${completedResources} de ${activeResources} recursos concluídos`,
      color: 'text-[var(--warning)]',
      bgColor: 'bg-warning-light',
      href: '#resources',
      progress: resourceProgress,
    },
  ];

  return (
    <section id="stats" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">Panorama do PDI</h2>
          <p className="text-muted-foreground">Acompanhe meu progresso em tempo real</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.a
              key={stat.label}
              href={stat.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>

                <div className="mb-2">
                  <div className="text-4xl mb-1 text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>

                {typeof stat.progress === 'number' && (
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Progresso</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
