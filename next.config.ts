import type { NextConfig } from "next";

/**
 * The app is entirely client-side — progress lives in the browser and there is
 * no server logic — so it exports to static files and can be hosted anywhere,
 * including GitHub Pages.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set by the Pages workflow to the repository name,
 * because a GitHub project site is served from a subdirectory. It is empty
 * locally and on any host serving from the domain root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  // Static hosts resolve /practice/ to /practice/index.html; without this the
  // extensionless URL 404s on GitHub Pages.
  trailingSlash: true,
  images: {
    // No image optimiser exists in a static export. Nothing here uses
    // next/image today, but this keeps the build honest if something does.
    unoptimized: true,
  },
};

export default nextConfig;
