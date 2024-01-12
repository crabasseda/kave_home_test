/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/ProductDetails/:productSku',
            destination: '/ProductDetails/[productSku]',
          },
        ];
      },
}

module.exports = nextConfig
