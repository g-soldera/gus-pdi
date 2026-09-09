import { createPublicClient } from './client'
import type { Database } from './types'
import type { Skill, Milestone, Project, Resource, PersonalInfo, Status, SkillRequirement, MilestoneObjective, MilestoneRequirementUnlock } from '@/types/pdi'

// Type assertion helper for JSONB fields
function assertJson<T>(value: any): T | undefined {
  return value !== undefined && value !== null ? (value as T) : undefined
}

/**
 * Read-only query functions for PDI entities using Supabase public client.
 * All queries use anon key with RLS enforcement.
 * 
 * Usage:
 * ```typescript
 * const { data: skills, error } = await fetchSkills({ category: 'IA Generativa' })
 * if (error) console.error(error)
 * ```
 */

/**
 * Fetch all skills with optional filters.
 * @param options - Filter by category or type
 * @returns Array of Skill objects matching src/types/pdi.ts interface
 */
export async function fetchSkills(options?: { 
  category?: string
  type?: 'hard' | 'soft' 
}): Promise<{ data: Skill[], error: string | null }> {
  try {
    const supabase = createPublicClient()
    let query = supabase.from('skills').select('*').order('category', { ascending: true }).order('name', { ascending: true })

    if (options?.category) {
      query = query.eq('category', options.category)
    }
    if (options?.type) {
      query = query.eq('type', options.type)
    }

    const { data, error } = await query

    if (error) {
      console.error('[fetchSkills] Supabase error:', error)
      return { data: [], error: error.message }
    }

    // Map database rows to Skill interface
    const skills: Skill[] = (data || []).map((row: Database['public']['Tables']['skills']['Row']) => ({
      id: row.id,
      name: row.name,
      level: row.level,
      description: row.description,
      category: row.category,
      type: row.type as 'hard' | 'soft',
      requirements: assertJson<SkillRequirement[]>(row.requirements)
    }))

    return { data: skills, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[fetchSkills] Unexpected error:', message)
    return { data: [], error: message }
  }
}

/**
 * Fetch all milestones with optional filters.
 * @param options - Filter by status, archived flag, or phase
 * @returns Array of Milestone objects
 */
export async function fetchMilestones(options?: { 
  status?: Status
  archived?: boolean
  phase?: number | string 
}): Promise<{ data: Milestone[], error: string | null }> {
  try {
    const supabase = createPublicClient()
    let query = supabase.from('milestones').select('*').order('phase', { ascending: true }).order('archived', { ascending: true }).order('title', { ascending: true })

    if (options?.status) {
      query = query.eq('status', options.status)
    }
    if (options?.archived !== undefined) {
      query = query.eq('archived', options.archived)
    }
    if (options?.phase !== undefined) {
      query = query.eq('phase', String(options.phase))
    }

    const { data, error } = await query

    if (error) {
      console.error('[fetchMilestones] Supabase error:', error)
      return { data: [], error: error.message }
    }

    // Map database rows to Milestone interface
    const milestones: Milestone[] = (data || []).map((row: Database['public']['Tables']['milestones']['Row']) => ({
      id: row.id,
      title: row.title,
      displayName: row.display_name || undefined,
      description: row.description,
      status: row.status as Status,
      progress: row.progress,
      deadline: row.deadline,
      notes: row.notes || undefined,
      relatedSkills: row.related_skills || [],
      relatedResources: row.related_resources || [],
      archived: row.archived,
      objectives: assertJson<MilestoneObjective[]>(row.objectives),
      phase: row.phase ? (isNaN(Number(row.phase)) ? row.phase : Number(row.phase)) as any : undefined,
      unlockedRequirements: assertJson<MilestoneRequirementUnlock[]>(row.unlocked_requirements)
    }))

    return { data: milestones, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[fetchMilestones] Unexpected error:', message)
    return { data: [], error: message }
  }
}

/**
 * Fetch all projects with optional filters.
 * @param options - Filter by status
 * @returns Array of Project objects
 */
export async function fetchProjects(options?: { 
  status?: Status 
}): Promise<{ data: Project[], error: string | null }> {
  try {
    const supabase = createPublicClient()
    let query = supabase.from('projects').select('*').order('status', { ascending: true }).order('title', { ascending: true })

    if (options?.status) {
      query = query.eq('status', options.status)
    }

    const { data, error } = await query

    if (error) {
      console.error('[fetchProjects] Supabase error:', error)
      return { data: [], error: error.message }
    }

    // Map database rows to Project interface
    const projects: Project[] = (data || []).map((row: Database['public']['Tables']['projects']['Row']) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status as Status,
      impact: row.impact,
      technologies: row.technologies || [],
      relatedSkills: row.related_skills || [],
      relatedMilestones: row.related_milestones || [],
      relatedResources: row.related_resources || [],
      url: row.url || undefined
    }))

    return { data: projects, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[fetchProjects] Unexpected error:', message)
    return { data: [], error: message }
  }
}

/**
 * Fetch all resources with optional filters.
 * @param options - Filter by category or status
 * @returns Array of Resource objects
 */
export async function fetchResources(options?: { 
  category?: string
  status?: Status 
}): Promise<{ data: Resource[], error: string | null }> {
  try {
    const supabase = createPublicClient()
    let query = supabase.from('resources').select('*').order('category', { ascending: true }).order('name', { ascending: true })

    if (options?.category) {
      query = query.eq('category', options.category)
    }
    if (options?.status) {
      query = query.eq('status', options.status)
    }

    const { data, error } = await query

    if (error) {
      console.error('[fetchResources] Supabase error:', error)
      return { data: [], error: error.message }
    }

    // Map database rows to Resource interface
    const resources: Resource[] = (data || []).map((row: Database['public']['Tables']['resources']['Row']) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status as Status,
      category: row.category,
      parentCategory: row.parent_category || undefined,
      subCategory: row.sub_category || undefined,
      relatedSkills: row.related_skills || [],
      relatedMilestones: row.related_milestones || [],
      isSpecialization: row.is_specialization || undefined
    }))

    return { data: resources, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[fetchResources] Unexpected error:', message)
    return { data: [], error: message }
  }
}

/**
 * Fetch personal info singleton.
 * @returns Single PersonalInfo object or null
 */
export async function fetchPersonalInfo(): Promise<{ data: PersonalInfo | null, error: string | null }> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.from('personal_info').select('*').single()

    if (error) {
      console.error('[fetchPersonalInfo] Supabase error:', error)
      return { data: null, error: error.message }
    }

    if (!data) {
      return { data: null, error: 'No personal info found' }
    }

    // Type cast for proper TypeScript inference
    const row = data as Database['public']['Tables']['personal_info']['Row']

    // Map database row to PersonalInfo interface
    const personalInfo: PersonalInfo = {
      name: row.name,
      birthDate: (row.birth_date as string) || '1970-01-01',
      company: row.company,
      department: row.department,
      currentRole: row.current_role,
      targetRole: row.target_role,
      targetTimelineMonths: row.target_timeline_months,
      profileImage: row.profile_image || '/assets/img/profile.png',
      startDate: row.start_date || undefined,
      experienceStartDate: row.experience_start_date || undefined,
      bankStartDate: row.bank_start_date || undefined,
      timelineTarget: row.timeline_target || undefined,
      seniorTargetDate: row.senior_target_date || undefined,
      currentLevel: row.current_level as any,
      targetLevel: row.target_level as any
    }

    return { data: personalInfo, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[fetchPersonalInfo] Unexpected error:', message)
    return { data: null, error: message }
  }
}
