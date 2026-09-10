/**
 * Mock vs DB Integrity Validator
 * 
 * Compares mock data entities against live Supabase records to detect:
 * - Missing records (in mock but not DB, or vice versa)
 * - Field mismatches (same ID but different values)
 * - Structural parity issues
 * 
 * Used to ensure safe migration from mock data to live database.
 */

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
import { logger } from '@/lib/logging'

export interface IntegrityMismatch {
  type: 'missing_in_db' | 'missing_in_mock' | 'field_mismatch'
  id: string
  field?: string
  mockValue?: unknown
  dbValue?: unknown
  details?: string
}

export interface IntegrityReport {
  entity: EntityType
  mockCount: number
  dbCount: number
  isMatch: boolean
  mismatches: IntegrityMismatch[]
  timestamp: string
}

/**
 * Compare a specific entity type between mock data and database.
 * 
 * @param entity - The entity type to compare
 * @returns Detailed integrity report
 * 
 * @example
 * ```typescript
 * const report = await compareIntegrity('skills')
 * if (!report.isMatch) {
 *   console.warn('Integrity issues detected:', report.mismatches)
 * }
 * ```
 */
export async function compareIntegrity(
  entity: EntityType
): Promise<IntegrityReport> {
  const timestamp = new Date().toISOString()

  try {
    // Fetch both mock and DB data
    const mockData = await fetchMockDataForEntity(entity)
    const dbResult = await fetchDBDataForEntity(entity)

    if (dbResult.error) {
      return {
        entity,
        mockCount: Array.isArray(mockData) ? mockData.length : mockData ? 1 : 0,
        dbCount: 0,
        isMatch: false,
        mismatches: [{
          type: 'missing_in_db',
          id: 'all',
          details: `DB fetch failed: ${dbResult.error}`
        }],
        timestamp
      }
    }

    const dbData = dbResult.data

    // Handle special case for personal_info (singleton)
    if (entity === 'personal_info') {
      return comparePersonalInfo(mockData, dbData, timestamp)
    }

    // Compare arrays
    const mockArray = Array.isArray(mockData) ? mockData : []
    const dbArray = Array.isArray(dbData) ? dbData : []

    const mismatches: IntegrityMismatch[] = []

    // Check for records in mock but not in DB
    for (const mockItem of mockArray) {
      const dbItem = dbArray.find((db) => (db as Record<string, unknown>).id === (mockItem as Record<string, unknown>).id)
      
      if (!dbItem) {
        mismatches.push({
          type: 'missing_in_db',
          id: (mockItem as Record<string, unknown>).id as string,
          details: `Record exists in mock but not in database`
        })
        continue
      }

      // Check for field mismatches
      const fieldMismatches = compareFields(mockItem as Record<string, unknown>, dbItem as Record<string, unknown>)
      mismatches.push(...fieldMismatches)
    }

    // Check for records in DB but not in mock
    for (const dbItem of dbArray) {
      const mockItem = mockArray.find((mock) => (mock as Record<string, unknown>).id === (dbItem as Record<string, unknown>).id)
      
      if (!mockItem) {
        mismatches.push({
          type: 'missing_in_mock',
          id: (dbItem as Record<string, unknown>).id as string,
          details: `Record exists in database but not in mock`
        })
      }
    }

    return {
      entity,
      mockCount: mockArray.length,
      dbCount: dbArray.length,
      isMatch: mismatches.length === 0,
      mismatches,
      timestamp
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    logger.error('integrity', 'Error comparing mock and DB data', err)
    return {
      entity,
      mockCount: 0,
      dbCount: 0,
      isMatch: false,
      mismatches: [{
        type: 'missing_in_db',
        id: 'error',
        details: `Comparison failed: ${errorMessage}`
      }],
      timestamp
    }
  }
}

/**
 * Compare all entities and return a comprehensive report.
 */
export async function compareAllEntities(): Promise<IntegrityReport[]> {
  const entities: EntityType[] = ['skills', 'milestones', 'projects', 'resources', 'personal_info']
  const reports: IntegrityReport[] = []

  for (const entity of entities) {
    const report = await compareIntegrity(entity)
    reports.push(report)
  }

  return reports
}

/**
 * Helper: Fetch mock data for a specific entity
 */
async function fetchMockDataForEntity(entity: EntityType): Promise<unknown> {
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

/**
 * Helper: Fetch DB data for a specific entity
 */
async function fetchDBDataForEntity(
  entity: EntityType
): Promise<{ data: unknown; error: string | null }> {
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
 * Helper: Compare two objects field by field
 */
function compareFields(mockItem: Record<string, unknown>, dbItem: Record<string, unknown>): IntegrityMismatch[] {
  const mismatches: IntegrityMismatch[] = []
  const allKeys = new Set([...Object.keys(mockItem), ...Object.keys(dbItem)])

  for (const key of allKeys) {
    // Skip comparison for certain fields that are expected to differ
    if (key === 'created_at' || key === 'updated_at') {
      continue
    }

    const mockValue = mockItem[key]
    const dbValue = dbItem[key]

    // Deep comparison for arrays and objects
    if (JSON.stringify(mockValue) !== JSON.stringify(dbValue)) {
      mismatches.push({
        type: 'field_mismatch',
        id: mockItem.id as string,
        field: key,
        mockValue,
        dbValue,
        details: `Field "${key}" differs between mock and DB`
      })
    }
  }

  return mismatches
}

/**
 * Helper: Compare personal info singleton
 */
function comparePersonalInfo(
  mockData: unknown,
  dbData: unknown,
  timestamp: string
): IntegrityReport {
  const mismatches: IntegrityMismatch[] = []

  if (!mockData && !dbData) {
    return {
      entity: 'personal_info',
      mockCount: 0,
      dbCount: 0,
      isMatch: true,
      mismatches: [],
      timestamp
    }
  }

  if (!mockData) {
    mismatches.push({
      type: 'missing_in_mock',
      id: 'personal_info',
      details: 'Personal info exists in DB but not in mock'
    })
  }

  if (!dbData) {
    mismatches.push({
      type: 'missing_in_db',
      id: 'personal_info',
      details: 'Personal info exists in mock but not in DB'
    })
  }

  if (mockData && dbData) {
    const fieldMismatches = compareFields(mockData as Record<string, unknown>, dbData as Record<string, unknown>)
    mismatches.push(...fieldMismatches)
  }

  return {
    entity: 'personal_info',
    mockCount: mockData ? 1 : 0,
    dbCount: dbData ? 1 : 0,
    isMatch: mismatches.length === 0,
    mismatches,
    timestamp
  }
}
