import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

function resolveSslConfig() {
  const sslMode = String(
    process.env.DB_SSL || process.env.DATABASE_SSL || "",
  )
    .trim()
    .toLowerCase();

  if (["false", "0", "disable", "off", "no"].includes(sslMode)) {
    return undefined;
  }

  if (["true", "1", "require", "on", "yes"].includes(sslMode)) {
    return { rejectUnauthorized: false };
  }

  const hostHint =
    process.env.DATABASE_URL || process.env.DB_HOST || "";
  if (/supabase\.co/i.test(hostHint)) {
    return { rejectUnauthorized: false };
  }

  return undefined;
}

const ssl = resolveSslConfig();

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl,
      max: 10,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
    })
  : new Pool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME || "elevate_trust",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      ssl,
      max: 10,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
    });

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export default pool;
