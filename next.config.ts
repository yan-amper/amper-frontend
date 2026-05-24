import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { apiUrl } from "@/shared";
import type { NextConfig } from "next";

const projectRoot = fs.realpathSync(
  path.dirname(fileURLToPath(import.meta.url)),
);

if (!apiUrl) {
  console.warn("apiUrl не указан");
}

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  productionBrowserSourceMaps: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: apiUrl
      ? [
          {
            protocol: "https",
            hostname: apiUrl.replace("https://", ""),
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
