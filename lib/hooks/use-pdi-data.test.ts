import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePDIData } from './use-pdi-data'
import * as queries from '@/lib/supabase/queries'
import * as featureFlags from '@/lib/feature-flags'
import * as pdiData from '@/src/data/pdiData'

vi.mock('@/lib/supabase/queries')
vi.mock('@/lib/feature-flags')
vi.mock('@/src/data/pdiData')

describe('usePDIData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns mock data when feature flag is false', async () => {
    // Arrange
    vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(false)
    
    const mockSkills = [
      { id: 'mock-1', name: 'Mock Skill', level: 'L2', description: 'Test', category: 'Test', type: 'hard' as const }
    ]
    
    vi.mocked(pdiData.getSkills).mockResolvedValue(mockSkills)

    // Act
    const { result } = renderHook(() => usePDIData('skills'))

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.data).toEqual(mockSkills)
    expect(result.current.error).toBeNull()
    expect(result.current.source).toBe('mock')
    expect(featureFlags.isFeatureEnabled).toHaveBeenCalledWith('skills')
  })

  it('fetches from API when feature flag is true', async () => {
    // Arrange
    vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(true)
    
    const apiSkills = [
      { id: 'api-1', name: 'API Skill', level: 'L3', description: 'From DB', category: 'Backend', type: 'hard' as const }
    ]
    
    vi.mocked(queries.fetchSkills).mockResolvedValue({
      data: apiSkills,
      error: null
    })

    // Act
    const { result } = renderHook(() => usePDIData('skills'))

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.data).toEqual(apiSkills)
    expect(result.current.error).toBeNull()
    expect(queries.fetchSkills).toHaveBeenCalled()
  })

  it('falls back to mock data gracefully when API request fails', async () => {
    // Arrange
    vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(true)
    
    const mockMilestones = [
      { 
        id: 'mock-milestone-1', 
        title: 'Fallback Milestone', 
        description: 'From mock',
        status: 'in-progress' as const,
        progress: 50,
        deadline: '2026-12-31',
        relatedSkills: [],
        relatedResources: [],
        archived: false
      }
    ]
    
    // API fails
    vi.mocked(queries.fetchMilestones).mockResolvedValue({
      data: [],
      error: 'Network error'
    })
    
    vi.mocked(pdiData.getMilestones).mockResolvedValue(mockMilestones)

    // Act
    const { result } = renderHook(() => usePDIData('milestones'))

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.data).toEqual(mockMilestones)
    expect(result.current.error).toBeNull()
    expect(result.current.source).toBe('fallback')
  })
})
