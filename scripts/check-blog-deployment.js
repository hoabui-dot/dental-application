const axios = require("axios");
const { Client } = require("pg");

const STRAPI_URL =
  process.env.STRAPI_URL ||
  "https://pediatric-expired-through-casinos.trycloudflare.com";

const DB_CONFIG = {
  host: "100.68.50.41",
  port: 5437,
  database: "dental_cms_strapi",
  user: "postgres",
  password: "postgres",
};

async function checkDeployment() {
  console.log("🔍 Checking Blog Collection Deployment Status\n");
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  const results = {
    strapiRunning: false,
    blogApiExists: false,
    blogTablesExist: false,
    blogCollectionComponentExists: false,
    homepageHasBlogSection: false,
    blogPostsCount: 0,
  };

  // 1. Check if Strapi is running
  try {
    await axios.get(`${STRAPI_URL}/api/pages?pagination[limit]=1`);
    results.strapiRunning = true;
    console.log("✅ Strapi is running");
  } catch (error) {
    console.log("❌ Strapi is not accessible");
    console.log(`   Error: ${error.message}\n`);
  }

  // 2. Check if Blog API exists
  if (results.strapiRunning) {
    try {
      const response = await axios.get(`${STRAPI_URL}/api/blogs`);
      results.blogApiExists = true;
      results.blogPostsCount = response.data.data?.length || 0;
      console.log(`✅ Blog API exists (${results.blogPostsCount} posts)`);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("❌ Blog API not found (404)");
        console.log("   → Blog content type not deployed to Strapi");
      } else if (error.response?.status === 403) {
        console.log("⚠️  Blog API exists but forbidden (403)");
        console.log("   → Set public permissions in Strapi Admin");
      } else {
        console.log(`❌ Blog API error: ${error.message}`);
      }
    }
  }

  // 3. Check database tables
  const client = new Client(DB_CONFIG);
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");

    // Check for blog tables
    const blogTablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name LIKE '%blog%'
      ORDER BY table_name;
    `;
    const blogTablesResult = await client.query(blogTablesQuery);

    if (blogTablesResult.rows.length > 0) {
      results.blogTablesExist = true;
      console.log(
        `✅ Blog tables exist (${blogTablesResult.rows.length} tables):`,
      );
      blogTablesResult.rows.forEach((row) => {
        console.log(`   - ${row.table_name}`);
      });

      // Count blog posts
      try {
        const countResult = await client.query("SELECT COUNT(*) FROM blogs");
        results.blogPostsCount = parseInt(countResult.rows[0].count);
        console.log(`   Total blog posts in DB: ${results.blogPostsCount}`);
      } catch (e) {
        console.log("   Could not count blog posts");
      }
    } else {
      console.log("❌ No blog tables found in database");
      console.log("   → Blog schema not deployed");
    }

    // Check for blog collection component table
    const componentQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name = 'components_homepage_blog_collection_sections';
    `;
    const componentResult = await client.query(componentQuery);

    if (componentResult.rows.length > 0) {
      results.blogCollectionComponentExists = true;
      console.log("✅ BlogCollectionSection component table exists");

      // Count sections
      const sectionCountResult = await client.query(
        "SELECT COUNT(*) FROM components_homepage_blog_collection_sections",
      );
      const sectionCount = parseInt(sectionCountResult.rows[0].count);
      console.log(`   Total blog collection sections: ${sectionCount}`);
    } else {
      console.log("❌ BlogCollectionSection component table not found");
      console.log("   → Component schema not deployed");
    }

    // Check if homepage has blog section
    const homepageQuery = `
      SELECT 
        id,
        layout::text
      FROM homepages
      LIMIT 1;
    `;
    const homepageResult = await client.query(homepageQuery);

    if (homepageResult.rows.length > 0) {
      const layout = JSON.parse(homepageResult.rows[0].layout || "[]");
      const hasBlogSection = layout.some(
        (block) => block.__component === "homepage.blog-collection-section",
      );

      if (hasBlogSection) {
        results.homepageHasBlogSection = true;
        console.log("✅ Homepage has blog collection section");
      } else {
        console.log("❌ Homepage does not have blog collection section");
        console.log("   → Run migration script to add it");
      }
    }
  } catch (error) {
    console.log(`❌ Database error: ${error.message}`);
  } finally {
    await client.end();
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 DEPLOYMENT STATUS SUMMARY");
  console.log("=".repeat(60));

  const allGood =
    results.strapiRunning &&
    results.blogApiExists &&
    results.blogTablesExist &&
    results.blogCollectionComponentExists &&
    results.homepageHasBlogSection &&
    results.blogPostsCount > 0;

  if (allGood) {
    console.log("✅ Blog collection system is FULLY DEPLOYED");
    console.log(`   ${results.blogPostsCount} blog posts available`);
  } else {
    console.log("⚠️  Blog collection system is NOT FULLY DEPLOYED\n");
    console.log("Next steps:");

    if (!results.strapiRunning) {
      console.log("1. Start Strapi server");
    }

    if (!results.blogTablesExist || !results.blogCollectionComponentExists) {
      console.log("2. Deploy schema files to production Strapi:");
      console.log("   - strapi-cms/src/api/blog/");
      console.log(
        "   - strapi-cms/src/components/homepage/blog-collection-section.json",
      );
      console.log(
        "   - strapi-cms/src/api/homepage/content-types/homepage/schema.json",
      );
      console.log("3. Restart Strapi server");
    }

    if (results.strapiRunning && !results.blogApiExists) {
      console.log("4. Set public permissions for Blog in Strapi Admin");
    }

    if (results.blogTablesExist && results.blogPostsCount === 0) {
      console.log("5. Run migration script:");
      console.log(
        "   STRAPI_URL=" +
          STRAPI_URL +
          " node migration_scripts/011-add-blog-collection-section.js",
      );
    }

    if (!results.homepageHasBlogSection && results.blogPostsCount > 0) {
      console.log("6. Run setup script to add section to homepage:");
      console.log(
        "   STRAPI_URL=" +
          STRAPI_URL +
          " node scripts/setup-blog-collection.js",
      );
    }
  }

  console.log("=".repeat(60) + "\n");

  console.log("📖 For detailed instructions, see: BLOG_DEPLOYMENT_GUIDE.md\n");
}

checkDeployment().catch(console.error);
