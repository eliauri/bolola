/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "127.0.0.1",
      "https://boliki.ru",
      "boliki.ru"
    ]
 }
  }


module.exports = nextConfig
