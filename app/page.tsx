'use client'

import Link from 'next/link'
import { Mail, Linkedin, Github, ArrowRight, Code2, Shield, Zap } from 'lucide-react'
import { personalInfo, skills, projects } from '@/data/pdiData'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'

export default function HomePage() {
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 6)
  
  const featuredProjects = projects
    .filter(p => p.status === 'in-progress' || p.status === 'completed')
    .slice(0, 3)
  
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium text-primary">Analytics Engineer • Pleno</span>
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-xl text-muted-foreground font-medium mt-2">
                  Aspirante a AI Security Specialist
                </p>
              </div>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Especialista em Agent Systems, Prompt Engineering e SecMLOps. 
                Construindo soluções de IA segura no Itaú Unibanco.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/feedback">
                  <Button size="lg" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Feedback
                  </Button>
                </Link>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/g-soldera" target="_blank" rel="noopener noreferrer" className="gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://linkedin.com/in/soldera" target="_blank" rel="noopener noreferrer" className="gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-primary/20 flex-shrink-0">
                <img
                  src="https://github.com/g-soldera.png?size=256"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Sobre</h2>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Agent Systems</h3>
              <p className="text-sm text-muted-foreground">
                Arquitetura e orquestração de agentes autônomos
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">AI Security</h3>
              <p className="text-sm text-muted-foreground">
                Segurança ofensiva e defensiva em IA
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Cloud & MLOps</h3>
              <p className="text-sm text-muted-foreground">
                Arquitetura AWS e pipelines SecMLOps
              </p>
            </div>
          </div>

          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              Engenheiro de Analytics atuando em nível <strong className="text-foreground">Pleno</strong> na área de Cyber Security do <strong className="text-foreground">Itaú Unibanco</strong>, 
              com foco em AI Security, Agent Systems e Specification-Driven Development.
            </p>
            <p>
              Experiência prática em desenvolvimento de sistemas multi-agente, engenharia de prompts avançada, 
              arquitetura de soluções cloud (AWS) e SecMLOps.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Competências</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSkills.map((skill) => (
              <div 
                key={skill.id} 
                className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="font-semibold text-sm leading-snug flex-1">
                    {skill.name}
                  </h3>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold text-primary">
                      {skill.level.toFixed(1)}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs mb-2">
                  {skill.category}
                </Badge>
                <p className="text-sm text-muted-foreground leading-snug">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Projetos</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start gap-3 mb-4">
                  <h3 className="font-semibold flex-1">
                    {project.title}
                  </h3>
                  <Badge 
                    variant={project.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs flex-shrink-0"
                  >
                    {project.status === 'completed' ? 'Concluído' : 'Andamento'}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Stack:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Vamos conversar sobre AI Security?
          </h2>
          <p className="text-base text-muted-foreground">
            Envie feedback, ideias ou sugestões
          </p>
          <Link href="/feedback" className="inline-block">
            <Button size="lg" className="gap-2">
              <Mail className="w-4 h-4" />
              Deixar Feedback
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 md:px-6 lg:px-8 border-t border-border bg-card/50 text-center text-xs text-muted-foreground">
        <p>© {currentYear} {personalInfo.name}</p>
      </footer>
    </div>
  )
}
