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

async function checkNavigation() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL\n");

    const headers = { Authorization: `Bearer ${STRAPI_TOKEN}` };

    // Fetch navigation from API
    console.log("🔍 Fetching navigation from API...\n");
    const response = await axios.get(
      `${STRAPI_URL}/api/navigation?populate[navigation][populate][children]=true`,
      { headers },
    );

    const navigation = response.data.data.navigation || [];

    console.log("📋 Current Navigation Structure:\n");
    navigation.forEach((item, i) => {
      console.log(`${i + 1}. ${item.label} → ${item.href}`);
      if (item.children && item.children.length > 0) {
        console.log("   Children:");
        item.children.forEach((child, j) => {
          console.log(`   ${j + 1}. ${child.label} → ${child.href}`);
        });
      }
      console.log("");
    });

    // Find Services menu
    const servicesMenu = navigation.find(
      (item) => item.label === "Services" || item.label === "Dịch vụ",
    );

    if (servicesMenu && servicesMenu.children) {
      console.log("✅ Services menu found with children\n");
      console.log("📊 Service Pages Needed:\n");

      servicesMenu.children.forEach((service, i) => {
        const slug = service.href.replace("/services/", "").replace("/", "");
        console.log(`${i + 1}. ${service.label}`);
        console.log(`   URL: ${service.href}`);
        console.log(`   Slug: ${slug}\n`);
      });

      // Check if pages exist in database
      console.log("🔍 Checking existing pages in database...\n");
      const pagesResult = await client.query(`
        SELECT id, title, slug, published_at
        FROM pages
        WHERE slug LIKE 'services/%' OR slug IN ('dental-implants', 'invisalign', 'porcelain-crowns', 'teeth-whitening')
        ORDER BY slug
      `);

      console.log(
        `Found ${pagesResult.rows.length} service pages in database:\n`,
      );
      pagesResult.rows.forEach((page) => {
        console.log(
          `- ${page.title} (${page.slug}) - ${page.published_at ? "Published" : "Draft"}`,
        );
      });
    } else {
      console.log("⚠️  Services menu not found or has no children");
    }

    await client.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    await client.end();
    process.exit(1);
  }
}

checkNavigation();
