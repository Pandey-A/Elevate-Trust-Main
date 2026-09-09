import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../module/authModules.js";
import pool from "../config/db.js";

function optionalEnv(name, fallback = "") {
  const value = String(process.env[name] || "").trim();
  return value || fallback;
}

function isTruthyEnv(name) {
  const value = String(process.env[name] || "")
    .trim()
    .toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

/**
 * 5 dashboard seed slots from env:
 * - SEED_ADMIN_1_* / SEED_ADMIN_2_*  → role admin
 * - SEED_SALES_1_* … SEED_SALES_3_* → role sales
 *
 * Legacy: SEED_ADMIN_EMAIL / NAME / PASSWORD maps to admin slot 1 if SEED_ADMIN_1_* unset.
 */
export function buildSeedUsers() {
  const users = [];

  const adminDefs = [
    {
      emailEnv: "SEED_ADMIN_1_EMAIL",
      nameEnv: "SEED_ADMIN_1_NAME",
      passwordEnv: "SEED_ADMIN_1_PASSWORD",
      defaultName: "Admin 1",
      legacyEmailEnv: "SEED_ADMIN_EMAIL",
      legacyNameEnv: "SEED_ADMIN_NAME",
      legacyPasswordEnv: "SEED_ADMIN_PASSWORD",
    },
    {
      emailEnv: "SEED_ADMIN_2_EMAIL",
      nameEnv: "SEED_ADMIN_2_NAME",
      passwordEnv: "SEED_ADMIN_2_PASSWORD",
      defaultName: "Admin 2",
    },
  ];

  for (const def of adminDefs) {
    const email =
      optionalEnv(def.emailEnv) ||
      (def.legacyEmailEnv ? optionalEnv(def.legacyEmailEnv) : "");
    const passwordPlain =
      optionalEnv(def.passwordEnv) ||
      (def.legacyPasswordEnv ? optionalEnv(def.legacyPasswordEnv) : "");
    if (!email && !passwordPlain) continue;
    if (!email || !passwordPlain) {
      throw new Error(
        `Both ${def.emailEnv} (or legacy SEED_ADMIN_EMAIL) and ${def.passwordEnv} are required when seeding an admin user.`,
      );
    }
    users.push({
      email,
      fullName: optionalEnv(
        def.nameEnv,
        def.legacyNameEnv
          ? optionalEnv(def.legacyNameEnv, def.defaultName)
          : def.defaultName,
      ),
      passwordPlain,
      role: "admin",
    });
  }

  const salesDefs = [
    {
      emailEnv: "SEED_SALES_1_EMAIL",
      nameEnv: "SEED_SALES_1_NAME",
      passwordEnv: "SEED_SALES_1_PASSWORD",
      defaultName: "Sales User 1",
    },
    {
      emailEnv: "SEED_SALES_2_EMAIL",
      nameEnv: "SEED_SALES_2_NAME",
      passwordEnv: "SEED_SALES_2_PASSWORD",
      defaultName: "Sales User 2",
    },
    {
      emailEnv: "SEED_SALES_3_EMAIL",
      nameEnv: "SEED_SALES_3_NAME",
      passwordEnv: "SEED_SALES_3_PASSWORD",
      defaultName: "Sales User 3",
    },
  ];

  for (const def of salesDefs) {
    const email = optionalEnv(def.emailEnv);
    const passwordPlain = optionalEnv(def.passwordEnv);
    if (!email && !passwordPlain) continue;
    if (!email || !passwordPlain) {
      throw new Error(
        `Both ${def.emailEnv} and ${def.passwordEnv} are required when seeding a sales user.`,
      );
    }
    users.push({
      email,
      fullName: optionalEnv(def.nameEnv, def.defaultName),
      passwordPlain,
      role: "sales",
    });
  }

  return users;
}

/** Rename legacy roles once: admin → sales, superAdmin → admin (order matters). */
async function migrateLegacyRoles() {
  const legacy = await pool.query(
    `SELECT 1 FROM admin_users WHERE role = 'superAdmin' LIMIT 1`,
  );
  if (legacy.rowCount === 0) {
    console.log("role migrate: skipped (no legacy superAdmin)");
    return;
  }

  const toSales = await pool.query(
    `UPDATE admin_users SET role = 'sales' WHERE role = 'admin'`,
  );
  const toAdmin = await pool.query(
    `UPDATE admin_users SET role = 'admin' WHERE role = 'superAdmin'`,
  );
  console.log(
    `role migrate: admin→sales (${toSales.rowCount}), superAdmin→admin (${toAdmin.rowCount})`,
  );
}

async function upsertAdminUser({ email, fullName, role, passwordPlain }) {
  const existing = await findUserByEmail(email);
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  if (existing) {
    await pool.query(
      `
        UPDATE admin_users
        SET full_name = $2, password_hash = $3, role = $4
        WHERE id = $1
      `,
      [existing.id, fullName, passwordHash, role],
    );
    return {
      id: existing.id,
      email,
      fullName,
      role,
      action: "updated",
    };
  }

  const created = await createUser({
    fullName,
    email,
    passwordHash,
    role,
  });

  return {
    id: created.id,
    email,
    fullName,
    role,
    action: "created",
  };
}

/**
 * Upsert dashboard users from SEED_* env vars.
 * @returns {Promise<{ skipped?: boolean, reason?: string, results?: object[] }>}
 */
export async function runDashboardUserSeed() {
  const users = buildSeedUsers();
  if (users.length === 0) {
    return {
      skipped: true,
      reason: "no SEED_ADMIN_1/2 or SEED_SALES_1..3 credentials configured",
    };
  }

  await migrateLegacyRoles();

  const results = [];
  for (const user of users) {
    const result = await upsertAdminUser(user);
    results.push(result);
    console.log(
      `${result.action}: ${result.email} (${result.role}) [id=${result.id}]`,
    );
  }

  console.log("\n=== Seeded Dashboard Users ===");
  for (const item of results) {
    console.log(`${item.id}\t${item.email}\t${item.role}\t(${item.action})`);
  }
  console.log(
    "Passwords are loaded from environment variables and are not printed.",
  );

  return { results };
}

/**
 * Deploy-friendly: run seed when SEED_ON_START=true, or when DB has no admin yet
 * and at least one admin seed slot is configured.
 */
export async function maybeSeedDashboardUsersOnStart() {
  const force = isTruthyEnv("SEED_ON_START");
  let adminCount = 0;
  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*)::int AS count FROM admin_users WHERE role = 'admin'`,
    );
    adminCount = rows[0]?.count || 0;
  } catch (error) {
    console.warn(
      "Seed on start skipped (admin_users check failed):",
      error?.message || error,
    );
    return { skipped: true, reason: "admin_users check failed" };
  }

  if (!force && adminCount > 0) {
    return {
      skipped: true,
      reason: "admins already exist (set SEED_ON_START=true to force upsert)",
    };
  }

  try {
    const users = buildSeedUsers();
    if (users.length === 0) {
      if (force || adminCount === 0) {
        console.warn(
          "SEED_ON_START / empty admin DB: no SEED_* credentials set — skipping seed.",
        );
      }
      return { skipped: true, reason: "no seed credentials" };
    }

    console.log(
      force
        ? "SEED_ON_START=true — upserting dashboard users from env…"
        : "No admin users yet — seeding dashboard users from env…",
    );
    return await runDashboardUserSeed();
  } catch (error) {
    console.error("Dashboard user seed failed:", error?.message || error);
    throw error;
  }
}

const isCli =
  process.argv[1] &&
  String(process.argv[1]).replace(/\\/g, "/").endsWith("seedDashboardUsers.js");

if (isCli) {
  runDashboardUserSeed()
    .then(async (result) => {
      if (result.skipped) {
        console.error(`Seed skipped: ${result.reason}`);
        process.exitCode = 1;
      }
      await pool.end();
      process.exit(process.exitCode || 0);
    })
    .catch(async (error) => {
      console.error(error);
      await pool.end().catch(() => {});
      process.exit(1);
    });
}
