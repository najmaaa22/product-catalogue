import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'public/media', 
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
