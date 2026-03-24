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

async function checkBlogData() {
  try {
    // Step 1: Check Database
    console.log("📊 STEP 1: Checking Database\n");
    await client.connect();
    console.log("✅ Connected to PostgreSQL\n");

    const dbResult = await client.query(`
      SELECT id, title, slug, category, published_at
      FROM blogs
      WHERE published_at IS NOT NULL
      ORDER BY published_at DESC
    `);

    console.log(`Found ${dbResult.rows.length} published blogs in database:\n`);
    dbResult.rows.forEach((blog, i) => {
      console.log(`${i + 1}. ${blog.title}`);
      console.log(`   Slug: ${blog.slug}`);
      console.log(`   Category: ${blog.category || "No category"}`);
      console.log(`   Published: ${blog.published_at}\n`);
    });

    await client.end();

    // Step 2: Check API without auth
    console.log("\n📡 STEP 2: Checking API (without auth)\n");
    try {
      const noAuthResponse = await axios.get(
        `${STRAPI_URL}/api/blogs?populate=*&pagination[limit]=3`,
      );
      console.log("✅ API accessible without auth");
      console.log(`Returned ${noAuthResponse.data.data?.length || 0} blogs\n`);
    } catch (error) {
      console.log("❌ API not accessible without auth");
      console.log(`Error: ${error.message}\n`);
    }

    // Step 3: Check API with auth
    console.log("📡 STEP 3: Checking API (with auth)\n");
    try {
      const authResponse = await axios.get(
        `${STRAPI_URL}/api/blogs?populate=*&sort=publishedAt:desc&pagination[limit]=3`,
        { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } },
      );

      console.log("✅ API accessible with auth");
      console.log(`Returned ${authResponse.data.data?.length || 0} blogs\n`);

      if (authResponse.data.data && authResponse.data.data.length > 0) {
        console.log("Sample blog data:");
        const sample = authResponse.data.data[0];
        console.log(
          JSON.stringify(
            {
              id: sample.id,
              documentId: sample.documentId,
              title: sample.title,
              slug: sample.slug,
              category: sample.category,
              excerpt: sample.excerpt?.substring(0, 50) + "...",
              publishedAt: sample.publishedAt,
              coverImage: sample.coverImage ? "Has image" : "No image",
            },
            null,
            2,
          ),
        );
      }
    } catch (error) {
      console.log("❌ API error with auth");
      console.log(`Error: ${error.message}`);
      if (error.response) {
        console.log("Response:", error.response.data);
      }
    }

    // Step 4: Test the exact URL frontend uses
    console.log("\n📡 STEP 4: Testing exact frontend URL\n");
    const frontendUrl = `${STRAPI_URL}/api/blogs?populate=*&sort=publishedAt:desc&pagination[limit]=50`;
    console.log(`URL: ${frontendUrl}\n`);

    try {
      const frontendResponse = await axios.get(frontendUrl);
      console.log("✅ Frontend URL works without auth");
      console.log(`Returned ${frontendResponse.data.data?.length || 0} blogs`);
    } catch (error) {
      console.log("❌ Frontend URL failed");
      console.log(`Error: ${error.message}`);
      console.log(
        "\n⚠️  Frontend needs to use authentication or API needs to be public",
      );
    }
  } catch (error) {
    console.error("❌ Check failed:", error.message);
    await client.end();
    process.exit(1);
  }
}

checkBlogData();
