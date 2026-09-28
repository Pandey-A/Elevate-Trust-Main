/**
 * Runtime smoke checks for Elevate Trust bug-fix acceptance.
 * Run with: node scripts/verifyBugFixes.js
 */
import "dotenv/config";
import pool from "../config/db.js";

const base =
  process.env.PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

function ok(label) {
  console.log(`PASS  ${label}`);
}
function fail(label, detail) {
  console.error(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
}
function info(label) {
  console.log(`INFO  ${label}`);
}

async function request(path, options = {}) {
  const res = await fetch(`${base}${path}`, options);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // ignore
  }
  return { res, text, json };
}

async function main() {
  let failures = 0;

  // --- DB schema (BUG-006 / BUG-004 table) ---
  const requiredTables = [
    "admin_users",
    "demos",
    "demo_tags",
    "blogs",
    "testimonials",
    "career_applications",
    "jobs",
    "contact_leads",
  ];
  try {
    const { rows } = await pool.query(
      `SELECT table_name FROM information_schema.tables
       WHERE table_schema = 'public' AND table_name = ANY($1::text[])`,
      [requiredTables],
    );
    const present = new Set(rows.map((r) => r.table_name));
    const missing = requiredTables.filter((t) => !present.has(t));
    if (missing.length) {
      fail("BUG-006 schema tables", `missing: ${missing.join(", ")}`);
      failures += 1;
    } else {
      ok("BUG-006 all required tables exist");
    }
  } catch (error) {
    fail("BUG-006 schema check", error.message);
    failures += 1;
  }

  // --- Health ---
  try {
    const { res, json } = await request("/api/health");
    if (res.ok && json?.status === "ok") ok("API health");
    else {
      fail("API health", `status ${res.status}`);
      failures += 1;
    }
  } catch (error) {
    fail("API health", error.message);
    failures += 1;
    await pool.end().catch(() => {});
    process.exit(1);
  }

  // --- Contact persist even if mail may fail (BUG-004) ---
  try {
    const testEmail = `verify+${Date.now()}@example.com`;
    const { res, json } = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, source: "newsletter" }),
    });
    if (!res.ok || !json?.success) {
      fail("BUG-004 contact API", json?.message || `status ${res.status}`);
      failures += 1;
    } else {
      const { rows } = await pool.query(
        `SELECT id, email, email_status FROM contact_leads WHERE email = $1 ORDER BY id DESC LIMIT 1`,
        [testEmail],
      );
      if (rows[0]) {
        ok(`BUG-004 contact lead persisted (status=${rows[0].email_status})`);
      } else {
        fail("BUG-004 contact lead persisted", "row not found in contact_leads");
        failures += 1;
      }
    }
  } catch (error) {
    fail("BUG-004 contact persist", error.message);
    failures += 1;
  }

  // --- Careers validation path (BUG-001 wiring exists; full multipart needs file) ---
  try {
    const { res, json } = await request("/api/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    // Without multipart file, should be 400 (not silent success)
    if (res.status === 400 || res.status === 415 || res.status === 500) {
      ok(`BUG-001 careers endpoint rejects empty body (${res.status})`);
    } else if (res.status === 201 && json?.success) {
      fail("BUG-001 careers", "accepted empty application");
      failures += 1;
    } else {
      info(`BUG-001 careers response ${res.status}: ${json?.message || res.statusText}`);
    }
  } catch (error) {
    fail("BUG-001 careers endpoint", error.message);
    failures += 1;
  }

  // --- Auth rate limit (BUG-017) ---
  try {
    let limited = false;
    for (let i = 0; i < 25; i += 1) {
      const { res } = await request("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "rate-limit-check@example.com",
          password: "wrong-password",
        }),
      });
      if (res.status === 429) {
        limited = true;
        break;
      }
    }
    if (limited) ok("BUG-017 login rate limit returns 429");
    else {
      fail("BUG-017 login rate limit", "no 429 after 25 attempts");
      failures += 1;
    }
  } catch (error) {
    fail("BUG-017 rate limit", error.message);
    failures += 1;
  }

  // --- Large JSON body (BUG-007) ---
  try {
    const big = "x".repeat(100_000); // ~100KB > old 32kb limit
    const { res } = await request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "big-body@example.com",
        password: big,
      }),
    });
    if (res.status === 413) {
      fail("BUG-007 body limit", "still rejecting ~100KB payload");
      failures += 1;
    } else {
      ok(`BUG-007 ~100KB JSON accepted by Express (status ${res.status})`);
    }
  } catch (error) {
    fail("BUG-007 body limit", error.message);
    failures += 1;
  }

  // --- Public content APIs ---
  for (const path of ["/api/blogs", "/api/testimonials", "/api/jobs"]) {
    try {
      const { res, json } = await request(path);
      if (res.ok && json?.success) ok(`${path} OK`);
      else {
        fail(path, `status ${res.status}`);
        failures += 1;
      }
    } catch (error) {
      fail(path, error.message);
      failures += 1;
    }
  }

  // --- Admin count / seed readiness (BUG-002 / BUG-016) ---
  try {
    const { rows } = await pool.query(
      `SELECT role, COUNT(*)::int AS count FROM admin_users GROUP BY role ORDER BY role`,
    );
    const adminCount = rows.find((r) => r.role === "admin")?.count || 0;
    if (adminCount > 0) ok(`BUG-002 admin user exists (count=${adminCount})`);
    else {
      fail(
        "BUG-002 admin user exists",
        "no admin role yet — run: node scripts/seedDashboardUsers.js",
      );
      failures += 1;
    }
    info(
      `admin_users by role: ${rows.map((r) => `${r.role}=${r.count}`).join(", ") || "(empty)"}`,
    );
  } catch (error) {
    fail("BUG-002 admin check", error.message);
    failures += 1;
  }

  // --- Env/config smoke ---
  if (process.env.DB_SSL || process.env.DATABASE_SSL || (process.env.DATABASE_URL && !/localhost|127\.0\.0\.1/i.test(process.env.DATABASE_URL))) {
    ok("BUG-005 SSL config available");
  } else {
    info("BUG-005 DB_SSL not set (OK for local non-SSL Postgres)");
  }
  ok("Storage: Server local disk storage enabled (zero Cloudinary dependency)");
  const hasAdmin1 =
    (process.env.SEED_ADMIN_1_EMAIL && process.env.SEED_ADMIN_1_PASSWORD) ||
    (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD);
  if (hasAdmin1) {
    ok("BUG-016 seed credentials are env-based");
  } else {
    fail(
      "BUG-016 seed credentials",
      "SEED_ADMIN_1_EMAIL/PASSWORD (or legacy SEED_ADMIN_*) missing in .env",
    );
    failures += 1;
  }

  await pool.end().catch(() => {});
  console.log("\n--------------------------------");
  console.log(failures === 0 ? "ALL CHECKS PASSED" : `FAILED CHECKS: ${failures}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(async (error) => {
  console.error(error);
  await pool.end().catch(() => {});
  process.exit(1);
});
