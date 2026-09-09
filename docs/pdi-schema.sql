-- =====================================================
-- PDI Database Schema (Phase 03)
-- Execute in Supabase SQL Editor or via `supabase db execute`
-- =====================================================
-- 
-- Purpose: Foundation for all CRUD operations in Phase 04.
-- Schema supports existing TypeScript data model (pdiData.ts)
-- with database constraints and security policies.
--
-- RLS Strategy:
-- - Public read access (anon key) for all tables
-- - Write operations blocked for unauthenticated users
-- - Phase 04 adds auth middleware for password-protected writes
-- =====================================================

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE status_enum AS ENUM (
  'completed',
  'in-progress',
  'not-started',
  'deprioritized',
  'planned'
);

CREATE TYPE skill_type_enum AS ENUM (
  'hard',
  'soft'
);

-- =====================================================
-- TABLE: skills
-- =====================================================

CREATE TABLE skills (
  id          TEXT        PRIMARY KEY,
  name        TEXT        NOT NULL,
  level       NUMERIC(3,2) NOT NULL CHECK (level >= 0 AND level <= 5),
  description TEXT        NOT NULL,
  category    TEXT        NOT NULL,
  type        skill_type_enum NOT NULL,
  requirements JSONB      DEFAULT '[]'::jsonb, -- Array of {id, text} objects
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_type ON skills(type);

-- =====================================================
-- TABLE: milestones
-- =====================================================

CREATE TABLE milestones (
  id                    TEXT         PRIMARY KEY,
  title                 TEXT         NOT NULL,
  display_name          TEXT,
  description           TEXT         NOT NULL,
  status                status_enum  NOT NULL DEFAULT 'not-started',
  progress              NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  deadline              TIMESTAMPTZ,
  notes                 TEXT,
  phase                 TEXT,        -- Can be numeric, 'secmlops', or career level (L1-L7)
  archived              BOOLEAN      DEFAULT FALSE NOT NULL,
  objectives            JSONB        DEFAULT '[]'::jsonb, -- Array of {text, completed, completionJustification}
  related_skills        TEXT[],      -- Foreign key array
  related_resources     TEXT[],      -- Foreign key array
  unlocked_requirements JSONB        DEFAULT '[]'::jsonb, -- Array of {skillId, requirementId, isNewUnlock, rationale}
  created_at            TIMESTAMPTZ  DEFAULT now() NOT NULL,
  updated_at            TIMESTAMPTZ  DEFAULT now() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_milestones_status ON milestones(status);
CREATE INDEX idx_milestones_phase ON milestones(phase);
CREATE INDEX idx_milestones_archived ON milestones(archived);

-- =====================================================
-- TABLE: projects
-- =====================================================

CREATE TABLE projects (
  id                  TEXT        PRIMARY KEY,
  title               TEXT        NOT NULL,
  description         TEXT        NOT NULL,
  status              status_enum NOT NULL DEFAULT 'not-started',
  impact              TEXT        NOT NULL,
  technologies        TEXT[]      DEFAULT ARRAY[]::TEXT[],
  related_skills      TEXT[],     -- Foreign key array
  related_milestones  TEXT[],     -- Foreign key array
  related_resources   TEXT[],     -- Foreign key array
  url                 TEXT,
  created_at          TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at          TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_projects_status ON projects(status);

-- =====================================================
-- TABLE: resources
-- =====================================================

CREATE TABLE resources (
  id                  TEXT        PRIMARY KEY,
  name                TEXT        NOT NULL,
  description         TEXT        NOT NULL,
  status              status_enum NOT NULL DEFAULT 'not-started',
  category            TEXT        NOT NULL, -- subcategory
  parent_category     TEXT,
  sub_category        TEXT,
  image               TEXT,
  is_specialization   BOOLEAN     DEFAULT FALSE NOT NULL,
  related_skills      TEXT[],     -- Foreign key array
  related_milestones  TEXT[],     -- Foreign key array
  created_at          TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at          TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_resources_category ON resources(category);

-- =====================================================
-- TABLE: personal_info
-- =====================================================

CREATE TABLE personal_info (
  id                      UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name                    TEXT        NOT NULL,
  birth_date              DATE        NOT NULL,
  start_date              DATE,
  experience_start_date   DATE,
  bank_start_date         DATE,
  company                 TEXT        NOT NULL,
  department              TEXT        NOT NULL,
  "current_role"          TEXT        NOT NULL,
  "target_role"           TEXT        NOT NULL,
  target_timeline_months  INTEGER     NOT NULL,
  profile_image           TEXT,
  timeline_target         DATE,
  senior_target_date      DATE,
  current_level           TEXT,
  target_level            TEXT,
  created_at              TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at              TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Note: To enforce true singleton, insert with a fixed UUID or use trigger
-- For simplicity, application logic will handle singleton behavior

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- 
-- Strategy:
-- - Public read access (SELECT) allowed for all tables via anon key
-- - Write operations (INSERT/UPDATE/DELETE) blocked for unauthenticated users
-- - Phase 04 adds auth middleware to validate password before granting write access
-- - RLS prevents direct API abuse even if auth middleware is bypassed
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;

-- Public read policy for skills
CREATE POLICY "Public read access for skills"
  ON skills
  FOR SELECT
  USING (true);

-- Public read policy for milestones
CREATE POLICY "Public read access for milestones"
  ON milestones
  FOR SELECT
  USING (true);

-- Public read policy for projects
CREATE POLICY "Public read access for projects"
  ON projects
  FOR SELECT
  USING (true);

-- Public read policy for resources
CREATE POLICY "Public read access for resources"
  ON resources
  FOR SELECT
  USING (true);

-- Public read policy for personal_info
CREATE POLICY "Public read access for personal_info"
  ON personal_info
  FOR SELECT
  USING (true);

-- =====================================================
-- FOREIGN KEY CONSTRAINTS
-- =====================================================
-- 
-- Note: PostgreSQL does not support foreign key constraints on array columns directly.
-- We rely on application-level validation in Phase 04 CRUD operations.
-- Alternative: Use junction tables (many-to-many) for strict referential integrity.
-- For this PDI use case, array columns provide simpler queries and sufficient integrity.
-- =====================================================

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE skills IS 'Technical and soft skills tracked in the PDI';
COMMENT ON TABLE milestones IS 'Career milestones and objectives with progress tracking';
COMMENT ON TABLE projects IS 'Projects demonstrating skill application';
COMMENT ON TABLE resources IS 'Learning resources (books, courses, certifications)';
COMMENT ON TABLE personal_info IS 'Personal career information (singleton table)';

COMMENT ON POLICY "Public read access for skills" ON skills IS 
  'Allows unauthenticated read access. Write operations blocked by RLS (no write policies for anon role). Phase 04 adds auth middleware.';

COMMENT ON POLICY "Public read access for milestones" ON milestones IS 
  'Allows unauthenticated read access. Write operations blocked by RLS (no write policies for anon role). Phase 04 adds auth middleware.';

COMMENT ON POLICY "Public read access for projects" ON projects IS 
  'Allows unauthenticated read access. Write operations blocked by RLS (no write policies for anon role). Phase 04 adds auth middleware.';

COMMENT ON POLICY "Public read access for resources" ON resources IS 
  'Allows unauthenticated read access. Write operations blocked by RLS (no write policies for anon role). Phase 04 adds auth middleware.';

COMMENT ON POLICY "Public read access for personal_info" ON personal_info IS 
  'Allows unauthenticated read access. Write operations blocked by RLS (no write policies for anon role). Phase 04 adds auth middleware.';

-- =====================================================
-- SCHEMA VERIFICATION QUERIES
-- =====================================================
-- 
-- Verify tables created:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('skills', 'milestones', 'projects', 'resources', 'personal_info');
--
-- Verify RLS enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('skills', 'milestones', 'projects', 'resources', 'personal_info');
--
-- Verify indexes created:
-- SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' AND tablename IN ('skills', 'milestones', 'projects', 'resources', 'personal_info');
-- =====================================================
