const { Client } = require("pg");
const axios = require("axios");

const STRAPI_URL =
  "https://pediatric-expired-through-casinos.trycloudflare.com";
const STRAPI_TOKEN =
  "7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9";

const client = new Client({
  host: "100.68.50.41",
  port: 5437,
  database: "dental_cms_strapi",
  user: "postgres",
  password: "postgres",
});

async function restoreHomepage() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");

    const headers = { Authorization: `Bearer ${STRAPI_TOKEN}` };

    // Get homepage ID from database
    const homepageResult = await client.query(`
      SELECT id, document_id FROM homepages ORDER BY created_at DESC LIMIT 1
    `);

    if (homepageResult.rows.length === 0) {
      console.log("❌ No homepage found");
      await client.end();
      return;
    }

    const homepageId = homepageResult.rows[0].id;
    console.log(`📄 Homepage ID: ${homepageId}`);

    // Get all components from database (excluding blog-collection-section)
    const componentsResult = await client.query(
      `
      SELECT 
        hc.id,
        hc.component_type,
        hc.order,
        hc.component_id
      FROM homepages_cmps hc
      WHERE hc.entity_id = $1
        AND hc.component_type != 'homepage.blog-collection-section'
      ORDER BY hc.order ASC
    `,
      [homepageId],
    );

    console.log(
      `\n📊 Found ${componentsResult.rows.length} components in database`,
    );

    if (componentsResult.rows.length === 0) {
      console.log(
        "⚠️  No components found to restore. Running migration to populate homepage...",
      );
      await client.end();

      // Run the homepage population migration
      const { execSync } = require("child_process");
      execSync("node migration_scripts/009-restore-homepage-layout.js", {
        stdio: "inherit",
      });
      return;
    }

    // Fetch each component's data from Strapi API
    const layout = [];

    for (const comp of componentsResult.rows) {
      const componentType = comp.component_type.split(".")[1];
      console.log(`Fetching ${comp.component_type}...`);

      try {
        // Fetch component data based on type
        let componentData = null;

        // Query the specific component table
        const tableName = `components_homepage_${componentType.replace(/-/g, "_")}s`;
        const compDataResult = await client.query(
          `
          SELECT * FROM ${tableName} WHERE id = $1
        `,
          [comp.component_id],
        );

        if (compDataResult.rows.length > 0) {
          componentData = {
            __component: comp.component_type,
            id: comp.component_id,
            ...compDataResult.rows[0],
          };
          layout.push(componentData);
        }
      } catch (error) {
        console.warn(
          `⚠️  Could not fetch ${comp.component_type}:`,
          error.message,
        );
      }
    }

    console.log(`\n✅ Prepared ${layout.length} components for restoration`);

    // Update homepage via API
    console.log("\n🔄 Updating homepage via Strapi API...");
    await axios.put(
      `${STRAPI_URL}/api/homepage`,
      { data: { layout } },
      { headers },
    );

    console.log("✅ Homepage restored successfully!");
    console.log("\nRestored sections:");
    layout.forEach((block, i) => {
      console.log(`${i + 1}. ${block.__component}`);
    });

    await client.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error(
        "API Response:",
        JSON.stringify(error.response.data, null, 2),
      );
    }
    await client.end();
    process.exit(1);
  }
}

restoreHomepage();
