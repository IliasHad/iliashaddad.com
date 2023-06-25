/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['s3.us-west-2.amazonaws.com', 'ik.imagekit.io', 'uc4a401a2eb5216fa6fb0e3bcab9.previews.dropboxusercontent.com'],
  },
  staticPageGenerationTimeout: 60 * 10,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false
      }
    }

    return config;
  },
}

module.exports = nextConfig
