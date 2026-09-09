'use client'

import React, { useState, useEffect } from 'react'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import { Navigation } from '@/app/components/Navigation'
import { ScrollToTop } from '@/app/components/ScrollToTop'
import { Hero } from '@/app/components/Hero'
import { Stats } from '@/app/components/Stats'
import { Skills } from '@/app/components/Skills'
import { Milestones } from '@/app/components/Milestones'
import { Portfolio } from '@/app/components/Portfolio'
import { Resources } from '@/app/components/Resources'
import { SkillModal } from '@/app/components/modals/SkillModal'
import { MilestoneModal } from '@/app/components/modals/MilestoneModal'
import { ResourceModal } from '@/app/components/modals/ResourceModal'
import { getPersonalInfo, getSkills, getMilestones, getProjects, getResources } from '@/data/pdiData'
import { secmlopsPath } from '@/data/secmlopsPath'
import { Skill, Milestone, Resource, Project, PersonalInfo } from '@/types/pdi'
import FeedbacksList from './FeedbacksList'

export default function PDIPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<{
    category: string
    resources: Resource[]
    selectedResourceId?: string
  } | null>(null)
  const [suspendedResourceCategory, setSuspendedResourceCategory] = useState<{
    category: string
    resources: Resource[]
    selectedResourceId?: string
  } | null>(null)
  const [suspendedMilestone, setSuspendedMilestone] = useState<Milestone | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [info, sData, mData, pData, rData] = await Promise.all([
          getPersonalInfo(),
          getSkills(),
          getMilestones(),
          getProjects(),
          getResources()
        ])
        setPersonalInfo(info)
        setSkills(sData)
        setMilestones(mData)
        setProjects(pData)
        setResources(rData)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const handleSkillClick = (skill: Skill) => {
    if (selectedResourceCategory) {
      setSuspendedResourceCategory(selectedResourceCategory)
      setSelectedResourceCategory(null)
    }
    if (selectedMilestone) {
      setSuspendedMilestone(selectedMilestone)
      setSelectedMilestone(null)
    }
    setSelectedSkill(skill)
  }

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone)
  }

  const handleResourceClick = (category: string, categoryResources: Resource[], selectedResourceId?: string) => {
    setSelectedResourceCategory({ category, resources: categoryResources, selectedResourceId })
  }

  const handleSkillClose = () => {
    setSelectedSkill(null)
    if (suspendedMilestone) {
      setSelectedMilestone(suspendedMilestone)
      setSuspendedMilestone(null)
    } else if (suspendedResourceCategory) {
      setSelectedResourceCategory(suspendedResourceCategory)
      setSuspendedResourceCategory(null)
    }
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
            const element = document.getElementById(`project-${project.id}`)
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
          onSkillClick={handleSkillClick}
          onMilestoneClick={handleMilestoneClick}
        />
        <Resources resources={resources} onResourceClick={handleResourceClick} />
      </main>

      {/* Feedbacks Section */}
      <section id="feedbacks" className="py-16 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Feedbacks Recebidos</h2>
          <FeedbacksList />
        </div>
      </section>

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
  )
}
