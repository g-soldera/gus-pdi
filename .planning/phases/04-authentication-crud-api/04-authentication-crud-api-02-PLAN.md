---
phase: authentication-crud-api
plan: 02
type: execute
wave: 2
depends_on:
  - "04-authentication-crud-api-01"
files_modified:
  - lib/schemas/crud.ts
  - app/api/pdi/route.ts
  - app/api/pdi/[id]/route.ts
autonomous: true
requirements:
  - CRUD-01
  - CRUD-02
  - RATE-01

must_haves:
  truths:
    - "CRUD endpoints for PDI entities validate input using Zod schemas"
    - "Rate limiting is enforced on sensitive endpoints"
    - "API returns proper HTTP status codes for success and validation failure"
  artifacts:
    - path: "lib/schemas/crud.ts"
      provides: "Zod validation schemas for PDI CRUD operations"
      exports: ["pdiCreateSchema", "pdiUpdateSchema"]
    - path: "app/api/pdi/route.ts"
      provides: "GET and POST REST endpoints for PDI collection"
      exports: ["GET", "POST"]
    - path: "app/api/pdi/[id]/route.ts"
      provides: "GET, PUT, and DELETE REST endpoints for individual PDI resources"
      exports: ["GET", "PUT", "DELETE"]
  key_links:
    - from: "app/api/pdi/route.ts"
      to: "lib/schemas/crud.ts"
      via: "Zod validation parse"
      pattern: "pdiCreateSchema\\.parse"
    - from: "app/api/pdi/route.ts"
      to: "lib/ratelimit.ts"
      via: "Rate limit check"
      pattern: "rateLimit"
---

<objective>
Implement Zod validation schemas for CRUD operations and secure REST endpoints for PDI resources with rate limiting.

Purpose: Provide robust data validation and protected CRUD endpoints for the PDI system.
Output: `lib/schemas/crud.ts`, `app/api/pdi/route.ts`, `app/api/pdi/[id]/route.ts`
</objective>

<execution_context>
@$HOME/.config/opencode/get-shit-done/workflows/execute-plan.md
@$HOME/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@lib/ratelimit.ts
@.planning/phases/04-authentication-crud-api/04-authentication-crud-api-01-PLAN.md
</context>

<tasks>

<task type="auto" tdd="true">
  <name>task 1: create crud validation schemas</name>
  <files>lib/schemas/crud.ts</files>
  <behavior>
    - Test 1: pdiCreateSchema validates correct PDI payload
    - Test 2: pdiUpdateSchema allows partial updates
  </behavior>
  <action>Create Zod validation schemas for creating and updating PDI entities.</action>
  <verify>
    <automated>npx ts-node -e "import { pdiCreateSchema } from './lib/schemas/crud'; console.log(pdiCreateSchema.safeParse({title: 'Test'}).success)"</automated>
  </verify>
  <done>lib/schemas/crud.ts exists with exported pdiCreateSchema and pdiUpdateSchema</done>
</task>

<task type="auto">
  <name>task 2: implement pdi rest endpoints with rate limiting and validation</name>
  <files>app/api/pdi/route.ts, app/api/pdi/[id]/route.ts</files>
  <action>Implement GET/POST in app/api/pdi/route.ts and GET/PUT/DELETE in app/api/pdi/[id]/route.ts using Supabase queries, Zod validation, and rate limiting from lib/ratelimit.ts.</action>
  <verify>
    <automated>curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/pdi</automated>
  </verify>
  <done>PDI REST endpoints implemented with full validation and rate limiting protection</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Client → PDI API | Unverified input payload |
| API → Database | Executing queries with user input |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-CRUD-01 | Tampering | pdi/route.ts | mitigate | Validate all incoming payloads with `pdiCreateSchema` and `pdiUpdateSchema` |
| T-CRUD-02 | Denial of Service | pdi/route.ts | mitigate | Apply rate limiting using `lib/ratelimit.ts` on write operations |
</threat_model>

<verification>
- Verify PDI collection endpoints respond correctly.
- Verify validation correctly catches invalid updates/creations.
</verification>

<success_criteria>
- CRUD Zod schemas are defined.
- PDI collection and dynamic route handlers are in place with rate limiting and validation.
</success_criteria>

<output>
After completion, create `.planning/phases/04-authentication-crud-api/04-authentication-crud-api-02-SUMMARY.md`
</output>
