/**
 * Server Configuration
 *
 * Configures Strapi server settings including:
 * - Host and port
 * - Admin panel settings
 * - CORS for Next.js frontend
 */

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  url: env("PUBLIC_URL", "http://localhost:1337"),
  // Allow Cloudflare tunnel and other hosts
  allowedHosts: [
    "localhost",
    "127.0.0.1",
    "knight-cheese-advisor-para.trycloudflare.com",
    env("CLOUDFLARE_TUNNEL_HOST", ""),
  ].filter(Boolean),
  // CORS configuration for Next.js frontend
  cors: {
    enabled: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      env("PUBLIC_URL", "http://localhost:1337"),
      env("CLOUDFLARE_TUNNEL_URL", ""),
      env("FRONTEND_URL", "http://localhost:3000"),
    ].filter(Boolean),
    credentials: true,
  },
});
