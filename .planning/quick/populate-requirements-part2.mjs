import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Continuação: domínios 4-9
const skillRequirements = {
  // ============================================================================
  // DOMÍNIO 4: CLOUD & PLATFORM
  // ============================================================================
  'aws-core-serverless': [
    { id: 'req-lambda', text: 'AWS Lambda e triggers', completed: true },
    { id: 'req-s3', text: 'Amazon S3 e data lakes', completed: true },
    { id: 'req-dynamodb', text: 'DynamoDB e design NoSQL', completed: true },
    { id: 'req-api-gateway', text: 'API Gateway e REST APIs', completed: true },
    { id: 'req-sqs-sns', text: 'SQS, SNS e mensageria', completed: true },
    { id: 'req-iam', text: 'IAM avançado e políticas', completed: true },
    { id: 'req-multi-az', text: 'Arquiteturas multi-AZ de alta disponibilidade', completed: false }
  ],
  
  'kubernetes-cka': [
    { id: 'req-k8s-basics', text: 'Conceitos fundamentais (Pods, Services, Deployments)', completed: false },
    { id: 'req-networking', text: 'Networking e Ingress controllers', completed: false },
    { id: 'req-rbac', text: 'RBAC e segurança de clusters', completed: false },
    { id: 'req-helm', text: 'Helm charts e package management', completed: false },
    { id: 'req-production', text: 'Administração de clusters em produção (CKA)', completed: false }
  ],
  
  'docker-containers': [
    { id: 'req-dockerfile', text: 'Dockerfile e best practices', completed: true },
    { id: 'req-multi-stage', text: 'Multi-stage builds', completed: true },
    { id: 'req-networking', text: 'Docker networking', completed: true },
    { id: 'req-volumes', text: 'Volumes e persistência', completed: true },
    { id: 'req-security', text: 'Security best practices', completed: false }
  ],
  
  'github-actions-cicd': [
    { id: 'req-workflows', text: 'Workflows e triggers', completed: true },
    { id: 'req-matrix', text: 'Matrix builds', completed: true },
    { id: 'req-secrets', text: 'Secrets management', completed: true },
    { id: 'req-caching', text: 'Caching e otimização', completed: true },
    { id: 'req-release', text: 'Release automation', completed: false }
  ],
  
  'terraform-iac': [
    { id: 'req-state', text: 'State management', completed: false },
    { id: 'req-modules', text: 'Modules e reutilização', completed: false },
    { id: 'req-remote-backend', text: 'Remote backend', completed: false },
    { id: 'req-workspaces', text: 'Workspaces', completed: false },
    { id: 'req-best-practices', text: 'Best practices e patterns', completed: false }
  ],
  
  'observability-sre': [
    { id: 'req-prometheus', text: 'Prometheus e métricas', completed: false },
    { id: 'req-grafana', text: 'Grafana e dashboards', completed: false },
    { id: 'req-opentelemetry', text: 'OpenTelemetry', completed: false },
    { id: 'req-slos', text: 'SLOs/SLIs', completed: false },
    { id: 'req-incident', text: 'Incident response', completed: false }
  ],
  
  'aws-cost-finops': [
    { id: 'req-cost-explorer', text: 'Cost Explorer e análise', completed: true },
    { id: 'req-right-sizing', text: 'Right-sizing de recursos', completed: true },
    { id: 'req-reservations', text: 'Reservations e Savings Plans', completed: true },
    { id: 'req-budgets', text: 'Budgets e alertas', completed: true },
    { id: 'req-tagging', text: 'Tagging strategy', completed: false }
  ],
  
  'aws-cloud-arch': [
    { id: 'req-ec2', text: 'EC2 e compute services', completed: true },
    { id: 'req-vpc', text: 'VPC e networking', completed: true },
    { id: 'req-serverless', text: 'Serverless architecture', completed: true },
    { id: 'req-ha', text: 'High availability design', completed: true }
  ],
  
  'platform-devops-mlops': [
    { id: 'req-ci-cd', text: 'CI/CD pipelines', completed: true },
    { id: 'req-mlops-lifecycle', text: 'MLOps lifecycle', completed: true },
    { id: 'req-model-registry', text: 'Model registry', completed: false }
  ],
  
  'mlops': [
    { id: 'req-model-training', text: 'Model training pipelines', completed: true },
    { id: 'req-model-deployment', text: 'Model deployment', completed: true },
    { id: 'req-monitoring', text: 'Model monitoring e drift detection', completed: false }
  ],
  
  'cost-optimization': [
    { id: 'req-analysis', text: 'Cost analysis e reporting', completed: true },
    { id: 'req-optimization', text: 'Optimization strategies', completed: true },
    { id: 'req-automation', text: 'Automated cost controls', completed: false }
  ],
  
  'iam': [
    { id: 'req-policies', text: 'IAM policies e roles', completed: true },
    { id: 'req-least-privilege', text: 'Least privilege principle', completed: true },
    { id: 'req-cross-account', text: 'Cross-account access', completed: false }
  ],
  
  'vpc': [
    { id: 'req-subnets', text: 'Subnets e route tables', completed: true },
    { id: 'req-security-groups', text: 'Security groups e NACLs', completed: true },
    { id: 'req-peering', text: 'VPC peering e Transit Gateway', completed: false }
  ],
  
  'lambda': [
    { id: 'req-functions', text: 'Function development', completed: true },
    { id: 'req-triggers', text: 'Event triggers', completed: true },
    { id: 'req-optimization', text: 'Performance optimization', completed: true }
  ],
  
  's3': [
    { id: 'req-buckets', text: 'Bucket management', completed: true },
    { id: 'req-lifecycle', text: 'Lifecycle policies', completed: true },
    { id: 'req-versioning', text: 'Versioning e replication', completed: true }
  ],
  
  'ecs': [
    { id: 'req-tasks', text: 'Task definitions', completed: true },
    { id: 'req-services', text: 'Services e load balancing', completed: true },
    { id: 'req-fargate', text: 'Fargate serverless containers', completed: false }
  ],
  
  'cloudwatch': [
    { id: 'req-logs', text: 'CloudWatch Logs', completed: true },
    { id: 'req-metrics', text: 'Custom metrics', completed: true },
    { id: 'req-alarms', text: 'Alarms e notifications', completed: true }
  ],
  
  'performance-optimization-sre': [
    { id: 'req-profiling', text: 'Performance profiling', completed: false },
    { id: 'req-optimization', text: 'Code optimization', completed: false },
    { id: 'req-sre-principles', text: 'SRE principles', completed: false }
  ],
  
  // ============================================================================
  // DOMÍNIO 5: SEGURANÇA & RED TEAM
  // ============================================================================
  'offensive-sec-pentest': [
    { id: 'req-fundamentals', text: 'Fundamentos de redes e OWASP Top 10', completed: true },
    { id: 'req-enumeration', text: 'Enumeração e reconhecimento', completed: false },
    { id: 'req-exploitation', text: 'Exploração de vulnerabilidades (OSCP)', completed: false },
    { id: 'req-active-directory', text: 'Ataques em Active Directory (CRTP)', completed: false },
    { id: 'req-post-exploitation', text: 'Pós-exploração e privilege escalation', completed: false }
  ],
  
  'network-protocols-sec': [
    { id: 'req-tcp-ip', text: 'TCP/IP fundamentals', completed: true },
    { id: 'req-dns', text: 'DNS e resolução', completed: true },
    { id: 'req-http', text: 'HTTP/HTTPS protocols', completed: true },
    { id: 'req-tls', text: 'TLS/SSL', completed: true },
    { id: 'req-firewalls', text: 'Firewalls e packet filtering', completed: false }
  ],
  
  'identity-access-management': [
    { id: 'req-oidc', text: 'OIDC (OpenID Connect)', completed: false },
    { id: 'req-oauth2', text: 'OAuth2 flows', completed: false },
    { id: 'req-saml', text: 'SAML authentication', completed: false },
    { id: 'req-rbac', text: 'RBAC/ABAC models', completed: true },
    { id: 'req-zero-trust', text: 'Zero Trust architecture', completed: false }
  ],
  
  'cryptography-pki': [
    { id: 'req-symmetric', text: 'Symmetric encryption', completed: true },
    { id: 'req-asymmetric', text: 'Asymmetric encryption', completed: true },
    { id: 'req-hashing', text: 'Hashing algorithms', completed: true },
    { id: 'req-tls-ssl', text: 'TLS/SSL implementation', completed: true },
    { id: 'req-pki', text: 'PKI e certificate management', completed: false },
    { id: 'req-kms', text: 'KMS (Key Management Service)', completed: true }
  ],
  
  'enterprise-risk-cissp': [
    { id: 'req-risk-mgmt', text: 'Risk management frameworks', completed: false },
    { id: 'req-nist', text: 'NIST frameworks', completed: false },
    { id: 'req-cis', text: 'CIS Benchmarks', completed: false },
    { id: 'req-compliance', text: 'Compliance e auditing', completed: false },
    { id: 'req-cissp-domains', text: 'CISSP 8 domains', completed: false }
  ],
  
  'security': [
    { id: 'req-cia-triad', text: 'CIA Triad (Confidentiality, Integrity, Availability)', completed: true },
    { id: 'req-threat-modeling', text: 'Threat modeling', completed: true },
    { id: 'req-vulnerability-mgmt', text: 'Vulnerability management', completed: true }
  ],
  
  'active-directory-redteam': [
    { id: 'req-kerberos', text: 'Kerberos attacks (Kerberoasting)', completed: false },
    { id: 'req-pass-hash', text: 'Pass-the-Hash attacks', completed: false },
    { id: 'req-lateral-movement', text: 'Lateral movement techniques', completed: false }
  ],
  
  'pentest-oscp-methodology': [
    { id: 'req-recon', text: 'Reconnaissance', completed: false },
    { id: 'req-scanning', text: 'Scanning e enumeration', completed: false },
    { id: 'req-exploitation', text: 'Exploitation', completed: false }
  ],
  
  'devsecops-platform-security': [
    { id: 'req-sast', text: 'SAST (Static Application Security Testing)', completed: false },
    { id: 'req-dast', text: 'DAST (Dynamic Application Security Testing)', completed: false },
    { id: 'req-container-security', text: 'Container security', completed: false }
  ],
  
  // ============================================================================
  // DOMÍNIO 6: ARQUITETURA & APIs
  // ============================================================================
  'rest-api-design': [
    { id: 'req-richardson', text: 'Richardson Maturity Model', completed: true },
    { id: 'req-idempotency', text: 'Idempotency', completed: true },
    { id: 'req-status-codes', text: 'Status codes e error handling', completed: true },
    { id: 'req-versioning', text: 'API versioning', completed: true },
    { id: 'req-hateoas', text: 'HATEOAS', completed: false }
  ],
  
  'openapi-contracts': [
    { id: 'req-spec-30', text: 'OpenAPI Spec 3.0/3.1', completed: true },
    { id: 'req-schema-validation', text: 'Schema validation', completed: true },
    { id: 'req-breaking-changes', text: 'Breaking changes detection', completed: true },
    { id: 'req-code-generation', text: 'Code generation', completed: false },
    { id: 'req-documentation', text: 'Documentation generation', completed: true }
  ],
  
  'grpc-protobuf': [
    { id: 'req-protobuf', text: 'Protocol Buffers', completed: false },
    { id: 'req-streaming', text: 'Streaming (unary, server, client, bidirectional)', completed: false },
    { id: 'req-error-handling', text: 'Error handling', completed: false },
    { id: 'req-load-balancing', text: 'Load balancing', completed: false },
    { id: 'req-performance', text: 'Performance tuning', completed: false }
  ],
  
  'domain-driven-design': [
    { id: 'req-bounded-contexts', text: 'Bounded Contexts', completed: true },
    { id: 'req-ubiquitous-language', text: 'Ubiquitous Language', completed: true },
    { id: 'req-aggregates', text: 'Aggregates', completed: true },
    { id: 'req-domain-events', text: 'Domain Events', completed: false },
    { id: 'req-strategic-design', text: 'Strategic Design', completed: false }
  ],
  
  'system-design-distributed': [
    { id: 'req-load-balancing', text: 'Load balancing strategies', completed: true },
    { id: 'req-caching', text: 'Caching layers', completed: true },
    { id: 'req-sharding', text: 'Sharding e partitioning', completed: false },
    { id: 'req-cap-theorem', text: 'CAP theorem', completed: true },
    { id: 'req-consistency', text: 'Consistency patterns', completed: false }
  ],
  
  'api-architecture-design': [
    { id: 'req-api-gateway', text: 'API Gateway patterns', completed: true },
    { id: 'req-versioning', text: 'Versioning strategies', completed: true },
    { id: 'req-security', text: 'API security', completed: true },
    { id: 'req-rate-limiting', text: 'Rate limiting', completed: true }
  ],
  
  'enterprise-architecture-design': [
    { id: 'req-microservices', text: 'Microservices patterns', completed: true },
    { id: 'req-event-driven', text: 'Event-driven architecture', completed: true },
    { id: 'req-scalability', text: 'Scalability patterns', completed: false }
  ],
  
  'cloud-native-platform-eng': [
    { id: 'req-12-factor', text: '12-Factor App', completed: false },
    { id: 'req-cloud-native', text: 'Cloud-native principles', completed: false },
    { id: 'req-platform-engineering', text: 'Platform engineering', completed: false }
  ],
  
  'openapi': [
    { id: 'req-spec', text: 'OpenAPI specification', completed: true },
    { id: 'req-tools', text: 'Tooling ecosystem', completed: true }
  ]
};

console.log('Preparando população de requirements PARTE 2 para', Object.keys(skillRequirements).length, 'skills...');
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

  console.log('=== POPULANDO REQUIREMENTS PARTE 2 (MICROSKILLS) ===\n');

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

  console.log(`\n=== RESULTADO PARTE 2 ===`);
  console.log(`✓ Skills atualizadas: ${updatedCount}`);
  console.log(`⚠️  Skills não encontradas: ${skippedCount}`);
  console.log(`❌ Erros: ${errors.length}`);

  if (errors.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'populate-requirements-part2-errors.json'),
      JSON.stringify(errors, null, 2)
    );
  }

  fs.writeFileSync(
    path.join(__dirname, 'populate-requirements-part2-result.json'),
    JSON.stringify({
      timestamp: new Date().toISOString(),
      updated_count: updatedCount,
      skipped_count: skippedCount,
      errors: errors,
      total_mapped: Object.keys(skillRequirements).length,
      total_microskills: Object.values(skillRequirements).flat().length
    }, null, 2)
  );

  console.log('\n✓ Resultado salvo em: .planning/quick/populate-requirements-part2-result.json');
}

populateRequirements().catch(console.error);
