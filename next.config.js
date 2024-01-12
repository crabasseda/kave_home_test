/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/productDetail/:productSku',
            destination: '/productDetail/[productSku]',
          },
        ];
      },
}

module.exports = nextConfig
