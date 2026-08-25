import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle2, Circle, Loader, Archive, CheckSquare, Square, MessageSquare, Lock, HelpCircle, Telescope } from 'lucide-react';
import { Milestone, StudyTopic } from '@/types/pdi';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { ArchivedMilestonesModal } from './modals/ArchivedMilestonesModal';
import { StudyPath } from './StudyPath';
import { calculateDaysRemaining, formatDate } from '@/app/utils/helpers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

const PHASE_LABELS: Record<string, string> = {
  'L1': 'L1 (Intern)',
  'L2': 'L2 (Entry)',
  'L3': 'L3 (Mid)',
  'L4': 'L4 (Senior)',
  'L5': 'L5 (Staff)',
  'L6': 'L6 (Principal)',
  'L7': 'L7 (Distinguished)',
};

interface MilestonesProps {
  milestones: Milestone[];
  studyPath: StudyTopic[];
  onMilestoneClick: (milestone: Milestone) => void;
}

export function Milestones({ milestones, studyPath, onMilestoneClick }: MilestonesProps) {
  const [view, setView] = useState<'timeline' | 'cards'>('timeline');
  const [showArchivedModal, setShowArchivedModal] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<string>('L2');

  const filteredMilestones = milestones.filter(m => !m.archived && m.phase === selectedPhase);

  const completedMilestones = filteredMilestones
    .filter(m => calculateDynamicProgress(m) === 100)
    .sort((a, b) => new Date(b.deadline ?? 0).getTime() - new Date(a.deadline ?? 0).getTime());

  const blockedMilestones = filteredMilestones
    .filter(m => !!m.blockedBy && calculateDynamicProgress(m) < 100);

  const decidingMilestones = filteredMilestones
    .filter(m => m.decision_status === 'a_decidir' && !m.blockedBy);

  const aspirationalMilestones = filteredMilestones
    .filter(m => m.horizon_type === 'aspirational' && m.decision_status !== 'a_decidir' && !m.blockedBy);

  const activeMilestones = filteredMilestones
    .filter(m => !m.blockedBy && !m.decision_status && !m.horizon_type && calculateDynamicProgress(m) < 100)
    .sort((a, b) => {
      const progDiff = calculateDynamicProgress(b) - calculateDynamicProgress(a);
      if (progDiff !== 0) return progDiff;
      return new Date(a.deadline ?? 0).getTime() - new Date(b.deadline ?? 0).getTime();
    });

  const sortedMilestones = [
    ...completedMilestones,
    ...activeMilestones,
    ...blockedMilestones,
    ...decidingMilestones,
    ...aspirationalMilestones,
  ];

  return (
    <section id="milestones" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-3 font-black tracking-tight">Marcos de Desenvolvimento</h2>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {(['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'] as const).map((p) => {
              const isCompleted = p === 'L1';
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPhase(p)}
                  disabled={isCompleted}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all relative ${
                    isCompleted 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-500 cursor-not-allowed' 
                      : selectedPhase === p 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-card border border-border hover:border-primary text-muted-foreground'
                  }`}
                >
                  {isCompleted && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  {PHASE_LABELS[p]}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-3">Roadmap de Carreira: {PHASE_LABELS[selectedPhase]}</p>
        </motion.div>

        <TooltipProvider>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <div className="inline-flex bg-card border border-border rounded-xl p-1 shadow-sm">
              <button onClick={() => setView('timeline')} className={`px-6 py-2 rounded-lg transition-all font-bold ${view === 'timeline' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Timeline</button>
              <button onClick={() => setView('cards')} className={`px-6 py-2 rounded-lg transition-all font-bold ${view === 'cards' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Cards</button>
            </div>
          </div>
          {view === 'timeline' ? (
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">{sortedMilestones.map((m, i) => <MilestoneItem key={m.id} milestone={m} index={i} onClick={onMilestoneClick} />)}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{sortedMilestones.map((m, i) => <MilestoneCard key={m.id} milestone={m} index={i} onClick={onMilestoneClick} />)}</div>
          )}
          {filteredMilestones.length === 0 && <p className="text-center py-12 text-muted-foreground">Nenhum marco nesta fase.</p>}
        </TooltipProvider>
      </div>
    </section>
  );
}

function MilestoneItem({ milestone, index, onClick }: { milestone: Milestone, index: number, onClick: any }) {
  const progress = calculateDynamicProgress(milestone);
  const status = getDynamicStatus(milestone);
  const StatusIcon = getStatusIcon(status);
  const daysRemaining = calculateDaysRemaining(milestone.deadline);
  const isBlocked = !!milestone.blockedBy;
  const isCompleted = status === 'completed';
  const isDeciding = milestone.decision_status === 'a_decidir';
  const isAspirational = milestone.horizon_type === 'aspirational';
  const isCollapsed = isCompleted || isBlocked || isDeciding || isAspirational;

  return (
    <motion.div
      key={milestone.id}
      id={`milestone-${milestone.id}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-20"
      onClick={() => !isBlocked && !isDeciding && !isAspirational && onClick(milestone)}
    >
      <div className="absolute left-8 top-6 w-6 h-6 -translate-x-1/2">
        <motion.div
          className={`w-full h-full rounded-full flex items-center justify-center ${
            isBlocked ? 'bg-muted'
            : isDeciding ? 'bg-amber-400/70'
            : isAspirational ? 'bg-purple-400/50'
            : isCompleted ? 'bg-[var(--completed)]'
            : status === 'in-progress' ? 'bg-[var(--in-progress)]'
            : 'bg-[var(--not-started)]'
          }`}
          animate={status === 'in-progress' && !isBlocked && !isDeciding && !isAspirational ? { scale: [1, 1.1, 1] } : {}}
          transition={status === 'in-progress' && !isBlocked && !isDeciding && !isAspirational ? { duration: 2, repeat: Infinity } : {}}
        >
          <motion.div
            animate={status === 'in-progress' && !isBlocked && !isDeciding && !isAspirational ? { rotate: 360 } : {}}
            transition={status === 'in-progress' && !isBlocked && !isDeciding && !isAspirational ? { duration: 2, repeat: Infinity, linear: true } : {}}
          >
            {isBlocked ? <Lock className="w-4 h-4 text-muted-foreground" />
              : isDeciding ? <HelpCircle className="w-4 h-4 text-amber-700" />
              : isAspirational ? <Telescope className="w-4 h-4 text-purple-700" />
              : <StatusIcon className="w-4 h-4 text-white" />}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={`w-full bg-card border rounded-xl px-6 py-4 shadow-sm transition-all text-left group relative ${
          isBlocked ? 'border-border opacity-60 cursor-not-allowed'
          : isDeciding ? 'border-amber-300/50'
          : isAspirational ? 'border-border'
          : isCompleted ? 'border-green-500/30 opacity-70 cursor-pointer hover:opacity-90'
          : 'border-border hover:shadow-md hover:border-primary cursor-pointer'
        }`}
        whileHover={isCollapsed ? {} : { scale: 1.01 }}
        whileTap={isCollapsed ? {} : { scale: 0.99 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <h3 className={`font-bold group-hover:text-primary transition-colors truncate ${isCollapsed ? 'text-base' : 'text-xl'}`}>{milestone.title}</h3>
            <StatusBadge status={isBlocked ? 'not-started' : status} />
            {isDeciding && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300/50 shrink-0">
                A decidir
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm shrink-0">
            {isBlocked && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                <Lock className="w-3 h-3 shrink-0" />
                <span className="max-w-[200px] truncate">{milestone.blockedBy}</span>
              </div>
            )}
            {isCompleted && <span className="text-green-600 font-bold text-xs">Concluído</span>}
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(milestone.deadline)}</span>
            </div>
            {isAspirational && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-300/50 shrink-0">
                Aspiracional
              </span>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <>
            <p className="text-muted-foreground text-sm mt-3 mb-4">{milestone.description}</p>
            <ProgressBar progress={progress} colorClass={status === 'in-progress' ? 'bg-green-500' : 'bg-green-600'} />
            {daysRemaining > 0 && (
              <div className="flex items-center gap-2 text-primary text-sm mt-2">
                <Clock className="w-4 h-4" />
                <span>{daysRemaining} dias restantes</span>
              </div>
            )}
            {milestone.objectives && milestone.objectives.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">Objetivos de Evolução:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {milestone.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      {obj.completed ? (
                        <CheckSquare className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 flex items-center gap-2">
                        <span className={obj.completed ? 'text-foreground font-semibold' : 'text-muted-foreground'}>{obj.text}</span>
                        {obj.completed && obj.completionJustification && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="cursor-help text-green-600 hover:text-green-700">
                                <MessageSquare className="w-3.5 h-3.5" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs font-bold mb-1">Justificativa:</p>
                              <p className="text-xs">{obj.completionJustification}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function MilestoneCard({ milestone, index, onClick }: { milestone: Milestone, index: number, onClick: any }) {
  const progress = calculateDynamicProgress(milestone);
  const status = getDynamicStatus(milestone);
  const StatusIcon = getStatusIcon(status);
  const daysRemaining = calculateDaysRemaining(milestone.deadline);
  const isBlocked = !!milestone.blockedBy;
  const isCompleted = status === 'completed';
  const isDeciding = milestone.decision_status === 'a_decidir';
  const isAspirational = milestone.horizon_type === 'aspirational';
  const isCollapsed = isCompleted || isBlocked || isDeciding || isAspirational;

  return (
    <motion.button
      key={milestone.id}
      id={`milestone-${milestone.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => !isBlocked && !isDeciding && !isAspirational && onClick(milestone)}
      whileHover={isCollapsed ? {} : { y: -8 }}
      className={`bg-card border border-border rounded-xl p-4 shadow-sm transition-all text-left group flex flex-col relative ${
        isBlocked ? 'opacity-60 cursor-not-allowed'
        : isDeciding ? 'opacity-70 border-amber-300/50'
        : isAspirational ? 'opacity-80 border-border'
        : isCompleted ? 'opacity-70 border-green-500/30 cursor-pointer hover:opacity-90'
        : 'hover:shadow-md hover:border-primary'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          className={`p-1.5 rounded-lg shrink-0 ${
            isBlocked ? 'bg-muted'
            : isDeciding ? 'bg-amber-100 dark:bg-amber-900/20'
            : isAspirational ? 'bg-purple-100 dark:bg-purple-900/20'
            : isCompleted ? 'bg-green-100 dark:bg-green-900/30'
            : status === 'in-progress' ? 'bg-green-50 dark:bg-green-900/10'
            : 'bg-muted'
          }`}
          animate={status === 'in-progress' && !isBlocked && !isDeciding ? { scale: [1, 1.05, 1] } : {}}
          transition={status === 'in-progress' && !isBlocked && !isDeciding ? { duration: 2, repeat: Infinity } : {}}
        >
          <motion.div
            animate={status === 'in-progress' && !isBlocked && !isDeciding ? { rotate: 360 } : {}}
            transition={status === 'in-progress' && !isBlocked && !isDeciding ? { duration: 2, repeat: Infinity, linear: true } : {}}
          >
            {isBlocked ? <Lock className="w-4 h-4 text-muted-foreground" />
              : isDeciding ? <HelpCircle className="w-4 h-4 text-amber-600" />
              : isAspirational ? <Telescope className="w-4 h-4 text-purple-600" />
              : <StatusIcon className={`w-4 h-4 ${isCompleted ? 'text-green-600' : status === 'in-progress' ? 'text-green-500' : 'text-muted-foreground'}`} />
            }
          </motion.div>
        </motion.div>
        <h3 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1 flex-1">{milestone.title}</h3>
        <StatusBadge status={isBlocked ? 'not-started' : status} />
      </div>

      {isDeciding && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300/50 self-start mb-1">
          A decidir
        </span>
      )}
      {isAspirational && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-300/50 self-start mb-1">
          Aspiracional
        </span>
      )}

      {isBlocked && (
        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
          <Lock className="w-3 h-3 shrink-0" />
          <span className="line-clamp-1">{milestone.blockedBy}</span>
        </div>
      )}

      {!isCollapsed && (
        <>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 mt-2">{milestone.description}</p>
          <div className="space-y-3 mt-auto">
            <ProgressBar progress={progress} showLabel colorClass={status === 'in-progress' ? 'bg-green-500' : 'bg-green-600'} />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(milestone.deadline)}</span>
              {daysRemaining > 0 && <span className="text-primary font-bold">{daysRemaining} dias</span>}
            </div>
            {milestone.objectives && milestone.objectives.length > 0 && (
              <div className="pt-3 border-t border-border/50">
                <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Objetivos:</p>
                <div className="space-y-1.5">
                  {milestone.objectives.slice(0, 3).map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px]">
                      {obj.completed ? <CheckSquare className="w-3 h-3 text-green-600 shrink-0 mt-0.5" /> : <Square className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />}
                      <div className="flex-1 flex items-center gap-1.5 min-w-0">
                        <span className={obj.completed ? 'text-foreground font-semibold line-clamp-1' : 'text-muted-foreground line-clamp-1'}>{obj.text}</span>
                        {obj.completed && obj.completionJustification && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="cursor-help text-green-600"><MessageSquare className="w-3 h-3" /></div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs">{obj.completionJustification}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  ))}
                  {milestone.objectives.length > 3 && <p className="text-primary text-[10px] font-bold">+{milestone.objectives.length - 3} mais objetivos</p>}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </motion.button>
  );
}

function calculateDynamicProgress(milestone: Milestone) {
  if (!milestone.objectives || milestone.objectives.length === 0) return milestone.progress;
  const completed = milestone.objectives.filter(obj => obj.completed).length;
  return Math.round((completed / milestone.objectives.length) * 100);
}

function getDynamicStatus(milestone: Milestone): Milestone['status'] {
  const progress = calculateDynamicProgress(milestone);
  if (progress === 100) return 'completed';
  if (progress > 0) return 'in-progress';
  return 'not-started';
}

function getStatusIcon(status: Milestone['status']) {
  switch (status) {
    case 'completed': return CheckCircle2;
    case 'in-progress': return Loader;
    default: return Circle;
  }
}
