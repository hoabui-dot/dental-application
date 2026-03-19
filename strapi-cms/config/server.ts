/**
 * Server Configuration
 * 
 * Configures Strapi server settings including:
 * - Host and port
 * - Admin panel settings
 * - CORS for Next.js frontend
 */

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // CORS configuration for Next.js frontend
  cors: {
    enabled: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      env('PUBLIC_URL', 'http://localhost:1337'),
    ],
    credentials: true,
  },
});
