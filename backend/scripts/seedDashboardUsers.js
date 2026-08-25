import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../module/authModules.js";
import pool from "../config/db.js";

const USERS = [
  {
    oldEmail: "sachin2026@ET.example",
    email: "sachin2026@elevatetrust.ai",
    fullName: "Sachin",
    passwordPlain: "sachin2026@ET",
    role: "sales",
  },
  {
    oldEmail: "om2026@ET.example",
    email: "om2026@elevatetrust.ai",
    fullName: "Om",
    passwordPlain: "om2026@ET",
    role: "sales",
  },
  {
    oldEmail: "shivanshi2026@ET.example",
    email: "shivanshi2026@elevatetrust.ai",
    fullName: "Shivanshi",
    passwordPlain: "shivanshi2026@ET",
    role: "sales",
  },
  {
    oldEmail: "diksha2026@ET.example",
    email: "diksha2026@elevatetrust.ai",
    fullName: "Diksha",
    passwordPlain: "diksha2026@ET",
    role: "sales",
  },
];

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

async function upsertAdminUser({
  oldEmail,
  email,
  fullName,
  role,
  passwordPlain,
}) {
  const existingOld = await findUserByEmail(oldEmail);
  const existingNew = existingOld ? null : await findUserByEmail(email);

  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  // If old user exists, update that record (including email change) to avoid duplicates.
  if (existingOld) {
    await pool.query(
      `
        UPDATE admin_users
        SET email = $2, full_name = $3, password_hash = $4, role = $5
        WHERE id = $1
      `,
      [existingOld.id, email, fullName, passwordHash, role],
    );
    return {
      id: existingOld.id,
      email,
      fullName,
      role,
      passwordPlain,
      action: "updated",
    };
  }

  // If new email already exists, just update password/full_name/role there.
  if (existingNew) {
    await pool.query(
      `
        UPDATE admin_users
        SET full_name = $2, password_hash = $3, role = $4
        WHERE id = $1
      `,
      [existingNew.id, fullName, passwordHash, role],
    );
    return {
      id: existingNew.id,
      email,
      fullName,
      role,
      passwordPlain,
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
    passwordPlain,
    action: "created",
  };
}

async function main() {
  await migrateLegacyRoles();

  const createdOrUpdated = [];
  for (const user of USERS) {
    const result = await upsertAdminUser(user);
    createdOrUpdated.push(result);
    console.log(
      `${result.action}: ${result.email} (${result.role}) [id=${result.id}]`,
    );
  }

  console.log("\n=== Sales Login List ===");
  for (const item of createdOrUpdated) {
    console.log(`${item.id}\t${item.email}\t${item.passwordPlain}`);
  }
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
