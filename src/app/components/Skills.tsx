import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Skill } from '@/types/pdi';
import { SkillRating } from './SkillRating';

interface SkillsProps {
  skills: Skill[];
  onSkillClick: (skill: Skill) => void;
}

export function Skills({ skills, onSkillClick }: SkillsProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'hard' | 'soft'>('hard');

  const hardSkills = skills.filter(s => s.type === 'hard');
  const softSkills = skills.filter(s => s.type === 'soft');

  const currentSkills = activeTab === 'hard' ? hardSkills : softSkills;

  // Group skills by category
  const categories = currentSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Handle deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('skill-')) {
      const skillId = hash.replace('skill-', '');
      const skill = skills.find(s => s.id === skillId);
      if (skill) {
        // Set the correct tab
        setActiveTab(skill.type);
        // Expand the category
        setExpandedCategories(prev => new Set(prev).add(skill.category));
        // Scroll to element
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [skills]);

  return (
    <section id="skills" className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">Competências & Habilidades</h2>
          <p className="text-muted-foreground">
            Conjunto completo de hard skills e soft skills desenvolvidas
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-card border border-border rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('hard')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'hard'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Hard Skills ({hardSkills.length})
            </button>
            <button
              onClick={() => setActiveTab('soft')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'soft'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Soft Skills ({softSkills.length})
            </button>
          </div>
        </div>

        {/* Categories Accordion */}
        <div className="space-y-4">
          {Object.entries(categories).map(([category, categorySkills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-5 hover:bg-accent/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-lg">{category}</h3>
                  <span className="text-sm text-muted-foreground">
                    ({categorySkills.length})
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedCategories.has(category) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedCategories.has(category) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categorySkills.map(skill => (
                        <motion.button
                          key={skill.id}
                          id={`skill-${skill.id}`}
                          onClick={() => onSkillClick(skill)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all text-left group"
                        >
                          <div className="flex-1 min-w-0 mr-3">
                            <div className="font-medium mb-1 group-hover:text-primary transition-colors">
                              {skill.name}
                            </div>
                            <SkillRating level={skill.level} size="sm" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
