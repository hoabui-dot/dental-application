const { Client } = require("pg");

const client = new Client({
  host: "100.68.50.41",
  port: 5437,
  database: "dental_cms_strapi",
  user: "postgres",
  password: "postgres",
});

async function checkAboutNavigation() {
  try {
    await client.connect();
    console.log("✓ Connected to PostgreSQL database\n");

    // Check navigation items
    const result = await client.query(`
      SELECT id, label, href 
      FROM menu_nav_items 
      WHERE label ILIKE '%about%'
      ORDER BY id;
    `);

    console.log("📋 About navigation items:");
    console.log(result.rows);

    // Check footer links
    const footerResult = await client.query(`
      SELECT id, label, href 
      FROM footer_links 
      WHERE label ILIKE '%about%' OR href LIKE '%about%'
      ORDER BY id;
    `);

    console.log("\n📋 Footer about links:");
    console.log(footerResult.rows);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.end();
  }
}

checkAboutNavigation();
