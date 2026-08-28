import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { SkillLevel } from '@/types/pdi';

interface SkillRatingProps {
  level: SkillLevel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  requirementsCount?: number;
  unlockedCount?: number;
}

export function SkillRating({ 
  level, 
  size = 'md', 
  className = '',
  requirementsCount,
  unlockedCount 
}: SkillRatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const roundedLevel = Math.round(level * 10) / 10;
  const percentage = Math.min(Math.max(((level - 1) / 4) * 100, 0), 100);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 relative">
          {[1, 2, 3, 4, 5].map((star) => {
            const fillAmount = Math.min(Math.max(level - (star - 1), 0), 1);
            return (
              <div key={star} className="relative">
                <Star className={`${sizes[size]} fill-muted text-muted`} />
                {fillAmount > 0 && (
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${fillAmount * 100}%` }}
                  >
                    <Star className={`${sizes[size]} fill-primary text-primary`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <span className="text-xs font-bold text-primary font-mono">
          {roundedLevel.toFixed(1)} / 5.0
        </span>
      </div>

      {requirementsCount !== undefined && unlockedCount !== undefined && (
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
          <CheckCircle2 className="w-3 h-3 text-emerald-500 inline" />
          <span>{unlockedCount} de {requirementsCount} conquistas</span>
        </div>
      )}
    </div>
  );
}
