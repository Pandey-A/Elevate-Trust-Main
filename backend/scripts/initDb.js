import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";
import { DEFAULT_DEMOS } from "../data/defaultDemos.js";
import { countDemos, createDemo } from "../module/demoModules.js";
import { seedDemoTags } from "../module/tagModules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_TAGS = [
  "Healthcare and Life Sciences",
  "Financial Services & FinTech",
  "E-commerce & Retail",
  "Education & E-Learning",
  "Logistics & Supply Chain",
  "Manufacturing & Industry 4.0",
  "Social Media & Entertainment",
  "Public Sector & Government",
];

async function seedDemosIfEmpty() {
  const total = await countDemos();
  if (total > 0) {
    console.log(`demos table already has ${total} row(s)`);
    // Fix known broken YouTube IDs in existing rows
    await pool.query(
      `UPDATE demos
       SET video_id = $1,
           youtube_url = $2,
           updated_at = NOW()
       WHERE id = $3
         AND (video_id = $4 OR youtube_url LIKE $5)`,
      [
        "k_sDkUqKn3k",
        "https://www.youtube.com/watch?v=k_sDkUqKn3k",
        "demo-redaction",
        "-PZ-ryisPms",
        "%-PZ-ryisPms%",
      ]
    );
    return;
  }

  for (const demo of DEFAULT_DEMOS) {
    await createDemo(demo);
  }
  console.log(`Seeded ${DEFAULT_DEMOS.length} default demos`);
}

async function initDb() {
  const schemaPath = path.join(__dirname, "../sql/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  await pool.query(schema);

  // Existing DBs may still have NOT NULL on YouTube columns — relax for Cloudinary-only demos.
  await pool.query(`
    DO $$
    BEGIN
      BEGIN
        ALTER TABLE demos ALTER COLUMN video_id DROP NOT NULL;
      EXCEPTION WHEN others THEN NULL;
      END;
      BEGIN
        ALTER TABLE demos ALTER COLUMN youtube_url DROP NOT NULL;
      EXCEPTION WHEN others THEN NULL;
      END;
    END $$;
  `);

  console.log("Database schema is ready");
  await seedDemoTags(DEFAULT_TAGS);
  console.log("demo_tags are ready");
  await seedDemosIfEmpty();
  await pool.end();
}

initDb().catch((error) => {
  console.error("Failed to initialize database:", error.message);
  process.exit(1);
});
