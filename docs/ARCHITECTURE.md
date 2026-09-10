# Architecture Documentation

## Overview

The PDI (Plano de Desenvolvimento Individual) application is a Next.js 15+ full-stack web application for tracking career development goals, skills, milestones, projects, and resources. Built with Next.js App Router, Supabase for backend, and TypeScript for type safety.

**Key Characteristics:**
- Server-first rendering with App Router
- Hybrid data access (Supabase + feature flags for gradual migration)
- Type-safe API layer with Zod validation
- Modular utility structure in lib/

## Tech Stack

### Frontend
- **Framework:** Next.js 16.3.4 (App Router)
- **Language:** TypeScript 5.8.3 (strict mode enabled)
- **Styling:** Tailwind CSS 4.1.12
- **UI Components:** Radix UI primitives, Material UI components
- **State Management:** React hooks, Server Components where possible

### Backend
- **Database:** Supabase (PostgreSQL)
- **ORM/Client:** @supabase/supabase-js 2.116.0
- **Validation:** Zod 4.5.4
- **Rate Limiting:** Upstash Redis + @upstash/ratelimit
- **Authentication:** Supabase Auth (admin panel has custom password protection)

### Infrastructure
- **Hosting:** Vercel
- **Database Hosting:** Supabase Cloud
- **CDN:** Vercel Edge Network

## Directory Structure

```
app/
├── admin/              # Admin panel pages (protected)
│   ├── page.tsx        # Feedback dashboard
│   ├── milestones/     # Milestone CRUD
│   ├── skills/         # Skills CRUD
│   ├── projects/       # Projects CRUD
│   ├── resources/      # Resources CRUD
│   └── personal-info/  # Personal info editor
├── api/                # API routes (Next.js route handlers)
│   ├── admin/          # Admin-specific endpoints
│   ├── auth/           # Authentication endpoints
│   ├── feedback/       # Public feedback submission
│   ├── milestones/     # Milestone operations
│   └── pdi/            # Generic PDI CRUD
├── feedback/           # Public feedback form
├── pdi/                # Main PDI display
└── layout.tsx          # Root layout

lib/
├── api/                # API utilities (Phase 06 Plan 01)
│   ├── responses.ts    # Standardized response helpers
│   ├── validation.ts   # Request validation wrapper
│   └── middleware.ts   # Rate limiting middleware
├── hooks/              # React hooks
│   └── use-pdi-data.ts # Hybrid data fetching hook (Phase 05)
├── schemas/            # Zod validation schemas
│   ├── auth.ts         # Auth payload validation
│   ├── crud.ts         # PDI entity validation
│   ├── feedback.ts     # Feedback validation
│   └── responses.ts    # Response validation
├── supabase/           # Supabase clients and queries
│   ├── client.ts       # Public anon client
│   ├── server.ts       # Server-side client
│   ├── queries.ts      # Read-only query functions
│   ├── mappers.ts      # Field mapping utilities (Phase 06 Plan 04)
│   └── types.ts        # Generated database types
├── validators/         # Custom validation logic
│   └── integrity.ts    # Mock vs DB integrity checker (Phase 05)
├── feature-flags.ts    # Feature flag system (Phase 05)
├── ratelimit.ts        # Rate limiting config
└── logging.ts          # Structured logger (Phase 06 Plan 02)

docs/
├── CONVENTIONS.md      # Naming and code conventions (Phase 06 Plan 02)
└── ARCHITECTURE.md     # This file
```

## Data Flow

### Read-Only Data Flow (Skills, Milestones, Projects, Resources, Personal Info)

```
User Request → Server Component
  → lib/supabase/queries.ts (fetchSkills, fetchMilestones, etc.)
    → lib/supabase/server.ts (createClient with server context)
      → Supabase Database (via RLS-protected queries)
        → lib/supabase/mappers.ts (DB row → App object)
          → Server Component (renders data)
```

**Feature Flag Variant (Client-side with fallback):**

```
User Request → Client Component
  → lib/hooks/use-pdi-data.ts
    → Check lib/feature-flags.ts (per-entity toggle)
      → If enabled: Fetch from /api/pdi?table={entity}
        → On success: Return API data (source: 'api')
        → On failure: Auto-fallback to mock data (source: 'fallback')
      → If disabled: Return mock data immediately (source: 'mock')
```

### Write Data Flow (Create, Update, Delete)

```
User Action → API Route (app/api/*/route.ts)
  → lib/api/middleware.ts (withRateLimit)
    → lib/ratelimit.ts (check Redis rate limit)
      → If exceeded: Return 429 with lib/api/responses.ts (apiRateLimitError)
  → lib/api/validation.ts (validateRequest with Zod schema)
    → If invalid: Return 400 with lib/api/responses.ts (apiValidationError)
  → lib/supabase/server.ts (createClient)
    → Supabase Database (INSERT/UPDATE/DELETE via RLS)
      → On error: lib/logging.ts (logger.error) + apiError response
      → On success: lib/api/responses.ts (apiSuccess) with data
```

### Authentication Flow

```
Admin Login Form → POST /api/admin/login
  → Validate credentials (password check)
    → Set session cookie (httpOnly, secure)
      → Redirect to /admin

Protected Admin Page → Check session cookie
  → If missing/invalid: Redirect to /admin/login
  → If valid: Render admin UI
```

## API Patterns

All API routes follow a consistent pattern established in Phase 06:

### Standard API Route Structure

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { withRateLimit } from '@/lib/api/middleware'
import { validateRequest } from '@/lib/api/validation'
import { apiSuccess, apiError, apiValidationError } from '@/lib/api/responses'
import { logger } from '@/lib/logging'
import { mySchema } from '@/lib/schemas/...'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  return withRateLimit(req, async (req) => {
    try {
      // 1. Validate request
      const result = await validateRequest(req, mySchema)
      if (!result.success) return result.response
      const { data } = result

      // 2. Business logic
      const supabase = createClient()
      const { data: dbData, error } = await supabase
        .from('table')
        .insert(data)
        .select()

      if (error) {
        logger.error('api/route', 'Database operation failed', error)
        return apiError('Erro ao salvar dados', 500)
      }

      // 3. Success response
      return apiSuccess({ data: dbData }, 201)
    } catch (err) {
      logger.error('api/route', 'Unexpected error', err)
      return apiError('Erro interno', 500)
    }
  })
}
```

### Key Patterns

1. **Rate Limiting:** All mutations wrapped with `withRateLimit` middleware
2. **Validation:** All inputs validated with Zod via `validateRequest`
3. **Error Responses:** Standardized with `apiSuccess`, `apiError`, `apiValidationError`
4. **Logging:** Structured with `logger.error('context', 'message', error)`
5. **Error Messages:** Portuguese for users, English for internal logs

### API Endpoints

| Endpoint | Method | Purpose | Rate Limited | Auth Required |
|----------|--------|---------|--------------|---------------|
| /api/feedback | POST | Submit feedback | Yes | No |
| /api/pdi | GET | Fetch PDI entities by table | No | No (RLS) |
| /api/pdi | POST | Create PDI entity | Yes | No (RLS) |
| /api/pdi/[id] | GET | Fetch single PDI entity | No | No (RLS) |
| /api/pdi/[id] | PUT | Update PDI entity | Yes | No (RLS) |
| /api/pdi/[id] | DELETE | Delete PDI entity | Yes | No (RLS) |
| /api/milestones/[id]/objectives/[objId] | PATCH | Update milestone objective | Yes | No (RLS) |
| /api/admin/login | POST | Admin authentication | Yes | No |
| /api/admin/feedbacks | GET | Admin feedback list | No | Yes (session) |
| /api/auth/login | POST | User authentication | Yes | No |
| /api/auth/logout | POST | User logout | No | Yes (session) |

## Database Patterns

### Schema Organization

**Tables:** skills, milestones, projects, resources, personal_info, feedback

**Naming Convention:** snake_case for tables and columns (PostgreSQL standard)

**Key Fields:**
- `id` (uuid, primary key) on all tables
- `created_at` (timestamp) on all entity tables
- `updated_at` (timestamp) on mutable tables
- JSONB columns for complex nested data (objectives, requirements, etc.)

### Query Patterns

All queries use abstracted functions from `lib/supabase/queries.ts`:

```typescript
// Read operations
const { data, error } = await fetchSkills({ category: 'IA Generativa' })
const { data, error } = await fetchMilestones({ status: 'in-progress', archived: false })

// Write operations (inline in API routes)
const { data, error } = await supabase
  .from('skills')
  .insert(validatedData)
  .select()
```

### Field Mapping (Phase 06 Plan 04)

Database uses snake_case, application uses camelCase. Mapping handled by `lib/supabase/mappers.ts`:

```typescript
import { mapDbToApp, assertJson } from '@/lib/supabase/mappers'

// Automatic conversion
const skill: Skill = mapDbToApp<SkillRow, Skill>(dbRow)

// DB: related_skills → App: relatedSkills
// DB: display_name → App: displayName
// DB: is_anonymous → App: isAnonymous

// JSONB field handling
const requirements = assertJson<SkillRequirement[]>(row.requirements)
```

### Row Level Security (RLS)

Supabase RLS policies enforce data access:
- Public anon key: Read-only access to most tables
- Admin operations: Use service_role key (server-side only)
- Feedback table: Write access for public, read access for admins only

## Feature Flags (Phase 05)

Per-entity feature flags control database vs mock data usage:

```typescript
// Environment variables
NEXT_PUBLIC_FEATURE_DB_SKILLS=true
NEXT_PUBLIC_FEATURE_DB_MILESTONES=true
NEXT_PUBLIC_FEATURE_DB_PROJECTS=false  // Still using mock data
// ... etc
```

**Hook usage:**
```typescript
const { data, loading, error, source } = usePDIData('skills')
// source: 'api' | 'mock' | 'fallback'
```

**Fallback behavior:** If API fails, automatically falls back to mock data with warning logged.

## Error Handling

### API Routes
- Try-catch blocks catch unexpected errors
- Supabase errors logged with `logger.error` and returned as generic user messages
- Validation errors formatted with `apiValidationError` (exposes field errors)

### React Components
- Error boundaries catch rendering errors (app/error.tsx, app/admin/error.tsx)
- Fallback UI displays user-friendly error messages
- Errors logged for debugging

### Database Errors
- Connection failures caught and logged
- RLS policy violations return as query errors
- Constraint violations (unique, foreign key) handled gracefully

## Security

### Input Validation
- All write operations validated with Zod schemas
- Schema files: `lib/schemas/auth.ts`, `crud.ts`, `feedback.ts`
- Validation happens before database operations

### Rate Limiting
- Upstash Redis-backed rate limiting on all mutations
- 5 requests per hour per IP (configurable in `lib/ratelimit.ts`)
- Returns 429 with Retry-After header when exceeded

### Authentication
- Admin panel protected with session-based auth
- HMAC-signed session tokens
- Secure session cookies (httpOnly, secure flags)

### Row Level Security
- Supabase RLS enforces database-level access control
- Public anon key limited to read operations
- Service role key used server-side for admin operations

## Testing Strategy

**Test Files:** Colocated with source (`*.test.ts`) or in `__tests__/`

**Coverage (Phase 05):**
- Feature flags: 3 tests
- usePDIData hook: 3 tests  
- Integrity validator: 5 tests
- Auth schemas: tests
- CRUD schemas: tests

**Test Framework:** Vitest with jsdom for React hooks

**Running Tests:**
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

## Performance Considerations

### Server Components
- Default to Server Components for data fetching
- Reduces client bundle size
- Faster initial page load

### Code Splitting
- Admin routes could benefit from route-based splitting (future optimization)
- Dynamic imports for heavy components (future optimization)

### Database Queries
- Queries use `.select()` with specific fields where possible
- Ordering and filtering on indexed columns (future optimization: add indexes)

### Caching
- Static data cached at build time (future optimization)
- API response caching via Vercel headers (future optimization)

## Deployment

**Platform:** Vercel (connected to GitHub repository)

**Environment Variables (required):**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-only)
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token
- `IP_HASH_SECRET` - Secret for IP hashing in feedback
- `ADMIN_PASSWORD` - Admin panel password
- `ADMIN_SECRET` - Secret for HMAC session signing
- `NEXT_PUBLIC_FEATURE_DB_*` - Feature flags for each entity

**Build Command:** `npm run build`
**Start Command:** `npm start`

## Related Documentation

- [Code Conventions](./CONVENTIONS.md) - Naming, formatting, and code organization standards
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Changelog

**Phase 06 (2026-09-10) - Code Quality & Architecture Review:**
- Extracted API utilities (responses, validation, middleware)
- Standardized logging with structured logger
- Documented naming conventions
- Eliminated DRY violations across all API routes
- Improved type safety (eliminated 16 'any' types)
- Extracted field mapping utilities
- Created this architecture documentation

**Phase 05 (2026-09-09) - Unified Deployment:**
- Implemented feature flags system
- Created hybrid usePDIData hook
- Added integrity validation utilities

---

**Last Updated:** 2026-09-10
**Maintained By:** Development team
**Questions:** Refer to CONVENTIONS.md or codebase comments
