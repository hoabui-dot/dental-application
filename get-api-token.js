/**
 * Get Valid API Token from Strapi
 *
 * This script helps you get a valid API token from Strapi admin.
 * Run this after starting Strapi.
 */

console.log("\n🔑 How to Get a Valid API Token from Strapi\n");
console.log("=".repeat(60));
console.log("\n1. Start Strapi (if not running):");
console.log("   cd strapi-cms");
console.log("   npm run develop");
console.log("\n2. Open Strapi Admin:");
console.log("   http://localhost:1337/admin");
console.log("\n3. Login with your credentials");
console.log("\n4. Go to Settings → API Tokens:");
console.log("   http://localhost:1337/admin/settings/api-tokens");
console.log("\n5. Find existing token OR create new one:");
console.log('   - Name: "Frontend API Token"');
console.log('   - Token type: "Read-Only" or "Full Access"');
console.log('   - Token duration: "Unlimited"');
console.log("\n6. Copy the token");
console.log("\n7. Update dental-frontend/.env.local:");
console.log("   STRAPI_API_TOKEN=<paste-your-token-here>");
console.log("\n8. Restart Next.js:");
console.log("   cd dental-frontend");
console.log("   npm run dev");
console.log("\n" + "=".repeat(60));
console.log("\n✅ After updating the token, your frontend should work!\n");
