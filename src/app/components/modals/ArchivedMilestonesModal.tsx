import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Archive, CheckCircle2 } from 'lucide-react';
import { Milestone } from '@/types/pdi';
import { StatusBadge } from '../StatusBadge';
import { ProgressBar } from '../ProgressBar';
import { formatDate } from '@/app/utils/helpers';

interface ArchivedMilestonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestones: Milestone[];
}

export function ArchivedMilestonesModal({ isOpen, onClose, milestones }: ArchivedMilestonesModalProps) {
  const archivedMilestones = milestones.filter(m => m.archived);

  const completedMilestones = archivedMilestones.filter(m => m.status === 'completed');
  const deprioritizedMilestones = archivedMilestones.filter(m => m.status === 'deprioritized');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background border border-border rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Archive className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Marcos Arquivados</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-card rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Completed Section */}
                {completedMilestones.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <h3 className="text-lg font-semibold text-success">Concluídos</h3>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {completedMilestones.length} marco{completedMilestones.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {completedMilestones.map((milestone) => (
                        <motion.div
                          key={milestone.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-card border border-border rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">
                                {milestone.displayName || milestone.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {milestone.description}
                              </p>
                            </div>
                            <StatusBadge status={milestone.status} />
                          </div>
                          {milestone.notes && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              "{milestone.notes}"
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                            <span>Concluído em {formatDate(milestone.deadline)}</span>
                            <span className="text-success">✓ 100%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deprioritized Section */}
                {deprioritizedMilestones.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Archive className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-muted-foreground">Despriorizados</h3>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {deprioritizedMilestones.length} marco{deprioritizedMilestones.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {deprioritizedMilestones.map((milestone) => (
                        <motion.div
                          key={milestone.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-card/50 border border-border rounded-lg p-4 opacity-75"
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">
                                {milestone.displayName || milestone.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {milestone.description}
                              </p>
                            </div>
                            <StatusBadge status={milestone.status} />
                          </div>
                          <ProgressBar progress={milestone.progress} />
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                            <span>Prazo: {formatDate(milestone.deadline)}</span>
                            <span>{milestone.progress}% progresso</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {archivedMilestones.length === 0 && (
                  <div className="text-center py-8">
                    <Archive className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">Nenhum marco arquivado ainda</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
