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
  // Alvo: AI Security Specialist L3→L4 (foco em AI Security & SecMLOps + Segurança Ofensiva)
  const targetLevel = 4;
  
  const priorityDomains = ['AI Security & SecMLOps', 'Segurança & Red Team', 'AI Engineering'];
  
  const hardGaps = skills
    .filter(s => s.type === 'hard' && s.level < targetLevel && 
      priorityDomains.includes(s.category))
    .sort((a, b) => a.level - b.level)
    .slice(0, 6);

  const softGaps = skills
    .filter(s => s.type === 'soft' && s.level < targetLevel)
    .sort((a, b) => a.level - b.level)
    .slice(0, 3);

  // Estatísticas do Perfil
  const totalSkills = skills.length;
  const prioritySkills = skills.filter(s => priorityDomains.includes(s.category));
  const avgPriority = prioritySkills.reduce((sum, s) => sum + s.level, 0) / prioritySkills.length;
  
  const skillsInL5 = skills.filter(s => s.level === 5).length;
  const skillsBelowL4 = skills.filter(s => s.level < 4).length;

  // Microskills progress - Calcula completude com base no nível da skill
  // nível L4.3 → ~85% completude (usando fórmula inversa: completed/total = (level-1)/4)
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
    T1: { label: 'Set-Dez/2026', title: 'FOUNDATIONS', desc: 'CRTP + OWASP LLM + Supply Chain', completed: 0, total: 3 },
    T2: { label: 'Jan-Mar/2027', title: 'ADVANCEMENT', desc: 'OSCP + ISO 42001', completed: 0, total: 2 },
    T3: { label: 'Abr-Jun/2027', title: 'OFFENSIVE', desc: 'OSCP + NIST AI RMF', completed: 0, total: 2 },
    T4: { label: 'Jul-Dez/2027', title: 'MASTERY', desc: 'CAISP + CMCPSE + Validation', completed: 0, total: 3 }
  };

  // Trilha de certificações
  const certTrack = [
    { name: 'CRTP', desc: 'Red Team - Active Directory', status: 'pending', color: 'bg-gray-400', target: 'Dez/2026' },
    { name: 'OSCP', desc: 'Pentest - Metodologia completa', status: 'pending', color: 'bg-gray-400', target: 'Jun/2027' },
    { name: 'CAISP', desc: 'AI Security Professional', status: 'pending', color: 'bg-gray-400', target: 'Dez/2027' },
    { name: 'CMCPSE', desc: 'MCP Security Expert', status: 'pending', color: 'bg-gray-400', target: 'Dez/2027' }
  ];

  const affinities = [
    {
      title: 'AI Engineering & Sistemas Agênticos',
      description: 'Domínio em orquestração de LLMs, RAG avançado e arquitetura de agentes autônomos com LangGraph.',
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Engenharia de Dados & Analytics',
      description: 'Expertise em modelagem dimensional, SQL avançado e pipelines de dados em larga escala (AWS Glue, Athena).',
      icon: Rocket,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Cloud Architecture & Serverless',
      description: 'Arquitetura cloud-native na AWS (Lambda, S3, DynamoDB) e otimização de custos (FinOps).',
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
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className={`p-3 rounded-lg shrink-0 flex items-center justify-center ${affinity.bgColor}`}>
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
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Hard Skills (Pontos Fortes)</h4>
                <div className="flex flex-wrap gap-2">
                  {hardStrengths.map((s, i) => (
                    <div key={i} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">{s.name}</span>
                      <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full">{s.avg.toFixed(1)}</span>
                    </div>
                  ))}
                  {hardStrengths.length === 0 && (
                    <span className="text-xs text-muted-foreground">Sem skills ≥ L4.0</span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Soft Skills (Pontos Fortes)</h4>
                <div className="flex flex-wrap gap-2">
                  {softStrengths.map((s, i) => (
                    <div key={i} className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                      <span className="text-xs font-bold text-green-700 dark:text-green-400">{s.name}</span>
                      <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded-full">{s.avg.toFixed(1)}</span>
                    </div>
                  ))}
                  {softStrengths.length === 0 && (
                    <span className="text-xs text-muted-foreground">Sem skills ≥ L4.0</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2: Gap Analysis & Plano de Ação */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">Gaps para L3→L4</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Prioridades de desenvolvimento para <span className="font-bold text-foreground">AI Security Specialist (L3→L4)</span>
            </p>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Progresso Microskills</div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>{progressPercent}% concluídos</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Hard Gaps */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Gaps Técnicos Prioritários
                </h4>
                <div className="space-y-3">
                  {hardGaps.map((gap, i) => (
                    <div key={i} className="space-y-2 bg-orange-50/50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-200/20 dark:border-orange-900/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{gap.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full font-mono">
                            L{gap.level.toFixed(1)} → L4
                          </span>
                          <span className="text-[10px] text-orange-500/60">
                            {Math.round((gap.requirements?.length || 0) * ((gap.level - 1) / 4))}/{gap.requirements?.length || 0} reqs
                          </span>
                        </div>
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
                  {hardGaps.length === 0 && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4 mx-auto mb-1" />
                      Sem gaps críticos na prioridade!
                    </div>
                  )}
                </div>
              </div>

              {/* Soft Gaps */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Desenvolvimento Comportamental
                </h4>
                <div className="space-y-3">
                  {softGaps.map((gap, i) => (
                    <div key={i} className="space-y-2 bg-purple-50/50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-200/20 dark:border-purple-900/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{gap.name}</span>
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded-full font-mono">
                          L{gap.level.toFixed(1)} → L4
                        </span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(gap.level / 5) * 100}%` }}
                          className="h-full bg-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Roadmap T1-T4 */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">Roadmap de Progressão L3→L4</span>
              </div>
              
              <div className="space-y-4">
                {Object.entries(roadmapStatus).map(([quarter, data], i) => (
                  <div key={quarter} className="relative pl-6 border-l-2 border-border">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-primary">{data.label}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{data.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{data.desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground/70">Alvo: {quarter === 'T1' ? 'Dez/2026' : quarter === 'T2' ? 'Mar/2027' : quarter === 'T3' ? 'Jun/2027' : 'Dez/2027'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications Track */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Trilha de Certificações</h4>
                <div className="grid grid-cols-2 gap-3">
                  {certTrack.map((cert, i) => (
                    <div key={i} className={`p-3 rounded-lg border flex items-center gap-3 ${
                      cert.status === 'completed' 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30' 
                        : 'bg-muted/30 dark:bg-muted/20 border-border'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${cert.color}`} />
                      <div>
                        <div className="text-xs font-bold">{cert.name}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{cert.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
