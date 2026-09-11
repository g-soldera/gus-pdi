import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function analyzeAndMapOrphans() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  // Carregar snapshot
  const snapshot = JSON.parse(fs.readFileSync(path.join(__dirname, 'pre-migration-snapshot.json'), 'utf8'));
  const existingSkills = snapshot.skills_in_db;
  const orphans = snapshot.orphan_skills;

  console.log('=== ANÁLISE DE MAPEAMENTO: ÓRFÃS vs EXISTENTES ===\n');

  // Mapeamento: órfã -> skill existente (quando houver sobreposição de contexto)
  const mappings = {
    // Mapeamentos diretos (contexto coberto por skill existente)
    'pyspark': 'pyspark-distributed', // PySpark já existe como pyspark-distributed
    'python': 'python-core', // Python já existe
    'typescript': 'typescript-modern', // TypeScript já existe
    'aws': 'aws-core-serverless', // AWS genérico -> AWS Core existente
    'aws-glue': 'aws-glue-etl', // AWS Glue já existe
    'prompt-engineering': 'prompt-eng-advanced', // Prompt Eng já existe
    'langgraph': 'langgraph-orchestration', // LangGraph já existe
    'finops': 'aws-cost-finops', // FinOps já existe
    'api-design': 'rest-api-design', // API Design já existe como rest-api-design
    'api-contracts': 'openapi-contracts', // API Contracts já existe
    'api-architecture': 'api-architecture-design', // API Architecture já existe
    'mentoring': 'technical-mentoring', // Mentoria já existe
    'leadership': 'leadership-mentorship', // Liderança já existe
    'strategic-vision': 'strategic-roadmapping', // Visão estratégica já existe
    'storytelling': 'executive-communication', // Storytelling já existe
    'nvc': 'cnv-negotiation', // CNV já existe
    'critical-thinking': 'critical-thinking-problem-solving', // Pensamento crítico já existe
    
    // Skills que serão CRIADAS (não têm equivalente)
    'javascript': null, // Criar nova
    'bash': null, // Criar nova
    'sql': null, // Criar nova
    'kafka': null, // Criar nova (streaming-kafka existe mas é diferente)
    'git': null, // Criar nova
    'iam': null, // Criar nova (identity-access-management é mais amplo)
    'vpc': null, // Criar nova
    'lambda': null, // Criar nova
    's3': null, // Criar nova
    'ecs': null, // Criar nova
    'cloudwatch': null, // Criar nova
    'aws-bedrock': null, // Criar nova
    'bedrock-guardrails': null, // Criar nova
    'llm': null, // Criar nova
    'mcp-tools': null, // Criar nova
    'mas': null, // Criar nova
    'agent-design': null, // Criar nova
    'sec-atlas': null, // Criar nova
    'sec-nist': null, // Criar nova
    'security': null, // Criar nova (genérica)
    'mlops': null, // Criar nova
    'cost-optimization': null, // Criar nova
    'openapi': null, // Criar nova
    'data-contracts': null, // Criar nova
    'data-lineage': null, // Criar nova
    'testing': null, // Criar nova
    'linters': null, // Criar nova
    'ux': null, // Criar nova
    'figma': null, // Criar nova
    'technical-docs': null, // Criar nova
    'feedback': null, // Criar nova
    'collaboration': null, // Criar nova
    'time-management': null, // Criar nova
    'self-awareness': null, // Criar nova
    'situational-leadership': null, // Criar nova
    'emotional-intelligence': null, // Criar nova
    'stakeholder-management': null, // Criar nova
    'presentation': null, // Criar nova
    'influence': null, // Criar nova
    'verbal-communication': null, // Criar nova
    'active-listening': null, // Criar nova
    'empathy': null, // Criar nova
  };

  console.log('📋 SKILLS ÓRFÃS QUE SERÃO MAPEADAS PARA EXISTENTES:\n');
  let mappedCount = 0;
  for (const [orphan, target] of Object.entries(mappings)) {
    if (target) {
      mappedCount++;
      const existingSkill = existingSkills.find(s => s.id === target);
      console.log(`  ${orphan} → ${target} (${existingSkill?.name})`);
    }
  }
  console.log(`\nTotal a mapear: ${mappedCount}`);

  console.log('\n\n🆕 SKILLS ÓRFÃS QUE SERÃO CRIADAS:\n');
  const toCreate = Object.entries(mappings).filter(([_, target]) => !target).map(([orphan]) => orphan);
  console.log(`Total a criar: ${toCreate.length}`);
  toCreate.forEach(o => console.log(`  - ${o}`));

  // Salvar análise
  fs.writeFileSync(
    path.join(__dirname, 'orphan-mapping-analysis.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      mapped_to_existing: Object.fromEntries(Object.entries(mappings).filter(([_, t]) => t)),
      to_create: toCreate,
      summary: {
        total_orphans: orphans.length,
        mapped_count: mappedCount,
        create_count: toCreate.length
      }
    }, null, 2)
  );

  console.log('\n✓ Análise salva em: .planning/quick/orphan-mapping-analysis.json');
}

analyzeAndMapOrphans().catch(console.error);
