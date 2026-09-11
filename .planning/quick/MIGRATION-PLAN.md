# Plano de Migração: Reorganização de Skills e Recursos

**Data:** 2026-09-11  
**Objetivo:** Reestruturar a base de skills para refletir granularidade de mercado, eliminar órfãos e consolidar categorias.

---

## Diagnóstico Atual

- **73 skills cadastradas** na tabela `skills`
- **59 skills órfãs** (referenciadas em milestones/projects/resources mas não existem na tabela)
- **40 milestones**, **7 projects**, **48 resources** com referências a skills

### Skills Órfãs Críticas (precisam ser criadas)
```
pyspark, mentoring, feedback, leadership, collaboration, strategic-vision, 
time-management, self-awareness, technical-docs, bedrock-guardrails, security, 
llm, mas, mcp-tools, sec-atlas, sec-nist, situational-leadership, 
emotional-intelligence, finops, cost-optimization, cloudwatch, agent-design, 
stakeholder-management, presentation, storytelling, influence, aws-bedrock, 
api-architecture, mlops, critical-thinking, prompt-engineering, langgraph, 
python, bash, aws, iam, vpc, lambda, s3, ecs, aws-glue, sql, openapi, 
api-design, api-contracts, verbal-communication, kafka, testing, linters, 
javascript, typescript, ux, figma, nvc, active-listening, empathy, 
data-contracts, data-lineage, git
```

---

## Estratégia de Migração (3 Etapas)

### Etapa 1: Mapeamento e Criação de Skills Órfãs
**Objetivo:** Criar todas as 59 skills órfãs para eliminar referências quebradas.

**Ação:**
- Para cada skill órfã, criar registro na tabela `skills` com:
  - `id`: o ID órfão atual
  - `name`: nome descritivo inferido do contexto
  - `level`: 1.0 (placeholder inicial)
  - `category`: categoria apropriada baseada no domínio
  - `type`: 'hard' ou 'soft'
  - `description`: descrição básica
  - `requirements`: array vazio inicialmente

**Mapeamento de Órfãs para Categorias:**

| Skill ID | Nome | Categoria | Type |
|----------|------|-----------|------|
| `pyspark` | PySpark (legado) | Engenharia de Dados | hard |
| `python` | Python Core | Linguagens & Paradigmas | hard |
| `typescript` | TypeScript | Linguagens & Paradigmas | hard |
| `javascript` | JavaScript | Linguagens & Paradigmas | hard |
| `bash` | Bash & Shell Scripting | Linguagens & Paradigmas | hard |
| `sql` | SQL Avançado | Engenharia de Dados | hard |
| `kafka` | Apache Kafka | Engenharia de Dados | hard |
| `git` | Git & Version Control | Engenharia de Software | hard |
| `aws` | AWS Cloud (legado) | Cloud & Platform | hard |
| `iam` | IAM & Políticas AWS | Cloud & Platform | hard |
| `vpc` | VPC & Networking AWS | Cloud & Platform | hard |
| `lambda` | AWS Lambda | Cloud & Platform | hard |
| `s3` | Amazon S3 | Cloud & Platform | hard |
| `ecs` | Amazon ECS | Cloud & Platform | hard |
| `aws-glue` | AWS Glue (legado) | Engenharia de Dados | hard |
| `cloudwatch` | CloudWatch & Logs | Cloud & Platform | hard |
| `aws-bedrock` | AWS Bedrock | AI Engineering | hard |
| `bedrock-guardrails` | Bedrock Guardrails | AI Security & SecMLOps | hard |
| `llm` | LLM Fundamentals | AI Engineering | hard |
| `prompt-engineering` | Prompt Engineering (legado) | AI Engineering | hard |
| `langgraph` | LangGraph (legado) | AI Engineering | hard |
| `mcp-tools` | MCP Tools | AI Engineering | hard |
| `mas` | Multi-Agent Systems | AI Engineering | hard |
| `agent-design` | Agent Design Patterns | AI Engineering | hard |
| `sec-atlas` | MITRE ATLAS | AI Security & SecMLOps | hard |
| `sec-nist` | NIST AI RMF | AI Security & SecMLOps | hard |
| `security` | Segurança da Informação | Segurança & Red Team | hard |
| `mlops` | MLOps Practices | Cloud & Platform | hard |
| `finops` | FinOps (legado) | Cloud & Platform | hard |
| `cost-optimization` | Cloud Cost Optimization | Cloud & Platform | hard |
| `openapi` | OpenAPI (legado) | Arquitetura & APIs | hard |
| `api-design` | API Design (legado) | Arquitetura & APIs | hard |
| `api-contracts` | API Contracts (legado) | Arquitetura & APIs | hard |
| `api-architecture` | API Architecture (legado) | Arquitetura & APIs | hard |
| `data-contracts` | Data Contracts | Engenharia de Dados | hard |
| `data-lineage` | Data Lineage | Engenharia de Dados | hard |
| `testing` | Testing & QA | Engenharia de Software | hard |
| `linters` | Linters & Code Quality | Engenharia de Software | hard |
| `ux` | UX Design | Engenharia de Software | hard |
| `figma` | Figma & Design Tools | Engenharia de Software | hard |
| `technical-docs` | Documentação Técnica | Soft Skills | soft |
| `mentoring` | Mentoria (legado) | Liderança & Soft Skills | soft |
| `feedback` | Feedback & Code Review | Liderança & Soft Skills | soft |
| `leadership` | Liderança (legado) | Liderança & Soft Skills | soft |
| `collaboration` | Colaboração em Equipes | Liderança & Soft Skills | soft |
| `strategic-vision` | Visão Estratégica (legado) | Liderança & Soft Skills | soft |
| `time-management` | Gestão de Tempo | Liderança & Soft Skills | soft |
| `self-awareness` | Autoconsciência | Liderança & Soft Skills | soft |
| `situational-leadership` | Liderança Situacional | Liderança & Soft Skills | soft |
| `emotional-intelligence` | Inteligência Emocional | Liderança & Soft Skills | soft |
| `stakeholder-management` | Gestão de Stakeholders | Liderança & Soft Skills | soft |
| `presentation` | Apresentações Técnicas | Liderança & Soft Skills | soft |
| `storytelling` | Storytelling (legado) | Liderança & Soft Skills | soft |
| `influence` | Influência Sem Autoridade | Liderança & Soft Skills | soft |
| `verbal-communication` | Comunicação Verbal | Liderança & Soft Skills | soft |
| `nvc` | Comunicação Não-Violenta (legado) | Liderança & Soft Skills | soft |
| `active-listening` | Escuta Ativa | Liderança & Soft Skills | soft |
| `empathy` | Empatia | Liderança & Soft Skills | soft |
| `critical-thinking` | Pensamento Crítico (legado) | Liderança & Soft Skills | soft |

---

### Etapa 2: Consolidação de Categorias
**Objetivo:** Padronizar categorias seguindo a nova taxonomia de domínios.

**Categorias Consolidadas (N1 - Domínios):**
1. **Linguagens & Paradigmas**
2. **Engenharia de Dados**
3. **AI Engineering**
4. **AI Security & SecMLOps**
5. **Cloud & Platform**
6. **Segurança & Red Team**
7. **Arquitetura & APIs**
8. **Engenharia de Software**
9. **Liderança & Soft Skills**

**Ações:**
- Atualizar o campo `category` de todas as 73 skills existentes + 59 novas
- Garantir consistência de nomenclatura

---

### Etapa 3: Atualização de Referências em Recursos
**Objetivo:** Padronizar `parent_category` de recursos para eliminar redundâncias.

**Ação:**
- Nenhuma ação necessária (análise mostrou 0 recursos com `parent_category = 'Certificação'`)

---

## Scripts de Execução

### Script 1: Criar Skills Órfãs
```javascript
// .planning/quick/create-orphan-skills.mjs
```

### Script 2: Atualizar Categorias
```javascript
// .planning/quick/update-skill-categories.mjs
```

---

## Validação Pós-Migração

Após execução, verificar:
1. ✅ Total de skills na tabela = 132 (73 existentes + 59 novas)
2. ✅ 0 skills órfãs
3. ✅ Todas as categorias padronizadas
4. ✅ Nenhuma referência quebrada em milestones/projects/resources

---

## Rollback Plan

Snapshot salvo em: `.planning/quick/pre-migration-snapshot.json`

Em caso de falha crítica:
1. Restaurar skills da tabela usando o snapshot
2. Reverter atualizações de categoria
3. Investigar causa raiz antes de nova tentativa
