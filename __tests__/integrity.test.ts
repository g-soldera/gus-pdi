import { describe, it, expect, vi, beforeEach } from 'vitest'
import { compareIntegrity, type IntegrityReport } from '@/lib/validators/integrity'
import * as queries from '@/lib/supabase/queries'
import * as pdiData from '@/src/data/pdiData'

vi.mock('@/lib/supabase/queries')
vi.mock('@/src/data/pdiData')

describe('Mock vs DB Integrity Checker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('compares mock arrays with DB arrays and reports structural parity', async () => {
    // Arrange
    const mockSkills = [
      { id: 'skill-1', name: 'TypeScript', level: 'L2', description: 'Type-safe JS', category: 'Languages', type: 'hard' as const },
      { id: 'skill-2', name: 'React', level: 'L2', description: 'UI library', category: 'Frontend', type: 'hard' as const }
    ]
    
    const dbSkills = [
      { id: 'skill-1', name: 'TypeScript', level: 'L2', description: 'Type-safe JS', category: 'Languages', type: 'hard' as const },
      { id: 'skill-2', name: 'React', level: 'L2', description: 'UI library', category: 'Frontend', type: 'hard' as const }
    ]
    
    vi.mocked(pdiData.getSkills).mockResolvedValue(mockSkills)
    vi.mocked(queries.fetchSkills).mockResolvedValue({ data: dbSkills, error: null })

    // Act
    const report = await compareIntegrity('skills')

    // Assert
    expect(report.entity).toBe('skills')
    expect(report.mockCount).toBe(2)
    expect(report.dbCount).toBe(2)
    expect(report.isMatch).toBe(true)
    expect(report.mismatches).toHaveLength(0)
  })

  it('detects missing records or field mismatches between mock and DB', async () => {
    // Arrange
    const mockMilestones = [
      {
        id: 'milestone-1',
        title: 'Complete CRTP',
        description: 'Red Team certification',
        status: 'completed' as const,
        progress: 100,
        deadline: '2026-06-30',
        relatedSkills: [],
        relatedResources: [],
        archived: false
      },
      {
        id: 'milestone-2',
        title: 'Learn Kubernetes',
        description: 'Container orchestration',
        status: 'in-progress' as const,
        progress: 50,
        deadline: '2026-12-31',
        relatedSkills: [],
        relatedResources: [],
        archived: false
      }
    ]
    
    const dbMilestones = [
      {
        id: 'milestone-1',
        title: 'Complete CRTP',
        description: 'Red Team certification UPDATED', // Field mismatch
        status: 'completed' as const,
        progress: 100,
        deadline: '2026-06-30',
        relatedSkills: [],
        relatedResources: [],
        archived: false
      }
      // Missing milestone-2
    ]
    
    vi.mocked(pdiData.getMilestones).mockResolvedValue(mockMilestones)
    vi.mocked(queries.fetchMilestones).mockResolvedValue({ data: dbMilestones, error: null })

    // Act
    const report = await compareIntegrity('milestones')

    // Assert
    expect(report.entity).toBe('milestones')
    expect(report.mockCount).toBe(2)
    expect(report.dbCount).toBe(1)
    expect(report.isMatch).toBe(false)
    expect(report.mismatches.length).toBeGreaterThan(0)
    
    // Should detect the missing milestone
    const missingMilestone = report.mismatches.find(m => 
      m.type === 'missing_in_db' && m.id === 'milestone-2'
    )
    expect(missingMilestone).toBeDefined()
    
    // Should detect the field mismatch
    const fieldMismatch = report.mismatches.find(m => 
      m.type === 'field_mismatch' && m.id === 'milestone-1'
    )
    expect(fieldMismatch).toBeDefined()
  })
})
