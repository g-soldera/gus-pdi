'use client'

import Link from 'next/link'
import { Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap, Award, Code, Shield } from 'lucide-react'
import { personalInfo, skills, projects } from '@/data/pdiData'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'

export default function HomePage() {
  const topSkills = skills.slice(0, 8).sort((a, b) => b.level - a.level).slice(0, 6)
  const featuredProjects = projects.filter(p => p.status === 'in-progress' || p.status === 'completed').slice(0, 4)
  
  const currentYear = new Date().getFullYear()
  const birthYear = new Date(personalInfo.birthDate).getFullYear()
  const age = currentYear - birthYear

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar placeholder */}
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold">
              GS
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {personalInfo.currentRole} → {personalInfo.targetRole}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>São Paulo, Brasil</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{personalInfo.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>{personalInfo.department}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center md:justify-start">
                <Link href="/feedback">
                  <Button size="lg" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Deixar Feedback
                  </Button>
                </Link>
                <a
                  href="https://linkedin.com/in/g-soldera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/g-soldera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Sobre</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Engenheiro de Analytics atuando em nível Pleno na área de Cyber Security do Itaú Unibanco, 
              com foco em AI Security, Agent Systems e Specification-Driven Development (SDD). 
              {age} anos, em transição para AI Security Specialist através de um framework estruturado 
              baseado em KPIs mensuráveis (L1-L7).
            </p>
            <p>
              Experiência prática em desenvolvimento de sistemas multi-agente, engenharia de prompts avançada, 
              arquitetura de soluções cloud (AWS) e SecMLOps. Certificações: AWS Cloud Practitioner, 
              CompTIA Security+, Analytics Engineer Interno.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Code className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Principais Competências</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {topSkills.map((skill) => (
              <div key={skill.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{skill.name}</h3>
                    <Badge variant="outline">{skill.category}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {skill.level.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">/ 5.0</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Projetos em Destaque</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                    {project.status === 'completed' ? 'Concluído' : 'Em progresso'}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Impacto:</p>
                  <p className="text-sm text-muted-foreground">{project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 5}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Certificações</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-primary font-semibold mb-1">AWS Cloud Practitioner</div>
              <div className="text-xs text-muted-foreground">Dezembro 2024</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-primary font-semibold mb-1">CompTIA Security+</div>
              <div className="text-xs text-muted-foreground">Abril 2026</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-primary font-semibold mb-1">Analytics Engineer Interno</div>
              <div className="text-xs text-muted-foreground">Setembro 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Interessado em trocar ideias sobre AI Security ou Agent Systems?
          </h3>
          <Link href="/feedback">
            <Button size="lg" className="gap-2">
              <Mail className="w-5 h-5" />
              Entre em contato
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border bg-card">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {currentYear} {personalInfo.name}. Portfólio profissional — PDI L2→L7.</p>
        </div>
      </footer>
    </main>
  )
}
