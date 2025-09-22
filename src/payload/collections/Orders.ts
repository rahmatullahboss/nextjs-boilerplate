import type { CollectionConfig } from 'payload'
import { admins, adminsOnly, adminsOrOwner, authenticated } from '../access/index.js'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    defaultColumns: [
      'id',
      'customerName',
      'customerEmail',
      'status',
      'orderDate',
      'customerNumber',
      'deliveryZone',
      'shippingCharge',
      'shippingAddress.city',
      'shippingAddress.line1',
    ],
  },
  access: {
    read: adminsOrOwner('user'), // Admins can read all orders, users can only read their own
    create: ({ req }) => true, // Allow guest checkout via API route
    update: admins, // Only admins can update orders
    delete: admins, // Only admins can delete orders
    admin: ({ req: { user } }) => {
      return user?.role === 'admin' ? true : false
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    // Client/device metadata for analytics
    {
      name: 'userAgent',
      type: 'text',
      required: false,
      admin: { description: 'Captured at order time' },
    },
    {
      name: 'deviceType',
      type: 'select',
      required: false,
      options: [
        { label: 'Mobile', value: 'mobile' },
        { label: 'Desktop', value: 'desktop' },
        { label: 'Tablet', value: 'tablet' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'customerName',
      type: 'text',
      label: 'Customer name',
      required: true,
      admin: {
        description: 'Name captured at time of order',
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      label: 'Customer email',
      required: true,
    },
    {
      name: 'customerNumber',
      type: 'text',
      label: 'Customer number',
      required: true,
      admin: {
        description: 'Customer contact number captured at time of order',
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Payment method',
      required: true,
      defaultValue: 'cod',
      options: [
        { label: 'Cash on Delivery', value: 'cod' },
        { label: 'bKash', value: 'bkash' },
        { label: 'Nagad', value: 'nagad' },
      ],
    },
    {
      name: 'paymentSenderNumber',
      type: 'text',
      label: 'Sender wallet number',
      required: false,
      admin: {
        description: 'Wallet number used to send the payment',
        condition: (data) => data?.paymentMethod === 'bkash' || data?.paymentMethod === 'nagad',
      },
      validate: (
        value: unknown,
        { siblingData }: { siblingData?: { paymentMethod?: 'cod' | 'bkash' | 'nagad' } },
      ) => {
        if (siblingData?.paymentMethod === 'bkash' || siblingData?.paymentMethod === 'nagad') {
          return typeof value === 'string' && value.trim().length > 0
            ? true
            : 'Sender wallet number is required for digital payments'
        }
        return true
      },
    },
    {
      name: 'paymentTransactionId',
      type: 'text',
      label: 'Transaction ID',
      required: false,
      admin: {
        description: 'Reference ID from the mobile wallet payment',
        condition: (data) => data?.paymentMethod === 'bkash' || data?.paymentMethod === 'nagad',
      },
      validate: (
        value: unknown,
        { siblingData }: { siblingData?: { paymentMethod?: 'cod' | 'bkash' | 'nagad' } },
      ) => {
        if (siblingData?.paymentMethod === 'bkash' || siblingData?.paymentMethod === 'nagad') {
          return typeof value === 'string' && value.trim().length > 0
            ? true
            : 'Transaction ID is required for digital payments'
        }
        return true
      },
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: 'items',
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
      minRows: 1,
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
      admin: {
        description: 'Current status of the order - updates customer via email notifications',
      }
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'subtotal',
      label: 'Subtotal',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'shippingCharge',
      label: 'Delivery charge',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'deliveryZone',
      type: 'select',
      required: true,
      defaultValue: 'inside_dhaka',
      options: [
        { label: 'Inside Dhaka', value: 'inside_dhaka' },
        { label: 'Outside Dhaka', value: 'outside_dhaka' },
      ],
    },
    {
      name: 'freeDeliveryApplied',
      type: 'checkbox',
      defaultValue: false,
      label: 'Free delivery applied',
    },
    {
      name: 'orderDate',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
    },
    {
      name: 'shippingAddress',
      type: 'group',
      admin: {
        description: 'Shipping address captured at time of order',
      },
      fields: [
        {
          name: 'line1',
          type: 'text',
          label: 'Address line 1',
          required: true,
        },
        {
          name: 'line2',
          type: 'text',
          label: 'Address line 2',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Postal code',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}