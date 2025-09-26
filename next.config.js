/** @type {import('next').NextConfig} */
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
    unoptimized: false,
  },
  // Disable source maps for production
  productionBrowserSourceMaps: false,
  // Optimize build performance
  swcMinify: true,
};

module.exports = nextConfig;