import React from 'react';
import { motion } from 'motion/react';
import { PersonalInfo } from '@/types/pdi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

interface CareerTimelineProps {
  info: PersonalInfo;
}

interface CareerMarker {
  id?: number;
  label: string;
  date: Date;
  type: 'main' | 'sub';
  tooltip?: string;
}

export function CareerTimeline({ info }: CareerTimelineProps) {
  const now = new Date();
  
  // Datas base
  const internshipStartDate = new Date('2023-06-07');
  const startDate = new Date(internshipStartDate);
  startDate.setMonth(startDate.getMonth() - 1); // 1 mês de folga

  const seniorDate = new Date('2028-01-01');
  const endDate = new Date('2028-02-01'); // Sobra no final

  const markers: CareerMarker[] = [
    { id: 1, label: 'Estagiário', date: internshipStartDate, type: 'main' },
    { 
      label: 'Itaú 🎉', 
      date: new Date('2024-05-05'), 
      type: 'sub', 
      tooltip: 'Data em que passei a fazer estágio no Itaú, saindo do estágio anterior.' 
    },
    { id: 2, label: 'Junior', date: new Date('2025-05-05'), type: 'main' },
    { 
      id: 3, 
      label: 'Pleno', 
      date: new Date('2026-06-07'), 
      type: 'main',
      tooltip: 'Baseado no papel desempenhado, sem ainda promoção formal.'
    },
    { id: 4, label: 'Sênior', date: seniorDate, type: 'main' },
  ];

  const totalDuration = endDate.getTime() - startDate.getTime();
  const currentProgress = Math.min(Math.max(((now.getTime() - startDate.getTime()) / totalDuration) * 100, 0), 100);

  const getMarkerPosition = (date: Date) => {
    return ((date.getTime() - startDate.getTime()) / totalDuration) * 100;
  };

  return (
    <div className="w-full py-16 px-4">
      <div className="relative h-2 bg-muted rounded-full mb-20">
        {/* Barra de Progresso Sem Gradiente */}
        <motion.div
          className="absolute h-full bg-primary rounded-full z-10"
          initial={{ width: 0 }}
          animate={{ width: `${currentProgress}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        <TooltipProvider>
          {markers.map((marker, index) => {
            const position = getMarkerPosition(marker.date);
            const isPast = marker.date <= now;
            const isMain = marker.type === 'main';
            
            // Lógica de cores conforme solicitado
            // Concluídos: Verde
            // Etapa Atual: Verde Diferente (destaque)
            // Futuro: Muted
            
            // Encontrar qual é o próximo marco para definir se este é o "atual"
            const nextMarker = markers.find(m => m.date > now);
            const isCurrentStage = nextMarker ? (markers[markers.indexOf(nextMarker) - 1] === marker) : (marker === markers[markers.length - 1]);

            return (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 z-20"
                style={{ left: `${position}%` }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help flex flex-col items-center">
                      {isMain ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`rounded-full border-2 border-background shadow-lg transition-all ${
                            isCurrentStage 
                              ? 'w-6 h-6 bg-green-400 ring-4 ring-green-400/20' 
                              : isPast ? 'w-5 h-5 bg-green-600' : 'w-5 h-5 bg-muted-foreground'
                          }`}
                        />
                      ) : (
                        <div className="w-0.5 h-8 bg-primary/40 -translate-y-1/2 mt-4" />
                      )}
                    </div>
                  </TooltipTrigger>
                  {marker.tooltip && (
                    <TooltipContent>
                      <p className="max-w-xs text-center">{marker.tooltip}</p>
                    </TooltipContent>
                  )}
                </Tooltip>

                {/* Label Superior para o número (se for principal) */}
                {isMain && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-center">
                    <span className={`text-xs font-black ${isCurrentStage ? 'text-green-500' : isPast ? 'text-green-700' : 'text-muted-foreground'}`}>
                      {marker.id}.
                    </span>
                  </div>
                )}

                {/* Label Inferior */}
                <div className={`absolute ${isMain ? 'top-8' : 'top-6'} left-1/2 -translate-x-1/2 w-max text-center`}>
                  <p className={`text-xs font-bold whitespace-nowrap ${isCurrentStage ? 'text-green-600' : isPast ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {marker.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {marker.date.toLocaleDateString('pt-BR', { month: '2-digit', year: '2-digit' })}
                  </p>
                </div>

                {/* Eu estou aqui */}
                {isCurrentStage && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                    <motion.div 
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap"
                    >
                      Eu estou aqui
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </TooltipProvider>
      </div>

      {/* Status Final */}
      <div className="text-center mt-12">
        <div className="inline-block bg-card border border-border px-6 py-4 rounded-2xl shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Objetivo atual:</p>
          <p className="text-lg font-bold text-primary">
            Assumir papel de Sênior / Techlead dentro de {Math.ceil((seniorDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} dias.
          </p>
        </div>
      </div>
    </div>
  );
}
