import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../module/authModules.js";
import pool from "../config/db.js";

const USERS = [
  {
    oldEmail: "sachin@elevatetrust.ai",
    email: "sachin2026@ET.example",
    fullName: "Sachin",
    passwordPlain: "sachin2026@ET",
    role: "admin",
  },
  {
    oldEmail: "om@elevatetrust.ai",
    email: "om2026@ET.example",
    fullName: "Om",
    passwordPlain: "om2026@ET",
    role: "admin",
  },
  {
    oldEmail: "shivanshi@elevatetrust.ai",
    email: "shivanshi2026@ET.example",
    fullName: "Shivanshi",
    passwordPlain: "shivanshi2026@ET",
    role: "admin",
  },
  {
    oldEmail: "diksha@elevatetrust.ai",
    email: "diksha2026@ET.example",
    fullName: "Diksha",
    passwordPlain: "diksha2026@ET",
    role: "admin",
  },
];

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
  const createdOrUpdated = [];
  for (const user of USERS) {
    const result = await upsertAdminUser(user);
    createdOrUpdated.push(result);
    console.log(
      `${result.action}: ${result.email} (${result.role}) [id=${result.id}]`,
    );
  }

  console.log("\n=== Admin Login List (NEW) ===");
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
