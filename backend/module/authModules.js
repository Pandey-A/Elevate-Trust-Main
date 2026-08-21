import pool from "../config/db.js";

export async function countUsers() {
  const result = await pool.query("SELECT COUNT(*)::int AS count FROM admin_users");
  return result.rows[0].count;
}

export async function findUserByEmail(email) {
  const result = await pool.query(
    `
      SELECT id, full_name, email, password_hash, role, created_at
      FROM admin_users
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1
    `,
    [email],
  );
  return result.rows[0] || null;
}

export async function createUser({ fullName, email, passwordHash, role }) {
  const result = await pool.query(
    `
      INSERT INTO admin_users (full_name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email, role, created_at
    `,
    [fullName, email, passwordHash, role],
  );
  return result.rows[0];
}

export async function updateUserRoleByEmail(email, role) {
  const result = await pool.query(
    `
      UPDATE admin_users
      SET role = $2
      WHERE LOWER(email) = LOWER($1)
      RETURNING id, full_name, email, role, created_at
    `,
    [email, role],
  );
  return result.rows[0] || null;
}
