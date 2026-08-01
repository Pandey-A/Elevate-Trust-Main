import pool from "../config/db.js";

export async function createCareerApplication(data) {
  const query = `
    INSERT INTO career_applications (
      full_name,
      email,
      phone,
      job_title,
      education,
      expertise,
      message,
      cv_filename,
      cv_path,
      cv_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING
      id,
      full_name,
      email,
      phone,
      job_title,
      education,
      expertise,
      message,
      cv_filename,
      cv_path,
      cv_url,
      created_at
  `;

  const values = [
    data.fullName,
    data.email,
    data.phone,
    data.jobTitle || null,
    data.education || null,
    data.expertise || null,
    data.message || null,
    data.cvFilename || null,
    data.cvPath || null,
    data.cvUrl || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function listCareerApplications() {
  const result = await pool.query(`
    SELECT
      id,
      full_name,
      email,
      phone,
      job_title,
      education,
      expertise,
      message,
      cv_filename,
      cv_url,
      created_at
    FROM career_applications
    ORDER BY created_at DESC
  `);

  return result.rows;
}

export async function deleteCareerApplication(id) {
  const result = await pool.query(
    `
      DELETE FROM career_applications
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );
  return result.rows[0] || null;
}

export async function deleteAllCareerApplications() {
  const result = await pool.query(`
    DELETE FROM career_applications
    RETURNING id
  `);
  return result.rowCount || 0;
}
