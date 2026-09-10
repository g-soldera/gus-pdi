'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react'
import { getPersonalInfo, getSkills, getProjects } from '@/data/pdiData'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import type { PersonalInfo, Skill, Project } from '@/types/pdi'

export default function HomePage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [info, sData, pData] = await Promise.all([
          getPersonalInfo(),
          getSkills(),
          getProjects()
        ])
        setPersonalInfo(info)
        setSkills(sData)
        setProjects(pData)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const topSkills = [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 6)
  
  const featuredProjects = projects
    .filter(p => p.status === 'in-progress' || p.status === 'completed')
    .slice(0, 3)
  
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ padding: '4rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(var(--primary), 0.1)', border: '1px solid rgba(var(--primary), 0.2)', width: 'fit-content' }}>
              <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(var(--primary), 1)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'rgba(var(--primary), 1)' }}>Analytics Engineer • Pleno</span>
            </div>
            
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.2', marginBottom: '0.5rem' }}>
                {personalInfo.name}
              </h1>
              <p style={{ fontSize: '1.25rem', fontWeight: '500', color: 'rgba(var(--muted-foreground), 1)' }}>
                Aspirante a AI Security Specialist
              </p>
            </div>

            <p style={{ fontSize: '1rem', color: 'rgba(var(--muted-foreground), 1)', lineHeight: '1.625' }}>
              Estudos focados em Agent Systems, Prompt Engineering e SecMLOps. \n
              Construindo soluções de IA segura no Itaú Unibanco.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Link href="/feedback">
                <Button size="lg" style={{ gap: '0.5rem' }}>
                  <Mail style={{ width: '1rem', height: '1rem' }} />
                  Feedback
                </Button>
              </Link>
              <Button size="lg" variant="outline" style={{ gap: '0.5rem' }} asChild>
                <a href="https://github.com/g-soldera" target="_blank" rel="noopener noreferrer" style={{ gap: '0.5rem' }}>
                  <Github style={{ width: '1rem', height: '1rem' }} />
                  GitHub
                </a>
              </Button>
              <Button size="lg" variant="outline" style={{ gap: '0.5rem' }} asChild>
                <a href="https://linkedin.com/in/soldera" target="_blank" rel="noopener noreferrer" style={{ gap: '0.5rem' }}>
                  <Linkedin style={{ width: '1rem', height: '1rem' }} />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          <div style={{ display: 'block', maxWidth: '12rem', width: '100%', height: '12rem', overflow: 'hidden', border: '2px solid rgba(var(--primary), 0.2)', borderRadius: '0.75rem', flexShrink: 0 }}>
            <img
              src="/assets/img/profile.png"
              alt={personalInfo.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'rgba(var(--muted), 0.3)' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '2rem' }}>Sobre</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: 'rgba(var(--primary), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(var(--primary), 1)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 style={{ fontWeight: '600' }}>Agent Systems</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(var(--muted-foreground), 1)' }}>
                Arquitetura e orquestração de agentes autônomos
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: 'rgba(var(--primary), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(var(--primary), 1)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 style={{ fontWeight: '600' }}>AI Security</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(var(--muted-foreground), 1)' }}>
                Segurança ofensiva e defensiva em IA
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: 'rgba(var(--primary), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(var(--primary), 1)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 style={{ fontWeight: '600' }}>Cloud & MLOps</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(var(--muted-foreground), 1)' }}>
                Arquitetura AWS e pipelines SecMLOps
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '1rem', color: 'rgba(var(--muted-foreground), 1)', lineHeight: '1.625' }}>
              Engenheiro de Analytics atuando em nível <strong style={{ color: 'rgba(var(--foreground), 1)' }}>Pleno</strong> na área de Cyber Security do <strong style={{ color: 'rgba(var(--foreground), 1)' }}>Itaú Unibanco</strong>, 
              com foco em AI Security, Agent Systems e Specification-Driven Development.
            </p>
            <p style={{ fontSize: '1rem', color: 'rgba(var(--muted-foreground), 1)', lineHeight: '1.625' }}>
              Experiência prática em desenvolvimento de sistemas multi-agente, engenharia de prompts avançada, 
              arquitetura de soluções cloud (AWS) e SecMLOps.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '2.5rem' }}>Competências</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {topSkills.map((skill) => (
              <div 
                key={skill.id} 
                style={{
                  backgroundColor: 'rgba(var(--card), 1)',
                  border: '1px solid rgba(var(--border), 1)',
                  borderRadius: '0.5rem',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: '600', fontSize: '0.875rem', lineHeight: '1.375', flex: '1 1 0%' }}>
                    {skill.name}
                  </h3>
                  <div style={{ textAlign: 'right', flexShrink: '0' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: '700', color: 'rgba(var(--primary), 1)' }}>
                      {skill.level.toFixed(1)}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  {skill.category}
                </Badge>
                <p style={{ fontSize: '0.875rem', color: 'rgba(var(--muted-foreground), 1)', lineHeight: '1.375' }}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'rgba(var(--muted), 0.3)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '2.5rem' }}>Projetos</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                style={{
                  backgroundColor: 'rgba(var(--card), 1)',
                  border: '1px solid rgba(var(--border), 1)',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontWeight: '600', flex: '1 1 0%' }}>
                    {project.title}
                  </h3>
                  <Badge 
                    variant={project.status === 'completed' ? 'default' : 'secondary'}
                    style={{ fontSize: '0.75rem', flexShrink: '0' }}
                  >
                    {project.status === 'completed' ? 'Concluído' : 'Andamento'}
                  </Badge>
                </div>
                
                <p style={{ fontSize: '0.875rem', color: 'rgba(var(--muted-foreground), 1)', marginBottom: '1rem' }}>
                  {project.description}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'rgba(var(--foreground), 1)' }}>Stack:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" style={{ fontSize: '0.75rem' }}>
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" style={{ fontSize: '0.75rem' }}>
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
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700' }}>
            Vamos conversar sobre AI Security?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(var(--muted-foreground), 1)' }}>
            Envie feedback, ideias ou sugestões
          </p>
          <Link href="/feedback" style={{ display: 'inline-block' }}>
            <Button size="lg" style={{ gap: '0.5rem' }}>
              <Mail style={{ width: '1rem', height: '1rem' }} />
              Deixar Feedback
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(var(--border), 1)', backgroundColor: 'rgba(var(--card), 0.5)', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(var(--muted-foreground), 1)' }}>
        <p>© {currentYear} {personalInfo.name}</p>
      </footer>
    </div>
  )
}
