# Requirements: Database Migration & CRUD Edition

**Defined:** 2026-09-09  
**Milestone:** v4.0  
**Core Value:** Migrar PDI de dados estáticos para backend com banco de dados, permitindo edição segura e persistente com autenticação.

---

## v4.0 Requirements

### Database Schema & Migration (DB)

- [ ] **DB-01**: Schema SQL para tabela `skills` (id, name, level, description, category, type, requirements JSONB)
- [ ] **DB-02**: Schema SQL para tabela `milestones` (id, title, displayName, description, status, progress, deadline, notes, objectives JSONB, relatedSkills, relatedResources, phase, archived, unlockedRequirements JSONB)
- [ ] **DB-03**: Schema SQL para tabela `projects` (id, title, description, tech, links, status)
- [ ] **DB-04**: Schema SQL para tabela `resources` (id, category, title, description, url, completed)
- [ ] **DB-05**: Schema SQL para tabela `personal_info` (singleton com campos do PersonalInfo)
- [ ] **DB-06**: Script de migração de dados de `pdiData.ts` para Supabase (seed inicial)
- [ ] **DB-07**: Row Level Security (RLS) policies: leitura pública, escrita autenticada
- [ ] **DB-08**: Índices para performance (category, status, phase, archived)
- [ ] **DB-09**: Constraints e foreign keys onde aplicável

### CRUD API Endpoints (API)

- [ ] **API-01**: `GET /api/skills` — listar todas as skills
- [ ] **API-02**: `POST /api/skills` — criar skill (auth required)
- [ ] **API-03**: `PUT /api/skills/[id]` — atualizar skill (auth required)
- [ ] **API-04**: `DELETE /api/skills/[id]` — deletar skill (auth required)
- [ ] **API-05**: `GET /api/milestones` — listar todos os milestones
- [ ] **API-06**: `POST /api/milestones` — criar milestone (auth required)
- [ ] **API-07**: `PUT /api/milestones/[id]` — atualizar milestone (auth required)
- [ ] **API-08**: `PATCH /api/milestones/[id]/objectives/[objId]` — marcar objective como completo com justificativa (auth required)
- [ ] **API-09**: `DELETE /api/milestones/[id]` — deletar milestone (auth required)
- [ ] **API-10**: `GET /api/projects` — listar todos os projetos
- [ ] **API-11**: `POST /api/projects` — criar projeto (auth required)
- [ ] **API-12**: `PUT /api/projects/[id]` — atualizar projeto (auth required)
- [ ] **API-13**: `DELETE /api/projects/[id]` — deletar projeto (auth required)
- [ ] **API-14**: `GET /api/resources` — listar todos os recursos
- [ ] **API-15**: `POST /api/resources` — criar recurso (auth required)
- [ ] **API-16**: `PUT /api/resources/[id]` — atualizar recurso (auth required)
- [ ] **API-17**: `DELETE /api/resources/[id]` — deletar recurso (auth required)
- [ ] **API-18**: `GET /api/personal-info` — obter informações pessoais
- [ ] **API-19**: `PUT /api/personal-info` — atualizar informações pessoais (auth required)
- [ ] **API-20**: Validação Zod em todos os endpoints de escrita
- [ ] **API-21**: Rate limiting com Upstash Redis em endpoints de escrita
- [ ] **API-22**: Error handling padronizado (400, 401, 403, 404, 500)

### Authentication & Authorization (AUTH)

- [ ] **AUTH-01**: Middleware de autenticação por senha (variável de ambiente `ADMIN_PASSWORD`)
- [ ] **AUTH-02**: Proteção de todas as rotas de escrita (POST/PUT/PATCH/DELETE) com auth middleware
- [ ] **AUTH-03**: Session management via cookie HMAC (reutilizar implementação existente de `/admin`)
- [ ] **AUTH-04**: Endpoint `POST /api/auth/verify` para validar senha sem criar sessão (para modals)
- [ ] **AUTH-05**: Logout endpoint `POST /api/auth/logout` para invalidar sessão

### Feature Flags & Gradual Migration (FF)

- [ ] **FF-01**: Variável de ambiente `FEATURE_DB_SKILLS` para habilitar skills do DB
- [ ] **FF-02**: Variável de ambiente `FEATURE_DB_MILESTONES` para habilitar milestones do DB
- [ ] **FF-03**: Variável de ambiente `FEATURE_DB_PROJECTS` para habilitar projects do DB
- [ ] **FF-04**: Variável de ambiente `FEATURE_DB_RESOURCES` para habilitar resources do DB
- [ ] **FF-05**: Variável de ambiente `FEATURE_DB_PERSONAL_INFO` para habilitar personalInfo do DB
- [ ] **FF-06**: Hook `usePDIData(entity)` que decide entre mock (pdiData.ts) e API conforme feature flag
- [ ] **FF-07**: Fallback automático para mock se API falhar (com logging)
- [ ] **FF-08**: Painel admin com toggle visual de feature flags (leitura + escrita protegida)
- [ ] **FF-09**: Validação de consistência entre mock e DB durante transição (comparador)

### Milestone Completion Flow (MCF)

- [ ] **MCF-01**: Botão de checkbox em cada objetivo do milestone abre modal ao clicar
- [ ] **MCF-02**: Modal com textarea para justificativa da conclusão
- [ ] **MCF-03**: Input de senha no modal (validação inline sem criar sessão)
- [ ] **MCF-04**: Botão "Save" chama `PATCH /api/milestones/[id]/objectives/[objId]` com justificativa
- [ ] **MCF-05**: Loading state durante save
- [ ] **MCF-06**: Success feedback (toast + checkbox marcado) após save
- [ ] **MCF-07**: Error feedback se senha inválida ou falha de rede
- [ ] **MCF-08**: Modal pode ser fechado sem salvar (cancel)
- [ ] **MCF-09**: Edição inline de milestone title, description, deadline (com senha)
- [ ] **MCF-10**: Adicionar novo objetivo a milestone existente (com senha)

### Admin Panel Enhancement (ADMIN)

- [ ] **ADMIN-01**: Rota `/admin/skills` com tabela de skills + CRUD UI
- [ ] **ADMIN-02**: Formulário de criação/edição de skill (todos os campos + requirements array)
- [ ] **ADMIN-03**: Rota `/admin/milestones` com tabela de milestones + CRUD UI
- [ ] **ADMIN-04**: Formulário de criação/edição de milestone (todos os campos + objectives array)
- [ ] **ADMIN-05**: Rota `/admin/projects` com tabela de projects + CRUD UI
- [ ] **ADMIN-06**: Formulário de criação/edição de project
- [ ] **ADMIN-07**: Rota `/admin/resources` com tabela de resources + CRUD UI
- [ ] **ADMIN-08**: Formulário de criação/edição de resource
- [ ] **ADMIN-09**: Rota `/admin/personal-info` com formulário de edição
- [ ] **ADMIN-10**: Tabelas com busca, filtro, ordenação e paginação
- [ ] **ADMIN-11**: Confirmação antes de delete (alert dialog)
- [ ] **ADMIN-12**: Navegação entre seções do admin panel (sidebar ou tabs)
- [ ] **ADMIN-13**: Reutilizar autenticação existente do `/admin` (sem duplicar lógica)

### Data Integrity & Safety (DI)

- [ ] **DI-01**: Backup automático de pdiData.ts antes da primeira migração
- [ ] **DI-02**: Script de export de DB → pdiData.ts (rollback manual se necessário)
- [ ] **DI-03**: Validação de schema TypeScript nos dados retornados da API
- [ ] **DI-04**: Logs de todas as operações de escrita (audit trail)
- [ ] **DI-05**: Testes de integridade: comparar mock vs DB durante fase de feature flags

---

## Future Requirements (Deferred)

- [ ] **FUTURE-01**: Histórico de edições (audit log UI)
- [ ] **FUTURE-02**: Autenticação multi-usuário (OAuth / Supabase Auth)
- [ ] **FUTURE-03**: API pública read-only (rate limited)
- [ ] **FUTURE-04**: Versionamento de milestones (snapshots)
- [ ] **FUTURE-05**: Sincronização offline (service worker)

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time collaboration | Projeto pessoal, single-user suficiente para v4.0 |
| GraphQL API | REST é suficiente para este caso de uso |
| Multi-tenancy | Não há necessidade de múltiplos PDIs isolados |

---

## Traceability

(Preenchido pelo roadmapper após criação das fases)

---

**Defined:** 2026-09-09  
**Last updated:** 2026-09-09  
**Status:** v4.0 scoping complete
