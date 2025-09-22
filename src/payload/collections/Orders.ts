import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: ({ req }) => {
      // Admins can read all orders, users can only read their own
      const user = req?.user;
      if (user?.role === 'admin') return true
      if (user) return { user: { equals: user.id } }
      return false
    },
    create: () => true, // Allow anyone to create orders
    update: ({ req }) => {
      // Only admins can update orders
      const user = req?.user;
      if (user?.role === 'admin') return true
      return false
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'snack',
          type: 'relationship',
          relationTo: 'snacks',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: '⏳ Pending', value: 'pending' },
        { label: '🔄 Processing', value: 'processing' },
        { label: '📦 Shipped', value: 'shipped' },
        { label: '✅ Completed', value: 'completed' },
        { label: '❌ Cancelled', value: 'cancelled' },
        { label: '🔄 Refunded', value: 'refunded' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'shippingCharge',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'orderDate',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
    },
  ],
}