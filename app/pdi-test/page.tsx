import { 
  fetchSkills, 
  fetchMilestones, 
  fetchProjects, 
  fetchResources, 
  fetchPersonalInfo 
} from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

export default async function PdiTestPage() {
  // Fetch data using public client queries
  const { data: skills, error: skillsError } = await fetchSkills()
  const { data: milestones, error: milestonesError } = await fetchMilestones()
  const { data: projects, error: projectsError } = await fetchProjects()
  const { data: resources, error: resourcesError } = await fetchResources()
  const { data: personalInfo, error: personalInfoError } = await fetchPersonalInfo()

  // Fetch filtered subsets to test query performance & index usage
  const { data: categorySkills } = await fetchSkills({ category: 'IA Generativa' })
  const { data: inProgressMilestones } = await fetchMilestones({ status: 'in-progress' })

  // Pick sample items for JSONB verification
  const sampleSkill = skills.find(s => s.requirements && s.requirements.length > 0) || skills[0]
  const sampleMilestone = milestones.find(m => m.objectives && m.objectives.length > 0) || milestones[0]
  const sampleProject = projects[0]
  const sampleResource = resources[0]

  return (
    <main className="min-h-screen py-8 px-4 bg-background max-w-5xl mx-auto space-y-8">
      <header className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Supabase PDI Integration Test</h1>
        <p className="text-muted-foreground mt-1">
          Verification page for Phase 03 Database Migration. Displays data fetched via public client.
        </p>
      </header>

      {/* Connection Errors Display */}
      {(skillsError || milestonesError || projectsError || resourcesError || personalInfoError) && (
        <section className="bg-destructive/10 border border-destructive rounded-lg p-4 text-destructive">
          <h2 className="font-semibold text-lg mb-2">⚠ Query Errors Detected</h2>
          <ul className="list-disc list-inside space-y-1 text-sm font-mono">
            {skillsError && <li>Skills error: {skillsError}</li>}
            {milestonesError && <li>Milestones error: {milestonesError}</li>}
            {projectsError && <li>Projects error: {projectsError}</li>}
            {resourcesError && <li>Resources error: {resourcesError}</li>}
            {personalInfoError && <li>Personal Info error: {personalInfoError}</li>}
          </ul>
          <p className="text-xs mt-3 text-muted-foreground">
            Note: If Supabase variables or tables are not yet set up, run `docs/pdi-schema.sql` in Supabase SQL Editor and `scripts/migrate-pdi-data.ts`.
          </p>
        </section>
      )}

      {/* Personal Info Section */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-3">
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
          Personal Info (Singleton)
        </h2>
        {personalInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span> <strong className="text-foreground">{personalInfo.name}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Current Role:</span> <strong className="text-foreground">{personalInfo.currentRole} ({personalInfo.currentLevel})</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Target Role:</span> <strong className="text-foreground">{personalInfo.targetRole} ({personalInfo.targetLevel})</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Company:</span> <strong className="text-foreground">{personalInfo.company} - {personalInfo.department}</strong>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No personal info record found in Supabase.</p>
        )}
      </section>

      {/* Summary Counts Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-primary">{skills.length}</span>
          <p className="text-sm text-muted-foreground mt-1">Skills</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-primary">{milestones.length}</span>
          <p className="text-sm text-muted-foreground mt-1">Milestones</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-primary">{projects.length}</span>
          <p className="text-sm text-muted-foreground mt-1">Projects</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-primary">{resources.length}</span>
          <p className="text-sm text-muted-foreground mt-1">Resources</p>
        </div>
      </section>

      {/* Sample Data & JSONB Verification */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
          Sample Items &amp; JSONB Deserialization
        </h2>

        {/* Sample Skill */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-foreground">{sampleSkill?.name || 'No skill available'}</h3>
            <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
              Level {sampleSkill?.level} | {sampleSkill?.category} | {sampleSkill?.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{sampleSkill?.description}</p>
          {sampleSkill?.requirements && (
            <div className="mt-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Requirements JSONB Array ({sampleSkill.requirements.length} items):
              </span>
              <ul className="mt-1 list-disc list-inside text-xs space-y-1 text-foreground">
                {sampleSkill.requirements.map(req => (
                  <li key={req.id}>{req.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sample Milestone */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-foreground">{sampleMilestone?.title || 'No milestone available'}</h3>
            <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
              Status: {sampleMilestone?.status} | Progress: {sampleMilestone?.progress}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{sampleMilestone?.description}</p>
          {sampleMilestone?.objectives && (
            <div className="mt-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Objectives JSONB Array ({sampleMilestone.objectives.length} items):
              </span>
              <ul className="mt-1 list-disc list-inside text-xs space-y-1 text-foreground">
                {sampleMilestone.objectives.map((obj, i) => (
                  <li key={i} className={obj.completed ? 'line-through text-muted-foreground' : ''}>
                    {obj.text} {obj.completed ? '✓' : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sample Project */}
        {sampleProject && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-foreground">{sampleProject.title}</h3>
              <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                Status: {sampleProject.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{sampleProject.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {sampleProject.technologies.map(tech => (
                <span key={tech} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sample Resource */}
        {sampleResource && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-foreground">{sampleResource.name}</h3>
              <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                Category: {sampleResource.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{sampleResource.description}</p>
          </div>
        )}
      </section>

      {/* Filtered Queries Section */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
          Filtered Queries (Index Validation)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border border-border rounded bg-background">
            <h4 className="font-semibold text-foreground">Category Filter: &quot;IA Generativa&quot;</h4>
            <p className="text-muted-foreground mt-1">Found {categorySkills.length} matching skills</p>
            <ul className="mt-2 text-xs space-y-1">
              {categorySkills.slice(0, 3).map(s => (
                <li key={s.id} className="text-foreground">• {s.name}</li>
              ))}
              {categorySkills.length > 3 && (
                <li className="text-muted-foreground">... and {categorySkills.length - 3} more</li>
              )}
            </ul>
          </div>

          <div className="p-4 border border-border rounded bg-background">
            <h4 className="font-semibold text-foreground">Status Filter: &quot;in-progress&quot;</h4>
            <p className="text-muted-foreground mt-1">Found {inProgressMilestones.length} in-progress milestones</p>
            <ul className="mt-2 text-xs space-y-1">
              {inProgressMilestones.slice(0, 3).map(m => (
                <li key={m.id} className="text-foreground">• {m.title}</li>
              ))}
              {inProgressMilestones.length > 3 && (
                <li className="text-muted-foreground">... and {inProgressMilestones.length - 3} more</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
