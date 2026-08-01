import pool from "../config/db.js";

function mapTestimonial(row) {
  return {
    id: row.id,
    name: row.name,
    title: row.title || "",
    quote: row.quote || "",
    fullQuote: row.full_quote || "",
    logoUrl: row.logo_url || "",
    profileUrl: row.profile_url || "",
    sortOrder: Number(row.sort_order) || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const TESTIMONIAL_COLUMNS = `
  id, name, title, quote, full_quote, logo_url, profile_url, sort_order, created_at, updated_at
`;

export async function listTestimonials() {
  const result = await pool.query(`
    SELECT ${TESTIMONIAL_COLUMNS}
    FROM testimonials
    ORDER BY sort_order ASC, created_at DESC
  `);
  return result.rows.map(mapTestimonial);
}

export async function getTestimonialById(id) {
  const result = await pool.query(
    `
      SELECT ${TESTIMONIAL_COLUMNS}
      FROM testimonials
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );
  return result.rows[0] ? mapTestimonial(result.rows[0]) : null;
}

export async function createTestimonial(data) {
  const result = await pool.query(
    `
      INSERT INTO testimonials (
        id, name, title, quote, full_quote, logo_url, profile_url, sort_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING ${TESTIMONIAL_COLUMNS}
    `,
    [
      data.id,
      data.name,
      data.title || "",
      data.quote || "",
      data.fullQuote || "",
      data.logoUrl || "",
      data.profileUrl || "",
      Number(data.sortOrder) || 0,
    ],
  );
  return mapTestimonial(result.rows[0]);
}

export async function updateTestimonial(id, data) {
  const result = await pool.query(
    `
      UPDATE testimonials
      SET
        name = $2,
        title = $3,
        quote = $4,
        full_quote = $5,
        logo_url = $6,
        profile_url = $7,
        sort_order = $8,
        updated_at = NOW()
      WHERE id = $1
      RETURNING ${TESTIMONIAL_COLUMNS}
    `,
    [
      id,
      data.name,
      data.title || "",
      data.quote || "",
      data.fullQuote || "",
      data.logoUrl || "",
      data.profileUrl || "",
      Number(data.sortOrder) || 0,
    ],
  );
  return result.rows[0] ? mapTestimonial(result.rows[0]) : null;
}

export async function deleteTestimonial(id) {
  const result = await pool.query(
    `
      DELETE FROM testimonials
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );
  return result.rows[0] || null;
}
