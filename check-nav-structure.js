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

async function checkNav() {
  const response = await axiosInstance.get(
    `${STRAPI_URL}/api/navigation?populate[navigation][populate]=*`,
  );
  const nav = response.data.data;

  console.log("Navigation items:");
  if (nav.navigation) {
    nav.navigation.forEach((item, index) => {
      console.log(`\n${index}. ${item.label}`);
      console.log(`   href: ${item.href}`);
      console.log(`   __component: ${item.__component}`);
    });
  } else {
    console.log("No navigation items found");
  }
}

checkNav();
