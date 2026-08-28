import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  agentRules: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;