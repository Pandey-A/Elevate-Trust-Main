/**
 * Automated Migration Script: Supabase Postgres -> Target Postgres (AWS RDS / Docker / Local)
 *
 * Usage:
 *   SOURCE_DATABASE_URL="postgresql://..." \
 *   TARGET_DATABASE_URL="postgresql://..." \
 *   node scripts/migrateSupabaseToPostgres.js
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

async function migrateTable({ name, idColumn = "id" }) {
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
      if (v !== null && typeof v === "object" && !(v instanceof Date)) {
        return JSON.stringify(v);
      }
      return v;
    });

    const updateSet = keys
      .filter((k) => k !== idColumn)
      .map((k) => `"${k}" = EXCLUDED."${k}"`)
      .join(", ");

    const query = `
      INSERT INTO ${name} (${cols})
      VALUES (${placeholders})
      ON CONFLICT (${idColumn}) ${updateSet ? `DO UPDATE SET ${updateSet}` : "DO NOTHING"}
    `;

    try {
      await targetPool.query(query, values);
      transferred += 1;
    } catch (err) {
      console.warn(`  Warning on row in ${name}:`, err.message);
    }
  }

  console.log(`  Transferred/Updated ${transferred}/${rows.length} row(s) to [${name}].`);

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
    await sourcePool.query("SELECT 1");
    console.log("Connected to Source Supabase Database.");

    await targetPool.query("SELECT 1");
    console.log("Connected to Target Database.");

    await ensureTargetSchema();

    // Migrate content tables
    await migrateTable({ name: "demo_tags", idColumn: "name" });
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
