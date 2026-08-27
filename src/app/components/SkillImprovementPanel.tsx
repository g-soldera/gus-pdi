import React from 'react';
import { TrendingUp, Zap, Star, CheckCircle2, Info } from 'lucide-react';
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
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            +{unlockedRequirements.length} micro-skills
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {Object.entries(groupedBySkill).map(([skillId, unlocks]) => {
            const skill = allSkills.find((s) => s.id === skillId);
            if (!skill || !skill.requirements) return null;

            const totalReqs = skill.requirements.length;
            const starGainPerReq = (4 / totalReqs);
            const totalStarGain = unlocks.length * starGainPerReq;

            return (
              <Tooltip key={skillId}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => onSkillClick?.(skill)}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted border border-border/40 transition-all text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                        ({unlocks.length} reqs)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md font-mono font-bold shrink-0">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span>+{totalStarGain.toFixed(2)}</span>
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
