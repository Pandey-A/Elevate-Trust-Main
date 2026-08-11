import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const isSupabase =
  Boolean(process.env.DATABASE_URL?.includes("supabase.co")) ||
  Boolean(process.env.DB_HOST?.includes("supabase.co"));

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
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
      ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
      max: 10,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
    });

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export default pool;
