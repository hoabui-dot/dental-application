const axios = require("axios");

const STRAPI_URL =
  "https://pediatric-expired-through-casinos.trycloudflare.com";
const token =
  "7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9";

async function test() {
  console.log("Testing Strapi API...\n");

  // Test 1: Check blogs endpoint
  try {
    const blogsRes = await axios.get(
      `${STRAPI_URL}/api/blogs?pagination[limit]=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log("✅ Blogs endpoint exists");
    console.log("   Found", blogsRes.data.data?.length || 0, "blogs");
  } catch (e) {
    console.log(
      "❌ Blogs endpoint:",
      e.response?.status,
      e.response?.data?.error?.message || e.message,
    );
  }

  // Test 2: Check homepage
  try {
    const homepageRes = await axios.get(`${STRAPI_URL}/api/homepage`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Homepage endpoint exists");
    console.log(
      "   Layout blocks:",
      homepageRes.data.data?.attributes?.layout?.length || 0,
    );
  } catch (e) {
    console.log(
      "❌ Homepage endpoint:",
      e.response?.status,
      e.response?.data?.error?.message || e.message,
    );
  }
}

test();
