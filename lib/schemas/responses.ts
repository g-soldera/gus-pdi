import { z } from 'zod'

/**
 * Zod validation schemas for PDI API responses
 * Used to validate data returned from Supabase before rendering
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

// Milestone requirement unlock structure
const milestoneRequirementUnlockSchema = z.object({
  requirementId: z.string(),
  unlockedAt: z.string(),
})

/**
 * Skill response schema
 */
export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number(),
  description: z.string(),
  category: z.string(),
  type: skillTypeEnum,
  requirements: z.array(skillRequirementSchema).optional(),
})

/**
 * Milestone response schema
 */
export const milestoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  displayName: z.string().optional(),
  description: z.string(),
  status: statusEnum,
  progress: z.number().min(0).max(100),
  deadline: z.string(),
  notes: z.string().optional(),
  relatedSkills: z.array(z.string()),
  relatedResources: z.array(z.string()),
  archived: z.boolean(),
  objectives: z.array(milestoneObjectiveSchema).optional(),
  phase: z.union([z.number(), z.string()]).optional(),
  unlockedRequirements: z.array(milestoneRequirementUnlockSchema).optional(),
})

/**
 * Project response schema
 */
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: statusEnum,
  impact: z.string(),
  technologies: z.array(z.string()),
  relatedSkills: z.array(z.string()),
  relatedMilestones: z.array(z.string()),
  relatedResources: z.array(z.string()),
  url: z.string().optional(),
})

/**
 * Resource response schema
 */
export const resourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: statusEnum,
  category: z.string(),
  parentCategory: z.string().optional(),
  subCategory: z.string().optional(),
  relatedSkills: z.array(z.string()),
  relatedMilestones: z.array(z.string()),
  isSpecialization: z.boolean().optional(),
})

/**
 * Personal info response schema
 */
export const personalInfoSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  company: z.string(),
  department: z.string(),
  currentRole: z.string(),
  targetRole: z.string(),
  targetTimelineMonths: z.number(),
  profileImage: z.string(),
  startDate: z.string().optional(),
  experienceStartDate: z.string().optional(),
  bankStartDate: z.string().optional(),
  timelineTarget: z.string().optional(),
  seniorTargetDate: z.string().optional(),
  currentLevel: z.any().optional(),
  targetLevel: z.any().optional(),
})

/**
 * Array schemas for bulk validation
 */
export const skillsArraySchema = z.array(skillSchema)
export const milestonesArraySchema = z.array(milestoneSchema)
export const projectsArraySchema = z.array(projectSchema)
export const resourcesArraySchema = z.array(resourceSchema)

/**
 * Validate API response based on entity type
 */
export function validateResponse(entity: string, data: unknown): { valid: boolean; error?: string } {
  try {
    // Type guard: ensure data is defined
    if (data === null || data === undefined) {
      return { valid: false, error: 'Data is null or undefined' }
    }

    switch (entity) {
      case 'skills':
        skillsArraySchema.parse(data)
        break
      case 'milestones':
        milestonesArraySchema.parse(data)
        break
      case 'projects':
        projectsArraySchema.parse(data)
        break
      case 'resources':
        resourcesArraySchema.parse(data)
        break
      case 'personal_info':
        if (data !== null) {
          personalInfoSchema.parse(data)
        }
        break
      default:
        return { valid: false, error: `Unknown entity type: ${entity}` }
    }
    return { valid: true }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { valid: false, error: err.issues.map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`).join(', ') }
    }
    return { valid: false, error: err instanceof Error ? err.message : 'Unknown validation error' }
  }
}

export type Skill = z.infer<typeof skillSchema>
export type Milestone = z.infer<typeof milestoneSchema>
export type Project = z.infer<typeof projectSchema>
export type Resource = z.infer<typeof resourceSchema>
export type PersonalInfo = z.infer<typeof personalInfoSchema>
