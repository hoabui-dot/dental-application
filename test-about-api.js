const axios = require("axios");
const https = require("https");

const STRAPI_URL =
  "https://pediatric-expired-through-casinos.trycloudflare.com";
const API_TOKEN =
  "7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

async function testAboutUsAPI() {
  try {
    console.log("🔍 Testing About Us API...\n");

    // Test current page API
    const response = await axiosInstance.get(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=about-us&status=published`,
    );

    console.log("📊 API Response:");
    console.log("Status:", response.status);
    console.log("Data length:", response.data.data.length);

    if (response.data.data.length > 0) {
      const page = response.data.data[0];
      console.log("\n📄 Page Data:");
      console.log("ID:", page.id);
      console.log("Title:", page.title);
      console.log("Slug:", page.slug);
      console.log("Description:", page.description);

      if (page.content) {
        try {
          const content = JSON.parse(page.content);
          console.log("\n📋 Content Sections:");
          Object.keys(content).forEach((key) => {
            console.log(`  - ${key}`);
          });

          // Show hero section as example
          if (content.hero) {
            console.log("\n🎯 Hero Section:");
            console.log("  Title:", content.hero.title);
            console.log("  Subtitle:", content.hero.subtitle);
            console.log("  Images:", content.hero.images?.length || 0);
            if (content.hero.images && content.hero.images.length > 0) {
              console.log(
                "  First image structure:",
                JSON.stringify(content.hero.images[0], null, 2),
              );
            }
          }

          // Show achievements section
          if (content.achievements) {
            console.log("\n🏆 Achievements Section:");
            console.log("  Title:", content.achievements.title);
            console.log(
              "  Features:",
              content.achievements.features?.length || 0,
            );
            console.log("  ImageId:", content.achievements.imageId);
          }
        } catch (e) {
          console.log("❌ Failed to parse content JSON");
        }
      }
    } else {
      console.log("❌ No about-us page found");
    }
  } catch (error) {
    console.error("❌ API Test failed:", error.response?.data || error.message);
  }
}

testAboutUsAPI();
