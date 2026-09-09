/**
 * Feature Flags System
 * 
 * Controls whether frontend uses mock data or Supabase API per entity.
 * Each entity (skills, milestones, projects, resources, personal_info) 
 * has its own environment variable toggle.
 */

export type EntityType = 'skills' | 'milestones' | 'projects' | 'resources' | 'personal_info'

/**
 * Map of entity types to their corresponding feature flag environment variables
 */
const FEATURE_FLAG_MAP: Record<EntityType, string> = {
  skills: 'NEXT_PUBLIC_FEATURE_DB_SKILLS',
  milestones: 'NEXT_PUBLIC_FEATURE_DB_MILESTONES',
  projects: 'NEXT_PUBLIC_FEATURE_DB_PROJECTS',
  resources: 'NEXT_PUBLIC_FEATURE_DB_RESOURCES',
  personal_info: 'NEXT_PUBLIC_FEATURE_DB_PERSONAL_INFO'
}

/**
 * Check if a feature flag is enabled for a specific entity type.
 * 
 * @param entity - The entity type to check
 * @returns true if the database feature is enabled for this entity, false otherwise
 * 
 * @example
 * ```typescript
 * if (isFeatureEnabled('skills')) {
 *   // Fetch from Supabase API
 * } else {
 *   // Use mock data
 * }
 * ```
 */
export function isFeatureEnabled(entity: EntityType): boolean {
  const envVar = FEATURE_FLAG_MAP[entity]
  
  if (!envVar) {
    console.warn(`[feature-flags] Unknown entity type: ${entity}`)
    return false
  }
  
  const value = process.env[envVar]
  
  // Feature is enabled if env var is explicitly set to 'true' or '1'
  return value === 'true' || value === '1'
}

/**
 * Get all feature flag statuses at once.
 * Useful for debugging and admin panels.
 */
export function getAllFeatureFlags(): Record<EntityType, boolean> {
  return {
    skills: isFeatureEnabled('skills'),
    milestones: isFeatureEnabled('milestones'),
    projects: isFeatureEnabled('projects'),
    resources: isFeatureEnabled('resources'),
    personal_info: isFeatureEnabled('personal_info')
  }
}
