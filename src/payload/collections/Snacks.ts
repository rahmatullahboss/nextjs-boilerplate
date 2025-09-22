import type { CollectionConfig } from 'payload'

export const Snacks: CollectionConfig = {
  slug: 'snacks',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Public read access
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
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Chips', value: 'chips' },
        { label: 'Candy', value: 'candy' },
        { label: 'Cookies', value: 'cookies' },
        { label: 'Nuts', value: 'nuts' },
        { label: 'Crackers', value: 'crackers' },
        { label: 'Drinks', value: 'drinks' },
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}