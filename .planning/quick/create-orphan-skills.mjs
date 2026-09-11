import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeamento completo de skills órfãs
const orphanSkills = [
  { id: 'pyspark', name: 'PySpark (legado)', category: 'Engenharia de Dados', type: 'hard', description: 'Processamento distribuído com Apache Spark (referência legada)', level: 4.0 },
  { id: 'python', name: 'Python Core', category: 'Linguagens & Paradigmas', type: 'hard', description: 'Fundamentos e sintaxe Python', level: 5.0 },
  { id: 'typescript', name: 'TypeScript', category: 'Linguagens & Paradigmas', type: 'hard', description: 'TypeScript e tipagem estática', level: 4.0 },
  { id: 'javascript', name: 'JavaScript', category: 'Linguagens & Paradigmas', type: 'hard', description: 'JavaScript moderno e ES6+', level: 4.0 },
  { id: 'bash', name: 'Bash & Shell Scripting', category: 'Linguagens & Paradigmas', type: 'hard', description: 'Automação com Bash e shell scripts', level: 4.0 },
  { id: 'sql', name: 'SQL Avançado', category: 'Engenharia de Dados', type: 'hard', description: 'SQL avançado, CTEs, window functions', level: 5.0 },
  { id: 'kafka', name: 'Apache Kafka', category: 'Engenharia de Dados', type: 'hard', description: 'Event streaming com Kafka', level: 2.0 },
  { id: 'git', name: 'Git & Version Control', category: 'Engenharia de Software', type: 'hard', description: 'Controle de versão com Git', level: 4.0 },
  { id: 'aws', name: 'AWS Cloud (legado)', category: 'Cloud & Platform', type: 'hard', description: 'Serviços AWS (referência legada)', level: 4.5 },
  { id: 'iam', name: 'IAM & Políticas AWS', category: 'Cloud & Platform', type: 'hard', description: 'Identity and Access Management na AWS', level: 4.0 },
  { id: 'vpc', name: 'VPC & Networking AWS', category: 'Cloud & Platform', type: 'hard', description: 'Redes e VPCs na AWS', level: 3.5 },
  { id: 'lambda', name: 'AWS Lambda', category: 'Cloud & Platform', type: 'hard', description: 'Serverless computing com Lambda', level: 4.5 },
  { id: 's3', name: 'Amazon S3', category: 'Cloud & Platform', type: 'hard', description: 'Object storage e data lakes', level: 5.0 },
  { id: 'ecs', name: 'Amazon ECS', category: 'Cloud & Platform', type: 'hard', description: 'Container orchestration com ECS', level: 3.5 },
  { id: 'aws-glue', name: 'AWS Glue (legado)', category: 'Engenharia de Dados', type: 'hard', description: 'ETL serverless (referência legada)', level: 3.5 },
  { id: 'cloudwatch', name: 'CloudWatch & Logs', category: 'Cloud & Platform', type: 'hard', description: 'Monitoramento e logs na AWS', level: 4.0 },
  { id: 'aws-bedrock', name: 'AWS Bedrock', category: 'AI Engineering', type: 'hard', description: 'Serviços de IA Generativa na AWS', level: 3.5 },
  { id: 'bedrock-guardrails', name: 'Bedrock Guardrails', category: 'AI Security & SecMLOps', type: 'hard', description: 'Runtime guardrails no AWS Bedrock', level: 2.5 },
  { id: 'llm', name: 'LLM Fundamentals', category: 'AI Engineering', type: 'hard', description: 'Fundamentos de Large Language Models', level: 4.0 },
  { id: 'prompt-engineering', name: 'Prompt Engineering (legado)', category: 'AI Engineering', type: 'hard', description: 'Engenharia de prompts (referência legada)', level: 4.5 },
  { id: 'langgraph', name: 'LangGraph (legado)', category: 'AI Engineering', type: 'hard', description: 'Orquestração com LangGraph (referência legada)', level: 4.0 },
  { id: 'mcp-tools', name: 'MCP Tools', category: 'AI Engineering', type: 'hard', description: 'Model Context Protocol tools', level: 1.5 },
  { id: 'mas', name: 'Multi-Agent Systems', category: 'AI Engineering', type: 'hard', description: 'Sistemas multi-agente', level: 3.5 },
  { id: 'agent-design', name: 'Agent Design Patterns', category: 'AI Engineering', type: 'hard', description: 'Padrões de design de agentes autônomos', level: 3.8 },
  { id: 'sec-atlas', name: 'MITRE ATLAS', category: 'AI Security & SecMLOps', type: 'hard', description: 'Framework MITRE ATLAS para adversarial ML', level: 2.0 },
  { id: 'sec-nist', name: 'NIST AI RMF', category: 'AI Security & SecMLOps', type: 'hard', description: 'NIST AI Risk Management Framework', level: 2.0 },
  { id: 'security', name: 'Segurança da Informação', category: 'Segurança & Red Team', type: 'hard', description: 'Fundamentos de segurança da informação', level: 3.5 },
  { id: 'mlops', name: 'MLOps Practices', category: 'Cloud & Platform', type: 'hard', description: 'MLOps e ciclo de vida de modelos', level: 3.0 },
  { id: 'finops', name: 'FinOps (legado)', category: 'Cloud & Platform', type: 'hard', description: 'Otimização de custos cloud (referência legada)', level: 3.0 },
  { id: 'cost-optimization', name: 'Cloud Cost Optimization', category: 'Cloud & Platform', type: 'hard', description: 'Otimização de custos em cloud', level: 3.5 },
  { id: 'openapi', name: 'OpenAPI (legado)', category: 'Arquitetura & APIs', type: 'hard', description: 'Especificação OpenAPI (referência legada)', level: 4.0 },
  { id: 'api-design', name: 'API Design (legado)', category: 'Arquitetura & APIs', type: 'hard', description: 'Design de APIs (referência legada)', level: 4.0 },
  { id: 'api-contracts', name: 'API Contracts (legado)', category: 'Arquitetura & APIs', type: 'hard', description: 'Contratos de API (referência legada)', level: 4.0 },
  { id: 'api-architecture', name: 'API Architecture (legado)', category: 'Arquitetura & APIs', type: 'hard', description: 'Arquitetura de APIs (referência legada)', level: 4.0 },
  { id: 'data-contracts', name: 'Data Contracts', category: 'Engenharia de Dados', type: 'hard', description: 'Contratos de dados e schemas', level: 3.5 },
  { id: 'data-lineage', name: 'Data Lineage', category: 'Engenharia de Dados', type: 'hard', description: 'Rastreabilidade e linhagem de dados', level: 3.0 },
  { id: 'testing', name: 'Testing & QA', category: 'Engenharia de Software', type: 'hard', description: 'Testes automatizados e qualidade', level: 3.5 },
  { id: 'linters', name: 'Linters & Code Quality', category: 'Engenharia de Software', type: 'hard', description: 'Ferramentas de análise estática', level: 4.0 },
  { id: 'ux', name: 'UX Design', category: 'Engenharia de Software', type: 'hard', description: 'Design de experiência do usuário', level: 3.0 },
  { id: 'figma', name: 'Figma & Design Tools', category: 'Engenharia de Software', type: 'hard', description: 'Ferramentas de design', level: 2.5 },
  { id: 'technical-docs', name: 'Documentação Técnica', category: 'Liderança & Soft Skills', type: 'soft', description: 'Escrita de documentação técnica', level: 4.0 },
  { id: 'mentoring', name: 'Mentoria (legado)', category: 'Liderança & Soft Skills', type: 'soft', description: 'Mentoria de talentos (referência legada)', level: 4.0 },
  { id: 'feedback', name: 'Feedback & Code Review', category: 'Liderança & Soft Skills', type: 'soft', description: 'Feedback construtivo e code review', level: 4.0 },
  { id: 'leadership', name: 'Liderança (legado)', category: 'Liderança & Soft Skills', type: 'soft', description: 'Liderança técnica (referência legada)', level: 3.8 },
  { id: 'collaboration', name: 'Colaboração em Equipes', category: 'Liderança & Soft Skills', type: 'soft', description: 'Trabalho colaborativo', level: 4.5 },
  { id: 'strategic-vision', name: 'Visão Estratégica (legado)', category: 'Liderança & Soft Skills', type: 'soft', description: 'Visão estratégica (referência legada)', level: 4.0 },
  { id: 'time-management', name: 'Gestão de Tempo', category: 'Liderança & Soft Skills', type: 'soft', description: 'Gestão eficaz do tempo', level: 4.0 },
  { id: 'self-awareness', name: 'Autoconsciência', category: 'Liderança & Soft Skills', type: 'soft', description: 'Autoconsciência e inteligência emocional', level: 4.0 },
  { id: 'situational-leadership', name: 'Liderança Situacional', category: 'Liderança & Soft Skills', type: 'soft', description: 'Adaptação do estilo de liderança', level: 3.0 },
  { id: 'emotional-intelligence', name: 'Inteligência Emocional', category: 'Liderança & Soft Skills', type: 'soft', description: 'Gestão emocional e relacionamentos', level: 4.0 },
  { id: 'stakeholder-management', name: 'Gestão de Stakeholders', category: 'Liderança & Soft Skills', type: 'soft', description: 'Alinhamento com stakeholders', level: 3.8 },
  { id: 'presentation', name: 'Apresentações Técnicas', category: 'Liderança & Soft Skills', type: 'soft', description: 'Apresentações e comunicação técnica', level: 4.0 },
  { id: 'storytelling', name: 'Storytelling (legado)', category: 'Liderança & Soft Skills', type: 'soft', description: 'Storytelling com dados (referência legada)', level: 4.0 },
  { id: 'influence', name: 'Influência Sem Autoridade', category: 'Liderança & Soft Skills', type: 'soft', description: 'Influência técnica sem poder formal', level: 3.8 },
  { id: 'verbal-communication', name: 'Comunicação Verbal', category: 'Liderança & Soft Skills', type: 'soft', description: 'Comunicação verbal assertiva', level: 4.0 },
  { id: 'nvc', name: 'Comunicação Não-Violenta (legado)', category: 'Liderança & Soft Skills', type: 'soft', description: 'CNV (referência legada)', level: 3.5 },
  { id: 'active-listening', name: 'Escuta Ativa', category: 'Liderança & Soft Skills', type: 'soft', description: 'Escuta ativa e empática', level: 4.0 },
  { id: 'empathy', name: 'Empatia', category: 'Liderança & Soft Skills', type: 'soft', description: 'Empatia e compreensão interpessoal', level: 4.5 },
  { id: 'critical-thinking', name: 'Pensamento Crítico (legado)', category: 'Liderança & Soft Skills', type: 'soft', description: 'Pensamento crítico (referência legada)', level: 4.0 }
];

async function createOrphanSkills() {
  const envText = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim();
  });

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log(`\n=== CRIANDO ${orphanSkills.length} SKILLS ÓRFÃS ===\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const skill of orphanSkills) {
    try {
      const { error } = await supabase.from('skills').upsert({
        id: skill.id,
        name: skill.name,
        level: skill.level,
        description: skill.description,
        category: skill.category,
        type: skill.type,
        requirements: []
      }, { onConflict: 'id' });

      if (error) {
        errorCount++;
        errors.push({ skill: skill.id, error: error.message });
        console.log(`❌ ${skill.id}: ${error.message}`);
      } else {
        successCount++;
        console.log(`✓ ${skill.id}`);
      }
    } catch (err) {
      errorCount++;
      errors.push({ skill: skill.id, error: err.message });
      console.log(`❌ ${skill.id}: ${err.message}`);
    }
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`✓ Criadas: ${successCount}`);
  console.log(`❌ Erros: ${errorCount}`);

  if (errors.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'orphan-skills-errors.json'),
      JSON.stringify(errors, null, 2)
    );
    console.log(`\nErros salvos em: .planning/quick/orphan-skills-errors.json`);
  }
}

createOrphanSkills().catch(console.error);
