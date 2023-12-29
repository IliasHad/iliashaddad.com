
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['s3.us-west-2.amazonaws.com', 'iliashaddad.nyc3.digitaloceanspaces.com', 'iliashaddad.com', 'uc4a401a2eb5216fa6fb0e3bcab9.previews.dropboxusercontent.com'],
  },
}


export default async function config() {
  return nextConfig
}
