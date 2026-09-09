import { z } from 'zod'

/**
 * Zod validation schemas for PDI CRUD operations
 * Supports all entity types: skills, milestones, projects, resources, personal_info
 */

const statusEnum = z.enum(['completed', 'in-progress', 'not-started', 'deprioritized', 'planned'])
const skillTypeEnum = z.enum(['hard', 'soft'])

// Skill requirement structure
const skillRequirementSchema = z.object({
  id: z.string(),
  text: z.string(),
})

// Milestone objective structure
const milestoneObjectiveSchema = z.object({
  text: z.string(),
  completed: z.boolean(),
  completionJustification: z.string().optional(),
})

/**
 * Schema for creating new PDI entities
 * Supports skills, milestones, projects, resources, personal_info
 */
export const pdiCreateSchema = z.object({
  // Common fields
  name: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: statusEnum.optional(),
  
  // Skill-specific fields
  level: z.number().optional(),
  category: z.string().optional(),
  type: skillTypeEnum.optional(),
  requirements: z.array(skillRequirementSchema).optional(),
  
  // Milestone-specific fields
  display_name: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  deadline: z.string().optional(),
  notes: z.string().optional(),
  phase: z.union([z.number(), z.string()]).optional(),
  archived: z.boolean().optional(),
  objectives: z.array(milestoneObjectiveSchema).optional(),
  related_skills: z.array(z.string()).optional(),
  related_resources: z.array(z.string()).optional(),
  unlocked_requirements: z.any().optional(),
  
  // Project-specific fields
  impact: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  related_milestones: z.array(z.string()).optional(),
  url: z.string().optional(),
  
  // Resource-specific fields
  parent_category: z.string().optional(),
  sub_category: z.string().optional(),
  image: z.string().optional(),
  is_specialization: z.boolean().optional(),
  
  // Personal info-specific fields
  birth_date: z.string().optional(),
  start_date: z.string().optional(),
  experience_start_date: z.string().optional(),
  bank_start_date: z.string().optional(),
  company: z.string().optional(),
  department: z.string().optional(),
  current_role: z.string().optional(),
  target_role: z.string().optional(),
  target_timeline_months: z.number().optional(),
  profile_image: z.string().optional(),
  timeline_target: z.string().optional(),
  senior_target_date: z.string().optional(),
  current_level: z.string().optional(),
  target_level: z.string().optional(),
})

/**
 * Schema for updating existing PDI entities
 * All fields are optional to support partial updates
 */
export const pdiUpdateSchema = pdiCreateSchema.partial()

export type PdiCreateInput = z.infer<typeof pdiCreateSchema>
export type PdiUpdateInput = z.infer<typeof pdiUpdateSchema>
