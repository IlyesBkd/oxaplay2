import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load DATABASE_URL from .env.local manually
const envPath = join(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const dbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
const DATABASE_URL = dbUrlMatch ? dbUrlMatch[1].trim() : process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in .env.local");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function initDatabase() {
  console.log("🚀 Initializing OxaPlay database...\n");

  try {
    // Create uuid extension
    console.log("📦 Creating uuid-ossp extension...");
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log("✅ Extension created\n");

    // Create orders table
    console.log("📋 Creating orders table...");
    await sql`
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
      )
    `;
    console.log("✅ Orders table created\n");

    // Create prices table
    console.log("💰 Creating prices table...");
    await sql`
      CREATE TABLE IF NOT EXISTS prices (
        id                   TEXT PRIMARY KEY DEFAULT 'singleton',
        carplay_voiture_eur  INTEGER NOT NULL DEFAULT 14999,
        carplay_voiture_usd  INTEGER NOT NULL DEFAULT 16999,
        carplay_moto_eur     INTEGER NOT NULL DEFAULT 12999,
        carplay_moto_usd     INTEGER NOT NULL DEFAULT 14999
      )
    `;
    console.log("✅ Prices table created\n");

    // Insert singleton prices row
    console.log("🔧 Inserting default prices...");
    await sql`INSERT INTO prices (id) VALUES ('singleton') ON CONFLICT DO NOTHING`;
    console.log("✅ Default prices inserted\n");

    // Verify
    const [pricesRow] = await sql`SELECT * FROM prices WHERE id = 'singleton'`;
    console.log("📊 Current prices:");
    console.log(`   CarPlay Voiture: ${pricesRow.carplay_voiture_eur / 100}€ / $${pricesRow.carplay_voiture_usd / 100}`);
    console.log(`   CarPlay Moto: ${pricesRow.carplay_moto_eur / 100}€ / $${pricesRow.carplay_moto_usd / 100}\n`);

    console.log("🎉 Database initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

initDatabase();
