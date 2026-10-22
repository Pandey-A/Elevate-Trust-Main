import pool from "../config/db.js";

export async function listDemoTags() {
  const result = await pool.query(`
    SELECT id, name, created_at
    FROM demo_tags
    ORDER BY name ASC
  `);
  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
  }));
}

export async function findDemoTagByName(name) {
  const result = await pool.query(
    `
      SELECT id, name, created_at
      FROM demo_tags
      WHERE LOWER(name) = LOWER($1)
      LIMIT 1
    `,
    [name.trim()],
  );
  return result.rows[0]
    ? {
        id: result.rows[0].id,
        name: result.rows[0].name,
        createdAt: result.rows[0].created_at,
      }
    : null;
}

export async function createDemoTag(name) {
  const result = await pool.query(
    `
      INSERT INTO demo_tags (name)
      VALUES ($1)
      RETURNING id, name, created_at
    `,
    [name.trim()],
  );
  return {
    id: result.rows[0].id,
    name: result.rows[0].name,
    createdAt: result.rows[0].created_at,
  };
}

// export async function updateDemoTag(id, name) {
//   const result = await pool.query(
//     `
//       UPDATE demo_tags
//       SET name = $2
//       WHERE id = $1
//       RETURNING id, name, created_at
//     `,
//     [id, name.trim()],
//   );
//   if (!result.rows[0]) return null;
//   return {
//     id: result.rows[0].id,
//     name: result.rows[0].name,
//     createdAt: result.rows[0].created_at,
//   };
// }


export async function updateDemoTag(id, name) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const currentResult = await client.query(
      `
        SELECT id, name, created_at
        FROM demo_tags
        WHERE id = $1
        FOR UPDATE
      `,
      [id],
    );

    if (!currentResult.rows[0]) {
      await client.query("ROLLBACK");
      return null;
    }

    const oldName = currentResult.rows[0].name;
    const newName = name.trim();

    const result = await client.query(
      `
        UPDATE demo_tags
        SET name = $2
        WHERE id = $1
        RETURNING id, name, created_at
      `,
      [id, newName],
    );

    await client.query(
      `
        UPDATE demos
        SET industries = (
          SELECT COALESCE(
            jsonb_agg(
              CASE
                WHEN item.value = to_jsonb($1::text)
                THEN to_jsonb($2::text)
                ELSE item.value
              END
              ORDER BY item.ordinality
            ),
            '[]'::jsonb
          )
          FROM jsonb_array_elements(demos.industries)
            WITH ORDINALITY AS item(value, ordinality)
        ),
        updated_at = NOW()
        WHERE industries @> jsonb_build_array($1::text)
      `,
      [oldName, newName],
    );

    await client.query("COMMIT");

    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      createdAt: result.rows[0].created_at,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}



export async function deleteDemoTag(id) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
        DELETE FROM demo_tags
        WHERE id = $1
        RETURNING id, name, created_at
      `,
      [id],
    );

    if (!result.rows[0]) {
      await client.query("ROLLBACK");
      return null;
    }

    const deletedTag = result.rows[0];

    await client.query(
      `
        UPDATE demos
        SET industries = industries - $1::text,
            updated_at = NOW()
        WHERE industries ? $1
      `,
      [deletedTag.name],
    );

    await client.query("COMMIT");

    return {
      id: deletedTag.id,
      name: deletedTag.name,
      createdAt: deletedTag.created_at,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}


export async function findDemoTagById(id) {
  const result = await pool.query(
    `
      SELECT id, name, created_at
      FROM demo_tags
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );
  return result.rows[0]
    ? {
        id: result.rows[0].id,
        name: result.rows[0].name,
        createdAt: result.rows[0].created_at,
      }
    : null;
}

export async function countDemoTags() {
  const result = await pool.query(`SELECT COUNT(*)::int AS count FROM demo_tags`);
  return result.rows[0].count;
}

export async function seedDemoTags(names) {
  for (const name of names) {
    await pool.query(
      `
        INSERT INTO demo_tags (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
      `,
      [name],
    );
  }
}
