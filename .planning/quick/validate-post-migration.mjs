import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function validatePostMigration() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('\n=== VALIDAÇÃO PÓS-MIGRAÇÃO ===\n');

  // 1. Total de skills
  const { data: skills } = await supabase.from('skills').select('*');
  console.log(`✓ Total de skills na tabela: ${skills.length}`);
  
  // 2. Verificar órfãs
  const { data: milestones } = await supabase.from('milestones').select('id, title, related_skills');
  const { data: projects } = await supabase.from('projects').select('id, title, related_skills');
  const { data: resources } = await supabase.from('resources').select('id, name, related_skills');

  const skillIdsInDb = new Set(skills.map(s => s.id));
  
  const skillsInMilestones = new Set();
  milestones.forEach(m => (m.related_skills || []).forEach(s => skillsInMilestones.add(s)));
  
  const skillsInProjects = new Set();
  projects.forEach(p => (p.related_skills || []).forEach(s => skillsInProjects.add(s)));
  
  const skillsInResources = new Set();
  resources.forEach(r => (r.related_skills || []).forEach(s => skillsInResources.add(s)));
  
  const allReferenced = new Set([...skillsInMilestones, ...skillsInProjects, ...skillsInResources]);
  const orphans = Array.from(allReferenced).filter(s => !skillIdsInDb.has(s));
  
  console.log(`✓ Skills referenciadas em milestones: ${skillsInMilestones.size}`);
  console.log(`✓ Skills referenciadas em projects: ${skillsInProjects.size}`);
  console.log(`✓ Skills referenciadas em resources: ${skillsInResources.size}`);
  console.log(`\n${orphans.length === 0 ? '✓' : '❌'} Skills órfãs: ${orphans.length}`);
  
  if (orphans.length > 0) {
    console.log('\n⚠️  Skills órfãs ainda existentes:');
    orphans.forEach(o => console.log(`  - ${o}`));
  } else {
    console.log('\n✓ Nenhuma skill órfã detectada! Todas as referências estão válidas.');
  }

  // 3. Categorias consolidadas
  const categories = {};
  skills.forEach(s => {
    categories[s.category] = (categories[s.category] || 0) + 1;
  });
  
  console.log('\n=== CATEGORIAS DE SKILLS (N1 - Domínios) ===\n');
  Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} skills`);
  });

  // 4. Verificar recursos de certificação
  const { data: certResources } = await supabase.from('resources').select('id, name, parent_category').or('parent_category.eq.Certificação,parent_category.eq.Certificações');
  const wrongParent = certResources.filter(r => r.parent_category === 'Certificação');
  
  console.log(`\n=== RECURSOS DE CERTIFICAÇÃO ===`);
  console.log(`✓ Total de recursos de certificação: ${certResources.length}`);
  console.log(`${wrongParent.length === 0 ? '✓' : '❌'} Parent category inconsistente: ${wrongParent.length}`);

  // Salvar validação
  const validationResult = {
    timestamp: new Date().toISOString(),
    total_skills: skills.length,
    orphan_skills: orphans,
    categories: categories,
    validation_passed: orphans.length === 0 && wrongParent.length === 0,
    details: {
      skills_in_milestones: skillsInMilestones.size,
      skills_in_projects: skillsInProjects.size,
      skills_in_resources: skillsInResources.size,
      total_unique_referenced: allReferenced.size
    }
  };

  fs.writeFileSync(
    path.join(__dirname, 'post-migration-validation.json'),
    JSON.stringify(validationResult, null, 2)
  );

  console.log('\n✓ Validação salva em: .planning/quick/post-migration-validation.json');
  
  if (validationResult.validation_passed) {
    console.log('\n🎉 MIGRAÇÃO VALIDADA COM SUCESSO! 🎉');
  } else {
    console.log('\n⚠️  Migração completada mas ainda há pendências a resolver.');
  }
}

validatePostMigration().catch(console.error);
