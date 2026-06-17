import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, Zap, AlertCircle, Brain, Rocket } from 'lucide-react';
import { Skill, Project, Milestone } from '@/types/pdi';

interface ProfileAnalysisProps {
  skills: Skill[];
  projects: Project[];
  milestones: Milestone[];
}

export function ProfileAnalysis({ skills, projects, milestones }: ProfileAnalysisProps) {
  // Cálculo de Strengths (Categorias com média > 4)
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = { sum: 0, count: 0 };
    acc[skill.category].sum += skill.level;
    acc[skill.category].count += 1;
    return acc;
  }, {} as Record<string, { sum: number; count: number }>);

  const strengths = Object.entries(categories)
    .map(([name, data]) => ({ name, avg: data.sum / data.count }))
    .filter(cat => cat.avg >= 4)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 3);

  // Afinidades (Cruzamento de Projetos Concluídos e Skills de Nível 5)
  const topSkills = skills.filter(s => s.level === 5).map(s => s.name);
  const completedProjects = projects.filter(p => p.status === 'completed');

  const affinities = [
    {
      title: 'Data Visualization & Design',
      description: 'Alta afinidade em transformar dados brutos em insights executivos com padrão visual Itaú.',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'IA Generativa & Agentes',
      description: 'Domínio em orquestração de LLMs e automação de processos complexos com foco em produtividade.',
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Engenharia de Analytics',
      description: 'Sólida base em SQL e Python para construção de pipelines resilientes e democratização de dados.',
      icon: Rocket,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ];

  // Gaps de Evolução (Skills de nível < 4 em categorias críticas para Sênior/Pleno)
  const gaps = skills
    .filter(s => s.level < 4 && ['Cloud & Data', 'DevOps', 'APIs', 'Governança de Dados'].includes(s.category))
    .sort((a, b) => a.level - b.level)
    .slice(0, 4);

  return (
    <div className="space-y-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna 1: Pontos Fortes & Afinidades */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-bold">Principais Afinidades</h3>
            </div>
            <div className="space-y-4">
              {affinities.map((affinity, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className={`p-3 rounded-lg shrink-0 ${affinity.bgColor}`}>
                    <affinity.icon className={`w-5 h-5 ${affinity.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{affinity.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{affinity.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Domínios de Especialidade</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengths.map((s, i) => (
                <div key={i} className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">{s.name}</span>
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">{s.avg.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna 2: Gap Analysis & Plano de Ação */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <h3 className="text-xl font-bold">Oportunidades de Evolução (Gaps)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Identificadas com base no objetivo de **Sênior/Tech Lead**, focando em autonomia técnica e infraestrutura.
            </p>
            <div className="space-y-4">
              {gaps.map((gap, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{gap.name}</span>
                    <span className="text-xs text-muted-foreground">Nível Atual: {gap.level}/5</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(gap.level / 5) * 100}%` }}
                      className="h-full bg-orange-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-orange-700 dark:text-orange-400">
                <Target className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Plano de Ação Imediato</span>
              </div>
              <ul className="text-xs space-y-2 text-orange-800 dark:text-orange-300/80">
                <li>• Aprofundar em **Kubernetes & ECS** para suporte a arquiteturas de larga escala.</li>
                <li>• Elevar nível de **Arquitetura de APIs** visando governança de contratos.</li>
                <li>• Consolidar práticas de **MLOps** no projeto User Behavior.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
