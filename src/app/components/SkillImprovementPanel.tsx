import React from 'react';
import { TrendingUp, Zap, Star } from 'lucide-react';
import { SkillImprovement, Skill } from '@/types/pdi';

interface SkillImprovementPanelProps {
  improvements: SkillImprovement[];
  allSkills: Skill[];
  milestoneStatus: 'completed' | 'in-progress' | 'planned' | string;
  onSkillClick?: (skill: Skill) => void;
}

const LEVEL_LABELS: Record<number, string> = {
  1: 'Básico',
  2: 'Elementar',
  3: 'Intermediário',
  4: 'Avançado',
  5: 'Expert',
};

function StarRow({ level, size = 'sm' }: { level: number; size?: 'sm' | 'xs' }) {
  const dim = size === 'xs' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${dim} ${s <= level ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
        />
      ))}
    </div>
  );
}

export function SkillImprovementPanel({
  improvements,
  allSkills,
  milestoneStatus,
  onSkillClick,
}: SkillImprovementPanelProps) {
  const enriched = improvements
    .map((imp) => {
      const skill = allSkills.find((s) => s.id === imp.skillId);
      return skill ? { ...imp, skill } : null;
    })
    .filter(Boolean) as Array<SkillImprovement & { skill: Skill }>;

  if (enriched.length === 0) return null;

  const isCompleted = milestoneStatus === 'completed';
  const isInProgress = milestoneStatus === 'in-progress';

  const containerClass = isCompleted
    ? 'bg-green-50/60 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
    : isInProgress
    ? 'bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800'
    : 'bg-muted/30 border border-border/50';

  const headerClass = isCompleted
    ? 'text-green-700 dark:text-green-400'
    : isInProgress
    ? 'text-blue-700 dark:text-blue-400'
    : 'text-muted-foreground';

  const trophyLabel = isCompleted ? 'Skills conquistadas' : isInProgress ? 'Skills em progresso' : 'Skills que serão desbloqueadas';

  return (
    <div className={`rounded-xl p-4 space-y-3 ${containerClass}`}>
      <h3 className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${headerClass}`}>
        {isCompleted ? (
          <Zap className="w-3.5 h-3.5" />
        ) : (
          <TrendingUp className="w-3.5 h-3.5" />
        )}
        {trophyLabel}
      </h3>

      <div className="space-y-2">
        {enriched.map((imp) => {
          const currentLevel = imp.skill.level;
          const newLevel = Math.min(5, currentLevel + imp.delta) as 1 | 2 | 3 | 4 | 5;
          const hasGain = imp.delta > 0;

          return (
            <button
              key={imp.skillId}
              onClick={() => onSkillClick?.(imp.skill)}
              className="w-full text-left group"
              disabled={!onSkillClick}
            >
              <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                {/* Level badge */}
                <div className="shrink-0 flex flex-col items-center gap-0.5 min-w-[40px]">
                  {hasGain ? (
                    <>
                      <span className="text-[10px] font-bold text-green-600 dark:text-green-400 leading-none">
                        +{imp.delta}
                      </span>
                      <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                        isCompleted
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {isCompleted ? `L${newLevel}` : `→L${newLevel}`}
                      </div>
                    </>
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-medium px-1 py-0.5 bg-muted/50 rounded-full leading-none">
                      Reforço
                    </span>
                  )}
                </div>

                {/* Skill info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                      {imp.skill.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{imp.skill.category}</span>
                  </div>

                  {/* Star progression */}
                  <div className="flex items-center gap-2 mt-1">
                    <StarRow level={currentLevel} size="xs" />
                    {hasGain && (
                      <>
                        <span className="text-[10px] text-muted-foreground">→</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-2.5 h-2.5 ${
                                s <= newLevel
                                  ? s <= currentLevel
                                    ? 'fill-primary text-primary'
                                    : isCompleted
                                    ? 'fill-green-500 text-green-500'
                                    : 'fill-blue-400 text-blue-400 opacity-70'
                                  : 'fill-muted text-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {LEVEL_LABELS[newLevel]}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Rationale */}
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug italic">
                    {imp.rationale}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
