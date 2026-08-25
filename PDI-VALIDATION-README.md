# PDI Export para Validação

**Data de exportação:** 2026-08-24  
**Versão:** 2.0.0  
**Propósito:** Validação completa do Plano de Desenvolvimento Individual

---

## 📦 Arquivos Disponíveis

### 1. **pdi-summary.json** (8.4 KB) - RECOMENDADO PARA INÍCIO
Sumário executivo com visão geral do PDI:
- Informações pessoais e timeline de carreira
- Framework de níveis L1-L7 completo
- Estatísticas gerais (37 milestones, 123 skills)
- Certificações roadmap por nível
- Projetos estratégicos
- Pontos de validação e gaps identificados
- Resumo financeiro e next steps

**Use este arquivo para:** Validação rápida e análise de alto nível

### 2. **pdi-complete.json** (23 KB)
Dados completos extraídos do TypeScript:
- 37 milestones detalhados com objetivos
- 123 skills com níveis e categorias
- Estatísticas por status e categoria
- Primeiras 20 skills como amostra

**Use este arquivo para:** Análise detalhada de milestones e skills

### 3. **Arquivos Fonte TypeScript** (para referência completa)
```
src/data/pdiData.ts         - Dados completos (1.542 linhas)
src/data/certifications.ts  - Detalhes de certificações (224 linhas)
src/data/careerLevels.ts    - Framework de níveis e KPIs
```

---

## 🎯 Contexto do Profissional

**Nome:** Gustavo Soldera  
**Idade:** 24 anos  
**Empresa:** Itaú Unibanco  
**Área:** Cyber Security  
**Nível Atual:** L2 (Júnior) desde 05/05/2025  
**Meta:** L3 (Pleno) em 07/06/2026 → L4 (Sênior) em 01/01/2028

**Especialização alvo:** AI Security Specialist (L5-L7)

---

## 📊 Números do PDI

- **37 milestones** (9 concluídos, 3 em progresso, 25 planejados)
- **123 skills** mapeadas (20 expert level 5, 64 advanced level 4)
- **13 certificações** planejadas L2→L7 (4 já concluídas em L1)
- **6 projetos** concluídos + 2 em progresso
- **Progressão:** L1→L2→L3→L4→L5→L6→L7 (8 anos, 2026-2033)

---

## ✅ Pontos Fortes Identificados

1. **Estrutura clara:** Framework L1-L7 com KPIs mensuráveis
2. **Certificações alinhadas:** Progressão CRTP→OSCP→CAISP→CISSP→AAISM
3. **Base sólida:** 4 certificações concluídas em L1
4. **IA Generativa:** 16 skills de nível 4-5 (LLM, RAG, Agent Design)
5. **Cloud AWS:** 18 skills cloud (Glue, S3, Lambda, Athena)
6. **Soft skills:** Empatia e Proatividade nível 5
7. **Projetos de impacto:** Portal Cyber, Insight Guard, Multi-Agent System

---

## ⚠️ Áreas para Validação

### 1. **Timeline de Certificações**
- 13 certificações em 7 anos (média 1.8/ano)
- OSCP (24h prático) + CAISP (6h prático) + CISSP (8 domínios) são exigentes
- Verificar se há sobreposição de deadlines críticas

### 2. **Viabilidade Financeira**
- Custo total estimado: **~US$ 14.150** ao longo de 7 anos
- Custos anuais variam de US$ 400 (L2-L3) a US$ 2.800 (L3-L4)
- Verificar cobertura pela empresa ou necessidade de investimento próprio

### 3. **Dependências de Certificações**
- AAISM (L7) requer CISSP ativo → bem mapeado
- OSCP antes de CAISP faz sentido (fundamento ofensivo antes de AI Security)
- iSAQB CPSA-F antes de CPSA-A → correto

### 4. **Equilíbrio Work-Life-Study**
- ~2.000h de estudo estimadas em 7 anos (~6h/semana)
- Considerar intensidade de labs práticos (OSCP, CAISP)
- Manter entregas de projetos paralelas às certificações

### 5. **Mentoria de Juniores**
- KPI L3 bloqueado até ter estagiário alocado
- Considerar alternativas: mentoria em comunidades, open source

### 6. **Gaps Técnicos**
- Kafka (level 2) e Redshift (level 2) vs. objetivo Data Engineer
- Kubernetes (level 3) pode ser gargalo para L4-L5
- Liderança Situacional (level 2) importante para L4+

---

## 🔍 Perguntas para o Validador

1. **Certificações:**
   - O roadmap CRTP→OSCP→CAISP→CISSP está bem sequenciado?
   - AWS SA Associate é realmente necessário ou pode ser pulado?
   - CMCPSE vale o investimento ou é "nice to have"?

2. **Timeline:**
   - Deadlines são realistas considerando trabalho full-time?
   - Há margem para imprevistos (reprovas, atrasos)?

3. **Carreira:**
   - Milestones de L2→L3 são suficientes para promoção?
   - KPIs de L3→L4 demonstram claramente senioridade?
   - Progressão L5→L6→L7 é viável no Itaú Unibanco?

4. **Foco:**
   - Especialização em AI Security está bem fundamentada?
   - Há equilíbrio entre segurança ofensiva (OSCP) e defensiva (CAISP)?
   - Governança (ISO 42001, AAISM) chega no momento certo?

5. **Skills:**
   - Gaps em Kafka, Redshift, Kubernetes são críticos?
   - Soft skills (nível 4-5) sustentam liderança técnica L4+?

---

## 🚀 Próximos Passos Sugeridos

### Imediato (Q3-Q4 2026, L2)
1. Finalizar milestones em progresso:
   - Fomento IA (45%→100%)
   - PDI L1-L7 (75%→100%)
2. Validar PDI com gestão (Aline) em 1:1
3. Preparar transição L2→L3

### Q1-Q2 2027 (L2→L3)
1. Iniciar estudos CRTP (Active Directory)
2. Decidir sobre AWS SA Associate (opcional)
3. Assumir ownership de projetos médios

### 2027-2028 (L3)
1. Obter CRTP (deadline 31/12/2027)
2. Iniciar labs OSCP (PEN-200)
3. Demonstrar KPIs de L3→L4

---

## 📚 Referências Completas

- **Repositório:** https://github.com/g-soldera/gus-pdi
- **Web App:** https://gus-pdi.vercel.app
- **Framework:** `.planning/career-levels-framework.md`
- **Roadmap:** `.planning/ROADMAP.md`

---

## 💬 Como Usar Este Export

### Para validação rápida (15-30 min):
```bash
cat pdi-summary.json
```
Analise seções: `validation_points`, `gaps_identified`, `financial_summary`

### Para análise detalhada (1-2h):
```bash
cat pdi-complete.json
```
Revise milestones, skills e estatísticas completas

### Para análise profunda (3-4h):
```bash
code src/data/pdiData.ts
code src/data/certifications.ts
code .planning/career-levels-framework.md
```
Mergulhe no código-fonte TypeScript completo

---

**Última atualização:** 2026-08-24T23:40:02.660Z  
**Gerado por:** extract-pdi-complete.py  
**Versão do PDI:** 2.0.0
