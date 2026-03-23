/**
 * Plugins Configuration
 *
 * Configures Strapi plugins including the preview-button plugin.
 */

export default ({ env }) => ({
  // Upload Plugin Security Configuration
  upload: {
    config: {
      security: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedFileTypes: [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ],
      },
    },
  },

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
