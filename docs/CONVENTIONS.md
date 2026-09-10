# Code Conventions

## Overview
This document defines naming, formatting, and code organization standards for the PDI project.

## File Naming

### Components
- Use PascalCase for React components: `FeedbackForm.tsx`, `PortfolioSkillCard.tsx`
- One component per file unless tightly coupled helpers exist

### API Routes
- Use `route.ts` for Next.js App Router endpoints
- Directory structure defines the path: `app/api/feedback/route.ts` → `/api/feedback`

### Utilities
- Use kebab-case for utility files: `feature-flags.ts`, `use-pdi-data.ts`
- Use descriptive names indicating purpose

### Types
- Use kebab-case for type definition files: `types.ts`, `responses.ts`
- Suffix with `.test.ts` for test files

## Function Naming

### Exported Functions
- Use camelCase: `fetchSkills`, `validateRequest`, `createClient`
- Start with verb indicating action: `fetch`, `create`, `validate`, `update`, `delete`

### React Components
- Use PascalCase: `FeedbackForm`, `AdminPage`
- Use descriptive names indicating UI purpose

### Event Handlers
- Prefix with `handle`: `handleSubmit`, `handleClick`, `handleChange`

### Hooks
- Prefix with `use`: `usePDIData`, `useFeatureFlag`

## Variable Naming

### Constants
- Use UPPER_SNAKE_CASE for true constants: `MAX_RETRIES`, `API_BASE_URL`
- Use camelCase for configuration objects: `validTables`, `statusEnum`

### Local Variables
- Use camelCase: `userData`, `isLoading`, `errorMessage`
- Use descriptive names, avoid abbreviations unless domain-standard (id, url, api)

### Boolean Variables
- Prefix with `is`, `has`, `should`, `can`: `isAnonymous`, `hasError`, `shouldRetry`

## Type Naming

### Interfaces
- Use PascalCase: `Feedback`, `Skill`, `Milestone`, `PersonalInfo`
- Avoid prefixing with `I` (IFeedback is discouraged)

### Type Aliases
- Use PascalCase: `Status`, `SkillType`, `ValidationResult`

### Enums
- Use PascalCase for enum name: `Status`, `SkillType`
- Use camelCase for enum values or UPPER_SNAKE_CASE if truly constant

## Database Naming

### Tables
- Use snake_case (Supabase/PostgreSQL convention): `feedback`, `personal_info`, `milestones`
- Use plural nouns for entity tables

### Columns
- Use snake_case: `created_at`, `is_anonymous`, `profile_image`
- Boolean columns: prefix with `is_` or `has_`
- Timestamp columns: suffix with `_at`

### Mapping to TypeScript
- Convert snake_case to camelCase in application code
- Use field mapping in query functions (lib/supabase/queries.ts pattern)

## Error Messages

### User-Facing Errors (API Responses)
- **Language:** Portuguese
- **Format:** Short, actionable message without technical details
- **Examples:**
  - "Erro ao salvar feedback."
  - "Dados inválidos."
  - "Muitas tentativas. Tente novamente mais tarde."

### Internal Logs (Console/Logger)
- **Language:** English
- **Format:** Include context, technical details, stack traces
- **Examples:**
  - logger.error('api/feedback', 'Database insert failed', dbError)
  - logger.warn('fetchSkills', 'Supabase query returned no results')

## Log Format

### Context Prefixes
- API routes: route path → `[api/feedback]`, `[api/pdi]`
- Query functions: function name → `[fetchSkills]`, `[fetchMilestones]`
- Utilities: file/module name → `[integrity]`, `[feature-flags]`

### Log Levels
- `error`: Failures requiring attention, exceptions, database errors
- `warn`: Unexpected behavior, fallbacks triggered, deprecated usage
- `info`: Significant events, feature flag changes, startup messages
- `debug`: Development-only verbose logging (disabled in production)

### Using the Logger
```typescript
import { logger } from '@/lib/logging'

// Error with exception
logger.error('api/feedback', 'Database insert failed', dbError)

// Warning
logger.warn('fetchSkills', 'Query returned no results for category', { category })

// Info
logger.info('feature-flags', 'Using database for entity', { entity: 'skills' })
```

## Import Organization

### Order
1. External dependencies (react, next, zod, etc.)
2. Internal absolute imports from `@/` (components, lib, utils)
3. Relative imports (`./`, `../`)
4. Type imports (use `import type` when only importing types)

### Example
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logging'
import { apiSuccess, apiError } from '@/lib/api/responses'

import { feedbackSchema } from './schemas'
```

## Code Organization

### Directory Structure
- `app/` - Next.js App Router pages and API routes
- `lib/` - Shared utilities, clients, schemas, hooks
- `docs/` - Documentation
- `scripts/` - Build and utility scripts
- `__tests__/` - Test files (or colocated with source as `*.test.ts`)

### lib/ Organization
- `lib/api/` - API utilities (responses, validation, middleware)
- `lib/hooks/` - React hooks
- `lib/schemas/` - Zod validation schemas
- `lib/supabase/` - Supabase clients and queries
- `lib/validators/` - Custom validation logic

## Comments

### When to Comment
- Complex business logic requiring explanation
- Non-obvious workarounds or hacks
- Public API functions (use JSDoc)
- TODOs with context and ticket reference

### When NOT to Comment
- Self-explanatory code (let names speak)
- Obvious statements ("increment counter")
- Commented-out code (delete it, use git history)

### JSDoc for Public APIs
```typescript
/**
 * Fetch all skills with optional filtering.
 * 
 * @param options - Filter by category or skill type
 * @returns Array of Skill objects with error handling
 * 
 * @example
 * const { data, error } = await fetchSkills({ category: 'IA Generativa' })
 */
export async function fetchSkills(options?: { ... }): Promise<...> {
  // ...
}
```

## Testing

### Test File Naming
- Colocated: `feature-flags.test.ts` next to `feature-flags.ts`
- Or in `__tests__/` directory: `__tests__/feature-flags.test.ts`

### Test Function Naming
- Use descriptive strings: `it('should fallback to mock data when API fails')`
- Group with `describe` blocks for context

---

**Enforcement:**
- ESLint rules configured in `.eslintrc` (TODO: add custom rules)
- Code review checklist references this document
- CI/CD pipeline runs linter before merge

**Last Updated:** 2026-09-10
