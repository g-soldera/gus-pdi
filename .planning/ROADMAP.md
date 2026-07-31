# ROADMAP DO PDI: Pleno a AI Security Specialist (SecMLOps & AI Governance)

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-01 | Phase 1 | Complete |
| REQ-02 | Phase 1 | Complete |
| REQ-03 | Phase 2 | Pending |
| REQ-04 | Phase 2 | Pending |
| REQ-05 | Phase 3 | Pending |
| REQ-06 | Phase 3 | Pending |

## Fases

- [x] **Fase 1: Base em SecMLOps (A Ponte)** - Contextualização e SecMLOps (Pipeline & Governança) ✓ 2025-07-31
- [ ] **Fase 2: Arquitetura de Defesa** - Runtime, Guardrails & Model Supply Chain Security
- [ ] **Fase 3: AI Sec Specialist** - Adversarial ML, Red Teaming & Estratégia de Risco

## Phase Details

### Fase 1: Base em SecMLOps (A Ponte)
**Goal**: Integrar conceitos de segurança em pipelines de dados e modelos que o usuário já domina, focando em modelagem de ameaças e automação de 'security gates'.
**Depends on**: Nothing
**Requirements**: REQ-01, REQ-02
**Success Criteria** (what must be TRUE):
  1. Usuário consegue demonstrar validação automatizada de modelos no CI/CD.
  2. Usuário mapeia ameaças em fluxo de IA baseando-se no framework MITRE ATLAS.
  3. Usuário audita rastreabilidade de artefatos de IA para governança.
**Plans**: 2 plans
- [x] 01-01-PLAN.md — Configure automated CI/CD for model validation
- [x] 01-02-PLAN.md — Document threats based on MITRE ATLAS and define AI artifact traceability

### Fase 2: Arquitetura de Defesa
**Goal**: Aplicar arquitetura para defesas sistêmicas contra ameaças no runtime de LLMs e integridade na entrega de modelos.
**Depends on**: Fase 1
**Requirements**: REQ-03, REQ-04
**Success Criteria** (what must be TRUE):
  1. Usuário implementa camada de guardrails que intercepta injeções contextuais de prompt.
  2. Usuário estrutura arquitetura segura de inferência abordando o OWASP Top 10 LLM.
  3. Usuário valida a cadeia de suprimentos usando 'safetensors' ou similar.
**Plans**: TBD

### Fase 3: AI Sec Specialist
**Goal**: Desenvolver postura proativa e estratégica de segurança em IA, ditando as diretrizes arquiteturais (Carreira Y).
**Depends on**: Fase 2
**Requirements**: REQ-05, REQ-06
**Success Criteria** (what must be TRUE):
  1. Usuário elabora plano tático e defesas para Red Teaming (Adversarial ML).
  2. Usuário desenha um framework corporativo ou design doc (ex. usando NIST AI RMF) guiando o posicionamento arquitetural.
  3. Usuário testa e mitiga métodos de Evasão/Inversão em modelos.
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Base em SecMLOps | 2/2 | Complete | 2025-07-31 |
| 2. Arquitetura de Defesa | 0/0 | Not started | - |
| 3. AI Sec Specialist | 0/0 | Not started | - |