# Phase 1: Pleno Ano 1 (2026-2027) - Context

**Gathered:** 2026-08-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Estruturar e visualizar o Plano de Desenvolvimento Individual (PDI) focado na transição de carreira de Analytics Engineer para AI Security Specialist no Itaú. Implementar interface React para acompanhamento de milestones, trilha de estudos SecMLOps, referências materiais e visualização do progresso da carreira.

Phase 1 of Milestone v2.0 (PDI Estruturado — Pleno a AI Security Specialist).

Timeline: 2026-2027 (Target: Promoção Pleno mai/2027 + PRAD/Mérito 2027)

Requirements covered: PLENO-02 (autonomia técnica + comunicação)

</domain>

<decisions>
## Implementation Decisions

### Estruturação do Conteúdo de PDI
- **D-01:** Implementar milestones sugeridos em `PDI_UPDATE_SPECS.md`: arquitetura, liderança técnica, engenharia de IA, MLOps, AWS SA Pro, cross-team impact, mentoria avançada
- **D-02:** Adicionar campo `archived: boolean` aos milestones para despriorização de itens com progresso < 50%
- **D-03:** Criar trilha de estudos SecMLOps organizada por tópicos: Model Supply Chain, Runtime Guardrails, Adversarial ML, NIST AI RMF

### Interface de Visualização
- **D-04:** Substituir barra de progresso atual por timeline horizontal visual da carreira: Freelancer → Estagiário → Júnior → Pleno (atuando como) → Sênior
- **D-05:** Adicionar ícone de arquivo (`Archive`) para milestones despriorizados com estilo visual diferenciado (opacidade reduzida, cor cinza)
- **D-06:** Criar visualização de trilha de estudos com progresso por categoria e referências de materiais

### Gestão de Conhecimento
- **D-07:** Implementar sistema de referências materiais por milestone (livros, artigos, cursos, certificações)
- **D-08:** Adicionar dashboard de progresso consolidado com métricas de tempo, % conclusão, dependências
- **D-09:** Documentar arquitetura de gestão de PDI para demonstrar autonomia técnica e comunicação (PLENO-02)

### the agent's Discretion
- Escolha de componentes de timeline visual (recharts, custom)
- Estrutura de armazenamento de referências (in-memory, local storage, arquivo JSON)
- Formato de visualização da trilha de estudos (tabela, cards, gráfico de barras)

</decisions>

<specifics>
## Specific Ideas

- Timeline visual: horizontal com marcos históricos e targets futuros (Sênior em 2028)
- Milestones despriorizados: estilo com `archived: true` e ícone de arquivo
- Trilha SecMLOps: categorias com subtópicos, progresso e links para materiais
- Referências: sistema de tags por milestone (livro, artigo, curso, certificação)
- Dashboard: visão consolidada com KPI de progresso e tempo restante
- Documentação técnica: arquitetura do sistema React + TypeScript para demonstrar autonomia

</specifics>

<canonical_refs>
## Canonical References

### React UI Components
- Recharts documentation — para gráficos e timeline
- shadcn/ui components — para interface consistente
- Tailwind CSS — estilização moderna

### Career Development
- Itaú Career Framework — critérios Pleno → Sênior
- PRAD/Mérito guidelines — KPIs de avaliação
- AWS Solutions Architect Professional — plano de estudos

### AI Security Resources
- MITRE ATLAS — framework de ameaças AI
- OWASP Top 10 for LLMs — padrões de segurança
- NIST AI RMF — framework de gerenciamento de risco
- Paperswithcode — artigos acadêmicos SecMLOps

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/data/pdiData.ts` — dados de milestones e skills existentes
- `src/types/pdi.ts` — interfaces TypeScript definidas
- React components (shadcn/ui) — base para nova interface
- Tailwind CSS — estilização consistente

### Established Patterns
- TypeScript + React + Vite — stack atual
- Path alias @/* → src/* — organização de código
- Component-first architecture — padrão de desenvolvimento

### Integration Points
- Update `pdiData.ts` com novos milestones da especificação
- Extender `src/types/pdi.ts` para suportar `archived`
- Criar novos componentes para timeline e trilha de estudos
- Adicionar sistema de referências materiais

</code_context>

<deferred>
## Deferred Ideas

- Integração com backend para persistência (Phase 2+)
- Sistema de notificações e lembretes (Phase 2+)
- Colaboração multi-usuário (Phase 3+)
- Relatórios PDF automatizados (Phase 2+)
- Integração com calendário (Google Calendar, Outlook)

</deferred>

---

*Phase: 01-pleno-ano-1-2026-2027*
*Context gathered: 2026-08-01*