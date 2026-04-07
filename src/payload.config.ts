import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// ഇമ്പോർട്ടുകൾ പരിശോധിക്കുക - Products default ആണെങ്കിൽ ഇങ്ങനെ തന്നെ മതി
import Products from './collections/Products'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Vercel-ൽ പ്രശ്നം ഒഴിവാക്കാൻ serverURL തൽക്കാലം ഒഴിവാക്കുന്നു
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI as string,
  }),
  admin: {
    user: Users.slug, // 'users' എന്ന് നേരിട്ട് നൽകാതെ slug ഉപയോഗിക്കുന്നതാണ് നല്ലത്
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // ഈ ഓർഡറിൽ തന്നെ കളക്ഷനുകൾ നൽകുക
  collections: [Users, Products, Media],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})