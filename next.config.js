/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    runtime: 'edge'
  },
  images: {
    domains: ['links.papareact.com']
  }
}
