import React, { useEffect, useMemo, useState } from 'react';
import { Resource, Skill, Milestone } from '@/types/pdi';
import { Modal } from './Modal';
import { StatusBadge } from '../StatusBadge';
import { Code, Target, BookOpen } from 'lucide-react';

interface ResourceModalProps {
  category: string;
  resources: Resource[];
  selectedResourceId?: string;
  isOpen: boolean;
  onClose: () => void;
  allSkills: Skill[];
  allMilestones: Milestone[];
  onSkillClick: (skill: Skill) => void;
}

export function ResourceModal({ 
  category, 
  resources, 
  selectedResourceId,
  isOpen, 
  onClose, 
  allSkills, 
  allMilestones,
  onSkillClick
}: ResourceModalProps) {
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  // Get all related skills and milestones for the category
  const relatedSkillIds = new Set(resources.flatMap(r => r.relatedSkills));
  const relatedMilestoneIds = new Set(resources.flatMap(r => r.relatedMilestones));

  const relatedSkills = allSkills.filter(s => relatedSkillIds.has(s.id));
  const relatedMilestones = allMilestones.filter(m => relatedMilestoneIds.has(m.id));

  const subGroups = useMemo(() => {
    const groups: Record<string, Resource[]> = {};
    resources.forEach(r => {
      const key = r.category || 'Geral';
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    return groups;
  }, [resources]);

  const defaultSub = hoveredSub;
  const currentList = defaultSub ? subGroups[defaultSub] || [] : [];

  // Scroll to highlighted resource when modal opens
  useEffect(() => {
    if (!selectedResourceId) return;
    const el = document.getElementById(`resource-${selectedResourceId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedResourceId]);

  useEffect(() => {
    if (selectedResourceId) {
      const found = resources.find(r => r.id === selectedResourceId);
      if (found && found.category) {
        setHoveredSub(found.category);
      }
    } else {
      setHoveredSub(null);
    }
  }, [selectedResourceId, resources, subGroups]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={category}>
      <div className="p-6 space-y-6">
        {/* Resources List grouped by subcategory */}
        <div>
          <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <BookOpen className="w-4 h-4" />
            {category} ({resources.length})
          </h3>

          {/* Subcategory pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(subGroups).map(sub => (
              <button
                key={sub}
                onClick={() => setHoveredSub(hoveredSub === sub ? null : sub)}
                className={`px-3 py-2 rounded-full text-sm border transition-colors ${
                  hoveredSub === sub
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-muted/50 border-border text-foreground hover:border-primary'
                }`}
              >
                {sub} ({subGroups[sub].length})
              </button>
            ))}
          </div>

          {/* Items of selected subcategory */}
          <div className="space-y-3">
            {currentList.map(resource => {
              const isHighlighted = selectedResourceId === resource.id;
              return (
                <div
                  key={resource.id}
                  className={`flex gap-4 p-3 bg-muted/30 border rounded-lg ${isHighlighted ? 'border-primary ring-2 ring-primary/40' : 'border-border'}`}
                  id={`resource-${resource.id}`}
                >
                  {resource.image && (
                    <img
                      src={resource.image}
                      alt={resource.name}
                      className="w-20 h-28 object-cover rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium">{resource.name}</h4>
                      <StatusBadge status={resource.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Skills */}
        {relatedSkills.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Code className="w-4 h-4" />
              Skills Relacionadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedSkills.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => onSkillClick(skill)}
                  className="p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group border border-transparent hover:border-primary text-left"
                >
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {skill.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Milestones */}
        {relatedMilestones.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Target className="w-4 h-4" />
              Marcos Relacionados
            </h3>
            <div className="space-y-2">
              {relatedMilestones.map(milestone => (
                <a
                  key={milestone.id}
                  href={`#milestone-${milestone.id}`}
                  onClick={onClose}
                  className="block p-3 bg-muted/50 rounded-lg hover:border-primary hover:ring-2 hover:ring-primary/40 border border-transparent transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {milestone.title}
                    </div>
                    <StatusBadge status={milestone.status} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {milestone.progress}% completo
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
