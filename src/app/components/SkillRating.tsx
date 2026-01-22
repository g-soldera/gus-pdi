import React from 'react';
import { Star } from 'lucide-react';
import { SkillLevel } from '@/types/pdi';

interface SkillRatingProps {
  level: SkillLevel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SkillRating({ level, size = 'md', className = '' }: SkillRatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizes[size]} ${
            star <= level 
              ? 'fill-primary text-primary' 
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}
