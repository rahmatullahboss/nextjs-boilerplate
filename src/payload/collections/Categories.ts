import type { CollectionConfig } from 'payload'
import { admins, adminsOnly, anyone } from '../access/index.js'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone, // Anyone can read categories
    create: admins,
    update: admins,
    delete: admins,
    admin: ({ req: { user } }) => {
      return user?.role === 'admin' ? true : false
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
  ],
}