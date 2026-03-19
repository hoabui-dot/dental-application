/**
 * Admin Panel Configuration
 *
 * Configures the Strapi admin panel settings including preview mode.
 */

export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
  // Preview configuration
  preview: {
    enabled: true,
    config: {
      // Configure preview for Page content type
      page: {
        // Preview URL template
        url: `${env("FRONTEND_URL", "http://localhost:3000")}/api/preview`,
        // Query parameters
        query: {
          slug: "{slug}",
          secret: env(
            "PREVIEW_SECRET",
            "your-secure-preview-secret-change-in-production",
          ),
        },
      },
    },
  },
});
