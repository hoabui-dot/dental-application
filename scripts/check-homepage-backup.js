const { Client } = require("pg");

const client = new Client({
  host: "100.68.50.41",
  port: 5437,
  database: "dental_cms_strapi",
  user: "postgres",
  password: "postgres",
});

async function checkHomepage() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");

    // Get homepage data
    const result = await client.query(`
      SELECT id, document_id, title, created_at, updated_at
      FROM homepages
      ORDER BY created_at DESC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      console.log("❌ No homepage found in database");
      await client.end();
      return;
    }

    const homepage = result.rows[0];
    console.log("\n📄 Homepage Info:");
    console.log(`ID: ${homepage.id}`);
    console.log(`Document ID: ${homepage.document_id}`);
    console.log(`Title: ${homepage.title}`);

    // Get layout components
    const layoutResult = await client.query(
      `
      SELECT hc.*, cc.name as component_name
      FROM homepages_cmps hc
      LEFT JOIN components cc ON hc.component_type = cc.uid
      WHERE hc.entity_id = $1
      ORDER BY hc.order ASC
    `,
      [homepage.id],
    );

    console.log(`\n📊 Layout has ${layoutResult.rows.length} components:`);
    layoutResult.rows.forEach((comp, i) => {
      console.log(`${i + 1}. ${comp.component_type} (order: ${comp.order})`);
    });

    await client.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    await client.end();
    process.exit(1);
  }
}

checkHomepage();
