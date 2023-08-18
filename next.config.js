/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react', '@prisma/client']
  }
};

module.exports = nextConfig;
