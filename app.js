const userData = {
    user_info: {
        name: "Gustavo Soldera",
        age: null,
        current_role: "Engenheiro de Analytics JR",
        target_role: "Engenheiro de Analytics PL",
        company: "Itaú Unibanco",
        area: "Cyber Security",
        timeline: "12 meses",
        certification_date: "Julho/Agosto 2025"
    },
    hard_skills: [
        {name: "SQL", level: 5, description: "Linguagem avançada para consultas e modelagem", category: "Desenvolvimento"},
        {name: "Python", level: 5, description: "Programação e análise de dados", category: "Desenvolvimento"},
        {name: "HTML/CSS", level: 5, description: "Conhecimento básico para front-end", category: "Desenvolvimento"},
        {name: "JavaScript", level: 4, description: "Programação para web", category: "Desenvolvimento"},
        {name: "TypeScript", level: 4, description: "Tipagem estática para front-end e APIs", category: "Desenvolvimento"},
        {name: "Angular", level: 3, description: "Framework front-end para aplicações web", category: "Desenvolvimento"},
        {name: "Amazon QuickSight", level: 5, description: "Ferramenta de BI do banco", category: "Analytics & BI"},
        {name: "PySpark", level: 4, description: "Processamento de big data", category: "Analytics & BI"},
        {name: "Modelagem de Dados", level: 4, description: "Design e estruturação de modelos", category: "Analytics & BI"},
        {name: "Glue Data Quality", level: 5, description: "Validação automatizada de dados em pipelines Glue", category: "Data Quality"},
        {name: "Deequ", level: 3, description: "Checks de qualidade de dados em escala", category: "Data Quality"},
        {name: "Data Observability (Datadog)", level: 4, description: "Alertas e métricas de saúde de dados e pipelines", category: "Data Quality"},
        {name: "Data Contracts", level: 2, description: "Definição de esquemas e SLAs para produtores/consumidores", category: "Governança de Dados"},
        {name: "Data Lineage", level: 2, description: "Mapeamento de origem-impacto e rastreabilidade de dados", category: "Governança de Dados"},
        {name: "AWS Glue", level: 5, description: "ETL e integração de dados", category: "Cloud & Data"},
        {name: "AWS S3", level: 4, description: "Armazenamento de dados na nuvem", category: "Cloud & Data"},
        {name: "AWS Step Functions", level: 3, description: "Orquestração de workflows", category: "Cloud & Data"},
        {name: "AWS Lambda", level: 4, description: "Execução serverless para integrações e automações", category: "Cloud & Data"},
        {name: "AWS ECS", level: 3, description: "Containers gerenciados para workloads de dados", category: "Cloud & Data"},
        {name: "AWS EMR", level: 3, description: "Processamento distribuído gerenciado", category: "Cloud & Data"},
        {name: "AWS CloudFront", level: 4, description: "Entrega de conteúdo e microfrontends", category: "Cloud & Data"},
        {name: "AWS Microfrontends", level: 3, description: "Arquitetura distribuída de frontends na AWS", category: "Cloud & Data"},
        {name: "Terraform", level: 4, description: "Infraestrutura como código", category: "Cloud & Data"},
        {name: "Kafka/Mensageria", level: 2, description: "Streaming de dados em tempo real", category: "Cloud & Data"},
        {name: "Prompt Engineering", level: 4, description: "Design e avaliação sistemática de prompts", category: "LLM"},
        {name: "Fluxo Sequencial", level: 3, description: "Orquestração de pipelines de LLM em etapas", category: "LLM"},
        {name: "MAS (Multi-Agent Systems)", level: 3, description: "Desenho e coordenação de agentes especializados", category: "LLM"},
        {name: "RAG", level: 4, description: "Recuperação aumentada por contexto em produção", category: "LLM"},
        {name: "MCP Tools (Consumo e Criação)", level: 3, description: "Integração e authoring de ferramentas MCP", category: "LLM"},
        {name: "StackSpot AI", level: 4, description: "Construção e governança de soluções com StackSpot AI", category: "LLM"},
        {name: "Copilot Studio", level: 3, description: "Automação e copilotos especializados", category: "LLM"},
        {name: "Agent Design", level: 4, description: "Planejamento e arquitetura de agentes especializados", category: "LLM"},
        {name: "AWS CodeBuild", level: 4, description: "Builds automatizados e artefatos versionados", category: "CI/CD & Testes"},
        {name: "AWS CodePipeline", level: 3, description: "Orquestração de etapas de entrega contínua", category: "CI/CD & Testes"},
        {name: "GitHub Actions", level: 4, description: "CI/CD como código para repositórios GitHub", category: "CI/CD & Testes"},
        {name: "SonarQube", level: 4, description: "Qualidade contínua e análise estática", category: "CI/CD & Testes"},
        {name: "Vercel", level: 3, description: "Deploy contínuo de frontends e edge functions", category: "CI/CD & Testes"},
        {name: "Railway", level: 3, description: "Deploy rápido de serviços e automações", category: "CI/CD & Testes"},
        {name: "Linters", level: 4, description: "Padronização e qualidade contínua em pipelines", category: "CI/CD & Testes"},
        {name: "Testes Automatizados", level: 4, description: "Estratégia de testes end-to-end e integração contínua", category: "CI/CD & Testes"},
        {name: "Testes Unitários", level: 4, description: "Cobertura de componentes críticos com mocks e stubs", category: "CI/CD & Testes"},
        {name: "FinOps", level: 3, description: "Otimização de custos de pipelines e workloads", category: "FinOps"},
        {name: "Kubernetes", level: 4, description: "Gerenciamento de containers", category: "DevOps"},
        {name: "Docker", level: 3, description: "Containerização de aplicações", category: "DevOps"},
        {name: "Figma", level: 4, description: "Ferramenta de design de interfaces", category: "Design & UX"},
        {name: "UX", level: 3, description: "Engenharia de usabilidade", category: "Design & UX"},
        {name: "Documentação Técnica", level: 5, description: "Doc Advocate", category: "Comunicação"},
        {name: "Português", level: 5, description: "Conhecimento técnico, escrita e conversação", category: "Idiomas"},
        {name: "Inglês", level: 4, description: "Conhecimento técnico, escrita e conversação", category: "Idiomas"},
        {name: "Italiano", level: 1, description: "Conhecimento técnico, escrita e conversação", category: "Idiomas"}
    ],
    soft_skills: [
        {name: "Pensamento Crítico", level: 5, description: "Análise e resolução de problemas", category: "Cognitivas"},
        {name: "Liderança", level: 4, description: "Capacidade de guiar equipes", category: "Liderança"},
        {name: "Apresentação", level: 4, description: "Comunicação para audiências", category: "Comunicação"},
        {name: "Comunicação Verbal", level: 4, description: "Expressão oral clara", category: "Comunicação"},
        {name: "Colaboração", level: 4, description: "Trabalho em equipe eficaz", category: "Relacionais"},
        {name: "Gestão de Conflitos", level: 3, description: "Resolução de divergências", category: "Relacionais"},
        {name: "Escuta Ativa", level: 3, description: "Área prioritária de desenvolvimento", category: "Comunicação"},
        {name: "Empatia na Comunicação", level: 3, description: "Considerar perspectiva dos outros", category: "Relacionais"},
        {name: "Comunicação Não-Violenta", level: 4, description: "Técnicas de comunicação respeitosa", category: "Comunicação"},
        {name: "Storytelling com Dados", level: 4, description: "Narrativa orientada a decisão para stakeholders", category: "Comunicação"}
    ],
    milestones: [
        {
            id: 1,
            title: "Certificação Profissional",
            description: "Completar prova de engenheiro de analytics",
            deadline: "2025-08-15",
            status: "concluido",
            progress: 100,
            note: "Aprovação em 11/09/2025 e aplicação imediata nos fluxos do Insight Guard (modelagem e automações).",
            skills: ["SQL", "Python", "Modelagem de Dados", "PySpark", "Amazon QuickSight"],
            resources: [3, 5, 9]
        },
        {
            id: 2,
            title: "Soft Skills",
            description: "Receber feedback positivo de pelo menos 3 colegas sobre melhoria na escuta",
            deadline: "2025-08-30",
            status: "concluido",
            progress: 100,
            note: "Feedback formal de 3 colegas registrando evolução em escuta ativa e comunicação empática.",
            skills: ["Comunicação Verbal", "Escuta Ativa", "Empatia na Comunicação", "Comunicação Não-Violenta", "Colaboração", "Gestão de Conflitos"],
            resources: [1, 2]
        },
        {
            id: 3,
            title: "Liderar Projetos de Impacto",
            description: "Atuação chave em pelo menos 2 projetos significativos",
            deadline: "2025-09-30",
            status: "concluido",
            progress: 100,
            note: "Liderança no Insight Guard (frontend) e padronizações; guilda reconheceu entregas como referência.",
            skills: ["Liderança", "Pensamento Crítico", "Apresentação", "Colaboração"],
            resources: [2, 5]
        },
        {
            id: 5,
            title: "Certificação Comptia Security+",
            description: "Estudar e realizar prova para certificação Comptia Security+",
            deadline: "2026-03-30",
            status: "em_progresso",
            progress: 30,
            skills: ["AWS S3", "AWS Step Functions", "Terraform", "Kafka/Mensageria", "Kubernetes"],
            resources: [7, 8]
        },
        {
            id: 6,
            title: "Certificação AWS Cloud Practitioner",
            description: "Completar prova para certificação AWS Cloud Practitioner",
            deadline: "2026-03-30",
            status: "nao_iniciado",
            progress: 0,
            skills: ["AWS Glue", "AWS S3", "AWS Step Functions", "Terraform"],
            resources: [7]
        },
        {
            id: 7,
            title: "Mentorar Colegas",
            description: "Orientar 1 membro da equipe/comunidade que queira se aperfeiçoar na área",
            deadline: "2025-10-31",
            status: "concluido",
            progress: 100,
            note: "Apoiei Isabelli com conhecimentos técnicos, evolução de hard skills e PDI até conclusão.",
            skills: ["Liderança", "Colaboração", "Pensamento Crítico", "Escuta Ativa", "Empatia na Comunicação"],
            resources: [2]
        },
        {
            id: 9,
            title: "FinOps na Consumer",
            description: "Reduzir 30% do custo do Glue Job consumer via Flex Execution",
            deadline: "2026-01-20",
            status: "concluido",
            progress: 100,
            note: "Alvo: -30% de custo por execução aplicando Flex Execution e tuning de recursos.",
            skills: ["FinOps", "AWS Glue", "PySpark"],
            resources: [7]
        },
        {
            id: 8,
            title: "Workshops e Palestras",
            description: "Agendar e apresentar 3 pautas/palestras internas",
            deadline: "2026-02-20",
            status: "em_progresso",
            progress: 66,
            note: "66% concluído com guildas do Devin e agendas de inovação em andamento.",
            skills: ["Apresentação", "Comunicação Verbal", "Pensamento Crítico"],
            resources: [5]
        }
    ],
    portfolio: [
        {
            title: "InsightGuard",
            description: "Microfrontend para centralização e padronização de jornada, interface para embarcação de agentes e sistemas, DNS via CloudFront, observabilidade Datadog e backend em andamento com desenho de arquitetura.",
            status: "em_desenvolvimento",
            impact: "Em breve",
            technologies: ["HTML/CSS", "Javascript", "Sass", "AWS", "Terraform", "Angular", "CloudFront", "Datadog", "Microfrontends"],
            skills: ["HTML/CSS", "JavaScript", "TypeScript", "Angular", "AWS CloudFront", "AWS Microfrontends", "Terraform", "Data Observability (Datadog)", "Documentação Técnica", "Testes Automatizados", "Testes Unitários", "Linters", "SonarQube"],
            milestones: [3, 8],
            resources: [5, 11, 12]
        },
        {
            title: "User Behavior (Comportamento Anômalo)",
            description: "Engenharia de ML transformando notebooks em aplicação escalável em Lambda (Python) com democratização de resultados.",
            status: "concluido",
            impact: "Em breve",
            technologies: ["Python", "AWS Lambda", "API Gateway", "MLOps", "CI/CD"],
            skills: ["Python", "AWS Lambda", "GitHub Actions", "Testes Automatizados", "Testes Unitários", "Linters", "SonarQube", "MLOps"],
            milestones: [3],
            resources: [10]
        },
        {
            title: "Agente Leila (Fluxo Sequencial)",
            description: "Apoio no desenvolvimento da agente para analisar normativos de Segurança da Informação e extrair requisitos de SI, usando fluxos do Power Automate, tópicos, conhecimentos e prompt engineering; deploy no Teams e 365 Copilot via Copilot Studio.",
            status: "concluido",
            impact: "~80% de redução do tempo de análise de normativos de Segurança da Informação",
            technologies: ["Power Automate", "Prompt Engineering", "Copilot Studio", "Microsoft 365 Copilot", "Teams", "LLM", "Topics"],
            skills: ["Prompt Engineering", "Fluxo Sequencial", "Copilot Studio", "RAG", "Agent Design"],
            milestones: [3, 8],
            resources: [1, 5]
        },
        {
            title: "Engenharia de Dados",
            description: "Desenvolvimento de tabelas em producer, consumer, e consultorias de democratização",
            status: "em_progresso",
            impact: "-30% no tempo de entrega de tabelas spec, -30% de custos em gluejob na consumer através de Flex Execution e +99% de sucesso dos jobs críticos",
            technologies: ["SQL", "Python", "AWS Glue", "PySpark", "Terraform"],
            skills: ["SQL", "Python", "AWS Glue", "AWS S3", "PySpark", "Modelagem de Dados", "FinOps"],
            milestones: [9],
            resources: [2, 5, 9, 12]
        },
        {
            title: "Padronização de Dashboards",
            description: "Apoiando times na modernização e liderando padronização de design de dashboards na comunidade Cyber Security",
            status: "em_progresso",
            impact: "-40% no tempo de produção de dashboards e aderência ao Itaú Design System nos times",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"],
            skills: ["Amazon QuickSight", "Figma", "UX", "Storytelling com Dados"],
            milestones: [3, 8],
            resources: [5, 11]
        },
        {
            title: "IAM Analytics",
            description: "Padrão de visual para dashboards de Acessos (IAM)",
            status: "concluido",
            impact: "Aderência ao Itaú Design System e -30% no tempo de construção de dashboards nos times de Acessos",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"],
            skills: ["Amazon QuickSight", "Figma", "Design Systems"],
            milestones: [3],
            resources: [5]
        },
        {
            title: "Cyber Insights",
            description: "Padrão de visual para dashboards de Cyber Defense",
            status: "concluido",
            impact: "Aderência ao Itaú Design System e -30% no tempo de construção de dashboards nos times de Cyber Security",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"],
            skills: ["Amazon QuickSight", "Figma", "Design Systems"],
            milestones: [3],
            resources: [5]
        },
        {
            title: "Observability360",
            description: "Padrão de visual para dashboards de indicadores da comunidade",
            status: "concluido",
            impact: "Identidade unificada e -30% no tempo de construção de dashboards nos indicadores da comunidade",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"],
            skills: ["Amazon QuickSight", "Figma", "Design Systems", "Data Observability (Datadog)"],
            milestones: [3],
            resources: [5, 12]
        }
    ],
    learning_resources: [
        {
            id: 1,
            name: "Livros sobre Comunicação",
            resources: [
                { name: "Comunicação Não-Violenta", description: "Um guia para melhorar a comunicação interpessoal.", status: "concluido", image: "assets/img/books/cnv.jpg" },
                { name: "Como Fazer Amigos e Influenciar Pessoas", description: "Clássico sobre habilidades sociais.", status: "em_progresso", image: "assets/img/books/cfaip.jpg" },
                { name: "Crucial Conversations", description: "Técnicas para lidar com conversas difíceis.", status: "nao_iniciado", image: "assets/img/books/cc.jpg" }
            ],
            relatedSkills: ["Apresentação", "Comunicação Verbal", "Escuta Ativa", "Empatia na Comunicação", "Comunicação Não-Violenta"],
            relatedMilestones: [2, 7, 8]
        },
        {
            id: 2,
            name: "Mentoria com Senior Engineers",
            resources: [
                { name: "Henrique Vieira", description: "Mentor em engenharia de dados e carreira", status: "em_progresso", image: "assets/img/mentor-henrique.png" },
                { name: "Em breve", description: "Mentor em engenharia de analytics.", status: "nao_iniciado", image: "assets/img/mentor.png" }
            ],
            relatedSkills: ["SQL", "Python", "Modelagem de Dados", "AWS Glue", "Terraform", "Liderança", "Pensamento Crítico", "Colaboração"],
            relatedMilestones: [1, 3, 7]
        },
        {
            id: 3,
            name: "Certificação Analytics Engineer",
            resources: [
                { name: "Curso Preparatório", description: "Curso online para preparação da certificação.", status: "concluido", image: "assets/img/professionalea.webp" }
            ],
            relatedSkills: ["SQL", "Python", "Modelagem de Dados", "PySpark", "Amazon QuickSight"],
            relatedMilestones: [1]
        },
        {
            id: 5,
            name: "Livros de Analytics",
            resources: [
                { name: "Storytelling with Data", description: "Um guia para apresentação de dados.", status: "concluido", image: "assets/img/books/swd.jpg" },
                { name: "Data Science for Business", description: "Fundamentos de ciência de dados para negócios.", status: "nao_iniciado", image: "assets/img/books/dsfb.jpg" },
                { name: "The Art of Data Science", description: "Um guia para análise de dados.", status: "nao_iniciado", image: "assets/img/books/tads.jpg" }
            ],
            relatedSkills: ["Amazon QuickSight", "Modelagem de Dados", "PySpark", "LLM e Agentes", "Storytelling com Dados"],
            relatedMilestones: [1, 3, 8]
        },
        {
            id: 6,
            name: "Curso de DevOps",
            resources: [
                { name: "DevOps Fundamentals", description: "Curso introdutório sobre práticas de DevOps.", status: "nao_iniciado", image: "assets/img/devops.jpg" }
            ],
            relatedSkills: ["Docker", "Kubernetes", "Terraform"],
            relatedMilestones: []
        },
        {
            id: 7,
            name: "Certificação de Cloud",
            resources: [
                { name: "AWS Cloud Practitioner", description: "Preparação para a certificação AWS Foundational.", status: "nao_iniciado", image: "assets/img/awspractitioner.webp" },
                { name: "AWS Certified Solutions Architect", description: "Preparação para a certificação AWS Associate.", status: "nao_iniciado", image: "assets/img/aws.png" }
            ],
            relatedSkills: ["AWS Glue", "AWS S3", "AWS Step Functions", "Terraform", "Kubernetes"],
            relatedMilestones: [5, 6]
        },
        {
            id: 8,
            name: "Certificação de Cyber Security",
            resources: [
                { name: "CompTIA Security+", description: "Curso preparatório para a certificação CompTIA Security+.", status: "em_progresso", image: "assets/img/comptiasec.png" }
            ],
            relatedSkills: ["AWS Step Functions", "Kafka/Mensageria", "Kubernetes", "Terraform"],
            relatedMilestones: [5]
        },
        {
            id: 9,
            name: "Livros de Engenharia de Dados",
            resources: [
                { name: "Designing Data-Intensive Applications", description: "Um guia para aplicações intensivas em dados.", status: "nao_iniciado", image: "assets/img/books/ddia.jpg" },
                { name: "Data Mesh", description: "Arquitetura de dados para empresas modernas.", status: "nao_iniciado", image: "assets/img/books/dm.jpg" }
            ],
            relatedSkills: ["AWS Glue", "AWS S3", "Modelagem de Dados", "Kafka/Mensageria", "PySpark"],
            relatedMilestones: [1, 5]
        },
        {
            id: 10,
            name: "Livros de Engenharia de Software",
            resources: [
                { name: "Clean Code", description: "Um manual de artesanato de software.", status: "nao_iniciado", image: "assets/img/books/cco.jpg" },
                { name: "The Pragmatic Programmer", description: "Dicas e truques para programadores.", status: "nao_iniciado", image: "assets/img/books/tpp.jpg" }
            ],
            relatedSkills: ["Python", "JavaScript", "Terraform", "Docker"],
            relatedMilestones: [3]
        },
        {
            id: 11,
            name: "Livros de Arquitetura de Sistemas",
            resources: [
                { name: "Domain-Driven Design", description: "Tackling Complexity in the Heart of Software.", status: "concluido", image: "assets/img/books/ddd.jpg" },
                { name: "Patterns of Enterprise Application Architecture", description: "Padrões de arquitetura para aplicações empresariais.", status: "nao_iniciado", image: "assets/img/books/peaa.jpg" }
            ],
            relatedSkills: ["AWS Glue", "AWS Step Functions", "Terraform", "Kubernetes", "Modelagem de Dados"],
            relatedMilestones: [5]
        },
        {
            id: 12,
            name: "Data Quality & Observability",
            resources: [
                { name: "Glue Data Quality", description: "Configuração de regras e monitoramento de qualidade no Glue.", status: "nao_iniciado", image: "assets/img/devops.jpg" },
                { name: "Deequ", description: "Checks de qualidade de dados em escala.", status: "nao_iniciado", image: "assets/img/devops.jpg" },
                { name: "Datadog para Dados", description: "Dashboards e alertas de pipelines e freshness.", status: "nao_iniciado", image: "assets/img/devops.jpg" }
            ],
            relatedSkills: ["Glue Data Quality", "Deequ", "Data Observability (Datadog)", "Data Contracts", "Data Lineage"],
            relatedMilestones: [5, 6, 9]
        }
    ]
};

// Macro grouping for skill categories
const categoryMacroMap = {
    "Cloud & Data": "Plataforma & Pipelines",
    "CI/CD & Testes": "Plataforma & Pipelines",
    "Analytics & BI": "Visualização & Experiência",
    "Design & UX": "Visualização & Experiência",
    "Data Quality": "Qualidade & Confiabilidade",
    "Governança de Dados": "Governança & Produto de Dados",
    "LLM": "LLM & Agentes",
    "FinOps": "FinOps"
};

const macroOrder = [
    "Plataforma & Pipelines",
    "Qualidade & Confiabilidade",
    "LLM & Agentes",
    "Visualização & Experiência",
    "Governança & Produto de Dados",
    "FinOps",
    "Outros"
];

// Global variables
let currentView = 'timeline';
let currentTheme = null;
let openPortfolioCardId = null;

// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Get saved theme from localStorage or detect system preference
        const storageKey = (typeof CONFIG !== 'undefined' && CONFIG.themeStorageKey) ? CONFIG.themeStorageKey : 'pdi-theme';
        const savedTheme = localStorage.getItem(storageKey);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            this.currentTheme = systemPrefersDark ? 'dark' : 'light';
        }
        
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('pdi-theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        const storageKey = (typeof CONFIG !== 'undefined' && CONFIG.themeStorageKey) ? CONFIG.themeStorageKey : 'pdi-theme';
        localStorage.setItem(storageKey, this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Add smooth transition for theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager first
    const themeManager = new ThemeManager();
    
    // Initialize other components
    hydrateUserInfo();
    renderSkills();
    renderMilestones();
    renderPortfolio();
    renderLearningResources();
    updateProgressStats();
    setLastUpdateDate();
    setupEventListeners();
    updateDaysRemaining();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

function hydrateUserInfo() {
    if (typeof CONFIG !== 'undefined' && CONFIG.birthDate) {
        userData.user_info.age = calculateAge(CONFIG.birthDate);
    }

    const ageBadge = document.getElementById('age-badge');
    if (ageBadge && userData.user_info.age !== null) {
        ageBadge.textContent = `${userData.user_info.age} anos`;
    }
}

function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function calculateDaysRemaining(deadline) {
    let targetDate;
    if (deadline) {
        targetDate = new Date(deadline);
    } else {
        if (typeof CONFIG !== 'undefined' && CONFIG.timelineTarget) {
            targetDate = new Date(CONFIG.timelineTarget);
        } else {
            targetDate = new Date(2026, 5, 1);
        }
    }
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
}

function updateDaysRemaining() {
    const daysRemaining = calculateDaysRemaining();
    const element = document.getElementById('timeline-days-remaining');
    if (element) {
        element.textContent = daysRemaining;
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Skills card flip
    const skillsCard = document.getElementById('skills-card');
    if (skillsCard) {
        skillsCard.addEventListener('click', () => {
            skillsCard.classList.toggle('flipped');
        });
    }

    // View switch buttons
    const switchButtons = document.querySelectorAll('.switch-btn');
    switchButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const newView = e.target.dataset.view;
            switchView(newView);
        });
    });

    // Modal close on outside click
    window.addEventListener('click', (event) => {
        const milestoneModal = document.getElementById('milestone-modal');
        const skillModal = document.getElementById('skill-info-modal');
        const categoryModal = document.getElementById('category-modal');
        
        if (event.target === milestoneModal) {
            closeModal();
        }
        if (event.target === skillModal) {
            closeSkillModal();
        }
        if (event.target === categoryModal) {
            closeCategoryModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeSkillModal();
            closeCategoryModal();
        }
    });

    // Deep link skills: expand, scroll, and open modal
    window.addEventListener('hashchange', handleSkillHashNavigation);
    window.addEventListener('hashchange', handlePortfolioHashNavigation);
    window.addEventListener('hashchange', handleMilestoneHashNavigation);

    document.addEventListener('click', (event) => {
        const skillLink = event.target.closest('a[href^="#skill-"]');
        const portfolioLink = event.target.closest('a[href^="#portfolio-"]');
        const milestoneLink = event.target.closest('a[href^="#milestone-"]');

        if (skillLink) {
            event.preventDefault();
            const hash = skillLink.getAttribute('href');
            if (hash) {
                closeAllModals();
                if (window.location.hash !== hash) {
                    window.location.hash = hash;
                }
                handleSkillHashNavigation();
            }
        } else if (portfolioLink) {
            event.preventDefault();
            const hash = portfolioLink.getAttribute('href');
            if (hash) {
                closeAllModals();
                if (window.location.hash !== hash) {
                    window.location.hash = hash;
                }
                handlePortfolioHashNavigation();
            }
        } else if (milestoneLink) {
            event.preventDefault();
            const hash = milestoneLink.getAttribute('href');
            if (hash) {
                closeAllModals();
                if (window.location.hash !== hash) {
                    window.location.hash = hash;
                }
                handleMilestoneHashNavigation();
            }
        }
    });
}

// Render Skills with Categories
function renderSkills() {
    const hardSkillsContainer = document.getElementById('hard-skills-categories');
    const softSkillsContainer = document.getElementById('soft-skills-categories');
    
    if (hardSkillsContainer && softSkillsContainer) {
        renderSkillsByCategory(userData.hard_skills, hardSkillsContainer, true);
        renderSkillsByCategory(userData.soft_skills, softSkillsContainer, false);
    }

    // After render, if there is a hash pointing to a skill, reveal it
    handleSkillHashNavigation();
}

function renderSkillsByCategory(skills, container, useMacros = true) {
    container.innerHTML = '';

    const buildCategoryElement = (category, categorySkills) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';

        categoryElement.innerHTML = `
            <div class="skill-category-header">
                <h4 class="skill-category-title">${category}</h4>
                <span class="skill-category-toggle">▼</span>
            </div>
            <div class="skill-category-content">
                <div class="skills-list"></div>
            </div>
        `;

        const skillsList = categoryElement.querySelector('.skills-list');
        const header = categoryElement.querySelector('.skill-category-header');

        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-label', `Categoria ${category}`);

        // Sort skills by level (stars) in descending order
        categorySkills.sort((a, b) => b.level - a.level);

        categorySkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            const skillSlug = slugify(skill.name);
            skillItem.id = `skill-${skillSlug}`;

            skillItem.innerHTML = `
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <div class="skill-rating">
                        ${generateStars(skill.level)}
                    </div>
                </div>
                <p class="skill-description">${skill.description}</p>
            `;

            // Add click event to open skill modal
            skillItem.addEventListener('click', function(e) {
                e.stopPropagation();
                openSkillModal(skill);
            });

            skillsList.appendChild(skillItem);
        });

        const toggleCategory = () => {
            const isExpanded = categoryElement.classList.toggle('expanded');
            header.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        };

        // Make the whole card clickable (except skill items)
        categoryElement.addEventListener('click', (event) => {
            if (event.target.closest('.skill-item')) return;
            toggleCategory();
        });

        header.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleCategory();
            }
        });

        return categoryElement;
    };

    if (!useMacros) {
        const groupedByCategory = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        }, {});

        Object.entries(groupedByCategory).forEach(([category, categorySkills]) => {
            const categoryElement = buildCategoryElement(category, categorySkills);
            container.appendChild(categoryElement);
        });
        return;
    }

    // Group skills by macro then category
    const grouped = skills.reduce((acc, skill) => {
        const macro = categoryMacroMap[skill.category] || 'Outros';
        if (!acc[macro]) acc[macro] = {};
        if (!acc[macro][skill.category]) acc[macro][skill.category] = [];
        acc[macro][skill.category].push(skill);
        return acc;
    }, {});

    const macros = Object.keys(grouped).sort((a, b) => {
        const ai = macroOrder.indexOf(a) === -1 ? Number.MAX_SAFE_INTEGER : macroOrder.indexOf(a);
        const bi = macroOrder.indexOf(b) === -1 ? Number.MAX_SAFE_INTEGER : macroOrder.indexOf(b);
        return ai - bi;
    });

    macros.forEach(macro => {
        const macroBlock = document.createElement('div');
        macroBlock.className = 'macro-category';
        macroBlock.innerHTML = `
            <div class="macro-category-header">
                <h3 class="macro-category-title">${macro}</h3>
                <span class="macro-category-toggle">▼</span>
            </div>
            <div class="macro-category-content"></div>
        `;

        const macroContent = macroBlock.querySelector('.macro-category-content');
        Object.entries(grouped[macro]).forEach(([category, categorySkills]) => {
            const categoryElement = buildCategoryElement(category, categorySkills);
            macroContent.appendChild(categoryElement);
        });

        const macroHeader = macroBlock.querySelector('.macro-category-header');
        macroHeader.setAttribute('role', 'button');
        macroHeader.setAttribute('tabindex', '0');
        macroHeader.setAttribute('aria-expanded', 'false');
        macroHeader.setAttribute('aria-label', `Macro categoria ${macro}`);

        const toggleMacro = () => {
            const isExpanded = macroBlock.classList.toggle('expanded');
            macroHeader.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        };

        // Make the whole macro card clickable (avoid toggling when interacting with content)
        macroBlock.addEventListener('click', (event) => {
            if (event.target.closest('.macro-category-content')) return;
            toggleMacro();
        });

        macroHeader.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMacro();
            }
        });

        container.appendChild(macroBlock);
    });
}

function generateStars(level) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= level ? 'filled' : ''}">★</span>`;
    }
    return stars;
}

function slugify(text) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

function findSkillBySlug(slug) {
    const allSkills = [...userData.hard_skills, ...userData.soft_skills];
    return allSkills.find(skill => slugify(skill.name) === slug);
}

function findMilestoneById(id) {
    return userData.milestones.find(m => m.id === id);
}

function handleSkillHashNavigation() {
    const hash = decodeURIComponent(window.location.hash || '');
    if (!hash || !hash.startsWith('#skill-')) return;

    closeAllModals();

    const target = document.querySelector(hash);
    if (!target) return;

    const skillSlug = hash.replace('#skill-', '');
    const skillData = findSkillBySlug(skillSlug);

    const categoryElement = target.closest('.skill-category');
    if (categoryElement) {
        categoryElement.classList.add('expanded');
        const header = categoryElement.querySelector('.skill-category-header');
        if (header) header.setAttribute('aria-expanded', 'true');
    }

    const macroElement = target.closest('.macro-category');
    if (macroElement) {
        macroElement.classList.add('expanded');
        const header = macroElement.querySelector('.macro-category-header');
        if (header) header.setAttribute('aria-expanded', 'true');
    }

    requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (skillData) {
            openSkillModal(skillData);
        }
    });
}

function handleMilestoneHashNavigation() {
    const hash = decodeURIComponent(window.location.hash || '');
    if (!hash || !hash.startsWith('#milestone-')) return;

    closeAllModals();

    const milestoneId = parseInt(hash.replace('#milestone-', ''), 10);
    const milestone = findMilestoneById(milestoneId);
    const target = document.getElementById(`milestone-${milestoneId}`);

    if (target) {
        requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (milestone) {
                openMilestoneModal(milestone);
            }
        });
    }
}

function openPortfolioCard(cardId) {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    const cards = container.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        card.classList.remove('open');
        const btn = card.querySelector('.portfolio-more-btn');

function animateCardHeight(card, targetHeight, revertToAuto = false) {
    if (!card) return;
    const currentHeight = card.getBoundingClientRect().height;
    const target = Math.max(targetHeight, 0);
    card.style.height = `${currentHeight}px`;
    // force reflow
    void card.offsetHeight;
    card.style.height = `${target}px`;

    if (revertToAuto) {
        const onEnd = (e) => {
            if (e.target !== card || e.propertyName !== 'height') return;
            card.style.height = 'auto';
            card.removeEventListener('transitionend', onEnd);
        };
        card.addEventListener('transitionend', onEnd);
    }
}

function applyPortfolioClosedHeights() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.portfolio-card'));
    if (!cards.length) return;

    const openCards = cards.filter(card => card.classList.contains('open'));
    const closedCards = cards.filter(card => !card.classList.contains('open'));

    // Reset closed heights to natural to measure
    closedCards.forEach(card => {
        card.style.height = 'auto';
    });

    let maxClosedHeight = 0;
    closedCards.forEach(card => {
        const h = card.getBoundingClientRect().height;
        if (h > maxClosedHeight) maxClosedHeight = h;
    });

    // Apply equalized height to closed cards
    closedCards.forEach(card => {
        if (maxClosedHeight > 0) {
            animateCardHeight(card, maxClosedHeight, false);
        }
    });

    // Animate open cards to their natural height
    openCards.forEach(card => {
        // Ensure details are visible for measurement
        const targetHeight = card.scrollHeight;
        animateCardHeight(card, targetHeight, true);
    });
}
        updatePortfolioToggleButton(btn, false);
    });

    openPortfolioCardId = null;

    if (cardId) {
        const target = container.querySelector(`#${cardId}`);
        if (target) {
            target.classList.add('open');
            const btn = target.querySelector('.portfolio-more-btn');
            updatePortfolioToggleButton(btn, true);
            openPortfolioCardId = cardId;
        }
    }

    applyPortfolioClosedHeights();
}

function closeAllModals() {
    closeModal();
    closeSkillModal();
    closeCategoryModal();
}

function handlePortfolioHashNavigation() {
    const hash = decodeURIComponent(window.location.hash || '');
    if (!hash || !hash.startsWith('#portfolio-')) return;

    closeAllModals();

    const cardId = hash.replace('#', '');
    openPortfolioCard(cardId);

    const target = document.getElementById(cardId);
    if (target) {
        requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
}

function applyPortfolioClosedHeights() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.portfolio-card'));
    if (!cards.length) return;

    const openIds = new Set(cards.filter(card => card.classList.contains('open')).map(card => card.id));

    const state = cards.map(card => {
        const wasOpen = card.classList.contains('open');
        card.classList.remove('open');
        return { card, wasOpen };
    });

    let maxHeight = 0;
    state.forEach(({ card }) => {
        const h = card.offsetHeight;
        if (h > maxHeight) maxHeight = h;
    });

    state.forEach(({ card, wasOpen }) => {
        if (wasOpen) card.classList.add('open');
    });

    cards.forEach(card => {
        if (openIds.has(card.id)) {
            card.style.height = 'auto';
        } else {
            card.style.height = `${maxHeight}px`;
        }
    });
}

function updatePortfolioToggleButton(button, isOpen) {
    if (!button) return;
    const textEl = button.querySelector('.portfolio-more-text');
    const chevron = button.querySelector('.portfolio-more-chevron');
    if (textEl) textEl.textContent = isOpen ? 'Menos informações' : 'Mais informações';
    button.classList.toggle('portfolio-more-btn--open', Boolean(isOpen));
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (chevron) {
        chevron.setAttribute('aria-hidden', 'true');
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatNoteHTML(note) {
    const safe = escapeHTML(note);
    const withBreaks = safe.replace(/\n/g, '<br>');
    return `<div class="note-body">${withBreaks}</div>`;
}

// Switch between milestone views
function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.switch-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide views
    const timelineView = document.getElementById('milestones-timeline');
    const gridView = document.getElementById('milestones-grid');
    
    if (view === 'timeline') {
        timelineView.classList.remove('hidden');
        gridView.classList.add('hidden');
    } else {
        timelineView.classList.add('hidden');
        gridView.classList.remove('hidden');
    }
}

// Render Milestones
function renderMilestones() {
    const timelineContainer = document.getElementById('milestones-timeline');
    const gridContainer = document.getElementById('milestones-grid');
    
    if (timelineContainer && gridContainer) {
        // Clear containers
        timelineContainer.innerHTML = '';
        gridContainer.innerHTML = '';

        const sortedMilestones = [...userData.milestones].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        
        sortedMilestones.forEach(milestone => {
            // Create timeline element
            const timelineItem = document.createElement('div');
            timelineItem.className = 'milestone-item';
            
            if (milestone.status === 'concluido') {
                timelineItem.classList.add('completed');
            } else if (milestone.status === 'em_progresso') {
                timelineItem.classList.add('in-progress');
            }
            
            const timelineCard = createMilestoneElement(milestone);
            timelineItem.appendChild(timelineCard);
            
            // Create grid element (separate instance with its own event listener)
            const gridCard = createMilestoneElement(milestone);
            
            timelineContainer.appendChild(timelineItem);
            gridContainer.appendChild(gridCard);
        });

        // Handle deep link after rendering
        handleMilestoneHashNavigation();
    }
}

function createMilestoneElement(milestone) {
    const element = document.createElement('div');
    element.className = 'milestone-card';
    element.style.cursor = 'pointer';
    element.id = `milestone-${milestone.id}`;
    const isCompleted = milestone.status === 'concluido' || milestone.progress === 100;
    if (isCompleted) {
        element.classList.add('milestone-card--completed');
    }
    
    const statusClass = getStatusClass(milestone.status);
    const statusText = getStatusText(milestone.status);
    const daysRemaining = calculateDaysRemaining(milestone.deadline);
    
    element.innerHTML = `
        <div class="milestone-header">
            <h3 class="milestone-title">${milestone.title}</h3>
            <span class="milestone-status ${statusClass}">${statusText}</span>
        </div>
        <p class="milestone-description">${milestone.description}</p>
        <div class="milestone-progress">
            <div class="progress-header">
                <span class="progress-label">Progresso</span>
                <span class="progress-percentage">${milestone.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill ${isCompleted ? 'progress-fill--static' : ''}" style="width: ${milestone.progress}%"></div>
            </div>
        </div>
        <div class="milestone-meta">
            <div class="milestone-deadline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                ${formatDate(milestone.deadline)} (${daysRemaining} dias restantes)
            </div>
        </div>
    `;
    
    element.addEventListener('click', () => openMilestoneModal(milestone));
    
    return element;
}

function getStatusClass(status) {
    const statusMap = {
        'concluido': 'completed',
        'em_progresso': 'in-progress',
        'nao_iniciado': 'not-started'
    };
    return statusMap[status] || 'not-started';
}

function getStatusText(status) {
    const statusMap = {
        'concluido': 'Concluído',
        'em_progresso': 'Em Progresso',
        'nao_iniciado': 'Não Iniciado'
    };
    return statusMap[status] || 'Não Iniciado';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Render Portfolio
function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    userData.portfolio.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-card';
        const cardId = `portfolio-${index}`;
        projectElement.id = cardId;
        
        const statusClass = getPortfolioStatusClass(project.status);
        const statusText = getPortfolioStatusText(project.status);
        const skills = project.skills || [];
        const milestones = project.milestones || [];
        const resources = project.resources || [];
        
        projectElement.innerHTML = `
            <div class="portfolio-header">
                <h3 class="portfolio-title">${project.title}</h3>
                <span class="portfolio-status ${statusClass}">${statusText}</span>
            </div>
            <p class="portfolio-description">${project.description}</p>
            ${project.impact ? `<p class="portfolio-impact"><strong>Impacto:</strong> ${project.impact}</p>` : ''}
            <button class="portfolio-more-btn" type="button" aria-expanded="false" aria-controls="${cardId}-details">
                <span class="portfolio-more-text">Mais informações</span>
                <span class="portfolio-more-chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>
            <div class="portfolio-details" id="${cardId}-details">
                ${skills.length ? `<div class="portfolio-meta"><span class="portfolio-meta-label">Skills</span><br><div class="portfolio-tags">${skills.map(skill => `<a class="tech-tag tech-tag--ghost" href="#skill-${slugify(skill)}">${skill}</a>`).join('')}</div></div>` : ''}
                ${milestones.length ? `<div class="portfolio-meta"><span class="portfolio-meta-label">Marcos</span><br><div class="portfolio-tags">${milestones.map(id => {
                    const m = userData.milestones.find(item => item.id === id);
                    const label = m ? m.title : `Marco ${id}`;
                    return `<a class="tech-tag tech-tag--ghost" href="#milestone-${id}">${label}</a>`;
                }).join('')}</div></div>` : ''}
                ${resources.length ? `<div class="portfolio-meta"><span class="portfolio-meta-label">Recursos</span><br><div class="portfolio-tags">${resources.map(id => {
                    const cat = userData.learning_resources.find(c => c.id === id);
                    const label = cat ? cat.name : `Recurso ${id}`;
                    return `<a class="tech-tag tech-tag--ghost" href="#resource-${id}">${label}</a>`;
                }).join('')}</div></div>` : ''}
            </div>
        `;

        const details = projectElement.querySelector('.portfolio-details');
        const toggleBtn = projectElement.querySelector('.portfolio-more-btn');
        toggleBtn.addEventListener('click', () => {
            const isOpen = projectElement.classList.contains('open');
            if (isOpen) {
                openPortfolioCard(null);
            } else {
                openPortfolioCard(cardId);
            }
        });
        
        container.appendChild(projectElement);
    });

    // If hash points to a project, open it
    handlePortfolioHashNavigation();

    // Apply uniform height for closed cards
    applyPortfolioClosedHeights();
}

function getPortfolioStatusClass(status) {
    const statusMap = {
        'concluido': 'completed',
        'em_progresso': 'in-progress',
        'em_desenvolvimento': 'in-development'
    };
    return statusMap[status] || 'not-started';
}

function getPortfolioStatusText(status) {
    const statusMap = {
        'concluido': 'Concluído',
        'em_progresso': 'Em Progresso',
        'em_desenvolvimento': 'Em Desenvolvimento'
    };
    return statusMap[status] || 'Não Iniciado';
}

// Render Learning Resources
function renderLearningResources() {
    const container = document.getElementById('learning-resources');
    if (!container) return;
    
    container.innerHTML = '';
    
    userData.learning_resources.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'learning-card';
        categoryElement.id = `resource-${category.id}`;
        
        categoryElement.innerHTML = `
            <h3 class="learning-title">${category.name}</h3>
            <div class="learning-resources">
                ${category.resources.map(resource => `
                    <div class="learning-resource">
                        <div class="resource-image">
                            <img src="${resource.image}" alt="${resource.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="display: block;">
                            <div class="resource-placeholder" style="display: none;">${resource.name.substring(0, 2).toUpperCase()}</div>
                        </div>
                        <div class="resource-status ${resource.status}"></div>
                        <div class="resource-info">
                            <div class="resource-name">${resource.name}</div>
                            <p class="resource-description">${resource.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        categoryElement.addEventListener('click', () => openCategoryModal(category));
        
        container.appendChild(categoryElement);
    });
}

// Update Progress Stats
function updateProgressStats() {
    // Calculate overall progress
    const completedMilestones = userData.milestones.filter(m => m.status === 'concluido').length;
    const totalMilestones = userData.milestones.length;
    const overallProgress = Math.round((completedMilestones / totalMilestones) * 100);
    
    // Update stats
    const completedMilestonesElement = document.getElementById('completed-milestones');
    const totalSkillsElement = document.getElementById('total-skills');
    const hardSkillsCountElement = document.getElementById('hard-skills-count');
    const softSkillsCountElement = document.getElementById('soft-skills-count');
    const totalProjectsElement = document.getElementById('total-projects');
    
    if (completedMilestonesElement) completedMilestonesElement.textContent = `${completedMilestones}/${totalMilestones}`;
    if (totalSkillsElement) totalSkillsElement.textContent = userData.hard_skills.length + userData.soft_skills.length;
    if (hardSkillsCountElement) hardSkillsCountElement.textContent = userData.hard_skills.length;
    if (softSkillsCountElement) softSkillsCountElement.textContent = userData.soft_skills.length;
    if (totalProjectsElement) totalProjectsElement.textContent = userData.portfolio.length;
}

// Set Last Update Date
function setLastUpdateDate() {
    const element = document.getElementById('last-update');
    if (element) {
        const today = new Date();
        element.textContent = today.toLocaleDateString('pt-BR');
    }
}

// Modal Functions
function openMilestoneModal(milestone) {
    const modal = document.getElementById('milestone-modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const deadline = document.getElementById('modal-deadline');
    const daysRemaining = document.getElementById('modal-days-remaining');
    const status = document.getElementById('modal-status');
    const progressText = document.getElementById('modal-progress-text');
    const progressFill = document.getElementById('modal-progress-fill');
    const noteElement = document.getElementById('modal-note');
    const relatedSkillsList = document.getElementById('modal-related-skills');
    const relatedResourcesList = document.getElementById('modal-related-resources');
    
    if (modal && title && description && deadline && daysRemaining && status && progressText && progressFill && noteElement && relatedSkillsList && relatedResourcesList) {
        title.textContent = milestone.title;
        description.textContent = milestone.description;
        deadline.textContent = formatDate(milestone.deadline);
        daysRemaining.textContent = calculateDaysRemaining(milestone.deadline);
        status.textContent = getStatusText(milestone.status);
        progressText.textContent = `${milestone.progress}%`;
        progressFill.style.width = `${milestone.progress}%`;
        
        // Definir a anotação textual se existir e o marco estiver concluído
        if (milestone.status === 'concluido' && typeof milestone.note !== 'undefined' && milestone.note !== '') {
            noteElement.innerHTML = formatNoteHTML(milestone.note);
        } else {
            noteElement.innerHTML = '<span class="note-placeholder">Nenhuma anotação disponível.</span>';
        }
        noteElement.parentElement.classList.add('detail-item--note');
        
        // Preencher lista de habilidades relacionadas
        if (milestone.skills && milestone.skills.length) {
            relatedSkillsList.innerHTML = milestone.skills.map(skillName => {
                const anchor = `#skill-${slugify(skillName)}`;
                return `<li><a href="${anchor}">${skillName}</a></li>`;
            }).join('');
        } else {
            relatedSkillsList.innerHTML = '<li>N/A</li>';
        }
        
        // Preencher lista de recursos relacionados
        if (milestone.resources && milestone.resources.length) {
            relatedResourcesList.innerHTML = milestone.resources.map(catId => {
                const cat = userData.learning_resources.find(c => c.id === catId);
                return cat ? `<li><a href="#resource-${catId}">${cat.name}</a></li>` : '';
            }).join('');
        } else {
            relatedResourcesList.innerHTML = '<li>N/A</li>';
        }
        
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('milestone-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

function getSkillRuler(skill) {
    if (skill.name.toLowerCase().includes('lideran')) {
        return [
            'Dependente de direcionamentos, precisa de apoio para cadência das próprias atividades',
            'Toma decisões de forma centralizada, sem ouvir muito a opinião dos membros da equipe',
            'Toma decisões de forma centralizada, mas ouve a opinião dos membros da equipe',
            'Inspira e influencia, tem decisões e comportamentos direcionando seus esforços a fim de alcançar os resultados desejados',
            'Tem decisões e comportamentos direcionando seus esforços a fim de alcançar os resultados desejados, influenciando positivamente as pessoas ao seu redor',
            'Tem decisões e comportamentos direcionando seus esforços a fim de alcançar os resultados desejados, influenciando positivamente as pessoas ao seu redor * multiplicador'
        ];
    }
    
    if (skill.category && skill.category.toLowerCase().includes('comunica')) {
        return [
            '',
            'Tem muita dificuldade pra se comunicar de forma clara e objetiva, com assertividade e empatia',
            'Tem muita dificuldade para se comunicar de forma clara e objetiva, com assertividade e empatia, mas corre atrás para conseguir superá-los',
            'Consegue se comunicar de forma clara e objetiva, com assertividade e empatia, buscando e garantindo o alinhamento',
            'Consegue se comunicar de forma clara e objetiva, com assertividade e empatia, buscando e garantindo o alinhamento, influenciando positivamente as pessoas ao seu redor',
            'Consegue se comunicar de forma clara e objetiva, com assertividade e empatia, buscando e garantindo o alinhamento, influenciando positivamente o time/pessoas ao seu redor/comunidade'
        ];
    }
    
    if (skill.category && skill.category.toLowerCase().includes('idioma')) {
        return [
            '',
            'Conhecimento básico, vocabulário limitado',
            'Conhecimento intermediário, amplo vocabulário, mas sem experiência de leitura, escrita e conversação',
            'Conhecimento avançado, amplo vocabulário, com experiência de leitura e escrita mas sem experiência de conversação',
            'Conhecimento avançado, amplo vocabulário e experiências de leitura, escrita e comunicação, com pequenas "travas" em conversação',
            'Nativo/Fluente, leitura, escrita e comunicação flúida'
        ];
    }
    
    return [
        '',
        'Desconhecido, não possui conhecimento nessa habilidade',
        'Iniciante, conhece pouco e consegue usar em situações simples com ajuda',
        'Intermediário, sabe usar bem com ajuda em tarefas mais difíceis',
        'Avançado, domina e consegue criar soluções avançadas e inovadoras',
        'Referência, lidera, orienta outras pessoas e influencia decisões'
    ];
}

function openSkillModal(skill) {
    const modal = document.getElementById('skill-info-modal');
    const title = document.getElementById('skill-modal-title');
    const rating = document.getElementById('skill-modal-rating');
    const description = document.getElementById('skill-modal-description');
    const ruler = document.getElementById('skill-modal-ruler');
    const relatedMilestonesList = document.getElementById('skill-modal-related-milestones');
    const relatedResourcesList = document.getElementById('skill-modal-related-resources');
    const relatedProjectsList = document.getElementById('skill-modal-related-projects');
    
    if (modal && title && rating && description && ruler && relatedMilestonesList && relatedResourcesList) {
        title.textContent = skill.name;
        rating.innerHTML = generateStars(skill.level);
        description.textContent = skill.description;
        
        const skillRuler = getSkillRuler(skill);
        
        ruler.innerHTML = `
            <div class="skill-ruler">
                <div class="ruler-labels">
                    <span>Iniciante</span>
                    <span>Básico</span>
                    <span>Intermediário</span>
                    <span>Avançado</span>
                    <span>Especialista</span>
                </div>
                <div class="ruler-bar">
                    <div class="ruler-fill" style="width: ${(skill.level / 5) * 100}%"></div>
                    <div class="ruler-marker" style="left: ${(skill.level / 5) * 100}%" data-level="${skill.level}"></div>
                </div>
                <div class="skill-level-explanation" id="skill-level-explanation"></div>
            </div>
        `;
        
        const explanation = ruler.querySelector('.skill-level-explanation');
        
        if (ruler && explanation) {            
            if (skill.level > 0 && skill.level <= skillRuler.length - 1) {
                explanation.textContent = skillRuler[skill.level];
                explanation.classList.add('active');
            }
        }
        
        // Determinar marcos relacionados (buscando skills listados nos marcos)
        const relatedProjects = userData.portfolio
            .map((project, index) => ({ project, index }))
            .filter(entry => (entry.project.skills || []).includes(skill.name));

        const milestoneIdsFromProjects = new Set(
            relatedProjects.flatMap(entry => entry.project.milestones || [])
        );

        const directMilestones = userData.milestones.filter(m => (m.skills || []).includes(skill.name));
        const indirectMilestones = userData.milestones.filter(m => milestoneIdsFromProjects.has(m.id));
        const combinedMilestones = [...new Map([...directMilestones, ...indirectMilestones].map(m => [m.id, m])).values()];

        const relatedResources = userData.learning_resources.filter(cat => (cat.relatedSkills || []).includes(skill.name));

        const renderListOrHide = (listElement, items, formatter) => {
            if (!listElement || !listElement.parentElement) return;
            if (items.length) {
                listElement.innerHTML = items.map(formatter).join('');
                listElement.parentElement.style.display = '';
            } else {
                listElement.innerHTML = '';
                listElement.parentElement.style.display = 'none';
            }
        };

        renderListOrHide(relatedMilestonesList, combinedMilestones, (m) => `<li><a href="#milestone-${m.id}">${m.title}</a></li>`);
        renderListOrHide(relatedResourcesList, relatedResources, (cat) => `<li><a href="#resource-${cat.id}">${cat.name}</a></li>`);
        renderListOrHide(relatedProjectsList, relatedProjects, (entry) => `<li><a href="#portfolio-${entry.index}">${entry.project.title}</a></li>`);
        
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function closeSkillModal() {
    const modal = document.getElementById('skill-info-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

function openCategoryModal(category) {
    const modal = document.getElementById('category-modal');
    const title = document.getElementById('category-modal-title');
    const resources = document.getElementById('category-modal-resources');
    const relatedSkillsList = document.getElementById('category-modal-related-skills');
    const relatedMilestonesList = document.getElementById('category-modal-related-milestones');
    
    if (modal && title && resources && relatedSkillsList && relatedMilestonesList) {
        title.textContent = category.name;
        
        resources.innerHTML = category.resources.map(resource => `
            <div class="resource-item">
                <div class="resource-image">
                    <img src="${resource.image}" alt="${resource.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="display: block;">
                    <div class="resource-placeholder" style="display: none;">${resource.name.substring(0, 2).toUpperCase()}</div>
                </div>
                <div class="resource-status ${resource.status}"></div>
                <div class="resource-details">
                    <h4>${resource.name}</h4>
                    <p>${resource.description}</p>
                    <span class="resource-status-text">${getResourceStatusText(resource.status)}</span>
                </div>
            </div>
        `).join('');
        
        // Preencher lista de skills relacionadas
        if (category.relatedSkills && category.relatedSkills.length) {
            relatedSkillsList.innerHTML = category.relatedSkills.map(skillName => `<li>${skillName}</li>`).join('');
        } else {
            relatedSkillsList.innerHTML = '<li>N/A</li>';
        }
        
        // Preencher lista de marcos relacionados
        if (category.relatedMilestones && category.relatedMilestones.length) {
            relatedMilestonesList.innerHTML = category.relatedMilestones.map(mid => {
                const m = userData.milestones.find(x => x.id === mid);
                return m ? `<li>${m.title}</li>` : '';
            }).join('');
        } else {
            relatedMilestonesList.innerHTML = '<li>N/A</li>';
        }
        
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

function getResourceStatusText(status) {
    const statusMap = {
        'concluido': 'Concluído',
        'em_progresso': 'Em Progresso',
        'nao_iniciado': 'Não Iniciado',
        'pausado': 'Pausado'
    };
    return statusMap[status] || 'Não Iniciado';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
const debouncedResize = debounce(() => {
    applyPortfolioClosedHeights();
}, 250);

window.addEventListener('resize', debouncedResize);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.stat-card, .skill-category, .milestone-card, .portfolio-card, .learning-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});