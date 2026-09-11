import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skills a serem criadas (42 novas)
const newSkills = [
  { id: 'javascript', name: 'JavaScript', category: 'Linguagens & Paradigmas', type: 'hard', description: 'JavaScript moderno (ES6+) e fundamentos da linguagem', level: 4.0, requirements: [] },
  { id: 'bash', name: 'Bash & Shell Scripting', category: 'Linguagens & Paradigmas', type: 'hard', description: 'Automação com Bash e shell scripts', level: 4.0, requirements: [] },
  { id: 'sql', name: 'SQL Avançado', category: 'Engenharia de Dados', type: 'hard', description: 'SQL avançado, CTEs, window functions e otimização de queries', level: 5.0, requirements: [] },
  { id: 'kafka', name: 'Apache Kafka', category: 'Engenharia de Dados', type: 'hard', description: 'Event streaming, producers, consumers e Kafka Connect', level: 2.0, requirements: [] },
  { id: 'git', name: 'Git & Version Control', category: 'Engenharia de Software', type: 'hard', description: 'Controle de versão, branching strategies e workflows colaborativos', level: 4.5, requirements: [] },
  { id: 'iam', name: 'AWS IAM', category: 'Cloud & Platform', type: 'hard', description: 'Identity and Access Management, políticas e roles', level: 4.0, requirements: [] },
  { id: 'vpc', name: 'AWS VPC & Networking', category: 'Cloud & Platform', type: 'hard', description: 'Virtual Private Cloud, subnets, route tables e security groups', level: 3.5, requirements: [] },
  { id: 'lambda', name: 'AWS Lambda', category: 'Cloud & Platform', type: 'hard', description: 'Serverless functions, triggers e integrações', level: 4.5, requirements: [] },
  { id: 's3', name: 'Amazon S3', category: 'Cloud & Platform', type: 'hard', description: 'Object storage, lifecycle policies e data lakes', level: 5.0, requirements: [] },
  { id: 'ecs', name: 'Amazon ECS', category: 'Cloud & Platform', type: 'hard', description: 'Container orchestration com ECS e Fargate', level: 3.5, requirements: [] },
  { id: 'cloudwatch', name: 'CloudWatch & Logs', category: 'Cloud & Platform', type: 'hard', description: 'Monitoramento, métricas customizadas e dashboards', level: 4.0, requirements: [] },
  { id: 'aws-bedrock', name: 'AWS Bedrock', category: 'AI Engineering', type: 'hard', description: 'Foundation models e serviços de IA Generativa na AWS', level: 3.5, requirements: [] },
  { id: 'bedrock-guardrails', name: 'Bedrock Guardrails', category: 'AI Security & SecMLOps', type: 'hard', description: 'Runtime guardrails e filtros de conteúdo no Bedrock', level: 2.5, requirements: [] },
  { id: 'llm', name: 'LLM Fundamentals', category: 'AI Engineering', type: 'hard', description: 'Fundamentos de Large Language Models, tokenização e inferência', level: 4.0, requirements: [] },
  { id: 'mcp-tools', name: 'MCP Tools', category: 'AI Engineering', type: 'hard', description: 'Model Context Protocol tools e recursos', level: 1.5, requirements: [] },
  { id: 'mas', name: 'Multi-Agent Systems', category: 'AI Engineering', type: 'hard', description: 'Sistemas multi-agente e coordenação', level: 3.5, requirements: [] },
  { id: 'agent-design', name: 'Agent Design Patterns', category: 'AI Engineering', type: 'hard', description: 'Padrões de design para agentes autônomos', level: 3.8, requirements: [] },
  { id: 'sec-atlas', name: 'MITRE ATLAS', category: 'AI Security & SecMLOps', type: 'hard', description: 'Framework MITRE ATLAS para adversarial ML', level: 2.0, requirements: [] },
  { id: 'sec-nist', name: 'NIST AI RMF', category: 'AI Security & SecMLOps', type: 'hard', description: 'NIST AI Risk Management Framework', level: 2.0, requirements: [] },
  { id: 'security', name: 'Segurança da Informação', category: 'Segurança & Red Team', type: 'hard', description: 'Fundamentos de segurança, CIA triad e gestão de vulnerabilidades', level: 3.5, requirements: [] },
  { id: 'mlops', name: 'MLOps Practices', category: 'Cloud & Platform', type: 'hard', description: 'MLOps, model registry, drift detection e re-treino', level: 3.0, requirements: [] },
  { id: 'cost-optimization', name: 'Cloud Cost Optimization', category: 'Cloud & Platform', type: 'hard', description: 'Otimização de custos, right-sizing e reservas', level: 3.5, requirements: [] },
  { id: 'openapi', name: 'OpenAPI Specification', category: 'Arquitetura & APIs', type: 'hard', description: 'Especificação OpenAPI 3.0/3.1 e documentação de APIs', level: 4.0, requirements: [] },
  { id: 'data-contracts', name: 'Data Contracts', category: 'Engenharia de Dados', type: 'hard', description: 'Contratos de dados, schemas e validação', level: 3.5, requirements: [] },
  { id: 'data-lineage', name: 'Data Lineage', category: 'Engenharia de Dados', type: 'hard', description: 'Rastreabilidade e linhagem de dados end-to-end', level: 3.0, requirements: [] },
  { id: 'testing', name: 'Testing & QA', category: 'Engenharia de Software', type: 'hard', description: 'Testes unitários, integração e end-to-end', level: 3.5, requirements: [] },
  { id: 'linters', name: 'Linters & Code Quality', category: 'Engenharia de Software', type: 'hard', description: 'Ferramentas de análise estática e code quality', level: 4.0, requirements: [] },
  { id: 'ux', name: 'UX Design', category: 'Engenharia de Software', type: 'hard', description: 'Design de experiência do usuário e usabilidade', level: 3.0, requirements: [] },
  { id: 'figma', name: 'Figma & Design Tools', category: 'Engenharia de Software', type: 'hard', description: 'Ferramentas de design e prototipação', level: 2.5, requirements: [] },
  { id: 'technical-docs', name: 'Documentação Técnica', category: 'Liderança & Soft Skills', type: 'soft', description: 'Escrita técnica clara, RFCs e design docs', level: 4.0, requirements: [] },
  { id: 'feedback', name: 'Feedback & Code Review', category: 'Liderança & Soft Skills', type: 'soft', description: 'Feedback construtivo e code review efetivo', level: 4.0, requirements: [] },
  { id: 'collaboration', name: 'Colaboração em Equipes', category: 'Liderança & Soft Skills', type: 'soft', description: 'Trabalho colaborativo e dinâmica de equipes', level: 4.5, requirements: [] },
  { id: 'time-management', name: 'Gestão de Tempo', category: 'Liderança & Soft Skills', type: 'soft', description: 'Gestão eficaz do tempo e priorização', level: 4.0, requirements: [] },
  { id: 'self-awareness', name: 'Autoconsciência', category: 'Liderança & Soft Skills', type: 'soft', description: 'Autoconsciência e autoconhecimento', level: 4.0, requirements: [] },
  { id: 'situational-leadership', name: 'Liderança Situacional', category: 'Liderança & Soft Skills', type: 'soft', description: 'Adaptação do estilo de liderança ao contexto', level: 3.0, requirements: [] },
  { id: 'emotional-intelligence', name: 'Inteligência Emocional', category: 'Liderança & Soft Skills', type: 'soft', description: 'Gestão emocional e relacionamentos interpessoais', level: 4.0, requirements: [] },
  { id: 'stakeholder-management', name: 'Gestão de Stakeholders', category: 'Liderança & Soft Skills', type: 'soft', description: 'Alinhamento e gestão de expectativas de stakeholders', level: 3.8, requirements: [] },
  { id: 'presentation', name: 'Apresentações Técnicas', category: 'Liderança & Soft Skills', type: 'soft', description: 'Apresentações técnicas e comunicação para diferentes audiências', level: 4.0, requirements: [] },
  { id: 'influence', name: 'Influência Sem Autoridade', category: 'Liderança & Soft Skills', type: 'soft', description: 'Influência técnica sem poder formal', level: 3.8, requirements: [] },
  { id: 'verbal-communication', name: 'Comunicação Verbal', category: 'Liderança & Soft Skills', type: 'soft', description: 'Comunicação verbal assertiva e clara', level: 4.0, requirements: [] },
  { id: 'active-listening', name: 'Escuta Ativa', category: 'Liderança & Soft Skills', type: 'soft', description: 'Escuta ativa e empática', level: 4.0, requirements: [] },
  { id: 'empathy', name: 'Empatia', category: 'Liderança & Soft Skills', type: 'soft', description: 'Empatia e compreensão interpessoal', level: 4.5, requirements: [] }
];

// Mapeamento de skills órfãs para existentes
const skillMappings = {
  'pyspark': 'pyspark-distributed',
  'python': 'python-core',
  'typescript': 'typescript-modern',
  'aws': 'aws-core-serverless',
  'aws-glue': 'aws-glue-etl',
  'prompt-engineering': 'prompt-eng-advanced',
  'langgraph': 'langgraph-orchestration',
  'finops': 'aws-cost-finops',
  'api-design': 'rest-api-design',
  'api-contracts': 'openapi-contracts',
  'api-architecture': 'api-architecture-design',
  'mentoring': 'technical-mentoring',
  'leadership': 'leadership-mentorship',
  'strategic-vision': 'strategic-roadmapping',
  'storytelling': 'executive-communication',
  'nvc': 'cnv-negotiation',
  'critical-thinking': 'critical-thinking-problem-solving'
};

async function executeMigration() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('\n=== ETAPA 1: CRIANDO 42 NOVAS SKILLS ===\n');

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const skill of newSkills) {
    try {
      const { error } = await supabase.from('skills').upsert({
        id: skill.id,
        name: skill.name,
        level: skill.level,
        description: skill.description,
        category: skill.category,
        type: skill.type,
        requirements: skill.requirements
      }, { onConflict: 'id' });

      if (error) {
        errorCount++;
        errors.push({ skill: skill.id, error: error.message });
        console.log(`❌ ${skill.id}: ${error.message}`);
      } else {
        successCount++;
        console.log(`✓ ${skill.id} (${skill.name})`);
      }
    } catch (err) {
      errorCount++;
      errors.push({ skill: skill.id, error: err.message });
      console.log(`❌ ${skill.id}: ${err.message}`);
    }
  }

  console.log(`\n=== RESULTADO ETAPA 1 ===`);
  console.log(`✓ Criadas: ${successCount}/${newSkills.length}`);
  console.log(`❌ Erros: ${errorCount}`);

  console.log('\n=== ETAPA 2: ATUALIZANDO REFERÊNCIAS ===\n');
  console.log('Atualizando milestones, projects e resources para usar as novas skills...\n');

  // Atualizar milestones
  const { data: milestones } = await supabase.from('milestones').select('id, related_skills');
  let milestonesUpdated = 0;
  
  for (const milestone of milestones || []) {
    if (!milestone.related_skills) continue;
    
    let updated = false;
    const newRelatedSkills = milestone.related_skills.map(skillId => {
      if (skillMappings[skillId]) {
        updated = true;
        return skillMappings[skillId];
      }
      return skillId;
    });

    if (updated) {
      await supabase.from('milestones').update({
        related_skills: newRelatedSkills
      }).eq('id', milestone.id);
      milestonesUpdated++;
      console.log(`✓ Milestone ${milestone.id}`);
    }
  }

  // Atualizar projects
  const { data: projects } = await supabase.from('projects').select('id, related_skills');
  let projectsUpdated = 0;
  
  for (const project of projects || []) {
    if (!project.related_skills) continue;
    
    let updated = false;
    const newRelatedSkills = project.related_skills.map(skillId => {
      if (skillMappings[skillId]) {
        updated = true;
        return skillMappings[skillId];
      }
      return skillId;
    });

    if (updated) {
      await supabase.from('projects').update({
        related_skills: newRelatedSkills
      }).eq('id', project.id);
      projectsUpdated++;
      console.log(`✓ Project ${project.id}`);
    }
  }

  // Atualizar resources
  const { data: resources } = await supabase.from('resources').select('id, related_skills');
  let resourcesUpdated = 0;
  
  for (const resource of resources || []) {
    if (!resource.related_skills) continue;
    
    let updated = false;
    const newRelatedSkills = resource.related_skills.map(skillId => {
      if (skillMappings[skillId]) {
        updated = true;
        return skillMappings[skillId];
      }
      return skillId;
    });

    if (updated) {
      await supabase.from('resources').update({
        related_skills: newRelatedSkills
      }).eq('id', resource.id);
      resourcesUpdated++;
      console.log(`✓ Resource ${resource.id}`);
    }
  }

  console.log(`\n=== RESULTADO ETAPA 2 ===`);
  console.log(`✓ Milestones atualizados: ${milestonesUpdated}`);
  console.log(`✓ Projects atualizados: ${projectsUpdated}`);
  console.log(`✓ Resources atualizados: ${resourcesUpdated}`);

  // Salvar resultado
  fs.writeFileSync(
    path.join(__dirname, 'migration-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      new_skills_created: successCount,
      errors: errors,
      mappings_applied: Object.keys(skillMappings).length,
      milestones_updated: milestonesUpdated,
      projects_updated: projectsUpdated,
      resources_updated: resourcesUpdated
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/migration-result.json');
  console.log('\n=== MIGRAÇÃO CONCLUÍDA ===');
}

executeMigration().catch(console.error);
