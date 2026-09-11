# Relatório Analítico de Domínios e Microskills do PDI (Com Níveis e Marcos de Nivelamento)

Este documento detalha a taxonomia granular atualizada do PDI, mapeando cada **Domínio (N1)**, suas respectivas **Microskills (N2)** com marcos detalhados por nível (L1 a L7), a **origem da completude** (experiência prévia ou conclusão em marcos/projetos) e as **relações diretas com recursos, certificações, projetos e milestones**.

---

## 1. Domínio: IA Engineering & Sistemas Agênticos

### 1.1 `prompt-engineering` — Prompt Engineering Avançado
- **Status / Nível Atual:** Concluído (Nível 4.5)
- **Origem da Completude:** Experiência prática na construção de prompts estruturados para LLMs e desenvolvimento orientado a especificações.
- **Marcos de Nivelamento (Microskills / Requisitos):**
  - [x] L2: Criação de prompts básicos e few-shot learning aplicados a tarefas cotidianas.
  - [x] L3: Uso de Chain-of-Thought (CoT) e estruturação de system prompts complexos.
  - [x] L4: Desenvolvimento Orientado a Especificações (SDD) e avaliação sistemática de respostas de LLMs.
  - [ ] L5+: Otimização avançada de tokens, caching de prompts e latência em escala corporativa.
- **Relações:**
  - **Recursos:** `books-code-cco`
  - **Projetos / Milestones:** `prompt-eng-sdd`

### 1.2 `llm-rag-orchestration` — RAG & Orquestração de LLMs
- **Status / Nível Atual:** Concluído (Nível 4.0)
- **Origem da Completude:** Implementação de pipelines RAG com bases vetoriais e chunking avançado.
- **Marcos de Nivelamento:**
  - [x] L2: Conceitos fundamentais de embeddings e busca vetorial básica.
  - [x] L3: Construção de pipelines RAG com chunking otimizado, re-ranking e LangChain/LlamaIndex.
  - [x] L4: Avaliação de alucinações (RAG Triad), gestão de vector databases em produção.
  - [ ] L5+: Arquiteturas distribuídas de busca semântica em larga escala.
- **Relações:**
  - **Recursos:** `course-mlops-production`, `ref-system-design-primer`
  - **Projetos / Milestones:** Integração de bases de conhecimento em aplicações de IA.

### 1.3 `agent-systems` — Sistemas Agênticos & Multi-Agent
- **Status / Nível Atual:** Em andamento (Nível 4.2)
- **Origem da Completude:** Desenvolvimento de workflows autônomos e arquiteturas multi-agente.
- **Marcos de Nivelamento:**
  - [x] L2: Entendimento teórico de tool calling e loops básicos de agentes.
  - [x] L3: Implementação de agentes autônomos com ReAct framework.
  - [x] L4: Orquestração multi-agente complexa, controle de estado e persistência com LangGraph.
  - [ ] L5+: Autonomia supervisionada de agentes em ambientes de missão crítica financeira.
- **Relações:**
  - **Recursos:** `books-arch-ddd`, `books-code-tpp`
  - **Projetos / Milestones:** `agentic-security-cyber`, orquestração com LangGraph.

### 1.4 `mcp-tools` — Model Context Protocol (MCP) & Servidores
- **Status / Nível Atual:** Planejado / Conquista Futura (Nível 1.0 → L4)
- **Origem da Completude:** A ser conquistado na Fase 2 do PDI.
- **Marcos de Nivelamento:**
  - [ ] L3: Compreensão da especificação do protocolo MCP (Client/Server).
  - [ ] L4: Desenvolvimento de servidores MCP customizados integrados a ferramentas internas.
  - [ ] L5+: Padronização e governança de servidores MCP em escala empresarial.
- **Relações:**
  - **Certificações / Recursos:** `cert-cmcpse` (Certified MCP Security Expert)
  - **Projetos / Milestones:** Segurança em servidores MCP e agentes autônomos.

---

## 2. Domínio: AI Security & SecMLOps

### 2.1 `ai-security-redteam` — AI Security & Adversarial Red Teaming
- **Status / Nível Atual:** Em evolução (Nível 2.1)
- **Origem da Completude:** Estudos iniciais e integração de testes adversariais.
- **Marcos de Nivelamento:**
  - [x] L2: Conhecimento básico de vulnerabilidades em LLMs (OWASP Top 10 for LLMs).
  - [ ] L3: Aplicação de testes de Prompt Injection, Jailbreaking e Data Poisoning.
  - [ ] L4: Red Teaming avançado estruturado no framework MITRE ATLAS.
  - [ ] L5+: Pesquisa e desenvolvimento de contramedidas avançadas para modelos proprietários.
- **Relações:**
  - **Certificações / Recursos:** `cert-caisp`, `course-adversarial-ml`
  - **Projetos / Milestones:** Avaliação de vulnerabilidades em modelos de IA.

### 2.2 `ai-governance-compliance` — Governança, Privacidade & Compliance de IA
- **Status / Nível Atual:** Inicial (Nível 1.8)
- **Origem da Completude:** Experiência com marcos regulatórios e diretrizes de governança.
- **Marcos de Nivelamento:**
  - [x] L2: Leitura e compreensão de princípios éticos de IA.
  - [ ] L3: Aplicação do NIST AI RMF e mapeamento de riscos regulatórios.
  - [ ] L4: Implementação corporativa da norma ISO/IEC 42001 e conformidade com o EU AI Act.
  - [ ] L5+: Liderança de comitês de ética e governança de IA em instituições financeiras.
- **Relações:**
  - **Certificações / Recursos:** `cert-iso42001`, `cert-aaism`
  - **Projetos / Milestones:** Implementação da norma ISO/IEC 42001.

### 2.3 `model-supply-chain-sec` — Segurança da Model Supply Chain
- **Status / Nível Atual:** Inicial / Conquista Futura (Nível 1.0)
- **Origem da Completude:** A ser desenvolvido nos milestones de MLOps seguro.
- **Marcos de Nivelamento:**
  - [ ] L3: Identificação de riscos em dependências de modelos (HuggingFace, PyPI).
  - [ ] L4: Assinatura de artefatos com `.safetensors`, rastreabilidade com MLflow e verificação de proveniência.
  - [ ] L5+: Construção de pipelines de CI/CD blindados para ingestão e treino de modelos.
- **Relações:**
  - **Certificações / Recursos:** `tool-safetensors`, `tool-mlflow-provenance`, `course-mlops-security`
  - **Projetos / Milestones:** Assinatura de artefatos e controle de proveniência de modelos.

---

## 3. Domínio: Engenharia de Dados & Big Data

### 3.1 `data-modeling` — Modelagem de Dados & Schemas Dimensionais
- **Status / Nível Atual:** Concluído (Nível 5.0)
- **Origem da Completude:** Experiência prévia sólida em design de schemas Kimball e normalização.
- **Marcos de Nivelamento:**
  - [x] L2: Modelagem relacional básica (3FN) e queries SQL estruturadas.
  - [x] L3: Modelagem dimensional (Kimball), star schema e snowflake schema.
  - [x] L4: Otimização avançada de particionamento, denormalização para alta performance analítica.
  - [x] L5: Arquitetura de dados corporativa, Data Mesh e contratos de dados em grande escala.
- **Relações:**
  - **Recursos:** `books-ana-ddia`, `book-fundamentals-data-eng`
  - **Projetos / Milestones:** Arquitetura de dados para o ecossistema corporativo.

### 3.2 `data-lakes-lakehouse` — Data Lakes, S3, Athena & QuickSight
- **Status / Nível Atual:** Concluído (Nível 4.3)
- **Origem da Completude:** Implementação prática em ambientes cloud (AWS S3, Athena).
- **Marcos de Nivelamento:**
  - [x] L2: Armazenamento básico de arquivos em S3 e criação de tabelas externas.
  - [x] L3: Otimização de formatos colunares (Parquet/ORC) e particionamento em S3.
  - [x] L4: Consultas serverless de alta performance em Athena e criação de dashboards gerenciais no QuickSight.
  - [ ] L5+: Governança de Data Lakes em petabytes com Lake Formation.
- **Relações:**
  - **Recursos:** `books-ana-tads`, `cert-cloud-practitioner`
  - **Projetos / Milestones:** Consultas serverless e dashboards analíticos.

### 3.3 `pyspark-glue-etl` — PySpark, AWS Glue & Event Streaming
- **Status / Nível Atual:** Intermediário (Nível 3.0)
- **Origem da Completude:** Experiência prática com processamento distribuído de dados.
- **Marcos de Nivelamento:**
  - [x] L2: Scripts PySpark básicos para manipulação de DataFrames.
  - [x] L3: Otimização de joins, shuffles e uso de job bookmarks no AWS Glue.
  - [ ] L4: Processamento de streaming em tempo real com Spark Structured Streaming / Kafka.
  - [ ] L5+: Arquiteturas de processamento distribuído tolerantes a falhas em larga escala.
- **Relações:**
  - **Recursos:** `books-ana-dsfb`, `book-fundamentals-data-eng`
  - **Projetos / Milestones:** Pipelines ETL de grande volume na AWS.

### 3.4 `data-quality-lineage` — Data Quality & Observabilidade
- **Status / Nível Atual:** Intermediário (Nível 3.0)
- **Origem da Completude:** Aplicação de checagens automatizadas de qualidade de dados.
- **Marcos de Nivelamento:**
  - [x] L2: Validações manuais e logs de erro em pipelines de dados.
  - [x] L3: Implementação de testes automatizados de qualidade (Great Expectations / Soda).
  - [ ] L4: Monitoramento de linhagem de dados end-to-end e alertas proativos.
  - [ ] L5+: Governança de observabilidade corporativa de dados.
- **Relações:**
  - **Recursos:** `books-ana-ddia`
  - **Projetos / Milestones:** Monitoramento de confiabilidade de datasets.

---

## 4. Domínio: Cloud, Platform Engineering & DevOps

### 4.1 `aws-cloud-arch` — AWS Cloud & Serverless Services
- **Status / Nível Atual:** Avançado (Nível 4.6)
- **Origem da Completude:** Experiência diária em arquitetura de microsserviços e serverless na AWS.
- **Marcos de Nivelamento:**
  - [x] L2: Uso de serviços gerenciados básicos (EC2, S3, IAM).
  - [x] L3: Arquitetura serverless avançada com Lambda, API Gateway, DynamoDB e SQS.
  - [x] L4: Design de sistemas altamente disponíveis, multi-AZ, otimização de custos (FinOps) e segurança em nuvem.
  - [x] L5: Enterprise Cloud Architecture, Landing Zones e governança multi-conta.
- **Relações:**
  - **Certificações / Recursos:** `cert-awssaa`, `cert-awssap`
  - **Projetos / Milestones:** Design de soluções robustas em nuvem.

### 4.2 `containers-kubernetes` — Containers & Kubernetes (CKA)
- **Status / Nível Atual:** Planejado / Conquista Futura (Nível 1.0 → L4)
- **Origem da Completude:** A ser conquistado via certificação CKA e estudos avançados.
- **Marcos de Nivelamento:**
  - [ ] L2: Empacotamento básico de aplicações em Docker containers.
  - [ ] L3: Conceitos fundamentais de Kubernetes (Pods, Services, Deployments).
  - [ ] L4: Administração de clusters, Helm charts, Ingress controllers e segurança (CKA).
  - [ ] L5+: Arquitetura de plataformas baseadas em Kubernetes em produção corporativa.
- **Relações:**
  - **Certificações / Recursos:** `course-kubernetes-cka`, `book-accelerate`
  - **Projetos / Milestones:** Orquestração e segurança de clusters.

### 4.3 `platform-devops-mlops` — Platform, DevOps & MLOps Lifecycle
- **Status / Nível Atual:** Intermediário (Nível 3.5)
- **Origem da Completude:** Experiência com pipelines de CI/CD e automação de deploys.
- **Marcos de Nivelamento:**
  - [x] L2: Scripts de CI básicos (GitHub Actions / CodeBuild).
  - [x] L3: Pipelines completos de CI/CD com testes automatizados, build e deploy em nuvem.
  - [ ] L4: MLOps lifecycle (MLflow, model registry, monitoramento de drift e re-treino automatizado).
  - [ ] L5+: Platform engineering avançado, Developer Portals e autonomia de engenharia.
- **Relações:**
  - **Certificações / Recursos:** `course-mlops-production`, `books-code-cco`
  - **Projetos / Milestones:** Automação de entregas de software.

---

## 5. Domínio: Segurança Ofensiva, Defensiva & Enterprise Security

### 5.1 `offensive-sec-pentest` — Segurança Ofensiva & Red Teaming (CRTP / OSCP)
- **Status / Nível Atual:** Inicial / Em progressão (Nível 1.8)
- **Origem da Completude:** Fundamentos de segurança e estudos em andamento.
- **Marcos de Nivelamento:**
  - [x] L2: Conceitos fundamentais de redes, OWASP Top 10 e portas/protocolos.
  - [ ] L3: Metodologia de pentest (OSCP / PEN-200), enumeração e exploração básica.
  - [ ] L4: Técnicas avançadas de Red Team e exploração de Active Directory (CRTP).
  - [ ] L5+: Simulação de ataques avançados (APT) e engenharia reversa aplicada.
- **Relações:**
  - **Certificações / Recursos:** `cert-crtp`, `cert-oscp`, `cert-security-plus`
  - **Projetos / Milestones:** Trilha de Red Team e testes de intrusão.

### 5.2 `enterprise-info-sec` — Segurança Corporativa & Governance (CISSP)
- **Status / Nível Atual:** Inicial (Nível 1.8)
- **Origem da Completude:** Experiência prévia em governança de segurança da informação.
- **Marcos de Nivelamento:**
  - [x] L2: Boas práticas de segurança da informação e gestão de senhas/acessos.
  - [ ] L3: Implementação de controles baseados em frameworks (NIST, CIS Benchmarks).
  - [ ] L4: Gestão de riscos corporativos, criptografia avançada e frameworks de governança (CISSP).
  - [ ] L5+: Estratégia global de CISO, arquitetura Zero Trust corporativa.
- **Relações:**
  - **Certificações / Recursos:** `cert-cissp`, `ref-owasp-top10`, `ref-cwe-top25`
  - **Projetos / Milestones:** Mitigação de riscos e segurança defensiva.

---

## 6. Domínio: Arquitetura de Software & Desenvolvimento

### 6.1 `api-architecture-design` — Arquitetura, Design & Contratos de APIs
- **Status / Nível Atual:** Avançado (Nível 4.0)
- **Origem da Completude:** Experiência na criação e versionamento de contratos REST e OpenAPI.
- **Marcos de Nivelamento:**
  - [x] L2: Criação de endpoints HTTP básicos e documentação informal.
  - [x] L3: Design RESTful maduro, contratos OpenAPI / Swagger e versionamento.
  - [x] L4: Governança corporativa de APIs, API Gateways, resiliência e testes de contrato.
  - [ ] L5+: Estratégia de API-First e ecossistemas de integração em larga escala.
- **Relações:**
  - **Certificações / Recursos:** `cert-api-owner`, `books-arch-peaa`
  - **Projetos / Milestones:** Governança e design de APIs corporativas.

### 6.2 `enterprise-architecture-design` — Enterprise Architecture & System Design
- **Status / Nível Atual:** Intermediário (Nível 3.5)
- **Origem da Completude:** Estudos e aplicação de padrões de arquitetura corporativa.
- **Marcos de Nivelamento:**
  - [x] L2: Princípios básicos de modularização e desacoplamento de código.
  - [x] L3: Padrões de microsserviços, Domain-Driven Design (DDD) e mensageria.
  - [x] L4: Arquitetura de sistemas distribuídos de alta escala (System Design), iSAQB CPSA-F/A.
  - [ ] L5+: Enterprise Architecture, trade-offs complexos e direcionamento tecnológico corporativo.
- **Relações:**
  - **Certificações / Recursos:** `cert-cpsaf`, `cert-cpsaa`, `book-building-microservices`, `course-system-design-interview`
  - **Projetos / Milestones:** Escalabilidade de sistemas distribuídos.

---

## 7. Domínio: Liderança, Governança & Soft Skills

### 7.1 `leadership-mentorship` — Liderança Técnica & Mentoria de Talentos
- **Status / Nível Atual:** Intermediário / Avançado (Nível 3.8)
- **Origem da Completude:** Experiência prévia em onboarding e mentoria de novos membros.
- **Marcos de Nivelamento:**
  - [x] L2: Apoio pontual a colegas e participação em code reviews.
  - [x] L3: Onboarding estruturado de novos membros e mentoria contínua.
  - [x] L4: Liderança técnica de squads, gestão de expectativas e desenvolvimento de carreiras (Staff Engineer).
  - [ ] L5+: Liderança executiva de engenharia, organização de times (Team Topologies) e estratégia de talentos.
- **Relações:**
  - **Recursos:** `book-staff-engineer`, `book-team-topologies`
  - **Projetos / Milestones:** Desenvolvimento de pessoas e disseminação de práticas técnicas.

### 7.2 `communication-storytelling` — Comunicação Assertiva & Storytelling
- **Status / Nível Atual:** Avançado (Nível 4.2)
- **Origem da Completude:** Experiência em apresentações técnicas e alinhamento com stakeholders.
- **Marcos de Nivelamento:**
  - [x] L2: Comunicação clara de status de tarefas e relatórios simples.
  - [x] L3: Apresentações técnicas assertivas e facilitação de reuniões de alinhamento.
  - [x] L4: Storytelling com dados, comunicação executiva e facilitação de negociações complexas (CNV).
  - [ ] L5+: Influência sem autoridade em nível executivo e representação da empresa em fóruns estratégicos.
- **Relações:**
  - **Recursos:** `books-comm-cnv`, `books-comm-storytelling`, `books-comm-cfaip`
  - **Projetos / Milestones:** Facilitação de alinhamentos estratégicos.

