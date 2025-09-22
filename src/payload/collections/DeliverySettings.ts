import type { CollectionConfig } from 'payload'

export const DeliverySettings: CollectionConfig = {
  slug: 'delivery-settings',
  labels: {
    singular: 'Delivery Setting',
    plural: 'Delivery Settings',
  },
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: () => true, // Public read access
    create: ({ req }) => req?.user?.role === 'admin',
    update: ({ req }) => req?.user?.role === 'admin',
  },
  fields: [
    {
      name: 'insideDhakaCharge',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 60,
    },
    {
      name: 'outsideDhakaCharge',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 120,
    },
    {
      name: 'freeDeliveryThreshold',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 2000,
    },
  ],
}