import pool from "../config/db.js";

const SELECT = `
  SELECT id, video_id, youtube_url
  FROM demos
  WHERE id = 'demo-redaction' OR video_id LIKE '%PZ-ryis%'
`;

const UPDATE = `
  UPDATE demos
  SET video_id = 'k_sDkUqKn3k',
      youtube_url = 'https://www.youtube.com/watch?v=k_sDkUqKn3k',
      updated_at = NOW()
  WHERE id = 'demo-redaction'
     OR video_id = '-PZ-ryisPms'
     OR youtube_url LIKE '%-PZ-ryisPms%'
  RETURNING id, video_id, youtube_url
`;

const before = await pool.query(SELECT);
console.log("before:", before.rows);

const updated = await pool.query(UPDATE);
console.log("updated:", updated.rows);

await pool.end();
