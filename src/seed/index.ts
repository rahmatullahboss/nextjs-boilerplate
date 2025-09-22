import { getPayload } from 'payload'
import config from '../payload.config.js'

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
      deliveryZone: 'inside_dhaka',
    },
  })

  console.log('Admin user created:', adminUser.email)

  // Create categories
  const categoriesData = [
    { name: 'Chips', description: 'Crispy and delicious chips' },
    { name: 'Candy', description: 'Sweet treats and chocolates' },
    { name: 'Cookies', description: 'Baked goods and biscuits' },
    { name: 'Nuts', description: 'Healthy nuts and dried fruits' },
    { name: 'Crackers', description: 'Savory crackers and biscuits' },
    { name: 'Drinks', description: 'Beverages and soft drinks' },
  ]

  const categories = []
  for (const categoryData of categoriesData) {
    const category = await payload.create({
      collection: 'categories',
      data: categoryData,
    })
    categories.push(category)
    console.log(`Created category: ${category.name}`)
  }

  // Create delivery settings
  const deliverySettings = await payload.create({
    collection: 'delivery-settings',
    data: {
      label: 'Default Delivery Settings',
      insideDhakaCharge: 80,
      outsideDhakaCharge: 120,
      freeDeliveryThreshold: 2000,
      digitalPaymentDeliveryCharge: 20,
      shippingHighlightTitle: 'Free shipping on orders over 2000 taka',
      shippingHighlightSubtitle: 'Digital wallet payments have a flat Tk 20 delivery charge.',
    },
  })

  console.log('Delivery settings created')

  // Create sample items
  const items = [
    {
      name: 'Potato Chips',
      shortDescription: 'Crispy and delicious',
      description: 'Our signature potato chips are made from the finest potatoes and seasoned to perfection. Each bite delivers a satisfying crunch and a burst of flavor that will keep you coming back for more.',
      price: 50,
      category: categories[0].id,
      available: true,
    },
    {
      name: 'Chocolate Bar',
      shortDescription: 'Rich and creamy',
      description: 'Indulge in our premium chocolate bar made with the finest cocoa beans. This smooth and creamy treat melts in your mouth, delivering a rich chocolate experience that chocolate lovers will adore.',
      price: 80,
      category: categories[1].id,
      available: true,
    },
    {
      name: 'Oreo Cookies',
      shortDescription: 'Classic sandwich cookies',
      description: 'Enjoy the classic taste of Oreo cookies with their iconic cream filling. These beloved sandwich cookies are perfect for dunking in milk or enjoying on their own for a delightful snack.',
      price: 120,
      category: categories[2].id,
      available: true,
    },
    {
      name: 'Mixed Nuts',
      shortDescription: 'Healthy nut mix',
      description: 'A nutritious blend of premium almonds, cashews, and walnuts. Packed with protein and healthy fats, this mix is perfect for a quick energy boost or a healthy snack option.',
      price: 200,
      category: categories[3].id,
      available: true,
    },
    {
      name: 'Salted Crackers',
      shortDescription: 'Crunchy and savory',
      description: 'Our salted crackers offer the perfect balance of crunch and flavor. Made with quality ingredients and lightly salted for a satisfying snack that pairs well with cheese or soup.',
      price: 70,
      category: categories[4].id,
      available: true,
    },
    {
      name: 'Mineral Water',
      shortDescription: 'Refreshing and pure',
      description: 'Stay hydrated with our purified mineral water. Sourced and treated to the highest standards, this refreshing water is perfect for any time of day and ideal for staying hydrated.',
      price: 25,
      category: categories[5].id,
      available: true,
    },
  ]

  for (const itemData of items) {
    const item = await payload.create({
      collection: 'items',
      data: itemData,
    })
    console.log(`Created item: ${item.name}`)
  }

  console.log('Seed data created successfully!')
}

seed().catch((error) => {
  console.error('Error seeding data:', error)
})