import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import Products from './collections/Products'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL || 'http://localhost:3002',
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI as string,
  }),
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Product Catalogue Admin',
    },
  },
  collections: [Products, Media, Users],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  },
})