import { PersonalInfo, Skill, Milestone, Project, Resource } from '@/types/pdi';

export const personalInfo: PersonalInfo = {
  name: 'Gustavo Soldera',
  birthDate: '2002-05-30',
  startDate: '2025-05-05', // Efetivado como Júnior
  company: 'Itaú Unibanco',
  department: 'Cyber Security',
  currentRole: 'Engenheiro de Analytics PL',
  targetRole: 'AI Security Specialist',
  targetTimelineMonths: 18,
  timelineTarget: '2027-06-07', // Início como Pleno
  seniorTargetDate: '2029-01-01', // Desejo estar como Sênior
  experienceStartDate: '2023-06-07', // Início como Estagiário
  bankStartDate: '2024-05-05', // Entro no Itaú
  profileImage: '/assets/img/profile.jpg',
  currentLevel: 'L2',
  targetLevel: 'L3',
};

export const skills: Skill[] = [
  // ==========================================
  // HARD SKILLS: IA Generativa, Agentes & SDD
  // ==========================================
  {
    id: 'agent-systems',
    name: 'Agent Systems & Autonomous Workflows',
    level: 5.0,
    description: 'Arquitetura, orquestração e execução de agentes autônomos e sistemas multi-agente.',
    category: 'IA Generativa',
    type: 'hard',
    requirements: [
      { id: 'agent-chaining', text: 'Prompt Chaining & Orquestração Sequencial' },
      { id: 'agent-mcp', text: 'Integração de Ferramentas via Protocolo MCP' },
      { id: 'agent-langgraph', text: 'Stateful Graphs & Decisão Dinâmica (LangGraph)' },
      { id: 'agent-reflection', text: 'Self-Reflection, Self-Critique & Error Recovery' },
      { id: 'agent-mas', text: 'Multi-Agent Systems (MAS) Hierárquicos' },
      { id: 'agent-evals', text: 'Agent Evals, Benchmarking & Continuous Assessment' },
      { id: 'agent-memory', text: 'Long-Term Memory, Context Window & Vector RAG' },
      { id: 'agent-tool-building', text: 'Custom Tool Building & Sandboxing (Hermes/Devin)' },
      { id: 'agent-human-in-loop', text: 'Human-in-the-Loop & Breakpoints Interativos' },
      { id: 'agent-state-persistence', text: 'Persistência de Estado e Checkpointing de Agentes' },
      { id: 'agent-streaming', text: 'Streaming de Pensamento e Token-by-Token Rendering' },
      { id: 'agent-fallback-recovery', text: 'Fallback Strategy & Self-Healing de Erros de Execução' }
    ]
  },
  {
    id: 'prompt-eng-sdd',
    name: 'Prompt Engineering & SDD Frameworks',
    level: 5.0,
    description: 'Engenharia de prompts avançada e desenvolvimento orientado a especificações.',
    category: 'IA Generativa',
    type: 'hard',
    requirements: [
      { id: 'prompt-persona', text: 'Persona, Context & Tone Engineering' },
      { id: 'prompt-fewshot', text: 'Few-Shot & Dynamic Context Injection' },
      { id: 'prompt-cot', text: 'Chain-of-Thought (CoT) & Step-by-Step Reasoning' },
      { id: 'prompt-recipes', text: 'Prompt Recipes & Modular Blueprints' },
      { id: 'prompt-skeleton', text: 'Skeleton-of-Thought para Documentos Extensos' },
      { id: 'sdd-specs', text: 'Specification-Driven Development (SDD / Spec-Kit)' },
      { id: 'gsd-framework', text: 'Get Shit Done (GSD) Agentic Framework' },
      { id: 'bmad-method', text: 'BMAD Architecture & Requirements Elicitation' },
      { id: 'prompt-json-schema', text: 'Structured Output & JSON Schema Constraint Enforcement' },
      { id: 'prompt-metaprompting', text: 'Meta-Prompting & Geração Automatizada de Prompts' },
      { id: 'prompt-compression', text: 'Context Window Compression & Prompt Distillation' },
      { id: 'prompt-negation-boundary', text: 'Boundary Guarding & Anti-Hallucination Prompting' }
    ]
  },

  // ==========================================
  // HARD SKILLS: AI Security & Red Teaming (SecMLOps)
  // ==========================================
  {
    id: 'ai-security-redteam',
    name: 'AI Security & Adversarial Red Teaming',
    level: 2.14,
    description: 'Segurança ofensiva/defensiva em IA, testes adversariais e proteção da cadeia de modelos.',
    category: 'Segurança & SecMLOps',
    type: 'hard',
    requirements: [
      { id: 'bedrock-guardrails', text: 'Bedrock Guardrails & Content Filtering' },
      { id: 'secmlops-supply-chain', text: 'Model Supply Chain Security (Model Provenance & Scanning)' },
      { id: 'prompt-injection', text: 'Mitigação de Direct/Indirect Prompt Injection & Jailbreaks' },
      { id: 'mitre-atlas', text: 'Modelagem de Ameaças ML via MITRE ATLAS (TTPs)' },
      { id: 'adversarial-redteam', text: 'Adversarial ML & Red Teaming em LLMs' },
      { id: 'mcp-security', text: 'MCP Security & Isolamento de Ferramentas (CMCPSE)' },
      { id: 'agentic-threat-modeling', text: 'Agentic Security & Threat Modeling de Agentes' },
      { id: 'caisp-practical-labs', text: 'Análise Avançada de Vulnerabilidades em IA (CAISP)' },
      { id: 'mcp-tool-poisoning', text: 'Mitigação de Tool Poisoning & Rug-Pull em MCP (CMCPSE)' },
      { id: 'data-poisoning-ml', text: 'Detecção de Data Poisoning & Model Inversion Attacks' },
      { id: 'rag-poisoning-sec', text: 'Segurança em RAG: Vector Injection & Knowledge Base Tampering' },
      { id: 'agent-sandbox-sec', text: 'Isolamento de Ambiente e Sandboxing para Execução de Agentes' }
    ]
  },
  {
    id: 'ai-governance-compliance',
    name: 'AI Governance, Privacy & Compliance',
    level: 1.8,
    description: 'Governança corporativa de IA, conformidade regulatória e auditoria de modelos.',
    category: 'Segurança & SecMLOps',
    type: 'hard',
    requirements: [
      { id: 'llm-pii-privacy', text: 'Privacidade de Dados, Retenção & Sanitização de PII' },
      { id: 'nist-ai-rmf', text: 'Conformidade & Governança via NIST AI RMF' },
      { id: 'iso-42001', text: 'Gestão da Governança de IA (ISO/IEC 42001)' },
      { id: 'ai-auditing-hallucination', text: 'Auditoria de Outputs & Detecção de Alucinações' },
      { id: 'executive-ai-governance', text: 'Framework Corporativo de AI Governance em Produção' },
      { id: 'isaca-aaism-program', text: 'Programa Integrado de AI Security Management (ISACA AAISM)' },
      { id: 'eu-ai-act-compliance', text: 'Classificação de Risco & Conformidade Regulatória (EU AI Act)' },
      { id: 'model-explainability-xai', text: 'Explicabilidade de Modelos (XAI / SHAP / LIME)' },
      { id: 'bias-fairness-audit', text: 'Auditoria Algorítmica de Viés e Imparcialidade (Fairness)' },
      { id: 'ai-lifecycle-governance', text: 'Governança de Ciclo de Vida do Aprendizado de Máquina' }
    ]
  },

  // ==========================================
  // HARD SKILLS: Offensive & Infrastructure Security
  // ==========================================
  {
    id: 'offensive-sec-pentest',
    name: 'Segurança Ofensiva & Red Teaming',
    level: 1.8,
    description: 'Pentest, exploração de vulnerabilidades e técnicas de Red Team (Active Directory / Cloud).',
    category: 'Segurança & SecMLOps',
    type: 'hard',
    requirements: [
      { id: 'sec-comptia', text: 'Fundamentos de Cyber Security (CompTIA Security+)' },
      { id: 'crtp-ad-sec', text: 'Exploração & Defesa em Active Directory (CRTP)' },
      { id: 'oscp-pentest', text: 'Metodologias de Pentest & Exploração Prática (OSCP)' },
      { id: 'cloud-security-iam', text: 'Segurança de Infraestrutura Cloud (IAM / VPC Hardening)' },
      { id: 'cissp-domains', text: 'Domínios de Segurança da Informação (CISSP)' },
      { id: 'oscp-web-exploitation', text: 'Exploração Web Avançada & OWASP Top 10 (OSCP)' },
      { id: 'oscp-privilege-escalation', text: 'Elevação de Privilégios Windows/Linux (OSCP)' },
      { id: 'crtp-kerberos-attacks', text: 'Ataques Kerberos: Kerberoasting & AS-REP Roasting (CRTP)' },
      { id: 'crtp-lateral-movement', text: 'Movimentação Lateral & Golden/Silver Tickets (CRTP)' },
      { id: 'cissp-risk-mgmt', text: 'Gestão de Riscos & Governança da Segurança (CISSP)' },
      { id: 'cissp-network-sec', text: 'Engenharia & Arquitetura de Redes Seguras (CISSP)' },
      { id: 'cissp-identity-access', text: 'Gestão de Identidade & Controle de Acesso (CISSP)' }
    ]
  },

  // ==========================================
  // HARD SKILLS: Engenharia de Dados & Analytics (Desagrupado)
  // ==========================================
  {
    id: 'data-modeling',
    name: 'Modelagem de Dados & Schemas',
    level: 5.0,
    description: 'Design de schemas dimensionais (Kimball), normalização, denormalização e contratos de dados.',
    category: 'Engenharia de Dados',
    type: 'hard',
    requirements: [
      { id: 'de-kimball', text: 'Modelagem Dimensional (Kimball / Star Schema / Snowflake)' },
      { id: 'de-normalization', text: 'Normalização (3NF) & Denormalização Analítica' },
      { id: 'de-sql-advanced', text: 'SQL Avançado, CTEs, Window Functions & Tuning' },
      { id: 'de-data-contracts-design', text: 'Design e Governança de Data Contracts' },
      { id: 'de-schema-evolution', text: 'Evolução de Schemas & Compatibilidade de Contratos' },
      { id: 'de-slowly-changing-dims', text: 'Tratamento de Dimensoes Lentamente Alteradas (SCD Type 1/2/3)' },
      { id: 'de-semantic-layer', text: 'Camada Semântica & Métricas Centralizadas' },
      { id: 'de-partition-indexing', text: 'Estratégias de Particionamento e Indexação de Dados' }
    ]
  },
  {
    id: 'data-lakes-lakehouse',
    name: 'Data Lakes, Athena & QuickSight BI',
    level: 5.0,
    description: 'Arquitetura Lakehouse em S3, consultas serverless em Athena e dashboards visuais.',
    category: 'Engenharia de Dados',
    type: 'hard',
    requirements: [
      { id: 'de-lakehouse-s3', text: 'Armazenamento & Particionamento de Data Lakes (S3/Parquet)' },
      { id: 'de-athena-queries', text: 'Consultas Ad-hoc & Otimização no AWS Athena' },
      { id: 'de-quicksight-dashboards', text: 'Dashboards Interativos & BI no Amazon QuickSight' },
      { id: 'de-redshift-dw', text: 'Data Warehouse & Analytics em Escala no Redshift' },
      { id: 'de-open-table-formats', text: 'Formatos de Tabela Abertos (Iceberg / Delta Lake)' },
      { id: 'de-quicksight-spice', text: 'Otimização de Performance em SPICE no QuickSight' },
      { id: 'de-lakehouse-governance', text: 'Governança de Acesso e Catalogação em Data Lakes' },
      { id: 'de-compaction-vacuum', text: 'Manutenção de Lakehouse: Compacidade & Small Files' }
    ]
  },
  {
    id: 'pyspark-glue-etl',
    name: 'PySpark, Glue & Event Streaming',
    level: 3.0,
    description: 'Processamento distribuído de big data com PySpark, ETL serverless e streaming.',
    category: 'Engenharia de Dados',
    type: 'hard',
    requirements: [
      { id: 'pyspark-distributed', text: 'Transformação Distribuída em Escala via PySpark' },
      { id: 'aws-glue-jobs', text: 'Jobs Serverless, Crawlers & Data Catalog no AWS Glue' },
      { id: 'data-streaming-kafka', text: 'Streaming de Dados em Tempo Real (Apache Kafka)' },
      { id: 'emr-spark-clusters', text: 'Orquestração de Clusters EMR para Big Data' },
      { id: 'spark-memory-tuning', text: 'Tuning de Memória & Gerenciamento de Out-Of-Memory (OOM)' },
      { id: 'glue-dynamic-frames', text: 'DynamicFrames & Transforms Customizadas no Glue' },
      { id: 'structured-streaming-spark', text: 'Spark Structured Streaming & Event-Driven Pipelines' },
      { id: 'pyspark-udf-vectorized', text: 'Otimização de UDFs Vetorizadas com PyArrow' }
    ]
  },
  {
    id: 'data-quality-observability',
    name: 'Data Quality & Lineage Observability',
    level: 3.0,
    description: 'Validação automatizada de regras de qualidade, observabilidade e linhagem de dados.',
    category: 'Engenharia de Dados',
    type: 'hard',
    requirements: [
      { id: 'de-glue-dq-rules', text: 'Regras de Qualidade Automatizadas (AWS Glue DQ)' },
      { id: 'de-observability-alerts', text: 'Data Observability & Alertas de Anomalias de Pipeline' },
      { id: 'de-lineage-tracing', text: 'Rastreabilidade de Linhagem (Data Lineage End-to-End)' },
      { id: 'de-deequ-validation', text: 'Validação de Datasets em Escala com Deequ' },
      { id: 'de-data-freshness-sla', text: 'Monitoramento de SLA de Dados e Data Freshness' },
      { id: 'de-circuit-breaker', text: 'Data Circuit Breakers para Bloqueio de Dados Corrompidos' },
      { id: 'de-reconciliation-pipeline', text: 'Pipelines de Reconciliação & Checagem de Consistência' },
      { id: 'de-openlineage-metadata', text: 'Metadata Management & OpenLineage Integration' }
    ]
  },

  // ==========================================
  // HARD SKILLS: Cloud, DevOps & MLOps
  // ==========================================
  {
    id: 'aws-cloud-arch',
    name: 'AWS Cloud & Serverless Services',
    level: 4.6,
    description: 'Arquitetura resiliente de microsserviços e componentes serverless na AWS.',
    category: 'Cloud & Infraestrutura',
    type: 'hard',
    requirements: [
      { id: 'aws-core', text: 'Serviços Serverless Core (S3, Lambda, API Gateway)' },
      { id: 'aws-iam', text: 'Políticas IAM & Privilégio Mínimo' },
      { id: 'aws-vpc', text: 'Redes Privadas, Subnets & VPC Endpoints' },
      { id: 'aws-cloudwatch', text: 'Monitoramento & Centralização de Logs (CloudWatch)' },
      { id: 'aws-cloudfront', text: 'Distribuição Global via CDN CloudFront' },
      { id: 'aws-bedrock-service', text: 'Modelos Gerenciados no AWS Bedrock' },
      { id: 'aws-isaqb-arch', text: 'Arquitetura de Soluções Cloud (AWS SA Pro / iSAQB)' },
      { id: 'aws-sap-multi-account', text: 'Arquitetura Multi-Conta AWS Organizations & Landing Zone (AWS SA Pro)' },
      { id: 'aws-sap-disaster-recovery', text: 'Estratégias de Disaster Recovery & Alta Disponibilidade (AWS SA Pro)' },
      { id: 'aws-sap-migration', text: 'Estratégias de Migração & Modernização de Cargas (AWS SA Pro)' },
      { id: 'isaqb-cpsaa-methodology', text: 'Metodologia & Avaliação Arquitetural (iSAQB CPSA-A)' },
      { id: 'isaqb-cpsaa-communication', text: 'Comunicação & Documentação de Arquitetura (iSAQB CPSA-A)' }
    ]
  },
  {
    id: 'platform-devops-mlops',
    name: 'Platform, DevOps & MLOps Lifecycle',
    level: 4.33,
    description: 'Provisionamento declarativo, contêineres, CI/CD e ciclo de vida MLOps.',
    category: 'Cloud & Infraestrutura',
    type: 'hard',
    requirements: [
      { id: 'iac-terraform', text: 'Terraform Modular & Remote State' },
      { id: 'devops-docker', text: 'Containerização de Aplicações com Docker' },
      { id: 'devops-orchestration', text: 'Orquestração de Contêineres (ECS / Kubernetes)' },
      { id: 'mlops-lifecycle', text: 'MLOps: Deploy, Versionamento & Tracking de Modelos' },
      { id: 'finops-cost', text: 'FinOps Contínuo & Otimização de Custos Cloud' },
      { id: 'cicd-pipelines', text: 'Automação CI/CD (GitHub Actions / CodeBuild / CodePipeline)' },
      { id: 'observability-datadog', text: 'Observabilidade & APM com Datadog' },
      { id: 'gitops-argo-flux', text: 'GitOps & Deploy Declarativo (ArgoCD / Flux)' },
      { id: 'mlops-feature-store', text: 'Feature Store & Repositório de Features para ML' },
      { id: 'mlops-drift-detection', text: 'Monitoramento de Concept Drift & Data Drift em Produção' },
      { id: 'iac-security-scanning', text: 'Segurança em IaC (Checkov / TFSec / Static Analysis)' },
      { id: 'blue-green-canary-deploy', text: 'Estratégias de Deploy Progressivo (Blue/Green & Canary)' }
    ]
  },

  // ==========================================
  // HARD SKILLS: Engenharia de Software & Web
  // ==========================================
  {
    id: 'web-frontend-arch',
    name: 'Engenharia Frontend & Microfrontends',
    level: 4.6,
    description: 'Desenvolvimento de interfaces modernas, tipadas e escaláveis.',
    category: 'Engenharia de Software',
    type: 'hard',
    requirements: [
      { id: 'web-typescript', text: 'TypeScript & JavaScript Avançado (ESNext)' },
      { id: 'web-react-angular', text: 'Frameworks Reativos (React / Angular)' },
      { id: 'web-microfrontends', text: 'Arquitetura Distribuída de Microfrontends' },
      { id: 'web-styling-design', text: 'Tailwind CSS, Sass & Design Systems' },
      { id: 'web-ux-figma', text: 'Prototipação em Figma & Princípios de UX' },
      { id: 'web-testing-qa', text: 'Testes Automatizados (Unitários / E2E / Linters / SonarQube)' },
      { id: 'web-state-management', text: 'Gerenciamento de Estado Complexo (Zustand / Redux / Context)' },
      { id: 'web-performance-opt', text: 'Otimização de Web Vitals, Code Splitting & Lazy Loading' },
      { id: 'web-accessibility-a11y', text: 'Acessibilidade Web (WCAG / WAI-ARIA)' },
      { id: 'web-security-csp-xss', text: 'Segurança Frontend: CSP, Mitigação XSS & CSRF' }
    ]
  },
  {
    id: 'api-architecture-design',
    name: 'Arquitetura, Design & Contratos de APIs',
    level: 5.0,
    description: 'Especificação, versionamento e governança de contratos REST e APIs.',
    category: 'Engenharia de Software',
    type: 'hard',
    requirements: [
      { id: 'api-openapi', text: 'Especificação OpenAPI & Versionamento' },
      { id: 'api-design-patterns', text: 'RESTful API Design & Governança (API Owner)' },
      { id: 'api-gateway-mgmt', text: 'Gerenciamento & Rate Limiting em Gateways' },
      { id: 'api-contracts-val', text: 'Testes de Contrato & Mitigação de Breaking Changes' },
      { id: 'api-graphql-grpc', text: 'Protocolos de Comunicação Alternativos (GraphQL / gRPC)' },
      { id: 'api-resilience-patterns', text: 'Padrões de Resiliência: Circuit Breaker & Retry' },
      { id: 'api-authentication-oauth', text: 'Segurança de APIs: OAuth2, OIDC & Mutual TLS' },
      { id: 'api-event-driven-async', text: 'APIs Assíncronas & Event-Driven Architecture (AsyncAPI)' }
    ]
  },
  {
    id: 'languages-tooling',
    name: 'Linguagens, Scripting & Automação',
    level: 4.8,
    description: 'Fluência em linguagens principais, ferramentas CLI e automação de processos.',
    category: 'Engenharia de Software',
    type: 'hard',
    requirements: [
      { id: 'lang-python', text: 'Python para Automação, Data & IA' },
      { id: 'lang-bash', text: 'Shell Scripting & Automação Bash' },
      { id: 'tooling-git', text: 'Git Avançado & Fluxos de Trabalho Colaborativos' },
      { id: 'power-automate-lowcode', text: 'Automação Low-Code (Power Automate)' },
      { id: 'copilots-productivity', text: 'Devin, GitHub Copilot & StackSpot AI' },
      { id: 'lang-rust-go-basics', text: 'Fundamentos de Linguagens de Alta Performance (Go / Rust)' },
      { id: 'tooling-cli-automation', text: 'Criação de CLIs Customizadas & Ferramental de DevEx' },
      { id: 'advanced-git-workflows', text: 'Git Internals, Rebase Interativo & Trunk-Based Dev' }
    ]
  },

  // ==========================================
  // SOFT SKILLS (Desagrupadas & Detalhadas)
  // ==========================================
  {
    id: 'critical-thinking-problem-solving',
    name: 'Pensamento Crítico & Resolução de Problemas',
    level: 4.6,
    description: 'Análise profunda de problemas complexos e decisão fundamentada.',
    category: 'Soft Skills',
    type: 'soft',
    requirements: [
      { id: 'soft-critical-analysis', text: 'Análise Crítica & Decomposição de Desafios' },
      { id: 'soft-complex-solving', text: 'Resolução de Problemas Multifacetados' },
      { id: 'soft-data-decisions', text: 'Tomada de Decisão Baseada em Dados e Evidências' },
      { id: 'soft-tradeoff-analysis', text: 'Avaliação Crítica de Tradeoffs Técnicos' },
      { id: 'soft-root-cause-analysis', text: 'Análise de Causa Raiz (5 Whys / Ishikawa / Post-Mortems)' },
      { id: 'soft-systems-thinking', text: 'Pensamento Sistêmico & Mapeamento de Efeitos Colaterais' },
      { id: 'soft-hypothesis-testing', text: 'Formulação & Validação Científica de Hipóteses' },
      { id: 'soft-decision-frameworks', text: 'Frameworks de Decisão Sob Incerteza (Matriz de Decisão)' }
    ]
  },
  {
    id: 'strategic-vision-career',
    name: 'Visão Estratégica & Planejamento de Carreira',
    level: 4.5,
    description: 'Alinhamento corporativo, metas de longo prazo e estruturação de carreira.',
    category: 'Soft Skills',
    type: 'soft',
    requirements: [
      { id: 'soft-strategic-alignment', text: 'Alinhamento das Entregas aos Objetivos Corporativos' },
      { id: 'soft-career-laddering', text: 'Estruturação de Plano de Carreira (PDI L1-L7)' },
      { id: 'soft-proactivity-autonomy', text: 'Autonomia, Proatividade & Gestão do Tempo' },
      { id: 'soft-continuous-learning', text: 'Aprendizado Contínuo & Curiosidade Intelectual' },
      { id: 'soft-okr-kpi-alignment', text: 'Mapeamento de OKRs & KPIs de Impacto de Negócio' },
      { id: 'soft-horizon-planning', text: 'Planejamento Estratégico de Curto, Médio e Longo Prazo' },
      { id: 'soft-business-domain-knowledge', text: 'Compreensão Profunda do Domínio de Negócio e Finanças' },
      { id: 'soft-prioritization-eisenhower', text: 'Matriz de Priorização & Foco em Atividades de Alto Valor' }
    ]
  },
  {
    id: 'adaptability-resilience',
    name: 'Adaptabilidade, Resiliência & Autoconsciência',
    level: 4.6,
    description: 'Flexibilidade diante de mudanças e regulação sob pressão.',
    category: 'Soft Skills',
    type: 'soft',
    requirements: [
      { id: 'soft-adaptability-change', text: 'Flexibilidade & Ajuste Rápido a Novas Prioridades' },
      { id: 'soft-emotional-self-awareness', text: 'Autoconsciência & Inteligência Emocional' },
      { id: 'soft-resilience-pressure', text: 'Resiliência & Tolerância a Ambientes de Pressão' },
      { id: 'soft-feedback-reception', text: 'Recepção Aberta e Ação Sobre Feedbacks' },
      { id: 'soft-stress-management', text: 'Gestão de Estresse & Manutenção de Foco em Crises' },
      { id: 'soft-growth-mindset', text: 'Mentalidade de Crescimento (Growth Mindset)' },
      { id: 'soft-ambiguity-comfort', text: 'Navegação Confortável em Cenários de Alta Ambiguidade' },
      { id: 'soft-self-regulation', text: 'Autorregulação Emocional & Comunicação sob Pressão' }
    ]
  },
  {
    id: 'communication-storytelling',
    name: 'Comunicação Assertiva & Storytelling de Dados',
    level: 4.2,
    description: 'Articulação de mensagens técnicas para diferentes audiências e apresentações.',
    category: 'Soft Skills',
    type: 'soft',
    requirements: [
      { id: 'soft-data-storytelling', text: 'Storytelling de Dados para Narrativas Impactantes' },
      { id: 'soft-executive-presentation', text: 'Apresentações Técnicas e Executivas de Alto Nível' },
      { id: 'soft-assertive-verbal', text: 'Comunicação Verbal Clareza e Assertividade' },
      { id: 'soft-active-listening', text: 'Escuta Ativa & Validação de Perspectivas' },
      { id: 'soft-technical-writing', text: 'Escrita Técnica Clara: RFCs, ADRs & Documentação' },
      { id: 'soft-audience-adaptation', text: 'Adaptação de Linguagem para Audiências Técnicas e Não-Técnicas' },
      { id: 'soft-pitch-persuasion', text: 'Pitch de Ideias & Persuasão Baseada em Evidências' },
      { id: 'soft-async-communication', text: 'Comunicação Assíncrona Eficiente & Sintética' }
    ]
  },
  {
    id: 'leadership-mentorship',
    name: 'Liderança Técnica & Mentoria de Talentos',
    level: 4.0,
    description: 'Orientação de profissionais, onboarding e liderança situacional.',
    category: 'Soft Skills',
    type: 'soft',
    requirements: [
      { id: 'soft-tech-mentoring', text: 'Mentoria Ativa & Acompanhamento de Desenvolvimento' },
      { id: 'soft-onboarding-lead', text: 'Liderança de Onboarding & Integração de Novos Pares' },
      { id: 'soft-situational-lead', text: 'Liderança Situacional Conforme Maturidade da Equipe' },
      { id: 'soft-stakeholder-mgmt', text: 'Gestão de Expectativas de Stakeholders Críticos' },
      { id: 'soft-delegation-empowerment', text: 'Delegação Efetiva & Empoderamento Técnico do Time' },
      { id: 'soft-technical-coaching', text: 'Coaching Técnico & Pair Programming Orientado' },
      { id: 'soft-team-building-culture', text: 'Construção de Cultura de Excelência & Segurança Psicológica' },
      { id: 'soft-conflict-resolution-lead', text: 'Mediação & Resolução de Desacordos Técnicos' }
    ]
  },
  {
    id: 'relational-influence-cnv',
    name: 'Relacionamento, CNV & Influência Sem Autoridade',
    level: 3.8,
    description: 'Comunicação não-violenta, facilitação, mediação e presença na comunidade.',
    category: 'Soft Skills',
    type: 'soft',
    requirements: [
      { id: 'soft-nvc-communication', text: 'Comunicação Não-Violenta (CNV) para Resolução de Conflitos' },
      { id: 'soft-influence-without-auth', text: 'Influência Sem Autoridade & Convencimento Lógico' },
      { id: 'soft-constructive-feedback', text: 'Fornecimento de Feedback Construtivo e Empático' },
      { id: 'soft-community-networking', text: 'Presença Executiva & Networking na Comunidade (SP)' },
      { id: 'soft-empathy-perspective', text: 'Empatia Organizacional & Leitura de Contexto Interpessoal' },
      { id: 'soft-negotiation-win-win', text: 'Negociação Ganha-Ganha em Alocação de Recursos/Prioridades' },
      { id: 'soft-trust-building', text: 'Construção de Relações de Confiança Inter-Squads' },
      { id: 'soft-public-advocacy', text: 'Advocacy Técnico & Representação de Marca Empregadora' }
    ]
  }
];

export const milestones: Milestone[] = [
  // ==========================================
  // PLANO DE 8 ANOS: 2026-2033
  // ==========================================
  // Fase 1: Pleno Ano 1 (2026-2027)
  // Fase 2: Pleno Ano 2 (2027-2028) - Promoção Pleno→Sênior em mai/2027
  // Fase 3: Sênior Ano 1 (2028-2029)
  // Fase 4: Sênior Ano 2 (2029-2030)
  // Fase 5: Transição Sênior→Specialist (2030-2031)
  // Fase 6: Specialist Ano 1 (2031-2032)
  // Fase 7: Specialist Ano 2 (2032-2033)
  // ==========================================

  // ==========================================
  // ARQUIVADOS (Concluídos em L1 - Intern)
  // ==========================================
  {
    id: 'certification-pro',
    title: 'Certificação Profissional',
    displayName: 'Certificação Analytics Engineer',
    description: 'Completar prova de engenheiro de analytics profissional',
    status: 'completed',
    progress: 100,
    deadline: '2025-08-15',
    notes: 'Aprovação em 11/09/2025 e aplicação nos fluxos do cyber.itau (arquitetura).',
    relatedSkills: ['data-modeling', 'pyspark', 'data-lakes-lakehouse', 'pyspark-glue-etl'],
    relatedResources: ['cert-analytics', 'cert-api-owner'],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'data-modeling', requirementId: 'de-kimball', isNewUnlock: true, rationale: 'Certificação validou modelagem dimensional avançada' },
      { skillId: 'data-modeling', requirementId: 'de-sql-advanced', isNewUnlock: true, rationale: 'Testou queries analíticas avançadas' },
      { skillId: 'pyspark-glue-etl', requirementId: 'pyspark-distributed', isNewUnlock: true, rationale: 'Prática intensa de transformações distribuídas' }
    ]
  },
  {
    id: 'soft-skills',
    title: 'Desenvolvimento de Soft Skills',
    displayName: 'Soft Skills - Comunicação e Colaboração',
    description: 'Desenvolver habilidades de comunicação e colaboração',
    status: 'completed',
    progress: 100,
    deadline: '2025-06-30',
    notes: 'Feedback formal de 3 colegas registrando evolução em escuta ativa e comunicação empática.',
    relatedSkills: ['communication-storytelling', 'relational-influence-cnv'],
    relatedResources: ['books-comm-cnv'],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'communication-storytelling', requirementId: 'soft-data-storytelling', isNewUnlock: true, rationale: 'Prática de apresentações de dados' },
      { skillId: 'relational-influence-cnv', requirementId: 'soft-nvc-communication', isNewUnlock: true, rationale: 'Leitura e aplicação do framework de CNV' }
    ]
  },
  {
    id: 'lead-projects',
    title: 'Liderar Projetos de Impacto',
    displayName: 'Liderança em Projetos Estratégicos',
    description: 'Assumir liderança técnica em projetos estratégicos',
    status: 'completed',
    progress: 100,
    deadline: '2025-09-30',
    notes: 'Ponto focal técnico no Insight Guard (frontend), padronizações e implantação da Leila. ADRs de arquitetura frontend (Next.js webview), backend (DDD + Lambda microsserviços + API Gateway) e sistemas agênticos (MAS, MCP) foram lideradas e adotadas pela squad.',
    relatedSkills: ['leadership-mentorship', 'strategic-vision-career', 'relational-influence-cnv', 'web-frontend-arch', 'api-architecture-design', 'agent-systems'],
    relatedResources: ['mentoring'],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'leadership-mentorship', requirementId: 'soft-tech-mentoring', isNewUnlock: true, rationale: 'Liderança técnica e facilitação arquitetural no Insight Guard' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: true, rationale: 'Alinhamento arquitetural de roadmap' },
      { skillId: 'relational-influence-cnv', requirementId: 'soft-influence-without-auth', isNewUnlock: true, rationale: 'Aprovação e adoção de ADRs pela squad' },
      { skillId: 'web-frontend-arch', requirementId: 'web-microfrontends', isNewUnlock: true, rationale: 'Arquitetura frontend em Next.js webview' },
      { skillId: 'api-architecture-design', requirementId: 'api-gateway-mgmt', isNewUnlock: true, rationale: 'Desenvolvimento backend com DDD + API Gateway' },
      { skillId: 'agent-systems', requirementId: 'agent-mcp', isNewUnlock: true, rationale: 'Adossamento de MCP e orquestração agêntica na Leila' }
    ]
  },
  {
    id: 'cert-api-owner',
    title: 'Certificação API Owner',
    displayName: 'API Owner',
    description: 'Concluir os três níveis da certificação API Owner',
    status: 'completed',
    progress: 100,
    deadline: '2025-12-20',
    notes: 'Concluí os três níveis da certificação API Owner, e apliquei padrões de contrato, versionamento e governança de APIs no planejamento do backend do Insight Guard.',
    relatedSkills: ['api-architecture-design'],
    relatedResources: ['cert-api-owner'],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'api-architecture-design', requirementId: 'api-openapi', isNewUnlock: true, rationale: 'Especificação OpenAPI & versionamento' },
      { skillId: 'api-architecture-design', requirementId: 'api-design-patterns', isNewUnlock: true, rationale: 'Governança oficial e design RESTful' }
    ]
  },
  {
    id: 'finops-consumer',
    title: 'FinOps na Consumer',
    displayName: 'Otimização de Custos (-30%)',
    description: 'Implementar práticas de FinOps e reduzir custos operacionais',
    status: 'completed',
    progress: 100,
    deadline: '2025-11-30',
    notes: 'Alvo: -30% de custo por execução de glue jobs na consumer aplicando Flex Execution e tuning de recursos.',
    relatedSkills: ['platform-devops-mlops', 'pyspark-glue-etl'],
    relatedResources: [],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'platform-devops-mlops', requirementId: 'finops-cost', isNewUnlock: true, rationale: 'Implementação prática de FinOps com -30% de custo' },
      { skillId: 'pyspark-glue-etl', requirementId: 'aws-glue-jobs', isNewUnlock: true, rationale: 'Tuning de recursos em Glue Jobs' }
    ]
  },
  {
    id: 'cert-security',
    title: 'Certificação Security+',
    displayName: 'CompTIA Security+ Certification',
    description: 'Obter certificação em segurança da informação',
    status: 'completed',
    progress: 100,
    deadline: '2026-04-30',
    relatedSkills: ['offensive-sec-pentest'],
    relatedResources: [],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'offensive-sec-pentest', requirementId: 'sec-comptia', isNewUnlock: true, rationale: 'Obtenção formal da certificação Security+' }
    ]
  },
  {
    id: 'mentor-colleagues',
    title: 'Mentorar Colegas',
    displayName: 'Mentoria Técnica',
    description: 'Apoiar o desenvolvimento técnico de colegas de equipe',
    status: 'completed',
    progress: 100,
    deadline: '2025-12-31',
    notes: 'Mentoria ativa para 2 estagiários em SQL e Python.',
    relatedSkills: ['leadership-mentorship', 'relational-influence-cnv', 'languages-tooling'],
    relatedResources: ['mentoring'],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'leadership-mentorship', requirementId: 'soft-onboarding-lead', isNewUnlock: true, rationale: 'Acompanhamento direto e orientação de estagiários' },
      { skillId: 'relational-influence-cnv', requirementId: 'soft-constructive-feedback', isNewUnlock: true, rationale: 'Prática contínua de feedbacks empáticos' },
      { skillId: 'languages-tooling', requirementId: 'lang-python', isNewUnlock: true, rationale: 'Orientação técnica de desenvolvimento em Python e SQL' }
    ]
  },
  {
    id: 'cert-aws-cloud',
    title: 'Certificação AWS Cloud Practitioner',
    displayName: 'AWS Cloud Practitioner',
    description: 'Obter certificação AWS Cloud Practitioner',
    status: 'completed',
    progress: 100,
    deadline: '2024-12-31',
    notes: 'Certificação obtida em Dezembro/2024.',
    relatedSkills: ['aws-cloud-arch'],
    relatedResources: ['cert-cloud-practitioner'],
    phase: 'L1',
    archived: true,
    unlockedRequirements: [
      { skillId: 'aws-cloud-arch', requirementId: 'aws-core', isNewUnlock: true, rationale: 'Certificação validou serviços core e arquitetura AWS' }
    ]
  },

  // ==========================================
  // L2 (Entry / Júnior) — Autonomia + Entrega
  // ==========================================
  {
    id: 'ai-fomentation',
    title: 'Fomento ao Consumo de IA',
    displayName: 'Multiplicador de IA e Automação',
    description: 'Fomentar o consumo de soluções de IA e compartilhamento de recursos técnicos com a comunidade.',
    status: 'in-progress',
    progress: 85,
    deadline: '2026-09-30',
    notes: 'KPI L2: Entrega autônoma e colaboração técnica. Em processo de conclusão final — Guilda de Práticas de GenAI em andamento, repositório cyber-prompts-and-skills com 10+ estrelas e 3+ contribuidores.',
    objectives: [
      { text: 'Alcançar 10 estrelas no repositório de compartilhamento de skills e prompts', completed: true, completionJustification: 'Repositório cyber-prompts-and-skills alcançou 10+ estrelas com skills de democratização de dados, documentação e design.' },
      { text: 'Mínimo de 3 contribuidores diferentes no repositório de compartilhamento', completed: true, completionJustification: 'Hugo e Thalita colaboraram ativamente no repositório, em processo de reestruturação com a chegada do ORKA.' },
      { text: 'Realizar 3 agendas de compartilhamento prático sobre o uso de agentes', completed: true, completionJustification: '12/08 → Guilda de Práticas de GenAI: Harness | 19/08 → Guilda de Práticas de GenAI: GSD na Prática | 26/08 → Guilda de Práticas de GenAI: Hive na Prática.' },
      { 
        text: 'Criar e documentar 5 novos patterns de prompt para uso do time', 
        completed: true,
        completionJustification: 'Criei skills voltadas à democratização de dados em fluxo ponta a ponta, contendo 13 skills. Além disso, apoiei na criação de um módulo de 18 skills de documentação e outro com 15 de design.'
      }
    ],
    relatedSkills: ['prompt-eng-sdd', 'agent-systems', 'comm-leadership'],
    relatedResources: ['llm-course'],
    phase: 'L2',
    unlockedRequirements: [
      { skillId: 'prompt-eng-sdd', requirementId: 'prompt-recipes', isNewUnlock: true, rationale: 'Criação de 43+ prompt recipes e patterns para o time' },
      { skillId: 'agent-systems', requirementId: 'agent-tool-building', isNewUnlock: true, rationale: 'Compartilhamento de práticas de ferramentas agênticas em guilda' }
    ]
  },
  {
    id: 'model-supply-chain',
    title: 'Segurança na Cadeia de Suprimentos de Modelos (Model Supply Chain)',
    displayName: 'SecMLOps: Model Supply Chain',
    description: 'Implementar controles de segurança no ciclo de vida de modelos de IA, garantindo a integridade, proveniência e o versionamento seguro dos artefatos.',
    status: 'in-progress',
    progress: 10,
    deadline: '2027-06-30',
    notes: 'KPI L2→L3: Fundamentos de SecMLOps e segurança no CI/CD de modelos. Estudo em andamento.',
    objectives: [
      { text: 'Estudar e aplicar o formato .safetensors para mitigar riscos de execução de código arbitrário.', completed: false },
      { text: 'Implementar assinatura e verificação de modelos (ex: hash SHA256) no pipeline de CI/CD para garantir a integridade.', completed: false },
      { text: 'Utilizar MLflow para rastrear a proveniência dos modelos, incluindo dados de treinamento e hiperparâmetros.', completed: false },
      { text: 'Implementar no padrão do banco (seguir diretrizes arquiteturais internas do Itaú para supply chain de modelos).', completed: false }
    ],
    relatedSkills: ['ai-security-redteam', 'ai-governance-compliance', 'platform-devops-mlops'],
    relatedResources: ['tool-safetensors', 'course-mlops-security', 'tool-mlflow-provenance'],
    phase: 'L2',
    unlockedRequirements: [
      { skillId: 'ai-security-redteam', requirementId: 'secmlops-supply-chain', isNewUnlock: true, rationale: 'Implementação de escaneamento de modelos e verificação de checksums' },
      { skillId: 'ai-governance-compliance', requirementId: 'llm-pii-privacy', isNewUnlock: true, rationale: 'Sanitização de PII em artefatos e prompts' },
      { skillId: 'platform-devops-mlops', requirementId: 'mlops-lifecycle', isNewUnlock: true, rationale: 'Pipelines CI/CD seguros para deploy e tracking' }
    ]
  },
  {
    id: 'autonomous-delivery',
    title: 'Entrega Autônoma de Features Complexas',
    displayName: 'Autonomous Delivery',
    description: 'Entregar 10+ features/bugfixes de forma autônoma com taxa de retrabalho < 20% e aprovação formal de qualidade.',
    status: 'completed',
    progress: 100,
    deadline: '2026-12-31',
    notes: 'KPI L2: Demonstração de autonomia técnica baseada em entregas core no Portal de Cyber. ADRs lideradas: frontend (Next.js webview), backend DDD (Lambda microsserviços + API Gateway), sistemas agênticos (MAS, MCP). Volume de acessos ao Cyber.Itaú em coleta — KPI de adoção por superintendentes e diretores.',
    objectives: [
      { text: 'Completar 5+ entregas em projetos críticos', completed: true, completionJustification: 'Entregues: Modelagem de dados Cyber Itaú, Modelagem de dados Cyber Itaú Agents, Frontend Cyber Itaú, Silent login quicksight Cyber Itaú, Gestão de Custos Cyber Itaú, e Métricas de Cyber Cyber Itaú.' },
      { text: 'Manter taxa de retrabalho in PRs abaixo de 20%', completed: true, completionJustification: 'Registrados apenas 3 PR reverts em DEV nos últimos 6 meses e 4 itens do tipo BUG nos últimos 12 meses, frente a mais de 100 PRs e dezenas de Histórias entregues no período.' },
      { text: 'Obter aprovação de qualidade em 100% das entregas (SonarQube, linters, testes)', completed: true, completionJustification: 'Estabelecidas green build guarantees no ciclo de desenvolvimento assistido por IA e cobertura mínima de 95% de testes nos projetos.' },
      { text: 'Feedback positivo de sênior sobre autonomia técnica documentado in 1:1', completed: true, completionJustification: 'Feedbacks formais na plataforma de performance 2025, feedbacks estruturados de Odair e Henrique, além de alinhamentos positivos com gestão direta.' }
    ],
    relatedSkills: ['web-frontend-arch', 'api-architecture-design', 'agent-systems'],
    relatedResources: ['architecture-reviews'],
    phase: 'L2',
    unlockedRequirements: [
      { skillId: 'web-frontend-arch', requirementId: 'web-microfrontends', isNewUnlock: true, rationale: 'Arquitetura de microfrontends no Portal de Cyber' },
      { skillId: 'api-architecture-design', requirementId: 'api-gateway-mgmt', isNewUnlock: true, rationale: 'Design DDD e gateway de microsserviços' }
    ]
  },
  {
    id: 'technical-discussions',
    title: 'Participação em Discussões Técnicas Estratégicas',
    displayName: 'Strategic Technical Discussions',
    description: 'Contribuir em 3+ discussões técnicas com propostas viáveis e impacto na tomada de decisão da squad. Inclui ADRs formais de arquitetura.',
    status: 'in-progress',
    progress: 70,
    deadline: '2027-03-31',
    notes: 'KPI L2: Influência técnica e proatividade. ADRs lideradas: Cyber.Itaú (frontend Next.js webview + backend DDD), Sistema de orquestração multi-agentes cross-account com orientação à intenção, construção de MCPs.',
    objectives: [
      { text: 'Participar ativamente de 3+ discussões arquiteturais ou de design', completed: true, completionJustification: 'Cyber.Itaú (frontend next webview + backend DDD), Sistema de orquestração de multi-agentes cross-account com orientação à intenção e construção de MCPs.' },
      { text: 'Propor 2+ soluções técnicas adotadas pela squad', completed: true, completionJustification: 'Cyber.Itaú: frontend Next.js webview + backend DDD lambda microsservices + API Gateway.' },
      { text: 'Documentar decisões técnicas e trade-offs para referência futura', completed: true, completionJustification: 'Registro em documentação e nos repositórios do Cyber.Itaú.' },
      { text: 'Feedback de pares sobre contribuição técnica positiva', completed: true, completionJustification: 'Consultado proativamente por pares sobre opiniões técnicas.' }
    ],
    relatedSkills: ['critical-thinking-problem-solving', 'strategic-vision-career', 'relational-influence-cnv'],
    relatedResources: [],
    phase: 'L2',
    unlockedRequirements: [
      { skillId: 'critical-thinking-problem-solving', requirementId: 'soft-tradeoff-analysis', isNewUnlock: true, rationale: 'Análise detalhada de tradeoffs em ADRs' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: true, rationale: 'Visão de arquitetura alinhada com as squads' },
      { skillId: 'relational-influence-cnv', requirementId: 'soft-influence-without-auth', isNewUnlock: true, rationale: 'Influência técnica e convencimento nas discussões' }
    ]
  },
  {
    id: 'mentoring-interns',
    title: 'Liderança de Onboarding e Desenvolvimento Técnico',
    displayName: 'Onboarding & Technical Mentoring',
    description: 'Liderar o onboarding técnico e suportar o desenvolvimento de 1+ novo membro da squad (estagiário, analista ou engenheiro) com acompanhamento estruturado e feedback construtivo.',
    status: 'planned',
    progress: 0,
    deadline: '2027-12-31',
    notes: 'KPI L2: Desenvolvimento de habilidades de mentoria e liderança situacional.',
    objectives: [
      { text: 'Acompanhar 1+ novo membro da squad em tarefas técnicas semanais', completed: false },
      { text: 'Fornecer feedback técnico construtivo em code reviews', completed: false },
      { text: 'Documentar plano de desenvolvimento para o novo membro', completed: false },
      { text: 'Feedback positivo sobre apoio técnico recebido', completed: false }
    ],
    relatedSkills: ['leadership-mentorship', 'relational-influence-cnv'],
    relatedResources: [],
    phase: 'L2',
    unlockedRequirements: [
      { skillId: 'leadership-mentorship', requirementId: 'soft-onboarding-lead', isNewUnlock: true, rationale: 'Estruturação e execução de onboarding técnico' },
      { skillId: 'leadership-mentorship', requirementId: 'soft-situational-lead', isNewUnlock: true, rationale: 'Aplicação de liderança situacional no dia a dia' },
      { skillId: 'relational-influence-cnv', requirementId: 'soft-constructive-feedback', isNewUnlock: true, rationale: 'Feedback contínuo em revisões de código' }
    ]
  },
  {
    id: 'cert-crtp',
    title: 'CRTP — Certified Red Team Professional',
    displayName: 'CRTP (Active Directory)',
    description: 'Obter certificação CRTP focada em Red Team para Active Directory. Fundação ofensiva para entender ataques antes de defesa.',
    status: 'planned',
    progress: 0,
    deadline: '2028-06-30',
    notes: 'L2→L3: Fundação técnica de segurança ofensiva. Iniciar após validação formal de transição L2→L3 (jun/2027). Investimento: US$ 249.',
    objectives: [
      { text: 'Completar labs práticos de Active Directory', completed: false },
      { text: 'Dominar Kerberoasting, AS-REP Roasting e movimento lateral', completed: false },
      { text: 'Praticar persistência AD (golden/silver ticket)', completed: false },
      { text: 'Aprovação no exame prático de 24h', completed: false }
    ],
    relatedSkills: ['offensive-sec-pentest', 'ai-security-redteam'],
    relatedResources: ['cert-crtp'],
    phase: 'L2',
    unlockedRequirements: [
      { skillId: 'offensive-sec-pentest', requirementId: 'crtp-ad-sec', isNewUnlock: true, rationale: 'Certificação prática de segurança ofensiva em Active Directory' },
      { skillId: 'offensive-sec-pentest', requirementId: 'crtp-kerberos-attacks', isNewUnlock: true, rationale: 'Exploração prática de Kerberoasting & AS-REP Roasting em laboratório' },
      { skillId: 'offensive-sec-pentest', requirementId: 'crtp-lateral-movement', isNewUnlock: true, rationale: 'Execução de movimentação lateral e Golden/Silver Tickets' },
      { skillId: 'ai-security-redteam', requirementId: 'mitre-atlas', isNewUnlock: false, rationale: 'TTPs de movimentação lateral e elevação de privilégio mapeados' }
    ]
  },

  // ==========================================
  // L3 (Mid / Pleno) — Ownership de features + OSCP + CPSA-F
  // Atividades de Senior devem ser demonstradas aqui para alcançar L4
  // ==========================================
  {
    id: 'ai-defense-architecture',
    title: 'Design de Arquitetura de Defesa em IA',
    displayName: 'AI Defense Architecture Design',
    description: 'Projetar e documentar arquitetura completa de defesa para sistemas de IA com guardrails, threat model e supply chain security.',
    status: 'planned',
    progress: 0,
    deadline: '2028-06-30',
    notes: 'KPI L3→L4: Design técnico aprovado por sênior em feature complexa. Construído sobre as evidências práticas do milestone agentic-security-cyber.',
    objectives: [
      { text: 'Projetar arquitetura de guardrails para LLMs cobrindo OWASP LLM Top 10', completed: false },
      { text: 'Documentar threat model com MITRE ATLAS mapeando 5+ TTPs relevantes', completed: false },
      { text: 'Implementar validação de supply chain (.safetensors + hash SHA256) no CI/CD', completed: false },
      { text: 'Apresentação técnica do design para squad + liderança (20+ pessoas)', completed: false }
    ],
    relatedSkills: ['ai-security-redteam', 'ai-governance-compliance', 'platform-devops-mlops', 'communication-storytelling'],
    relatedResources: ['ref-owasp-llm-top10', 'ref-mitre-atlas', 'course-bedrock-guardrails'],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'ai-security-redteam', requirementId: 'bedrock-guardrails', isNewUnlock: true, rationale: 'Arquitetura formal de guardrails para LLMs (OWASP LLM Top 10)' },
      { skillId: 'ai-security-redteam', requirementId: 'mitre-atlas', isNewUnlock: true, rationale: 'Threat model com 5+ TTPs MITRE ATLAS mapeados' },
      { skillId: 'ai-governance-compliance', requirementId: 'nist-ai-rmf', isNewUnlock: true, rationale: 'Alinhamento da arquitetura de defesa ao NIST AI RMF' },
      { skillId: 'communication-storytelling', requirementId: 'soft-executive-presentation', isNewUnlock: true, rationale: 'Apresentação técnica do design para squad e liderança' }
    ]
  },
  {
    id: 'governance-ai-pipelines',
    title: 'Governança de IA em Pipelines Core',
    displayName: 'AI Governance in Production',
    description: 'Aplicar governança de IA em 2+ projetos core com relatórios de conformidade automatizados.',
    status: 'planned',
    progress: 0,
    deadline: '2028-06-30',
    notes: 'KPI L3→L4: Ownership completo de projeto médio (>1 mês). Meta: 100% dos modelos em produção com proveniência registrada no MLflow.',
    objectives: [
      { text: 'Implementar governança em 2 pipelines/projetos core', completed: false },
      { text: 'Gerar relatórios de conformidade automatizados', completed: false },
      { text: 'Redução mensurável de débito técnico (-15%+ em métricas de qualidade)', completed: false },
      { text: 'KPI: 100% dos modelos em produção têm proveniência registrada', completed: false }
    ],
    relatedSkills: ['ai-governance-compliance', 'platform-devops-mlops', 'data-quality-observability'],
    relatedResources: ['ref-owasp-llm-top10', 'course-mlops-security', 'tool-mlflow-provenance'],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'ai-governance-compliance', requirementId: 'ai-auditing-hallucination', isNewUnlock: true, rationale: 'Relatórios automatizados de audit e conformidade de IA' },
      { skillId: 'platform-devops-mlops', requirementId: 'mlops-lifecycle', isNewUnlock: false, rationale: 'Tracking de modelos e proveniência MLflow em produção' },
      { skillId: 'data-quality-observability', requirementId: 'de-observability-alerts', isNewUnlock: true, rationale: 'Observabilidade de anomalias em pipelines core' }
    ]
  },
  {
    id: 'mentoring-juniors',
    title: 'Mentoria Ativa de Juniores',
    displayName: 'Junior Mentoring Program',
    description: 'Mentorar 2+ juniores com PDI estruturado, code reviews construtivos e acompanhamento de evolução.',
    status: 'planned',
    progress: 0,
    deadline: '2029-06-30',
    notes: 'KPI L3→L4: Mentoria ativa com PDI estruturado para 2+ juniores',
    objectives: [
      { text: 'Estruturar PDI para 2+ juniores com metas trimestrais', completed: false },
      { text: 'Realizar 10+ code reviews construtivos por trimestre', completed: false },
      { text: 'Feedback positivo dos mentorados sobre evolução técnica', completed: false },
      { text: 'KPI: 1+ mentorado promovido ou atingindo metas do PDI', completed: false }
    ],
    relatedSkills: ['mentoring', 'feedback', 'leadership', 'collaboration'],
    relatedResources: [],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'leadership-mentorship', requirementId: 'soft-tech-mentoring', isNewUnlock: false, rationale: 'Mentoria ativa com PDI estruturado para juniores' },
      { skillId: 'leadership-mentorship', requirementId: 'soft-situational-lead', isNewUnlock: true, rationale: 'Adaptação do estilo de liderança à maturidade dos liderados' },
      { skillId: 'relational-influence-cnv', requirementId: 'soft-constructive-feedback', isNewUnlock: true, rationale: 'Code reviews construtivos e feedback de evolução documentados' }
    ]
  },
  {
    id: 'pdi-structure-2026',
    title: 'Estruturação do PDI por Níveis',
    displayName: 'PDI L1-L7: Career Ladder',
    description: 'Estruturar o planejamento completo com níveis técnicos L1-L7, KPIs mensuráveis e trilha de certificações',
    status: 'in-progress',
    progress: 85,
    deadline: '2026-09-30',
    notes: 'KPI L3: Visão estratégica e planejamento de carreira. v2.2 em andamento — target_role unificado como AI Security Specialist, OSCP marcado como a_decidir, milestones aspiracionais L5-L7.',
    objectives: [
      { text: 'Definir todos os 7 níveis do roadmap (L1-L7) com KPIs claros', completed: true, completionJustification: 'Framework L1-L7 completo documentado em career-levels-framework.md com KPIs mensuráveis por nível.' },
      { text: 'Mapear 20+ referências de estudo em AI Security', completed: true, completionJustification: 'Trilha completa de certificações (CRTP, OSCP, CAISP, CMCPSE, CISSP, ISO 42001, AAISM) + livros e cursos mapeados em resources.' },
      { text: 'Criar visualização interativa do PDI no React', completed: true, completionJustification: 'Aplicação React completa com timeline L1-L7, milestones interativos, filtros por nível e KPIs visualizados.' },
      { text: 'Validar com Aline em 1:1 os marcos e KPIs', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'time-management', 'self-awareness', 'technical-docs'],
    relatedResources: [],
    phase: 'L2',
    unlockedRequirements: [
      { skillId: 'strategic-vision-career', requirementId: 'soft-career-laddering', isNewUnlock: true, rationale: 'Estruturação do plano de carreira por níveis L1-L7 e KPIs' },
      { skillId: 'adaptability-resilience', requirementId: 'soft-emotional-self-awareness', isNewUnlock: true, rationale: 'Análise crítica autoconsciente de gaps e pontos fortes' }
    ]
  },

  // ==========================================
  // L3 (Mid / Pleno)
  // ==========================================
  {
    id: 'agentic-security-cyber',
    title: 'Segurança do Ecossistema Agêntico do Cyber.Itaú',
    displayName: 'Agentic Security: Threat Model & Guardrails',
    description: 'Projetar e implementar segurança end-to-end no ecossistema de IA agêntica do Cyber.Itaú: threat model, guardrails, implementação em produção e coleta de métricas de segurança.',
    status: 'planned',
    progress: 0,
    deadline: '2027-06-30',
    notes: 'KPI L3: Implementação prática de controles de segurança para o sistema multi-agente (Insight Guard + MCP servers) em produção. Métrica de sucesso: P95 de latência do Insight Guard < 5s; 100% dos outputs com guardrail ativo.',
    objectives: [
      { text: 'Elaborar threat model completo do ecossistema agêntico (STRIDE + MITRE ATLAS, mínimo 5 TTPs mapeados)', completed: false },
      { text: 'Implementar guardrails no runtime do Insight Guard (AWS Bedrock Guardrails: PII detection, prompt injection, grounding)', completed: false },
      { text: 'Aplicar controles de supply chain nos modelos consumidos pelos agentes (.safetensors + hash SHA256 no CI/CD)', completed: false },
      { text: 'Coletar métricas de segurança em produção: latência P95, taxa de bloqueio de guardrails, alertas de anomalia', completed: false },
      { text: 'Apresentar relatório de segurança para a squad e liderança com evidências e recomendações', completed: false },
    ],
    relatedSkills: ['bedrock-guardrails', 'security', 'llm', 'mas', 'mcp-tools', 'sec-atlas', 'sec-nist'],
    relatedResources: ['ref-owasp-llm-top10', 'ref-mitre-atlas', 'course-bedrock-guardrails'],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'ai-security-redteam', requirementId: 'bedrock-guardrails', isNewUnlock: true, rationale: 'Implementação prática de guardrails no runtime do Insight Guard' },
      { skillId: 'ai-security-redteam', requirementId: 'agentic-threat-modeling', isNewUnlock: true, rationale: 'Threat model agêntico (STRIDE + MITRE ATLAS) em produção' },
      { skillId: 'ai-security-redteam', requirementId: 'mcp-security', isNewUnlock: true, rationale: 'Segurança end-to-end de servidores MCP e ferramentas' },
      { skillId: 'ai-governance-compliance', requirementId: 'nist-ai-rmf', isNewUnlock: false, rationale: 'Controles de segurança agêntica alinhados ao NIST AI RMF' }
    ]
  },
  {
    id: 'situational-leadership-development',
    title: 'Desenvolvimento de Liderança Situacional',
    displayName: 'Liderança Situacional: Teoria & Prática',
    description: 'Desenvolver habilidade de adaptar o estilo de liderança ao contexto e maturidade do liderado, passando de liderança centrada em controle para liderança adaptativa.',
    status: 'planned',
    progress: 0,
    deadline: '2027-12-31',
    notes: 'KPI L3: Gap identificado — Liderança level 4 mas Liderança Situacional level 2. Leitura + aplicação prática em code reviews e pair programming.',
    objectives: [
      { text: "Ler 'Leadership and the One Minute Manager' (Blanchard) e mapear os 4 estilos situacionais", completed: false },
      { text: 'Identificar o estilo dominante atual e os contextos onde ele falha', completed: false },
      { text: 'Praticar os 4 estilos em situações reais: pair programming (D1→S1), code review (D2→S2), delegação (D3→S3), autonomia (D4→S4)', completed: false },
      { text: 'Obter feedback de 2+ pares sobre flexibilidade de liderança em projetos multi-perfil', completed: false },
    ],
    relatedSkills: ['situational-leadership', 'mentoring', 'emotional-intelligence'],
    relatedResources: [],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'leadership-mentorship', requirementId: 'soft-situational-lead', isNewUnlock: true, rationale: 'Prática deliberada dos 4 estilos situacionais de liderança' },
      { skillId: 'leadership-mentorship', requirementId: 'soft-tech-mentoring', isNewUnlock: false, rationale: 'Ajuste do apoio técnico conforme maturidade do liderado' },
      { skillId: 'adaptability-resilience', requirementId: 'soft-emotional-self-awareness', isNewUnlock: false, rationale: 'Reconhecimento de sinais de maturidade e autorregulação' }
    ]
  },
  {
    id: 'finops-continuous',
    title: 'FinOps Contínuo e Cultura de Custo',
    displayName: 'FinOps Contínuo: Tagueamento, Anomalias e Rightsizing',
    description: 'Institucionalizar práticas de FinOps contínuo no projeto: tagueamento sistemático, detecção de anomalias de custo, análise mensal por recurso e propostas de rightsizing.',
    status: 'planned',
    progress: 0,
    deadline: '2027-12-31',
    notes: 'KPI L3: FinOps como cultura, não evento isolado. Já aplicado informalmente: tagueamento, revisão mensal de custos. Formalizar em processo documentado.',
    objectives: [
      { text: 'Documentar política de tagueamento de recursos AWS (cost center, squad, ambiente, projeto)', completed: false },
      { text: 'Configurar AWS Cost Anomaly Detection com alertas para a squad', completed: false },
      { text: 'Criar dashboard de FinOps no QuickSight ou CloudWatch: custo por recurso, tendências e alertas', completed: false },
      { text: 'Propor e implementar rightsizing automático para 2+ recursos (Lambda memory, Glue DPUs, ECS tasks)', completed: false },
      { text: 'Usar agente para análise automatizada de custos: identificar top 5 recursos mais caros mensalmente', completed: false },
    ],
    relatedSkills: ['finops', 'cost-optimization', 'cloudwatch', 'agent-design'],
    relatedResources: [],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'platform-devops-mlops', requirementId: 'finops-cost', isNewUnlock: false, rationale: 'FinOps institucionalizado como processo contínuo e rightsizing' },
      { skillId: 'aws-cloud-arch', requirementId: 'aws-cloudwatch', isNewUnlock: true, rationale: 'Dashboards de custo e alertas de anomalia no CloudWatch' },
      { skillId: 'agent-systems', requirementId: 'agent-tool-building', isNewUnlock: false, rationale: 'Agente autônomo para análise mensal de custos por recurso' }
    ]
  },
  {
    id: 'community-networking-sp',
    title: 'Comunidade Técnica e Networking em São Paulo',
    displayName: 'Community: Talks & Networking (SP)',
    description: 'Construir presença técnica externa através de participação em eventos de segurança e IA em São Paulo, publicação de artigos e networking com referências do mercado.',
    status: 'planned',
    progress: 0,
    deadline: '2028-12-31',
    notes: 'KPI L3→L4: Reconhecimento técnico externo. Foco em eventos presenciais em SP (BSides SP, OWASP São Paulo Chapter, AWS Community Day SP). Publicação de 2+ artigos/ano sobre projetos reais a partir de 2027.',
    objectives: [
      { text: 'Participar de 2+ eventos técnicos em SP em 2027 (BSides SP, OWASP SP Chapter, AWS Community Day SP)', completed: false },
      { text: "Submeter 1 talk em evento SP sobre 'Segurança em IA Agêntica no setor financeiro'", completed: false },
      { text: 'Publicar 2+ artigos técnicos (Medium/Dev.to) sobre projetos reais do Cyber.Itaú', completed: false },
      { text: 'Conectar-se com 10+ profissionais de AI Security/MLSecOps via LinkedIn com interação técnica real', completed: false },
    ],
    relatedSkills: ['presentation', 'storytelling', 'influence'],
    relatedResources: [],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'communication-storytelling', requirementId: 'soft-executive-presentation', isNewUnlock: true, rationale: 'Talk técnico em eventos externos da comunidade de SP' },
      { skillId: 'communication-storytelling', requirementId: 'soft-data-storytelling', isNewUnlock: false, rationale: 'Artigos técnicos estruturados sobre cases do Cyber.Itaú' },
      { skillId: 'relational-influence-cnv', requirementId: 'soft-community-networking', isNewUnlock: true, rationale: 'Networking ativo e presença executiva na comunidade de SP' }
    ]
  },
  {
    id: 'ai-defense-foundations',
    title: 'Fundamentos de Defesa e Guardrails em IA',
    displayName: 'SecMLOps: Defesa & Guardrails',
    description: 'Implementar mitigação contra ameaças (OWASP LLM Top 10) no runtime utilizando guardrails (ex: AWS Bedrock Guardrails) e entender ataques adversários através do MITRE ATLAS.',
    status: 'planned',
    progress: 0,
    deadline: '2028-06-30',
    notes: 'KPI L3: Implementação prática de controles de segurança para sistemas baseados em LLMs',
    objectives: [
      { text: 'Estudar mitigações do OWASP LLM Top 10 aplicadas ao contexto do banco.', completed: false },
      { text: 'Implementar e configurar AWS Bedrock Guardrails em uma aplicação piloto.', completed: false },
      { text: 'Realizar mapeamento de ameaças focado em Adversarial ML utilizando a base do MITRE ATLAS.', completed: false }
    ],
    relatedSkills: ['aws-bedrock', 'bedrock-guardrails', 'security'],
    relatedResources: ['ref-owasp-llm-top10', 'course-bedrock-guardrails', 'ref-mitre-atlas'],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'ai-security-redteam', requirementId: 'bedrock-guardrails', isNewUnlock: true, rationale: 'Configuração prática de AWS Bedrock Guardrails contra OWASP Top 10' },
      { skillId: 'ai-security-redteam', requirementId: 'mitre-atlas', isNewUnlock: true, rationale: 'Mapeamento de ameaças adversariais baseado no MITRE ATLAS' },
      { skillId: 'ai-security-redteam', requirementId: 'prompt-injection', isNewUnlock: true, rationale: 'Controles de mitigação contra prompt injection e jailbreaks' }
    ]
  },
  {
    id: 'cert-oscp',
    title: 'OSCP — PEN-200 (OffSec)',
    displayName: 'OSCP (Pentest) — A Decidir',
    description: 'Selo ofensivo mais reconhecido do mercado. Valida capacidade de encontrar e explorar vulnerabilidades de forma autônoma.',
    status: 'planned',
    progress: 0,
    deadline: null,
    optional: true,
    decision_status: 'a_decidir',
    notes: 'A DECIDIR após conclusão do CRTP. Estimativa real de esforço: 300-600h de lab prático para quem não tem base ofensiva prévia. Investimento: ~US$ 1.500+. Reavaliar em 2028: se o CRTP mostrar apetite real pela trilha ofensiva e o calendário L3 permitir, incluir; caso contrário, espinha dorsal é AI Security + governança.',
    objectives: [
      { text: 'Concluir labs PEN-200 (Web, Linux privesc, Windows privesc, AD)', completed: false },
      { text: 'Realizar 3+ simulados com 70%+ de aproveitamento', completed: false },
      { text: 'Aprovação no exame prático de 24h + relatório', completed: false }
    ],
    relatedSkills: ['security', 'critical-thinking', 'python', 'bash'],
    relatedResources: ['cert-oscp'],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'offensive-sec-pentest', requirementId: 'oscp-pentest', isNewUnlock: true, rationale: 'Certificação prática e metodologia completa de pentest OffSec' },
      { skillId: 'offensive-sec-pentest', requirementId: 'oscp-web-exploitation', isNewUnlock: true, rationale: 'Domínio de exploração web avançada e OWASP Top 10 nos labs PEN-200' },
      { skillId: 'offensive-sec-pentest', requirementId: 'oscp-privilege-escalation', isNewUnlock: true, rationale: 'Elevação de privilégios em sistemas Windows e Linux em exame de 24h' },
      { skillId: 'critical-thinking-problem-solving', requirementId: 'soft-complex-solving', isNewUnlock: true, rationale: 'Resolução de desafios complexos de exploração e privilégios' },
      { skillId: 'adaptability-resilience', requirementId: 'soft-resilience-pressure', isNewUnlock: true, rationale: 'Mentalidade try harder e resiliência em exame de 24 horas' }
    ]
  },
  {
    id: 'cert-awssaa',
    title: 'AWS Solutions Architect — Associate',
    displayName: 'AWS SA Associate (Opcional)',
    description: 'Certificação intermediária de arquitetura AWS. Ponte entre fundacional (Cloud Practitioner) e avançado (SA Professional).',
    status: 'planned',
    progress: 0,
    deadline: '2028-06-30',
    optional: true,
    notes: 'OPCIONAL: Considerar somente se sentir necessidade de formalização antes do SAP. ATENÇÃO: sem o SAA consolidado, o preparo para o SAP exige esforço adicional significativo. Investimento: US$ 150.',
    objectives: [
      { text: 'Estudar design de arquiteturas resilientes e de alta performance', completed: false },
      { text: 'Dominar serviços core: EC2, S3, VPC, RDS, Lambda, IAM', completed: false },
      { text: 'Realizar 3+ simulados com 75%+ de aproveitamento', completed: false },
      { text: 'Aprovação no exame', completed: false }
    ],
    relatedSkills: ['aws', 'api-architecture', 'iam', 'vpc', 'lambda', 's3'],
    relatedResources: ['cert-awssaa'],
    phase: 'L3',
    unlockedRequirements: [
      { skillId: 'aws-cloud-arch', requirementId: 'aws-isaqb-arch', isNewUnlock: true, rationale: 'Validação formal de arquiteturas resilientes e de alta performance na AWS' },
      { skillId: 'aws-cloud-arch', requirementId: 'aws-vpc', isNewUnlock: true, rationale: 'Design detalhado de redes privadas, subnets e security groups' }
    ]
  },

  // ==========================================
  // L4 (Senior / Sênior) — Arquitetura cross-squad + Liderança Técnica + Impacto
  // Atividades de Staff devem ser demonstradas aqui para alcançar L5
  // ==========================================
  {
    id: 'corporate-architecture-design',
    title: 'Arquitetura Corporativa de AI Security',
    displayName: 'Corporate AI Security Architecture',
    description: 'Projetar do zero arquitetura corporativa de validação de segurança/custos de IA, aprovada pela liderança e adotada cross-squad.',
    status: 'planned',
    progress: 0,
    deadline: '2030-06-30',
    notes: 'KPI L4→L5: 2+ sistemas complexos em produção com adoção cross-squad',
    objectives: [
      { text: 'Projetar arquitetura corporativa aprovada pela liderança', completed: false },
      { text: 'Colocar arquitetura em produção com métricas de adoção', completed: false },
      { text: 'KPI: -30%+ custo OU +40%+ performance em sistemas impactados', completed: false },
      { text: 'Adoção por 2+ squads fora do time original', completed: false }
    ],
    relatedSkills: ['api-architecture', 'mlops', 'strategic-vision', 'technical-docs'],
    relatedResources: ['books-arch-peaa', 'books-ana-ddia'],
    phase: 'L4',
    unlockedRequirements: [
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: true, rationale: 'Arquitetura corporativa de AI Security alinhada a objetivos estratégicos' },
      { skillId: 'leadership-mentorship', requirementId: 'soft-stakeholder-mgmt', isNewUnlock: true, rationale: 'Gestão e aprovação de arquitetura corporativa com executivos' },
      { skillId: 'ai-governance-compliance', requirementId: 'nist-ai-rmf', isNewUnlock: true, rationale: 'Padronização corporativa alinhada ao framework NIST AI RMF' }
    ]
  },
  {
    id: 'tech-leadership-critical',
    title: 'Liderança Técnica de Projetos Críticos',
    displayName: 'Tech Lead — Critical Projects',
    description: 'Liderar tecnicamente 3+ projetos críticos end-to-end com 5+ pessoas, mentorando plenos e juniores durante a execução.',
    status: 'planned',
    progress: 0,
    deadline: '2030-12-31',
    notes: 'KPI L4→L5: Liderança técnica + mentoria estratégica',
    objectives: [
      { text: 'Liderança técnica end-to-end de 3+ projetos críticos', completed: false },
      { text: 'Mentorar 3+ plenos com acompanhamento documentado', completed: false },
      { text: 'Influência arquitetural: 5+ decisões técnicas adotadas por múltiplas squads', completed: false },
      { text: 'Feedback de pares e liderança reconhecendo autoridade técnica', completed: false }
    ],
    relatedSkills: ['leadership', 'mentoring', 'stakeholder-management', 'technical-docs'],
    relatedResources: [],
    phase: 'L4',
    unlockedRequirements: [
      { skillId: 'leadership-mentorship', requirementId: 'soft-tech-mentoring', isNewUnlock: true, rationale: 'Liderança técnica e mentoria estruturada de engenheiros plenos' },
      { skillId: 'leadership-mentorship', requirementId: 'soft-situational-lead', isNewUnlock: false, rationale: 'Liderança adaptativa em equipes multidisciplinares complexas' },
      { skillId: 'leadership-mentorship', requirementId: 'soft-stakeholder-mgmt', isNewUnlock: false, rationale: 'Alinhamento contínuo de expectativas com múltiplos stakeholders' }
    ]
  },
  {
    id: 'red-teaming-foundation',
    title: 'Red Teaming Tático em IA',
    displayName: 'Adversarial ML & Red Teaming',
    description: 'Projetar framework tático de Red Teaming em IA (Adversarial ML, evasão, extração de modelo) adaptado ao Itaú.',
    status: 'planned',
    progress: 0,
    deadline: '2030-12-31',
    notes: 'KPI L4→L5: Framework tático testado internamente',
    objectives: [
      { text: 'Projetar framework de Red Teaming para AI adaptado ao contexto do banco', completed: false },
      { text: 'Testar e mitigar métodos de evasão/inversão em modelos em produção', completed: false },
      { text: 'Documentar playbook com casos reais do banco', completed: false },
      { text: '2+ palestras técnicas (BSides, H2HC, ROADSEC) sobre resultados', completed: false }
    ],
    relatedSkills: ['security', 'mlops', 'critical-thinking', 'presentation'],
    relatedResources: ['books-sec-practical-llm-security', 'ref-mitre-atlas', 'course-adversarial-ml'],
    phase: 'L4',
    unlockedRequirements: [
      { skillId: 'ai-security-redteam', requirementId: 'adversarial-redteam', isNewUnlock: true, rationale: 'Desenvolvimento de framework de Red Teaming adversariais para IA' },
      { skillId: 'ai-security-redteam', requirementId: 'mitre-atlas', isNewUnlock: false, rationale: 'Aplicações práticas de TTPs MITRE ATLAS em simulações ofensivas' },
      { skillId: 'platform-devops-mlops', requirementId: 'mlops-lifecycle', isNewUnlock: false, rationale: 'Integração de testes adversariais no ciclo DevSecMLOps' }
    ]
  },
  {
    id: 'cert-caisp',
    title: 'CAISP — Certified AI Security Professional',
    displayName: 'CAISP (AI Security)',
    description: 'Certificação mais rigorosa do mercado em AI Security. 40+ labs, exame prático 6h contra sistemas vulneráveis.',
    status: 'planned',
    progress: 0,
    deadline: '2030-06-30',
    notes: 'KPI L4→L5: Especialização formal em AI Security. Pré-requisito recomendado: CRTP + experiência prática com guardrails. Investimento: US$ 999.',
    objectives: [
      { text: 'Concluir 40+ labs práticos (OWASP LLM Top 10, MITRE ATLAS)', completed: false },
      { text: 'Dominar threat modeling de IA com STRIDE', completed: false },
      { text: 'Aprovação no exame: 5 desafios práticos em 6h + relatório', completed: false }
    ],
    relatedSkills: ['security', 'llm', 'prompt-engineering', 'mlops'],
    relatedResources: ['cert-caisp'],
    phase: 'L4',
    unlockedRequirements: [
      { skillId: 'ai-security-redteam', requirementId: 'caisp-practical-labs', isNewUnlock: true, rationale: 'Análise e exploração avançada em 40+ laboratórios práticos de AI Security' },
      { skillId: 'ai-security-redteam', requirementId: 'adversarial-redteam', isNewUnlock: true, rationale: 'Domínio prático avançado de Red Teaming em modelos generativos' },
      { skillId: 'ai-security-redteam', requirementId: 'data-poisoning-ml', isNewUnlock: true, rationale: 'Mitigação de ataques de contaminação de dados (data poisoning)' },
      { skillId: 'ai-security-redteam', requirementId: 'rag-poisoning-sec', isNewUnlock: true, rationale: 'Proteção contra vector injection e manipulação em bases RAG' },
      { skillId: 'ai-security-redteam', requirementId: 'mitre-atlas', isNewUnlock: false, rationale: 'Exame prático validando mitigação de TTPs MITRE ATLAS' },
      { skillId: 'ai-governance-compliance', requirementId: 'nist-ai-rmf', isNewUnlock: true, rationale: 'Alinhamento completo aos frameworks internacionais NIST e ISO' }
    ]
  },
  {
    id: 'cert-cmcpse',
    title: 'CMCPSE — Certified MCP Security Expert',
    displayName: 'CMCPSE (MCP Security) — Opcional',
    description: 'Única certificação do mercado focada em segurança de servidores MCP e IA agêntica.',
    status: 'planned',
    progress: 0,
    deadline: '2030-12-31',
    optional: true,
    notes: 'OPCIONAL: Diferencial em segurança de agentes MCP. Avaliar disponibilidade do bundle com CAISP. Recomendado dado o contexto de atuação com MCP servers no Cyber.Itaú.',
    objectives: [
      { text: 'Threat modeling de arquiteturas MCP com STRIDE e MITRE ATLAS', completed: false },
      { text: 'Dominar tool poisoning, prompt injection em agentes, rug-pull attacks', completed: false },
      { text: 'Aprovação no exame prático', completed: false }
    ],
    relatedSkills: ['security', 'agent-design', 'mcp-tools', 'langgraph'],
    relatedResources: ['cert-cmcpse'],
    phase: 'L4',
    unlockedRequirements: [
      { skillId: 'ai-security-redteam', requirementId: 'mcp-security', isNewUnlock: true, rationale: 'Certificação especialista em segurança de protocolo e ferramentas MCP' },
      { skillId: 'ai-security-redteam', requirementId: 'mcp-tool-poisoning', isNewUnlock: true, rationale: 'Mitigação de tool poisoning e rug-pull em ecossistemas de agentes' },
      { skillId: 'ai-security-redteam', requirementId: 'agent-sandbox-sec', isNewUnlock: true, rationale: 'Arquitetura de isolamento e sandboxing seguro para execução agêntica' },
      { skillId: 'ai-security-redteam', requirementId: 'agentic-threat-modeling', isNewUnlock: true, rationale: 'Threat modeling avançado contra tool poisoning e rug-pull attacks' },
      { skillId: 'agent-systems', requirementId: 'agent-mcp', isNewUnlock: false, rationale: 'Hardening de servidores e integrações MCP agênticas em produção' }
    ]
  },
  {
    id: 'cert-awssap',
    title: 'AWS Solutions Architect — Professional',
    displayName: 'AWS SA Pro',
    description: 'Formalizar conhecimento em nível de arquitetura cloud. Sinergia direta com design de sistemas de IA seguros na AWS.',
    status: 'planned',
    progress: 0,
    deadline: '2030-06-30',
    notes: 'KPI L4: Certificação de arquitetura cloud avançada. Sinergia com uso diário de Glue, S3, Athena, EMR, Lambda, ECS no Itaú. Investimento: US$ 300.',
    objectives: [
      { text: 'Estudar design de soluções multi-conta e HA', completed: false },
      { text: 'Realizar 5+ simulados com 80%+ de aproveitamento', completed: false },
      { text: 'Aprovação no exame', completed: false }
    ],
    relatedSkills: ['aws', 'api-architecture', 'iam', 'vpc', 'lambda', 'ecs'],
    relatedResources: ['cert-awssap'],
    phase: 'L4',
    unlockedRequirements: [
      { skillId: 'aws-cloud-arch', requirementId: 'aws-isaqb-arch', isNewUnlock: true, rationale: 'Certificação AWS SA Professional cobrindo arquiteturas complexas' },
      { skillId: 'aws-cloud-arch', requirementId: 'aws-sap-multi-account', isNewUnlock: true, rationale: 'Design de Landing Zones e governança multi-conta corporativa' },
      { skillId: 'aws-cloud-arch', requirementId: 'aws-sap-disaster-recovery', isNewUnlock: true, rationale: 'Desenvolvimento de estratégias de HA e Disaster Recovery resilientes' },
      { skillId: 'aws-cloud-arch', requirementId: 'aws-sap-migration', isNewUnlock: true, rationale: 'Planejamento e execução de migração e modernização de aplicações' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: false, rationale: 'Decisões arquiteturais de impacto organizacional e alta escala' },
      { skillId: 'platform-devops-mlops', requirementId: 'finops-cost', isNewUnlock: false, rationale: 'Otimização de custo e performance em infraestruturas cloud enterprise' }
    ]
  },

  // ==========================================
  // L5 (Staff / Specialist 1) — Framework Corporativo + CISSP
  // ==========================================
  {
    id: 'cloud-security-certification',
    title: 'CISSP — Certified Information Systems Security Professional',
    displayName: 'CISSP (ISC2)',
    description: 'Certificação abrangente em segurança: 8 domínios incluindo NIST AI RMF, ISO 42001 e EU AI Act. Pré-requisito para AAISM.',
    status: 'planned',
    progress: 0,
    deadline: '2031-06-30',
    notes: 'ISC2 · 8 domínios CBK · Exige 5 anos de experiência comprovada. Validar elegibilidade com ISC2: experiência conta a partir de 2023. Investimento: US$ 749.',
    horizon_type: 'aspirational',
    objectives: [
      { text: 'Estudar os 8 domínios do CBK (Security & Risk, Architecture, IAM, etc.)', completed: false },
      { text: 'Concluir curso preparatório oficial (100h+)', completed: false },
      { text: 'Realizar simulados com 85%+ de aproveitamento', completed: false },
      { text: 'Aprovação no exame CISSP', completed: false }
    ],
    relatedSkills: ['security', 'aws', 'iam', 'vpc', 'critical-thinking'],
    relatedResources: ['cert-cissp'],
    phase: 'L5',
    unlockedRequirements: [
      { skillId: 'offensive-sec-pentest', requirementId: 'cissp-domains', isNewUnlock: true, rationale: 'Domínio formal dos 8 domínios de segurança da informação do CBK' },
      { skillId: 'offensive-sec-pentest', requirementId: 'cissp-risk-mgmt', isNewUnlock: true, rationale: 'Gestão de riscos corporativos e governança de segurança da informação' },
      { skillId: 'offensive-sec-pentest', requirementId: 'cissp-network-sec', isNewUnlock: true, rationale: 'Engenharia e arquitetura de redes enterprise altamente seguras' },
      { skillId: 'offensive-sec-pentest', requirementId: 'cissp-identity-access', isNewUnlock: true, rationale: 'Controle de acesso, federação e gestão de identidades' },
      { skillId: 'ai-governance-compliance', requirementId: 'nist-ai-rmf', isNewUnlock: false, rationale: 'Gestão de risco corporativo integrando frameworks de segurança e IA' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: false, rationale: 'Visão de segurança cibernética integrada à estratégia do negócio' }
    ]
  },
  {
    id: 'architectural-influence',
    title: 'Influência Arquitetural Multi-Squad',
    displayName: 'Cross-Squad Architecture Influence',
    description: 'Definir framework/plataforma corporativa adotada por 5+ squads. Tornar-se referência de domínio em AI Security.',
    status: 'planned',
    progress: 0,
    deadline: '2031-12-31',
    notes: 'KPI L5: Framework corporativo + impacto -40%+ tempo de entrega',
    horizon_type: 'aspirational',
    objectives: [
      { text: 'Projetar e implantar framework de AI Security adotado por 5+ squads', completed: false },
      { text: 'Propor 3+ padrões adotados por outras squads', completed: false },
      { text: 'Realizar 3+ palestras técnicas (BSides, H2HC, ROADSEC)', completed: false },
      { text: 'Impacto em 3+ diretorias documentado com métricas', completed: false }
    ],
    relatedSkills: ['influence', 'leadership', 'api-architecture', 'stakeholder-management'],
    relatedResources: [],
    phase: 'L5',
    unlockedRequirements: [
      { skillId: 'relational-influence-cnv', requirementId: 'soft-influence-without-auth', isNewUnlock: true, rationale: 'Adoção voluntária de padrões arquiteturais por 5+ squads' },
      { skillId: 'leadership-mentorship', requirementId: 'soft-stakeholder-mgmt', isNewUnlock: false, rationale: 'Alinhamento técnico e de valor em múltiplos domínios organizacionais' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: false, rationale: 'Impacto estratégico medido e documentado em 3+ diretorias' }
    ]
  },

  // ==========================================
  // L6 (Principal / Specialist 2) — Impacto Executivo e Governança Larga
  // ==========================================
  {
    id: 'red-teaming-framework',
    title: 'Red Teaming AI Framework Oficial',
    displayName: 'Adversarial ML & Red Teaming (Corporate)',
    description: 'Tornar o framework tático de Red Teaming em IA o padrão corporativo oficial aprovado pela liderança executiva.',
    status: 'planned',
    progress: 0,
    deadline: '2032-06-30',
    notes: 'KPI L6: Impacto executivo e adoção por 10+ squads',
    horizon_type: 'aspirational',
    objectives: [
      { text: 'Apresentar framework para C-level e obter aprovação estratégica', completed: false },
      { text: 'Adotar framework em 10+ squads', completed: false },
      { text: 'Liderar comunidade técnica interna com 100+ membros ativos', completed: false },
      { text: 'Impacto organizacional amplo documentado para PRAD', completed: false }
    ],
    relatedSkills: ['security', 'mlops', 'critical-thinking', 'strategic-vision'],
    relatedResources: ['books-sec-practical-llm-security', 'ref-mitre-atlas', 'course-adversarial-ml'],
    phase: 'L6',
    unlockedRequirements: [
      { skillId: 'relational-influence-cnv', requirementId: 'soft-influence-without-auth', isNewUnlock: false, rationale: 'Institucionalização do framework de Red Team aprovado pelo C-level' },
      { skillId: 'ai-security-redteam', requirementId: 'adversarial-redteam', isNewUnlock: false, rationale: 'Padrão oficial corporativo de testes adversariais em modelos' }
    ]
  },
  {
    id: 'nist-ai-rmf-implementation',
    title: 'NIST AI RMF Corporate Implementation',
    displayName: 'NIST AI RMF Framework',
    description: 'Liderar adequação arquitetural baseada no NIST AI RMF, transformando no padrão oficial de mitigação e compliance de IA.',
    status: 'planned',
    progress: 0,
    deadline: '2033-06-30',
    notes: 'KPI L6: Influência normativa e compliance',
    horizon_type: 'aspirational',
    objectives: [
      { text: 'Liderar adequação arquitetural corporativa NIST AI RMF', completed: false },
      { text: 'Ditar diretrizes arquiteturais estratégicas adotadas', completed: false },
      { text: 'Participação ativa em grupos de trabalho (OWASP, NIST)', completed: false },
      { text: 'Impacto reconhecido pela diretoria executiva', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'influence', 'security', 'stakeholder-management'],
    relatedResources: ['ref-nist-ai-rmf', 'books-sec-ai-risk'],
    phase: 'L6',
    unlockedRequirements: [
      { skillId: 'ai-governance-compliance', requirementId: 'nist-ai-rmf', isNewUnlock: true, rationale: 'Liderança da adequação arquitetural corporativa ao NIST AI RMF' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: false, rationale: 'Diretrizes normativas de IA alinhadas à governança executiva' }
    ]
  },
  {
    id: 'advanced-governance',
    title: 'Governança Corporativa e Avançada de IA',
    displayName: 'SecMLOps: Advanced Governance',
    description: 'Estabelecer a governança corporativa de IA e o score de maturidade em segurança de IA utilizando as diretrizes avançadas e as políticas arquiteturais baseadas no NIST AI RMF.',
    status: 'planned',
    progress: 0,
    deadline: '2033-12-31',
    notes: 'KPI L6: Governança regulatória de alto nível no ecossistema do banco',
    horizon_type: 'aspirational',
    objectives: [
      { text: 'Definir as políticas arquiteturais e diretrizes de IA corporativa.', completed: false },
      { text: 'Implementar a métrica de score de maturidade em segurança de IA para todos os squads.', completed: false }
    ],
    relatedSkills: ['influence', 'strategic-vision'],
    relatedResources: ['ref-nist-ai-rmf', 'books-sec-ai-risk'],
    phase: 'L6',
    unlockedRequirements: [
      { skillId: 'ai-governance-compliance', requirementId: 'executive-ai-governance', isNewUnlock: true, rationale: 'Definição de políticas e score corporativo de maturidade em segurança de IA' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: false, rationale: 'Governança regulatória de alto nível no ecossistema do banco' }
    ]
  },
  {
    id: 'cert-iso42001',
    title: 'ISO/IEC 42001 Lead Implementer',
    displayName: 'ISO 42001 (Governança IA) — Opcional',
    description: 'Obter certificação na 1ª norma internacional de sistemas de gestão de IA. Essencial para compliance em instituições financeiras.',
    status: 'planned',
    progress: 0,
    deadline: '2032-06-30',
    optional: true,
    horizon_type: 'aspirational',
    notes: 'OPCIONAL (alta relevância): Avaliar em 2030. Pode se tornar exigência regulatória para bancos — monitorar evolução do Banco Central. Investimento: US$ 1.500-2.000.',
    objectives: [
      { text: 'Compreender contexto organizacional e política de IA', completed: false },
      { text: 'Estudar estrutura do AIMS e ciclo de vida de sistemas de IA', completed: false },
      { text: 'Aprovação no exame oficial', completed: false }
    ],
    relatedSkills: ['security', 'strategic-vision'],
    relatedResources: ['cert-iso42001'],
    phase: 'L6',
    unlockedRequirements: [
      { skillId: 'ai-governance-compliance', requirementId: 'iso-42001', isNewUnlock: true, rationale: 'Certificação Lead Implementer na norma ISO/IEC 42001 para AIMS' },
      { skillId: 'ai-governance-compliance', requirementId: 'eu-ai-act-compliance', isNewUnlock: true, rationale: 'Implementação de sistemas de gestão alinhados à regulamentação do EU AI Act' },
      { skillId: 'ai-governance-compliance', requirementId: 'ai-lifecycle-governance', isNewUnlock: true, rationale: 'Estabelecimento da governança de ciclo de vida completo em modelos de IA' },
      { skillId: 'strategic-vision-career', requirementId: 'soft-strategic-alignment', isNewUnlock: false, rationale: 'Conformidade internacional de gestão de inteligência artificial' }
    ]
  },
  {
    id: 'cert-cpsaa',
    title: 'iSAQB CPSA-A — Advanced Level',
    displayName: 'iSAQB CPSA-A (Arquitetura) — A Decidir',
    description: 'Certificação arquitetural avançada com módulos modulares em tecnologia, metodologia e comunicação.',
    status: 'planned',
    progress: 0,
    deadline: '2033-12-31',
    optional: true,
    decision_status: 'a_decidir',
    horizon_type: 'aspirational',
    notes: 'A DECIDIR: Custo elevado (€3.000-5.000 + 70 créditos em treinos modulares). Reavaliar em 2031 após CISSP. Verificar ROI real vs. experiência prática em arquitetura. Exige CPSA-F + 3 anos de experiência.',
    objectives: [
      { text: 'Acumular créditos nos módulos metodológicos', completed: false },
      { text: 'Acumular créditos nos módulos tecnológicos e de comunicação', completed: false },
      { text: 'Aprovação no trabalho final CPSA-A', completed: false }
    ],
    relatedSkills: ['api-architecture', 'influence', 'technical-docs'],
    relatedResources: ['cert-cpsaa'],
    phase: 'L6',
    unlockedRequirements: [
      { skillId: 'aws-cloud-arch', requirementId: 'aws-isaqb-arch', isNewUnlock: true, rationale: 'Certificação arquitetural iSAQB CPSA-A em nível avançado' },
      { skillId: 'aws-cloud-arch', requirementId: 'isaqb-cpsaa-methodology', isNewUnlock: true, rationale: 'Aplicação de metodologias e padrões avançados de avaliação arquitetural' },
      { skillId: 'aws-cloud-arch', requirementId: 'isaqb-cpsaa-communication', isNewUnlock: true, rationale: 'Comunicação e documentação formal de arquiteturas para executivos' },
      { skillId: 'communication-storytelling', requirementId: 'soft-executive-presentation', isNewUnlock: false, rationale: 'Módulo de comunicação e argumentação técnica para executivos' }
    ]
  },

  // ==========================================
  // L7 (Distinguished / Specialist 3)
  // ==========================================
  {
    id: 'executive-presence',
    title: 'Impacto Executivo e Padrões Globais',
    displayName: 'Executive Presence & Standards',
    description: 'Consolidar reconhecimento como referência técnica global através de impacto executivo e influência em frameworks de mercado.',
    status: 'planned',
    progress: 0,
    deadline: '2033-06-30',
    notes: 'KPI L7: Inovação e reconhecimento internacional',
    horizon_type: 'aspirational',
    objectives: [
      { text: 'Realizar 3+ apresentações executivas/técnicas para C-level', completed: false },
      { text: 'Participar como autor em RFC, NIST guidance ou OWASP lead', completed: false },
      { text: 'Estabelecer presença externa (palestras em Black Hat, DEF CON)', completed: false },
      { text: 'Impacto corporativo transformador documentado no Itaú', completed: false }
    ],
    relatedSkills: ['presentation', 'influence', 'strategic-vision', 'storytelling'],
    relatedResources: [],
    phase: 'L7',
    unlockedRequirements: [
      { skillId: 'relational-influence-cnv', requirementId: 'soft-community-networking', isNewUnlock: true, rationale: 'Presença e palestrante em eventos globais como Black Hat e DEF CON' },
      { skillId: 'communication-storytelling', requirementId: 'soft-executive-presentation', isNewUnlock: false, rationale: 'Apresentações estratégicas e de alto impacto para C-level' }
    ]
  },
  {
    id: 'cert-aaism',
    title: 'ISACA AAISM — Advanced in AI Security Management',
    displayName: 'ISACA AAISM (Expert)',
    description: 'Credencial gated de elite para líderes de segurança em IA. Mapeia diretamente para NIST AI RMF, ISO 42001 e MITRE ATLAS.',
    status: 'planned',
    progress: 0,
    deadline: '2034-06-30',
    horizon_type: 'aspirational',
    notes: 'ISACA · Pré-requisito: CISSP ativo · 90 questões. Disponível somente após CISSP (2031). Investimento: US$ 760.',
    objectives: [
      { text: 'Estudar governança de programa de AI security corporativo', completed: false },
      { text: 'Compreender gestão de risco integrada de múltiplos frameworks', completed: false },
      { text: 'Aprovação no exame oficial', completed: false }
    ],
    relatedSkills: ['security', 'strategic-vision', 'leadership'],
    relatedResources: ['cert-aaism'],
    phase: 'L7',
    blockedBy: 'CISSP (ISC2) — obter e manter certificação ativa como pré-requisito',
    unlockedRequirements: [
      { skillId: 'ai-governance-compliance', requirementId: 'isaca-aaism-program', isNewUnlock: true, rationale: 'Certificação de elite ISACA AAISM em gestão avançada de AI Security' },
      { skillId: 'ai-governance-compliance', requirementId: 'executive-ai-governance', isNewUnlock: true, rationale: 'Certificação de elite ISACA AAISM em governança e gestão de AI Security' },
      { skillId: 'ai-governance-compliance', requirementId: 'bias-fairness-audit', isNewUnlock: true, rationale: 'Auditoria algorítmica executiva para imparcialidade e viés em produção' },
      { skillId: 'ai-security-redteam', requirementId: 'agentic-threat-modeling', isNewUnlock: false, rationale: 'Gestão integrada de riscos cobrindo múltiplos frameworks regulatórios' }
    ]
  },
];

export const projects: Project[] = [
  {
    id: 'cyberitau',
    title: 'Portal de Cyber',
    description: 'Portal para centralização de todas as jornadas de Cyber Security do Itaú Unibanco.',
    status: 'in-progress',
    impact: 'Centralização das jornadas de segurança da informação em um único portal disponível para todo o banco.',
    technologies: ['HTML/CSS', 'JavaScript', 'Sass', 'AWS', 'Terraform', 'Angular', 'CloudFront', 'Datadog', 'Microfrontends'],
    relatedSkills: ['html-css', 'javascript', 'typescript', 'angular', 'cloudfront', 'microfrontends', 'terraform', 'data-observability', 'technical-docs', 'testes-automatizados', 'testes-unitarios', 'linters', 'sonarqube', 'sass', 'datadog', 'aws'],
    relatedMilestones: ['lead-projects', 'workshops-talks'],
    relatedResources: ['books-arch-peaa', 'cert-security'],
    url: 'https://cyber.itau',
    urlTooltip: 'Apenas acessível na rede interna do banco',
  },
  {
    id: 'insightguard',
    title: 'Multi Agent System',
    description: 'Sistema multi-agente orquestrador de todo o ecossistema de agentes de cybersecurity para auxiliar na jornada do cliente.',
    status: 'in-progress',
    impact: 'Navegação facilitada entre as jornadas do portal Cyber e auxílio na utilização das ferramentas disponíveis, de forma conversacional.',
    technologies: ['LLM', 'RAG', 'Agent Design', 'LangGraph', 'AWS', 'Terraform', 'Angular', 'Datadog', 'API Gateway', 'Lambda', 'S3'],
    relatedSkills: ['llm', 'rag', 'agent-design', 'langgraph', 'aws', 'terraform', 'angular', 'datadog', 'api-gateway', 'lambda', 's3'],
    relatedMilestones: ['arch-system-design', 'ai-engineering'],
    relatedResources: ['books-arch-peaa', 'cert-security'],
    url: 'https://cyber.itau/insight-guard',
    urlTooltip: 'Apenas acessível na rede interna do banco',
  },
  {
    id: 'dashboards-standardization',
    title: 'Padronização de Dashboards',
    description: 'Criação de um Playbook e Design System para dashboards no QuickSight, garantindo consistência visual e técnica. Integrando temas de IAM, Cyber Insights e Observability360 como variações do padrão.',
    status: 'completed',
    impact: 'Consistência visual em todos os dashboards da diretoria e redução de 40% no tempo de desenvolvimento de novas visões.',
    technologies: ['QuickSight', 'Figma', 'UX Design', 'Design Systems'],
    relatedSkills: ['quicksight', 'figma', 'ux', 'design-systems'],
    relatedMilestones: ['promotion-pleno'],
    relatedResources: ['books-comm-storytelling'],
  },
  {
    id: 'user-behavior',
    title: 'User Behavior (Comportamento Anômalo)',
    description: 'Engenharia de ML com Lambda para detecção de comportamentos anômalos em acessos.',
    status: 'completed',
    impact: 'Identificação proativa de riscos de segurança.',
    technologies: ['AWS Lambda', 'Python', 'MLOps'],
    relatedSkills: ['lambda', 'python', 'mlops'],
    relatedMilestones: ['ai-fomentation'],
    relatedResources: [],
  },
  {
    id: 'agente-leila',
    title: 'Agente Leila (Fluxo Sequencial)',
    description: 'Agente para análise de normativos utilizando orquestração de LLMs em etapas.',
    status: 'completed',
    impact: 'Redução de 70% no tempo de análise de documentos normativos.',
    technologies: ['LLM', 'Python', 'Fluxo Sequencial'],
    relatedSkills: ['llm', 'python', 'fluxo-sequencial'],
    relatedMilestones: ['ai-fomentation'],
    relatedResources: [],
  },
  {
    id: 'score-cyber',
    title: 'Score de Cyber',
    description: 'Apoio na construção dos dashboards e views dos indicadores do score de cyber, principal direcionador do banco para segurança da informação.',
    status: 'completed',
    impact: 'Visibilidade executiva dos principais indicadores de risco do banco e direcionamento estratégico de segurança.',
    technologies: ['QuickSight', 'SQL', 'Athena'],
    relatedSkills: ['quicksight', 'sql', 'athena'],
    relatedMilestones: ['promotion-pleno'],
    relatedResources: [],
    objectives: [
      { text: 'Construção de 10 indicadores core', completed: true, completionJustification: 'Indicadores implementados e validados com os stakeholders de segurança.' }
    ]
  },
  {
    id: 'democratizacao-dados',
    title: 'Democratização de Dados',
    description: 'Atuação em 5+ tabelas democratizadas e consultoria técnica para 4+ times distintos.',
    status: 'completed',
    impact: 'Atuação na tabela de People, 2 tabelas do Kaizen e suporte técnico para diversas áreas.',
    technologies: ['SQL', 'Python', 'AWS Glue', 'Athena', 'Data Modeling'],
    relatedSkills: ['sql', 'python', 'data-modeling', 'aws-glue', 'athena'],
    relatedMilestones: [],
    relatedResources: [],
  },
];

export const resources: Resource[] = [
  // Certificações - Trilha de AI Security & Arquitetura
  {
    id: 'cert-crtp',
    name: 'CRTP — Certified Red Team Professional',
    description: 'Certificação prática de Active Directory da Altered Security.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Segurança Ofensiva',
    subCategory: 'Active Directory',
    relatedSkills: ['security', 'critical-thinking'],
    relatedMilestones: ['cert-crtp'],
  },
  {
    id: 'cert-oscp',
    name: 'OSCP — PEN-200 (OffSec)',
    description: 'Metodologia ofensiva e pentest prático de 24 horas.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Segurança Ofensiva',
    subCategory: 'Pentesting',
    relatedSkills: ['security', 'critical-thinking', 'python', 'bash'],
    relatedMilestones: ['cert-oscp'],
  },
  {
    id: 'cert-caisp',
    name: 'CAISP — Certified AI Security Professional',
    description: 'Segurança aplicada a IA baseado em OWASP LLM Top 10 e MITRE ATLAS.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'AI Security',
    subCategory: 'DevSecOps para IA',
    relatedSkills: ['security', 'llm', 'prompt-engineering', 'mlops'],
    relatedMilestones: ['cert-caisp'],
  },
  {
    id: 'cert-cmcpse',
    name: 'CMCPSE — Certified MCP Security Expert',
    description: 'Segurança de servidores MCP e sistemas agênticos multi-agentes.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'AI Security',
    subCategory: 'IA Agêntica',
    relatedSkills: ['security', 'agent-design', 'mcp-tools', 'langgraph'],
    relatedMilestones: ['cert-cmcpse'],
  },
  {
    id: 'cert-cissp',
    name: 'CISSP (ISC2)',
    description: 'Referência global em gestão e arquitetura de segurança da informação.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Segurança da Informação',
    subCategory: 'Arquitetura & Risco',
    relatedSkills: ['security', 'aws', 'iam', 'vpc', 'critical-thinking'],
    relatedMilestones: ['cloud-security-certification'],
  },
  {
    id: 'cert-iso42001',
    name: 'ISO/IEC 42001 Lead Implementer',
    description: 'Norma internacional de governança e gestão de sistemas de IA (AIMS).',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Governança',
    subCategory: 'ISO IA',
    relatedSkills: ['security', 'strategic-vision'],
    relatedMilestones: ['cert-iso42001'],
  },
  {
    id: 'cert-aaism',
    name: 'ISACA AAISM',
    description: 'Advanced in AI Security Management focada em resiliência e resposta a incidentes de IA.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'AI Security',
    subCategory: 'Gestão Executiva',
    relatedSkills: ['security', 'strategic-vision', 'leadership'],
    relatedMilestones: ['cert-aaism'],
  },
  {
    id: 'cert-cpsaf',
    name: 'iSAQB CPSA-F — Foundation Level',
    description: 'Fundamentos internacionais de arquitetura de software da iSAQB.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Arquitetura',
    subCategory: 'Arquitetura de Software',
    relatedSkills: ['api-architecture', 'technical-docs', 'critical-thinking'],
    relatedMilestones: ['cert-cpsaf'],
  },
  {
    id: 'cert-cpsaa',
    name: 'iSAQB CPSA-A — Advanced Level',
    description: 'Desenvolvimento modular de competências de arquitetura avançada.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Arquitetura',
    subCategory: 'Arquitetura de Software',
    relatedSkills: ['api-architecture', 'influence', 'technical-docs'],
    relatedMilestones: ['cert-cpsaa'],
  },
  {
    id: 'cert-awssaa',
    name: 'AWS Solutions Architect — Associate',
    description: 'Certificação intermediária de arquitetura AWS para nível mid-level.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Cloud',
    subCategory: 'AWS Cloud',
    relatedSkills: ['aws', 'api-architecture', 'iam', 'vpc', 'lambda', 's3'],
    relatedMilestones: ['cert-awssaa'],
  },
  {
    id: 'cert-awssap',
    name: 'AWS Solutions Architect — Professional',
    description: 'Design avançado de sistemas complexos de grande escala na AWS.',
    status: 'planned',
    parentCategory: 'Certificações',
    category: 'Cloud',
    subCategory: 'AWS Cloud',
    relatedSkills: ['aws', 'api-architecture', 'iam', 'vpc', 'lambda', 'ecs'],
    relatedMilestones: ['cert-awssap'],
  },

  // Livros - Comunicação
  {
    id: 'books-comm-cnv',
    name: 'Comunicação Não-Violenta',
    description: 'Marshall B. Rosenberg - Guia prático para comunicação compassiva',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Comunicação',
    subCategory: 'Comunicação',
    image: '/assets/img/books/cnv.jpg',
    relatedSkills: ['nvc', 'active-listening', 'empathy'],
    relatedMilestones: ['soft-skills'],
  },
  {
    id: 'books-comm-storytelling',
    name: 'Storytelling with Data',
    description: 'Cole Nussbaumer Knaflic - Um guia para apresentação de dados.',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Comunicação',
    subCategory: 'Storytelling',
    image: '/assets/img/books/swd.jpg',
    relatedSkills: ['storytelling', 'presentation', 'data-modeling'],
    relatedMilestones: ['soft-skills', 'workshops-talks'],
  },
  {
    id: 'books-comm-cfaip',
    name: 'Como Fazer Amigos e Influenciar Pessoas',
    description: 'Robert Cialdini - Clássico sobre habilidades sociais',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Comunicação',
    subCategory: 'Comunicação',
    image: '/assets/img/books/cfaip.jpg',
    relatedSkills: ['presentation', 'verbal-communication', 'storytelling'],
    relatedMilestones: ['soft-skills'],
  },
  // Livros - Analytics
  {
    id: 'books-ana-ddia',
    name: 'Designing Data-Intensive Applications',
    description: 'Martin Kleppmann - Um guia para aplicações intensivas em dados.',
    status: 'not-started',
    parentCategory: 'Livros',
    category: 'Livros de Analytics',
    subCategory: 'Analytics',
    image: '/assets/img/books/ddia.jpg',
    relatedSkills: ['data-modeling', 'aws-glue', 'kafka'],
    relatedMilestones: [],
  },
  {
    id: 'books-ana-tads',
    name: 'The Art of Data Science',
    description: 'Roger D. Peng - Metodologia e pensamento crítico em ciência de dados.',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Analytics',
    subCategory: 'Analytics',
    image: '/assets/img/books/tads.jpg',
    relatedSkills: ['critical-thinking', 'data-modeling'],
    relatedMilestones: [],
  },
  {
    id: 'books-ana-dsfb',
    name: 'Data Science for Business',
    description: 'Foster Provost - Aplicação estratégica de ciência de dados nos negócios.',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Analytics',
    subCategory: 'Analytics',
    image: '/assets/img/books/dsfb.jpg',
    relatedSkills: ['strategic-vision', 'data-modeling'],
    relatedMilestones: [],
  },
  // Livros - Arquitetura
  {
    id: 'books-arch-peaa',
    name: 'Patterns of Enterprise Application Architecture',
    description: 'Martin Fowler - Padrões de arquitetura para aplicações empresariais.',
    status: 'not-started',
    parentCategory: 'Livros',
    category: 'Livros de Arquitetura',
    subCategory: 'Arquitetura',
    image: '/assets/img/books/peaa.jpg',
    relatedSkills: ['data-modeling', 'technical-docs'],
    relatedMilestones: [],
  },
  {
    id: 'books-arch-ddd',
    name: 'Domain-Driven Design',
    description: 'Eric Evans - Tackling Complexity in the Heart of Software.',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Arquitetura',
    subCategory: 'Arquitetura',
    relatedSkills: ['technical-docs'],
    relatedMilestones: [],
  },

  // === CERTIFICAÇÕES ARQUIVADAS / CONCLUÍDAS ===
  {
    id: 'cert-analytics',
    name: 'Certificação Analytics Engineer (Interna)',
    description: 'Prova de engenheiro de analytics profissional do banco.',
    status: 'completed',
    parentCategory: 'Certificações',
    category: 'Analytics & Dados',
    relatedSkills: ['aws-glue', 's3', 'lambda', 'data-modeling', 'pyspark', 'sql', 'python'],
    relatedMilestones: ['certification-pro'],
  },
  {
    id: 'cert-api-owner',
    name: 'Certificação API Owner (Interna)',
    description: 'Três níveis de certificação em design e governança de APIs.',
    status: 'completed',
    parentCategory: 'Certificações',
    category: 'APIs',
    relatedSkills: ['openapi', 'api-design', 'api-architecture', 'api-contracts'],
    relatedMilestones: ['cert-api-owner'],
  },
  {
    id: 'cert-security-plus',
    name: 'CompTIA Security+ Certification',
    description: 'Fundamentos de segurança da informação, redes, criptografia e ameaças.',
    status: 'completed',
    parentCategory: 'Certificações',
    category: 'Segurança da Informação',
    relatedSkills: ['security', 'critical-thinking'],
    relatedMilestones: ['cert-security'],
  },
  {
    id: 'cert-cloud-practitioner',
    name: 'AWS Cloud Practitioner',
    description: 'Certificação fundamental sobre os conceitos da AWS Cloud.',
    status: 'completed',
    parentCategory: 'Certificações',
    category: 'Cloud',
    relatedSkills: ['aws', 's3', 'lambda'],
    relatedMilestones: ['cert-aws-cloud'],
  },

  {
    id: 'books-arch-microservices',
    name: 'Data Mesh',
    description: 'Zhamak Dehghani - Arquitetura de dados descentralizada.',
    status: 'in-progress',
    parentCategory: 'Livros',
    category: 'Livros de Arquitetura',
    subCategory: 'Arquitetura',
    image: '/assets/img/books/dm.jpg',
    relatedSkills: ['data-contracts', 'data-lineage'],
    relatedMilestones: [],
  },
  // Livros - Engenharia de Software
  {
    id: 'books-code-cco',
    name: 'Clean Code',
    description: 'Robert C. Martin - Práticas de código limpo e manutenível.',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Engenharia de Software',
    subCategory: 'Engenharia de Software',
    image: '/assets/img/books/cco.jpg',
    relatedSkills: ['testing', 'linters'],
    relatedMilestones: [],
  },
  {
    id: 'books-code-tpp',
    name: 'The Pragmatic Programmer',
    description: 'Andrew Hunt - Filosofia e melhores práticas de desenvolvimento.',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Engenharia de Software',
    subCategory: 'Engenharia de Software',
    image: '/assets/img/books/tpp.jpg',
    relatedSkills: ['critical-thinking', 'git'],
    relatedMilestones: [],
  },
  // Livros - Design/Front
  {
    id: 'books-design-cfaip',
    name: 'Composing Software',
    description: 'Eric Elliott - Fundamentos de programação funcional e composição.',
    status: 'in-progress',
    parentCategory: 'Livros',
    category: 'Livros de Design/Front',
    subCategory: 'Design e Front',
    image: '',
    relatedSkills: ['javascript', 'typescript'],
    relatedMilestones: [],
  },
  {
    id: 'books-design-dm',
    name: 'Don\'t Make Me Think',
    description: 'Steve Krug - Usabilidade e design focado no usuário.',
    status: 'completed',
    parentCategory: 'Livros',
    category: 'Livros de Design/Front',
    subCategory: 'Design e UX',
    image: '',
    relatedSkills: ['ux', 'figma'],
    relatedMilestones: [],
  },
  {
    id: 'books-design-swd',
    name: 'The Software Design Manual',
    description: 'Guia completo de design e arquitetura de software.',
    status: 'in-progress',
    parentCategory: 'Livros',
    category: 'Livros de Design/Front',
    subCategory: 'Design de Software',
    image: '',
    relatedSkills: ['api-design', 'technical-docs'],
    relatedMilestones: [],
  },

  // Certificações - AI Security
  {
    id: 'cert-aws-security-specialty',
    name: 'AWS Security Specialty',
    description: 'Certificação avançada em segurança AWS para workloads de produção',
    status: 'not-started',
    parentCategory: 'Certificação',
    category: 'AWS',
    subCategory: 'Segurança',
    image: '/assets/img/aws.png',
    relatedSkills: ['security', 'iam', 'vpc', 'aws'],
    relatedMilestones: ['cloud-security-certification'],
  },

  // Cursos - AI Security
  {
    id: 'course-adversarial-ml',
    name: 'Adversarial Machine Learning',
    description: 'Técnicas de evasão, inversão e extração de modelos ML',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'Red Teaming',
    relatedSkills: ['security', 'mlops', 'critical-thinking'],
    relatedMilestones: ['red-teaming-framework'],
  },
  {
    id: 'course-mlops-security',
    name: 'Secure MLOps Pipeline Design',
    description: 'Design de pipelines MLOps seguros: supply chain, model signing, runtime guardrails',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'MLOps Security',
    relatedSkills: ['mlops', 'security', 'bedrock-guardrails'],
    relatedMilestones: ['model-supply-chain', 'governance-ai-pipelines'],
  },
  {
    id: 'course-bedrock-guardrails',
    name: 'AWS Bedrock Guardrails Workshop',
    description: 'Workshop prático de configuração de guardrails para LLMs com AWS Bedrock',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'Runtime Guardrails',
    relatedSkills: ['bedrock-guardrails', 'aws-bedrock', 'llm'],
    relatedMilestones: ['ai-defense-foundations', 'governance-ai-pipelines'],
  },

  // Ferramentas
  {
    id: 'tool-safetensors',
    name: '.safetensors & Model Signing',
    description: 'Validação de integridade de modelos ML com formato seguro e assinatura criptográfica',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'Supply Chain',
    relatedSkills: ['mlops', 'security', 'python'],
    relatedMilestones: ['model-supply-chain'],
  },
  {
    id: 'tool-mlflow-provenance',
    name: 'MLflow Model Registry & Provenance',
    description: 'Rastreamento de proveniência de modelos: autor, dataset, HPO, métricas',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'Supply Chain',
    relatedSkills: ['mlops', 'data-observability'],
    relatedMilestones: ['model-supply-chain', 'governance-ai-pipelines'],
  },
];
