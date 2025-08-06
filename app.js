const userData = {
    user_info: {
        name: "Gustavo Soldera",
        age: 23,
        current_role: "Analista de Engenharia de TI (Junior)",
        target_role: "Engenheiro de Analytics Pleno",
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
        {name: "Angular", level: 3, description: "Framework front-end para aplicações web", category: "Desenvolvimento"},
        {name: "Amazon QuickSight", level: 5, description: "Ferramenta de BI do banco", category: "Analytics & BI"},
        {name: "PySpark", level: 4, description: "Processamento de big data", category: "Analytics & BI"},
        {name: "Modelagem de Dados", level: 3, description: "Design e estruturação de modelos", category: "Analytics & BI"},
        {name: "AWS Glue", level: 5, description: "ETL e integração de dados", category: "Cloud & Data"},
        {name: "AWS S3", level: 4, description: "Armazenamento de dados na nuvem", category: "Cloud & Data"},
        {name: "AWS Step Functions", level: 3, description: "Orquestração de workflows", category: "Cloud & Data"},
        {name: "Terraform", level: 4, description: "Infraestrutura como código", category: "Cloud & Data"},
        {name: "Kafka/Mensageria", level: 2, description: "Streaming de dados em tempo real", category: "Cloud & Data"},
        {name: "LLM e Agentes", level: 4, description: "Criação de soluções com IA", category: "IA & Inovação"},
        {name: "Kubernetes", level: 3, description: "Gerenciamento de containers", category: "DevOps"},
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
        {name: "Comunicação Não-Violenta", level: 4, description: "Técnicas de comunicação respeitosa", category: "Comunicação"}
    ],
    milestones: [
        {
            id: 1,
            title: "Certificação Profissional",
            description: "Completar prova de engenheiro de analytics",
            deadline: "2025-08-15",
            status: "em_progresso",
            progress: 80
        },
        {
            id: 2,
            title: "Soft Skills",
            description: "Receber feedback positivo de pelo menos 3 colegas sobre melhoria na escuta",
            deadline: "2025-08-30",
            status: "concluido",
            progress: 100
        },
        {
            id: 3,
            title: "Liderar Projetos de Impacto",
            description: "Atuação chave em pelo menos 2 projetos significativos",
            deadline: "2025-09-30",
            status: "concluido",
            progress: 100
        },
        {
            id: 4,
            title: "Mentorar Colegas",
            description: "Orientar pelo menos 3 membros da equipe/comunidade que queiram se aperfeiçoar na área",
            deadline: "2025-10-31",
            status: "nao_iniciado",
            progress: 0
        },
        {
            id: 5,
            title: "Workshops e Palestras",
            description: "Apresentar 3 workshops/palestras internas",
            deadline: "2025-11-30",
            status: "nao_iniciado",
            progress: 0
        },
        {
            id: 6,
            title: "Pílulas de Conhecimento",
            description: "Iniciar produção de conteúdo com pelo menos 7 pílulas de conhecimento nos campos de Engenharia de Dados e Analytics",
            deadline: "2025-12-30",
            status: "nao_iniciado",
            progress: 0
        },
        {
            id: 7,
            title: "Decisões Estratégicas",
            description: "Apresentar 3 propostas de melhoria aceitas pela liderança",
            deadline: "2025-12-31",
            status: "nao_iniciado",
            progress: 0
        }
    ],
    portfolio: [
        {
            title: "InsightGuard",
            description: "Primeira plataforma front-end desenvolvida no time",
            status: "em_desenvolvimento",
            technologies: ["HTML/CSS", "Javascript", "Sass", "AWS", "Terraform", "Angular"]
        },
        {
            title: "Engenharia de Dados",
            description: "Desenvolvimento de tabelas spec e consultorias de democratização",
            status: "em_progresso",
            technologies: ["SQL", "Python", "AWS Glue", "PySpark", "Terraform"]
        },
        {
            title: "Padronização de Dashboards",
            description: "Apoiando times na modernização e liderando padronização de design de dashboards na comunidade Cyber Security",
            status: "em_progresso",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"]
        },
        {
            title: "IAM Analytics",
            description: "Padrão de visual para dashboards de Acessos (IAM)",
            status: "concluido",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"]
        },
        {
            title: "Cyber Insights",
            description: "Padrão de visual para dashboards de Cyber Defense",
            status: "concluido",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"]
        },
        {
            title: "Observability360",
            description: "Padrão de visual para dashboards de indicadores da comunidade",
            status: "concluido",
            technologies: ["Amazon QuickSight", "Figma", "Design Systems"]
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
            ]
        },
        {
            id: 2,
            name: "Mentoria com Senior Engineers",
            resources: [
                { name: "Henrique Vieira", description: "Mentor em engenharia de dados e carreira", status: "em_progresso", image: "assets/img/mentor-henrique.png" },
                { name: "Em breve", description: "Mentor em engenharia de analytics.", status: "nao_iniciado", image: "assets/img/mentor.png" }
            ]
        },
        {
            id: 3,
            name: "Certificação Analytics Engineer",
            resources: [
                { name: "Curso Preparatório", description: "Curso online para preparação da certificação.", status: "em_progresso", image: "assets/img/professionalea.webp" }
            ]
        },
        {
            id: 4,
            name: "Workshops de Liderança Técnica",
            resources: [
                { name: "Em breve", description: "Workshop sobre liderança técnica e gestão de equipes.", status: "nao_iniciado", image: "assets/img/workshop.png" }
            ]
        },
        {
            id: 5,
            name: "Livros de Analytics",
            resources: [
                { name: "Storytelling with Data", description: "Um guia para apresentação de dados.", status: "concluido", image: "assets/img/books/swd.jpg" },
                { name: "Data Science for Business", description: "Fundamentos de ciência de dados para negócios.", status: "nao_iniciado", image: "assets/img/books/dsfb.jpg" },
                { name: "The Art of Data Science", description: "Um guia para análise de dados.", status: "nao_iniciado", image: "assets/img/books/tads.jpg" }
            ]
        },
        {
            id: 6,
            name: "Curso de DevOps",
            resources: [
                { name: "DevOps Fundamentals", description: "Curso introdutório sobre práticas de DevOps.", status: "nao_iniciado", image: "assets/img/devops.jpg" }
            ]
        },
        {
            id: 7,
            name: "Certificação de Cloud",
            resources: [
                { name: "AWS Cloud Practitioner", description: "Preparação para a certificação AWS Foundational.", status: "nao_iniciado", image: "assets/img/awspractitioner.webp" },
                { name: "AWS Certified Solutions Architect", description: "Preparação para a certificação AWS Associate.", status: "nao_iniciado", image: "assets/img/aws.png" }
            ]
        },
        {
            id: 8,
            name: "Certificação de Cyber Security",
            resources: [
                { name: "CompTIA Security+", description: "Curso preparatório para a certificação CompTIA Security+.", status: "pausado", image: "assets/img/comptiasec.png" }
            ]
        },
        {
            id: 9,
            name: "Livros de Engenharia de Dados",
            resources: [
                { name: "Designing Data-Intensive Applications", description: "Um guia para aplicações intensivas em dados.", status: "nao_iniciado", image: "assets/img/books/ddia.jpg" },
                { name: "Data Mesh", description: "Arquitetura de dados para empresas modernas.", status: "nao_iniciado", image: "assets/img/books/dm.jpg" }
            ]
        },
        {
            id: 10,
            name: "Livros de Engenharia de Software",
            resources: [
                { name: "Clean Code", description: "Um manual de artesanato de software.", status: "nao_iniciado", image: "assets/img/books/cco.jpg" },
                { name: "The Pragmatic Programmer", description: "Dicas e truques para programadores.", status: "nao_iniciado", image: "assets/img/books/tpp.jpg" }
            ]
        },
        {
            id: 11,
            name: "Livros de Arquitetura de Sistemas",
            resources: [
                { name: "Domain-Driven Design", description: "Tackling Complexity in the Heart of Software.", status: "concluido", image: "assets/img/books/ddd.jpg" },
                { name: "Patterns of Enterprise Application Architecture", description: "Padrões de arquitetura para aplicações empresariais.", status: "nao_iniciado", image: "assets/img/books/peaa.jpg" }
            ]
        }
    ]
};

// Global variables
let currentView = 'timeline';
let currentTheme = null;

// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Get saved theme from localStorage or detect system preference
        const savedTheme = localStorage.getItem('pdi-theme');
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
        localStorage.setItem('pdi-theme', this.currentTheme);
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

function calculateDaysRemaining(deadline) {
    let targetDate;
    if (deadline) {
        targetDate = new Date(deadline);
    } else {
        targetDate = new Date(2026, 5, 1);
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
}

// Render Skills with Categories
function renderSkills() {
    const hardSkillsContainer = document.getElementById('hard-skills-categories');
    const softSkillsContainer = document.getElementById('soft-skills-categories');
    
    if (hardSkillsContainer && softSkillsContainer) {
        renderSkillsByCategory(userData.hard_skills, hardSkillsContainer);
        renderSkillsByCategory(userData.soft_skills, softSkillsContainer);
    }
}

function renderSkillsByCategory(skills, container) {
    // Group skills by category
    const categorizedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    // Render each category
    Object.entries(categorizedSkills).forEach(([category, categorySkills]) => {
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
        
        // Sort skills by level (stars) in descending order
        categorySkills.sort((a, b) => b.level - a.level);
        
        categorySkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            
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
        
        // Add click event for accordion
        const header = categoryElement.querySelector('.skill-category-header');
        header.addEventListener('click', () => {
            categoryElement.classList.toggle('expanded');
        });
        
        container.appendChild(categoryElement);
    });
}

function generateStars(level) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= level ? 'filled' : ''}">★</span>`;
    }
    return stars;
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
        
        userData.milestones.forEach(milestone => {
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
    }
}

function createMilestoneElement(milestone) {
    const element = document.createElement('div');
    element.className = 'milestone-card';
    element.style.cursor = 'pointer';
    
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
                <div class="progress-fill" style="width: ${milestone.progress}%"></div>
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
    
    userData.portfolio.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-card';
        
        const statusClass = getPortfolioStatusClass(project.status);
        const statusText = getPortfolioStatusText(project.status);
        
        projectElement.innerHTML = `
            <div class="portfolio-header">
                <h3 class="portfolio-title">${project.title}</h3>
                <span class="portfolio-status ${statusClass}">${statusText}</span>
            </div>
            <p class="portfolio-description">${project.description}</p>
            <div class="portfolio-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        
        container.appendChild(projectElement);
    });
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
    
    if (modal && title && description && deadline && daysRemaining && status && progressText && progressFill) {
        title.textContent = milestone.title;
        description.textContent = milestone.description;
        deadline.textContent = formatDate(milestone.deadline);
        daysRemaining.textContent = calculateDaysRemaining(milestone.deadline);
        status.textContent = getStatusText(milestone.status);
        progressText.textContent = `${milestone.progress}%`;
        progressFill.style.width = `${milestone.progress}%`;
        
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
    
    if (modal && title && rating && description && ruler) {
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
        
        const marker = ruler.querySelector('.ruler-marker');
        const explanation = ruler.querySelector('.skill-level-explanation');
        
        if (marker && explanation) {
            marker.addEventListener('click', function() {
                const level = parseInt(this.getAttribute('data-level'));
                if (level > 0 && level <= skillRuler.length - 1) {
                    explanation.textContent = skillRuler[level];
                    explanation.classList.add('active');
                }
            });
            
            if (skill.level > 0 && skill.level <= skillRuler.length - 1) {
                explanation.textContent = skillRuler[skill.level];
                explanation.classList.add('active');
            }
        }
        
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
    
    if (modal && title && resources) {
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
    // Handle resize events if needed
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

