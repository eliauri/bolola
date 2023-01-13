/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "http://127.0.0.1",
      "127.0.0.1",
      process.env.BASE_URL,
    ]
 }
  }


module.exports = nextConfig
