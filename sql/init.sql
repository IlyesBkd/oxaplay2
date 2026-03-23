-- OxaPlay Database Init Script (Neon PostgreSQL)
-- Run this once to create the tables.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Orders ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_intent_id TEXT UNIQUE NOT NULL,
  customer_email  TEXT NOT NULL,
  customer_name   TEXT,
  customer_phone  TEXT,
  customer_address TEXT,
  product_slug    TEXT NOT NULL,
  total_price     INTEGER NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'eur',
  shipping        JSONB,
  status          TEXT NOT NULL DEFAULT 'PENDING',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Prices (singleton row) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prices (
  id                   TEXT PRIMARY KEY DEFAULT 'singleton',
  carplay_voiture_eur  INTEGER NOT NULL DEFAULT 14999,
  carplay_voiture_usd  INTEGER NOT NULL DEFAULT 16999,
  carplay_moto_eur     INTEGER NOT NULL DEFAULT 12999,
  carplay_moto_usd     INTEGER NOT NULL DEFAULT 14999
);

-- Insert singleton row if not exists
INSERT INTO prices (id) VALUES ('singleton') ON CONFLICT DO NOTHING;
