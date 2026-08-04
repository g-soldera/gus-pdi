# Threat Model — AI/ML Pipelines

Modelo de ameaças para pipelines de Machine Learning, mapeado ao framework **MITRE ATLAS** (Adversarial Threat Landscape for AI Systems).

## Escopo

| Componente          | Descrição                                      |
|---------------------|-------------------------------------------------|
| Pipeline de treino  | Ingestão de dados → feature engineering → treino |
| Registro de modelos | Armazenamento e versionamento de artefatos      |
| Pipeline de inferência | Serving, APIs, guardrails                    |
| Monitoramento       | Drift, performance, auditoria                   |

## Mapeamento MITRE ATLAS

### 1. Data Poisoning (AML.T0020)

| Item        | Detalhe |
|-------------|---------|
| **Técnica ATLAS** | AML.T0020 — Poisoning Training Data |
| **Vetor**   | Injeção de amostras maliciosas em datasets de treino |
| **Impacto** | Modelo aprende padrões incorretos; decisões enviesadas |
| **Mitigação** | Validação estatística de dados de entrada; checksums de datasets; data provenance |

### 2. Model Evasion (AML.T0015)

| Item        | Detalhe |
|-------------|---------|
| **Técnica ATLAS** | AML.T0015 — Evade ML Model |
| **Vetor**   | Inputs adversariais crafted para enganar o modelo em produção |
| **Impacto** | Classificação incorreta; bypass de controles baseados em ML |
| **Mitigação** | Adversarial training; input validation; guardrails (NeMo Guardrails, Llama Guard) |

### 3. Model Theft / Exfiltration (AML.T0024)

| Item        | Detalhe |
|-------------|---------|
| **Técnica ATLAS** | AML.T0024 — Exfiltration via ML Inference API |
| **Vetor**   | Queries repetitivas à API para reconstruir o modelo (model stealing) |
| **Impacto** | Propriedade intelectual comprometida; replicação do modelo |
| **Mitigação** | Rate limiting em APIs de inferência; monitoramento de padrões de query; watermarking |

### 4. Supply Chain Compromise (AML.T0010)

| Item        | Detalhe |
|-------------|---------|
| **Técnica ATLAS** | AML.T0010 — ML Supply Chain Compromise |
| **Vetor**   | Modelos pré-treinados ou dependências com backdoors (ex: pickle deserialization) |
| **Impacto** | Execução remota de código; modelo comprometido desde a origem |
| **Mitigação** | ModelScan para artefatos; hash verification; registry privado com assinatura |

### 5. Prompt Injection (AML.T0051)

| Item        | Detalhe |
|-------------|---------|
| **Técnica ATLAS** | AML.T0051 — LLM Prompt Injection |
| **Vetor**   | Instruções maliciosas injetadas via input do usuário ou contexto |
| **Impacto** | Bypass de system prompts; exfiltração de dados via LLM |
| **Mitigação** | Input sanitization; output filtering; Llama Guard para classificação de prompts |

## Matriz de Risco

| Ameaça              | Probabilidade | Impacto | Risco  | Prioridade |
|----------------------|---------------|---------|--------|------------|
| Data Poisoning       | Média         | Alto    | Alto   | P1         |
| Model Evasion        | Alta          | Médio   | Alto   | P1         |
| Model Exfiltration   | Baixa         | Alto    | Médio  | P2         |
| Supply Chain         | Média         | Crítico | Alto   | P1         |
| Prompt Injection     | Alta          | Alto    | Crítico| P0         |

## Referências

- [MITRE ATLAS](https://atlas.mitre.org/) — Adversarial Threat Landscape for AI Systems
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI RMF](https://www.nist.gov/artificial-intelligence/risk-management-framework)
