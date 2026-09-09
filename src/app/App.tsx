import React, { useState, useEffect } from 'react';
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
import { StudyPath } from './components/StudyPath';
import { getPersonalInfo, getSkills, getMilestones, getProjects, getResources } from '@/data/pdiData';
import { secmlopsPath } from '@/data/secmlopsPath';
import { Skill, Milestone, Resource, Project, PersonalInfo } from '@/types/pdi';

function AppContent() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function loadData() {
      try {
        const [infoData, skillsData, milestonesData, projectsData, resourcesData] = await Promise.all([
          getPersonalInfo(),
          getSkills(),
          getMilestones(),
          getProjects(),
          getResources()
        ]);
        setPersonalInfo(infoData);
        setSkills(skillsData);
        setMilestones(milestonesData);
        setProjects(projectsData);
        setResources(resourcesData);
      } catch (err) {
        console.error('Failed to load PDI data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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

  if (loading || !personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground font-medium">Carregando dados do Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <ScrollToTop />
      
      <main>
        <Navigation />
        <Hero info={personalInfo} />
        <Stats milestones={milestones} skills={skills} projects={projects} resources={resources} />
        <Skills 
          skills={skills} 
          projects={projects} 
          milestones={milestones} 
          onSkillClick={handleSkillClick} 
        />
        <Milestones milestones={milestones} studyPath={secmlopsPath} onMilestoneClick={handleMilestoneClick} />
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