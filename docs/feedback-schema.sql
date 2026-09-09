-- Execute este schema no Supabase SQL Editor

CREATE TABLE feedback (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  content     TEXT        NOT NULL CHECK (char_length(content) BETWEEN 10 AND 2000),
  is_anonymous BOOLEAN    DEFAULT TRUE NOT NULL,
  name        TEXT,
  email       TEXT,
  ip_hash     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON feedback (created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Zero políticas públicas = anon role bloqueado
-- Apenas service_role pode inserir e ler
