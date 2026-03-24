const { Client } = require("pg");

const client = new Client({
  host: "100.68.50.41",
  port: 5437,
  database: "dental_cms_strapi",
  user: "postgres",
  password: "postgres",
});

async function fixNavigation() {
  try {
    await client.connect();
    console.log("✅ Connected to database\n");

    // Get current navigation data
    const result = await client.query(`
      SELECT * FROM navigations WHERE document_id = 'w4r61hu54tzf95c6klfisjmj'
    `);

    if (result.rows.length === 0) {
      console.log("❌ Navigation not found");
      return;
    }

    console.log("📋 Current navigation found");
    console.log("ID:", result.rows[0].id);

    // Get navigation components
    const componentsResult = await client.query(
      `
      SELECT * FROM navigations_cmps 
      WHERE entity_id = $1 
      ORDER BY "order"
    `,
      [result.rows[0].id],
    );

    console.log(
      `\n📊 Found ${componentsResult.rows.length} navigation components\n`,
    );

    // Find the About Us component
    for (const comp of componentsResult.rows) {
      const linkResult = await client.query(
        `
        SELECT * FROM menu_nav_items 
        WHERE id = $1
      `,
        [comp.cmp_id],
      );

      if (linkResult.rows.length > 0) {
        const link = linkResult.rows[0];
        console.log(`${comp.order}. ${link.label} -> ${link.href}`);

        if (
          link.label.toLowerCase().includes("about") ||
          link.href === "/about-us"
        ) {
          console.log(`\n🔧 Updating About Us link...`);
          console.log(`   Old href: ${link.href}`);

          await client.query(
            `
            UPDATE menu_nav_items 
            SET href = '/about'
            WHERE id = $1
          `,
            [link.id],
          );

          console.log(`   New href: /about`);
          console.log(`\n✅ Updated successfully!`);
        }
      }
    }

    await client.end();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    await client.end();
    process.exit(1);
  }
}

fixNavigation();
