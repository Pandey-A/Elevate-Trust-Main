import "dotenv/config";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";

const TARGET_USERS = [
  // Admin User (Full Dashboard Access: Create, Edit, Delete, View)
  {
    email: (process.env.SEED_ADMIN_1_EMAIL || "sid@elevatetrust.ai").trim().toLowerCase(),
    fullName: process.env.SEED_ADMIN_1_NAME || "Sid",
    role: "admin",
    passwordPlain: process.env.SEED_ADMIN_1_PASSWORD || "Admin@2026",
  },
  // View Users (View-Only Permissions)
  {
    email: (process.env.SEED_SALES_1_EMAIL || "sachin@elevatetrust.ai").trim().toLowerCase(),
    fullName: process.env.SEED_SALES_1_NAME || "Sachin",
    role: "sales",
    passwordPlain: process.env.SEED_SALES_1_PASSWORD || "sachin@2026",
  },
  {
    email: (process.env.SEED_SALES_2_EMAIL || "diksha@elevatetrust.ai").trim().toLowerCase(),
    fullName: process.env.SEED_SALES_2_NAME || "Diksha",
    role: "sales",
    passwordPlain: process.env.SEED_SALES_2_PASSWORD || "diksha@2026",
  },
  {
    email: (process.env.SEED_SALES_3_EMAIL || "parag@elevatetrust.ai").trim().toLowerCase(),
    fullName: process.env.SEED_SALES_3_NAME || "Parag",
    role: "sales",
    passwordPlain: process.env.SEED_SALES_3_PASSWORD || "parag@2026",
  },
];

async function resetUsers() {
  console.log("==================================================");
  console.log("  Syncing Users & Purging Inconsistent Accounts   ");
  console.log("==================================================");

  // 1. Remove all other inconsistent users
  const allowedEmails = TARGET_USERS.map((u) => u.email.toLowerCase());
  const deleteResult = await pool.query(
    `DELETE FROM admin_users WHERE LOWER(email) != ALL($1::text[]) RETURNING email`,
    [allowedEmails],
  );

  if (deleteResult.rowCount > 0) {
    console.log(`\nRemoved ${deleteResult.rowCount} inconsistent user(s):`);
    for (const r of deleteResult.rows) {
      console.log(`  - Removed: ${r.email}`);
    }
  } else {
    console.log("\nNo inconsistent users needed removal.");
  }

  // 2. Upsert the 4 exact users
  console.log("\nUpserting target accounts:");
  for (const user of TARGET_USERS) {
    const passwordHash = await bcrypt.hash(user.passwordPlain, 10);
    const existing = await pool.query(
      `SELECT id FROM admin_users WHERE LOWER(email) = LOWER($1)`,
      [user.email],
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE admin_users SET full_name = $2, password_hash = $3, role = $4 WHERE id = $1`,
        [existing.rows[0].id, user.fullName, passwordHash, user.role],
      );
      console.log(`  ✓ Updated: ${user.email} (${user.role.toUpperCase()})`);
    } else {
      await pool.query(
        `INSERT INTO admin_users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4)`,
        [user.fullName, user.email, passwordHash, user.role],
      );
      console.log(`  ✓ Created: ${user.email} (${user.role.toUpperCase()})`);
    }
  }

  // 3. Print verified active users
  const { rows: allUsers } = await pool.query(
    `SELECT id, full_name, email, role, created_at FROM admin_users ORDER BY id ASC`,
  );

  console.log("\n================ Current Active Users ================");
  console.table(
    allUsers.map((u) => ({
      ID: u.id,
      Name: u.full_name,
      Email: u.email,
      Role: u.role === "admin" ? "ADMIN (Full Access)" : "VIEW (Viewer Access)",
    })),
  );
  console.log("======================================================\n");

  await pool.end();
}

resetUsers().catch(async (err) => {
  console.error("Error resetting users:", err);
  await pool.end().catch(() => {});
  process.exit(1);
});
