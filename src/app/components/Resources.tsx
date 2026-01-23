import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Book, Award, Users, GraduationCap } from 'lucide-react';
import { Resource } from '@/types/pdi';
import { StatusBadge } from './StatusBadge';

interface ResourcesProps {
  resources: Resource[];
  onResourceClick: (category: string, categoryResources: Resource[], selectedResourceId?: string) => void;
}

// Sub-componente para card de recurso no tooltip
function ResourceCardPreview({ resource }: { resource: Resource }) {
  const getIcon = () => {
    const category = resource.parentCategory || resource.category;
    switch (category) {
      case 'Certificação':
        return { Icon: Award, bg: 'bg-success-light', color: 'text-[var(--completed)]' };
      case 'Mentoria':
        return { Icon: Users, bg: 'bg-info-light', color: 'text-[var(--info)]' };
      case 'Curso':
        return { Icon: GraduationCap, bg: 'bg-primary-lighter', color: 'text-primary' };
      case 'Livros':
      default:
        return { Icon: Book, bg: 'bg-warning-light', color: 'text-[var(--warning)]' };
    }
  };

  const { Icon, bg, color } = getIcon();

  return (
    <div className="flex flex-col items-center text-center p-2">
      <div className="w-16 h-20 mb-2">
        {resource.image ? (
          <img 
            src={resource.image} 
            alt={resource.name}
            className="w-16 h-20 object-cover rounded shadow-md"
          />
        ) : (
          <div className={`w-16 h-20 rounded flex items-center justify-center ${bg}`}>
            <Icon className={`w-7 h-7 ${color}`} />
          </div>
        )}
      </div>
      <p className="text-xs font-medium line-clamp-2 mb-1">{resource.name}</p>
      <div className="flex items-center gap-1">
        <StatusBadge status={resource.status} />
      </div>
    </div>
  );
}

export function Resources({ resources, onResourceClick }: ResourcesProps) {
  // Group by parentCategory -> subCategory
  const parentGroups = resources.reduce((acc, resource) => {
    const parent = resource.parentCategory || resource.category;
    if (!acc[parent]) acc[parent] = {} as Record<string, Resource[]>;
    const sub = resource.category;
    if (!acc[parent][sub]) acc[parent][sub] = [];
    acc[parent][sub].push(resource);
    return acc;
  }, {} as Record<string, Record<string, Resource[]>>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Livros':
        return Book;
      case 'Certificação':
        return Award;
      case 'Mentoria':
        return Users;
      case 'Curso':
        return GraduationCap;
      default:
        return Book;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Livros':
        return { bg: 'bg-warning-light', text: 'text-[var(--warning)]' };
      case 'Certificação':
        return { bg: 'bg-success-light', text: 'text-[var(--completed)]' };
      case 'Mentoria':
        return { bg: 'bg-info-light', text: 'text-[var(--info)]' };
      case 'Curso':
        return { bg: 'bg-primary-lighter', text: 'text-primary' };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground' };
    }
  };

  // Handle deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('resource-')) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, []);

  return (
    <section id="resources" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">Recursos de Aprendizado</h2>
          <p className="text-muted-foreground">
            Biblioteca de conhecimento e materiais de desenvolvimento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(parentGroups).map(([parentCategory, subCategories], index) => {
            const flatResources = Object.values(subCategories).flat();
            const Icon = getCategoryIcon(parentCategory);
            const colors = getCategoryColor(parentCategory);
            const completedCount = flatResources.filter(r => r.status === 'completed').length;
            const totalCount = flatResources.length;

            return (
              <div key={parentCategory} className="relative">
                <motion.button
                  id={`resource-${parentCategory.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onResourceClick(parentCategory, flatResources)}
                  whileHover={{ y: -8 }}
                  className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary transition-all text-left w-full"
                >
                <div className={`inline-flex p-4 rounded-xl ${colors.bg} mb-4`}>
                  <Icon className={`w-8 h-8 ${colors.text}`} />
                </div>

                <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {parentCategory}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {totalCount} {totalCount === 1 ? 'recurso' : 'recursos'}
                </p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progresso</span>
                    <span>{completedCount}/{totalCount}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(completedCount / totalCount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>

                </motion.button>
                {/* Sem hover: conteúdo detalhado apenas no modal */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
