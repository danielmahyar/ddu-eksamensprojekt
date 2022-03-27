/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/users',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/payment',
        destination: '/payment/cart',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
