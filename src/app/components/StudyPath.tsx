import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle2, Loader, Circle, Target, ChevronDown } from 'lucide-react';
import { StudyTopic } from '@/types/pdi';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

interface StudyPathProps {
  studyPath: StudyTopic[];
}

export function StudyPath({ studyPath }: StudyPathProps) {
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const getStatusIcon = (progress: number) => {
    if (progress === 100) return CheckCircle2;
    if (progress > 0) return Loader;
    return Circle;
  };

  const getStatus = (progress: number) => {
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'not-started';
  };

  return (
    <section id="study-path" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3 font-black tracking-tight">Trilha de Estudos: AI Security</h2>
          <p className="text-muted-foreground">
            Caminho de aprendizado para a especialização em SecMLOps e AI Security
          </p>
        </motion.div>

        <div className="space-y-8">
          {Object.values(studyPath.reduce((acc, topic) => {
            if (!acc[topic.category]) {
              acc[topic.category] = { category: topic.category, topics: [] };
            }
            acc[topic.category].topics.push(topic);
            return acc;
          }, {} as Record<string, { category: string; topics: StudyTopic[] }>)).map((catGroup, catIndex) => (
            <motion.div
              key={catGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-card border border-border rounded-xl shadow-lg"
            >
              <button
                onClick={() => toggleCategory(catGroup.category)}
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
              >
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                  {catGroup.category}
                </h3>
                <ChevronDown className={`w-5 h-5 transition-transform ${openCategories[catGroup.category] ? 'rotate-180' : ''}`} />
              </button>
              {openCategories[catGroup.category] && (
                <div className="p-6 border-t border-border">
                  <ul className="space-y-4">
                    {catGroup.topics.map((topic, topicIndex) => {
                      const StatusIcon = getStatusIcon(topic.progress);
                      const statusText = getStatus(topic.progress);
                      return (
                        <motion.li
                          key={topic.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: topicIndex * 0.05 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <StatusIcon className={`w-5 h-5 text-[var(--${statusText})]`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium">{topic.name}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{topic.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <Target className="w-4 h-4" />
                              <span>Milestones: {topic.relatedMilestones.map(m => `#${m}`).join(', ')}</span>
                            </div>
                            <ProgressBar progress={topic.progress} />
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
