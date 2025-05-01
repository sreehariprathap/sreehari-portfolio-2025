import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true, // Add this to fix the export mode compatibility issue
  },
  // Optimize static assets like images and fonts
  optimizeImages: true,
  // Enable static generation for faster loading
  output: 'export',
  // Improve the compression of responses
  compress: true,
  // Reduce the size of CSS and JS files
  swcMinify: true,
  // Disable unnecessary features to reduce bundle size
  reactStrictMode: true,
  // Optimize Next.js fonts
  optimizeFonts: true,
  // Experimental features for performance
  experimental: {
    // Enable server actions which can improve performance
    serverActions: {
      bodySizeLimit: '2mb', // Set a reasonable size limit
    },
    // Improve app router performance
    optimisticClientCache: true,
  },
  // Improve Webpack bundling for faster builds and smaller bundles
  webpack: (config, { dev }) => {
    // Production optimizations only
    if (!dev) {
      // Enable tree shaking and minimize
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }
    return config;
  },
};

// Analyze bundle size in production builds (run with ANALYZE=true)
export default bundleAnalyzer(nextConfig);
