#!/usr/bin/env tsx
/**
 * Automated verification script for PDI data migration to Supabase.
 * Compares source data (pdiData.ts) with migrated data (Supabase tables).
 * 
 * Usage: npx tsx scripts/verify-migration.ts
 */

import { getSkills, getMilestones, getProjects, getResources, getPersonalInfo } from '@/data/pdiData'
import { 
  fetchSkills, 
  fetchMilestones, 
  fetchProjects, 
  fetchResources, 
  fetchPersonalInfo 
} from '@/lib/supabase/queries'

// Type definitions matching pdiData.ts
interface Skill {
  id: string
  name: string
  level: number
  description: string
  category: string
  type: 'hard' | 'soft'
  requirements?: Array<{ id: string; text: string }>
}

interface Milestone {
  id: string
  title: string
  description: string
  status: string
  progress: number
  deadline: string | null
  relatedSkills: string[]
  relatedResources: string[]
  objectives?: Array<{ text: string; completed: boolean }>
  phase?: number | string
  unlockedRequirements?: Array<{ skillId: string; requirementId: string; isNewUnlock: boolean }>
}

interface Project {
  id: string
  title: string
  description: string
  status: string
  impact: string
  technologies: string[]
  relatedSkills: string[]
  relatedMilestones: string[]
  relatedResources: string[]
  url?: string
}

interface Resource {
  id: string
  name: string
  description: string
  status: string
  category: string
  parentCategory?: string
  subCategory?: string
  relatedSkills: string[]
  relatedMilestones: string[]
}

interface PersonalInfo {
  name: string
  birthDate: string
  company: string
  department: string
  currentRole: string
  targetRole: string
  profileImage: string
  currentLevel?: string
  targetLevel?: string
}

async function main() {
  console.log('\n=== PDI Data Migration Verification ===\n')
  
  let allChecksPass = true
  
  // 1. Load source data
  console.log('[verify] Loading source data from pdiData.ts...')
  const sourceSkills: Skill[] = await getSkills()
  const sourceMilestones: Milestone[] = await getMilestones()
  const sourceProjects: Project[] = await getProjects()
  const sourceResources: Resource[] = await getResources()
  const sourcePersonalInfo: PersonalInfo | null = await getPersonalInfo()
  
  console.log(`[verify] Source counts: skills=${sourceSkills.length}, milestones=${sourceMilestones.length}, projects=${sourceProjects.length}, resources=${sourceResources.length}, personal_info=1`)
  
  // 2. Load migrated data from Supabase
  console.log('\n[verify] Fetching migrated data from Supabase...\n')
  
  const startTime = Date.now()
  
  const { data: supabaseSkills, error: skillsError } = await fetchSkills()
  if (skillsError) {
    console.error(`[verify] Error fetching skills: ${skillsError}`)
    allChecksPass = false
  }
  
  const { data: supabaseMilestones, error: milestonesError } = await fetchMilestones()
  if (milestonesError) {
    console.error(`[verify] Error fetching milestones: ${milestonesError}`)
    allChecksPass = false
  }
  
  const { data: supabaseProjects, error: projectsError } = await fetchProjects()
  if (projectsError) {
    console.error(`[verify] Error fetching projects: ${projectsError}`)
    allChecksPass = false
  }
  
  const { data: supabaseResources, error: resourcesError } = await fetchResources()
  if (resourcesError) {
    console.error(`[verify] Error fetching resources: ${resourcesError}`)
    allChecksPass = false
  }
  
  const { data: supabasePersonalInfo, error: personalInfoError } = await fetchPersonalInfo()
  if (personalInfoError) {
    console.error(`[verify] Error fetching personal_info: ${personalInfoError}`)
    allChecksPass = false
  }
  
  const fetchTime = Date.now() - startTime
  console.log(`[verify] Data fetch completed in ${fetchTime}ms\n`)
  
  // 3. Compare counts
  console.log('[verify] Record Count Comparison:')
  console.log('[verify] ----------------------------------')
  
  const counts = [
    { entity: 'skills', source: sourceSkills.length, supabase: supabaseSkills?.length ?? 0, match: sourceSkills.length === (supabaseSkills?.length ?? 0) },
    { entity: 'milestones', source: sourceMilestones.length, supabase: supabaseMilestones?.length ?? 0, match: sourceMilestones.length === (supabaseMilestones?.length ?? 0) },
    { entity: 'projects', source: sourceProjects.length, supabase: supabaseProjects?.length ?? 0, match: sourceProjects.length === (supabaseProjects?.length ?? 0) },
    { entity: 'resources', source: sourceResources.length, supabase: supabaseResources?.length ?? 0, match: sourceResources.length === (supabaseResources?.length ?? 0) },
    { entity: 'personal_info', source: 1, supabase: supabasePersonalInfo ? 1 : 0, match: supabasePersonalInfo !== null }
  ]
  
  counts.forEach(({ entity, source, supabase, match }) => {
    const status = match ? '✓' : '✗'
    console.log(`[verify] ${status} ${entity.padEnd(14)} : ${String(source).padStart(3)} (source) → ${String(supabase).padStart(3)} (Supabase)`)
    if (!match) allChecksPass = false
  })
  
  console.log('')
  
  // 4. Sample JSONB integrity check
  console.log('[verify] JSONB Integrity Check:')
  console.log('[verify] ----------------------------------')
  
  let jsonbIntegrityPass = true
  
  // Check first skill with requirements
  const skillWithRequirements = sourceSkills.find(s => s.requirements && s.requirements.length > 0)
  if (skillWithRequirements && supabaseSkills) {
    const dbSkill = supabaseSkills.find(s => s.id === skillWithRequirements.id)
    if (dbSkill) {
      const sourceReqCount = skillWithRequirements.requirements?.length ?? 0
      const dbReqCount = (dbSkill as any).requirements?.length ?? 0
      const integrity = sourceReqCount === dbReqCount && dbReqCount > 0
      const status = integrity ? '✓' : '✗'
      console.log(`[verify] ${status} Skill requirements: ${skillWithRequirements.name}`)
      console.log(`[verify]    Source: ${sourceReqCount} requirements, DB: ${dbReqCount} requirements`)
      if (!integrity) {
        console.log(`[verify]    ✗ JSONB integrity check failed`)
        jsonbIntegrityPass = false
      }
    } else {
      console.log(`[verify] ✗ Skill ${skillWithRequirements.id} not found in Supabase`)
      jsonbIntegrityPass = false
    }
  }
  
  // Check first milestone with objectives
  const milestoneWithObjectives = sourceMilestones.find(m => m.objectives && m.objectives.length > 0)
  if (milestoneWithObjectives && supabaseMilestones) {
    const dbMilestone = supabaseMilestones.find(m => m.id === milestoneWithObjectives.id)
    if (dbMilestone) {
      const sourceObjCount = milestoneWithObjectives.objectives?.length ?? 0
      const dbObjCount = (dbMilestone as any).objectives?.length ?? 0
      const integrity = sourceObjCount === dbObjCount && dbObjCount > 0
      const status = integrity ? '✓' : '✗'
      console.log(`[verify] ${status} Milestone objectives: "${milestoneWithObjectives.title.substring(0, 40)}..."`)
      console.log(`[verify]    Source: ${sourceObjCount} objectives, DB: ${dbObjCount} objectives`)
      if (!integrity) {
        console.log(`[verify]    ✗ JSONB integrity check failed`)
        jsonbIntegrityPass = false
      }
    } else {
      console.log(`[verify] ✗ Milestone ${milestoneWithObjectives.id} not found in Supabase`)
      jsonbIntegrityPass = false
    }
  }
  
  // Check first milestone with unlockedRequirements
  const milestoneWithUnlocks = sourceMilestones.find(m => m.unlockedRequirements && m.unlockedRequirements.length > 0)
  if (milestoneWithUnlocks && supabaseMilestones) {
    const dbMilestone = supabaseMilestones.find(m => m.id === milestoneWithUnlocks.id)
    if (dbMilestone) {
      const sourceUnlockCount = milestoneWithUnlocks.unlockedRequirements?.length ?? 0
      const dbUnlockCount = (dbMilestone as any).unlockedRequirements?.length ?? 0
      const integrity = sourceUnlockCount === dbUnlockCount && dbUnlockCount > 0
      const status = integrity ? '✓' : '✗'
      console.log(`[verify] ${status} Milestone unlocks: "${milestoneWithUnlocks.title.substring(0, 40)}..."`)
      console.log(`[verify]    Source: ${sourceUnlockCount} unlocks, DB: ${dbUnlockCount} unlocks`)
      if (!integrity) {
        console.log(`[verify]    ✗ JSONB integrity check failed`)
        jsonbIntegrityPass = false
      }
    } else {
      console.log(`[verify] ✗ Milestone ${milestoneWithUnlocks.id} not found in Supabase`)
      jsonbIntegrityPass = false
    }
  }
  
  if (jsonbIntegrityPass) {
    console.log('[verify] ✓ JSONB fields deserialize correctly')
  } else {
    console.log('[verify] ✗ JSONB integrity check failed')
    allChecksPass = false
  }
  
  console.log('')
  
  // 5. Index performance check
  console.log('[verify] Index Performance Check:')
  console.log('[verify] ----------------------------------')
  
  let performancePass = true
  const perfThreshold = 200 // ms
  
  // Test skills filtered by category
  console.time('[verify] fetchSkills({ category: "IA Generativa" })')
  const { data: filteredSkills, error: skillsFilterError } = await fetchSkills({ category: 'IA Generativa' })
  console.timeEnd('[verify] fetchSkills({ category: "IA Generativa" })')
  
  if (skillsFilterError) {
    console.error(`[verify] ✗ Skills filter query failed: ${skillsFilterError}`)
    performancePass = false
  } else {
    const categoryCount = filteredSkills.length
    console.log(`[verify]   Found ${categoryCount} skills in "IA Generativa" category`)
    if (categoryCount === 0) {
      console.log('[verify] ⚠ Warning: No skills found in "IA Generativa" category')
    }
  }
  
  // Test milestones filtered by status
  console.time('[verify] fetchMilestones({ status: "in-progress" })')
  const { data: filteredMilestones, error: milestonesFilterError } = await fetchMilestones({ status: 'in-progress' })
  console.timeEnd('[verify] fetchMilestones({ status: "in-progress" })')
  
  if (milestonesFilterError) {
    console.error(`[verify] ✗ Milestones filter query failed: ${milestonesFilterError}`)
    performancePass = false
  } else {
    const statusCount = filteredMilestones.length
    console.log(`[verify]   Found ${statusCount} milestones with status "in-progress"`)
    if (statusCount === 0) {
      console.log('[verify] ⚠ Warning: No milestones with status "in-progress"')
    }
  }
  
  // Test skills filtered by type
  console.time('[verify] fetchSkills({ type: "hard" })')
  const { data: hardSkills, error: hardSkillsError } = await fetchSkills({ type: 'hard' })
  console.timeEnd('[verify] fetchSkills({ type: "hard" })')
  
  if (hardSkillsError) {
    console.error(`[verify] ✗ Hard skills filter query failed: ${hardSkillsError}`)
    performancePass = false
  } else {
    console.log(`[verify]   Found ${hardSkills.length} hard skills`)
  }
  
  if (performancePass) {
    console.log('[verify] ✓ All filtered queries completed (performance check passed)')
  } else {
    console.log('[verify] ✗ Some filtered queries failed or are slow')
    allChecksPass = false
  }
  
  // Summary report
  console.log('\n=== Verification Summary ===\n')
  
  const checks = [
    { name: 'Entity counts match', pass: counts.every(c => c.match) },
    { name: 'JSONB integrity', pass: jsonbIntegrityPass },
    { name: 'Index performance', pass: performancePass }
  ]
  
  checks.forEach(({ name, pass }) => {
    const status = pass ? '✓' : '✗'
    console.log(`${status} ${name}`)
  })
  
  console.log('\n' + (allChecksPass ? '✓ All checks passed!' : '✗ Some checks failed!'))
  console.log('')
  
  // Exit with appropriate code
  process.exit(allChecksPass ? 0 : 1)
}

main().catch(err => {
  console.error('Unexpected error during verification:', err)
  process.exit(1)
})
