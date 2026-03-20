/**
 * Plugins Configuration
 *
 * Configures Strapi plugins including the preview-button plugin.
 */

export default ({ env }) => ({
  // Preview Button Plugin Configuration
  "preview-button": {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: "api::page.page",
          draft: {
            url: `${env("FRONTEND_URL", "http://localhost:3000")}/api/preview`,
            query: {
              slug: "{slug}",
              secret: env(
                "PREVIEW_SECRET",
                "your-secure-preview-secret-change-in-production",
              ),
            },
          },
          published: {
            url: `${env("FRONTEND_URL", "http://localhost:3000")}/{slug}`,
          },
        },
      ],
    },
  },
});
