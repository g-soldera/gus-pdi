import React from 'react';
import { TrendingUp, Zap, Star, CheckCircle2 } from 'lucide-react';
import { MilestoneRequirementUnlock, Skill } from '@/types/pdi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

interface SkillImprovementPanelProps {
  unlockedRequirements?: MilestoneRequirementUnlock[];
  allSkills: Skill[];
  milestoneStatus: 'completed' | 'in-progress' | 'planned' | string;
  onSkillClick?: (skill: Skill) => void;
}

export function SkillImprovementPanel({
  unlockedRequirements = [],
  allSkills,
  milestoneStatus,
  onSkillClick,
}: SkillImprovementPanelProps) {
  if (!unlockedRequirements || unlockedRequirements.length === 0) return null;

  // Group unlocks by Skill ID
  const groupedBySkill = unlockedRequirements.reduce((acc, unlock) => {
    if (!acc[unlock.skillId]) {
      acc[unlock.skillId] = [];
    }
    acc[unlock.skillId].push(unlock);
    return acc;
  }, {} as Record<string, MilestoneRequirementUnlock[]>);

  const isCompleted = milestoneStatus === 'completed';

  return (
    <TooltipProvider>
      <div className="rounded-xl p-3 border border-border/60 bg-card/80 dark:bg-card/90 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
            {isCompleted ? <Zap className="w-3.5 h-3.5 text-emerald-500" /> : <TrendingUp className="w-3.5 h-3.5 text-primary" />}
            <span>Impacto em Skills</span>
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" /> Atual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Ganho
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              +{unlockedRequirements.length} micro-skills
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {Object.entries(groupedBySkill).map(([skillId, unlocks]) => {
            const skill = allSkills.find((s) => s.id === skillId);
            if (!skill || !skill.requirements || skill.requirements.length === 0) return null;

            const totalReqs = skill.requirements.length;
            const gainLevel = unlocks.length * (4 / totalReqs);

            const obtainedLevel = isCompleted
              ? Math.max(1, skill.level - gainLevel)
              : Math.min(5, skill.level);

            const addedLevel = gainLevel;
            const totalLevel = Math.min(5, obtainedLevel + addedLevel);

            return (
              <Tooltip key={skillId}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => onSkillClick?.(skill)}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted border border-border/40 transition-all text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                        ({unlocks.length} reqs)
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-0.5 shrink-0"
                      title={`Atual: ${obtainedLevel.toFixed(1)} | Ganho: +${addedLevel.toFixed(2)}`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => {
                        const starStart = star - 1;
                        const obtainedFill = Math.min(Math.max(obtainedLevel - starStart, 0), 1);
                        const totalFill = Math.min(Math.max(totalLevel - starStart, 0), 1);

                        return (
                          <div key={star} className="relative">
                            {/* Base Star (Muted) */}
                            <Star className="w-3.5 h-3.5 fill-muted text-muted" />

                            {/* Added Gain Overlay (Emerald) */}
                            {totalFill > 0 && (
                              <div
                                className="absolute top-0 left-0 overflow-hidden"
                                style={{ width: `${totalFill * 100}%` }}
                              >
                                <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                              </div>
                            )}

                            {/* Obtained Level Overlay (Primary) */}
                            {obtainedFill > 0 && (
                              <div
                                className="absolute top-0 left-0 overflow-hidden"
                                style={{ width: `${obtainedFill * 100}%` }}
                              >
                                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs p-3 space-y-2 bg-popover text-popover-foreground border border-border shadow-md">
                  <div className="font-bold text-xs border-b border-border/60 pb-1 text-primary">
                    Requisitos Conquistados ({unlocks.length}):
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    {unlocks.map((unl, idx) => {
                      const reqObj = skill.requirements?.find((r) => r.id === unl.requirementId);
                      return (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-foreground">{reqObj?.text || unl.requirementId}</span>
                            {unl.rationale && (
                              <div className="text-muted-foreground italic text-[10px] mt-0.5">
                                "{unl.rationale}"
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
