import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeamento de skills deletadas para suas substitutas (consolidadas)
const skillMapping = {
  // AI Engineering
  'agent-systems': 'langgraph-orchestration',
  'mas': 'langgraph-orchestration',
  'agent-design': 'langgraph-orchestration',
  'aws-bedrock': 'llm',
  'mcp-tools': 'mcp-server-dev',
  'prompt-eng-sdd': 'prompt-eng-advanced',
  
  // AI Security
  'bedrock-guardrails': 'owasp-llm-security',
  'ai-security-redteam': 'mitre-atlas-redteam',
  'sec-nist': 'ai-governance-compliance',
  'sec-atlas': 'model-supply-chain',
  'advanced-ai-security': 'mitre-atlas-redteam',
  
  // Engenharia de Dados
  'data-modeling': 'data-modeling-dim',
  'pyspark-glue-etl': 'pyspark-distributed',
  'kafka': 'streaming-kafka',
  'data-quality-observability': 'data-quality-expectations',
  'data-contracts': 'data-quality-expectations',
  'data-lineage': 'data-quality-expectations',
  'data-lakes-lakehouse': 'data-modeling-dim',
  'data-lakes-s3-athena': 'data-modeling-dim',
  'data-platform-architecture': 'data-modeling-dim',
  
  // Cloud & Platform
  'aws-cloud-arch': 'aws-core-serverless',
  'lambda': 'aws-core-serverless',
  's3': 'aws-core-serverless',
  'iam': 'aws-core-serverless',
  'vpc': 'aws-core-serverless',
  'ecs': 'aws-core-serverless',
  'cloudwatch': 'aws-core-serverless',
  'mlops': 'observability-sre',
  'aws-cost-finops': 'observability-sre',
  'cost-optimization': 'observability-sre',
  'performance-optimization-sre': 'observability-sre',
  'platform-devops-mlops': 'observability-sre',
  
  // Segurança & Red Team
  'active-directory-redteam': 'offensive-sec-pentest',
  'pentest-oscp-methodology': 'offensive-sec-pentest',
  'security': 'cryptography-pki',
  'enterprise-risk-cissp': 'cryptography-pki',
  'devsecops-platform-security': 'offensive-sec-pentest',
  
  // Arquitetura & APIs
  'api-architecture-design': 'rest-api-design',
  'openapi': 'openapi-contracts',
  'grpc-protobuf': 'system-design-distributed',
  'enterprise-architecture-design': 'system-design-distributed',
  'cloud-native-platform-eng': 'system-design-distributed',
  
  // Linguagens & Paradigmas
  'python-async': 'python-core',
  'javascript': 'typescript-modern',
  'bash': 'clean-code-sdd',
  'java-jvm': 'oop-principles',
  
  // Engenharia de Software
  'linters': 'testing',
  'ux': 'web-frontend-arch',
  'figma': 'web-frontend-arch',
  'languages-tooling': 'python-core',
  
  // Liderança & Soft Skills
  'technical-mentoring': 'leadership-mentorship',
  'feedback': 'leadership-mentorship',
  'executive-technical-leadership': 'leadership-mentorship',
  'communication-storytelling': 'executive-communication',
  'presentation': 'executive-communication',
  'verbal-communication': 'executive-communication',
  'relational-influence-cnv': 'cnv-negotiation',
  'active-listening': 'cnv-negotiation',
  'empathy': 'cnv-negotiation',
  'strategic-vision-career': 'strategic-roadmapping',
  'self-awareness': 'emotional-intelligence',
  'adaptability-resilience': 'emotional-intelligence',
  'situational-leadership': 'stakeholder-management',
  'influence': 'stakeholder-management',
  'staff-engineering': 'stakeholder-management',
  'org-design-scaling': 'stakeholder-management',
  'critical-thinking-problem-solving': 'emotional-intelligence'
};

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║   ATUALIZANDO REFERÊNCIAS: 59 ÓRFÃS → CONSOLIDADAS           ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
console.log('Mapeamentos configurados:', Object.keys(skillMapping).length);
console.log('\nPressione Ctrl+C para cancelar ou aguarde 3 segundos...\n');

await new Promise(resolve => setTimeout(resolve, 3000));

async function updateReferences() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('=== ATUALIZANDO MILESTONES ===\n');
  
  const { data: milestones } = await supabase.from('milestones').select('id, title, related_skills');
  let milestonesUpdated = 0;
  
  for (const milestone of milestones || []) {
    if (!milestone.related_skills || milestone.related_skills.length === 0) continue;
    
    const newRelatedSkills = milestone.related_skills
      .map(skillId => skillMapping[skillId] || skillId)
      .filter((v, i, a) => a.indexOf(v) === i); // Remove duplicatas
    
    if (JSON.stringify(newRelatedSkills.sort()) !== JSON.stringify(milestone.related_skills.sort())) {
      await supabase.from('milestones').update({
        related_skills: newRelatedSkills
      }).eq('id', milestone.id);
      milestonesUpdated++;
      console.log(`✓ Milestone: ${milestone.id}`);
    }
  }
  
  console.log(`\n✓ Milestones atualizados: ${milestonesUpdated}`);

  console.log('\n=== ATUALIZANDO PROJECTS ===\n');
  
  const { data: projects } = await supabase.from('projects').select('id, title, related_skills');
  let projectsUpdated = 0;
  
  for (const project of projects || []) {
    if (!project.related_skills || project.related_skills.length === 0) continue;
    
    const newRelatedSkills = project.related_skills
      .map(skillId => skillMapping[skillId] || skillId)
      .filter((v, i, a) => a.indexOf(v) === i);
    
    if (JSON.stringify(newRelatedSkills.sort()) !== JSON.stringify(project.related_skills.sort())) {
      await supabase.from('projects').update({
        related_skills: newRelatedSkills
      }).eq('id', project.id);
      projectsUpdated++;
      console.log(`✓ Project: ${project.id}`);
    }
  }
  
  console.log(`\n✓ Projects atualizados: ${projectsUpdated}`);

  console.log('\n=== ATUALIZANDO RESOURCES ===\n');
  
  const { data: resources } = await supabase.from('resources').select('id, name, related_skills');
  let resourcesUpdated = 0;
  
  for (const resource of resources || []) {
    if (!resource.related_skills || resource.related_skills.length === 0) continue;
    
    const newRelatedSkills = resource.related_skills
      .map(skillId => skillMapping[skillId] || skillId)
      .filter((v, i, a) => a.indexOf(v) === i);
    
    if (JSON.stringify(newRelatedSkills.sort()) !== JSON.stringify(resource.related_skills.sort())) {
      await supabase.from('resources').update({
        related_skills: newRelatedSkills
      }).eq('id', resource.id);
      resourcesUpdated++;
      console.log(`✓ Resource: ${resource.id}`);
    }
  }
  
  console.log(`\n✓ Resources atualizados: ${resourcesUpdated}`);

  console.log('\n=== RESULTADO ===');
  console.log(`✓ Milestones: ${milestonesUpdated}`);
  console.log(`✓ Projects: ${projectsUpdated}`);
  console.log(`✓ Resources: ${resourcesUpdated}`);
  console.log(`✓ Total: ${milestonesUpdated + projectsUpdated + resourcesUpdated} entidades atualizadas`);

  fs.writeFileSync(
    path.join(__dirname, 'update-references-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      milestones_updated: milestonesUpdated,
      projects_updated: projectsUpdated,
      resources_updated: resourcesUpdated,
      mappings_count: Object.keys(skillMapping).length
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/update-references-result.json');
  console.log('\n🎉 ATUALIZAÇÃO DE REFERÊNCIAS CONCLUÍDA! 🎉');
}

updateReferences().catch(console.error);
