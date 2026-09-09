---
milestone: "v4.0"
milestone_name: "Database Migration & CRUD Edition"
status: planning
---
gsd_state_version: 2.0
milestone: v4.0
milestone_name: database-migration-crud
current_phase: 00
current_phase_name: defining-requirements
status: planning
last_updated: "2026-09-09T13:31:00.000Z"
last_activity: 2026-09-09
last_activity_desc: Milestone v4.0 started — Database Migration & CRUD Edition
progress:
  total_phases: 0
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---
# Project State

## Project Reference
**Core Value:** Construir senioridade técnica real e mensurável através de um framework de níveis (L1-L7) com KPIs objetivos, progressão baseada em entrega, e trilha certificada de AI Security.

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements for v4.0
Last activity: 2026-09-09 — Milestone v4.0 started

Progress: [░░░░░░░░░░░░░░░░░░░░] 0%

## Accumulated Context
- Modelo antigo baseado em "anos" descartado. Adotado modelo de Engineering Ladder (L1-L7).
- KPIs quantificáveis criados para cada nível (entrega, impacto, arquitetura, liderança).
- Trilha de certificações AI Security (CRTP, OSCP, CAISP, CISSP, ISO 42001, AAISM) mapeada nos níveis L3 a L7.
- Dados TypeScript refatorados para dar suporte a este modelo.
- Phase 02 planejada: migração Vite→Next.js + formulário de feedback seguro + painel admin.

## Phases

### Phase 01 (pleno-ano-1-2026-2027) — CONCLUÍDA
Implementação da UI do dashboard PDI: timeline de carreira, milestones arquivados, StudyPath SecMLOps, Resources. Todos os componentes entregues.

### Phase 02 (feedback-e-migracao-nextjs) — EM PLANEJAMENTO
Três waves sequenciais planejadas:
- **Wave 1** (`02-01-PLAN.md`): Migração Vite→Next.js 15 App Router. Rotas: `/` (landing), `/pdi` (dashboard), `/feedback` (placeholder). Security headers.
- **Wave 2** (`02-02-PLAN.md`): Backend de feedback — schema SQL Supabase + RLS, Zod schema, rate limiting Upstash, route handler `POST /api/feedback` com hash de IP.
- **Wave 3** (`02-03-PLAN.md`): UI do formulário `/feedback` (honeypot, toggle anônimo/identificado, aviso LGPD) + painel `/admin` protegido por senha simples (cookie HMAC, middleware Edge).

Pré-requisitos de usuário para Wave 2:
- Conta Upstash Redis criada (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
- Projeto Supabase criado e schema SQL executado
- .env.local com IP_HASH_SECRET, ADMIN_SECRET, ADMIN_PASSWORD

## Session Continuity
Próximo passo: executar Wave 1 (`02-01-PLAN.md`) — migração Vite→Next.js. Após checkpoint aprovado, prosseguir para Wave 2.
