/** Next.js config for Vercel deployment */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io", "nftstorage.link"]
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

module.exports = nextConfig;