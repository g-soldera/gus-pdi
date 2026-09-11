import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeamento completo: skill_id → requirements (microskills granulares)
const skillRequirements = {
  // ============================================================================
  // DOMÍNIO 1: AI ENGINEERING
  // ============================================================================
  'prompt-eng-advanced': [
    { id: 'req-few-shot', text: 'Few-shot learning e exemplos estruturados', completed: true },
    { id: 'req-cot', text: 'Chain-of-Thought (CoT) prompting', completed: true },
    { id: 'req-system-prompts', text: 'System prompts e configuração de contexto', completed: true },
    { id: 'req-sdd', text: 'Desenvolvimento Orientado a Especificações (SDD)', completed: true },
    { id: 'req-token-opt', text: 'Otimização de tokens e latência', completed: false },
    { id: 'req-evaluation', text: 'Avaliação sistemática de respostas LLM', completed: true }
  ],
  
  'rag-vector-db': [
    { id: 'req-embeddings', text: 'Compreensão de embeddings e busca vetorial', completed: true },
    { id: 'req-chunking', text: 'Estratégias de chunking otimizado', completed: true },
    { id: 'req-reranking', text: 'Re-ranking de resultados', completed: true },
    { id: 'req-vector-db', text: 'Gestão de vector databases (Pinecone/Chroma/FAISS)', completed: true },
    { id: 'req-hallucination', text: 'Avaliação de alucinações (RAG Triad)', completed: false },
    { id: 'req-scale', text: 'Arquiteturas distribuídas de busca semântica', completed: false }
  ],
  
  'langgraph-orchestration': [
    { id: 'req-tool-calling', text: 'Tool calling e integração de ferramentas', completed: true },
    { id: 'req-state', text: 'Gestão de estado em workflows', completed: true },
    { id: 'req-multi-agent', text: 'Orquestração multi-agente', completed: true },
    { id: 'req-persistence', text: 'Persistência e checkpointing', completed: true },
    { id: 'req-mission-critical', text: 'Autonomia supervisionada em ambientes críticos', completed: false }
  ],
  
  'mcp-server-dev': [
    { id: 'req-mcp-spec', text: 'Compreensão da especificação MCP', completed: false },
    { id: 'req-mcp-server', text: 'Desenvolvimento de servidores MCP customizados', completed: false },
    { id: 'req-mcp-tools', text: 'Criação de ferramentas e recursos MCP', completed: false },
    { id: 'req-mcp-security', text: 'Segurança em servidores MCP', completed: false },
    { id: 'req-mcp-enterprise', text: 'Padronização e governança MCP em escala', completed: false }
  ],
  
  'llm': [
    { id: 'req-tokenization', text: 'Tokenização e gestão de contexto', completed: true },
    { id: 'req-inference', text: 'Inferência e parâmetros de geração', completed: true },
    { id: 'req-context-windows', text: 'Context windows e limitações', completed: true },
    { id: 'req-fine-tuning', text: 'Fundamentos de fine-tuning', completed: false },
    { id: 'req-model-selection', text: 'Seleção de modelos por caso de uso', completed: true }
  ],
  
  'aws-bedrock': [
    { id: 'req-foundation-models', text: 'Foundation models disponíveis', completed: true },
    { id: 'req-inference-api', text: 'APIs de inferência e integrações', completed: true },
    { id: 'req-guardrails-integration', text: 'Integração com Bedrock Guardrails', completed: true },
    { id: 'req-cost-opt', text: 'Otimização de custos de inferência', completed: false }
  ],
  
  'agent-systems': [
    { id: 'req-agent-arch', text: 'Arquitetura de agentes autônomos', completed: true },
    { id: 'req-agent-orchestration', text: 'Orquestração e coordenação', completed: true },
    { id: 'req-agent-state', text: 'Gestão de estado e memória', completed: true },
    { id: 'req-agent-tools', text: 'Tool calling e execução', completed: true },
    { id: 'req-agent-scale', text: 'Escalabilidade e resiliência', completed: false }
  ],
  
  'mas': [
    { id: 'req-mas-coordination', text: 'Coordenação entre agentes', completed: true },
    { id: 'req-mas-communication', text: 'Protocolos de comunicação', completed: true },
    { id: 'req-mas-consensus', text: 'Algoritmos de consenso', completed: false },
    { id: 'req-mas-conflict', text: 'Resolução de conflitos', completed: false }
  ],
  
  'agent-design': [
    { id: 'req-design-patterns', text: 'Padrões de design de agentes', completed: true },
    { id: 'req-react-framework', text: 'ReAct framework', completed: true },
    { id: 'req-planning', text: 'Algoritmos de planning', completed: false },
    { id: 'req-error-handling', text: 'Error handling e recovery', completed: true }
  ],
  
  'mcp-tools': [
    { id: 'req-mcp-protocol', text: 'Protocol MCP fundamentals', completed: false },
    { id: 'req-mcp-client', text: 'Desenvolvimento de clientes MCP', completed: false },
    { id: 'req-mcp-resources', text: 'Gestão de recursos MCP', completed: false }
  ],
  
  'prompt-eng-sdd': [
    { id: 'req-sdd-spec', text: 'Especificações executáveis', completed: true },
    { id: 'req-sdd-iteration', text: 'Iteração baseada em feedback', completed: true },
    { id: 'req-sdd-testing', text: 'Testing de prompts', completed: true }
  ],
  
  // ============================================================================
  // DOMÍNIO 2: AI SECURITY & SECMLOPS
  // ============================================================================
  'owasp-llm-security': [
    { id: 'req-owasp-basics', text: 'OWASP Top 10 for LLMs (conhecimento)', completed: true },
    { id: 'req-prompt-injection', text: 'Mitigação de Prompt Injection', completed: false },
    { id: 'req-jailbreaking', text: 'Prevenção de Jailbreaking', completed: false },
    { id: 'req-data-poisoning', text: 'Detecção de Data Poisoning', completed: false },
    { id: 'req-insecure-output', text: 'Validação de outputs inseguros', completed: false }
  ],
  
  'mitre-atlas-redteam': [
    { id: 'req-atlas-framework', text: 'Framework MITRE ATLAS', completed: true },
    { id: 'req-model-inversion', text: 'Model Inversion attacks', completed: false },
    { id: 'req-backdoor', text: 'Backdoor attacks em modelos', completed: false },
    { id: 'req-evasion', text: 'Evasion techniques', completed: false },
    { id: 'req-adversarial-test', text: 'Red teaming estruturado', completed: false }
  ],
  
  'ai-governance-compliance': [
    { id: 'req-ethics', text: 'Princípios éticos de IA', completed: true },
    { id: 'req-nist-rmf', text: 'Aplicação do NIST AI RMF', completed: false },
    { id: 'req-iso42001', text: 'Implementação ISO/IEC 42001', completed: false },
    { id: 'req-eu-ai-act', text: 'Conformidade com EU AI Act', completed: false },
    { id: 'req-committee', text: 'Liderança de comitês de ética de IA', completed: false }
  ],
  
  'model-supply-chain': [
    { id: 'req-model-signing', text: 'Assinatura de artefatos de ML', completed: false },
    { id: 'req-dependency-scan', text: 'Escaneamento de dependências', completed: false },
    { id: 'req-provenance', text: 'Rastreabilidade e proveniência', completed: false },
    { id: 'req-safetensors', text: 'Uso de .safetensors', completed: false },
    { id: 'req-mlflow-registry', text: 'MLflow Model Registry', completed: false }
  ],
  
  'runtime-guardrails': [
    { id: 'req-nemo-guardrails', text: 'NeMo Guardrails', completed: false },
    { id: 'req-llama-guard', text: 'Llama Guard', completed: false },
    { id: 'req-content-filtering', text: 'Content filtering avançado', completed: true },
    { id: 'req-drift-detection', text: 'Drift detection em produção', completed: false }
  ],
  
  'ai-security-redteam': [
    { id: 'req-adversarial-basics', text: 'Fundamentos de adversarial ML', completed: true },
    { id: 'req-attack-vectors', text: 'Vetores de ataque em IA', completed: true },
    { id: 'req-defense-strategies', text: 'Estratégias de defesa', completed: false },
    { id: 'req-testing-tools', text: 'Ferramentas de testing adversarial', completed: false }
  ],
  
  'bedrock-guardrails': [
    { id: 'req-bedrock-setup', text: 'Configuração de guardrails no Bedrock', completed: true },
    { id: 'req-policy-definition', text: 'Definição de políticas de conteúdo', completed: true },
    { id: 'req-monitoring', text: 'Monitoramento de violações', completed: false }
  ],
  
  'sec-atlas': [
    { id: 'req-atlas-tactics', text: 'Tactics do MITRE ATLAS', completed: true },
    { id: 'req-atlas-techniques', text: 'Techniques aplicadas', completed: false },
    { id: 'req-atlas-mitigations', text: 'Mitigations mapeadas', completed: false }
  ],
  
  'sec-nist': [
    { id: 'req-nist-framework', text: 'NIST AI RMF structure', completed: true },
    { id: 'req-risk-assessment', text: 'Risk assessment em IA', completed: false },
    { id: 'req-documentation', text: 'Documentação de riscos', completed: false }
  ],
  
  'advanced-ai-security': [
    { id: 'req-zero-trust-ml', text: 'Zero Trust ML architecture', completed: false },
    { id: 'req-encryption', text: 'Encrypted inference', completed: false },
    { id: 'req-federated', text: 'Federated learning security', completed: false }
  ],
  
  // ============================================================================
  // DOMÍNIO 3: ENGENHARIA DE DADOS
  // ============================================================================
  'data-modeling-dim': [
    { id: 'req-normalization', text: 'Normalização (3FN)', completed: true },
    { id: 'req-kimball', text: 'Modelagem Kimball (Star/Snowflake)', completed: true },
    { id: 'req-partitioning', text: 'Particionamento avançado', completed: true },
    { id: 'req-denormalization', text: 'Denormalização para performance', completed: true },
    { id: 'req-data-mesh', text: 'Data Mesh e contratos de dados', completed: true }
  ],
  
  'sql': [
    { id: 'req-sql-basics', text: 'Sintaxe SQL e queries básicas', completed: true },
    { id: 'req-cte', text: 'CTEs e subqueries complexas', completed: true },
    { id: 'req-window', text: 'Window functions', completed: true },
    { id: 'req-optimization', text: 'Otimização de queries e índices', completed: true },
    { id: 'req-analytical', text: 'Queries analíticas avançadas', completed: true }
  ],
  
  'pyspark-distributed': [
    { id: 'req-dataframes', text: 'Manipulação de DataFrames', completed: true },
    { id: 'req-joins', text: 'Otimização de joins e shuffles', completed: true },
    { id: 'req-streaming', text: 'Structured Streaming em tempo real', completed: false },
    { id: 'req-fault-tolerance', text: 'Arquiteturas tolerantes a falhas', completed: false },
    { id: 'req-tuning', text: 'Tuning avançado de performance', completed: false }
  ],
  
  'aws-glue-etl': [
    { id: 'req-job-bookmarks', text: 'Job Bookmarks', completed: true },
    { id: 'req-dynamic-frames', text: 'DynamicFrames', completed: true },
    { id: 'req-cataloging', text: 'Data Catalog integration', completed: true },
    { id: 'req-scheduling', text: 'Scheduling e triggers', completed: true }
  ],
  
  'data-quality-expectations': [
    { id: 'req-great-expectations', text: 'Great Expectations framework', completed: true },
    { id: 'req-soda', text: 'Soda SQL/Core', completed: false },
    { id: 'req-automated-testing', text: 'Testing automatizado de dados', completed: true },
    { id: 'req-alerting', text: 'Alerting de qualidade', completed: false }
  ],
  
  'streaming-kafka': [
    { id: 'req-producers', text: 'Kafka producers', completed: false },
    { id: 'req-consumers', text: 'Kafka consumers e consumer groups', completed: false },
    { id: 'req-connect', text: 'Kafka Connect', completed: false },
    { id: 'req-schema-registry', text: 'Schema Registry', completed: false }
  ],
  
  'data-modeling': [
    { id: 'req-er-modeling', text: 'Entity-Relationship modeling', completed: true },
    { id: 'req-star-schema', text: 'Star schema design', completed: true },
    { id: 'req-slowly-changing', text: 'Slowly Changing Dimensions', completed: true }
  ],
  
  'data-lakes-lakehouse': [
    { id: 'req-s3-architecture', text: 'Arquitetura de data lakes em S3', completed: true },
    { id: 'req-parquet', text: 'Formatos colunares (Parquet/ORC)', completed: true },
    { id: 'req-athena', text: 'Consultas serverless com Athena', completed: true },
    { id: 'req-quicksight', text: 'Dashboards no QuickSight', completed: true }
  ],
  
  'pyspark-glue-etl': [
    { id: 'req-pyspark-basics', text: 'PySpark DataFrames básicos', completed: true },
    { id: 'req-glue-jobs', text: 'AWS Glue jobs', completed: true },
    { id: 'req-transformations', text: 'Transformações complexas', completed: true }
  ],
  
  'data-quality-observability': [
    { id: 'req-data-validation', text: 'Validação de regras de qualidade', completed: true },
    { id: 'req-lineage', text: 'Linhagem de dados', completed: true },
    { id: 'req-monitoring', text: 'Monitoramento contínuo', completed: true }
  ],
  
  'data-lakes-s3-athena': [
    { id: 'req-s3-partitioning', text: 'Particionamento em S3', completed: true },
    { id: 'req-athena-queries', text: 'Otimização de queries Athena', completed: true },
    { id: 'req-glue-catalog', text: 'Glue Data Catalog', completed: true }
  ],
  
  'data-contracts': [
    { id: 'req-schema-definition', text: 'Definição de schemas de contrato', completed: true },
    { id: 'req-validation', text: 'Validação de contratos', completed: true },
    { id: 'req-versioning', text: 'Versionamento de contratos', completed: false }
  ],
  
  'data-lineage': [
    { id: 'req-tracking', text: 'Tracking de linhagem end-to-end', completed: true },
    { id: 'req-visualization', text: 'Visualização de linhagem', completed: false },
    { id: 'req-impact-analysis', text: 'Análise de impacto de mudanças', completed: true }
  ],
  
  'data-platform-architecture': [
    { id: 'req-platform-design', text: 'Design de plataformas de dados', completed: false },
    { id: 'req-governance', text: 'Governança de dados corporativa', completed: false },
    { id: 'req-self-service', text: 'Self-service analytics', completed: false }
  ],
  
  'kafka': [
    { id: 'req-kafka-basics', text: 'Conceitos fundamentais do Kafka', completed: false },
    { id: 'req-producers-consumers', text: 'Producers e consumers', completed: false },
    { id: 'req-partitioning', text: 'Partitioning strategies', completed: false }
  ]
};

console.log('Preparando população de requirements para', Object.keys(skillRequirements).length, 'skills...');
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

  console.log('=== POPULANDO REQUIREMENTS (MICROSKILLS) ===\n');

  let updatedCount = 0;
  let skippedCount = 0;
  const errors = [];

  for (const [skillId, requirements] of Object.entries(skillRequirements)) {
    try {
      // Verificar se skill existe
      const { data: existing } = await supabase.from('skills').select('id').eq('id', skillId).single();
      
      if (!existing) {
        skippedCount++;
        console.log(`⚠️  Skill não encontrada: ${skillId}`);
        continue;
      }

      // Calcular nível dinamicamente
      const completedCount = requirements.filter(r => r.completed).length;
      const totalCount = requirements.length;
      const calculatedLevel = 1 + 4 * (completedCount / totalCount);
      const level = Math.round(calculatedLevel * 10) / 10; // Arredondar para 1 casa decimal

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

  console.log(`\n=== RESULTADO ===`);
  console.log(`✓ Skills atualizadas: ${updatedCount}`);
  console.log(`⚠️  Skills não encontradas: ${skippedCount}`);
  console.log(`❌ Erros: ${errors.length}`);

  if (errors.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'populate-requirements-errors.json'),
      JSON.stringify(errors, null, 2)
    );
  }

  // Salvar resultado
  fs.writeFileSync(
    path.join(__dirname, 'populate-requirements-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      updated_count: updatedCount,
      skipped_count: skippedCount,
      errors: errors,
      total_mapped: Object.keys(skillRequirements).length,
      total_microskills: Object.values(skillRequirements).flat().length
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/populate-requirements-result.json');
}

populateRequirements().catch(console.error);
