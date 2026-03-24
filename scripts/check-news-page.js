const { Client } = require("pg");

const client = new Client({
  host: "100.68.50.41",
  port: 5437,
  database: "dental_cms_strapi",
  user: "postgres",
  password: "postgres",
});

async function checkNewsPage() {
  try {
    await client.connect();
    console.log("✅ Connected to database\n");

    // Check if news page exists
    const result = await client.query(`
      SELECT id, document_id, title, slug, published_at, created_at, updated_at
      FROM pages 
      WHERE slug = 'news-listing'
    `);

    if (result.rows.length > 0) {
      console.log("✅ News page found in database:");
      console.log(JSON.stringify(result.rows[0], null, 2));

      // Get the content
      const contentResult = await client.query(`
        SELECT content
        FROM pages 
        WHERE slug = 'news-listing'
      `);

      console.log("\n📄 Content preview:");
      const content = JSON.parse(contentResult.rows[0].content);
      console.log("Hero title:", content.hero.title);
      console.log("Categories count:", content.categories.length);
      console.log("Tags count:", content.sidebar.tags.length);
    } else {
      console.log("❌ News page NOT found in database");

      // Check all pages
      const allPages = await client.query(`
        SELECT id, slug, title 
        FROM pages 
        ORDER BY id
      `);

      console.log("\n📋 All pages in database:");
      allPages.rows.forEach((page) => {
        console.log(`  - ${page.slug} (${page.title})`);
      });
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.end();
  }
}

checkNewsPage();
