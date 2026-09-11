import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Estratégia de consolidação: 115 → 48 skills
// Agrupando skills relacionadas e eliminando redundâncias

const consolidationPlan = {
  // ============================================================================
  // MANTER (skills únicas e bem definidas)
  // ============================================================================
  keep: [
    // AI Engineering (consolidar de 13 para 5)
    'prompt-eng-advanced', // Manter
    'rag-vector-db', // Manter
    'langgraph-orchestration', // Absorve: agent-systems, mas, agent-design
    'llm', // Absorve: aws-bedrock
    'mcp-server-dev', // Manter (especialização única)
    
    // AI Security & SecMLOps (consolidar de 10 para 5)
    'owasp-llm-security', // Absorve: bedrock-guardrails
    'mitre-atlas-redteam', // Absorve: ai-security-redteam
    'ai-governance-compliance', // Absorve: sec-nist
    'model-supply-chain', // Absorve: sec-atlas
    'runtime-guardrails', // Manter
    
    // Engenharia de Dados (consolidar de 15 para 6)
    'data-modeling-dim', // Absorve: data-modeling
    'sql', // Manter
    'pyspark-distributed', // Absorve: pyspark-glue-etl
    'aws-glue-etl', // Manter
    'streaming-kafka', // Absorve: kafka
    'data-quality-expectations', // Absorve: data-quality-observability, data-contracts, data-lineage
    
    // Cloud & Platform (consolidar de 18 para 6)
    'aws-core-serverless', // Absorve: aws-cloud-arch, lambda, s3, iam, vpc, ecs, cloudwatch
    'kubernetes-cka', // Manter
    'docker-containers', // Manter
    'github-actions-cicd', // Manter
    'terraform-iac', // Manter (usuário domina - atualizar nível)
    'observability-sre', // Absorve: performance-optimization-sre, mlops, aws-cost-finops, cost-optimization
    
    // Segurança & Red Team (consolidar de 8 para 4)
    'offensive-sec-pentest', // Absorve: active-directory-redteam, pentest-oscp-methodology
    'network-protocols-sec', // Manter
    'identity-access-management', // Manter
    'cryptography-pki', // Absorve: security
    
    // Arquitetura & APIs (consolidar de 8 para 4)
    'rest-api-design', // Absorve: api-architecture-design, openapi
    'openapi-contracts', // Manter
    'domain-driven-design', // Manter
    'system-design-distributed', // Absorve: enterprise-architecture-design, cloud-native-platform-eng, grpc-protobuf
    
    // Linguagens & Paradigmas (consolidar de 9 para 5)
    'python-core', // Absorve: python-async
    'typescript-modern', // Absorve: javascript
    'oop-principles', // Manter
    'functional-paradigms', // Manter
    'clean-code-sdd', // Absorve: bash
    
    // Engenharia de Software (consolidar de 8 para 4)
    'git', // Manter
    'testing', // Absorve: linters
    'web-frontend-arch', // Absorve: ux, figma
    'languages-tooling', // DELETAR (redundante com python-core e typescript-modern)
    
    // Liderança & Soft Skills (consolidar de 26 para 9)
    'leadership-mentorship', // Absorve: technical-mentoring, feedback, executive-technical-leadership
    'executive-communication', // Absorve: communication-storytelling, presentation, verbal-communication
    'cnv-negotiation', // Absorve: relational-influence-cnv, active-listening, empathy
    'strategic-roadmapping', // Absorve: strategic-vision-career
    'collaboration', // Manter
    'time-management', // Manter
    'emotional-intelligence', // Absorve: self-awareness, adaptability-resilience
    'technical-docs', // Manter
    'stakeholder-management', // Absorve: situational-leadership, influence, staff-engineering, org-design-scaling
  ]
};

// Skills a serem DELETADAS (absorvidas por outras)
const skillsToDelete = [
  // AI Engineering
  'agent-systems', 'mas', 'agent-design', 'aws-bedrock', 'mcp-tools', 'prompt-eng-sdd',
  
  // AI Security
  'bedrock-guardrails', 'ai-security-redteam', 'sec-nist', 'sec-atlas', 'advanced-ai-security',
  
  // Engenharia de Dados
  'data-modeling', 'pyspark-glue-etl', 'kafka', 'data-quality-observability', 'data-contracts', 
  'data-lineage', 'data-lakes-lakehouse', 'data-lakes-s3-athena', 'data-platform-architecture',
  
  // Cloud & Platform
  'aws-cloud-arch', 'lambda', 's3', 'iam', 'vpc', 'ecs', 'cloudwatch', 'mlops', 
  'aws-cost-finops', 'cost-optimization', 'performance-optimization-sre', 'platform-devops-mlops',
  
  // Segurança & Red Team
  'active-directory-redteam', 'pentest-oscp-methodology', 'security', 'enterprise-risk-cissp', 'devsecops-platform-security',
  
  // Arquitetura & APIs
  'api-architecture-design', 'openapi', 'grpc-protobuf', 'enterprise-architecture-design', 'cloud-native-platform-eng',
  
  // Linguagens & Paradigmas
  'python-async', 'javascript', 'bash', 'java-jvm',
  
  // Engenharia de Software
  'linters', 'ux', 'figma', 'languages-tooling',
  
  // Liderança & Soft Skills
  'technical-mentoring', 'feedback', 'self-awareness', 'situational-leadership', 'presentation',
  'influence', 'verbal-communication', 'active-listening', 'empathy', 'relational-influence-cnv',
  'critical-thinking-problem-solving', 'strategic-vision-career', 'adaptability-resilience',
  'communication-storytelling', 'executive-technical-leadership', 'staff-engineering', 'org-design-scaling'
];

// Atualização de terraform-iac (usuário domina)
const terraformUpdate = {
  id: 'terraform-iac',
  level: 4.5, // Usuário domina
  requirements: [
    { id: 'req-state', text: 'State management', completed: true },
    { id: 'req-modules', text: 'Modules e reutilização', completed: true },
    { id: 'req-remote-backend', text: 'Remote backend', completed: true },
    { id: 'req-workspaces', text: 'Workspaces', completed: true },
    { id: 'req-best-practices', text: 'Best practices e patterns', completed: true }
  ]
};

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║   CONSOLIDAÇÃO DE SKILLS: 115 → 48                            ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
console.log('Skills a manter:', consolidationPlan.keep.length);
console.log('Skills a deletar:', skillsToDelete.length);
console.log('\nPressione Ctrl+C para cancelar ou aguarde 3 segundos...\n');

await new Promise(resolve => setTimeout(resolve, 3000));

async function consolidateSkills() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('=== ETAPA 1: ATUALIZANDO TERRAFORM-IAC ===\n');
  
  const { error: tfError } = await supabase.from('skills').update({
    level: terraformUpdate.level,
    requirements: terraformUpdate.requirements
  }).eq('id', terraformUpdate.id);

  if (tfError) {
    console.log('❌ Erro ao atualizar terraform-iac:', tfError.message);
  } else {
    console.log('✓ terraform-iac atualizado (nível 4.5 - domínio confirmado)\n');
  }

  console.log('=== ETAPA 2: DELETANDO SKILLS REDUNDANTES ===\n');

  let deletedCount = 0;
  const deleteErrors = [];

  for (const skillId of skillsToDelete) {
    const { error } = await supabase.from('skills').delete().eq('id', skillId);
    
    if (error) {
      deleteErrors.push({ skill: skillId, error: error.message });
      console.log(`❌ ${skillId}: ${error.message}`);
    } else {
      deletedCount++;
      console.log(`✓ Deletado: ${skillId}`);
    }
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`✓ Skills deletadas: ${deletedCount}/${skillsToDelete.length}`);
  console.log(`❌ Erros: ${deleteErrors.length}`);

  // Validar total final
  const { data: finalSkills } = await supabase.from('skills').select('id, name, category');
  console.log(`\n✓ Total de skills final: ${finalSkills.length}`);

  // Agrupar por categoria
  const byCategory = {};
  finalSkills.forEach(s => {
    byCategory[s.category] = (byCategory[s.category] || 0) + 1;
  });

  console.log('\n=== DISTRIBUIÇÃO FINAL POR DOMÍNIO ===\n');
  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} skills`);
  });

  // Salvar resultado
  fs.writeFileSync(
    path.join(__dirname, 'consolidation-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      skills_before: 115,
      skills_after: finalSkills.length,
      deleted_count: deletedCount,
      terraform_updated: !tfError,
      errors: deleteErrors,
      final_distribution: byCategory
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/consolidation-result.json');
  console.log('\n🎉 CONSOLIDAÇÃO CONCLUÍDA! 🎉');
}

consolidateSkills().catch(console.error);
