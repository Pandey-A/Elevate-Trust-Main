import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const { Pool } = pg;

/**
 * Resolve PostgreSQL SSL configuration based on environment variables.
 * Works seamlessly with AWS RDS, Aurora, self-hosted Docker Postgres, and local dev.
 */
function resolveSslConfig() {
  const sslMode = String(
    process.env.DB_SSL || process.env.DATABASE_SSL || "",
  )
    .trim()
    .toLowerCase();

  if (["false", "0", "disable", "off", "no"].includes(sslMode)) {
    return false;
  }

  // Optional custom CA certificate for AWS RDS / enterprise security
  let ca;
  if (process.env.DB_CA_CERT_PATH && fs.existsSync(process.env.DB_CA_CERT_PATH)) {
    try {
      ca = fs.readFileSync(process.env.DB_CA_CERT_PATH, "utf8");
    } catch (err) {
      console.warn("Could not read DB_CA_CERT_PATH:", err.message);
    }
  } else if (process.env.DB_CA_CERT) {
    ca = process.env.DB_CA_CERT;
  }

  const rejectUnauthorized =
    String(process.env.DB_SSL_REJECT_UNAUTHORIZED || "false").toLowerCase() ===
    "true";

  if (["true", "1", "require", "on", "yes"].includes(sslMode)) {
    return ca ? { ca, rejectUnauthorized } : { rejectUnauthorized: false };
  }

  // In production, if connecting to an external cloud database (not localhost / docker internal),
  // default to SSL with self-signed / cloud cert acceptance.
  if (process.env.NODE_ENV === "production") {
    const hostHint = (
      process.env.DATABASE_URL ||
      process.env.DB_HOST ||
      ""
    ).toLowerCase();

    const isLocalhost =
      hostHint.includes("localhost") ||
      hostHint.includes("127.0.0.1") ||
      hostHint.includes("@postgres:") ||
      hostHint.includes("host=postgres");

    if (!isLocalhost && hostHint) {
      return ca ? { ca, rejectUnauthorized } : { rejectUnauthorized: false };
    }
  }

  return false;
}

const ssl = resolveSslConfig();

const poolConfig = {
  max: Number(process.env.DB_MAX_CONNECTIONS || 10),
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS || 10_000),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30_000),
  keepAlive: true,
  keepAliveInitialDelayMillis: 10_000,
  statement_timeout: Number(process.env.DB_STATEMENT_TIMEOUT_MS || 20_000),
};

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: ssl || undefined,
      ...poolConfig,
    })
  : new Pool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME || "elevate_trust",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      ssl: ssl || undefined,
      ...poolConfig,
    });

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error?.message || error);
});

/**
 * Check if the database connection is healthy.
 * Used by /api/health and readiness probes.
 */
export async function testDbConnection() {
  const start = Date.now();
  try {
    const res = await pool.query("SELECT 1 AS alive");
    const latencyMs = Date.now() - start;
    return { ok: res.rows?.[0]?.alive === 1, latencyMs };
  } catch (error) {
    return { ok: false, error: error?.message || String(error) };
  }
}

/**
 * Gracefully end database pool connections on process termination.
 */
export async function closePool() {
  try {
    await pool.end();
  } catch (err) {
    console.error("Error closing PostgreSQL pool:", err?.message || err);
  }
}

export default pool;
