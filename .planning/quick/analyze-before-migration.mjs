import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fullAnalysisBeforeMigration() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data: skills } = await supabase.from('skills').select('*');
  const { data: milestones } = await supabase.from('milestones').select('id, title, related_skills');
  const { data: projects } = await supabase.from('projects').select('id, title, related_skills');
  const { data: resources } = await supabase.from('resources').select('id, name, related_skills, parent_category');

  console.log('=== ANÁLISE PRÉ-MIGRAÇÃO ===\n');
  
  console.log('1. SKILLS NA TABELA SKILLS:', skills.length);
  const skillIdsInDb = new Set(skills.map(s => s.id));
  
  console.log('\n2. SKILLS REFERENCIADAS EM MILESTONES:');
  const skillsInMilestones = new Set();
  milestones.forEach(m => (m.related_skills || []).forEach(s => skillsInMilestones.add(s)));
  console.log('   Total único:', skillsInMilestones.size);
  
  console.log('\n3. SKILLS REFERENCIADAS EM PROJECTS:');
  const skillsInProjects = new Set();
  projects.forEach(p => (p.related_skills || []).forEach(s => skillsInProjects.add(s)));
  console.log('   Total único:', skillsInProjects.size);
  
  console.log('\n4. SKILLS REFERENCIADAS EM RESOURCES:');
  const skillsInResources = new Set();
  resources.forEach(r => (r.related_skills || []).forEach(s => skillsInResources.add(s)));
  console.log('   Total único:', skillsInResources.size);
  
  console.log('\n5. SKILLS ÓRFÃS (referenciadas mas não existem na tabela):');
  const allReferenced = new Set([...skillsInMilestones, ...skillsInProjects, ...skillsInResources]);
  const orphans = Array.from(allReferenced).filter(s => !skillIdsInDb.has(s));
  console.log('   Total:', orphans.length);
  orphans.forEach(o => console.log('   -', o));
  
  console.log('\n6. RECURSOS COM PARENT_CATEGORY INCONSISTENTE:');
  const wrongParent = resources.filter(r => r.parent_category === 'Certificação');
  console.log('   Total com "Certificação" (singular):', wrongParent.length);
  wrongParent.forEach(r => console.log('   -', r.id, '|', r.name));

  fs.writeFileSync(path.join(__dirname, 'pre-migration-snapshot.json'), JSON.stringify({
    timestamp: new Date().toISOString(),
    skills_in_db: skills.map(s => ({ id: s.id, name: s.name, category: s.category })),
    orphan_skills: orphans,
    wrong_parent_category: wrongParent.map(r => ({ id: r.id, name: r.name })),
    milestones_count: milestones.length,
    projects_count: projects.length,
    resources_count: resources.length
  }, null, 2));
  
  console.log('\n✓ Snapshot salvo em .planning/quick/pre-migration-snapshot.json');
}

fullAnalysisBeforeMigration().catch(console.error);
