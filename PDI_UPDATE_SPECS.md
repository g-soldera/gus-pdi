# Atualização do PDI: Evolução Pleno → Sênior / Tech Lead

Este documento detalha a proposta de atualização do Plano de Desenvolvimento Individual (PDI) de Gustavo Soldera. O objetivo é ajustar a aplicação para refletir o momento atual (transição para Pleno) e traçar a rota rumo à senioridade e liderança técnica, incorporando as novas diretrizes fornecidas.

## 1. Novos Milestones Sugeridos (Pleno → Sênior / Tech Lead)

Considerando o seu background atual em Analytics Engineering, Cloud (AWS), e a forte atuação em iniciativas de IA Generativa e projetos estratégicos no Itaú, a evolução para Sênior/Tech Lead exige maior foco em **Arquitetura de Sistemas**, **Liderança Técnica de Projetos**, **System Design Avançado**, **Engenharia de IA**, **MLOps** e **Visão de Negócio/Produto**.

Aqui estão os milestones sugeridos para o próximo ciclo, com datas-alvo projetadas para um ciclo de 18 a 24 meses (jun/2026 a jan/2028):

| ID | Título | Descrição | Data-Alvo | Justificativa | Métricas de Evolução |
|---|---|---|---|---|---|
| `arch-system-design` | **Domínio em System Design e Arquitetura Distribuída** | Liderar o desenho de arquitetura de pelo menos duas soluções complexas (alta volumetria, resiliência, multi-region), aplicando padrões como Data Mesh ou Event-Driven Architecture. | Dez/2026 | Um Sênior/Tech Lead precisa desenhar sistemas escaláveis e defender suas escolhas arquiteturais. | - 2 arquiteturas de soluções complexas documentadas e aprovadas. <br> - Participação ativa em 5+ discussões de arquitetura de alto nível. <br> - Feedback positivo de pares e stakeholders sobre a qualidade dos designs. |
| `tech-lead-projects` | **Liderança Técnica de Projetos na Squad** | Assumir a liderança técnica de 2-3 projetos estratégicos dentro da squad, focando em aprendizado ativo das atividades de Tech Lead (definição de escopo técnico, quebra de tarefas, code review, mentoria pontual), em colaboração com o líder atual. | Mar/2027 | Permite o desenvolvimento de habilidades de liderança técnica sem sobrepor o papel do líder atual, complementando sua busca por especialização. | - Liderança técnica em 2-3 projetos com entregas bem-sucedidas. <br> - Feedback formal do líder sobre a contribuição para a direção técnica e qualidade do código. <br> - 10+ code reviews construtivos realizados em projetos da squad. |
| `ai-engineering-expertise` | **Especialização em Engenharia de IA Generativa** | Aprofundar conhecimentos em MLOps para LLMs, otimização de modelos, e desenvolvimento de agentes autônomos complexos, aplicando em pelo menos um projeto de grande impacto. | Jun/2027 | A área de IA Generativa é estratégica; aprofundar-se nela posiciona para liderança técnica em um domínio de ponta. | - Implementação de pipeline MLOps para LLM em produção. <br> - Desenvolvimento de 1+ agente autônomo complexo com impacto mensurável. <br> - Apresentação interna sobre otimização de LLMs ou arquitetura de agentes. |
| `mlops-excellence` | **Excelência em MLOps e Data Governance** | Implementar e otimizar pipelines de MLOps para modelos de Machine Learning, garantindo observabilidade, rastreabilidade e governança de dados em ambientes de produção. | Set/2027 | MLOps é fundamental para a escalabilidade e confiabilidade de soluções de IA, e governança de dados é crucial para a qualidade e conformidade. | - Implementação de 1+ pipeline MLOps completo com monitoramento e alertas. <br> - Definição e aplicação de padrões de governança de dados em 2+ projetos de ML. <br> - Redução de 20%+ no tempo de deploy de modelos de ML. |
| `cert-aws-sa-pro` | **AWS Solutions Architect - Professional** | Obter a certificação AWS SA Pro para consolidar o conhecimento avançado em cloud e arquitetura de soluções na AWS. | Dez/2027 | Validação de mercado de alto nível para o design de sistemas em nuvem, um pilar da sua atuação. | - Aprovação na certificação AWS SA Pro. |
| `cross-team-impact` | **Projetos de Impacto Cross-Comunidade** | Entregar um projeto ou plataforma (ex: evolução do Insight Guard) que seja adotado por múltiplas comunidades ou áreas fora de Cyber Security. | Mar/2028 | A senioridade é medida pelo raio de impacto. Soluções cross demonstram visão sistêmica e capacidade de influenciar. | - 1+ projeto adotado por 2+ comunidades/áreas. <br> - Feedback positivo de stakeholders externos à squad. <br> - Apresentação do projeto em fóruns amplos da empresa. |
| `advanced-mentorship` | **Mentoria Estratégica (Programa de Formação)** | Evoluir da mentoria 1:1 para a criação e condução de um programa estruturado de capacitação técnica para Juniores e Plenos. | Jun/2028 | O Tech Lead é um multiplicador de talentos. Escalar a mentoria prova maturidade de liderança. | - Criação e execução de 1+ programa de mentoria/capacitação. <br> - 3+ mentorados com PDI em progresso ou concluído. <br> - Feedback positivo dos mentorados e da gestão. |

---

## 2. Especificações Técnicas (Specs) para Atualização da Aplicação

Para implementar as mudanças solicitadas na interface do PDI, os seguintes arquivos e lógicas precisarão ser modificados:

### 2.1. Alterações em `src/data/pdiData.ts`
*   **PersonalInfo:**
    *   Atualizar `currentRole` para `Engenheiro de Analytics JR`.
    *   Atualizar `targetRole` para `Engenheiro de Analytics PL`.
    *   Atualizar `timelineTarget` para `2026-06-07` (07/06/2026, data de início como Pleno).
    *   Adicionar um novo campo `seniorTargetDate: string` com o valor `2028-01-01` (para o objetivo de Sênior na timeline).
*   **Milestones:**
    *   Adicionar um novo campo `archived: boolean` opcional na interface `Milestone` em `src/types/pdi.ts`.
    *   Marcar os milestones atuais que estão com `progress < 50` (ex: `cert-aws-cloud` que está em 40%) como despriorizados, definindo `archived: true` e mantendo o `status` original ou, se preferível, introduzir um novo `status: 'deprioritized'`.
    *   Atualizar o progresso dos milestones que estão perto de concluir para `100` e `status: 'completed'` conforme a sua avaliação atual.
    *   Adicionar os novos milestones listados na seção 1, com suas respectivas datas-alvo e métricas.

### 2.2. Alterações no Componente `Hero.tsx` (Timeline de Carreira)
*   **Substituição da Progress Bar por uma Timeline:**
    *   Remover a barra de progresso atual (linhas 133-145).
    *   Implementar um componente visual de linha do tempo horizontal (ou vertical em mobile) que represente a jornada de carreira.
    *   **Marcos da Timeline:**
        1.  **Freelancer:** 1 ano (ex: 2023 - 2024).
        2.  **Estagiário:** 1 ano (ex: 2024 - 2025).
        3.  **Júnior:** 1 ano (ex: 2025 - 07/06/2026).
        4.  **Pleno (Atuando como):** Início em 07/06/2026. Este segmento deve ter um estilo visual distinto (ex: cor diferente, gradiente, ou tracejado) para indicar que você já atua como Pleno, mas ainda não foi formalmente promovido.
        5.  **Sênior:** Objetivo em Jan/2028.
    *   A timeline deve destacar o momento atual (Júnior buscando Pleno, atuando como Pleno) e mostrar o percurso histórico, com o objetivo de Sênior claramente marcado.

### 2.3. Alterações no Componente `Milestones.tsx` (Ícone de Arquivo e Despriorizados)
*   **Ícone de Arquivo (Archive):**
    *   Importar o ícone `Archive` ou `FileText` do `lucide-react`.
    *   Na renderização de cada milestone (tanto na view `timeline` quanto `cards`), adicionar um botão/ícone de arquivo no canto superior direito do card para milestones `archived: true`.
    *   *Nota de UX:* Este ícone deve servir visualmente para indicar que o item é um registro histórico ou despriorizado.
*   **Tratamento de Despriorizados (< 50%):**
    *   Criar uma regra visual para milestones despriorizados (ex: opacidade reduzida, cor cinza, ou um badge específico "Despriorizado").
    *   A lógica de ordenação (`sortedMilestones`) pode ser ajustada para jogar os despriorizados ou arquivados para o final da lista.

### 2.4. Resumo Curto das Specs
1.  **Dados:** Atualizar `pdiData.ts` com `currentRole` (JR), `targetRole` (PL), `timelineTarget` (07/06/2026), `seniorTargetDate` (Jan/2028), novos milestones (IA/MLOps) com métricas, e aplicar regra de <50% = despriorizado / perto do fim = concluído.
2.  **Tipos:** Adicionar suporte a `archived: boolean` (ou novo status `deprioritized`) em `src/types/pdi.ts`.
3.  **Hero (Topo):** Trocar a barra de progresso atual por uma timeline histórica de carreira (Freela -> Estágio -> JR -> **Pleno (atuando como, com estilo visual distinto)** em 07/06/2026 -> Sênior em Jan/2028).
4.  **Milestones (Lista):** Inserir ícone de arquivo nos cards para itens arquivados e aplicar estilo visual de "despriorizado" (ex: opacidade baixa) para itens com menos de 50% de progresso.
