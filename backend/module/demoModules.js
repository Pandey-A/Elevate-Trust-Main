import pool from "../config/db.js";

function mapDemo(row) {
  return {
    id: row.id,
    title: row.title,
    videoId: row.video_id || "",
    youtubeUrl: row.youtube_url || "",
    videoUrl: row.video_url || null,
    thumbnailUrl: row.thumbnail_url || null,
    industries: Array.isArray(row.industries) ? row.industries : [],
    isPublic: row.is_public !== false,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const DEMO_COLUMNS = `
  id, title, video_id, youtube_url, video_url, thumbnail_url, industries, is_public, created_at, updated_at
`;

export async function listPublicDemos() {
  const result = await pool.query(`
    SELECT ${DEMO_COLUMNS}
    FROM demos
    WHERE is_public = TRUE
    ORDER BY created_at DESC
  `);
  return result.rows.map(mapDemo);
}

export async function listAllDemos() {
  const result = await pool.query(`
    SELECT ${DEMO_COLUMNS}
    FROM demos
    ORDER BY created_at DESC
  `);
  return result.rows.map(mapDemo);
}

export async function getDemoById(id) {
  const result = await pool.query(
    `
      SELECT ${DEMO_COLUMNS}
      FROM demos
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );
  return result.rows[0] ? mapDemo(result.rows[0]) : null;
}

export async function createDemo(data) {
  const result = await pool.query(
    `
      INSERT INTO demos (
        id, title, video_id, youtube_url, video_url, thumbnail_url, industries, is_public
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)
      RETURNING ${DEMO_COLUMNS}
    `,
    [
      data.id,
      data.title,
      data.videoId || "",
      data.youtubeUrl || "",
      data.videoUrl || null,
      data.thumbnailUrl || null,
      JSON.stringify(data.industries || []),
      data.isPublic !== false,
    ],
  );
  return mapDemo(result.rows[0]);
}

export async function updateDemo(id, data) {
  const result = await pool.query(
    `
      UPDATE demos
      SET
        title = $2,
        video_id = $3,
        youtube_url = $4,
        video_url = $5,
        thumbnail_url = $6,
        industries = $7::jsonb,
        is_public = $8,
        updated_at = NOW()
      WHERE id = $1
      RETURNING ${DEMO_COLUMNS}
    `,
    [
      id,
      data.title,
      data.videoId || "",
      data.youtubeUrl || "",
      data.videoUrl || null,
      data.thumbnailUrl || null,
      JSON.stringify(data.industries || []),
      data.isPublic !== false,
    ],
  );
  return result.rows[0] ? mapDemo(result.rows[0]) : null;
}

export async function updateDemoVisibility(id, isPublic) {
  const result = await pool.query(
    `
      UPDATE demos
      SET is_public = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING ${DEMO_COLUMNS}
    `,
    [id, Boolean(isPublic)],
  );
  return result.rows[0] ? mapDemo(result.rows[0]) : null;
}

export async function deleteDemo(id) {
  const result = await pool.query(
    `
      DELETE FROM demos
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );
  return result.rows[0] || null;
}

export async function countDemos() {
  const result = await pool.query(`SELECT COUNT(*)::int AS count FROM demos`);
  return result.rows[0].count;
}
