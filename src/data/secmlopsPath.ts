import { StudyTopic } from '@/types/pdi';

export const secmlopsPath: StudyTopic[] = [
  // Model Supply Chain
  {
    id: 'supply-chain-safetensors',
    category: 'Model Supply Chain',
    name: 'Formato .safetensors',
    description: 'Estudo do formato e mitigação de execução de código arbitrário gerado por arquivos pickle (.pt/.bin)',
    progress: 0,
    resources: ['tool-safetensors', 'course-mlops-security'],
    relatedMilestones: ['model-supply-chain', 'governance-ai-pipelines']
  },
  {
    id: 'supply-chain-signing',
    category: 'Model Supply Chain',
    name: 'Assinatura e Verificação de Modelos',
    description: 'Validação criptográfica de integridade de pesos de modelos no CI/CD com hash SHA256',
    progress: 0,
    resources: ['tool-safetensors', 'course-mlops-security'],
    relatedMilestones: ['model-supply-chain']
  },
  {
    id: 'supply-chain-mlflow',
    category: 'Model Supply Chain',
    name: 'Proveniência com MLflow',
    description: 'Rastreamento de autoria, dados de treinamento, HPO e métricas do ciclo de vida no Model Registry',
    progress: 0,
    resources: ['tool-mlflow-provenance'],
    relatedMilestones: ['model-supply-chain', 'governance-ai-pipelines']
  },

  // Runtime Guardrails
  {
    id: 'guardrails-owasp',
    category: 'Runtime Guardrails',
    name: 'Mitigações OWASP LLM Top 10',
    description: 'Mapeamento de vulnerabilidades (Prompt Injection, Insecure Output) para defesas no runtime',
    progress: 0,
    resources: ['ref-owasp-llm-top10', 'course-bedrock-guardrails'],
    relatedMilestones: ['ai-defense-foundations', 'governance-ai-pipelines']
  },
  {
    id: 'guardrails-bedrock',
    category: 'Runtime Guardrails',
    name: 'AWS Bedrock Guardrails',
    description: 'Implementação de filtros de conteúdo, tópicos negados, PII e grounding checks utilizando API do Bedrock',
    progress: 0,
    resources: ['course-bedrock-guardrails'],
    relatedMilestones: ['ai-defense-foundations', 'governance-ai-pipelines']
  },

  // Adversarial ML
  {
    id: 'adversarial-atlas',
    category: 'Adversarial ML',
    name: 'Mapeamento MITRE ATLAS',
    description: 'Estudo de táticas, técnicas e procedimentos (TTP) de adversários contra sistemas de IA',
    progress: 0,
    resources: ['ref-mitre-atlas', 'books-sec-practical-llm-security'],
    relatedMilestones: ['ai-defense-foundations', 'red-teaming-framework']
  },
  {
    id: 'adversarial-redteam',
    category: 'Adversarial ML',
    name: 'Playbook de Red Teaming',
    description: 'Definição de técnicas de evasão (jailbreaks avançados), inversão e extração de modelo',
    progress: 0,
    resources: ['course-adversarial-ml', 'books-sec-practical-llm-security'],
    relatedMilestones: ['red-teaming-framework']
  },

  // NIST AI RMF
  {
    id: 'nist-framework',
    category: 'NIST AI RMF',
    name: 'Estruturação do Framework NIST',
    description: 'Aplicação das diretrizes NIST AI 100-1 (Govern, Map, Measure, Manage) no ecossistema do banco',
    progress: 0,
    resources: ['ref-nist-ai-rmf', 'books-sec-ai-risk'],
    relatedMilestones: ['nist-ai-rmf-implementation']
  },
  {
    id: 'nist-corporate-governance',
    category: 'NIST AI RMF',
    name: 'Governança Corporativa de IA',
    description: 'Definição de políticas arquiteturais, diretrizes e score de maturidade em segurança de IA',
    progress: 0,
    resources: ['ref-nist-ai-rmf', 'books-sec-ai-risk'],
    relatedMilestones: ['nist-ai-rmf-implementation', 'advanced-governance']
  }
];
