# Trilha de Estudos: Model Supply Chain Security

## Objetivo
Dominar os fundamentos de segurança na cadeia de suprimentos de modelos de IA (Model Supply Chain), garantindo integridade, proveniência e versionamento seguro dos artefatos de ML/AI no ciclo de vida completo.

**Deadline**: 2027-06-30  
**Nível**: L2→L3  
**Tempo estimado**: 80-100 horas ao longo de 8 meses

---

## 📋 Fase 1: Fundamentos de Supply Chain de Modelos (Mês 1-2)

### 1.1 Conceitos Core
- [ ] **O que é Model Supply Chain?**
  - Ciclo de vida: dados → treinamento → artefato → deploy → inferência → monitoramento
  - Vetores de ataque em cada fase (MITRE ATLAS)
  - Diferença entre supply chain de software tradicional vs. modelos de ML

- [ ] **Formatos de Serialização de Modelos**
  - `.pkl` (Pickle): riscos de execução arbitrária de código
  - `.h5` (HDF5): vulnerabilidades conhecidas
  - `.safetensors`: formato seguro, somente tensores, sem código executável
  - `.onnx`: Open Neural Network Exchange

**Recursos:**
- 📄 [Hugging Face: Safetensors Documentation](https://huggingface.co/docs/safetensors)
- 📄 [OWASP ML Top 10: ML03 - Model Serialization Attacks](https://owasp.org/www-project-machine-learning-security-top-10/)
- 📺 [YouTube: Pickle Deserialization Attacks in ML](https://www.youtube.com/results?search_query=pickle+security+ml)

**Prática:**
- Converter modelo treinado de `.pkl` para `.safetensors`
- Comparar tamanho, tempo de load, e validar ausência de código executável

---

## 📋 Fase 2: Integridade e Proveniência (Mês 3-4)

### 2.1 Hash e Assinatura de Modelos
- [ ] **Hashing Criptográfico**
  - SHA256 para verificação de integridade
  - Detectar adulteração/backdoor em modelos baixados
  - Implementar verificação automática no CI/CD

- [ ] **Assinatura Digital**
  - GPG/PGP para assinar artefatos de modelo
  - Chain of custody: quem treinou, aprovou, deployou

**Recursos:**
- 📄 [AWS: Model Governance with Checksums](https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-version.html)
- 📄 [sigstore/cosign: Container & Artifact Signing](https://docs.sigstore.dev/)
- 📄 [SLSA Framework: Supply Chain Levels for Software Artifacts](https://slsa.dev/)

**Prática:**
- Script Python: calcular SHA256 de modelo, armazenar no S3 com metadata
- Implementar verificação de hash no pipeline de deploy (CodeBuild/GitHub Actions)

### 2.2 Rastreamento de Proveniência (Lineage)
- [ ] **MLflow Tracking**
  - Registrar: dataset source, hyperparameters, code version, environment
  - Reprodutibilidade: dado o hash do modelo, recuperar exatamente como foi treinado

- [ ] **Model Registry**
  - Versionamento semântico de modelos (v1.0.0, v1.1.0)
  - Tags: `staging`, `production`, `archived`
  - Metadata: owner, training date, approval status

**Recursos:**
- 📄 [MLflow Model Registry](https://mlflow.org/docs/latest/model-registry.html)
- 📄 [AWS SageMaker Model Registry](https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html)
- 📺 [MLflow in Production - Best Practices](https://www.youtube.com/results?search_query=mlflow+model+registry+production)

**Prática:**
- Configurar MLflow no AWS (EC2 ou Fargate)
- Logar 3 experimentos com datasets diferentes, comparar métricas
- Promover modelo de `staging` → `production` com aprovação manual

---

## 📋 Fase 3: Segurança no CI/CD de Modelos (Mês 5-6)

### 3.1 Pipeline Seguro de Treinamento
- [ ] **Isolamento de Ambiente**
  - Containers imutáveis (Docker) para treinamento
  - Proibir acesso à internet durante treinamento (air-gapped training)
  - Validação de dependencies (Dependabot, Snyk)

- [ ] **Segurança de Dados de Treinamento**
  - Data poisoning detection (anomalias no dataset)
  - Sanitização de dados sensíveis (PII, secrets)
  - Backup imutável (S3 versioning + Object Lock)

**Recursos:**
- 📄 [NIST AI RMF: Secure AI Lifecycle](https://airc.nist.gov/AI_RMF_Knowledge_Base)
- 📄 [Microsoft: Threat Modeling for ML Systems](https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml)
- 📄 [Google: Secure ML Infrastructure](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)

**Prática:**
- Criar Dockerfile para treinamento de modelo com deps pinadas
- Implementar validação de schema no dataset antes do treino (Great Expectations ou Pydantic)

### 3.2 Gates de Qualidade e Segurança
- [ ] **Automated Testing**
  - Unit tests para preprocessing
  - Model performance tests (threshold mínimo de acurácia)
  - Bias/fairness tests (Fairlearn, AI Fairness 360)

- [ ] **Security Scanning**
  - SAST/DAST no código de treinamento
  - Vulnerability scan em dependencies (pip-audit, safety)
  - Secrets scanning (detect-secrets, TruffleHog)

**Recursos:**
- 📄 [Bandit: Python Security Linter](https://bandit.readthedocs.io/)
- 📄 [pip-audit: Auditing Python Dependencies](https://pypi.org/project/pip-audit/)
- 📄 [detect-secrets: Prevent Secrets in Code](https://github.com/Yelp/detect-secrets)

**Prática:**
- Adicionar Bandit + pip-audit no CodeBuild
- Bloquear merge se vulnerabilidades críticas forem encontradas

---

## 📋 Fase 4: Padrões Arquiteturais do Itaú (Mês 7-8)

### 4.1 Adequação às Diretrizes Internas
- [ ] **Revisar Padrões de Governança de ML**
  - Consultar arquitetos de referência do Itaú sobre supply chain de modelos
  - Validar conformidade com políticas de segurança corporativas
  - Documentar decisões arquiteturais (ADR)

- [ ] **Integração com Tooling Itaú**
  - AWS Account structure (dev/staging/prod)
  - IAM roles e policies para acesso a modelos
  - Logging e auditoria (CloudTrail, CloudWatch)

**Recursos:**
- 📄 Documentação interna do Itaú (Wiki, Confluence)
- 🧑‍🏫 Sessões com arquitetos sênior da squad
- 📄 Políticas de Cyber Security do Itaú

**Prática:**
- Propor arquitetura de reference para supply chain de modelos no Cyber
- Apresentar para squad + liderança
- Implementar em 1 projeto piloto (ex: Insight Guard)

### 4.2 Monitoramento e Resposta a Incidentes
- [ ] **Model Drift Detection**
  - Comparar distribuição de entrada prod vs. treino
  - Alertar quando modelo degrada (accuracy < threshold)

- [ ] **Incident Response Plan**
  - Runbook: como responder a modelo comprometido
  - Rollback automatizado para versão anterior
  - Post-mortem e lições aprendidas

**Recursos:**
- 📄 [AWS: MLOps Monitoring](https://aws.amazon.com/blogs/machine-learning/monitor-ml-models/)
- 📄 [Evidently AI: ML Monitoring Open Source](https://www.evidentlyai.com/)

**Prática:**
- Configurar alarme CloudWatch para drift no modelo
- Simular rollback de modelo em staging

---

## 📚 Recursos Adicionais

### Livros
- 📖 **"Building Machine Learning Powered Applications"** - Emmanuel Ameisen (O'Reilly, 2020)
- 📖 **"Designing Machine Learning Systems"** - Chip Huyen (O'Reilly, 2022) - Capítulo 10: Infrastructure and Tooling

### Artigos e Papers
- 📄 [MITRE ATLAS: Supply Chain Compromise (AML.T0010)](https://atlas.mitre.org/techniques/AML.T0010)
- 📄 [Google: Secure ML Infrastructure Design](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
- 📄 [Microsoft: Failure Modes in ML](https://docs.microsoft.com/en-us/security/engineering/failure-modes-in-machine-learning)

### Cursos
- 🎓 [Coursera: MLOps Specialization (DeepLearning.AI)](https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops)
- 🎓 [AWS Skill Builder: MLOps Engineering on AWS](https://explore.skillbuilder.aws/learn/course/external/view/elearning/14738/mlops-engineering-on-aws)

### Comunidades
- 💬 [MLOps Community Slack](https://mlops.community/)
- 💬 [OWASP Machine Learning Security Top 10](https://owasp.org/www-project-machine-learning-security-top-10/)

---

## 🎯 Critérios de Sucesso

Ao final da trilha, você deve ser capaz de:

1. ✅ Explicar os riscos de segurança em cada fase do ciclo de vida de modelos
2. ✅ Implementar verificação de integridade (SHA256) em pipeline de CI/CD
3. ✅ Configurar MLflow para rastrear proveniência de modelos
4. ✅ Converter modelos inseguros (.pkl) para formato seguro (.safetensors)
5. ✅ Criar pipeline de treinamento com gates de segurança automatizados
6. ✅ Documentar arquitetura de supply chain alinhada aos padrões do Itaú
7. ✅ Implementar 1 projeto piloto com supply chain seguro em produção

---

## 📅 Cronograma Sugerido (Set 2026 - Jun 2027)

| Mês | Fase | Entregas |
|-----|------|----------|
| Set-Out 2026 | Fase 1: Fundamentos | Estudo teórico + converter 1 modelo para .safetensors |
| Nov-Dez 2026 | Fase 2: Integridade | Script SHA256 + MLflow configurado no AWS |
| Jan-Fev 2027 | Fase 3: CI/CD Seguro | Pipeline com Bandit + pip-audit + testes automatizados |
| Mar-Abr 2027 | Fase 4: Padrões Itaú | ADR documentado + projeto piloto implementado |
| Mai-Jun 2027 | Consolidação | Apresentação técnica + validação com sênior |

---

**Próximos Passos Imediatos (Setembro 2026)**:
1. Ler documentação do Safetensors (2h)
2. Ler MITRE ATLAS: Supply Chain Compromise (1h)
3. Converter 1 modelo toy (ex: scikit-learn) de pickle para safetensors (prática 3h)
4. Calcular SHA256 e validar integridade (prática 2h)

**Total Fase 1**: ~8h (viável em 2 semanas, 4h/semana)
