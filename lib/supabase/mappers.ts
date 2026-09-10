/**
 * Generic field mapping utilities for converting between database and application representations.
 * Handles snake_case ↔ camelCase conversion and JSONB field type assertions.
 */

export type FieldMap<TSource = Record<string, unknown>, TTarget = Record<string, unknown>> = {
  [K in keyof TTarget]?: keyof TSource
}

/**
 * Converts a snake_case string to camelCase.
 * 
 * @param str - Snake case string
 * @returns Camel case string
 * 
 * @example
 * snakeToCamel('related_skills') // 'relatedSkills'
 * snakeToCamel('is_anonymous') // 'isAnonymous'
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Converts a camelCase string to snake_case.
 * 
 * @param str - Camel case string
 * @returns Snake case string
 * 
 * @example
 * camelToSnake('relatedSkills') // 'related_skills'
 * camelToSnake('isAnonymous') // 'is_anonymous'
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

/**
 * Type assertion helper for JSONB fields from database.
 * Returns undefined if value is null or undefined, otherwise casts to T.
 * 
 * @param value - Value from database JSONB column
 * @returns Typed value or undefined
 * 
 * @example
 * const requirements = assertJson<SkillRequirement[]>(row.requirements)
 */
export function assertJson<T>(value: unknown): T | undefined {
  return value !== undefined && value !== null ? (value as T) : undefined
}

/**
 * Maps a database row (snake_case) to an application object (camelCase).
 * Automatically converts field names unless explicit fieldMap is provided.
 * 
 * @param dbRow - Database row object
 * @param fieldMap - Optional explicit field mapping
 * @returns Application object with camelCase fields
 * 
 * @example
 * // Automatic conversion
 * const skill: Skill = mapDbToApp<SkillRow, Skill>(dbRow)
 * 
 * // Explicit mapping
 * const milestone: Milestone = mapDbToApp<MilestoneRow, Milestone>(dbRow, {
 *   displayName: 'display_name',
 *   relatedSkills: 'related_skills'
 * })
 */
export function mapDbToApp<TDb extends Record<string, unknown>, TApp>(
  dbRow: TDb,
  fieldMap?: FieldMap<TDb, TApp>
): TApp {
  const result: Record<string, unknown> = {}

  if (fieldMap) {
    // Use explicit field mapping
    for (const [targetKey, sourceKey] of Object.entries(fieldMap) as [string, keyof TDb][]) {
      if (sourceKey && sourceKey in dbRow) {
        result[targetKey] = dbRow[sourceKey]
      }
    }
  } else {
    // Auto-convert snake_case to camelCase
    for (const [key, value] of Object.entries(dbRow)) {
      const camelKey = snakeToCamel(key)
      result[camelKey] = value
    }
  }

  return result as TApp
}

/**
 * Maps an application object (camelCase) to a database row (snake_case).
 * Automatically converts field names unless explicit fieldMap is provided.
 * 
 * @param appObj - Application object
 * @param fieldMap - Optional explicit field mapping
 * @returns Database row with snake_case fields
 * 
 * @example
 * const dbRow = mapAppToDb<Skill, SkillRow>(skill)
 */
export function mapAppToDb<TApp extends Record<string, unknown>, TDb>(
  appObj: TApp,
  fieldMap?: FieldMap<TApp, TDb>
): TDb {
  const result: Record<string, unknown> = {}

  if (fieldMap) {
    // Use explicit field mapping
    for (const [targetKey, sourceKey] of Object.entries(fieldMap) as [string, keyof TApp][]) {
      if (sourceKey && sourceKey in appObj) {
        result[targetKey] = appObj[sourceKey]
      }
    }
  } else {
    // Auto-convert camelCase to snake_case
    for (const [key, value] of Object.entries(appObj)) {
      const snakeKey = camelToSnake(key)
      result[snakeKey] = value
    }
  }

  return result as TDb
}
