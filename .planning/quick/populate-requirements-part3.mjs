import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Continuação: domínios 7-9 (final)
const skillRequirements = {
  // ============================================================================
  // DOMÍNIO 7: LINGUAGENS & PARADIGMAS
  // ============================================================================
  'python-core': [
    { id: 'req-type-hints', text: 'Type hints e type checking', completed: true },
    { id: 'req-decorators', text: 'Decorators avançados', completed: true },
    { id: 'req-generators', text: 'Generators e iterators', completed: true },
    { id: 'req-dunder', text: 'Dunder methods e magic methods', completed: true },
    { id: 'req-memory', text: 'Memory management e GIL', completed: false }
  ],
  
  'python-async': [
    { id: 'req-asyncio', text: 'AsyncIO e event loop', completed: true },
    { id: 'req-threading', text: 'Threading', completed: true },
    { id: 'req-multiprocessing', text: 'Multiprocessing', completed: false },
    { id: 'req-gil', text: 'GIL (Global Interpreter Lock)', completed: false },
    { id: 'req-coroutines', text: 'Coroutines e async/await', completed: true }
  ],
  
  'typescript-modern': [
    { id: 'req-generics', text: 'Generics e type constraints', completed: true },
    { id: 'req-utility-types', text: 'Utility types (Pick, Omit, etc)', completed: true },
    { id: 'req-esnext', text: 'ESNext features', completed: true },
    { id: 'req-type-guards', text: 'Type guards e narrowing', completed: true },
    { id: 'req-advanced-patterns', text: 'Advanced type patterns', completed: false }
  ],
  
  'javascript': [
    { id: 'req-es6', text: 'ES6+ features', completed: true },
    { id: 'req-event-loop', text: 'Event loop e concurrency model', completed: true },
    { id: 'req-closures', text: 'Closures e scope', completed: true },
    { id: 'req-promises', text: 'Promises', completed: true },
    { id: 'req-async-await', text: 'Async/await', completed: true }
  ],
  
  'java-jvm': [
    { id: 'req-jvm-internals', text: 'JVM internals', completed: false },
    { id: 'req-memory-tuning', text: 'Memory tuning (heap, GC)', completed: false },
    { id: 'req-streams', text: 'Streams API', completed: false },
    { id: 'req-spring-boot', text: 'Spring Boot', completed: false },
    { id: 'req-dependency-injection', text: 'Dependency Injection', completed: false }
  ],
  
  'oop-principles': [
    { id: 'req-encapsulation', text: 'Encapsulation', completed: true },
    { id: 'req-inheritance', text: 'Inheritance', completed: true },
    { id: 'req-polymorphism', text: 'Polymorphism', completed: true },
    { id: 'req-solid', text: 'SOLID principles', completed: true },
    { id: 'req-design-patterns', text: 'Design Patterns (GoF)', completed: true }
  ],
  
  'functional-paradigms': [
    { id: 'req-immutability', text: 'Immutability', completed: true },
    { id: 'req-pure-functions', text: 'Pure functions', completed: true },
    { id: 'req-higher-order', text: 'Higher-order functions', completed: true },
    { id: 'req-currying', text: 'Currying e partial application', completed: false },
    { id: 'req-monads', text: 'Monads e functors', completed: false }
  ],
  
  'clean-code-sdd': [
    { id: 'req-refactoring', text: 'Refactoring techniques', completed: true },
    { id: 'req-testability', text: 'Testability', completed: true },
    { id: 'req-readability', text: 'Code readability', completed: true },
    { id: 'req-code-smells', text: 'Code smells detection', completed: true },
    { id: 'req-sdd', text: 'Spec-Driven Development', completed: true }
  ],
  
  'bash': [
    { id: 'req-scripting', text: 'Shell scripting basics', completed: true },
    { id: 'req-automation', text: 'Automation scripts', completed: true },
    { id: 'req-text-processing', text: 'Text processing (awk, sed, grep)', completed: true }
  ],
  
  // ============================================================================
  // DOMÍNIO 8: ENGENHARIA DE SOFTWARE
  // ============================================================================
  'git': [
    { id: 'req-branching', text: 'Branching strategies', completed: true },
    { id: 'req-merge-rebase', text: 'Merge vs Rebase', completed: true },
    { id: 'req-cherry-pick', text: 'Cherry-pick', completed: true },
    { id: 'req-bisect', text: 'Bisect (debugging)', completed: false },
    { id: 'req-workflows', text: 'Collaborative workflows (Gitflow, trunk-based)', completed: true }
  ],
  
  'testing': [
    { id: 'req-unit-tests', text: 'Unit tests', completed: true },
    { id: 'req-integration-tests', text: 'Integration tests', completed: true },
    { id: 'req-e2e', text: 'End-to-end tests', completed: false },
    { id: 'req-mocking', text: 'Mocking e stubbing', completed: true },
    { id: 'req-tdd', text: 'TDD (Test-Driven Development)', completed: false }
  ],
  
  'linters': [
    { id: 'req-eslint', text: 'ESLint', completed: true },
    { id: 'req-prettier', text: 'Prettier', completed: true },
    { id: 'req-sonarqube', text: 'SonarQube', completed: false },
    { id: 'req-static-analysis', text: 'Static analysis tools', completed: true },
    { id: 'req-pre-commit', text: 'Pre-commit hooks', completed: true }
  ],
  
  'ux': [
    { id: 'req-user-research', text: 'User research', completed: false },
    { id: 'req-wireframing', text: 'Wireframing', completed: true },
    { id: 'req-usability', text: 'Usability principles', completed: true },
    { id: 'req-accessibility', text: 'Accessibility (WCAG)', completed: false },
    { id: 'req-user-testing', text: 'User testing', completed: false }
  ],
  
  'figma': [
    { id: 'req-prototyping', text: 'Prototyping', completed: true },
    { id: 'req-components', text: 'Components e variants', completed: false },
    { id: 'req-auto-layout', text: 'Auto Layout', completed: false },
    { id: 'req-design-systems', text: 'Design systems', completed: false },
    { id: 'req-collaboration', text: 'Collaboration features', completed: true }
  ],
  
  'web-frontend-arch': [
    { id: 'req-react', text: 'React e hooks', completed: true },
    { id: 'req-state-management', text: 'State management', completed: true },
    { id: 'req-routing', text: 'Routing', completed: true },
    { id: 'req-performance', text: 'Performance optimization', completed: false }
  ],
  
  'languages-tooling': [
    { id: 'req-python', text: 'Python scripting', completed: true },
    { id: 'req-typescript', text: 'TypeScript', completed: true },
    { id: 'req-bash', text: 'Bash automation', completed: true }
  ],
  
  // ============================================================================
  // DOMÍNIO 9: LIDERANÇA & SOFT SKILLS
  // ============================================================================
  'leadership-mentorship': [
    { id: 'req-code-review', text: 'Code reviews e feedback construtivo', completed: true },
    { id: 'req-onboarding', text: 'Onboarding estruturado', completed: true },
    { id: 'req-mentoring', text: 'Mentoria contínua', completed: true },
    { id: 'req-staff', text: 'Staff Engineering', completed: false },
    { id: 'req-executive', text: 'Executive leadership', completed: false }
  ],
  
  'executive-communication': [
    { id: 'req-status', text: 'Comunicação de status clara', completed: true },
    { id: 'req-presentations', text: 'Apresentações técnicas', completed: true },
    { id: 'req-storytelling', text: 'Storytelling com dados', completed: true },
    { id: 'req-cnv', text: 'Comunicação Não-Violenta (CNV)', completed: true },
    { id: 'req-influence', text: 'Influência executiva', completed: false }
  ],
  
  'technical-mentoring': [
    { id: 'req-knowledge-sharing', text: 'Knowledge sharing', completed: true },
    { id: 'req-pair-programming', text: 'Pair programming', completed: true },
    { id: 'req-career-coaching', text: 'Career coaching', completed: true },
    { id: 'req-feedback-loops', text: 'Feedback loops', completed: true }
  ],
  
  'cnv-negotiation': [
    { id: 'req-active-listening', text: 'Escuta ativa', completed: true },
    { id: 'req-empathy', text: 'Empatia', completed: true },
    { id: 'req-conflict-resolution', text: 'Resolução de conflitos', completed: true },
    { id: 'req-negotiation', text: 'Negotiation techniques', completed: false },
    { id: 'req-influence', text: 'Influence without authority', completed: true }
  ],
  
  'strategic-roadmapping': [
    { id: 'req-roadmapping', text: 'Roadmapping técnico', completed: true },
    { id: 'req-okrs', text: 'OKRs e goal setting', completed: false },
    { id: 'req-stakeholder-alignment', text: 'Alinhamento de stakeholders', completed: true },
    { id: 'req-business-acumen', text: 'Business acumen', completed: false },
    { id: 'req-priority-mgmt', text: 'Priority management', completed: true }
  ],
  
  'collaboration': [
    { id: 'req-team-dynamics', text: 'Team dynamics', completed: true },
    { id: 'req-cross-functional', text: 'Cross-functional collaboration', completed: true },
    { id: 'req-async-communication', text: 'Async communication', completed: true },
    { id: 'req-documentation', text: 'Documentation practices', completed: true }
  ],
  
  'time-management': [
    { id: 'req-prioritization', text: 'Task prioritization', completed: true },
    { id: 'req-focus-techniques', text: 'Focus techniques (Pomodoro, etc)', completed: true },
    { id: 'req-calendar-mgmt', text: 'Calendar management', completed: true },
    { id: 'req-deep-work', text: 'Deep work practices', completed: true }
  ],
  
  'emotional-intelligence': [
    { id: 'req-self-awareness', text: 'Self-awareness', completed: true },
    { id: 'req-self-regulation', text: 'Self-regulation', completed: true },
    { id: 'req-social-awareness', text: 'Social awareness', completed: true },
    { id: 'req-relationship-mgmt', text: 'Relationship management', completed: true }
  ],
  
  'technical-docs': [
    { id: 'req-rfcs', text: 'RFCs (Request for Comments)', completed: true },
    { id: 'req-design-docs', text: 'Design docs', completed: true },
    { id: 'req-api-docs', text: 'API documentation', completed: true },
    { id: 'req-runbooks', text: 'Runbooks', completed: false }
  ],
  
  'feedback': [
    { id: 'req-constructive-feedback', text: 'Constructive feedback', completed: true },
    { id: 'req-code-review-practices', text: 'Code review best practices', completed: true },
    { id: 'req-receiving-feedback', text: 'Receiving feedback gracefully', completed: true }
  ],
  
  'self-awareness': [
    { id: 'req-introspection', text: 'Introspection practices', completed: true },
    { id: 'req-strengths-weaknesses', text: 'Understanding strengths/weaknesses', completed: true },
    { id: 'req-growth-mindset', text: 'Growth mindset', completed: true }
  ],
  
  'situational-leadership': [
    { id: 'req-leadership-styles', text: '4 estilos de liderança situacional', completed: false },
    { id: 'req-context-awareness', text: 'Context awareness', completed: true },
    { id: 'req-adaptability', text: 'Leadership adaptability', completed: true }
  ],
  
  'stakeholder-management': [
    { id: 'req-identification', text: 'Stakeholder identification', completed: true },
    { id: 'req-communication-plans', text: 'Communication plans', completed: true },
    { id: 'req-expectation-mgmt', text: 'Expectation management', completed: true }
  ],
  
  'presentation': [
    { id: 'req-slide-design', text: 'Slide design', completed: true },
    { id: 'req-public-speaking', text: 'Public speaking', completed: true },
    { id: 'req-audience-adaptation', text: 'Audience adaptation', completed: true }
  ],
  
  'influence': [
    { id: 'req-persuasion', text: 'Persuasion techniques', completed: true },
    { id: 'req-credibility', text: 'Building credibility', completed: true },
    { id: 'req-coalition-building', text: 'Coalition building', completed: false }
  ],
  
  'verbal-communication': [
    { id: 'req-clarity', text: 'Clear verbal communication', completed: true },
    { id: 'req-conciseness', text: 'Conciseness', completed: true },
    { id: 'req-tone-modulation', text: 'Tone modulation', completed: true }
  ],
  
  'active-listening': [
    { id: 'req-attentive-listening', text: 'Attentive listening', completed: true },
    { id: 'req-paraphrasing', text: 'Paraphrasing e reflection', completed: true },
    { id: 'req-non-verbal-cues', text: 'Reading non-verbal cues', completed: true }
  ],
  
  'empathy': [
    { id: 'req-perspective-taking', text: 'Perspective-taking', completed: true },
    { id: 'req-emotional-recognition', text: 'Emotional recognition', completed: true },
    { id: 'req-compassionate-response', text: 'Compassionate response', completed: true }
  ],
  
  'critical-thinking-problem-solving': [
    { id: 'req-analytical-thinking', text: 'Analytical thinking', completed: true },
    { id: 'req-root-cause-analysis', text: 'Root cause analysis', completed: true },
    { id: 'req-structured-problem-solving', text: 'Structured problem-solving', completed: true }
  ],
  
  'strategic-vision-career': [
    { id: 'req-goal-setting', text: 'Long-term goal setting', completed: true },
    { id: 'req-career-planning', text: 'Career planning', completed: true },
    { id: 'req-industry-awareness', text: 'Industry trends awareness', completed: true }
  ],
  
  'adaptability-resilience': [
    { id: 'req-change-management', text: 'Change management', completed: true },
    { id: 'req-stress-tolerance', text: 'Stress tolerance', completed: true },
    { id: 'req-learning-agility', text: 'Learning agility', completed: true }
  ],
  
  'communication-storytelling': [
    { id: 'req-narrative-structure', text: 'Narrative structure', completed: true },
    { id: 'req-data-storytelling', text: 'Data storytelling', completed: true },
    { id: 'req-executive-summaries', text: 'Executive summaries', completed: true }
  ],
  
  'relational-influence-cnv': [
    { id: 'req-relationship-building', text: 'Relationship building', completed: true },
    { id: 'req-cnv-framework', text: 'CNV framework', completed: true },
    { id: 'req-influence-strategies', text: 'Influence strategies', completed: true }
  ],
  
  'executive-technical-leadership': [
    { id: 'req-vision-setting', text: 'Technical vision setting', completed: false },
    { id: 'req-org-strategy', text: 'Organizational strategy', completed: false },
    { id: 'req-executive-presence', text: 'Executive presence', completed: false }
  ],
  
  'org-design-scaling': [
    { id: 'req-team-topologies', text: 'Team Topologies', completed: false },
    { id: 'req-conways-law', text: "Conway's Law application", completed: false },
    { id: 'req-scaling-teams', text: 'Scaling engineering teams', completed: false }
  ]
};

console.log('Preparando população de requirements PARTE 3 (FINAL) para', Object.keys(skillRequirements).length, 'skills...');
console.log('Total de microskills mapeados:', Object.values(skillRequirements).flat().length);
console.log('\nPressione Ctrl+C para cancelar ou aguarde 3 segundos...\n');

await new Promise(resolve => setTimeout(resolve, 3000));

async function populateRequirements() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('=== POPULANDO REQUIREMENTS PARTE 3 FINAL (MICROSKILLS) ===\n');

  let updatedCount = 0;
  let skippedCount = 0;
  const errors = [];

  for (const [skillId, requirements] of Object.entries(skillRequirements)) {
    try {
      const { data: existing } = await supabase.from('skills').select('id').eq('id', skillId).single();
      
      if (!existing) {
        skippedCount++;
        console.log(`⚠️  Skill não encontrada: ${skillId}`);
        continue;
      }

      const completedCount = requirements.filter(r => r.completed).length;
      const totalCount = requirements.length;
      const calculatedLevel = 1 + 4 * (completedCount / totalCount);
      const level = Math.round(calculatedLevel * 10) / 10;

      const { error } = await supabase.from('skills').update({
        requirements: requirements,
        level: level
      }).eq('id', skillId);

      if (error) {
        errors.push({ skill: skillId, error: error.message });
        console.log(`❌ ${skillId}: ${error.message}`);
      } else {
        updatedCount++;
        console.log(`✓ ${skillId} (${requirements.length} requirements, nível: ${level})`);
      }
    } catch (err) {
      errors.push({ skill: skillId, error: err.message });
      console.log(`❌ ${skillId}: ${err.message}`);
    }
  }

  console.log(`\n=== RESULTADO PARTE 3 FINAL ===`);
  console.log(`✓ Skills atualizadas: ${updatedCount}`);
  console.log(`⚠️  Skills não encontradas: ${skippedCount}`);
  console.log(`❌ Erros: ${errors.length}`);

  if (errors.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'populate-requirements-part3-errors.json'),
      JSON.stringify(errors, null, 2)
    );
  }

  fs.writeFileSync(
    path.join(__dirname, 'populate-requirements-part3-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      updated_count: updatedCount,
      skipped_count: skippedCount,
      errors: errors,
      total_mapped: Object.keys(skillRequirements).length,
      total_microskills: Object.values(skillRequirements).flat().length
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/populate-requirements-part3-result.json');
  console.log('\n🎉 POPULAÇÃO DE REQUIREMENTS CONCLUÍDA! 🎉');
}

populateRequirements().catch(console.error);
