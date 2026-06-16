import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Briefcase, Shield, Clock } from 'lucide-react';
import { PersonalInfo } from '@/types/pdi';
import { calculateAge, calculateDaysRemaining, calculateTimeDifference } from '@/app/utils/helpers';
import { CareerTimeline } from './CareerTimeline';

interface HeroProps {
  info: PersonalInfo;
}

export function Hero({ info }: HeroProps) {
  // Placeholder for future use if needed
  const age = calculateAge(info.birthDate);
  const experienceTime = info.experienceStartDate ? calculateTimeDifference(info.experienceStartDate) : null;
  const bankTime = info.bankStartDate ? calculateTimeDifference(info.bankStartDate) : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-lighter via-background to-background py-16 md:py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-light rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <img
                src={info.profileImage}
                alt={info.name}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary shadow-xl"
              />
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
                {info.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center md:justify-start gap-3 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full text-sm border border-border">
                <span className="text-muted-foreground">{age} anos</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full text-sm border border-border">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>{info.company}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full text-sm border border-border">
                <Shield className="w-4 h-4 text-primary" />
                <span>{info.department}</span>
              </span>
              {experienceTime && (
                <span className="inline-flex items-center gap-2 px-3 py-2 bg-primary-lighter rounded-full text-xs border border-primary/30 tooltip" title="Tempo total de experiência profissional">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">
                    {experienceTime.years > 0 && `${experienceTime.years}a `}
                    {experienceTime.months}m experiência
                  </span>
                </span>
              )}
              {bankTime && (
                <span className="inline-flex items-center gap-2 px-3 py-2 bg-primary-lighter rounded-full text-xs border border-primary/30 tooltip" title="Tempo como colaborador do Itaú Unibanco">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">
                    {bankTime.years > 0 && `${bankTime.years}a `}
                    {bankTime.months}m no Itaú
                  </span>
                </span>
              )}
            </motion.div>

            {/* Career Progression */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">Cargo Atual</p>
                  <p className="font-medium text-lg">{info.currentRole}</p>
                </div>

                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 text-primary mx-4" />
                </div>

                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">Meta</p>
                  <p className="font-medium text-lg text-primary">{info.targetRole}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Jornada de Carreira</p>
                <CareerTimeline info={info} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
