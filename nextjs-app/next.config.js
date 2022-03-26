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
}

module.exports = nextConfig
