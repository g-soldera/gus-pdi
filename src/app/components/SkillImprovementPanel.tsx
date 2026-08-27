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
      <div className="rounded-xl p-3.5 border border-border/60 bg-card/80 dark:bg-card/90 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-border/40">
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
            {isCompleted ? <Zap className="w-4 h-4 text-emerald-500 animate-pulse" /> : <TrendingUp className="w-4 h-4 text-primary" />}
            <span>Impacto em Skills</span>
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Nível Atual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block ring-2 ring-emerald-400/30" /> Ganho (+Delta)
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              +{unlockedRequirements.length} micro-skills
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {Object.entries(groupedBySkill).map(([skillId, unlocks]) => {
            const skill = allSkills.find((s) => s.id === skillId);
            if (!skill || !skill.requirements || skill.requirements.length === 0) return null;

            const totalReqs = skill.requirements.length;
            const gainLevel = unlocks.length * (4 / totalReqs);
            const pctGain = Math.round((unlocks.length / totalReqs) * 100);

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
                    className="flex flex-row items-center justify-between p-2.5 rounded-lg bg-muted/40 hover:bg-muted/70 border border-border/50 hover:border-emerald-500/30 transition-all text-xs cursor-pointer group gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center shrink-0">
                      {/* 5-Star Visual Row */}
                      <div
                        className="flex items-center gap-1 shrink-0 p-1 rounded-md bg-background/60 border border-border/40"
                        title={`Atual: ${obtainedLevel.toFixed(1)} | Ganho: +${addedLevel.toFixed(2)} | Novo Nível: ${totalLevel.toFixed(1)}`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => {
                          const starStart = star - 1;
                          const obtainedFill = Math.min(Math.max(obtainedLevel - starStart, 0), 1);
                          const totalFill = Math.min(Math.max(totalLevel - starStart, 0), 1);
                          const hasGainInStar = totalFill > obtainedFill;

                           return (
                             <div key={star} className="relative w-4 h-4 flex items-center justify-center">
                               {/* Base Star (Muted Background) */}
                               <Star className="w-4 h-4 fill-muted text-muted opacity-40" />

                               {/* Obtained Level Overlay (Solid Primary) - Darker, more solid */}
                               {obtainedFill > 0 && (
                                 <div
                                   className="absolute top-0 left-0 overflow-hidden h-full"
                                   style={{ width: `${obtainedFill * 100}%` }}
                                 >
                                   <Star className="w-4 h-4 fill-primary text-primary" />
                                 </div>
                               )}

                               {/* Added Gain Overlay (Vibrant Emerald with Pulse/Fade) - Lighter, more prominent */}
                               {totalFill > obtainedFill && (
                                 <div
                                   className={`absolute top-0 left-0 overflow-hidden h-full animate-pulse transition-all duration-700`}
                                   style={{ width: `${(totalFill - obtainedFill) * 100}%` }}
                                 >
                                   <Star className="w-4 h-4 fill-emerald-300 text-emerald-300 drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
                                 </div>
                               )}
                             </div>
                           );
                        })}
                      </div>
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
