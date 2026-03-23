import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Image optimization
  images: {
    remotePatterns: [
      // Parse STRAPI_URL from environment
      ...(process.env.STRAPI_URL
        ? (() => {
            try {
              const url = new URL(process.env.STRAPI_URL);
              return [
                {
                  protocol: url.protocol.replace(":", "") as "http" | "https",
                  hostname: url.hostname,
                  ...(url.port ? { port: url.port } : {}),
                },
              ];
            } catch {
              return [];
            }
          })()
        : []),
      // Fallback for local development
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "strapi",
        port: "1337",
      },
      // S3 and other cloud storage
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
    ],
  },

  // Disable telemetry in production
};

export default nextConfig;
