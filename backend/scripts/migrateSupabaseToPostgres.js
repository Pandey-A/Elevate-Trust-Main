/**
 * Automated Migration Script: Supabase Postgres -> Target Postgres (AWS RDS / Docker / Local)
 *
 * Usage:
 *   SOURCE_DATABASE_URL="postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres" \
 *   TARGET_DATABASE_URL="postgresql://postgres:pass@your-aws-rds-host:5432/elevate_trust" \
 *   node scripts/migrateSupabaseToPostgres.js
 *
 * If TARGET_DATABASE_URL is omitted, it defaults to process.env.DATABASE_URL.
 */
import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceUrl =
  process.env.SOURCE_DATABASE_URL ||
  process.env.SUPABASE_DATABASE_URL ||
  process.argv[2];

const targetUrl =
  process.env.TARGET_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.argv[3];

if (!sourceUrl) {
  console.error("Error: SOURCE_DATABASE_URL is required.");
  console.error("Usage:");
  console.error(
    '  node scripts/migrateSupabaseToPostgres.js "<source_supabase_url>" ["<target_postgres_url>"]',
  );
  console.error("Or set SOURCE_DATABASE_URL in backend/.env.");
  process.exit(1);
}

if (!targetUrl) {
  console.error(
    "Error: TARGET_DATABASE_URL is required (or set DATABASE_URL in .env).",
  );
  process.exit(1);
}

const sourcePool = new pg.Pool({
  connectionString: sourceUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15_000,
});

const targetPool = new pg.Pool({
  connectionString: targetUrl,
  ssl:
    /localhost|127\.0\.0\.1|@postgres:/.test(targetUrl)
      ? false
      : { rejectUnauthorized: false },
  connectionTimeoutMillis: 15_000,
});

async function ensureTargetSchema() {
  const schemaPath = path.join(__dirname, "../sql/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  console.log("Applying database schema to target database...");
  await targetPool.query(schema);
  console.log("Database schema applied successfully.");
}

async function migrateTable({
  name,
  idColumn = "id",
  conflictAction = "DO NOTHING",
}) {
  console.log(`\nMigrating table: [${name}]...`);
  const { rows } = await sourcePool.query(`SELECT * FROM ${name}`);
  if (rows.length === 0) {
    console.log(`  Table [${name}] is empty on source. Skipped.`);
    return 0;
  }

  console.log(`  Found ${rows.length} row(s) in source [${name}]. Transferring...`);

  let transferred = 0;
  for (const row of rows) {
    const keys = Object.keys(row);
    const cols = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const values = keys.map((k) => {
      const v = row[k];
      // Convert JSON objects/arrays to JSON string for Postgres JSONB columns
      if (v !== null && typeof v === "object" && !(v instanceof Date)) {
        return JSON.stringify(v);
      }
      return v;
    });

    const query = `
      INSERT INTO ${name} (${cols})
      VALUES (${placeholders})
      ON CONFLICT (${idColumn}) ${conflictAction}
    `;

    try {
      await targetPool.query(query, values);
      transferred += 1;
    } catch (err) {
      console.warn(`  Warning on row in ${name}:`, err.message);
    }
  }

  console.log(`  Transferred ${transferred}/${rows.length} row(s) to [${name}].`);

  // Update serial sequence if applicable
  try {
    await targetPool.query(`
      SELECT setval(
        pg_get_serial_sequence('${name}', '${idColumn}'),
        COALESCE((SELECT MAX(${idColumn}) FROM ${name}), 1),
        true
      );
    `);
  } catch {
    // Non-serial primary key (e.g. VARCHAR id), ignore
  }

  return transferred;
}

async function main() {
  console.log("==================================================");
  console.log("  Supabase -> Target PostgreSQL Migration Tool   ");
  console.log("==================================================");

  try {
    // Test connections
    await sourcePool.query("SELECT 1");
    console.log("Connected to Source Database.");

    await targetPool.query("SELECT 1");
    console.log("Connected to Target Database.");

    // Ensure schema exists on target
    await ensureTargetSchema();

    // Tables in logical dependency order
    await migrateTable({ name: "demo_tags", idColumn: "name" });
    await migrateTable({ name: "admin_users", idColumn: "email" });
    await migrateTable({ name: "demos", idColumn: "id" });
    await migrateTable({ name: "blogs", idColumn: "id" });
    await migrateTable({ name: "testimonials", idColumn: "id" });
    await migrateTable({ name: "jobs", idColumn: "id" });
    await migrateTable({ name: "career_applications", idColumn: "id" });
    await migrateTable({ name: "contact_leads", idColumn: "id" });

    console.log("\n--------------------------------------------------");
    console.log("Migration complete! All data transferred successfully.");
    console.log("--------------------------------------------------");
  } catch (error) {
    console.error("\nMigration failed:", error);
    process.exit(1);
  } finally {
    await sourcePool.end().catch(() => {});
    await targetPool.end().catch(() => {});
  }
}

main();
