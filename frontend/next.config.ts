import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  experimental: {
    reactCompiler: true,
  },
  // Cloudflare関連の設定
  output: "standalone", // Cloudflare Pagesでのデプロイに最適化
};

export default nextConfig;
