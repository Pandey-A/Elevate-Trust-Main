import pool from "../config/db.js";

export async function createContactLead({ email, source }) {
  const result = await pool.query(
    `
      INSERT INTO contact_leads (email, source)
      VALUES ($1, $2)
      RETURNING id, email, source, email_status, created_at
    `,
    [email, source],
  );

  return result.rows[0];
}

export async function updateContactLeadEmailStatus(id, emailStatus, emailError = null) {
  const result = await pool.query(
    `
      UPDATE contact_leads
      SET email_status = $2,
          email_error = $3
      WHERE id = $1
      RETURNING id, email, source, email_status, email_error, created_at
    `,
    [id, emailStatus, emailError],
  );

  return result.rows[0] || null;
}
