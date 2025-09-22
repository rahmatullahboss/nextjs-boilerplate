import { Snack } from '@/types/payload'

async function getSnacks() {
  // In a real application, this would fetch from the Payload CMS API
  // const res = await fetch('http://localhost:3000/api/snacks')
  // return res.json()
  
  // Mock data for demonstration
  return [
    {
      id: '1',
      name: 'Potato Chips',
      description: 'Crispy and delicious potato chips',
      price: 50,
      category: 'chips',
      available: true,
    },
    {
      id: '2',
      name: 'Chocolate Bar',
      description: 'Rich and creamy chocolate bar',
      price: 80,
      category: 'candy',
      available: true,
    },
    {
      id: '3',
      name: 'Oreo Cookies',
      description: 'Classic sandwich cookies with cream filling',
      price: 120,
      category: 'cookies',
      available: true,
    },
  ] as Snack[]
}

export default async function SnacksPage() {
  const snacks = await getSnacks()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Snacks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snacks.map((snack) => (
          <div key={snack.id} className="border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{snack.name}</h2>
            <p className="text-gray-600 mb-4">{snack.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">৳{snack.price}</span>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {snack.category}
              </span>
            </div>
            <button 
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              disabled={!snack.available}
            >
              {snack.available ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}