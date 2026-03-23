/**
 * Publish the homepage
 */

const STRAPI_URL = "http://localhost:1337";
const STRAPI_API_TOKEN =
  "458d01687d26926037df2eb652aa1f70423a61d196e584c495074024acfe66ebfea18695ba6d9ce4c728c2a59be3c2db3987e7c01900072559dea22b1a1ace283f3fce7e613d74ac33d67eea5b73dfc30e9d2b3e2a821d09984ff064d64f6a81b3b8daf69f578cbfac1e863774283be6d597e11f798beebf4d3cd2823de12377";

async function publish() {
  try {
    console.log("📤 Publishing homepage...");

    // First get the current homepage
    const getResponse = await fetch(`${STRAPI_URL}/api/homepage`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });
    const current = await getResponse.json();

    // Then publish it by updating with publishedAt
    const response = await fetch(`${STRAPI_URL}/api/homepage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          publishedAt: new Date().toISOString(),
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "❌ Publish failed:",
        result.error?.message || "Unknown error",
      );
      process.exit(1);
    }

    console.log("✅ Homepage published successfully!");
    console.log(`   Published at: ${result.data?.publishedAt || "now"}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

publish();
