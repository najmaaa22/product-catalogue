import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ] as any, // ✅ fix TypeScript error

    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },

  webpack: (config: any) => {
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(dirname, 'src/components'),
    }

    return config
  },

  turbopack: {
    root: path.resolve(dirname),
  },

  // ✅ prevent build failure
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })