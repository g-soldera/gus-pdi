# PDI Migration Summary — v3.0 (Engineering Ladder)

**Data:** 2026-08-10  
**Modelo Anterior:** Anos fixos (2026-2033) com fases 1-7  
**Modelo Novo:** Níveis técnicos L1-L7 baseados em KPIs

---

## ✅ O que foi implementado

### 1. **Framework de Níveis (L1-L7)**
- **L1 — Intern / Estagiário** → 6-12 meses
- **L2 — Entry / Júnior** → 12-18 meses (ATUAL)
- **L3 — Mid / Pleno** → 18-24 meses
- **L4 — Senior / Sênior** → 24-36 meses
- **L5 — Staff Engineer / Especialista I** → 36-48 meses
- **L6 — Principal Engineer / Especialista II** → 48+ meses
- **L7 — Distinguished Engineer / Especialista III** → N/A

### 2. **KPIs Mensuráveis por Nível**
Cada transição (L2→L3, L3→L4, etc.) tem KPIs objetivos:
- Entregas (projetos, sistemas, frameworks)
- Impacto (métricas de custo, performance, incidentes)
- Liderança (mentoria, influência arquitetural)
- Certificações (CRTP, OSCP, CAISP, CISSP, etc.)
- Reconhecimento (palestras, contribuições públicas)

### 3. **Trilha de Certificações AI Security Integrada**
Certificações extraídas do HTML `trilha-ai-security.html` e mapeadas nos níveis:

| Nível | Certificações |
|-------|---------------|
| L1-L2 | AWS Cloud Practitioner ✓, Security+ ✓, Analytics Engineer ✓, API Owner ✓ |
| L3 (Mid) | **CRTP**, **OSCP**, **iSAQB CPSA-F** |
| L4 (Senior) | **CAISP**, **CMCPSE** (opcional), **AWS SA Pro** |
| L5 (Staff) | **CISSP** |
| L6 (Principal) | **ISO/IEC 42001**, **iSAQB CPSA-A** |
| L7 (Distinguished) | **ISACA AAISM** |

### 4. **Milestones Refatorados**
- **Removida:** Estrutura de "anos" (Pleno Ano 1, Sênior Ano 2, etc.)
- **Removida:** Trilha SecMLOps separada
- **Adicionado:** Milestones integrados por nível (L1-L7)
- **Adicionado:** Certificações como milestones dentro dos níveis

**Exemplos de novos milestones:**
- `cert-crtp` (L2) — CRTP para fundação ofensiva
- `cert-oscp` (L3) — OSCP para consolidação técnica
- `cert-caisp` (L4) — CAISP para especialização em AI Security
- `cert-cissp` (L5) — CISSP para liderança de segurança
- `cert-aaism` (L7) — AAISM para expertise executiva

### 5. **Estrutura de Dados Atualizada**

**Tipos TypeScript (`src/types/pdi.ts`):**
```typescript
export type CareerLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';

export interface LevelRequirements {
  level: CareerLevel;
  title: string;
  titleShort?: string; // Para UI
  equivalentRole: string;
  minDuration: string;
  kpis: KPI[];
  behaviors: string[];
  certifications: string[];
  exitCriteria: string;
}

export interface KPI {
  id: string;
  description: string;
  target: string;
  current?: string;
  achieved: boolean;
  evidence?: string;
}
```

**Dados (`src/data/`):**
- `careerLevels.ts` — KPIs e requisitos por nível L1-L7
- `certifications.ts` — 14 certificações detalhadas (tópicos, custos, exames)
- `pdiData.ts` — Milestones remapeados para L1-L7, resources com certificações

### 6. **Interface Atualizada**

**Hero.tsx:**
- Timeline visual agora mostra L1→L2→L3→L4→L5→L6→L7
- Usa `titleShort` para exibir versão reduzida (ex: "L2 - Entry", "L7 - Distinguished / Spec III")
- Destaque no nível atual (L2) com animação

**Milestones.tsx:**
- Filtros de fase agora são L1-L7 (removido "secmlops")
- Labels: "L1 (Intern)", "L2 (Entry)", "L3 (Mid)", etc.
- Cada nível exibe seus milestones e certificações

### 7. **Documentação Atualizada**

**`.planning/`:**
- `PROJECT.md` → Core Value atualizado para níveis L1-L7
- `REQUIREMENTS.md` → Requisitos remapeados (L2-L3-AUTONOMY, L3-L4-ARCHITECTURE, etc.)
- `ROADMAP.md` → Roadmap detalhado com KPIs por nível
- `STATE.md` → Status atual: L2 (Entry) → L3 (Mid)
- `career-levels-framework.md` → Documento completo do framework

---

## 🎯 Estado Atual

**Nível:** L2 — Entry / Júnior  
**Próximo Nível:** L3 — Mid / Pleno  
**KPIs L2→L3 em progresso:**
- ✓ Certificações base (Cloud Practitioner, Security+, Analytics Engineer, API Owner)
- 🔄 Autonomia em 10+ features/bugfixes
- 🔄 Design técnico aprovado em 2+ features complexas
- 🔄 Apresentação técnica para 20+ pessoas
- 🔄 Mentoria de 2+ juniores
- 🔄 CRTP ou AWS SA Associate

---

## 📊 Benefícios do Novo Modelo

✅ **Mensurável:** KPIs objetivos por nível  
✅ **Agnóstico a tempo:** Progressão baseada em entrega, não calendário  
✅ **Certificações integradas:** Cada nível tem certs mapeadas  
✅ **Linearidade clara:** Cada nível é pré-requisito conceitual do próximo  
✅ **Alinhado ao mercado:** Modelo L1-L7 reconhecido globalmente (FAANG-style)  
✅ **Evidências reais:** Portfólio documentado de entregas e impacto  
✅ **Trilha AI Security:** CRTP→OSCP→CAISP→CISSP→ISO 42001→AAISM integrada na carreira  

---

## 🚀 Próximos Passos

1. **Validar KPIs L2→L3** com gestor em 1:1
2. **Iniciar CRTP** (fundação ofensiva para AI Security)
3. **Documentar progresso** dos objetivos L2 atuais
4. **Revisar trimestralmente** os KPIs com evidências
5. **Preparar portfólio** de entregas para transição L2→L3

---

*Última atualização: 2026-08-10*
