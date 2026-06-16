import React from 'react';
import { motion } from 'motion/react';
import { PersonalInfo } from '@/types/pdi';

interface CareerTimelineProps {
  info: PersonalInfo;
}

interface TimelineStage {
  label: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isFuture: boolean;
  isActingAs?: boolean;
}

export function CareerTimeline({ info }: CareerTimelineProps) {
  const now = new Date();
  
  // Define timeline stages com datas corretas
  const stages: TimelineStage[] = [
    {
      label: 'Estagiário',
      startDate: new Date('2023-06-07'),
      endDate: new Date('2024-05-05'),
      isActive: false,
      isFuture: false,
    },
    {
      label: 'Júnior',
      startDate: new Date('2024-05-05'),
      endDate: new Date(info.timelineTarget || '2026-06-07'),
      isActive: now >= new Date('2024-05-05') && now < new Date(info.timelineTarget || '2026-06-07'),
      isFuture: false,
    },
    {
      label: 'Pleno',
      startDate: new Date(info.timelineTarget || '2026-06-07'),
      endDate: new Date(info.seniorTargetDate || '2028-01-01'),
      isActive: now >= new Date(info.timelineTarget || '2026-06-07') && now < new Date(info.seniorTargetDate || '2028-01-01'),
      isFuture: now < new Date(info.timelineTarget || '2026-06-07'),
      isActingAs: now >= new Date(info.timelineTarget || '2026-06-07') && now < new Date(info.seniorTargetDate || '2028-01-01'),
    },
    {
      label: 'Sênior',
      startDate: new Date(info.seniorTargetDate || '2028-01-01'),
      endDate: new Date('2030-01-01'),
      isActive: false,
      isFuture: true,
    },
  ];

  const getStageColor = (stage: TimelineStage): string => {
    if (stage.isFuture) return 'bg-muted';
    if (stage.isActingAs) return 'bg-gradient-to-r from-primary to-primary-light';
    if (stage.isActive) return 'bg-primary';
    return 'bg-success';
  };

  const getStageTextColor = (stage: TimelineStage): string => {
    if (stage.isFuture) return 'text-muted-foreground';
    if (stage.isActingAs) return 'text-primary font-bold';
    if (stage.isActive) return 'text-primary font-bold';
    return 'text-success font-medium';
  };

  // Calcular progresso total da jornada (desde Jan/2023)
  const totalStart = new Date('2023-01-01').getTime();
  const totalEnd = stages[stages.length - 1].endDate.getTime();
  const currentTime = now.getTime();
  const progressPercent = Math.min(Math.max(((currentTime - totalStart) / (totalEnd - totalStart)) * 100, 0), 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 md:gap-4 lg:gap-6">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-1 flex flex-col items-center"
          >
            {/* Stage Circle */}
            <motion.div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 transition-all ${getStageColor(stage)} border-2 ${
                stage.isActingAs ? 'border-primary shadow-lg shadow-primary/30' : 'border-border'
              }`}
              animate={stage.isActingAs ? { scale: [1, 1.05, 1] } : {}}
              transition={stage.isActingAs ? { duration: 2, repeat: Infinity } : {}}
            >
              <span className={`text-xs md:text-sm font-black ${stage.isFuture ? 'text-muted-foreground' : 'text-white'}`}>
                {index + 1}
              </span>
            </motion.div>

            {/* Stage Label */}
            <div className="text-center">
              <p className={`text-xs md:text-sm ${getStageTextColor(stage)}`}>
                {stage.label}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                {stage.startDate.getFullYear()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Bar - sincronizada com os marcos (desde Jan/2023) */}
      <div className="mt-6 relative h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-success via-primary to-primary-light rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${progressPercent}%`,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Status Text */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          {stages.find(s => s.isActive)?.isActingAs
            ? 'Foco: Evolução para Sênior (Janeiro de 2028)'
            : stages.find(s => s.isActive)
            ? `Buscando Pleno • ${Math.ceil((new Date(info.timelineTarget || '2026-06-07').getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} dias restantes`
            : 'Objetivo: Sênior em Janeiro de 2028'}
        </p>
      </div>
    </div>
  );
}
