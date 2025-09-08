import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  // Using webpack configuration instead of turbopack for Next.js 14 compatibility
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      use: [LOADER],
      exclude: /node_modules/,
    });
    return config;
  }
};

export default nextConfig;
