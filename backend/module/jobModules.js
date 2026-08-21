import pool from "../config/db.js";

function mapJob(row) {
  return {
    id: row.id,
    title: row.title || "",
    tag: row.tag || "",
    description: row.description || "",
    type: row.type || "Full-time",
    location: row.location || "Remotely",
    category: row.category || "",
    categorySubtitle: row.category_subtitle || "",
    sortOrder: Number(row.sort_order) || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const JOB_COLUMNS = `
  id, title, tag, description, type, location, category, category_subtitle,
  sort_order, created_at, updated_at
`;

export async function listJobs() {
  const result = await pool.query(`
    SELECT ${JOB_COLUMNS}
    FROM jobs
    ORDER BY sort_order ASC, created_at DESC
  `);
  return result.rows.map(mapJob);
}

export async function getJobById(id) {
  const result = await pool.query(
    `
      SELECT ${JOB_COLUMNS}
      FROM jobs
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );
  return result.rows[0] ? mapJob(result.rows[0]) : null;
}

export async function createJob(data) {
  const result = await pool.query(
    `
      INSERT INTO jobs (
        id, title, tag, description, type, location, category, category_subtitle, sort_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING ${JOB_COLUMNS}
    `,
    [
      data.id,
      data.title || "",
      data.tag || "",
      data.description || "",
      data.type || "Full-time",
      data.location || "Remotely",
      data.category || "",
      data.categorySubtitle || "",
      Number(data.sortOrder) || 0,
    ],
  );
  return mapJob(result.rows[0]);
}

export async function updateJob(id, data) {
  const result = await pool.query(
    `
      UPDATE jobs
      SET
        title = $2,
        tag = $3,
        description = $4,
        type = $5,
        location = $6,
        category = $7,
        category_subtitle = $8,
        sort_order = $9,
        updated_at = NOW()
      WHERE id = $1
      RETURNING ${JOB_COLUMNS}
    `,
    [
      id,
      data.title || "",
      data.tag || "",
      data.description || "",
      data.type || "Full-time",
      data.location || "Remotely",
      data.category || "",
      data.categorySubtitle || "",
      Number(data.sortOrder) || 0,
    ],
  );
  return result.rows[0] ? mapJob(result.rows[0]) : null;
}

export async function deleteJob(id) {
  const result = await pool.query(
    `
      DELETE FROM jobs
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );
  return result.rows[0] || null;
}

export async function countJobs() {
  const result = await pool.query(`SELECT COUNT(*)::int AS count FROM jobs`);
  return result.rows[0]?.count ?? 0;
}
