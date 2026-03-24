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

async function fixAboutUsNavigation() {
  try {
    console.log("🔧 Fixing About Us navigation link...\n");

    // Get current navigation
    const navResponse = await axiosInstance.get(`${STRAPI_URL}/api/navigation`);
    const navigation = navResponse.data.data;

    console.log("📄 Current navigation items:");
    navigation.navigation.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.label} -> ${item.href}`);
    });

    // Find and update the About us navigation item
    const updatedNavigation = navigation.navigation.map((item) => {
      if (item.label === "About us" && item.href === "/about-us") {
        console.log(
          `\n✏️  Updating "${item.label}" href from "${item.href}" to "/about"`,
        );
        return { ...item, href: "/about" };
      }
      return item;
    });

    // Update navigation
    const updateData = {
      data: {
        ...navigation,
        navigation: updatedNavigation,
      },
    };

    const updateResponse = await axiosInstance.put(
      `${STRAPI_URL}/api/navigation`,
      updateData,
    );

    console.log("✅ Navigation updated successfully!");
    console.log("\n📄 Updated navigation items:");
    updateResponse.data.data.navigation.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.label} -> ${item.href}`);
    });
  } catch (error) {
    console.error(
      "❌ Failed to fix navigation:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

async function main() {
  try {
    await fixAboutUsNavigation();
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

main();
