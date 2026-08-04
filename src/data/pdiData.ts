import { PersonalInfo, Skill, Milestone, Project, Resource } from '@/types/pdi';

export const personalInfo: PersonalInfo = {
  name: 'Gustavo Soldera',
  birthDate: '2002-05-30',
  startDate: '2025-05-05', // Efetivado como Júnior
  company: 'Itaú Unibanco',
  department: 'Cyber Security',
  currentRole: 'Engenheiro de Analytics JR',
  targetRole: 'Engenheiro de Analytics PL (a mapear gap)',
  targetTimelineMonths: 12,
  timelineTarget: 'A definir em 1:1', // Alterado para refletir a incógnita
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
  { id: 'openapi', name: 'OpenAPI', level: 4, description: 'Especificação e versionamento de contratos REST', category: 'APIs', type: 'hard' },
  { id: 'api-design', name: 'Design de APIs', level: 4, description: 'Padrões de design, consistência e governança', category: 'APIs', type: 'hard' },
  { id: 'api-architecture', name: 'Arquitetura de APIs', level: 4, description: 'Topologias, gateways e observabilidade de interfaces', category: 'APIs', type: 'hard' },
  { id: 'api-contracts', name: 'Contratos de API', level: 4, description: 'Lifecycle de contratos, breaking changes e testes', category: 'APIs', type: 'hard' },

  // CI/CD & Testes
  { id: 'codebuild', name: 'CodeBuild', level: 3, description: 'Build e testes automatizados', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'codepipeline', name: 'Codepipeline', level: 2, description: 'Pipelines de CI/CD', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'github-actions', name: 'GitHub Actions', level: 4, description: 'Automação de workflows', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'sonarqube', name: 'SonarQube', level: 3, description: 'Análise de qualidade de código', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'testing', name: 'Testes', level: 4, description: 'Testes unitários, integração e end-to-end', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'linters', name: 'Linters', level: 4, description: 'Análise estática de código e padronização', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'testes-automatizados', name: 'Testes Automatizados', level: 4, description: 'Automação de testes end-to-end e integração', category: 'CI/CD & Testes', type: 'hard' },
  { id: 'testes-unitarios', name: 'Testes Unitários', level: 4, description: 'Testes de componentes individuais', category: 'CI/CD & Testes', type: 'hard' },

  // Cloud & Data
  { id: 'aws', name: 'AWS', level: 4, description: 'Arquitetura e serviços core da AWS', category: 'Cloud & Data', type: 'hard' },
  { id: 'aws-glue', name: 'AWS Glue', level: 5, description: 'ETL serverless e catalogação de dados', category: 'Cloud & Data', type: 'hard' },
  { id: 's3', name: 'S3', level: 5, description: 'Armazenamento de dados em data lake', category: 'Cloud & Data', type: 'hard' },
  { id: 'lambda', name: 'Lambda', level: 4, description: 'Funções serverless para processamento de eventos', category: 'Cloud & Data', type: 'hard' },
  { id: 'api-gateway', name: 'Amazon API Gateway', level: 4, description: 'Gerenciamento e publicação de APIs em escala', category: 'Cloud & Data', type: 'hard' },
  { id: 'ecs', name: 'ECS', level: 4, description: 'Orquestração de containers para aplicações', category: 'Cloud & Data', type: 'hard' },
  { id: 'emr', name: 'EMR', level: 3, description: 'Processamento de big data com Spark', category: 'Cloud & Data', type: 'hard' },
  { id: 'cloudfront', name: 'CloudFront', level: 4, description: 'CDN para distribuição de conteúdo', category: 'Cloud & Data', type: 'hard' },
  { id: 'terraform', name: 'Terraform', level: 4, description: 'Infrastructure as Code para provisionamento cloud', category: 'Cloud & Data', type: 'hard' },
  { id: 'kafka', name: 'Kafka', level: 2, description: 'Streaming de dados em tempo real', category: 'Cloud & Data', type: 'hard' },
  { id: 'athena', name: 'Athena', level: 4, description: 'Queries SQL serverless em data lakes', category: 'Cloud & Data', type: 'hard' },
  { id: 'redshift', name: 'Redshift', level: 2, description: 'Data warehouse para analytics em escala', category: 'Cloud & Data', type: 'hard' },
  { id: 'dynamodb', name: 'DynamoDB', level: 2, description: 'Banco de dados NoSQL serverless', category: 'Cloud & Data', type: 'hard' },
  { id: 'stepfunctions', name: 'Step Functions', level: 3, description: 'Orquestração de workflows serverless', category: 'Cloud & Data', type: 'hard' },
  { id: 'cloudwatch', name: 'CloudWatch', level: 4, description: 'Monitoramento e logs de aplicações', category: 'Cloud & Data', type: 'hard' },
  { id: 'iam', name: 'IAM', level: 4, description: 'Gestão de identidades e acessos', category: 'Cloud & Data', type: 'hard' },
  { id: 'vpc', name: 'VPC', level: 3, description: 'Redes virtuais privadas na AWS', category: 'Cloud & Data', type: 'hard' },
  { id: 'microfrontends', name: 'Microfrontends', level: 3, description: 'Arquitetura distribuída de frontends', category: 'Cloud & Data', type: 'hard' },

  // Comunicação Técnica
  { id: 'technical-docs', name: 'Documentação Técnica', level: 5, description: 'Elaboração de documentação clara e completa', category: 'Comunicação Técnica', type: 'hard' },
  { id: 'sdd', name: 'Spec Driven Development (SDD)', level: 4, description: 'Metodologia de desenvolvimento onde especificações estruturadas são a fonte da verdade para implementação assistida por IA.', category: 'Comunicação Técnica', type: 'hard' },
  { id: 'bmad', name: 'BMAD Method', level: 4, description: 'Framework de SDD focado em arquitetura e elicitação de requisitos complexos (Build More, Architect Dreams).', category: 'Comunicação Técnica', type: 'hard' },
  { id: 'gsd', name: 'GSD Framework', level: 4, description: 'Framework de SDD focado em execução ágil e redução de burocracia (Get Shit Done).', category: 'Comunicação Técnica', type: 'hard' },
  { id: 'harness', name: 'Harness Engineering', level: 3, description: 'Componente de SDD focado em testes, validação e loops de feedback contínuo para garantir a qualidade da especificação.', category: 'Comunicação Técnica', type: 'hard' },
  { id: 'storytelling', name: 'Storytelling de Dados', level: 4, description: 'Habilidade de transformar dados complexos em narrativas envolventes e compreensíveis para influenciar decisões estratégicas.', category: 'Comunicação Técnica', type: 'hard' },

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
  { id: 'data-lineage', name: 'Data Lineage', level: 3, description: 'Rastreamento da origem e transformação de dados', category: 'Governança de Dados', type: 'hard' },

  // IA Generativa
  { id: 'llm', name: 'LLM (Generative AI)', level: 4, description: 'Arquitetura e implementação de soluções com IA Generativa', category: 'IA Generativa', type: 'hard' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', level: 5, description: 'Otimização de prompts para LLMs e criação de patterns', category: 'IA Generativa', type: 'hard' },
  { id: 'rag', name: 'RAG', level: 4, description: 'Retrieval Augmented Generation para contexto expandido', category: 'IA Generativa', type: 'hard' },
  { id: 'agent-design', name: 'Agent Design', level: 4, description: 'Design e implementação de agentes autônomos', category: 'IA Generativa', type: 'hard' },
  { id: 'stackspot-ai', name: 'StackSpot AI', level: 4, description: 'Plataforma de desenvolvimento assistido por IA', category: 'IA Generativa', type: 'hard' },
  { id: 'devin', name: 'Devin', level: 4, description: 'Agente autônomo de desenvolvimento de software', category: 'IA Generativa', type: 'hard' },
  { id: 'github-copilot', name: 'GitHub Copilot', level: 4, description: 'Assistente de código baseado em IA', category: 'IA Generativa', type: 'hard' },
  { id: 'mas', name: 'MAS', level: 2, description: 'Multi-Agent Systems para orquestração de agentes', category: 'IA Generativa', type: 'hard' },
  { id: 'mcp-tools', name: 'MCP Tools', level: 2, description: 'Model Context Protocol para integração de ferramentas', category: 'IA Generativa', type: 'hard' },
  { id: 'copilot-studio', name: 'Copilot Studio', level: 3, description: 'Criação de copilotos e agentes especializados', category: 'IA Generativa', type: 'hard' },
  { id: 'copilot-365', name: 'Microsoft 365 Copilot', level: 3, description: 'Extensibilidade e integração com M365 Copilot', category: 'IA Generativa', type: 'hard' },
  { id: 'fluxo-sequencial', name: 'Fluxo Sequencial', level: 4, description: 'Orquestração de pipelines de LLM em etapas', category: 'IA Generativa', type: 'hard' },
  { id: 'langgraph', name: 'LangGraph', level: 3, description: 'Orquestração de agentes com grafos', category: 'IA Generativa', type: 'hard' },
  { id: 'langchain', name: 'LangChain', level: 3, description: 'Framework para desenvolvimento de aplicações LLM', category: 'IA Generativa', type: 'hard' },
  { id: 'aws-bedrock', name: 'AWS Bedrock', level: 4, description: 'Serviço gerenciado para modelos de IA generativa', category: 'IA Generativa', type: 'hard' },
  { id: 'bedrock-guardrails', name: 'Bedrock Guardrails', level: 4, description: 'Governança e segurança para modelos de IA', category: 'IA Generativa', type: 'hard' },

  // Prompt Patterns
  { id: 'prompt-pattern-persona', name: 'Pattern: Persona & Context', level: 5, description: 'Definição profunda de papel, tom de voz e contexto situacional para eliminar ambiguidades no output.', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-chain', name: 'Pattern: Chain of Thought (CoT)', level: 5, description: 'Indução de raciocínio sequencial e decomposição de problemas complexos em etapas lógicas antes da resposta final.', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-fewshot', name: 'Pattern: Few-Shot Prompting', level: 5, description: 'Fornecimento de exemplos estruturados de entrada/saída para condicionar o modelo a padrões específicos de resposta.', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-recipe', name: 'Pattern: Prompt Recipes', level: 5, description: 'Desenvolvimento de templates modulares e reutilizáveis (Blueprints) para automação de fluxos de trabalho recorrentes.', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-guardrail', name: 'Pattern: Negative Prompting & Guardrails', level: 5, description: 'Estabelecimento de restrições explícitas e limites éticos/técnicos para mitigar alucinações e garantir conformidade.', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-reflection', name: 'Pattern: Self-Reflection/Critique', level: 4, description: 'Técnica onde o modelo revisa seu próprio output para identificar erros e sugerir melhorias antes da entrega.', category: 'Prompt Patterns', type: 'hard' },
  { id: 'prompt-pattern-skeleton', name: 'Pattern: Skeleton-of-Thought', level: 4, description: 'Geração de uma estrutura (outline) primeiro para garantir coerência em textos longos e complexos.', category: 'Prompt Patterns', type: 'hard' },

  // Idiomas
  { id: 'portuguese', name: 'Português', level: 5, description: 'Fluência nativa', category: 'Idiomas', type: 'hard' },
  { id: 'english', name: 'Inglês', level: 4, description: 'Fluência profissional', category: 'Idiomas', type: 'hard' },
  { id: 'italian', name: 'Italiano', level: 2, description: 'Básico', category: 'Idiomas', type: 'hard' },

  // Segurança
  { id: 'security', name: 'Cyber Security', level: 3, description: 'Fundamentos de Segurança da Informação', category: 'Segurança', type: 'hard' },
  { id: 'sec-nist', name: 'NIST AI RMF', level: 2, description: 'Framework de governança e mitigação de risco de IA', category: 'Segurança', type: 'hard' },
  { id: 'sec-atlas', name: 'MITRE ATLAS', level: 2, description: 'Modelagem de ameaças e TTPs para ML', category: 'Segurança', type: 'hard' },

  // ==========================================
  // SOFT SKILLS
  // ==========================================

  // Cognitivas
  { id: 'critical-thinking', name: 'Pensamento Crítico', level: 4, description: 'Análise profunda de problemas e tomada de decisão baseada em dados.', category: 'Cognitivas', type: 'soft' },
  { id: 'complex-problem-solving', name: 'Resolução de Problemas Complexos', level: 4, description: 'Capacidade de abordar desafios multifacetados e desenvolver soluções inovadoras e eficazes.', category: 'Cognitivas', type: 'soft' },
  { id: 'adaptability', name: 'Adaptabilidade e Flexibilidade', level: 5, description: 'Ajuste rápido a novas situações, tecnologias ou prioridades, mantendo a eficácia.', category: 'Cognitivas', type: 'soft' },
  { id: 'proactivity', name: 'Proatividade e Iniciativa', level: 5, description: 'Antecipação de necessidades e busca constante por melhorias sem ser solicitado.', category: 'Cognitivas', type: 'soft' },
  { id: 'strategic-vision', name: 'Visão Estratégica', level: 4, description: 'Compreensão do cenário geral e alinhamento das ações diárias aos objetivos de longo prazo.', category: 'Cognitivas', type: 'soft' },
  { id: 'resilience', name: 'Resiliência', level: 4, description: 'Capacidade de se recuperar de adversidades e persistir diante de obstáculos.', category: 'Cognitivas', type: 'soft' },

  // Comunicação
  { id: 'assertive-communication', name: 'Comunicação Assertiva', level: 4, description: 'Expressão de ideias e opiniões de forma clara, direta e respeitosa.', category: 'Comunicação', type: 'soft' },
  { id: 'active-listening', name: 'Escuta Ativa', level: 3, description: 'Compreensão profunda da mensagem verbal e não verbal dos outros.', category: 'Comunicação', type: 'soft' },
  { id: 'presentation', name: 'Apresentação', level: 4, description: 'Apresentações técnicas e executivas impactantes.', category: 'Comunicação', type: 'soft' },
  { id: 'verbal-communication', name: 'Comunicação Verbal', level: 4, description: 'Clareza e assertividade na comunicação oral.', category: 'Comunicação', type: 'soft' },
  { id: 'empathy', name: 'Empatia', level: 5, description: 'Capacidade de se colocar no lugar do outro e validar sentimentos.', category: 'Comunicação', type: 'soft' },
  { id: 'nvc', name: 'CNV', level: 4, description: 'Comunicação Não-Violenta para resolução de conflitos.', category: 'Comunicação', type: 'soft' },
  { id: 'influence', name: 'Influência e Persuasão', level: 4, description: 'Capacidade de convencer outros utilizando argumentos lógicos e emocionais de forma ética.', category: 'Comunicação', type: 'soft' },
  { id: 'feedback', name: 'Feedback Construtivo', level: 4, description: 'Fornecimento e recepção de feedback focado no desenvolvimento contínuo.', category: 'Comunicação', type: 'soft' },

  // Liderança
  { id: 'leadership', name: 'Liderança', level: 4, description: 'Capacidade de inspirar e guiar equipes rumo a resultados excepcionais.', category: 'Liderança', type: 'soft' },
  { id: 'mentoring', name: 'Mentoria e Desenvolvimento', level: 4, description: 'Compartilhamento de conhecimento para guiar e desenvolver o crescimento de colegas.', category: 'Liderança', type: 'soft' },
  { id: 'situational-leadership', name: 'Liderança Situacional', level: 2, description: 'Ajuste do estilo de liderança de acordo com a maturidade e competência da equipe.', category: 'Liderança', type: 'soft' },
  { id: 'stakeholder-management', name: 'Gestão de Stakeholders', level: 3, description: 'Engajamento e gerenciamento de expectativas de partes interessadas críticas.', category: 'Liderança', type: 'soft' },

  // Relacionais
  { id: 'collaboration', name: 'Colaboração', level: 3, description: 'Trabalho efetivo em equipes multidisciplinares e valorização da diversidade de ideias.', category: 'Relacionais', type: 'soft' },
  { id: 'conflict-management', name: 'Gestão de Conflitos', level: 3, description: 'Intervenção e mediação de desentendimentos de forma construtiva.', category: 'Relacionais', type: 'soft' },
  { id: 'negotiation', name: 'Negociação', level: 4, description: 'Habilidade de dialogar para alcançar acordos mutuamente benéficos.', category: 'Relacionais', type: 'soft' },

  // Autogestão
  { id: 'time-management', name: 'Gestão do Tempo e Priorização', level: 4, description: 'Organização de tarefas e gerenciamento eficiente do tempo para cumprir prazos.', category: 'Autogestão', type: 'soft' },
  { id: 'emotional-intelligence', name: 'Inteligência Emocional', level: 3, description: 'Reconhecimento e gerenciamento das próprias emoções e as dos outros.', category: 'Autogestão', type: 'soft' },
  { id: 'self-awareness', name: 'Autoconsciência', level: 5, description: 'Compreensão profunda das próprias emoções, pontos fortes, fraquezas e motivações.', category: 'Autogestão', type: 'soft' },
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
  // ARQUIVADOS (Milestones anteriores ao plano de 8 anos)
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
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
    phase: 1,
    archived: true,
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
    relatedSkills: ['mentoring', 'technical-docs', 'collaboration'],
    relatedResources: ['mentoring'],
    phase: 1,
    archived: true,
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
    relatedSkills: ['aws', 's3', 'lambda'],
    relatedResources: ['cert-cloud-practitioner'],
    phase: 1,
    archived: true,
  },

  // ==========================================
  // ATIVOS - FASE 1: PLENO ANO 1 (2026-2027)
  // ==========================================
  {
    id: 'pdi-structure-2026',
    title: 'Estruturação do PDI 8 Anos',
    displayName: 'PDI 2026-2033: Pleno → Specialist',
    description: 'Estruturar o planejamento completo de 8 anos com milestones, referências e trilha de estudos SecMLOps',
    status: 'in-progress',
    progress: 15,
    deadline: '2026-09-30',
    startPosition: 0,
    endPosition: 12.5,
    notes: 'Base para acompanhamento estruturado da evolução de carreira',
    objectives: [
      { text: 'Definir todas as 7 fases do roadmap com objetivos claros', completed: false },
      { text: 'Mapear 20+ referências de estudo em SecMLOps/AI Security', completed: false },
      { text: 'Criar visualização interativa do PDI no React', completed: false },
      { text: 'Validar com Aline em 1:1 os marcos e KPIs', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'time-management', 'self-awareness', 'technical-docs'],
    relatedResources: [],
    phase: 1,
  },
  {
    id: 'ai-defense-foundations',
    title: 'Fundamentos de AI Defense Architecture',
    displayName: 'AI Defense & Runtime Guardrails',
    description: 'Estabelecer conhecimento em arquitetura de defesa para IA: guardrails, prompt injection, OWASP LLM Top 10',
    status: 'planned',
    progress: 0,
    deadline: '2027-03-31',
    startPosition: 0,
    endPosition: 12.5,
    notes: 'Primeiro passo para TECH-DEFENSE (ROADMAP Phase 1)',
    objectives: [
      { text: 'Prototipar 1 guardrail funcional detectando >= 3 tipos de prompt injection (jailbreak, role confusion, context overflow)', completed: false },
      { text: 'Documentar arquitetura de defesa mapeando 5+ vulnerabilidades OWASP LLM Top 10 para mitigações específicas', completed: false },
      { text: 'Apresentar em 1:1 com Aline: demo técnica + documento de arquitetura revisado', completed: false },
      { text: 'KPI: Guardrail bloqueia >= 80% dos ataques em dataset de teste adversarial', completed: false }
    ],
    relatedSkills: ['bedrock-guardrails', 'security', 'llm', 'prompt-engineering'],
    relatedResources: ['ref-owasp-llm-top10', 'ref-mitre-atlas', 'course-bedrock-guardrails'],
    phase: 1,
  },
  {
    id: 'model-supply-chain',
    title: 'Model Supply Chain Security',
    displayName: 'Supply Chain & Model Integrity',
    description: 'Implementar validação de integridade de modelos e rastreamento de proveniência',
    status: 'planned',
    progress: 0,
    deadline: '2027-05-31',
    startPosition: 0,
    endPosition: 12.5,
    notes: 'Uso de .safetensors e MLflow para governança',
    objectives: [
      { text: 'Implementar validação de hash SHA256 em 2+ modelos .safetensors com verificação automática no CI/CD', completed: false },
      { text: 'Configurar MLflow Model Registry para 1+ projeto tracking autor, dataset, HPO, métricas (accuracy, F1)', completed: false },
      { text: 'Documentar padrão de supply chain seguro com checklist de 10 itens para deploy de modelos em produção', completed: false },
      { text: 'KPI: 100% dos modelos em produção têm proveniência registrada e hash validado', completed: false }
    ],
    relatedSkills: ['mlops', 'security', 'python'],
    relatedResources: ['tool-safetensors', 'tool-mlflow-provenance', 'course-mlops-security'],
    phase: 1,
  },
  {
    id: 'ai-fomentation',
    title: 'Fomento ao Consumo de IA',
    displayName: 'Multiplicador de IA e Automação',
    description: 'Fomentar o consumo de soluções de IA e compartilhamento de recursos técnicos com a comunidade.',
    status: 'in-progress',
    progress: 45,
    deadline: '2026-12-31',
    startPosition: 0,
    endPosition: 12.5,
    notes: 'Criação de prompts padrão e automação de tarefas repetitivas.',
    objectives: [
      { text: 'Alcançar 10 estrelas no repositório de compartilhamento de skills e prompts', completed: false },
      { text: 'Mínimo de 3 contribuidores diferentes no repositório de compartilhamento', completed: false },
      { text: 'Realizar 3 agendas de compartilhamento prático sobre o uso de agentes', completed: false },
      { 
        text: 'Criar e documentar 5 novos patterns de prompt para uso do time', 
        completed: true,
        completionJustification: 'Criei skills voltadas à democratização de dados em fluxo ponta a ponta, contendo 13 skills. Além disso, apoiei na criação de um módulo de 18 skills de documentação e outro com 15 de design.'
      }
    ],
    relatedSkills: ['llm', 'prompt-engineering', 'agent-design', 'stackspot-ai', 'devin', 'github-copilot', 'prompt-pattern-persona', 'prompt-pattern-chain', 'prompt-pattern-fewshot', 'prompt-pattern-recipe', 'prompt-pattern-guardrail'],
    relatedResources: ['llm-course'],
    phase: 1,
    phase: 1,
  },


  // ==========================================
  // FASE 2: PLENO ANO 2 (2027-2028) - Promoção Pleno→Sênior mai/2027
  // ==========================================
  {
    id: 'governance-ai-pipelines',
    title: 'Governança de IA em Pipelines Core',
    displayName: 'AI Governance in Production',
    description: 'Aplicar governança de IA em 2+ projetos core com relatórios de conformidade',
    status: 'planned',
    progress: 0,
    deadline: '2027-12-31',
    startPosition: 12.5,
    endPosition: 25,
    notes: 'TECH-02 + PLENO-01 (ROADMAP Phase 2)',
    objectives: [
      { text: 'Implementar governança em 2 pipelines/projetos core', completed: false },
      { text: 'Gerar relatórios de conformidade automatizados', completed: false },
      { text: 'Validar cadeia de suprimentos com .safetensors', completed: false },
      { text: 'Estruturar arquitetura segura cobrindo OWASP Top 10 LLM', completed: false }
    ],
    relatedSkills: ['mlops', 'bedrock-guardrails', 'data-observability', 'security'],
    relatedResources: ['ref-owasp-llm-top10', 'course-mlops-security', 'course-bedrock-guardrails', 'tool-mlflow-provenance'],
    phase: 2,
  },
  {
    id: 'pleno-to-senior-prep',
    title: 'Preparação Promoção Sênior',
    displayName: 'Evidências para Promoção Sênior',
    description: 'Consolidar KPIs e evidências tangíveis para promoção Pleno→Sênior',
    status: 'planned',
    progress: 0,
    deadline: '2027-05-31',
    startPosition: 12.5,
    endPosition: 25,
    notes: 'Target: mai/2027',
    objectives: [
      { text: 'Registro estruturado de KPIs (entregas + comportamentos)', completed: false },
      { text: 'Feedback formal de liderança sobre autonomia técnica', completed: false },
      { text: 'Apresentação de evidências em 1:1 com Aline', completed: false },
      { text: 'Alinhamento com critérios de Sênior do Itaú', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'leadership', 'influence', 'technical-docs'],
    relatedResources: [],
    phase: 2,
  },

  // ==========================================
  // FASE 3: SÊNIOR ANO 1 (2028-2029)
  // ==========================================
  {
    id: 'corporate-architecture-design',
    title: 'Arquitetura Corporativa de Validação',
    displayName: 'Corporate AI Validation Architecture',
    description: 'Projetar arquitetura corporativa para validação de custos/segurança de IA',
    status: 'planned',
    progress: 0,
    deadline: '2028-12-31',
    startPosition: 25,
    endPosition: 37.5,
    notes: 'SENIOR-01 (ROADMAP Phase 3)',
    objectives: [
      { text: 'Projetar arquitetura corporativa aprovada pela liderança', completed: false },
      { text: 'Colocar arquitetura em produção com métricas de adoção', completed: false },
      { text: 'Documentar impacto mensurável em projetos', completed: false },
      { text: 'Reconhecimento no PRAD/Mérito 2029', completed: false }
    ],
    relatedSkills: ['api-architecture', 'mlops', 'strategic-vision', 'technical-docs'],
    relatedResources: ['books-arch-peaa', 'books-ana-ddia'],
    phase: 3,
  },
  {
    id: 'tech-leadership-critical',
    title: 'Liderança Técnica em Projeto Crítico',
    displayName: 'Tech Lead - Critical Project',
    description: 'Liderar tecnicamente 1 projeto crítico end-to-end com mentoria',
    status: 'planned',
    progress: 0,
    deadline: '2029-06-30',
    startPosition: 25,
    endPosition: 37.5,
    notes: 'SENIOR-02 parcial (ROADMAP Phase 3)',
    objectives: [
      { text: 'Liderança técnica de projeto crítico completo', completed: false },
      { text: 'Mentorar 1 analista júnior/pleno durante execução', completed: false },
      { text: 'Impacto técnico mensurável transcendendo a squad', completed: false },
      { text: 'Feedback positivo de liderança sobre mentoria', completed: false }
    ],
    relatedSkills: ['leadership', 'mentoring', 'stakeholder-management', 'technical-docs'],
    relatedResources: [],
    phase: 3,
  },

  // ==========================================
  // FASE 4: SÊNIOR ANO 2 (2029-2030)
  // ==========================================
  {
    id: 'cloud-security-certification',
    title: 'Certificação Cloud Security',
    displayName: 'CCSP ou AWS Security Specialty',
    description: 'Obter certificação de mercado em Cloud Security ou AI Security',
    status: 'planned',
    progress: 0,
    deadline: '2030-06-30',
    startPosition: 37.5,
    endPosition: 50,
    notes: 'SENIOR-02 completo + SENIOR-03 (ROADMAP Phase 4)',
    objectives: [
      { text: 'Concluir curso preparatório oficial', completed: false },
      { text: 'Realizar simulados com 85%+ de aproveitamento', completed: false },
      { text: 'Aprovação no exame de certificação', completed: false },
      { text: 'Reconhecimento no PRAD/Mérito 2030', completed: false }
    ],
    relatedSkills: ['security', 'aws', 'iam', 'vpc', 'critical-thinking'],
    relatedResources: ['cert-aws-security-specialty'],
    phase: 4,
  },
  {
    id: 'architectural-influence',
    title: 'Influência Arquitetural Multi-Squad',
    displayName: 'Cross-Squad Architecture Influence',
    description: 'Influenciar decisões arquiteturais em múltiplas squads',
    status: 'planned',
    progress: 0,
    deadline: '2030-12-31',
    startPosition: 37.5,
    endPosition: 50,
    notes: 'SENIOR-03 (ROADMAP Phase 4)',
    objectives: [
      { text: 'Participar de 10+ discussões arquiteturais inter-squads', completed: false },
      { text: 'Propor 3+ padrões adotados por outras squads', completed: false },
      { text: 'Evidências de liderança técnica reconhecida em avaliações', completed: false },
      { text: 'Consolidar padrão de mentoria e ownership', completed: false }
    ],
    relatedSkills: ['influence', 'leadership', 'api-architecture', 'stakeholder-management'],
    relatedResources: [],
    phase: 4,
  },

  // ==========================================
  // FASE 5: TRANSIÇÃO SÊNIOR→SPECIALIST (2030-2031)
  // ==========================================
  {
    id: 'red-teaming-framework',
    title: 'Red Teaming AI Framework',
    displayName: 'Adversarial ML & Red Teaming',
    description: 'Desenvolver framework de Red Teaming em IA (Adversarial ML, evasão, extração)',
    status: 'planned',
    progress: 0,
    deadline: '2031-06-30',
    startPosition: 50,
    endPosition: 62.5,
    notes: 'SPEC-01 (ROADMAP Phase 5)',
    objectives: [
      { text: 'Projetar framework tático de Red Teaming adaptado ao Itaú', completed: false },
      { text: 'Testar e mitigar métodos de Evasão/Inversão em modelos', completed: false },
      { text: 'Documentar playbook com casos reais do banco', completed: false },
      { text: 'Aprovação da liderança executiva para implementação', completed: false }
    ],
    relatedSkills: ['security', 'mlops', 'critical-thinking', 'strategic-vision'],
    relatedResources: ['books-sec-practical-llm-security', 'ref-mitre-atlas', 'course-adversarial-ml'],
    phase: 5,
  },
  {
    id: 'specialist-promotion-prep',
    title: 'Preparação Promoção Specialist',
    displayName: 'Evidências para Specialist',
    description: 'Consolidar evidências de impacto organizacional e expertise avançada',
    status: 'planned',
    progress: 0,
    deadline: '2031-05-31',
    startPosition: 50,
    endPosition: 62.5,
    notes: 'Target: promoção Sênior→Specialist 2030-2031',
    objectives: [
      { text: 'Framework Red Teaming reconhecido como padrão corporativo', completed: false },
      { text: 'Evidências de impacto organizacional amplo', completed: false },
      { text: 'Reconhecimento no PRAD/Mérito 2031', completed: false },
      { text: 'Alinhamento com critérios de Specialist do Itaú', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'influence', 'leadership', 'technical-docs'],
    relatedResources: [],
    phase: 5,
  },

  // ==========================================
  // FASE 6: SPECIALIST ANO 1 (2031-2032)
  // ==========================================
  {
    id: 'nist-ai-rmf-implementation',
    title: 'NIST AI RMF Corporate Implementation',
    displayName: 'NIST AI RMF Framework',
    description: 'Liderar adequação arquitetural baseada no NIST AI RMF',
    status: 'planned',
    progress: 0,
    deadline: '2032-06-30',
    startPosition: 62.5,
    endPosition: 75,
    notes: 'SPEC-02 (ROADMAP Phase 6)',
    objectives: [
      { text: 'Liderar adequação arquitetural corporativa NIST AI RMF', completed: false },
      { text: 'Transformar framework em padrão oficial do Itaú', completed: false },
      { text: 'Ditar diretrizes arquiteturais estratégicas', completed: false },
      { text: 'Impacto reconhecido pela diretoria de Cyber Security', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'influence', 'security', 'stakeholder-management'],
    relatedResources: ['ref-nist-ai-rmf', 'books-sec-ai-risk'],
    phase: 6,
  },
  {
    id: 'advanced-governance',
    title: 'Governança Técnica Avançada',
    displayName: 'Advanced AI Security Governance',
    description: 'Consolidar governança técnica avançada como padrão corporativo',
    status: 'planned',
    progress: 0,
    deadline: '2032-12-31',
    startPosition: 62.5,
    endPosition: 75,
    notes: 'SPEC-02 (ROADMAP Phase 6)',
    objectives: [
      { text: 'Padrões de governança adotados em 5+ squads', completed: false },
      { text: 'Métricas de impacto documentadas', completed: false },
      { text: 'Reconhecimento no PRAD/Mérito 2032', completed: false },
      { text: 'Apresentação para diretoria executiva', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'influence', 'leadership', 'presentation'],
    relatedResources: ['ref-nist-ai-rmf', 'books-sec-ai-risk'],
    phase: 6,
  },

  // ==========================================
  // FASE 7: SPECIALIST ANO 2 (2032-2033)
  // ==========================================
  {
    id: 'executive-presence',
    title: 'Impacto Executivo e Reconhecimento',
    displayName: 'Executive Impact & Recognition',
    description: 'Consolidar reconhecimento como referência técnica através de impacto executivo',
    status: 'planned',
    progress: 0,
    deadline: '2033-06-30',
    startPosition: 75,
    endPosition: 87.5,
    notes: 'SPEC-03 (ROADMAP Phase 7)',
    objectives: [
      { text: 'Realizar 3+ apresentações executivas/técnicas', completed: false },
      { text: 'Demonstrar resiliência das políticas com métricas', completed: false },
      { text: 'Consolidar reconhecimento interno como referência AI Security', completed: false },
      { text: 'Estabelecer presença externa (palestras, artigos)', completed: false }
    ],
    relatedSkills: ['presentation', 'influence', 'strategic-vision', 'storytelling'],
    relatedResources: [],
    phase: 7,
  },
  {
    id: 'specialist-consolidation',
    title: 'Consolidação como Specialist',
    displayName: 'AI Security Specialist - Consolidation',
    description: 'Consolidar posição como AI Security Specialist no Itaú e no mercado',
    status: 'planned',
    progress: 0,
    deadline: '2033-12-31',
    startPosition: 75,
    endPosition: 100,
    notes: 'SPEC-03 (ROADMAP Phase 7)',
    objectives: [
      { text: 'Impacto executivo consolidado', completed: false },
      { text: 'Reconhecimento externo estabelecido', completed: false },
      { text: 'PRAD/Mérito 2033: consolidação final', completed: false },
      { text: 'Meta de 8 anos alcançada', completed: false }
    ],
    relatedSkills: ['strategic-vision', 'leadership', 'influence', 'presentation'],
    relatedResources: [],
    phase: 7,
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
    status: 'in-progress',
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
    image: '/assets/img/books/ddd.jpg',
    relatedSkills: ['technical-docs', 'data-contracts'],
    relatedMilestones: [],
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
    status: 'completed',
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
    status: 'deprioritized',
    parentCategory: 'Certificação',
    category: 'Segurança',
    subCategory: 'Segurança',
    image: '/assets/img/comptiasec.png',
    relatedSkills: ['critical-thinking', 'technical-docs', 'iam'],
    relatedMilestones: ['cert-security'],
  },
  {
    id: 'cert-api-owner',
    name: 'API Owner Certification',
    description: 'Trilha completa de governança e design de APIs.',
    status: 'completed',
    parentCategory: 'Certificação',
    category: 'APIs',
    subCategory: 'Arquitetura',
    image: '/assets/img/certification-favicon.svg',
    relatedSkills: ['openapi', 'api-design', 'api-contracts'],
    relatedMilestones: ['cert-api-owner'],
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
    relatedMilestones: [],
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
    relatedMilestones: ['ai-fomentation'],
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
    relatedMilestones: [],
  },

  // ==========================================
  // REFERÊNCIAS SECMLOPS / AI SECURITY
  // ==========================================

  // Livros - AI Security
  {
    id: 'books-sec-practical-llm-security',
    name: 'Not With A Bug, But With A Sticker',
    description: 'Ram Shankar Siva Kumar & Hyrum Anderson - Ataques adversariais em ML e defesas práticas',
    status: 'not-started',
    parentCategory: 'Livros',
    category: 'Livros de AI Security',
    subCategory: 'AI Security',
    image: '',
    relatedSkills: ['security', 'mlops', 'critical-thinking'],
    relatedMilestones: ['ai-defense-foundations', 'red-teaming-framework'],
  },
  {
    id: 'books-sec-ai-risk',
    name: 'AI Risk Management',
    description: 'NIST AI 100-1 companion guide - Gerenciamento de riscos em sistemas de IA',
    status: 'not-started',
    parentCategory: 'Livros',
    category: 'Livros de AI Security',
    subCategory: 'AI Governance',
    image: '',
    relatedSkills: ['security', 'strategic-vision'],
    relatedMilestones: ['nist-ai-rmf-implementation', 'advanced-governance'],
  },

  // Frameworks & Standards
  {
    id: 'ref-owasp-llm-top10',
    name: 'OWASP Top 10 for LLMs',
    description: 'Top 10 vulnerabilidades em aplicações LLM - guia de referência para mitigações',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'Frameworks',
    relatedSkills: ['security', 'llm', 'bedrock-guardrails'],
    relatedMilestones: ['ai-defense-foundations', 'governance-ai-pipelines'],
  },
  {
    id: 'ref-mitre-atlas',
    name: 'MITRE ATLAS Framework',
    description: 'Adversarial Threat Landscape for AI Systems - taxonomia de ataques contra ML',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'Frameworks',
    relatedSkills: ['security', 'mlops', 'critical-thinking'],
    relatedMilestones: ['ai-defense-foundations', 'red-teaming-framework'],
  },
  {
    id: 'ref-nist-ai-rmf',
    name: 'NIST AI Risk Management Framework',
    description: 'AI 100-1 - Framework oficial de gestão de riscos de IA do NIST',
    status: 'not-started',
    parentCategory: 'Curso',
    category: 'AI Security',
    subCategory: 'Frameworks',
    relatedSkills: ['security', 'strategic-vision', 'stakeholder-management'],
    relatedMilestones: ['nist-ai-rmf-implementation', 'advanced-governance'],
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
