/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{
        source: '/users',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/payment',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    domains: [
      'images.unsplash.com', 
      'lh3.googleusercontent.com', 
      'www.everblazing.org',
      'i.pinimg.com'
    ],
  },
  headers: ["Access-Control-Allow-Origin: *"],
  reactStrictMode: false,
}

module.exports = nextConfig