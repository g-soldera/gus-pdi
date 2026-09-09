# Variáveis de Ambiente — Wave 2 e 3

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Upstash Redis (para rate limiting)
# Criar conta em https://upstash.com
# Dashboard → Create Database (Redis) → REST API
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here

# Supabase
# Criar projeto em https://supabase.com
# Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Segurança
# Gerar com: openssl rand -hex 32
IP_HASH_SECRET=seu-secret-hex-64-chars
ADMIN_SECRET=seu-secret-hex-64-chars

# Admin password (Wave 3)
# Escolha uma senha forte
ADMIN_PASSWORD=sua-senha-admin-aqui
```

## Setup Wave 2

1. **Criar conta Upstash:**
   - Acesse https://upstash.com e crie uma conta gratuita
   - Create Database → Type: Redis → Region: próximo ao seu deploy
   - Copie `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`

2. **Criar projeto Supabase:**
   - Acesse https://supabase.com e crie uma conta gratuita
   - New Project → escolha nome, senha do BD e região
   - Aguarde ~2 minutos até o projeto estar pronto
   - Project Settings → API:
     - Copie `URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - Copie `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Copie `service_role` (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

3. **Executar schema SQL:**
   - No Supabase: SQL Editor → New query
   - Cole o conteúdo de `docs/feedback-schema.sql`
   - Run → verificar sucesso

4. **Gerar secrets:**
   ```bash
   openssl rand -hex 32  # IP_HASH_SECRET
   openssl rand -hex 32  # ADMIN_SECRET
   ```

5. **Configurar no Vercel (para deploy):**
   - Project Settings → Environment Variables
   - Adicionar todas as variáveis acima (exceto `.env.local` local)
   - **IMPORTANTE:** Adicionar também `SUPABASE_URL` e `SUPABASE_ANON_KEY` como secrets do repositório para a GitHub Action de keep-alive funcionar

## Verificação

Testar a API localmente:

```bash
# Deve retornar 201
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"content":"Feedback de teste com mais de 10 caracteres","isAnonymous":true,"honeypot":""}'

# Deve retornar 400 (conteúdo curto)
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"content":"curto","isAnonymous":true,"honeypot":""}'
```

Verificar no Supabase:
- Table Editor → feedback → deve aparecer o registro
- O campo `ip_hash` deve conter um hash hex, não o IP real
