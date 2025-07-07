import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  config: {
    turbopack: false, // disables Turbopack, uses Webpack
  },
};

export default nextConfig;
