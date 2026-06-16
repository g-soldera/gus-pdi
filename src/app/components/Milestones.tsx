import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle2, Circle, Loader, Archive, CheckSquare, Square } from 'lucide-react';
import { Milestone } from '@/types/pdi';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { ArchivedMilestonesModal } from './modals/ArchivedMilestonesModal';
import { calculateDaysRemaining, formatDate } from '@/app/utils/helpers';

interface MilestonesProps {
  milestones: Milestone[];
  onMilestoneClick: (milestone: Milestone) => void;
}

export function Milestones({ milestones, onMilestoneClick }: MilestonesProps) {
  const [view, setView] = useState<'timeline' | 'cards'>('timeline');
  const [showArchivedModal, setShowArchivedModal] = useState(false);

  // Handle deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('milestone-')) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, []);

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'in-progress':
        return Loader;
      case 'deprioritized':
        return Circle;
      case 'not-started':
        return Circle;
    }
  };

  const activeMilestones = milestones.filter(m => !m.archived);
  const sortedMilestones = [...activeMilestones].sort((a, b) => 
    new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  return (
    <section id="milestones" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">Marcos de Desenvolvimento</h2>
          <p className="text-muted-foreground">
            Objetivos estratégicos e seu progresso ao longo da jornada
          </p>
        </motion.div>

        {/* View Toggle and Archive Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <div className="inline-flex bg-card border border-border rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setView('timeline')}
              className={`px-6 py-2 rounded-lg transition-all ${
                view === 'timeline'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setView('cards')}
              className={`px-6 py-2 rounded-lg transition-all ${
                view === 'cards'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Cards
            </button>
          </div>
          
          {milestones.some(m => m.archived) && (
            <button
              onClick={() => setShowArchivedModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-all text-muted-foreground hover:text-foreground"
            >
              <Archive className="w-4 h-4" />
              <span className="text-sm">Arquivados ({milestones.filter(m => m.archived).length})</span>
            </button>
          )}
        </div>

        {view === 'timeline' ? (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {sortedMilestones.map((milestone, index) => {
                const StatusIcon = getStatusIcon(milestone.status);
                const daysRemaining = calculateDaysRemaining(milestone.deadline);

                return (
                  <motion.div
                    key={milestone.id}
                    id={`milestone-${milestone.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Timeline Icon */}
                    <div className="absolute left-8 top-6 w-6 h-6 -translate-x-1/2">
                      <motion.div
                        className={`w-full h-full rounded-full flex items-center justify-center ${
                          milestone.status === 'completed' 
                            ? 'bg-[var(--completed)]' 
                            : milestone.status === 'in-progress'
                            ? 'bg-[var(--in-progress)]'
                            : 'bg-[var(--not-started)]'
                        }`}
                        animate={milestone.status === 'in-progress' ? { scale: [1, 1.1, 1] } : {}}
                        transition={milestone.status === 'in-progress' ? { duration: 2, repeat: Infinity } : {}}
                      >
                        <motion.div
                          animate={milestone.status === 'in-progress' ? { rotate: 360 } : {}}
                          transition={milestone.status === 'in-progress' ? { duration: 2, repeat: Infinity, linear: true } : {}}
                        >
                          <StatusIcon className="w-4 h-4 text-white" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <motion.button
                      onClick={() => onMilestoneClick(milestone)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary transition-all text-left group"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {milestone.description}
                          </p>
                          <StatusBadge status={milestone.status} />
                        </div>
                        
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(milestone.deadline)}</span>
                          </div>
                          {daysRemaining > 0 && milestone.status !== 'completed' && (
                            <div className="flex items-center gap-2 text-primary">
                              <Clock className="w-4 h-4" />
                              <span>{daysRemaining} dias restantes</span>
                            </div>
                          )}
                          {milestone.status === 'completed' && (
                            <div className="text-[var(--completed)]">✓ Concluído</div>
                          )}
                        </div>
                      </div>

                      <ProgressBar 
                        progress={milestone.progress} 
                        colorClass={milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-primary'}
                      />
                      
                      {milestone.objectives && milestone.objectives.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">Objetivos de Evolução:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {milestone.objectives.map((obj, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                {obj.completed ? (
                                  <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                )}
                                <span className={obj.completed ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                                  {obj.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMilestones.map((milestone, index) => {
              const StatusIcon = getStatusIcon(milestone.status);
              const daysRemaining = calculateDaysRemaining(milestone.deadline);

              return (
                <motion.button
                  key={milestone.id}
                  id={`milestone-${milestone.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onMilestoneClick(milestone)}
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary transition-all text-left group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <motion.div
                      className={`p-2 rounded-lg ${
                        milestone.status === 'completed' 
                          ? 'bg-success-light' 
                          : milestone.status === 'in-progress'
                          ? 'bg-info-light'
                          : 'bg-muted'
                      }`}
                      animate={milestone.status === 'in-progress' ? { scale: [1, 1.05, 1] } : {}}
                      transition={milestone.status === 'in-progress' ? { duration: 2, repeat: Infinity } : {}}
                    >
                      <motion.div
                        animate={milestone.status === 'in-progress' ? { rotate: 360 } : {}}
                        transition={milestone.status === 'in-progress' ? { duration: 2, repeat: Infinity, linear: true } : {}}
                      >
                        <StatusIcon className={`w-5 h-5 ${
                          milestone.status === 'completed' 
                            ? 'text-[var(--completed)]' 
                            : milestone.status === 'in-progress'
                            ? 'text-[var(--in-progress)]'
                            : 'text-[var(--not-started)]'
                        }`} />
                      </motion.div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                        {milestone.title}
                      </h3>
                      <StatusBadge status={milestone.status} />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {milestone.description}
                  </p>

                  <div className="space-y-3">
                    <ProgressBar 
                      progress={milestone.progress} 
                      showLabel 
                      colorClass={milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-primary'}
                    />
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(milestone.deadline)}</span>
                      {daysRemaining > 0 && milestone.status !== 'completed' && (
                        <span className="text-primary">{daysRemaining} dias</span>
                      )}
                    </div>

                    {milestone.objectives && milestone.objectives.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">Objetivos:</p>
                        <div className="space-y-1.5">
                          {milestone.objectives.slice(0, 3).map((obj, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px]">
                              {obj.completed ? (
                                <CheckSquare className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                              ) : (
                                <Square className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                              )}
                              <span className={obj.completed ? 'text-foreground line-clamp-1' : 'text-muted-foreground line-clamp-1'}>
                                {obj.text}
                              </span>
                            </div>
                          ))}
                          {milestone.objectives.length > 3 && (
                            <p className="text-primary text-[10px] font-medium">+{milestone.objectives.length - 3} mais objetivos</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Archived Milestones Modal */}
      <ArchivedMilestonesModal
        isOpen={showArchivedModal}
        onClose={() => setShowArchivedModal(false)}
        milestones={milestones}
      />
    </section>
  );
}
