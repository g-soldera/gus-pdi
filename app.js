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
        {name: "SQL", level: 5, description: "Linguagem avançada para consultas e modelagem"},
        {name: "Python", level: 5, description: "Programação e análise de dados"},
        {name: "Amazon QuickSight", level: 4, description: "Ferramenta de BI do banco"},
        {name: "PySpark", level: 4, description: "Processamento de big data"},
        {name: "AWS Glue", level: 4, description: "ETL e integração de dados"},
        {name: "AWS S3", level: 4, description: "Armazenamento de dados na nuvem"},
        {name: "Modelagem de Dados", level: 4, description: "Design e estruturação de modelos"},
        {name: "LLM e Agentes", level: 4, description: "Criação de soluções com IA"},
        {name: "Documentação Técnica", level: 4, description: "Doc Advocate especializado"}
    ],
    soft_skills: [
        {name: "Liderança", level: 4, description: "Capacidade de guiar equipes"},
        {name: "Apresentação", level: 4, description: "Comunicação para audiências"},
        {name: "Comunicação Verbal", level: 4, description: "Expressão oral clara"},
        {name: "Escuta Ativa", level: 2, description: "Área prioritária de desenvolvimento"},
        {name: "Empatia na Comunicação", level: 2, description: "Considerar perspectiva dos outros"},
        {name: "Gestão de Conflitos", level: 3, description: "Resolução de divergências"}
    ],
    milestones: [
        {
            id: 1,
            title: "Certificação Profissional",
            description: "Completar prova de engenheiro de analytics",
            deadline: "Agosto 2025",
            status: "em_progresso",
            progress: 60
        },
        {
            id: 2,
            title: "Liderar Projetos de Impacto",
            description: "Liderar pelo menos 2 projetos significativos",
            deadline: "Dezembro 2025",
            status: "em_progresso",
            progress: 25
        },
        {
            id: 3,
            title: "Mentorar Colegas",
            description: "Orientar membros júnior da equipe",
            deadline: "Outubro 2025",
            status: "nao_iniciado",
            progress: 0
        },
        {
            id: 4,
            title: "Workshops e Palestras",
            description: "Apresentar 3 workshops/palestras internas",
            deadline: "Novembro 2025",
            status: "nao_iniciado",
            progress: 0
        },
        {
            id: 5,
            title: "Decisões Estratégicas",
            description: "Participar ativamente de tomadas de decisão",
            deadline: "Dezembro 2025",
            status: "em_progresso",
            progress: 15
        },
        {
            id: 6,
            title: "Soft Skills",
            description: "Melhorar escuta ativa e empatia",
            deadline: "Setembro 2025",
            status: "em_progresso",
            progress: 30
        }
    ],
    portfolio: [
        {
            title: "Plataforma Front-end do Time",
            description: "Primeira plataforma front-end desenvolvida no time",
            status: "em_desenvolvimento",
            technologies: ["Javascript", "AWS", "Terraform", "Angular"]
        },
        {
            title: "Desenvolvimento de tabelas spec e consultorias de democratização",
            description: "Criando tabelas spec e auxiliando em democratização de dados",
            status: "em_progresso",
            technologies: ["SQL", "Python", "AWS Glue", "PySpark", "Terraform"]
        },
        {
            title: "Padronização de Dashboards",
            description: "Liderando padronização de design na comunidade cyber security",
            status: "em_progresso",
            technologies: ["QuickSight", "Figma", "Design Systems"]
        }
    ],
    learning_resources: [
        "Curso de Comunicação Não-Violenta",
        "Certificação Analytics Engineer",
        "Workshops de Liderança Técnica",
        "Mentoria com Senior Engineers",
        "Livros sobre AHSD e Comunicação"
    ]
};

// Global variables for modal handling
let currentMilestoneId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderSkills();
    renderMilestones();
    renderPortfolio();
    renderLearningResources();
    updateProgressStats();
    setLastUpdateDate();
    loadSavedNotes();
});

// Render Skills
function renderSkills() {
    const hardSkillsContainer = document.getElementById('hard-skills');
    const softSkillsContainer = document.getElementById('soft-skills');
    
    renderSkillSet(userData.hard_skills, hardSkillsContainer);
    renderSkillSet(userData.soft_skills, softSkillsContainer);
}

function renderSkillSet(skills, container) {
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        const skillHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <div class="skill-rating">
                    ${generateStars(skill.level)}
                </div>
            </div>
            <p class="skill-description">${skill.description}</p>
        `;
        
        skillItem.innerHTML = skillHTML;
        container.appendChild(skillItem);
    });
}

function generateStars(level) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= level ? 'filled' : ''}">★</span>`;
    }
    return stars;
}

// Render Milestones
function renderMilestones() {
    const milestonesContainer = document.getElementById('milestones-grid');
    
    userData.milestones.forEach(milestone => {
        const milestoneCard = document.createElement('div');
        milestoneCard.className = 'milestone-card';
        milestoneCard.setAttribute('data-id', milestone.id);
        milestoneCard.onclick = () => openMilestoneModal(milestone.id);
        
        const statusClass = getStatusClass(milestone.status);
        const statusText = getStatusText(milestone.status);
        
        const milestoneHTML = `
            <div class="milestone-header">
                <h4 class="milestone-title">${milestone.title}</h4>
                <span class="milestone-status ${statusClass}">${statusText}</span>
            </div>
            <p class="milestone-description">${milestone.description}</p>
            <div class="milestone-progress">
                <div class="milestone-deadline">
                    <span>Prazo: ${milestone.deadline}</span>
                    <span>${milestone.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${milestone.progress}%"></div>
                </div>
            </div>
        `;
        
        milestoneCard.innerHTML = milestoneHTML;
        milestonesContainer.appendChild(milestoneCard);
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

// Render Portfolio
function renderPortfolio() {
    const portfolioContainer = document.getElementById('portfolio-grid');
    
    userData.portfolio.forEach(project => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        const portfolioHTML = `
            <div class="portfolio-content">
                <h4 class="portfolio-title">${project.title}</h4>
                <p class="portfolio-description">${project.description}</p>
                <div class="portfolio-tech">
                    ${techTags}
                </div>
            </div>
        `;
        
        portfolioItem.innerHTML = portfolioHTML;
        portfolioContainer.appendChild(portfolioItem);
    });
}

// Render Learning Resources
function renderLearningResources() {
    const resourcesContainer = document.getElementById('learning-resources');
    
    userData.learning_resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.textContent = resource;
        resourcesContainer.appendChild(resourceCard);
    });
}

// Update Progress Statistics
function updateProgressStats() {
    // Calculate overall progress
    const totalMilestones = userData.milestones.length;
    const completedMilestones = userData.milestones.filter(m => m.status === 'concluido').length;
    const overallProgress = Math.round(userData.milestones.reduce((sum, m) => sum + m.progress, 0) / totalMilestones);
    
    // Calculate days remaining
    const targetDate = new Date('2026-06-03');
    const currentDate = new Date();
    const daysRemaining = Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24));
    
    // Update DOM
    document.getElementById('overall-progress').textContent = overallProgress;
    document.getElementById('completed-milestones').textContent = completedMilestones;
    document.getElementById('days-remaining').textContent = daysRemaining;
}

// Set last update date
function setLastUpdateDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('pt-BR', options);
    document.getElementById('last-update').textContent = formattedDate;
}

// Modal functions
function openMilestoneModal(id) {
    const milestone = userData.milestones.find(m => m.id === id);
    if (!milestone) return;
    
    currentMilestoneId = id;
    
    document.getElementById('modal-title').textContent = milestone.title;
    document.getElementById('modal-description').textContent = milestone.description;
    document.getElementById('modal-progress-fill').style.width = `${milestone.progress}%`;
    document.getElementById('modal-progress-text').textContent = `${milestone.progress}%`;
    
    document.getElementById('milestone-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('milestone-modal').style.display = 'none';
    currentMilestoneId = null;
}

function updateProgress(amount) {
    if (currentMilestoneId === null) return;
    
    const milestoneIndex = userData.milestones.findIndex(m => m.id === currentMilestoneId);
    if (milestoneIndex === -1) return;
    
    let newProgress = userData.milestones[milestoneIndex].progress + amount;
    
    // Ensure progress stays within 0-100 range
    newProgress = Math.max(0, Math.min(100, newProgress));
    
    // Update the milestone
    userData.milestones[milestoneIndex].progress = newProgress;
    
    // Update status based on progress
    if (newProgress === 0) {
        userData.milestones[milestoneIndex].status = 'nao_iniciado';
    } else if (newProgress < 100) {
        userData.milestones[milestoneIndex].status = 'em_progresso';
    } else {
        userData.milestones[milestoneIndex].status = 'concluido';
    }
    
    // Update modal UI
    document.getElementById('modal-progress-fill').style.width = `${newProgress}%`;
    document.getElementById('modal-progress-text').textContent = `${newProgress}%`;
    
    // Regenerate milestone cards to reflect updates
    document.getElementById('milestones-grid').innerHTML = '';
    renderMilestones();
    
    // Update progress stats
    updateProgressStats();
    
    // Save to local storage
    savePDIData();
}

function markComplete() {
    if (currentMilestoneId === null) return;
    
    const milestoneIndex = userData.milestones.findIndex(m => m.id === currentMilestoneId);
    if (milestoneIndex === -1) return;
    
    userData.milestones[milestoneIndex].progress = 100;
    userData.milestones[milestoneIndex].status = 'concluido';
    
    // Update modal UI
    document.getElementById('modal-progress-fill').style.width = '100%';
    document.getElementById('modal-progress-text').textContent = '100%';
    
    // Regenerate milestone cards to reflect updates
    document.getElementById('milestones-grid').innerHTML = '';
    renderMilestones();
    
    // Update progress stats
    updateProgressStats();
    
    // Save to local storage
    savePDIData();
}

// Notes functions
function saveNotes() {
    const notesText = document.getElementById('notes-area').value;
    
    // In a real implementation, this would save to a database
    // For this demo, we'll just show a confirmation
    alert('Notas salvas com sucesso!');
    
    // Save notes to session (this would be a database in a real app)
    sessionStorage.setItem('pdi_notes', notesText);
}

function loadSavedNotes() {
    const savedNotes = sessionStorage.getItem('pdi_notes');
    if (savedNotes) {
        document.getElementById('notes-area').value = savedNotes;
    }
}

// Data persistence (simulation)
function savePDIData() {
    // In a real implementation, this would save to a database
    // For this demo, we just update the last update date
    setLastUpdateDate();
    
    // We could save to sessionStorage for session persistence
    sessionStorage.setItem('pdi_data', JSON.stringify(userData));
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('milestone-modal');
    if (event.target === modal) {
        closeModal();
    }
};

// Prevent default form submission
document.addEventListener('submit', function(e) {
    e.preventDefault();
});