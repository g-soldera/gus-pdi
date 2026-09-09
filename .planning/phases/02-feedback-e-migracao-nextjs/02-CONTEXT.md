# Phase 2: Feedback Seguro + Migração Next.js — Context

**Gathered:** 2026-09-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrar o SPA estático (Vite + React) para Next.js App Router hospedado na Vercel, habilitando:

1. **Roteamento protegido por obscuridade:** o PDI atual passa para `/pdi`; a raiz `/` expõe apenas a landing/feedback.
2. **Formulário de feedback público em `/feedback`:** coleta opiniões de forma anônima ou identificada, com proteção anti-bot (honeypot), rate limiting por IP e persistência segura no Supabase.
3. **API route segura em `/api/feedback`:** validação Zod, hashing de IP (SHA-256 + salt), rate limiting sliding window via Upstash Redis, RLS no Supabase.
4. **Painel de leitura protegido por senha em `/admin`:** middleware Next.js valida cookie de sessão; leitura da tabela `feedback` via `service_role`; sem operações de escrita pelo admin.

Phase 2 of Milestone v3.0 (PDI Níveis L1-L7).

Requirement coberto: **L2-L3-AUTONOMY** (ownership de feature completa de ponta a ponta) e **L2-L3-DESIGN** (design técnico com decisões de segurança documentadas).

</domain>

<decisions>
## Implementation Decisions

### Migração de runtime
- **D-01:** Migrar de Vite para Next.js 15 App Router. Justificativa: route handlers nativos, middleware de borda, deploy plug-and-play na Vercel, suporte a React Server Components para o painel admin.
- **D-02:** Manter todos os componentes React existentes — apenas reorganizar em `app/` e ajustar imports. Não reescrever UI.
- **D-03:** Manter pnpm como package manager.

### Roteamento e acesso
- **D-04:** O dashboard PDI (conteúdo atual de `/`) move para `/pdi`. Proteção por obscuridade de URL — sem autenticação. Qualquer pessoa com a URL acessa; o objetivo é apenas não indexar e não expor diretamente.
- **D-05:** `/feedback` é pública, sem autenticação. Contém o formulário de feedback.
- **D-06:** `/admin` é protegida por senha simples via middleware Next.js (`middleware.ts`). Senha armazenada em variável de ambiente `ADMIN_PASSWORD`. Sessão via cookie `httpOnly` com validade de 8 horas. Sem OAuth — overhead desnecessário para uso solo.

### Segurança da API
- **D-07:** Rate limiting com Upstash Redis — sliding window de 5 envios/IP/hora. IP extraído de `x-forwarded-for` (primeiro valor) ou `x-real-ip`.
- **D-08:** IP nunca armazenado em texto puro — apenas `SHA-256(ip + IP_HASH_SECRET)` como `ip_hash TEXT` na tabela.
- **D-09:** Validação com Zod antes de qualquer operação de banco. Erros de validação retornam 400 com detalhes estruturados.
- **D-10:** Honeypot anti-bot: campo `honeypot` invisível ao usuário real (`aria-hidden`, `tabIndex={-1}`, `display:none`). Backend rejeita silenciosamente (200 falso) se campo preenchido.
- **D-11:** RLS no Supabase — `anon` role não tem nenhuma política (zero acesso); apenas `service_role` pode inserir e ler.

### Banco de dados
- **D-12:** Usar Supabase (Postgres gerenciado). Tabela `feedback` com campos: `id UUID`, `content TEXT` (CHECK 10–2000 chars), `is_anonymous BOOLEAN`, `name TEXT`, `email TEXT`, `ip_hash TEXT`, `created_at TIMESTAMPTZ`. Índice em `created_at DESC`.
- **D-13:** Não armazenar o IP. Não armazenar UA. Aviso LGPD no formulário explicando quais dados (nome/email opcionais) são coletados e para que.

### Painel admin
- **D-14:** `/admin` lista feedbacks em ordem decrescente de data. Paginação simples (20/página). Filtros: anônimo vs identificado. Sem moderação/remoção neste milestone — apenas leitura.
- **D-15:** Autenticação admin: rota `POST /admin/login` valida `ADMIN_PASSWORD`, cria cookie `admin-session` (valor = HMAC-SHA256 do timestamp + segredo). Middleware verifica o cookie em todas as rotas `/admin/*`.

### Segurança geral
- **D-16:** Security headers via `next.config.ts`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- **D-17:** Nenhuma chave secreta exposta no client — `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `IP_HASH_SECRET` apenas no servidor.

### the agent's Discretion
- Layout visual do formulário de feedback e do painel admin (dentro das convenções Tailwind + shadcn/ui existentes)
- Estrutura interna dos componentes de formulário e lista de feedbacks
- Estratégia de paginação no admin (link-based vs state)

</decisions>

<specifics>
## Specific Ideas

- Formulário de feedback: toggle anônimo/identificado; campos nome/email aparecem apenas se identificado; honeypot oculto; contador de caracteres; toast de sucesso via `sonner` (já instalado).
- Painel admin: tabela com colunas `data`, `tipo` (anônimo/identificado), `nome`, `conteúdo` (truncado + expandível em modal). Badge colorido por tipo.
- Login admin: página `/admin/login` com input de senha + botão. Erro genérico em caso de senha errada (não revelar se a senha existe ou não).
- Landing `/`: pode ser uma splash page minimalista com links para `/feedback` e (não publicizado) `/pdi`.

</specifics>

<canonical_refs>
## Canonical References

### Runtime e framework
- Next.js 15 App Router docs — `app/` layout, route handlers, middleware
- Vercel deployment docs — variáveis de ambiente, edge middleware
- `@upstash/ratelimit` + `@upstash/redis` — sliding window, `Redis.fromEnv()`

### Segurança
- Zod docs — `safeParse`, `flatten()`, `refine()`
- Node.js `crypto` — `createHash('sha256')`, `createHmac`
- Supabase RLS docs — `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- LGPD (Lei 13.709/2018) — Art. 6º (finalidade, adequação, necessidade)

### UI existente
- shadcn/ui — todos os primitivos já instalados em `src/app/components/ui/`
- Tailwind CSS 4 — estilização, sem mudança de versão
- `sonner` — toast de confirmação de envio

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/components/ui/` — 48 componentes shadcn/ui, todos reutilizáveis no formulário e painel
- `src/app/components/` — todos os componentes do dashboard PDI migram intactos para `/pdi`
- `src/types/pdi.ts`, `src/data/*.ts` — dados estáticos, sem alteração
- `sonner` — já instalado, sem add de dependência para toasts

### Novos pacotes a instalar
- `next` — troca o bundler Vite; remove `vite`, `@vitejs/plugin-react`
- `@upstash/ratelimit` + `@upstash/redis` — rate limiting
- `zod` — validação (checar se já está instalado; provavelmente não)
- `@supabase/supabase-js` — client Supabase

### Integration Points
- Mover `src/app/` → `app/` (convenção Next.js App Router)
- `vite.config.ts` → `next.config.ts`
- `index.html` → `app/layout.tsx` (root layout com ThemeProvider)
- `ThemeContext` — verificar compatibilidade com RSC (mover para Client Component se necessário)

### Established Patterns
- PascalCase para componentes, camelCase para dados/utils
- Path alias `@/*` → `src/*` — manter via `tsconfig.json`
- Named exports

</code_context>

<deferred>
## Deferred Ideas

- Autenticação real (NextAuth/Supabase Auth) para o painel admin — desnecessária para uso solo agora
- Moderação/remoção de feedbacks pelo admin — Phase 3+
- Notificações por email ao receber feedback — Phase 3+
- Rate limiting por fingerprint de browser além de IP — Phase 3+
- Exportação de feedbacks (CSV/JSON) — Phase 3+
- Indexação por search (texto completo no Supabase) — Phase 3+

</deferred>

---

*Phase: 02-feedback-e-migracao-nextjs*
*Context gathered: 2026-09-08*
