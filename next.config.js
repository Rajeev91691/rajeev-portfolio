/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'images.cnippet.dev'],
    unoptimized: true,
  },
};

module.exports = nextConfig;