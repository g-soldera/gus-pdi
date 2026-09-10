/**
 * Structured logging utility for consistent log formatting across the application.
 * 
 * Context naming convention:
 * - API routes: route path (e.g., "api/feedback", "api/pdi")
 * - Query functions: function name (e.g., "fetchSkills", "fetchMilestones")
 * - Utilities: file name (e.g., "integrity", "feature-flags")
 */

export interface Logger {
  error(context: string, message: string, error?: unknown): void
  warn(context: string, message: string, details?: unknown): void
  info(context: string, message: string, details?: unknown): void
  debug(context: string, message: string, details?: unknown): void
}

/**
 * Logs an error with context, message, and optional error details.
 * Includes stack trace if error is an Error object.
 * 
 * @example
 * logger.error('api/feedback', 'Database insert failed', dbError)
 */
function error(context: string, message: string, error?: unknown): void {
  const prefix = `[${context}] ${message}`
  
  if (error instanceof Error) {
    console.error(prefix, error)
  } else if (error !== undefined) {
    console.error(prefix, error)
  } else {
    console.error(prefix)
  }
}

/**
 * Logs a warning with context, message, and optional details.
 * 
 * @example
 * logger.warn('fetchSkills', 'Supabase query returned no results')
 */
function warn(context: string, message: string, details?: unknown): void {
  const prefix = `[${context}] ${message}`
  
  if (details !== undefined) {
    console.warn(prefix, details)
  } else {
    console.warn(prefix)
  }
}

/**
 * Logs an informational message with context and optional details.
 * 
 * @example
 * logger.info('feature-flags', 'Using database for entity', { entity: 'skills' })
 */
function info(context: string, message: string, details?: unknown): void {
  const prefix = `[${context}] ${message}`
  
  if (details !== undefined) {
    console.info(prefix, details)
  } else {
    console.info(prefix)
  }
}

/**
 * Logs a debug message (only in development).
 * 
 * @example
 * logger.debug('integrity', 'Comparing mock and DB data', { count: 10 })
 */
function debug(context: string, message: string, details?: unknown): void {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  
  const prefix = `[${context}] ${message}`
  
  if (details !== undefined) {
    console.debug(prefix, details)
  } else {
    console.debug(prefix)
  }
}

export const logger: Logger = {
  error,
  warn,
  info,
  debug,
}
