# Taxonomia Estratégica do PDI - Hierarquia Completa

## Estrutura Proposta

```
DOMÍNIO (N1)
  └─ COMPETÊNCIA / MACRO-SKILL (N2)
       └─ HABILIDADE / MICRO-SKILL (N3)
            └─ REQUISITO GRANULAR (N4)
```

---

## Exemplo Prático da Hierarquia

### **DOMÍNIO:** AI Engineering & Sistemas Agênticos
- **COMPETÊNCIA:** Prompt Engineering Avançado
  - **HABILIDADE:** Few-shot Learning
    - **REQUISITO:** Construção de exemplos estruturados
    - **REQUISITO:** Balanceamento de contexto vs tokens
  - **HABILIDADE:** Chain-of-Thought Prompting
    - **REQUISITO:** Decomposição de raciocínio em etapas
    - **REQUISITO:** Validação de lógica intermediária
  - **HABILIDADE:** Desenvolvimento Orientado a Especificações (SDD)
    - **REQUISITO:** Escrita de specs executáveis
    - **REQUISITO:** Iteração baseada em feedback automatizado

---

## Decisão de Arquitetura

### Opção 1: Hierarquia de 3 Níveis (RECOMENDADA)
```
DOMÍNIO (categoria_pai)
  └─ COMPETÊNCIA (macro-skill com requirements array)
       └─ REQUISITOS (microskills como objetos dentro de requirements)
```

**Vantagens:**
- Simplifica a estrutura do banco (1 tabela de skills)
- Cálculo de nível dinâmico baseado em `requirements`
- Fácil navegação e manutenção
- Evita explosão de registros

**Implementação:**
- Cada skill tem `category` (Domínio N1)
- Cada skill tem `requirements: [{ id, text, completed }]` (Microskills N3)
- O campo `name` da skill representa a Competência (N2)

**Exemplo de Registro:**
```json
{
  "id": "prompt-eng-advanced",
  "name": "Prompt Engineering Avançado",
  "category": "AI Engineering",
  "level": 4.5,
  "type": "hard",
  "description": "...",
  "requirements": [
    { "id": "req-few-shot", "text": "Few-shot learning e exemplos estruturados", "completed": true },
    { "id": "req-cot", "text": "Chain-of-Thought (CoT) prompting", "completed": true },
    { "id": "req-system-prompts", "text": "System prompts e configuração de contexto", "completed": true },
    { "id": "req-sdd", "text": "Desenvolvimento Orientado a Especificações", "completed": true },
    { "id": "req-token-opt", "text": "Otimização de tokens e latência", "completed": false },
    { "id": "req-evaluation", "text": "Avaliação sistemática de respostas", "completed": true }
  ]
}
```

**Cálculo de Nível:**
```javascript
const completedCount = skill.requirements.filter(r => r.completed).length;
const totalCount = skill.requirements.length;
const level = 1 + 4 * (completedCount / totalCount);
// Exemplo: 5 de 6 = 1 + 4 * (5/6) = 4.33
```

---

### Opção 2: Hierarquia de 4 Níveis (Complexa, NÃO recomendada)
```
DOMÍNIO (tabela domains)
  └─ COMPETÊNCIA (tabela competencies)
       └─ HABILIDADE (tabela skills)
            └─ REQUISITO (tabela requirements)
```

**Desvantagens:**
- 4 tabelas inter-relacionadas
- Queries complexas com múltiplos JOINs
- Difícil manutenção e sincronização
- Performance degradada em escala

---

## Estrutura Final Proposta (Opção 1)

### Tabela: `skills`
Cada registro representa uma **COMPETÊNCIA (Macro-Skill)**

**Campos:**
- `id` (PK)
- `name` — Nome da competência
- `category` — Domínio (N1)
- `level` — Nível calculado dinamicamente
- `type` — 'hard' | 'soft'
- `description`
- `requirements` — JSONB array de microskills com status de completude

**Domínios (N1 - Categorias Consolidadas):**
1. AI Engineering
2. AI Security & SecMLOps
3. Engenharia de Dados
4. Cloud & Platform
5. Segurança & Red Team
6. Arquitetura & APIs
7. Linguagens & Paradigmas
8. Engenharia de Software
9. Liderança & Soft Skills

---

## Mapeamento Completo: Domínios → Competências → Microskills

### 1. AI Engineering
**Competências:**
- `prompt-eng-advanced` — Prompt Engineering Avançado
  - Microskills: Few-shot, CoT, System Prompts, SDD, Token Optimization, Evaluation
- `rag-vector-db` — RAG & Vector Databases
  - Microskills: Embeddings, Chunking, Re-ranking, Vector DB Management, Hallucination Detection, Scale
- `langgraph-orchestration` — LangGraph & Multi-Agent Workflows
  - Microskills: Tool Calling, State Management, Multi-Agent, Persistence, Mission-Critical
- `mcp-server-dev` — Model Context Protocol
  - Microskills: MCP Spec, Client/Server Dev, Tools/Resources, Security, Enterprise Governance
- `llm` — LLM Fundamentals
  - Microskills: Tokenization, Inference, Context Windows, Fine-tuning Basics, Model Selection
- `aws-bedrock` — AWS Bedrock
  - Microskills: Foundation Models, Inference APIs, Guardrails Integration, Cost Optimization

### 2. AI Security & SecMLOps
**Competências:**
- `owasp-llm-security` — OWASP Top 10 for LLMs
  - Microskills: Prompt Injection, Jailbreaking, Data Poisoning, Insecure Output, Supply Chain
- `mitre-atlas-redteam` — MITRE ATLAS & Adversarial ML
  - Microskills: Framework, Model Inversion, Backdoor Attacks, Evasion, Adversarial Testing
- `ai-governance-compliance` — Governança & Compliance de IA
  - Microskills: Ethics, NIST AI RMF, ISO 42001, EU AI Act, Committee Leadership
- `model-supply-chain` — Segurança da Supply Chain de ML
  - Microskills: Model Signing, Dependency Scanning, Provenance, Safetensors, MLflow Registry
- `runtime-guardrails` — Runtime Guardrails
  - Microskills: NeMo Guardrails, Llama Guard, Content Filtering, Drift Detection

### 3. Engenharia de Dados
**Competências:**
- `data-modeling-dim` — Modelagem Dimensional
  - Microskills: Normalization, Kimball, Partitioning, Denormalization, Data Mesh
- `sql` — SQL Avançado
  - Microskills: Basic Syntax, CTEs, Window Functions, Optimization, Analytical Queries
- `pyspark-distributed` — PySpark & Processamento Distribuído
  - Microskills: DataFrames, Joins Optimization, Streaming, Fault Tolerance, Performance Tuning
- `aws-glue-etl` — AWS Glue & ETL
  - Microskills: Job Bookmarks, DynamicFrames, Cataloging, Scheduling, Cost Optimization
- `data-quality-expectations` — Data Quality
  - Microskills: Great Expectations, Soda, Automated Testing, Alerting, Lineage
- `streaming-kafka` — Event Streaming
  - Microskills: Producers, Consumers, Kafka Connect, Schema Registry, Stream Processing

### 4. Cloud & Platform
**Competências:**
- `aws-core-serverless` — AWS Core & Serverless
  - Microskills: Lambda, S3, DynamoDB, API Gateway, SQS/SNS, IAM, Multi-AZ
- `kubernetes-cka` — Kubernetes
  - Microskills: Basics, Networking, RBAC, Helm, Production Admin
- `docker-containers` — Docker
  - Microskills: Dockerfile, Multi-stage Builds, Networking, Volumes, Security Best Practices
- `github-actions-cicd` — CI/CD Automation
  - Microskills: Workflows, Matrix Builds, Secrets, Caching, Release Automation
- `terraform-iac` — Infrastructure as Code
  - Microskills: State Management, Modules, Remote Backend, Workspaces, Best Practices
- `observability-sre` — SRE & Observabilidade
  - Microskills: Prometheus, Grafana, OpenTelemetry, SLOs/SLIs, Incident Response
- `aws-cost-finops` — FinOps
  - Microskills: Cost Explorer, Right-sizing, Reservations, Budgets, Tagging Strategy

### 5. Segurança & Red Team
**Competências:**
- `offensive-sec-pentest` — Segurança Ofensiva
  - Microskills: Fundamentals, Enumeration, Exploitation (OSCP), Active Directory (CRTP), Post-Exploitation
- `network-protocols-sec` — Redes & Protocolos
  - Microskills: TCP/IP, DNS, HTTP/HTTPS, TLS/SSL, Firewalls
- `identity-access-management` — IAM Avançado
  - Microskills: OIDC, OAuth2, SAML, RBAC/ABAC, Zero Trust
- `cryptography-pki` — Criptografia
  - Microskills: Symmetric/Asymmetric, Hashing, TLS/SSL, PKI, KMS
- `enterprise-risk-cissp` — Governança de Segurança
  - Microskills: Risk Management, Frameworks (NIST, CIS), Compliance, Auditing, CISSP Domains

### 6. Arquitetura & APIs
**Competências:**
- `rest-api-design` — RESTful API Design
  - Microskills: Richardson Maturity, Idempotency, Status Codes, Versioning, HATEOAS
- `openapi-contracts` — OpenAPI / Swagger
  - Microskills: Spec 3.0/3.1, Schema Validation, Breaking Changes, Code Generation, Documentation
- `grpc-protobuf` — gRPC
  - Microskills: Protocol Buffers, Streaming, Error Handling, Load Balancing, Performance
- `domain-driven-design` — DDD
  - Microskills: Bounded Contexts, Ubiquitous Language, Aggregates, Domain Events, Strategic Design
- `system-design-distributed` — System Design
  - Microskills: Load Balancing, Caching, Sharding, CAP Theorem, Consistency Patterns

### 7. Linguagens & Paradigmas
**Competências:**
- `python-core` — Python Core
  - Microskills: Type Hints, Decorators, Generators, Dunder Methods, Memory Management
- `python-async` — Concorrência em Python
  - Microskills: AsyncIO, Threading, Multiprocessing, GIL, Coroutines
- `typescript-modern` — TypeScript
  - Microskills: Generics, Utility Types, ESNext, Type Guards, Advanced Patterns
- `javascript` — JavaScript
  - Microskills: ES6+, Event Loop, Closures, Promises, Async/Await
- `java-jvm` — Java & JVM
  - Microskills: JVM Internals, Memory Tuning, Streams, Spring Boot, Dependency Injection
- `oop-principles` — OOP & SOLID
  - Microskills: Encapsulation, Inheritance, Polymorphism, SOLID, Design Patterns
- `functional-paradigms` — Programação Funcional
  - Microskills: Immutability, Pure Functions, Higher-Order Functions, Currying, Monads
- `clean-code-sdd` — Clean Code
  - Microskills: Refactoring, Testability, Readability, Code Smells, SDD

### 8. Engenharia de Software
**Competências:**
- `git` — Git & Version Control
  - Microskills: Branching Strategies, Merge vs Rebase, Cherry-pick, Bisect, Workflows
- `testing` — Testing & QA
  - Microskills: Unit Tests, Integration Tests, E2E, Mocking, TDD
- `linters` — Code Quality
  - Microskills: ESLint, Prettier, SonarQube, Static Analysis, Pre-commit Hooks
- `ux` — UX Design
  - Microskills: User Research, Wireframing, Usability, Accessibility, User Testing
- `figma` — Design Tools
  - Microskills: Prototyping, Components, Auto Layout, Design Systems, Collaboration

### 9. Liderança & Soft Skills
**Competências:**
- `leadership-mentorship` — Liderança & Mentoria
  - Microskills: Code Review, Onboarding, Mentoring, Staff Engineering, Executive Leadership
- `executive-communication` — Comunicação Executiva
  - Microskills: Status Communication, Presentations, Storytelling, CNV, Executive Influence
- `technical-mentoring` — Mentoria Técnica
  - Microskills: Knowledge Sharing, Pair Programming, Career Coaching, Feedback Loops
- `cnv-negotiation` — CNV & Negociação
  - Microskills: Active Listening, Empathy, Conflict Resolution, Negotiation, Influence
- `strategic-roadmapping` — Visão Estratégica
  - Microskills: Roadmapping, OKRs, Stakeholder Alignment, Business Acumen, Priority Management
- `collaboration` — Colaboração
  - Microskills: Team Dynamics, Cross-functional Work, Async Communication, Documentation
- `time-management` — Gestão de Tempo
  - Microskills: Prioritization, Focus Techniques, Calendar Management, Deep Work
- `emotional-intelligence` — Inteligência Emocional
  - Microskills: Self-awareness, Self-regulation, Social Awareness, Relationship Management

---

## Próximos Passos

1. **Validar** essa estrutura e ajustar conforme necessário
2. **Atualizar banco de dados** com a estrutura consolidada
3. **Popular `requirements`** para cada competência com microskills detalhados
4. **Recalcular níveis** dinamicamente baseado em completude de requisitos
5. **Atualizar Análise de Perfil** para focar em objetivos atuais (AI Security Specialist L3→L4)

Aprovado para prosseguir com a implementação?
