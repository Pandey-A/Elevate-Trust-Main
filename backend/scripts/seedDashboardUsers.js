import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../module/authModules.js";
import pool from "../config/db.js";

function requireEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(
      `Missing required env ${name}. Set seed credentials in environment variables (never commit plaintext passwords).`,
    );
  }
  return value;
}

function optionalEnv(name, fallback = "") {
  const value = String(process.env[name] || "").trim();
  return value || fallback;
}

function buildSeedUsers() {
  const users = [
    {
      email: requireEnv("SEED_ADMIN_EMAIL"),
      fullName: optionalEnv("SEED_ADMIN_NAME", "Admin"),
      passwordPlain: requireEnv("SEED_ADMIN_PASSWORD"),
      role: "admin",
    },
  ];

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
    {
      emailEnv: "SEED_SALES_4_EMAIL",
      nameEnv: "SEED_SALES_4_NAME",
      passwordEnv: "SEED_SALES_4_PASSWORD",
      defaultName: "Sales User 4",
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

async function main() {
  const users = buildSeedUsers();
  await migrateLegacyRoles();

  const createdOrUpdated = [];
  for (const user of users) {
    const result = await upsertAdminUser(user);
    createdOrUpdated.push(result);
    console.log(
      `${result.action}: ${result.email} (${result.role}) [id=${result.id}]`,
    );
  }

  console.log("\n=== Seeded Dashboard Users ===");
  for (const item of createdOrUpdated) {
    console.log(`${item.id}\t${item.email}\t${item.role}\t(${item.action})`);
  }
  console.log(
    "Passwords are loaded from environment variables and are not printed.",
  );
}

main()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    await pool.end().catch(() => {});
    process.exit(1);
  });
