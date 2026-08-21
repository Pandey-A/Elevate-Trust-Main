import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  updateUserRoleByEmail,
} from "../module/authModules.js";
import pool from "../config/db.js";

const PASSWORD = "Admin03@ET";

const USERS = [
  { email: "sachin@elevatetrust.ai", fullName: "Sachin", role: "admin" },
  { email: "om@elevatetrust.ai", fullName: "Om", role: "admin" },
  { email: "shivanshi@elevatetrust.ai", fullName: "Shivanshi", role: "admin" },
  { email: "diksha@elevatetrust.ai", fullName: "Diksha", role: "admin" },
];

async function upsertAdminUser({ email, fullName, role, passwordHash }) {
  const existing = await findUserByEmail(email);
  if (existing) {
    const updated = await updateUserRoleByEmail(email, role);
    await pool.query(
      `
        UPDATE admin_users
        SET full_name = $2, password_hash = $3
        WHERE id = $1
      `,
      [existing.id, fullName, passwordHash],
    );
    return { email, role: updated?.role || role, action: "updated" };
  }

  await createUser({ fullName, email, passwordHash, role });
  return { email, role, action: "created" };
}

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  const superAdmin = await updateUserRoleByEmail(
    "gaurav.sharma@elevatetrust.ai",
    "superAdmin",
  );
  if (!superAdmin) {
    throw new Error("gaurav.sharma@elevatetrust.ai not found — promote skipped.");
  }
  console.log(`superAdmin: ${superAdmin.email} -> ${superAdmin.role}`);

  for (const user of USERS) {
    const result = await upsertAdminUser({ ...user, passwordHash });
    console.log(`${result.action}: ${result.email} (${result.role})`);
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
