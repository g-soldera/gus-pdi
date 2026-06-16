import { PersonalInfo, Skill, Milestone, Project, Resource } from '@/types/pdi';

export const personalInfo: PersonalInfo = {
  name: 'Gustavo Soldera',
  birthDate: '2002-05-30',
  startDate: '2025-05-05', // Efetivado como Júnior
  company: 'Itaú Unibanco',
  department: 'Cyber Security',
  currentRole: 'Engenheiro de Analytics JR',
  targetRole: 'Engenheiro de Analytics PL',
  targetTimelineMonths: 12,
  timelineTarget: '2026-06-07', // Feedback de Pleno
  seniorTargetDate: '2028-01-01', // Desejo estar como Sênior
  experienceStartDate: '2023-06-07', // Início como Estagiário
  bankStartDate: '2024-05-05', // Entro no Itaú
  profileImage: '/assets/img/profile.jpg',
};

export const skills: Skill[] = [
  // ==========================================
  // HARD SKILLS
  // ==========================================

  // Analytics & BI
  { id: 'quicksight', name: 'Amazon QuickSight', level: 5, description: 'Criação de dashboards interativos e análises visuais', category: 'Analytics & BI', type: 'hard' },
  { id: 'pyspark', name: 'PySpark', level: 4, description: 'Processamento distribuído de grandes volumes de dados', category: 'Analytics & BI', type: 'hard' },
  { id: 'data-modeling', name: 'Modelagem de Dados', level: 5, description: 'Design de schemas dimensionais e otimização de queries', category: 'Analytics & BI', type: 'hard' },

  // APIs
  { id: 'openapi', name: 'OpenAPI', level: 3, description: 'Especificação e versionamento de contratos REST', category: 'APIs', type: 'hard' },
  { id: 'api-design', name: 'Design de APIs', level: 4, description: 'Padrões de design, consistência e governança', category: 'APIs', type: 'hard' },
  { id: 'api-architecture', name: 'Arquitetura de APIs', level: 3, description: 'Topologias, gateways e observabilidade de interfaces', category: 'APIs', type: 'hard' },
  { id: 'api-contracts', name: 'Contratos de API', level: 4, description: 'Lifecycle de contratos, breaking changes e testes', category: 'APIs', type: 'hard' },

  // CI/CD & Testes
  { id: 'codebuild', name: 'CodeBuild', level: 3, description: 'Build e testes automatizados', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'codepipeline', name: 'CodePipeline', level: 2, description: 'Pipelines de CI/CD', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'github-actions', name: 'GitHub Actions', level: 4, description: 'Automação de workflows', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'sonarqube', name: 'SonarQube', level: 3, description: 'Análise de qualidade de código', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'testing', name: 'Testes', level: 4, description: 'Testes unitários, integração e end-to-end', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'linters', name: 'Linters', level: 4, description: 'Análise estática de código e padronização', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'testes-automatizados', name: 'Testes Automatizados', level: 4, description: 'Automação de testes end-to-end e integração', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'testes-unitarios', name: 'Testes Unitários', level: 4, description: 'Testes de componentes individuais', category: 'CI/CD & Testes', type: 'hard' },

  // Cloud & Data
  { id: 'aws', name: 'AWS Cloud', level: 4, description: 'Arquitetura e serviços core da AWS', category: 'Cloud & Data', type: 'hard' },
  { id: 'aws-glue', name: 'AWS Glue', level: 5, description: 'ETL serverless e catalogação de dados', category: 'Cloud & Data', type: 'hard' },
  { id: 's3', name: 'S3', level: 5, description: 'Armazenamento de dados em data lake', category: 'Cloud & Data', type: 'hard' },
  { id: 'lambda', name: 'Lambda', level: 4, description: 'Funções serverless para processamento de eventos', category: 'Cloud & Data', type: 'hard' },
  { id: 'api-gateway', name: 'Amazon API Gateway', level: 4, description: 'Gerenciamento e publicação de APIs em escala', category: 'Cloud & Data', type: 'hard' },
  { id: 'ecs', name: 'ECS', level: 4, description: 'Orquestração de containers para aplicações', category: 'Cloud & Data', type: 'hard' },
  { id: 'emr', name: 'EMR', level: 4, description: 'Processamento de big data com Spark', category: 'Cloud & Data', type: 'hard' },
  { id: 'cloudfront', name: 'CloudFront', level: 3, description: 'CDN para distribuição de conteúdo', category: 'Cloud & Data', type: 'hard' },
  { id: 'terraform', name: 'Terraform', level: 4, description: 'Infrastructure as Code para provisionamento cloud', category: 'Cloud & Data', type: 'hard' },
  { id: 'kafka', name: 'Kafka', level: 3, description: 'Streaming de dados em tempo real', category: 'Cloud & Data', type: 'hard' },
  { id: 'athena', name: 'Athena', level: 4, description: 'Queries SQL serverless em data lakes', category: 'Cloud & Data', type: 'hard' },
  { id: 'redshift', name: 'Redshift', level: 3, description: 'Data warehouse para analytics em escala', category: 'Cloud & Data', type: 'hard' },
  { id: 'dynamodb', name: 'DynamoDB', level: 3, description: 'Banco de dados NoSQL serverless', category: 'Cloud & Data', type: 'hard' },
  { id: 'stepfunctions', name: 'Step Functions', level: 3, description: 'Orquestração de workflows serverless', category: 'Cloud & Data', type: 'hard' },
  { id: 'cloudwatch', name: 'CloudWatch', level: 4, description: 'Monitoramento e logs de aplicações', category: 'Cloud & Data', type: 'hard' },
  { id: 'iam', name: 'IAM', level: 4, description: 'Gestão de identidades e acessos', category: 'Cloud & Data', type: 'hard' },
  { id: 'vpc', name: 'VPC', level: 3, description: 'Redes virtuais privadas na AWS', category: 'Cloud & Data', type: 'hard' },
  { id: 'microfrontends', name: 'Microfrontends', level: 3, description: 'Arquitetura distribuída de frontends', category: 'Cloud & Data', type: 'hard' },

  // Comunicação Técnica
  { id: 'technical-docs', name: 'Documentação Técnica', level: 5, description: 'Elaboração de documentação clara e completa', category: 'Comunicação Técnica', type: 'hard' },

  // Data Quality
  { id: 'glue-dq', name: 'Glue Data Quality', level: 4, description: 'Implementação de regras de qualidade de dados', category: 'Data Quality', type: 'hard' },
  { id: 'deequ', name: 'Deequ', level: 4, description: 'Framework para validação de qualidade de dados em escala', category: 'Data Quality', type: 'hard' },
  { id: 'data-observability', name: 'Data Observability', level: 4, description: 'Monitoramento e rastreamento de pipelines de dados', category: 'Data Quality', type: 'hard' },

  // Design & UX
  { id: 'figma', name: 'Figma', level: 4, description: 'Design de interfaces e prototipação', category: 'Design & UX', type: 'hard' },
  { id: 'ux', name: 'UX', level: 3, description: 'Experiência do usuário e usabilidade', category: 'Design & UX', type: 'hard' },
  { id: 'design-systems', name: 'Design Systems', level: 3, description: 'Criação e manutenção de sistemas de design', category: 'Design & UX', type: 'hard' },

  // Desenvolvimento
  { id: 'sql', name: 'SQL', level: 5, description: 'Experiência avançada em queries complexas, otimização e modelagem de dados relacionais', category: 'Desenvolvimento', type: 'hard' },
  { id: 'python', name: 'Python', level: 5, description: 'Desenvolvimento de pipelines de dados, automação e scripts de analytics', category: 'Desenvolvimento', type: 'hard' },
  { id: 'html-css', name: 'HTML/CSS', level: 4, description: 'Desenvolvimento de interfaces web e dashboards customizados', category: 'Desenvolvimento', type: 'hard' },
  { id: 'sass', name: 'Sass/SCSS', level: 4, description: 'Pré-processador CSS para estilos manuteníveis', category: 'Desenvolvimento', type: 'hard' },
  { id: 'javascript', name: 'JavaScript', level: 4, description: 'Desenvolvimento frontend e integração com APIs', category: 'Desenvolvimento', type: 'hard' },
  { id: 'typescript', name: 'TypeScript', level: 4, description: 'Desenvolvimento tipado para aplicações robustas', category: 'Desenvolvimento', type: 'hard' },
  { id: 'angular', name: 'Angular', level: 3, description: 'Framework para desenvolvimento de aplicações web', category: 'Desenvolvimento', type: 'hard' },
  { id: 'react', name: 'React', level: 3, description: 'Biblioteca para interfaces de usuário modernas', category: 'Desenvolvimento', type: 'hard' },
  { id: 'git', name: 'Git', level: 5, description: 'Controle de versão e colaboração em código', category: 'Desenvolvimento', type: 'hard' },
  { id: 'bash', name: 'Bash/Shell', level: 4, description: 'Scripts e automação em linha de comando', category: 'Desenvolvimento', type: 'hard' },
  { id: 'power-automate', name: 'Power Automate', level: 3, description: 'Automação de fluxos low-code', category: 'Desenvolvimento', type: 'hard' },

  // DevOps
  { id: 'kubernetes', name: 'Kubernetes', level: 3, description: 'Orquestração de containers', category: 'DevOps', type: 'hard' },
  { id: 'docker', name: 'Docker', level: 4, description: 'Containerização de aplicações', category: 'DevOps', type: 'hard' },
  { id: 'datadog', name: 'Datadog', level: 3, description: 'Monitoramento, logs e APM', category: 'DevOps', type: 'hard' },
  { id: 'mlops', name: 'MLOps', level: 3, description: 'DevOps para Machine Learning', category: 'DevOps', type: 'hard' },

  // FinOps
  { id: 'cost-optimization', name: 'Otimização de Custos', level: 4, description: 'Estratégias para redução de custos cloud', category: 'FinOps', type: 'hard' },
  { id: 'finops', name: 'FinOps', level: 3, description: 'Otimização de custos de infraestrutura cloud', category: 'FinOps', type: 'hard' },

  // Governança de Dados
  { id: 'data-contracts', name: 'Data Contracts', level: 4, description: 'Definição e implementação de contratos de dados', category: 'Governança de Dados', type: 'hard' },
  { id: 'data-lineage', name: 'Data Lineage', level: 4, description: 'Rastreamento da origem e transformação de dados', category: 'Governança de Dados', type: 'hard' },

  // IA Generativa
  { id: 'llm', name: 'LLM (Generative AI)', level: 4, description: 'Arquitetura e implementação de soluções com IA Generativa', category: 'IA Generativa', type: 'hard' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', level: 5, description: 'Otimização de prompts para LLMs e criação de patterns', category: 'IA Generativa', type: 'hard' },
  { id: 'rag', name: 'RAG', level: 4, description: 'Retrieval Augmented Generation para contexto expandido', category: 'IA Generativa', type: 'hard' },
  { id: 'agent-design', name: 'Agent Design', level: 4, description: 'Design e implementação de agentes autônomos', category: 'IA Generativa', type: 'hard' },
  { id: 'stackspot-ai', name: 'StackSpot AI', level: 4, description: 'Plataforma de desenvolvimento assistido por IA', category: 'IA Generativa', type: 'hard' },
  { id: 'devin', name: 'Devin', level: 4, description: 'Agente autônomo de desenvolvimento de software', category: 'IA Generativa', type: 'hard' },
  { id: 'github-copilot', name: 'GitHub Copilot', level: 4, description: 'Assistente de código baseado em IA', category: 'IA Generativa', type: 'hard' },
  { id: 'mas', name: 'MAS', level: 3, description: 'Multi-Agent Systems para orquestração de agentes', category: 'IA Generativa', type: 'hard' },
  { id: 'mcp-tools', name: 'MCP Tools', level: 3, description: 'Model Context Protocol para integração de ferramentas', category: 'IA Generativa', type: 'hard' },
  { id: 'copilot-studio', name: 'Copilot Studio', level: 3, description: 'Criação de copilotos e agentes especializados', category: 'IA Generativa', type: 'hard' },
  { id: 'copilot-365', name: 'Microsoft 365 Copilot', level: 3, description: 'Extensibilidade e integração com M365 Copilot', category: 'IA Generativa', type: 'hard' },
  { id: 'fluxo-sequencial', name: 'Fluxo Sequencial', level: 3, description: 'Orquestração de pipelines de LLM em etapas', category: 'IA Generativa', type: 'hard' },
  { id: 'langgraph', name: 'LangGraph', level: 3, description: 'Orquestração de agentes com grafos', category: 'IA Generativa', type: 'hard' },
  { id: 'langchain', name: 'LangChain', level: 3, description: 'Framework para desenvolvimento de aplicações LLM', category: 'IA Generativa', type: 'hard' },
  { id: 'aws-bedrock', name: 'AWS Bedrock', level: 3, description: 'Serviço gerenciado para modelos de IA generativa', category: 'IA Generativa', type: 'hard' },
  { id: 'bedrock-guardrails', name: 'Bedrock Guardrails', level: 3, description: 'Governança e segurança para modelos de IA', category: 'IA Generativa', type: 'hard' },

  // Prompt Patterns (Novas Skills)
  { id: 'prompt-pattern-persona', name: 'Pattern: Persona & Context', level: 5, description: 'Definição clara de papel e contexto para outputs precisos', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-chain', name: 'Pattern: Chain of Thought', level: 5, description: 'Estruturação de raciocínio passo a passo para tarefas complexas', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-fewshot', name: 'Pattern: Few-Shot Prompting', level: 5, description: 'Uso de exemplos para guiar o formato e tom da resposta', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-recipe', name: 'Pattern: Prompt Recipes', level: 5, description: 'Criação de templates reutilizáveis para automação de tarefas', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-guardrail', name: 'Pattern: Negative Prompting/Guardrails', level: 5, description: 'Definição de limites e o que NÃO deve ser feito pelo modelo', category: 'Prompt Patterns', type: 'hard' },

  // Idiomas
  { id: 'portuguese', name: 'Português', level: 5, description: 'Fluência nativa', category: 'Idiomas', type: 'hard' },
  { id: 'english', name: 'Inglês', level: 4, description: 'Fluência profissional', category: 'Idiomas', type: 'hard' },
  { id: 'italian', name: 'Italiano', level: 2, description: 'Básico', category: 'Idiomas', type: 'hard' },

  // Segurança
  { id: 'security', name: 'Cyber Security', level: 3, description: 'Fundamentos de Segurança da Informação', category: 'Segurança', type: 'hard' },

  // ==========================================
  // SOFT SKILLS
  // ==========================================

  // Cognitivas
  { id: 'critical-thinking', name: 'Pensamento Crítico', level: 4, description: 'Análise profunda de problemas e tomada de decisão baseada em dados', category: 'Cognitivas', type: 'soft' },

  // Comunicação
  { id: 'presentation', name: 'Apresentação', level: 4, description: 'Apresentações técnicas e executivas impactantes', category: 'Comunicação', type: 'soft' },
  { id: 'verbal-communication', name: 'Comunicação Verbal', level: 4, description: 'Clareza e assertividade na comunicação', category: 'Comunicação', type: 'soft' },
  { id: 'active-listening', name: 'Escuta Ativa', level: 5, description: 'Compreensão profunda das necessidades dos stakeholders', category: 'Comunicação', type: 'soft' },
  { id: 'empathy', name: 'Empatia', level: 5, description: 'Capacidade de se colocar no lugar do outro', category: 'Comunicação', type: 'soft' },
  { id: 'nvc', name: 'CNV', level: 4, description: 'Comunicação Não-Violenta para resolução de conflitos', category: 'Comunicação', type: 'soft' },
  { id: 'storytelling', name: 'Storytelling', level: 4, description: 'Narrativa envolvente para transmitir ideias', category: 'Comunicação', type: 'soft' },

  // Liderança
  { id: 'leadership', name: 'Liderança', level: 4, description: 'Capacidade de inspirar e guiar equipes', category: 'Liderança', type: 'soft' },

  // Relacionais
  { id: 'collaboration', name: 'Colaboração', level: 5, description: 'Trabalho efetivo em equipes multidisciplinares', category: 'Relacionais', type: 'soft' },
  { id: 'conflict-management', name: 'Gestão de Conflitos', level: 4, description: 'Mediação e resolução construtiva de conflitos', category: 'Relacionais', type: 'soft' },
];

export const milestones: Milestone[] = [
  // ==========================================
  // ARQUIVADOS (Concluídos ou Despriorizados)
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
    relatedSkills: ['aws-glue', 's3', 'lambda', 'data-modeling', 'pyspark', 'sql', 'python', 'openapi', 'api-design', 'api-contracts', 'api-architecture'],
    relatedResources: ['cert-analytics', 'cert-api-owner'],
    archived: true,
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
    relatedSkills: ['presentation', 'verbal-communication', 'nvc', 'storytelling', 'empathy'],
    relatedResources: ['books-comm-cnv'],
    archived: true,
  },
  {
    id: 'lead-projects',
    title: 'Liderar Projetos de Impacto',
    displayName: 'Liderança em Projetos Estratégicos',
    description: 'Assumir liderança técnica em projetos estratégicos',
    status: 'completed',
    progress: 100,
    deadline: '2025-09-30',
    notes: 'Ponto focal técnico no Insight Guard (frontend), padronizações e implantação da Leila.',
    relatedSkills: ['leadership', 'critical-thinking', 'collaboration', 'technical-docs'],
    relatedResources: ['mentoring'],
    archived: true,
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
    relatedSkills: ['openapi', 'api-design', 'api-architecture', 'api-contracts'],
    relatedResources: ['cert-api-owner'],
    archived: true,
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
    relatedSkills: ['cost-optimization', 'terraform', 'aws-glue', 's3'],
    relatedResources: [],
    archived: true,
  },
  {
    id: 'cert-security',
    title: 'Certificação Security+',
    displayName: 'CompTIA Security+ Certification',
    description: 'Obter certificação em segurança da informação',
    status: 'completed',
    progress: 100,
    deadline: '2026-04-30',
    relatedSkills: ['critical-thinking', 'technical-docs', 'security'],
    relatedResources: [],
    archived: true,
  },
  {
    id: 'mentor-colleagues',
    title: 'Mentorar Colegas',
    displayName: 'Programa de Mentoria',
    description: 'Estabelecer programa de mentoria com estagiários',
    status: 'completed',
    progress: 100,
    deadline: '2026-04-01',
    notes: 'Apoiei Isabelli com conhecimentos técnicos, evolução de hard skills e PDI até conclusão.',
    relatedSkills: ['leadership', 'empathy', 'verbal-communication', 'active-listening'],
    relatedResources: ['mentoring'],
    archived: true,
  },
  {
    id: 'workshops-talks',
    title: 'Workshops e Palestras',
    displayName: 'Talks Técnicas e Workshops',
    description: 'Apresentar talks técnicos e conduzir workshops internos',
    status: 'completed',
    progress: 100,
    deadline: '2026-05-31',
    notes: 'Concluído com guildas do Devin e agendas de inovação.',
    relatedSkills: ['presentation', 'storytelling', 'technical-docs', 'devin', 'github-copilot'],
    relatedResources: ['books-comm-storytelling'],
    archived: true,
  },
  {
    id: 'cert-aws-cloud',
    title: 'Certificação AWS Cloud Practitioner',
    displayName: 'AWS Cloud Practitioner',
    description: 'Avançar em certificações AWS Cloud Practitioner',
    status: 'deprioritized',
    progress: 40,
    deadline: '2026-05-31',
    relatedSkills: ['aws-glue', 's3', 'lambda', 'ecs', 'emr', 'terraform'],
    relatedResources: ['cert-cloud'],
    archived: true,
  },

  // ==========================================
  // NOVOS MILESTONES (Foco Pleno -> Sênior)
  // ==========================================
  {
    id: 'arch-system-design',
    title: 'System Design e Arquitetura',
    displayName: 'System Design Avançado',
    description: 'Liderar o desenho de arquitetura de soluções complexas e distribuídas.',
    status: 'not-started',
    progress: 0,
    deadline: '2026-12-31',
    objectives: [
      { text: '2 arquiteturas de soluções complexas documentadas e aprovadas', completed: false },
      { text: 'Participação ativa em 5+ discussões de arquitetura de alto nível', completed: false },
      { text: 'Feedback positivo de pares sobre a qualidade dos designs', completed: false }
    ],
    relatedSkills: ['api-architecture', 'data-modeling', 'technical-docs', 'critical-thinking'],
    relatedResources: ['books-arch-peaa', 'books-arch-ddd'],
  },
  {
    id: 'tech-lead-projects',
    title: 'Liderança Técnica de Projetos',
    displayName: 'Tech Lead de Projetos na Squad',
    description: 'Assumir liderança técnica de projetos estratégicos em colaboração com o líder atual.',
    status: 'not-started',
    progress: 0,
    deadline: '2027-03-31',
    objectives: [
      { text: 'Liderança técnica em 2-3 projetos com entregas bem-sucedidas', completed: false },
      { text: '10+ code reviews construtivos realizados', completed: false },
      { text: 'Feedback formal do líder sobre contribuição técnica', completed: false }
    ],
    relatedSkills: ['leadership', 'collaboration', 'conflict-management', 'verbal-communication'],
    relatedResources: ['mentoring'],
  },
  {
    id: 'ai-engineering',
    title: 'Engenharia de IA Generativa',
    displayName: 'Especialista em Engenharia de IA',
    description: 'Desenvolver recursos agênticos (skills) para auxiliar no processo e otimização de modelos.',
    status: 'not-started',
    progress: 0,
    deadline: '2027-06-30',
    objectives: [
      { text: 'Desenvolver recursos agênticos (skills) para auxiliar no processo', completed: false },
      { text: 'Implementação de técnicas avançadas de RAG e otimização de prompts', completed: false }
    ],
    relatedSkills: ['llm', 'rag', 'agent-design', 'langgraph', 'prompt-engineering'],
    relatedResources: ['llm-course'],
  },
  {
    id: 'mlops-governance',
    title: 'MLOps e Governança',
    displayName: 'Excelência em MLOps',
    description: 'Implementar pipelines de MLOps com observabilidade e governança.',
    status: 'not-started',
    progress: 0,
    deadline: '2027-09-30',
    objectives: [
      { text: 'Implementação de 1+ pipeline MLOps completo com monitoramento', completed: false },
      { text: 'Redução de 20%+ no tempo de deploy de modelos', completed: false },
      { text: 'Definição de padrões de governança de dados em projetos de ML', completed: false }
    ],
    relatedSkills: ['mlops', 'data-observability', 'data-governance', 'github-actions', 'terraform'],
    relatedResources: ['devops-course'],
  },
  {
    id: 'cert-aws-sa-pro',
    title: 'AWS Solutions Architect Pro',
    displayName: 'AWS SA Professional',
    description: 'Obter a certificação AWS Solutions Architect Professional.',
    status: 'not-started',
    progress: 0,
    deadline: '2027-12-31',
    objectives: [
      { text: 'Aprovação no exame de certificação AWS SA Pro', completed: false }
    ],
    relatedSkills: ['aws', 'terraform', 'api-architecture', 'cost-optimization'],
    relatedResources: ['cert-cloud'],
  },
  {
    id: 'ai-fomentation',
    title: 'Fomento ao Consumo de IA',
    displayName: 'Multiplicador de IA e Automação',
    description: 'Fomentar o consumo de soluções de IA e compartilhamento de recursos técnicos com a comunidade.',
    status: 'in-progress',
    progress: 60,
    deadline: '2026-12-31',
    objectives: [
      { text: 'Alcançar 10 estrelas no repositório de compartilhamento de skills e prompts', completed: false },
      { text: 'Mínimo de 3 contribuidores diferentes no repositório de compartilhamento', completed: false },
      { text: 'Realizar 3 agendas de compartilhamento prático sobre o uso de agentes', completed: false },
      { text: 'Criar e documentar 5 novos patterns de prompt para uso do time', completed: true }
    ],
    relatedSkills: ['llm', 'prompt-engineering', 'collaboration', 'presentation', 'prompt-pattern-persona', 'prompt-pattern-chain', 'prompt-pattern-fewshot', 'prompt-pattern-recipe', 'prompt-pattern-guardrail'],
    relatedResources: ['llm-course'],
  },
];

export const projects: Project[] = [
  {
    id: 'cyberitau',
    title: 'Portal Cyber.itau',
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
    title: 'Insight Guard',
    description: 'Agente orquestrador de todo o ecossistema de agentes de cybersecurity para auxiliar na jornada do cliente.',
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
    title: 'Padronização de Dashboards e Controles',
    description: 'Projeto unificado para padronização visual e técnica de dashboards e implementação de controles.',
    status: 'in-progress',
    impact: 'Consistência visual e técnica em todo o ecossistema de analytics da Cyber Security.',
    technologies: ['QuickSight', 'SQL', 'Python', 'AWS Glue', 'Data Modeling'],
    relatedSkills: ['quicksight', 'sql', 'python', 'data-modeling', 'aws-glue', 'design-systems'],
    relatedMilestones: ['lead-projects'],
    relatedResources: ['books-comm-storytelling'],
    objectives: [
      { text: 'Pelo menos 50 controles implementados por terceiros seguindo o padrão criado', completed: false },
      { text: '100% dos novos dashboards da Cyber seguindo o Design System definido', completed: false }
    ]
  },
];

export const resources: Resource[] = [
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
    image: '/assets/img/books/ddd.jpg',
    relatedSkills: ['technical-docs', 'data-contracts'],
    relatedMilestones: [],
  },
  // Certificações
  {
    id: 'cert-analytics',
    name: 'Analytics Engineer Professional',
    description: 'Certificação interna Itaú em Analytics Engineering',
    status: 'completed',
    parentCategory: 'Certificação',
    category: 'Itaú',
    subCategory: 'Analytics',
    isSpecialization: true,
    image: '/assets/img/professionalea.webp',
    relatedSkills: ['data-modeling', 'pyspark', 'aws-glue', 'quicksight'],
    relatedMilestones: ['certification-pro'],
  },
  {
    id: 'cert-cloud',
    name: 'AWS Solutions Architect - Professional',
    description: 'Certificação profissional de arquitetura na AWS',
    status: 'not-started',
    parentCategory: 'Certificação',
    category: 'AWS',
    subCategory: 'Arquitetura',
    image: '/assets/img/aws.png',
    relatedSkills: ['aws-glue', 's3', 'lambda', 'ecs', 'emr', 'terraform'],
    relatedMilestones: ['cert-aws-sa-pro'],
  },
  {
    id: 'cert-cloud-practitioner',
    name: 'AWS Cloud Practitioner',
    description: 'Certificação foundational da AWS focada em fundamentos de nuvem e serviços core',
    status: 'in-progress',
    parentCategory: 'Certificação',
    category: 'AWS',
    subCategory: 'Fundamentos',
    image: '/assets/img/awspractitioner.webp',
    relatedSkills: ['s3', 'lambda', 'terraform', 'cloudfront'],
    relatedMilestones: ['cert-aws-cloud'],
  },
  {
    id: 'cert-security-comptia',
    name: 'CompTIA Security+',
    description: 'Certificação em segurança da informação',
    status: 'in-progress',
    parentCategory: 'Certificação',
    category: 'Segurança',
    subCategory: 'Segurança',
    image: '/assets/img/comptiasec.png',
    relatedSkills: ['critical-thinking', 'technical-docs', 'iam'],
    relatedMilestones: ['cert-security'],
  },
  // Cursos
  {
    id: 'devops-course',
    name: 'Curso Completo de DevOps',
    description: 'Fundamentos de DevOps, CI/CD, Docker e Kubernetes',
    status: 'in-progress',
    parentCategory: 'Curso',
    category: 'DevOps',
    subCategory: 'DevOps',
    relatedSkills: ['docker', 'kubernetes', 'github-actions', 'terraform'],
    relatedMilestones: ['cert-aws-cloud'],
  },
  {
    id: 'llm-course',
    name: 'Prompt Engineering e LLMs',
    description: 'Design de prompts e arquitetura de agentes com LLMs',
    status: 'in-progress',
    parentCategory: 'Curso',
    category: 'LLM',
    subCategory: 'LLM',
    relatedSkills: ['prompt-engineering', 'rag', 'agent-design', 'mas'],
    relatedMilestones: [],
  },
  // Mentoria
  {
    id: 'mentoring',
    name: 'Henrique Vieira',
    description: 'Mentor em engenharia de dados e carreira',
    status: 'in-progress',
    parentCategory: 'Mentoria',
    category: 'Mentoria com Seniors',
    subCategory: 'Mentoria Técnica',
    image: '/assets/img/mentor-henrique.png',
    relatedSkills: ['sql', 'python', 'data-modeling', 'aws-glue', 'terraform', 'leadership', 'critical-thinking', 'collaboration'],
    relatedMilestones: ['lead-projects', 'mentor-colleagues'],
  },
];
