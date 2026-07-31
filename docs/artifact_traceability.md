# Artifact Traceability — AI/ML Assets

Diretrizes para rastreabilidade de artefatos de ML, garantindo proveniência e auditabilidade.

## Artefatos Rastreados

| Artefato        | Formato típico        | Metadados obrigatórios               |
|-----------------|-----------------------|----------------------------------------|
| Dataset         | Parquet, CSV, Delta   | Hash SHA-256, versão, origem, schema   |
| Modelo treinado | ONNX, SafeTensors, PT | Hash SHA-256, commit de treino, métricas |
| Pipeline config | YAML, JSON            | Versão, autor, timestamp               |
| Prompt template | Markdown, YAML        | Versão, hash, data de aprovação        |

## Estrutura do Audit Log

Cada operação sobre artefatos gera uma entrada de log:

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "action": "register_model",
  "artifact_type": "model",
  "artifact_id": "sentiment-v2.1",
  "hash_sha256": "a1b2c3d4...",
  "actor": "pipeline/ci-cd",
  "source_commit": "abc1234",
  "metadata": {
    "framework": "pytorch",
    "accuracy": 0.94,
    "dataset_hash": "e5f6g7h8..."
  }
}
```

### Campos obrigatórios

| Campo           | Tipo     | Descrição                              |
|-----------------|----------|----------------------------------------|
| `timestamp`     | ISO 8601 | Momento da ação                        |
| `action`        | string   | `register`, `promote`, `retire`, `scan` |
| `artifact_type` | string   | `model`, `dataset`, `pipeline`, `prompt` |
| `artifact_id`   | string   | Identificador único do artefato        |
| `hash_sha256`   | string   | Hash do artefato no momento da ação    |
| `actor`         | string   | Quem/o quê executou a ação             |

## Registry Hash Verification

Fluxo de verificação de integridade:

1. **Upload** — calcular SHA-256 do artefato e armazenar no registro
2. **Download** — recalcular hash e comparar com registro
3. **Deploy** — verificar hash antes de servir; rejeitar se divergente
4. **Audit** — verificação periódica de todos artefatos no registro

```
Artefato → SHA-256 → Registro
                        ↕
Deploy ← Verificar ← SHA-256 recalculado
```

## Ciclo de Vida dos Artefatos

| Estado      | Significado                          | Transições permitidas     |
|-------------|--------------------------------------|---------------------------|
| `draft`     | Em desenvolvimento                   | → `registered`            |
| `registered`| Hash armazenado, scan executado      | → `approved`, `rejected`  |
| `approved`  | Aprovado para staging/prod           | → `deployed`, `retired`   |
| `deployed`  | Em produção                          | → `retired`               |
| `retired`   | Removido de produção                 | (terminal)                |
| `rejected`  | Scan falhou ou policy violation      | → `draft`                 |

## Security Gates

Antes de um artefato avançar de estado, gates obrigatórios:

- **ModelScan** — verificar pickle/deserialization attacks (supply chain)
- **Hash match** — SHA-256 deve coincidir com registro
- **Signature** — artefato assinado pelo pipeline (GPG ou Sigstore)
- **Policy check** — conformidade com políticas de governança

## Referências

- [SLSA Framework](https://slsa.dev/) — Supply-chain Levels for Software Artifacts
- [Sigstore](https://sigstore.dev/) — Assinatura de artefatos
- [ModelScan](https://github.com/protectai/modelscan) — Scan de modelos ML
