import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'isActive'],
  },
  access: {
    read: () => true, // Public can read
    create: ({ req: { user } }) => Boolean(user), // Admin only
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'price', type: 'number', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Clothing', value: 'Clothing' },
        { label: 'Books', value: 'Books' },
        { label: 'Other', value: 'Other' },
      ],
    },
    { name: 'stock', type: 'number' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'isActive', type: 'checkbox', required: true, defaultValue: true },
  ],
}

export default Products