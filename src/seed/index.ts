import { getPayload } from 'payload'
import config from '../payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  // Create admin user
  const adminUser = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'Admin123!',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
  })

  console.log('Admin user created:', adminUser.email)

  // Create delivery settings
  const deliverySettings = await payload.create({
    collection: 'delivery-settings',
    data: {
      insideDhakaCharge: 60,
      outsideDhakaCharge: 120,
      freeDeliveryThreshold: 2000,
    },
  })

  console.log('Delivery settings created')

  // Create sample snacks
  const snacks = [
    {
      name: 'Potato Chips',
      description: 'Crispy and delicious potato chips',
      price: 50,
      category: 'chips',
      available: true,
    },
    {
      name: 'Chocolate Bar',
      description: 'Rich and creamy chocolate bar',
      price: 80,
      category: 'candy',
      available: true,
    },
    {
      name: 'Oreo Cookies',
      description: 'Classic sandwich cookies with cream filling',
      price: 120,
      category: 'cookies',
      available: true,
    },
    {
      name: 'Mixed Nuts',
      description: 'A healthy mix of almonds, cashews, and walnuts',
      price: 200,
      category: 'nuts',
      available: true,
    },
    {
      name: 'Salted Crackers',
      description: 'Crunchy crackers with a hint of salt',
      price: 70,
      category: 'crackers',
      available: true,
    },
    {
      name: 'Mineral Water',
      description: 'Refreshing purified mineral water',
      price: 25,
      category: 'drinks',
      available: true,
    },
  ]

  for (const snackData of snacks) {
    const snack = await payload.create({
      collection: 'snacks',
      data: snackData,
    })
    console.log(`Created snack: ${snack.name}`)
  }

  console.log('Seed data created successfully!')
}

seed().catch((error) => {
  console.error('Error seeding data:', error)
})