import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  colorClass?: string;
}

export function ProgressBar({ progress, className = '', showLabel = false, colorClass = 'bg-primary' }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <span className="text-sm text-muted-foreground">{progress}%</span>
        )}
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${colorClass} rounded-full`}
        />
      </div>
    </div>
  );
}
