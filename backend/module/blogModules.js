import pool from "../config/db.js";

function mapBlog(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    imageUrl: row.image_url || "",
    isPublic: row.is_public !== false,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const BLOG_COLUMNS = `
  id, title, description, image_url, is_public, created_at, updated_at
`;

export async function listPublicBlogs() {
  const result = await pool.query(`
    SELECT ${BLOG_COLUMNS}
    FROM blogs
    WHERE is_public = TRUE
    ORDER BY created_at DESC
  `);
  return result.rows.map(mapBlog);
}

export async function listAllBlogs() {
  const result = await pool.query(`
    SELECT ${BLOG_COLUMNS}
    FROM blogs
    ORDER BY created_at DESC
  `);
  return result.rows.map(mapBlog);
}

export async function getBlogById(id) {
  const result = await pool.query(
    `
      SELECT ${BLOG_COLUMNS}
      FROM blogs
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );
  return result.rows[0] ? mapBlog(result.rows[0]) : null;
}

export async function createBlog(data) {
  const result = await pool.query(
    `
      INSERT INTO blogs (id, title, description, image_url, is_public)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING ${BLOG_COLUMNS}
    `,
    [
      data.id,
      data.title,
      data.description || "",
      data.imageUrl || "",
      data.isPublic !== false,
    ],
  );
  return mapBlog(result.rows[0]);
}

export async function updateBlog(id, data) {
  const result = await pool.query(
    `
      UPDATE blogs
      SET
        title = $2,
        description = $3,
        image_url = $4,
        is_public = $5,
        updated_at = NOW()
      WHERE id = $1
      RETURNING ${BLOG_COLUMNS}
    `,
    [
      id,
      data.title,
      data.description || "",
      data.imageUrl || "",
      data.isPublic !== false,
    ],
  );
  return result.rows[0] ? mapBlog(result.rows[0]) : null;
}

export async function updateBlogVisibility(id, isPublic) {
  const result = await pool.query(
    `
      UPDATE blogs
      SET is_public = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING ${BLOG_COLUMNS}
    `,
    [id, Boolean(isPublic)],
  );
  return result.rows[0] ? mapBlog(result.rows[0]) : null;
}

export async function deleteBlog(id) {
  const result = await pool.query(
    `
      DELETE FROM blogs
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );
  return result.rows[0] || null;
}

export async function countBlogs() {
  const result = await pool.query(`SELECT COUNT(*)::int AS count FROM blogs`);
  return result.rows[0].count;
}
