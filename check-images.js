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

async function checkImages() {
  try {
    console.log("🖼️ Checking uploaded images...\n");

    // Get images with IDs 33-38 (from migration script)
    const imageIds = [33, 34, 35, 36, 37, 38];

    for (const id of imageIds) {
      try {
        const response = await axiosInstance.get(
          `${STRAPI_URL}/api/upload/files/${id}`,
        );
        const image = response.data;
        console.log(`Image ID ${id}:`);
        console.log(`  Name: ${image.name}`);
        console.log(`  URL: ${image.url}`);
        console.log(`  Alt: ${image.alternativeText || "N/A"}`);
        console.log("");
      } catch (error) {
        console.log(`Image ID ${id}: Not found or error`);
      }
    }
  } catch (error) {
    console.error("❌ Failed to check images:", error.message);
  }
}

checkImages();
