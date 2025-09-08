/** @type {import('next').NextConfig} */
const path = require('path');

// Disable the component-tagger-loader to fix source map issues
// const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig = {
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
  // Removed invalid outputFileTracingRoot option
  // Using webpack configuration instead of turbopack for Next.js 14 compatibility
  webpack: (config, { isServer }) => {
    // Disabled the component-tagger-loader to fix source map issues
    // config.module.rules.push({
    //   test: /\.(jsx|tsx)$/,
    //   use: [LOADER],
    //   exclude: /node_modules/,
    // });
    return config;
  },
  // Disable source maps to fix the invalid JSON errors
  productionBrowserSourceMaps: false
};

module.exports = nextConfig;