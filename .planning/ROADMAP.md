# Roadmap: Database Migration & CRUD Edition

## Status
- **Milestone:** v4.0
- **Status:** In progress
- **Phases:**
  - [x] **Phase 01:** UI do dashboard PDI (v3.0) — Completed
  - [x] **Phase 02:** Migração Vite→Next.js 15 + Feedback & Admin (v3.0) — Completed
  - [x] **Phase 03:** Database Schema & Data Migration — Completed
  - [x] **Phase 04:** Optimization & Authentication & CRUD API — Completed
  - [ ] **Phase 05:** Unified Deployment & Polish (Feature Flags, Milestone Flow, Admin CRUD UI, & Data Integrity) — Pending

## Phase Details

### Phase 01: UI do dashboard PDI (v3.0)
- **Goal:** Implementação da UI do dashboard PDI (timeline de carreira, milestones arquivados, StudyPath SecMLOps, Resources).
- **Status:** Completed

### Phase 02: Migração Vite→Next.js 15 + Feedback & Admin (v3.0)
- **Goal:** Migração Vite→Next.js 15 + formulário de feedback seguro + painel admin.
- **Status:** Completed

### Phase 03: Database Schema & Data Migration
- **Goal:** Set up Supabase tables, RLS policies, migrate pdiData.ts to Supabase dynamic queries.
- **Requirements:** DB-01 to DB-09, DI-01
- **Status:** Completed

### Phase 04: Optimization, Authentication & CRUD API
- **Goal:** Performance optimization, authentication middleware, and complete REST CRUD endpoints for all entities.
- **Requirements:** PERF-01, PERF-02, API-01 to API-22, AUTH-01 to AUTH-05, DI-03, DI-04
- **Status:** Completed

### Phase 05: Unified Deployment & Polish
- **Goal**: Integrate feature flags, interactive milestone completion flows, admin panel CRUD UI, and data integrity safeguards into the operational production environment.
- **Requirements**: FF-01 to FF-09, MCF-01 to MCF-10, ADMIN-01 to ADMIN-13, DI-02, DI-05
- **Status**: In progress
- **Plans**:
  - [x] 05-01-PLAN.md — Feature flags, hybrid hooks, mock vs DB integrity tests, and DB export script
  - [ ] 05-02-PLAN.md — Interactive milestone completion flow, objective modal, and password-protected update API
  - [ ] 05-03-PLAN.md — Comprehensive admin CRUD panel for all entities with search, pagination, and unified auth

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 01. UI do dashboard PDI | - | Completed | - |
| 02. Migração Vite→Next.js | - | Completed | - |
| 03. Database Schema & Migration | - | Completed | - |
| 04. Optimization, Auth & CRUD API | 3/3 | Completed | 2026-09-09 |
| 05. Unified Deployment & Polish | 1/3 | In progress | - |
