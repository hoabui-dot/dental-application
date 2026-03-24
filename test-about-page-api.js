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

async function testAboutPageAPI() {
  try {
    console.log("Testing about-us page API...\n");

    const response = await axiosInstance.get(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=about-us&populate=*&status=published`,
    );

    console.log("✓ API Response Status:", response.status);
    console.log("✓ Data found:", response.data.data.length);

    if (response.data.data.length > 0) {
      const page = response.data.data[0];
      console.log("\nPage details:");
      console.log("  - ID:", page.id);
      console.log("  - Title:", page.title);
      console.log("  - Slug:", page.slug);
      console.log("  - Published:", page.publishedAt);
      console.log("  - Content type:", typeof page.content);
      console.log("  - Content length:", page.content?.length || 0);

      if (page.content) {
        try {
          const parsed =
            typeof page.content === "string"
              ? JSON.parse(page.content)
              : page.content;
          console.log("\nContent sections:");
          console.log("  - Keys:", Object.keys(parsed));
          console.log("\nHero section:");
          console.log(JSON.stringify(parsed.hero, null, 2));
        } catch (e) {
          console.error("Failed to parse content:", e.message);
        }
      }
    }
  } catch (error) {
    console.error(
      "❌ API Error:",
      error.response?.status,
      error.response?.statusText,
    );
    console.error("Error details:", error.response?.data || error.message);
  }
}

testAboutPageAPI();
