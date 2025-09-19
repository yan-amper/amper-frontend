import { apiUrl } from "@/shared";
import type { NextConfig } from "next";

if (!apiUrl) {
  console.warn("apiUrl не указан");
}

const nextConfig: NextConfig = {
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
