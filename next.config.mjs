import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Helps Turbopack resolve `next` when the repo path has spaces (common on Windows).
  turbopack: {
    root: projectRoot,
  },
  // Keep DB drivers out of the webpack bundle (fixes ws/bufferutil crashes on Windows dev).
  serverExternalPackages: [
    "@prisma/client",
    "prisma",
    "@prisma/adapter-neon",
    "@neondatabase/serverless",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
