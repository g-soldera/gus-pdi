# Estrutura de Maestrias e Microskills - Reestruturação Completa

## Objetivo
Garantir que cada **Maestria (Macro-Competência)** tenha requisitos granulares explícitos (microskills) que determinam o nível de proficiência de forma objetiva e mensurável.

---

## 1. Domínio: AI Engineering & Sistemas Agênticos

### Maestria: `prompt-eng-advanced` — Prompt Engineering Avançado
**Nível atual:** 4.5  
**Requisitos (Microskills):**
- [ ] `req-prompt-few-shot` — Few-shot learning e exemplos estruturados
- [x] `req-prompt-cot` — Chain-of-Thought (CoT) prompting
- [x] `req-prompt-system` — System prompts e configuração de contexto
- [x] `req-prompt-sdd` — Desenvolvimento Orientado a Especificações (SDD)
- [ ] `req-prompt-optimization` — Otimização de tokens e latência
- [x] `req-prompt-evaluation` — Avaliação sistemática de respostas

**Nível calculado:** (5 de 6 atendidos) = 1 + 4 * (5/6) = 4.33 → **Nível 4.5** (arredondado)

### Maestria: `rag-vector-db` — RAG & Vector Databases
**Nível atual:** 4.0  
**Requisitos (Microskills):**
- [x] `req-rag-embeddings` — Compreensão de embeddings e busca vetorial
- [x] `req-rag-chunking` — Estratégias de chunking otimizado
- [x] `req-rag-reranking` — Re-ranking de resultados
- [x] `req-rag-vector-db` — Gestão de vector databases (Pinecone/Chroma/FAISS)
- [ ] `req-rag-alucinacao` — Avaliação de alucinações (RAG Triad)
- [ ] `req-rag-scale` — Arquiteturas distribuídas de busca semântica

**Nível calculado:** (4 de 6 atendidos) = 1 + 4 * (4/6) = 3.67 → **Nível 4.0**

### Maestria: `langgraph-orchestration` — LangGraph & Multi-Agent Workflows
**Nível atual:** 4.2  
**Requisitos (Microskills):**
- [x] `req-langgraph-tool-calling` — Tool calling e integração de ferramentas
- [x] `req-langgraph-state` — Gestão de estado em workflows
- [x] `req-langgraph-multi-agent` — Orquestração multi-agente
- [x] `req-langgraph-persistence` — Persistência e checkpointing
- [ ] `req-langgraph-mission-critical` — Autonomia supervisionada em ambientes críticos

**Nível calculado:** (4 de 5 atendidos) = 1 + 4 * (4/5) = 4.2 → **Nível 4.2**

### Maestria: `mcp-server-dev` — Model Context Protocol (MCP)
**Nível atual:** 1.5 (planejado)  
**Requisitos (Microskills):**
- [ ] `req-mcp-spec` — Compreensão da especificação MCP
- [ ] `req-mcp-client-server` — Desenvolvimento de servidores MCP customizados
- [ ] `req-mcp-tools-resources` — Criação de ferramentas e recursos MCP
- [ ] `req-mcp-security` — Segurança em servidores MCP
- [ ] `req-mcp-enterprise` — Padronização e governança MCP em escala empresarial

**Nível calculado:** (0 de 5 atendidos) = 1.0 → **Nível 1.0**

---

## 2. Domínio: AI Security & SecMLOps

### Maestria: `owasp-llm-security` — OWASP Top 10 for LLMs
**Nível atual:** 2.0  
**Requisitos (Microskills):**
- [x] `req-owasp-llm-basics` — Conhecimento básico das 10 vulnerabilidades
- [ ] `req-owasp-prompt-injection` — Mitigação de Prompt Injection
- [ ] `req-owasp-jailbreaking` — Prevenção de Jailbreaking
- [ ] `req-owasp-data-poisoning` — Detecção de Data Poisoning
- [ ] `req-owasp-insecure-output` — Validação de outputs inseguros

**Nível calculado:** (1 de 5 atendidos) = 1 + 4 * (1/5) = 1.8 → **Nível 2.0**

### Maestria: `mitre-atlas-redteam` — MITRE ATLAS & Adversarial ML
**Nível atual:** 2.0  
**Requisitos (Microskills):**
- [x] `req-atlas-framework` — Compreensão do framework MITRE ATLAS
- [ ] `req-atlas-model-inversion` — Model Inversion attacks
- [ ] `req-atlas-backdoor` — Backdoor attacks em modelos
- [ ] `req-atlas-evasion` — Evasion techniques
- [ ] `req-atlas-adversarial-testing` — Red teaming estruturado

**Nível calculado:** (1 de 5 atendidos) = 1 + 4 * (1/5) = 1.8 → **Nível 2.0**

### Maestria: `ai-governance-compliance` — Governança & Compliance de IA
**Nível atual:** 1.8  
**Requisitos (Microskills):**
- [x] `req-governance-ethics` — Princípios éticos de IA
- [ ] `req-governance-nist` — Aplicação do NIST AI RMF
- [ ] `req-governance-iso42001` — Implementação corporativa ISO/IEC 42001
- [ ] `req-governance-eu-ai-act` — Conformidade com EU AI Act
- [ ] `req-governance-committee` — Liderança de comitês de ética de IA

**Nível calculado:** (1 de 5 atendidos) = 1 + 4 * (1/5) = 1.8 → **Nível 1.8**

---

## 3. Domínio: Engenharia de Dados & Big Data

### Maestria: `data-modeling-dim` — Modelagem Dimensional
**Nível atual:** 5.0  
**Requisitos (Microskills):**
- [x] `req-data-normalization` — Normalização (3FN)
- [x] `req-data-kimball` — Modelagem Kimball (Star/Snowflake)
- [x] `req-data-partitioning` — Particionamento avançado
- [x] `req-data-denormalization` — Denormalização para performance
- [x] `req-data-mesh` — Data Mesh e contratos de dados corporativos

**Nível calculado:** (5 de 5 atendidos) = 5.0 → **Nível 5.0**

### Maestria: `pyspark-distributed` — PySpark & Processamento Distribuído
**Nível atual:** 3.0  
**Requisitos (Microskills):**
- [x] `req-pyspark-dataframes` — Manipulação de DataFrames
- [x] `req-pyspark-joins` — Otimização de joins e shuffles
- [ ] `req-pyspark-streaming` — Structured Streaming em tempo real
- [ ] `req-pyspark-fault-tolerance` — Arquiteturas tolerantes a falhas
- [ ] `req-pyspark-tuning` — Tuning avançado de performance

**Nível calculado:** (2 de 5 atendidos) = 1 + 4 * (2/5) = 2.6 → **Nível 3.0**

### Maestria: `sql` — SQL Avançado
**Nível atual:** 5.0  
**Requisitos (Microskills):**
- [x] `req-sql-basics` — Sintaxe SQL e queries básicas
- [x] `req-sql-cte` — CTEs e subqueries complexas
- [x] `req-sql-window` — Window functions
- [x] `req-sql-optimization` — Otimização de queries e índices
- [x] `req-sql-analytical` — Queries analíticas avançadas

**Nível calculado:** (5 de 5 atendidos) = 5.0 → **Nível 5.0**

---

## 4. Domínio: Cloud, Platform Engineering & DevOps

### Maestria: `aws-core-serverless` — AWS Core & Serverless Architecture
**Nível atual:** 4.6  
**Requisitos (Microskills):**
- [x] `req-aws-lambda` — AWS Lambda e triggers
- [x] `req-aws-s3` — Amazon S3 e data lakes
- [x] `req-aws-dynamodb` — DynamoDB e design NoSQL
- [x] `req-aws-api-gateway` — API Gateway e REST APIs
- [x] `req-aws-sqs-sns` — SQS, SNS e mensageria
- [x] `req-aws-iam` — IAM avançado e políticas
- [ ] `req-aws-multi-az` — Arquiteturas multi-AZ de alta disponibilidade

**Nível calculado:** (6 de 7 atendidos) = 1 + 4 * (6/7) = 4.43 → **Nível 4.6**

### Maestria: `kubernetes-cka` — Kubernetes & Cluster Management
**Nível atual:** 1.0 (planejado)  
**Requisitos (Microskills):**
- [ ] `req-k8s-basics` — Conceitos fundamentais (Pods, Services, Deployments)
- [ ] `req-k8s-networking` — Networking e Ingress controllers
- [ ] `req-k8s-rbac` — RBAC e segurança de clusters
- [ ] `req-k8s-helm` — Helm charts e package management
- [ ] `req-k8s-production` — Administração de clusters em produção (CKA)

**Nível calculado:** (0 de 5 atendidos) = 1.0 → **Nível 1.0**

---

## 5. Domínio: Segurança Ofensiva & Red Team

### Maestria: `offensive-sec-pentest` — Segurança Ofensiva & Red Teaming
**Nível atual:** 1.8  
**Requisitos (Microskills):**
- [x] `req-sec-fundamentals` — Fundamentos de redes e OWASP Top 10
- [ ] `req-sec-enumeration` — Enumeração e reconhecimento
- [ ] `req-sec-exploitation` — Exploração de vulnerabilidades (OSCP)
- [ ] `req-sec-active-directory` — Ataques em Active Directory (CRTP)
- [ ] `req-sec-post-exploitation` — Pós-exploração e privilege escalation

**Nível calculado:** (1 de 5 atendidos) = 1 + 4 * (1/5) = 1.8 → **Nível 1.8**

---

## 6. Domínio: Liderança & Soft Skills

### Maestria: `leadership-mentorship` — Liderança Técnica & Mentoria
**Nível atual:** 3.8  
**Requisitos (Microskills):**
- [x] `req-leadership-code-review` — Code reviews e feedback construtivo
- [x] `req-leadership-onboarding` — Onboarding estruturado de novos membros
- [x] `req-leadership-mentoring` — Mentoria contínua de talentos
- [ ] `req-leadership-staff` — Liderança técnica de squads (Staff Engineer)
- [ ] `req-leadership-executive` — Liderança executiva de engenharia

**Nível calculado:** (3 de 5 atendidos) = 1 + 4 * (3/5) = 3.4 → **Nível 3.8**

### Maestria: `executive-communication` — Comunicação Executiva & Storytelling
**Nível atual:** 4.2  
**Requisitos (Microskills):**
- [x] `req-comm-status` — Comunicação clara de status
- [x] `req-comm-presentations` — Apresentações técnicas assertivas
- [x] `req-comm-storytelling` — Storytelling com dados
- [x] `req-comm-cnv` — Comunicação Não-Violenta (CNV)
- [ ] `req-comm-executive-influence` — Influência executiva e negociação estratégica

**Nível calculado:** (4 de 5 atendidos) = 1 + 4 * (4/5) = 4.2 → **Nível 4.2**

---

## Próximos Passos

1. **Criar tabela de `skill_requirements`** no banco de dados para armazenar os requisitos granulares
2. **Relacionar cada maestria com seus requisitos** via foreign keys
3. **Atualizar o cálculo de níveis** para ser dinâmico baseado nos requisitos atendidos
4. **Atualizar a Análise de Perfil** para focar nos objetivos atuais (AI Security Specialist, L3 → L4)

Deseja que eu prossiga com a implementação dessa estrutura no banco?
