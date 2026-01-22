import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Skills } from './components/Skills';
import { Milestones } from './components/Milestones';
import { Portfolio } from './components/Portfolio';
import { Resources } from './components/Resources';
import { SkillModal } from './components/modals/SkillModal';
import { MilestoneModal } from './components/modals/MilestoneModal';
import { ResourceModal } from './components/modals/ResourceModal';
import { personalInfo, skills, milestones, projects, resources } from '@/data/pdiData';
import { Skill, Milestone, Resource } from '@/types/pdi';

function AppContent() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<{
    category: string;
    resources: Resource[];
    selectedResourceId?: string;
  } | null>(null);
  const [suspendedResourceCategory, setSuspendedResourceCategory] = useState<{
    category: string;
    resources: Resource[];
    selectedResourceId?: string;
  } | null>(null);
  const [suspendedMilestone, setSuspendedMilestone] = useState<Milestone | null>(null);

  const handleSkillClick = (skill: Skill) => {
    if (selectedResourceCategory) {
      setSuspendedResourceCategory(selectedResourceCategory);
      setSelectedResourceCategory(null);
    }
    if (selectedMilestone) {
      setSuspendedMilestone(selectedMilestone);
      setSelectedMilestone(null);
    }
    setSelectedSkill(skill);
  };

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
  };

  const handleResourceClick = (category: string, categoryResources: Resource[], selectedResourceId?: string) => {
    setSelectedResourceCategory({ category, resources: categoryResources, selectedResourceId });
  };

  const handleSkillClose = () => {
    setSelectedSkill(null);
    if (suspendedMilestone) {
      setSelectedMilestone(suspendedMilestone);
      setSuspendedMilestone(null);
    } else if (suspendedResourceCategory) {
      setSelectedResourceCategory(suspendedResourceCategory);
      setSuspendedResourceCategory(null);
    }
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <ScrollToTop />
      
      <main>
        <Navigation />
        <Hero info={personalInfo} />
        <Stats milestones={milestones} skills={skills} projects={projects} resources={resources} />
        <Skills skills={skills} onSkillClick={handleSkillClick} />
        <Milestones milestones={milestones} onMilestoneClick={handleMilestoneClick} />
        <Portfolio 
          projects={projects} 
          skills={skills}
          milestones={milestones}
          onProjectClick={(project) => {
            // When clicking a project, scroll to it
            const element = document.getElementById(`project-${project.id}`);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          onSkillClick={handleSkillClick}
          onMilestoneClick={handleMilestoneClick}
        />
        <Resources resources={resources} onResourceClick={handleResourceClick} />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            PDI {new Date().getFullYear()} - {personalInfo.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Plano de Desenvolvimento Individual - Atualizado em {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SkillModal
        skill={selectedSkill}
        isOpen={!!selectedSkill}
        onClose={handleSkillClose}
        allMilestones={milestones}
        allResources={resources}
        allProjects={projects}
        onResourceClick={handleResourceClick}
      />

      <MilestoneModal
        milestone={selectedMilestone}
        isOpen={!!selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        allSkills={skills}
        allResources={resources}
        onSkillClick={handleSkillClick}
        onResourceClick={handleResourceClick}
      />

      <ResourceModal
        category={selectedResourceCategory?.category || ''}
        resources={selectedResourceCategory?.resources || []}
        selectedResourceId={selectedResourceCategory?.selectedResourceId}
        isOpen={!!selectedResourceCategory}
        onClose={() => setSelectedResourceCategory(null)}
        allSkills={skills}
        allMilestones={milestones}
        onSkillClick={handleSkillClick}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}