import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, Zap, AlertCircle, Brain, Rocket, CheckCircle, Clock } from 'lucide-react';
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
    .map(([name, data]) => {
      const categorySkills = skills.filter(s => s.category === name);
      const type = categorySkills[0]?.type || 'hard';
      return { name, avg: data.sum / data.count, type };
    })
    .filter(cat => cat.avg >= 4)
    .sort((a, b) => b.avg - a.avg);

  const hardStrengths = strengths.filter(s => s.type === 'hard').slice(0, 3);
  const softStrengths = strengths.filter(s => s.type === 'soft').slice(0, 3);

  // Gaps de Evolução Dinâmicos (Hard e Soft)
  const targetLevel = 4;
  const priorityDomains = ['AI Security & SecMLOps', 'Segurança & Red Team', 'AI Engineering'];
  
  const hardGaps = skills
    .filter(s => s.type === 'hard' && s.level < targetLevel && 
      priorityDomains.includes(s.category))
    .sort((a, b) => a.level - b.level)
    .slice(0, 4);

  const softGaps = skills
    .filter(s => s.type === 'soft' && s.level < targetLevel)
    .sort((a, b) => a.level - b.level)
    .slice(0, 2);

  // Estatísticas do Perfil
  const totalSkills = skills.length;
  const prioritySkills = skills.filter(s => priorityDomains.includes(s.category));
  const avgPriority = prioritySkills.reduce((sum, s) => sum + s.level, 0) / prioritySkills.length;
  
  const skillsInL5 = skills.filter(s => s.level === 5).length;

  // Microskills progress
  const totalRequirements = skills.reduce((sum, s) => sum + (s.requirements?.length || 0), 0);
  const completedRequirements = skills.reduce((sum, s) => {
    const reqs = s.requirements?.length || 0;
    if (reqs === 0) return sum;
    const levelRatio = (s.level - 1) / 4;
    return sum + Math.round(reqs * levelRatio);
  }, 0);
  const progressPercent = totalRequirements > 0 ? ((completedRequirements / totalRequirements) * 100).toFixed(0) : '0';

  // Roadmap T1-T4 status
  const roadmapStatus = {
    T1: { label: 'Set-Dez/2026', title: 'FOUNDATIONS', desc: 'CRTP + OWASP LLM + Supply Chain' },
    T2: { label: 'Jan-Mar/2027', title: 'ADVANCEMENT', desc: 'OSCP + ISO 42001' },
    T3: { label: 'Abr-Jun/2027', title: 'OFFENSIVE', desc: 'OSCP + NIST AI RMF' },
    T4: { label: 'Jul-Dez/2027', title: 'MASTERY', desc: 'CAISP + CMCPSE + Validation' }
  };

  const certTrack = [
    { name: 'CRTP', desc: 'Red Team - Active Directory', color: 'bg-gray-400' },
    { name: 'OSCP', desc: 'Pentest Avançado', color: 'bg-gray-400' },
    { name: 'CAISP', desc: 'AI Security Professional', color: 'bg-gray-400' },
    { name: 'CMCPSE', desc: 'MCP Security Expert', color: 'bg-gray-400' }
  ];

  const affinities = [
    {
      title: 'AI Engineering & Sistemas Agênticos',
      description: 'Orquestração de LLMs, RAG avançado e agentes autônomos.',
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Engenharia de Dados & Analytics',
      description: 'Modelagem dimensional e pipelines em larga escala.',
      icon: Rocket,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Cloud Architecture & Serverless',
      description: 'Arquitetura AWS cloud-native e FinOps.',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header com Métricas Gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Total Skills</div>
          <div className="text-2xl font-bold">{totalSkills}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Skills Prioritárias</div>
          <div className="text-2xl font-bold text-primary">{prioritySkills.length}</div>
          <div className="text-xs text-primary/60 mt-1">Média: L{avgPriority.toFixed(1)}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Microskills</div>
          <div className="text-2xl font-bold text-blue-500">{progressPercent}%</div>
          <div className="text-xs text-blue-500/60 mt-1">{completedRequirements}/{totalRequirements} concluídos</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Nível 5+ (Maestria)</div>
          <div className="text-2xl font-bold text-green-500">{skillsInL5}</div>
          <div className="text-xs text-green-500/60 mt-1">{Math.round((skillsInL5 / totalSkills) * 100)}% do total</div>
        </div>
      </div>

      {/* Layout Balanceado em 2 Colunas Simétricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* COLUNA ESQUERDA: Afinidades, Especialidades & Gaps */}
        <div className="space-y-6">
          {/* Principais Afinidades */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold">Principais Afinidades</h3>
            </div>
            <div className="space-y-3">
              {affinities.map((affinity, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className={`p-2 rounded-lg shrink-0 flex items-center justify-center ${affinity.bgColor}`}>
                    <affinity.icon className={`w-4 h-4 ${affinity.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs mb-0.5">{affinity.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-snug">{affinity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gaps para L3→L4 */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400">Gaps para L3→L4</h3>
            </div>
            
            <p className="text-xs text-muted-foreground mb-4">
              Prioridades para <span className="font-bold text-foreground">AI Security Specialist</span>
            </p>

            <div className="space-y-3">
              {hardGaps.map((gap, i) => (
                <div key={i} className="space-y-1.5 bg-orange-50/50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-200/20 dark:border-orange-900/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">{gap.name}</span>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full font-mono">
                      L{gap.level.toFixed(1)} → L4
                    </span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(gap.level / 5) * 100}%` }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Roadmap T1-T4 & Certificações */}
        <div className="space-y-6">
          {/* Roadmap de Progressão L3→L4 */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Roadmap L3→L4 (12 Meses)</h3>
            </div>
            
            <div className="space-y-3">
              {Object.entries(roadmapStatus).map(([quarter, data]) => (
                <div key={quarter} className="relative pl-5 border-l-2 border-border pb-2 last:pb-0">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-primary">{quarter} ({data.label})</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded">{data.title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{data.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trilha de Certificações */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-bold">Trilha de Certificações</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {certTrack.map((cert, i) => (
                <div key={i} className="p-2.5 rounded-lg border bg-muted/30 dark:bg-muted/20 border-border flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${cert.color}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold">{cert.name}</div>
                    <div className="text-[9px] text-muted-foreground truncate">{cert.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-xl">
              <div className="flex items-center gap-1.5 mb-1 text-primary">
                <Zap className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Foco Estratégico</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Progressão focada em <span className="font-bold text-foreground">AI Security (OWASP, ATLAS)</span> e <span className="font-bold text-foreground">Red Team (CRTP/OSCP)</span> até Dez/2027.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
