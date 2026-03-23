const axios = require("axios");

const url =
  "https://knight-cheese-advisor-para.trycloudflare.com/api/blogs?pagination[limit]=1";
const token =
  "7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9";

axios
  .get(url, { headers: { Authorization: `Bearer ${token}` } })
  .then((r) => {
    console.log("✅ API Connection Success");
    console.log("Found", r.data.data?.length || 0, "blogs");
  })
  .catch((e) => {
    console.log("❌ API Error:", e.response?.status, e.response?.statusText);
    console.log("Message:", e.response?.data || e.message);
  });
