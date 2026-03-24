const fetch = require("node-fetch");

const STRAPI_URL =
  "https://pediatric-expired-through-casinos.trycloudflare.com";
const STRAPI_TOKEN =
  "7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9";

async function checkBlogs() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Total blogs:", data.data.length);
    console.log("\nBlog categories:");
    data.data.forEach((blog) => {
      console.log(`- ${blog.title}: ${blog.category || "NO CATEGORY"}`);
    });

    // Get unique categories
    const categories = [
      ...new Set(data.data.map((b) => b.category).filter(Boolean)),
    ];
    console.log("\nUnique categories:", categories);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkBlogs();
