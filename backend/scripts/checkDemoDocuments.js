import "dotenv/config";
import pool from "../config/db.js";

function kindFromUrl(url = "") {
  const u = String(url || "");
  if (/\.pdf(\?|$)/i.test(u)) return "PDF";
  if (/\.pptx?(\?|$)/i.test(u)) return "PPT";
  if (/\.docx?(\?|$)/i.test(u)) return "DOCX";
  if (/\/raw\/upload\//i.test(u)) return "RAW";
  if (/\/video\//i.test(u) || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(u)) return "VIDEO";
  if (!u) return "NONE";
  return "OTHER";
}

async function main() {
  const cols = await pool.query(`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'demos'
    ORDER BY ordinal_position
  `);
  console.log("=== demos table columns ===");
  for (const c of cols.rows) {
    console.log(`- ${c.column_name} (${c.data_type})`);
  }

  const all = await pool.query(`
    SELECT id, title, video_url, thumbnail_url, industries, is_public, created_at
    FROM demos
    ORDER BY created_at DESC NULLS LAST
  `);

  console.log(`\n=== total demos: ${all.rows.length} ===`);
  const docs = [];
  for (const row of all.rows) {
    const kind = kindFromUrl(row.video_url);
    if (["PDF", "PPT", "DOCX", "RAW"].includes(kind)) docs.push({ ...row, kind });
  }

  console.log(`=== document demos in DB: ${docs.length} ===`);
  if (docs.length === 0) {
    console.log("No PDF/PPT/DOCX rows found yet in demos.video_url.");
  } else {
    for (const d of docs) {
      console.log(
        [
          d.id,
          d.kind,
          d.is_public ? "public" : "private",
          JSON.stringify(d.industries || []),
          (d.title || "").slice(0, 50),
          (d.video_url || "").slice(0, 120),
          (d.thumbnail_url || "").slice(0, 80),
        ].join(" | "),
      );
    }
  }

  // Also show any recent demo that might be a document without extension in URL
  console.log("\n=== latest 8 demos (any type) ===");
  for (const row of all.rows.slice(0, 8)) {
    console.log(
      [
        row.id,
        kindFromUrl(row.video_url),
        row.is_public ? "public" : "private",
        (row.title || "").slice(0, 40),
        (row.video_url || "").slice(0, 100) || "(no video_url)",
      ].join(" | "),
    );
  }
}

main()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    await pool.end().catch(() => {});
    process.exit(1);
  });
