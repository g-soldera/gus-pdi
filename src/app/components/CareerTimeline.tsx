import React from 'react';
import { motion } from 'motion/react';
import { PersonalInfo } from '@/types/pdi';

interface CareerTimelineProps {
  info: PersonalInfo;
}

interface CareerMarker {
  label: string;
  date: Date;
  type: 'career' | 'goal';
}

export function CareerTimeline({ info }: CareerTimelineProps) {
  const now = new Date();
  
  // Datas base conforme solicitado
  const startDate = new Date('2023-06-07'); // Início estágio
  const seniorDate = new Date('2028-01-01'); // Objetivo Sênior
  const endDate = new Date('2028-02-01'); // Sobra no final para não ficar estranho

  const markers: CareerMarker[] = [
    { label: 'Início Estágio', date: new Date('2023-06-07'), type: 'career' },
    { label: 'Entrada Itaú', date: new Date('2024-05-05'), type: 'career' },
    { label: 'Efetivado Júnior', date: new Date('2025-05-05'), type: 'career' },
    { label: 'Feedback Pleno', date: new Date('2026-06-07'), type: 'career' },
    { label: 'Objetivo Sênior', date: new Date('2028-01-01'), type: 'goal' },
  ];

  // Cálculo de progresso total na barra
  const totalDuration = endDate.getTime() - startDate.getTime();
  const currentProgress = Math.min(Math.max(((now.getTime() - startDate.getTime()) / totalDuration) * 100, 0), 100);

  const getMarkerPosition = (date: Date) => {
    return ((date.getTime() - startDate.getTime()) / totalDuration) * 100;
  };

  return (
    <div className="w-full py-12 px-2">
      <div className="relative h-3 bg-muted rounded-full mb-16">
        {/* Barra de Progresso Principal */}
        <motion.div
          className="absolute h-full bg-gradient-to-r from-orange-500 via-primary to-primary-light rounded-full z-10"
          initial={{ width: 0 }}
          animate={{ width: `${currentProgress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Marcadores na Barra */}
        {markers.map((marker, index) => {
          const position = getMarkerPosition(marker.date);
          const isPast = marker.date <= now;
          const isSenior = marker.type === 'goal';
          
          return (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 z-20"
              style={{ left: `${position}%` }}
            >
              {/* Ponto na barra */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className={`w-4 h-4 rounded-full border-2 border-background shadow-md transition-colors ${
                  isSenior 
                    ? 'bg-yellow-500 ring-2 ring-yellow-500/20' 
                    : isPast ? 'bg-orange-600' : 'bg-muted-foreground'
                }`}
                title={`${marker.label}: ${marker.date.toLocaleDateString('pt-BR')}`}
              />

              {/* Label e Data */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-max text-center">
                <p className={`text-[10px] md:text-xs font-bold whitespace-nowrap ${isPast ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {marker.label}
                </p>
                <p className="text-[9px] md:text-[10px] text-muted-foreground font-medium">
                  {marker.date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })}
                </p>
              </div>

              {/* Marcação especial para o momento atual se estiver próximo */}
              {isPast && index < markers.length - 1 && markers[index+1].date > now && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                   <div className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded-full border border-primary/20 whitespace-nowrap">
                      Você está aqui
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status Final */}
      <div className="text-center mt-8">
        <p className="text-sm font-medium text-muted-foreground bg-muted/30 py-2 px-4 rounded-full inline-block">
          {now < seniorDate 
            ? `Jornada para Sênior: ${Math.ceil((seniorDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} dias restantes`
            : 'Objetivo Sênior alcançado! 🚀'}
        </p>
      </div>
    </div>
  );
}
