import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Узкий импорт, а не бочонок "@/shared": конфиг компилируется в CJS
// отдельным проходом и не умеет резолвить .tsx из shared/ui.
import { apiUrl } from "@/shared/config/variables";
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
