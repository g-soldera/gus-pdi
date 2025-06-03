// PDI Application Data
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
        {name: "Amazon QuickSight", level: 4, description: "Ferramenta de BI do banco", category: "Analytics & BI"},
        {name: "PySpark", level: 4, description: "Processamento de big data", category: "Analytics & BI"},
        {name: "Modelagem de Dados", level: 4, description: "Design e estruturação de modelos", category: "Analytics & BI"},
        {name: "AWS Glue", level: 4, description: "ETL e integração de dados", category: "Cloud & Data"},
        {name: "AWS S3", level: 4, description: "Armazenamento de dados na nuvem", category: "Cloud & Data"},
        {name: "AWS Step Functions", level: 3, description: "Orquestração de workflows", category: "Cloud & Data"},
        {name: "Terraform", level: 4, description: "Infraestrutura como código", category: "Cloud & Data"},
        {name: "Kafka/Mensageria", level: 3, description: "Streaming de dados em tempo real", category: "Cloud & Data"},
        {name: "LLM e Agentes", level: 4, description: "Criação de soluções com IA", category: "IA & Inovação"},
        {name: "Kubernetes", level: 3, description: "Gerenciamento de containers", category: "DevOps"},
        {name: "Docker", level: 3, description: "Containerização de aplicações", category: "DevOps"},
        {name: "Figma", level: 4, description: "Ferramenta de design de interfaces", category: "Design & UX"},
        {name: "UX", level: 3, description: "Engenharia de usabilidade", category: "Design & UX"},
        {name: "Documentação Técnica", level: 4, description: "Doc Advocate especializado", category: "Comunicação"}
    ],
    soft_skills: [
        {name: "Pensamento Crítico", level: 5, description: "Análise e resolução de problemas", category: "Cognitivas"},
        {name: "Liderança", level: 4, description: "Capacidade de guiar equipes", category: "Liderança"},
        {name: "Apresentação", level: 4, description: "Comunicação para audiências", category: "Comunicação"},
        {name: "Comunicação Verbal", level: 4, description: "Expressão oral clara", category: "Comunicação"},
        {name: "Colaboração", level: 3, description: "Trabalho em equipe eficaz", category: "Relacionais"},
        {name: "Gestão de Conflitos", level: 3, description: "Resolução de divergências", category: "Relacionais"},
        {name: "Escuta Ativa", level: 2, description: "Área prioritária de desenvolvimento", category: "Comunicação"},
        {name: "Empatia na Comunicação", level: 2, description: "Considerar perspectiva dos outros", category: "Relacionais"},
        {name: "Comunicação Não-Violenta", level: 2, description: "Técnicas de comunicação respeitosa", category: "Comunicação"}
    ],
    milestones: [
        {
            id: 1,
            title: "Certificação Profissional",
            description: "Completar prova de engenheiro de analytics",
            deadline: "2025-08-15",
            status: "em_progresso",
            progress: 60
        },
        {
            id: 2,
            title: "Soft Skills",
            description: "Melhorar escuta ativa e empatia",
            deadline: "2025-09-30",
            status: "em_progresso",
            progress: 30
        },
        {
            id: 3,
            title: "Liderar Projetos de Impacto",
            description: "Liderar pelo menos 2 projetos significativos",
            deadline: "2025-12-31",
            status: "em_progresso",
            progress: 25
        },
        {
            id: 4,
            title: "Mentorar Colegas",
            description: "Orientar membros da equipe/comunidade que queiram se aperfeiçoar na área",
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
            title: "Decisões Estratégicas",
            description: "Participar ativamente de tomadas de decisão",
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
            description: "Apoiando times na modernização e liderando padronização de design na comunidade Cyber Security",
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
        "Certificação Analytics Engineer",
        "Workshops de Liderança Técnica",
        "Mentoria com Senior Engineers",
        "Curso de Comunicação Não-Violenta",
        "Livros sobre Comunicação"
    ]
};

// Global variables
let currentView = 'timeline';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderSkills();
    renderMilestones();
    renderPortfolio();
    renderLearningResources();
    updateProgressStats();
    setLastUpdateDate();
    setupEventListeners();
    updateDaysRemaining();
});

// Event Listeners Setup
function setupEventListeners() {
    // Skills card flip
    const skillsCard = document.getElementById('skills-card');
    skillsCard.addEventListener('click', () => {
        skillsCard.classList.toggle('flipped');
    });

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
        const modal = document.getElementById('milestone-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Render Skills with Categories
function renderSkills() {
    const hardSkillsContainer = document.getElementById('hard-skills-categories');
    const softSkillsContainer = document.getElementById('soft-skills-categories');
    
    renderSkillsByCategory(userData.hard_skills, hardSkillsContainer);
    renderSkillsByCategory(userData.soft_skills, softSkillsContainer);
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

    // Show/hide containers
    const timelineContainer = document.getElementById('milestones-timeline');
    const gridContainer = document.getElementById('milestones-grid');
    
    if (view === 'timeline') {
        timelineContainer.classList.remove('hidden');
        gridContainer.classList.add('hidden');
    } else {
        timelineContainer.classList.add('hidden');
        gridContainer.classList.remove('hidden');
    }
}

// Render Milestones
function renderMilestones() {
    renderTimelineView();
    renderCardsView();
}

function renderTimelineView() {
    const container = document.getElementById('milestones-timeline');
    container.innerHTML = '<div class="timeline-line"></div>';
    
    userData.milestones.forEach((milestone, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.onclick = () => openMilestoneModal(milestone.id);
        
        const daysRemaining = calculateDaysRemaining(milestone.deadline);
        const statusClass = getStatusClass(milestone.status);
        const statusText = getStatusText(milestone.status);
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="milestone-header">
                    <h4 class="milestone-title">${milestone.title}</h4>
                    <span class="milestone-status ${statusClass}">${statusText}</span>
                </div>
                <p class="milestone-description">${milestone.description}</p>
                <div class="milestone-progress">
                    <div class="milestone-deadline">
                        <span>Prazo: ${formatDate(milestone.deadline)}</span>
                        <span>${milestone.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${milestone.progress}%"></div>
                    </div>
                    <div class="days-remaining">${daysRemaining} dias restantes</div>
                </div>
            </div>
            <div class="timeline-marker"></div>
        `;
        
        container.appendChild(timelineItem);
    });
}

function renderCardsView() {
    const container = document.getElementById('milestones-grid');
    container.innerHTML = '';
    
    userData.milestones.forEach(milestone => {
        const milestoneCard = document.createElement('div');
        milestoneCard.className = 'milestone-card';
        milestoneCard.onclick = () => openMilestoneModal(milestone.id);
        
        const daysRemaining = calculateDaysRemaining(milestone.deadline);
        const statusClass = getStatusClass(milestone.status);
        const statusText = getStatusText(milestone.status);
        
        milestoneCard.innerHTML = `
            <div class="milestone-header">
                <h4 class="milestone-title">${milestone.title}</h4>
                <span class="milestone-status ${statusClass}">${statusText}</span>
            </div>
            <p class="milestone-description">${milestone.description}</p>
            <div class="milestone-progress">
                <div class="milestone-deadline">
                    <span>Prazo: ${formatDate(milestone.deadline)}</span>
                    <span>${milestone.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${milestone.progress}%"></div>
                </div>
                <div class="days-remaining">${daysRemaining} dias restantes</div>
            </div>
        `;
        
        container.appendChild(milestoneCard);
    });
}

// Render Portfolio
function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    
    userData.portfolio.forEach(project => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        const statusClass = project.status.replace(/_/g, '_');
        const statusText = getPortfolioStatusText(project.status);
        
        portfolioItem.innerHTML = `
        <div>
            <div class="portfolio-header">
                <h4 class="portfolio-title">${project.title}</h4>
                <span class="portfolio-status ${statusClass}">${statusText}</span>
            </div>
            <p class="portfolio-description">${project.description}</p>
        </div>
            <div class="portfolio-tech">
                ${techTags}
            </div>
        `;
        
        container.appendChild(portfolioItem);
    });
}

// Render Learning Resources
function renderLearningResources() {
    const container = document.getElementById('learning-resources');
    
    userData.learning_resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.textContent = resource;
        container.appendChild(resourceCard);
    });
}

// Update Progress Statistics
function updateProgressStats() {
    const totalMilestones = userData.milestones.length;
    const completedMilestones = userData.milestones.filter(m => m.status === 'concluido').length;
    const overallProgress = Math.round(userData.milestones.reduce((sum, m) => sum + m.progress, 0) / totalMilestones);
    
    document.getElementById('overall-progress').textContent = `${overallProgress}%`;
    document.getElementById('completed-milestones').textContent = `${completedMilestones}/${totalMilestones}`;
    document.getElementById('total-skills').textContent = userData.hard_skills.length + userData.soft_skills.length;
    document.getElementById('hard-skills-count').textContent = userData.hard_skills.length;
    document.getElementById('soft-skills-count').textContent = userData.soft_skills.length;
    document.getElementById('total-projects').textContent = userData.portfolio.length;
}

// Modal functions
function openMilestoneModal(id) {
    const milestone = userData.milestones.find(m => m.id === id);
    if (!milestone) return;
    
    const daysRemaining = calculateDaysRemaining(milestone.deadline);
    const statusText = getStatusText(milestone.status);
    
    document.getElementById('modal-title').textContent = milestone.title;
    document.getElementById('modal-description').textContent = milestone.description;
    document.getElementById('modal-deadline').textContent = formatDate(milestone.deadline);
    document.getElementById('modal-days-remaining').textContent = `${daysRemaining} dias`;
    document.getElementById('modal-status').textContent = statusText;
    document.getElementById('modal-progress-fill').style.width = `${milestone.progress}%`;
    document.getElementById('modal-progress-text').textContent = `${milestone.progress}%`;
    
    document.getElementById('milestone-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('milestone-modal').style.display = 'none';
}

// Utility functions
function calculateDaysRemaining(deadline) {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getStatusClass(status) {
    switch(status) {
        case 'nao_iniciado': return 'not-started';
        case 'em_progresso': return 'in-progress';
        case 'concluido': return 'completed';
        default: return '';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'nao_iniciado': return 'Não iniciado';
        case 'em_progresso': return 'Em progresso';
        case 'concluido': return 'Concluído';
        default: return status;
    }
}

function getPortfolioStatusText(status) {
    switch(status) {
        case 'em_desenvolvimento': return 'Em desenvolvimento';
        case 'em_progresso': return 'Em progresso';
        case 'concluido': return 'Concluído';
        default: return status;
    }
}

function setLastUpdateDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('pt-BR', options);
    document.getElementById('last-update').textContent = formattedDate;
}

function calculateDaysRemaining() {
    const targetDate = new Date('2026-06-01'); 
    const currentDate = new Date();
    
    const diffTime = targetDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    return daysRemaining;
}

function updateDaysRemaining() {
    const daysRemaining = calculateDaysRemaining();
    const element = document.getElementById('days-remaining');
    
    if (element) {
        element.textContent = daysRemaining;
    }
}
