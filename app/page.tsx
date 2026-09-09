'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-primary">Engenheiro de Analytics</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                {personalInfo.name}
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
                AI Security Specialist em Transição
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Especialista em Agent Systems, Prompt Engineering avançado e SecMLOps. 
              Construindo soluções de IA segura no Itaú Unibanco.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/feedback">
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <Mail className="w-5 h-5" />
                  Deixar Feedback
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="https://github.com/g-soldera" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="https://linkedin.com/in/g-soldera" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="relative lg:h-full flex items-center justify-center">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-2xl" />
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
                <Image
                  src="https://github.com/g-soldera.png"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">Sobre</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Agent Systems</h3>
              <p className="text-muted-foreground">
                Especialista em arquitetura, orquestração e execução de agentes autônomos
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI Security</h3>
              <p className="text-muted-foreground">
                Segurança ofensiva e defensiva em IA, testes adversariais e proteção
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Cloud & MLOps</h3>
              <p className="text-muted-foreground">
                Arquitetura AWS, SecMLOps e pipelines de entrega contínua
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Engenheiro de Analytics atuando em nível Pleno na área de Cyber Security do <strong className="text-foreground">Itaú Unibanco</strong>, 
              com foco em <strong className="text-foreground">AI Security, Agent Systems e Specification-Driven Development</strong>.
            </p>
            <p>
              Experiência prática em desenvolvimento de sistemas multi-agente, engenharia de prompts avançada, 
              arquitetura de soluções cloud (AWS) e SecMLOps com framework estruturado de desenvolvimento.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">Competências Principais</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSkills.map((skill) => (
              <div 
                key={skill.id} 
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {skill.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {skill.level.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">/ 5</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">Projetos</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/50"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-semibold text-foreground flex-1">
                      {project.title}
                    </h3>
                    <Badge 
                      variant={project.status === 'completed' ? 'default' : 'secondary'}
                      className="shrink-0"
                    >
                      {project.status === 'completed' ? 'Concluído' : 'Andamento'}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground">Stack:</p>
                    <div className="flex flex-wrap gap-2">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Vamos conversar sobre AI Security?
          </h2>
          <p className="text-lg text-muted-foreground">
            Envie feedback, ideias ou simplesmente cumprimente
          </p>
          <Link href="/feedback">
            <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Mail className="w-5 h-5" />
              Deixar Feedback
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {currentYear} {personalInfo.name} — Engenheiro de Analytics</p>
        </div>
      </footer>
    </div>
  )
}
