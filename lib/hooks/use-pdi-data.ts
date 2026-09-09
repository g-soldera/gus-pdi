'use client'

import { useState, useEffect } from 'react'
import { isFeatureEnabled, type EntityType } from '@/lib/feature-flags'
import { 
  fetchSkills, 
  fetchMilestones, 
  fetchProjects, 
  fetchResources, 
  fetchPersonalInfo 
} from '@/lib/supabase/queries'
import { 
  getSkills, 
  getMilestones, 
  getProjects, 
  getResources, 
  getPersonalInfo 
} from '@/src/data/pdiData'
import { validateResponse } from '@/lib/schemas/responses'
import type { Skill, Milestone, Project, Resource, PersonalInfo } from '@/types/pdi'

type EntityData = Skill[] | Milestone[] | Project[] | Resource[] | PersonalInfo | null

interface UsePDIDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  source: 'api' | 'mock' | 'fallback'
}

/**
 * Hybrid data fetching hook with feature flag routing and automatic fallback.
 * 
 * - If feature flag is disabled: returns mock data
 * - If feature flag is enabled: attempts API fetch
 * - If API fetch fails: automatically falls back to mock data with warning
 * 
 * @param entity - The entity type to fetch
 * @returns Hook result with data, loading state, error, and source indicator
 * 
 * @example
 * ```typescript
 * const { data: skills, loading, error, source } = usePDIData('skills')
 * 
 * if (loading) return <Spinner />
 * if (source === 'fallback') console.warn('Using fallback data')
 * return <SkillList skills={skills} />
 * ```
 */
export function usePDIData<T extends EntityData>(
  entity: EntityType
): UsePDIDataResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'api' | 'mock' | 'fallback'>('mock')

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        // Check feature flag
        const useAPI = isFeatureEnabled(entity)

        if (!useAPI) {
          // Feature flag disabled - use mock data
          const mockData = await fetchMockData(entity)
          if (isMounted) {
            setData(mockData as T)
            setSource('mock')
            setLoading(false)
          }
          return
        }

        // Feature flag enabled - try API
        const apiResult = await fetchAPIData(entity)

        if (apiResult.error || !apiResult.data) {
          // API failed - fall back to mock data
          console.warn(
            `[usePDIData] API fetch failed for ${entity}: ${apiResult.error}. Falling back to mock data.`
          )
          const mockData = await fetchMockData(entity)
          if (isMounted) {
            setData(mockData as T)
            setSource('fallback')
            setLoading(false)
          }
          return
        }

        // Validate API response against Zod schema (T-05-02 mitigation)
        const validation = validateResponse(entity, apiResult.data)
        if (!validation.valid) {
          console.warn(
            `[usePDIData] API response validation failed for ${entity}: ${validation.error}. Falling back to mock data.`
          )
          const mockData = await fetchMockData(entity)
          if (isMounted) {
            setData(mockData as T)
            setSource('fallback')
            setLoading(false)
          }
          return
        }

        // API success and validated
        if (isMounted) {
          setData(apiResult.data as T)
          setSource('api')
          setLoading(false)
        }
      } catch (err) {
        // Unexpected error - fall back to mock data
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error(`[usePDIData] Unexpected error for ${entity}:`, errorMessage)
        
        try {
          const mockData = await fetchMockData(entity)
          if (isMounted) {
            setData(mockData as T)
            setSource('fallback')
            setError(null) // Clear error since we have fallback data
            setLoading(false)
          }
        } catch (fallbackErr) {
          // Even fallback failed
          if (isMounted) {
            setError(errorMessage)
            setLoading(false)
          }
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [entity])

  return { data, loading, error, source }
}

/**
 * Fetch data from Supabase API based on entity type
 */
async function fetchAPIData(
  entity: EntityType
): Promise<{ data: EntityData, error: string | null }> {
  switch (entity) {
    case 'skills':
      return await fetchSkills()
    case 'milestones':
      return await fetchMilestones()
    case 'projects':
      return await fetchProjects()
    case 'resources':
      return await fetchResources()
    case 'personal_info':
      return await fetchPersonalInfo()
    default:
      return { data: null, error: `Unknown entity type: ${entity}` }
  }
}

/**
 * Fetch mock data from pdiData.ts based on entity type
 */
async function fetchMockData(entity: EntityType): Promise<EntityData> {
  switch (entity) {
    case 'skills':
      return await getSkills()
    case 'milestones':
      return await getMilestones()
    case 'projects':
      return await getProjects()
    case 'resources':
      return await getResources()
    case 'personal_info':
      return await getPersonalInfo()
    default:
      throw new Error(`Unknown entity type: ${entity}`)
  }
}
