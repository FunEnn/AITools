-- One-click database schema for this project
-- Target: PostgreSQL (Neon compatible)
-- This schema matches the tables actually referenced by node-functions controllers.

BEGIN;

-- Core table: creations
CREATE TABLE IF NOT EXISTS creations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}'::text[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_creations_user_id_created_at
  ON creations (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_creations_publish_created_at
  ON creations (publish, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_creations_type_created_at
  ON creations (type, created_at DESC);

-- Auto-update updated_at on row updates
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_updated_at ON creations;
CREATE TRIGGER trg_set_updated_at
BEFORE UPDATE ON creations
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

COMMIT;
