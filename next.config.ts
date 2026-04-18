import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (smallest), fall back to WebP
    formats: ["image/avif", "image/webp"],

    // // Breakpoints Next.js generates responsive images for.
    // // Matches common mobile (390, 640), tablet (768), and desktop widths.
    // deviceSizes: [390, 640, 768, 1024, 1280, 1536],

    // // Used for fixed-size images (width/height props). Keeps the
    // // generated set small so the browser cache stays lean.
    // imageSizes: [64, 128, 192, 256, 384],

    // // Cache optimised images on the server for 1 week (default is 60 s).
    // // Reduces re-processing on subsequent requests.
    // minimumCacheTTL: 604800,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
