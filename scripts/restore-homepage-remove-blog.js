const axios = require("axios");

const STRAPI_URL =
  process.env.STRAPI_URL ||
  "https://pediatric-expired-through-casinos.trycloudflare.com";
const STRAPI_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  "7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9";

async function restoreHomepage() {
  try {
    const headers = { Authorization: `Bearer ${STRAPI_TOKEN}` };

    console.log("🔍 Fetching current homepage...");
    const response = await axios.get(
      `${STRAPI_URL}/api/homepage?populate[layout][populate]=*`,
      { headers },
    );

    const homepage = response.data.data;
    const currentLayout = homepage.layout || [];

    console.log(`📊 Current layout has ${currentLayout.length} sections`);

    // Remove blog collection section
    const newLayout = currentLayout.filter(
      (block) => block.__component !== "homepage.blog-collection-section",
    );

    if (newLayout.length === currentLayout.length) {
      console.log("✅ No blog collection section found in homepage");
      return;
    }

    console.log(`🔄 Removing blog collection section...`);
    console.log(`📊 New layout will have ${newLayout.length} sections`);

    // Update homepage
    await axios.put(
      `${STRAPI_URL}/api/homepage`,
      { data: { layout: newLayout } },
      { headers },
    );

    console.log("✅ Homepage restored successfully");
    console.log("\nRemaining sections:");
    newLayout.forEach((block, i) => {
      console.log(`${i + 1}. ${block.__component}`);
    });
  } catch (error) {
    console.error("❌ Failed to restore homepage:", error.message);
    if (error.response) {
      console.error("Response:", error.response.data);
    }
    process.exit(1);
  }
}

restoreHomepage();
