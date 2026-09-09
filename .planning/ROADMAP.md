# ROADMAP: Database Migration & CRUD Edition

**Created:** 2026-09-09  
**Milestone:** v4.0  
**Granularity:** Standard (5-8 phases)  
**Coverage:** 73/73 requirements mapped ✓

---

## Phases

- [ ] **Phase 03: Database Schema & Data Migration** - Set up Supabase tables, RLS policies, and migrate pdiData.ts
- [ ] **Phase 04: Authentication & CRUD API** - Build auth middleware and all CRUD endpoints with validation
- [ ] **Phase 05: Feature Flags & Gradual Rollout** - Implement feature flag system with fallback logic
- [ ] **Phase 06: Milestone Completion Flow** - Build interactive objective completion with modal + password auth
- [ ] **Phase 07: Admin Panel CRUD UI** - Create admin routes and forms for all entities

---

## Phase Details

### Phase 03: Database Schema & Data Migration
**Goal**: PDI data persists in Supabase with proper schema, security policies, and initial seed data migrated from TypeScript.

**Depends on**: Nothing (first phase of v4.0)

**Requirements**: DB-01, DB-02, DB-03, DB-04, DB-05, DB-06, DB-07, DB-08, DB-09, DI-01

**Success Criteria** (what must be TRUE):
1. User can view public PDI data fetched from Supabase (skills, milestones, projects, resources, personal info)
2. Database schema includes all TypeScript fields (JSONB for requirements, objectives, unlockedRequirements)
3. RLS policies allow public reads but block unauthenticated writes
4. Indexes exist for performance-critical queries (category, status, phase, archived)
5. Backup of original pdiData.ts exists before migration runs

**Plans**: 3 plans in 2 waves

Plans:
- [x] 03-01-PLAN.md — Database schema with RLS policies and indexes (Wave 1)
- [x] 03-02-PLAN.md — Data migration scripts with backup (Wave 1)
- [ ] 03-03-PLAN.md — Verification and test page (Wave 2)

**UI hint**: no

---

### Phase 04: Authentication & CRUD API
**Goal**: Authenticated users can create, read, update, and delete all PDI entities via REST API endpoints.

**Depends on**: Phase 03

**Requirements**: API-01, API-02, API-03, API-04, API-05, API-06, API-07, API-08, API-09, API-10, API-11, API-12, API-13, API-14, API-15, API-16, API-17, API-18, API-19, API-20, API-21, API-22, AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, DI-03, DI-04

**Success Criteria** (what must be TRUE):
1. Unauthenticated user can GET all entities but receives 401 on write attempts
2. User with correct password can create, update, and delete any PDI entity via API
3. All write endpoints validate input with Zod and return 400 for invalid data
4. All write endpoints are rate-limited via Upstash Redis (429 response when exceeded)
5. API logs all write operations with timestamp, entity type, and operation type

**Plans**: TBD

**UI hint**: no

---

### Phase 05: Feature Flags & Gradual Rollout
**Goal**: PDI application can dynamically switch between static data (pdiData.ts) and database backend per entity type, with automatic fallback on errors.

**Depends on**: Phase 04

**Requirements**: FF-01, FF-02, FF-03, FF-04, FF-05, FF-06, FF-07, FF-08, FF-09, DI-02, DI-05

**Success Criteria** (what must be TRUE):
1. Admin can toggle feature flags via environment variables (FEATURE_DB_SKILLS, etc.)
2. Frontend fetches data from API when flag is enabled, from pdiData.ts when disabled
3. If API fails, application automatically falls back to pdiData.ts and logs the error
4. Admin panel displays current feature flag states with visual indicators
5. Validation script can compare mock data vs database data and report discrepancies

**Plans**: TBD

**UI hint**: yes

---

### Phase 06: Milestone Completion Flow
**Goal**: Users can mark milestone objectives as complete with justification and password verification directly from the PDI dashboard.

**Depends on**: Phase 04

**Requirements**: MCF-01, MCF-02, MCF-03, MCF-04, MCF-05, MCF-06, MCF-07, MCF-08, MCF-09, MCF-10

**Success Criteria** (what must be TRUE):
1. User can click checkbox next to milestone objective and see modal with textarea for justification
2. User must enter valid password in modal to save completion
3. Invalid password shows inline error without closing modal
4. Valid save shows success toast and checkbox becomes checked
5. User can edit milestone title, description, deadline, or add new objectives inline with password verification

**Plans**: TBD

**UI hint**: yes

---

### Phase 07: Admin Panel CRUD UI
**Goal**: Admin can manage all PDI content (skills, milestones, projects, resources, personal info) through a dedicated admin interface with search, filtering, and CRUD operations.

**Depends on**: Phase 04

**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04, ADMIN-05, ADMIN-06, ADMIN-07, ADMIN-08, ADMIN-09, ADMIN-10, ADMIN-11, ADMIN-12, ADMIN-13

**Success Criteria** (what must be TRUE):
1. Admin can view all skills in a table with search, filter, sort, and pagination
2. Admin can create new skill with form including requirements array input
3. Admin can edit existing skill and delete with confirmation dialog
4. Admin can manage milestones with full objectives array editing (add/remove/reorder)
5. Admin can manage projects, resources, and personal info with dedicated forms
6. All admin routes reuse existing /admin authentication (no duplicate login logic)

**Plans**: TBD

**UI hint**: yes

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 03. Database Schema & Data Migration | 2/3 | In Progress | - |
| 04. Authentication & CRUD API | 0/0 | Not started | - |
| 05. Feature Flags & Gradual Rollout | 0/0 | Not started | - |
| 06. Milestone Completion Flow | 0/0 | Not started | - |
| 07. Admin Panel CRUD UI | 0/0 | Not started | - |

---

## Coverage Map

**Phase 03** (10 requirements):
DB-01, DB-02, DB-03, DB-04, DB-05, DB-06, DB-07, DB-08, DB-09, DI-01

**Phase 04** (31 requirements):
API-01, API-02, API-03, API-04, API-05, API-06, API-07, API-08, API-09, API-10, API-11, API-12, API-13, API-14, API-15, API-16, API-17, API-18, API-19, API-20, API-21, API-22, AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, DI-03, DI-04

**Phase 05** (12 requirements):
FF-01, FF-02, FF-03, FF-04, FF-05, FF-06, FF-07, FF-08, FF-09, DI-02, DI-05

**Phase 06** (10 requirements):
MCF-01, MCF-02, MCF-03, MCF-04, MCF-05, MCF-06, MCF-07, MCF-08, MCF-09, MCF-10

**Phase 07** (13 requirements):
ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04, ADMIN-05, ADMIN-06, ADMIN-07, ADMIN-08, ADMIN-09, ADMIN-10, ADMIN-11, ADMIN-12, ADMIN-13

**Total:** 73/73 requirements mapped ✓

---

*Roadmap created: 2026-09-09*  
*Milestone: v4.0 — Database Migration & CRUD Edition*
