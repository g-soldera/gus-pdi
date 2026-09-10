# Phase 06: Code Quality & Architecture Review - Research

**Phase:** 06
**Goal:** Review and refactor codebase for consistency, DRY principles, and Next.js best practices
**Requirements:** CQ-01 to CQ-06
**Researched:** 2026-09-10

---

## Executive Summary

This phase focuses on reviewing and refactoring the existing Next.js 15 + Supabase application to improve code quality, eliminate duplication, and establish consistent patterns across the codebase. The application currently has 23 TypeScript files in `/app` and 16 in `/lib`, with 8 API routes and a hybrid data access pattern using feature flags.

**Key findings:**
- TypeScript strict mode already enabled but contains `any` types (16 instances) and type assertions (`as any`: 16 instances)
- Consistent error handling patterns exist in API routes but could be extracted to shared middleware
- Supabase client initialization patterns vary between server/client contexts
- No centralized utility library structure beyond basic `/lib` organization
- Feature flags system recently implemented (Phase 05) provides good foundation

---

## Current Architecture Patterns

### 1. Project Structure

```
app/
├── admin/          # Admin panel pages (5 CRUD pages)
├── api/            # API routes (8 endpoints)
│   ├── admin/      # Admin-specific endpoints
│   ├── auth/       # Auth endpoints
│   ├── feedback/   # Public feedback endpoint
│   ├── milestones/ # Milestone objectives CRUD
│   └── pdi/        # Generic PDI CRUD
├── feedback/       # Public feedback form
├── pdi/            # Main PDI view
└── pdi-test/       # Test page

lib/
├── feature-flags.ts    # Per-entity DB toggle system
├── hooks/              # React hooks (use-pdi-data)
├── ratelimit.ts        # Upstash rate limiting
├── schemas/            # Zod validation schemas
│   ├── auth.ts
│   ├── crud.ts
│   ├── feedback.ts
│   └── responses.ts
├── supabase/           # Supabase clients and queries
│   ├── client.ts       # Public anon client
│   ├── server.ts       # Server-side client
│   ├── queries.ts      # Read-only query functions
│   └── types.ts        # Generated DB types
└── validators/         # Integrity checking
```

### 2. Naming Conventions (Current State)

| Context | Pattern | Consistency |
|---------|---------|-------------|
| API routes | `route.ts` with named exports (GET, POST, etc.) | ✓ Consistent |
| Components | PascalCase `.tsx` | ✓ Consistent |
| Utility functions | camelCase exports | ✓ Consistent |
| Schema files | `{entity}Schema` naming | ✓ Consistent |
| Database tables | snake_case (Supabase convention) | ✓ Consistent |
| Interface mapping | camelCase in app, snake_case in DB | ⚠️ Manual mapping required |

**Issues identified:**
- No documented naming convention guide
- Mixed use of `createClient` vs `createPublicClient` without clear pattern documentation
- Error log prefixes inconsistent (`[feedbacks]` vs `[GET /api/pdi]` vs `[feedback]`)

### 3. API Route Patterns

**Current pattern (found in 8 routes):**

```typescript
export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting (if mutation)
    const ip = getIP(req)
    const { success } = await ratelimit.limit(ip)
    if (!success) return NextResponse.json({ error: '...' }, { status: 429 })
    
    // 2. Parse body
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: '...' }, { status: 400 })
    
    // 3. Validate with Zod
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: '...', details: parsed.error }, { status: 400 })
    
    // 4. Database operation
    const supabase = createClient()
    const { data, error } = await supabase.from('table').insert(parsed.data)
    if (error) return NextResponse.json({ error: '...' }, { status: 500 })
    
    // 5. Success response
    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    console.error('[route] unexpected:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Strengths:**
- Consistent try-catch error boundaries
- Zod validation on all write operations
- Rate limiting on mutations
- Proper HTTP status codes

**DRY violations identified:**
- Error response format duplicated across all routes (66 instances of `NextResponse.json`)
- Rate limiting boilerplate repeated in 3+ routes
- Supabase client initialization repeated in every route
- Input parsing/validation pattern repeated

**Opportunity:** Extract to middleware/helper functions

### 4. Database Query Patterns

**Current implementation:** `lib/supabase/queries.ts` provides read-only functions

```typescript
export async function fetchSkills(options?: { category?: string }): 
  Promise<{ data: Skill[], error: string | null }> {
  const supabase = createPublicClient()
  let query = supabase.from('skills').select('*').order(...)
  
  if (options?.category) query = query.eq('category', options.category)
  
  const { data, error } = await query
  // ... mapping logic
  return { data: mappedSkills, error: null }
}
```

**Pattern analysis:**
- ✓ Consistent error handling structure
- ✓ Type-safe result mapping (DB row → interface)
- ✓ Optional filtering parameters
- ⚠️ Manual field mapping (snake_case → camelCase) in every function
- ⚠️ Repeated error logging patterns

**DRY opportunities:**
- Generic query builder with field mapping
- Shared error handling/logging wrapper
- Reusable filter application helper

### 5. Type Safety Status

**TypeScript config:** `strict: true` ✓ enabled

**Type issues found:**
- `any` types: 16 instances
  - `lib/validators/integrity.ts`: 9 instances (field comparison logic)
  - `lib/schemas/responses.ts`: 1 instance (validation function)
  - `lib/supabase/queries.ts`: 6 instances (JSONB field assertions, dynamic table access)
- Type assertions (`as any`): 16 instances
  - Mostly in dynamic table access (`supabase.from(table as any)`)
  - JSONB field casting in queries.ts

**Root causes:**
- Supabase TypeScript codegen doesn't cover dynamic table selection
- JSONB fields (objectives, requirements) need runtime casting
- Generic CRUD endpoint requires dynamic table routing

**Mitigation strategies:**
1. Type unions for table names instead of `as any`
2. Branded types for JSONB fields
3. Generic helpers with proper type constraints

---

## Next.js 15 Best Practices Review

### App Router Patterns

**Current usage:**
- ✓ Server Components by default (admin pages, PDI pages)
- ✓ Client Components marked with `'use client'` (interactive forms)
- ✓ Route handlers in `app/api/**/route.ts`
- ✓ Parallel routes not used (not needed for this app)
- ✓ Loading/error boundaries: **missing** ⚠️

**Recommended additions:**
- `loading.tsx` for async data pages (admin panels)
- `error.tsx` for route-level error handling
- Streaming with `<Suspense>` boundaries for long queries

### Data Fetching

**Current pattern:**
```typescript
// Server Component (app/admin/page.tsx)
export default async function AdminPage({ searchParams }) {
  const supabase = createClient()
  const { data, error } = await supabase.from('feedback').select('*')
  // ... render
}
```

**Compliance:** ✓ Server-side data fetching, no client waterfalls

**Client-side data:** Uses `usePDIData` hook with feature flag routing (Phase 05 implementation)

### Error Handling

**API routes:** Consistent pattern ✓
**Pages:** Basic error display, no error boundaries ⚠️

### Performance

**Current state:**
- ✓ Server Components reduce client bundle
- ⚠️ No code splitting for admin routes (opportunity: route groups with layout-based splitting)
- ⚠️ No image optimization audit yet (Phase 09 scope)
- ⚠️ No bundle analysis in package.json scripts

---

## Shared Utility Extraction Opportunities

### 1. API Response Helpers

**Current duplication:** 66 instances of `NextResponse.json` with error patterns

**Proposed extraction:**
```typescript
// lib/api/responses.ts
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status })
}

export function apiError(message: string, status = 500, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status })
}

export function apiValidationError(zodError: ZodError) {
  return NextResponse.json({
    error: 'Validation failed',
    details: zodError.flatten().fieldErrors
  }, { status: 400 })
}
```

**Impact:** Eliminates 50+ lines of duplicated error formatting

### 2. Rate Limiting Middleware

**Current duplication:** Rate limit boilerplate in 3 routes

**Proposed extraction:**
```typescript
// lib/api/middleware.ts
export async function withRateLimit(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const ip = getIP(req)
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)
  
  if (!success) {
    return apiError('Rate limit exceeded', 429, { limit, remaining, reset })
  }
  
  return handler(req)
}
```

### 3. Request Validation Helper

**Current pattern:** Repeated in every POST/PUT route

**Proposed extraction:**
```typescript
// lib/api/validation.ts
export async function validateRequest<T>(
  req: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; response: NextResponse }> {
  const body = await req.json().catch(() => null)
  if (!body) {
    return { success: false, response: apiError('Invalid JSON payload', 400) }
  }
  
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return { success: false, response: apiValidationError(parsed.error) }
  }
  
  return { success: true, data: parsed.data }
}
```

### 4. Database Query Mapper

**Current duplication:** Field mapping logic in every query function

**Proposed extraction:**
```typescript
// lib/supabase/mappers.ts
type FieldMap<TSource, TTarget> = {
  [K in keyof TTarget]: K extends keyof TSource ? K : never
}

export function mapFields<TSource, TTarget>(
  source: TSource,
  fieldMap: Partial<Record<keyof TTarget, keyof TSource>>
): TTarget {
  // Generic field mapping with snake_case → camelCase support
}
```

### 5. Consistent Error Logging

**Current state:** Mixed log prefixes, no structure

**Proposed standard:**
```typescript
// lib/logging.ts
export const logger = {
  error: (context: string, message: string, error?: unknown) => {
    console.error(`[${context}] ${message}`, error)
  },
  warn: (context: string, message: string) => {
    console.warn(`[${context}] ${message}`)
  },
  info: (context: string, message: string) => {
    console.info(`[${context}] ${message}`)
  }
}
```

---

## Code Quality Checklist

### Naming Conventions Audit

| Dimension | Status | Action Required |
|-----------|--------|----------------|
| Files | ✓ Consistent | Document convention |
| Functions | ✓ Consistent | None |
| Variables | ✓ Consistent | None |
| Types/Interfaces | ⚠️ Mixed | Standardize Supabase types |
| Constants | ✓ Consistent | None |
| Error messages | ⚠️ Mixed languages | Standardize to Portuguese or English |

**Findings:**
- Error messages mix Portuguese ("Erro ao buscar feedbacks") and English ("Failed to create entity")
- API internal logging uses English, user-facing errors use Portuguese
- No documented decision on language choice

### DRY Violations Inventory

| Violation | Instances | Files Affected | Severity |
|-----------|-----------|----------------|----------|
| Error response formatting | 66 | 8 API routes | High |
| Rate limit boilerplate | 3 | pdi/route.ts, feedback/route.ts, milestones/.../route.ts | Medium |
| Field mapping logic | 5 | queries.ts (all fetch functions) | Medium |
| IP extraction | 2 | feedback/route.ts, pdi/route.ts | Low |
| Supabase client init | 15+ | All routes + queries | Low (abstracted) |
| Error logging format | 20+ | All routes + queries | Low |

### Architecture Pattern Consistency

**Patterns established:**
- ✓ API routes follow consistent structure
- ✓ Zod schemas centralized in `lib/schemas/`
- ✓ Supabase clients separated by context (server vs client)
- ✓ Read-only queries abstracted in `lib/supabase/queries.ts`
- ⚠️ Write operations inline in API routes (no abstraction)
- ⚠️ No middleware pattern for cross-cutting concerns

---

## Security & Validation Review

### Input Validation Coverage

**Status:** ✓ All write operations use Zod validation

**Schemas:**
- `feedbackSchema` (feedback.ts)
- `pdiCreateSchema` / `pdiUpdateSchema` (crud.ts)
- `authSchema` (auth.ts)

**Coverage:** 100% of POST/PUT endpoints

### Rate Limiting

**Implementation:** Upstash Redis-backed rate limiting via `@upstash/ratelimit`

**Current coverage:**
- ✓ `/api/feedback` (POST)
- ✓ `/api/pdi` (POST)
- ⚠️ Missing on `/api/pdi/[id]` (PUT/DELETE)
- ⚠️ Missing on `/api/milestones/.../objectives/...` (PUT)

**Recommendation:** Add rate limiting to all mutation endpoints

### Error Exposure

**Status:** ⚠️ Mixed

**Good practices:**
- Generic error messages to users ("Internal server error")
- Detailed errors logged server-side

**Concerns:**
- Some routes expose Supabase error details to client (e.g., `details: error.message`)
- No sanitization of database errors before client exposure

---

## Dependencies & Stack Review

### Core Dependencies (Relevant to CQ)

```json
{
  "next": "16.3.4",              // Latest Next.js (note: bleeding edge)
  "@supabase/supabase-js": "^2.116.0",
  "zod": "^4.5.4",               // Latest Zod v4
  "typescript": "5.8.3"
}
```

**Version stability:**
- Next.js 16.3.4: **Canary/RC version** ⚠️ (stable is 14.x, 15.x is latest stable as of training data)
- Zod 4.5.4: Latest stable ✓
- TypeScript 5.8.3: Latest stable ✓

**Risk:** Next.js 16.x may have breaking changes or unstable APIs. Verify compatibility.

### Linting & Formatting

**Current setup:**
- `"lint": "next lint"` ✓
- No Prettier config visible
- No pre-commit hooks

**Recommendation:** Add Prettier + lint-staged for consistency enforcement

---

## Next.js 15 Specific Patterns

### Server Actions

**Current usage:** None detected

**Opportunity:** Replace some API routes with Server Actions for form submissions (feedback, admin CRUD)

**Example refactor:**
```typescript
// app/feedback/actions.ts
'use server'

export async function submitFeedback(formData: FormData) {
  const parsed = feedbackSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error }
  
  // ... insert logic
  revalidatePath('/admin')
  return { success: true }
}
```

**Benefits:**
- Eliminates API route boilerplate
- Automatic CSRF protection
- Progressive enhancement

### Metadata API

**Current implementation:** Not visible in files read

**Recommendation:** Add static metadata exports for SEO

```typescript
// app/layout.tsx or page.tsx
export const metadata = {
  title: 'PDI - Plano de Desenvolvimento Individual',
  description: '...'
}
```

### Route Handlers

**Current pattern:** ✓ Correctly using `route.ts` with named exports

**No issues found**

---

## Refactoring Priorities

### High Priority

1. **Extract API response helpers** (CQ-04)
   - Impact: 66 instances → 10-15 helper calls
   - Files: All 8 API routes
   - Effort: 1-2 hours

2. **Document naming conventions** (CQ-01)
   - Create `docs/CONVENTIONS.md`
   - Cover file naming, function naming, error message language
   - Effort: 30 minutes

3. **Standardize error logging** (CQ-05)
   - Replace all `console.error` with logger utility
   - Consistent context prefixes
   - Effort: 1 hour

### Medium Priority

4. **Extract rate limiting middleware** (CQ-04, CQ-05)
   - Impact: 3 routes
   - Add to missing mutation endpoints
   - Effort: 1 hour

5. **Consolidate field mapping** (CQ-02, CQ-06)
   - Generic mapper for snake_case ↔ camelCase
   - Apply to queries.ts
   - Effort: 2 hours

6. **Eliminate `any` types** (TS-01 prep)
   - Replace with proper type unions/generics
   - Target: 16 instances
   - Effort: 2-3 hours

### Low Priority

7. **Add error boundaries** (CQ-03)
   - `error.tsx` for route segments
   - React Error Boundary components
   - Effort: 1 hour

8. **Audit Next.js 16.x compatibility** (CQ-03)
   - Verify canary version stability
   - Consider downgrade to stable 15.x if issues found
   - Effort: 30 minutes research + potential migration

---

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking changes during refactor | Medium | High | Comprehensive testing after each extraction |
| Next.js 16.x instability | Medium | Medium | Document version, prepare downgrade path |
| Over-abstraction | Low | Medium | Keep helpers simple, avoid premature optimization |
| Test coverage gaps | High | High | Add tests for new utilities (Phase 09 expands) |

### Migration Risks

**Context:** Phase 05 just implemented feature flags for gradual DB migration

**Refactoring must preserve:**
- Feature flag behavior
- Fallback logic in `usePDIData`
- Integrity checking utilities

**Strategy:** Refactor internal implementations only, maintain public APIs

---

## Implementation Strategy

### Phase Structure Recommendation

**Proposed plan breakdown:**

**Plan 01: API Utilities Extraction (Wave 1)**
- Extract response helpers
- Extract validation helpers
- Extract rate limiting middleware
- Apply to 2-3 routes as proof-of-concept

**Plan 02: Naming & Logging Standardization (Wave 1, parallel to Plan 01)**
- Document conventions
- Implement logger utility
- Refactor all console.* calls
- Standardize error message language

**Plan 03: DRY Refactoring Application (Wave 2, depends on Plan 01)**
- Apply API utilities to all remaining routes
- Extract field mapping logic
- Consolidate Supabase client patterns

**Plan 04: Type Safety & Architecture Audit (Wave 2, parallel to Plan 03)**
- Eliminate `any` types
- Add error boundaries
- Verify Next.js patterns
- Create architecture documentation

**Plan 05: Quality Checklist & Verification (Wave 3, depends on all)**
- Run full code review against CQ-01 to CQ-06
- Generate consistency report
- Document patterns in `/docs`
- Create `.eslintrc` rules for convention enforcement

### Testing Strategy

**For each refactoring:**
1. Extract utility with tests
2. Replace 1 usage as proof
3. Run existing tests (from Phase 05)
4. Replace remaining usages
5. Verify no behavior change

**New tests needed:**
- API response helpers (unit tests)
- Validation helpers (unit tests)
- Rate limiting middleware (integration tests)
- Field mapping (unit tests)

---

## Success Criteria Mapping

### CQ-01: Consistent Naming Conventions

**Current state:** Mostly consistent, undocumented
**Actions:**
- Document in `/docs/CONVENTIONS.md`
- Add ESLint rules for enforcement
- Standardize error message language

**Verification:**
- `grep -r "function \|const \|export " | awk` audit passes naming rules
- Documentation PR approved

### CQ-02: No DRY Violations

**Current state:** 66+ instances of duplication
**Actions:**
- Extract 5 utility modules (responses, validation, middleware, mapping, logging)
- Replace all duplicated code

**Verification:**
- Code duplication detector shows <5% duplication
- Manual audit finds no repeated 10+ line blocks

### CQ-03: Next.js 15 Architecture Patterns

**Current state:** Mostly compliant, missing error boundaries
**Actions:**
- Add `error.tsx` and `loading.tsx` files
- Verify App Router best practices
- Audit Next.js 16.x compatibility

**Verification:**
- Next.js lint passes with no warnings
- Error boundaries catch and display errors
- All async pages have loading states

### CQ-04: Shared Utilities in lib/

**Current state:** Some utilities exist, many inline patterns
**Actions:**
- Create `lib/api/` with response, validation, middleware utilities
- Create `lib/logging.ts`
- Create `lib/supabase/mappers.ts`

**Verification:**
- All API routes import from `lib/api/*`
- No duplicated 5+ line blocks in API routes
- `lib/` directory has clear exports

### CQ-05: API Routes Follow Consistent Patterns

**Current state:** Consistent structure, implementation duplication
**Actions:**
- Apply extracted utilities to all routes
- Standardize error logging
- Add missing rate limiting

**Verification:**
- All routes use same helper functions
- All routes have rate limiting on mutations
- All routes follow same error handling pattern

### CQ-06: Database Queries Use Consistent Patterns

**Current state:** Read queries abstracted, write queries inline, manual mapping
**Actions:**
- Extract field mapping to generic helper
- Consider abstracting write operations
- Standardize error handling in queries

**Verification:**
- No manual snake_case ↔ camelCase mapping in queries
- All query functions follow same error handling pattern
- Write operations use consistent patterns

---

## Tooling Recommendations

### Static Analysis

**Add to package.json:**
```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "analyze": "next build --analyze"
  }
}
```

**Dependencies to add:**
```json
{
  "devDependencies": {
    "prettier": "^3.0.0",
    "eslint-config-prettier": "^9.0.0",
    "@next/bundle-analyzer": "^15.0.0"
  }
}
```

### Code Quality Gates

**Pre-commit hooks (husky + lint-staged):**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## References

### Next.js Documentation

- App Router: https://nextjs.org/docs/app
- Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Error Handling: https://nextjs.org/docs/app/building-your-application/routing/error-handling
- Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions

### Best Practices

- Next.js Patterns: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#best-practices
- Supabase + Next.js: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Zod Validation: https://zod.dev/

### Project Context

- Phase 05 Summary: `.planning/phases/05-unified-deployment-and-polish/05-01-SUMMARY.md`
- Feature Flags: `lib/feature-flags.ts`
- Current schemas: `lib/schemas/`
- Current queries: `lib/supabase/queries.ts`

---

## Appendix: File Inventory

### API Routes (8 files)
1. `app/api/admin/feedbacks/route.ts` (GET)
2. `app/api/admin/login/route.ts` (POST)
3. `app/api/auth/login/route.ts` (POST)
4. `app/api/auth/logout/route.ts` (POST)
5. `app/api/feedback/route.ts` (POST, GET)
6. `app/api/milestones/[id]/objectives/[objId]/route.ts` (PUT)
7. `app/api/pdi/route.ts` (GET, POST)
8. `app/api/pdi/[id]/route.ts` (PUT, DELETE - likely)

### Library Files (16 files)
- `lib/feature-flags.ts`
- `lib/ratelimit.ts`
- `lib/hooks/use-pdi-data.ts`
- `lib/hooks/use-pdi-data.test.ts`
- `lib/schemas/auth.ts`
- `lib/schemas/auth.test.ts`
- `lib/schemas/crud.ts`
- `lib/schemas/crud.test.ts`
- `lib/schemas/feedback.ts`
- `lib/schemas/responses.ts`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/queries.ts`
- `lib/supabase/types.ts`
- `lib/supabase/seeder.ts`
- `lib/validators/integrity.ts`

### Test Files (4 files)
- `__tests__/integrity.test.ts`
- `lib/hooks/use-pdi-data.test.ts`
- `lib/schemas/auth.test.ts`
- `lib/schemas/crud.test.ts`

---

**Research complete.** Ready for planning phase.

**Next step:** Create 4-5 plans covering:
1. API utilities extraction
2. Naming/logging standardization  
3. DRY refactoring application
4. Type safety & architecture audit
5. Quality verification & documentation
