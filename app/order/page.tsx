'use client'

import { useState } from 'react'
import { Snack } from '@/types/payload'

// Mock data for demonstration
const mockSnacks: Snack[] = [
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
]

export default function OrderPage() {
  const [cart, setCart] = useState<{ snackId: string; quantity: number }[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)

  const addToCart = (snackId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.snackId === snackId)
      if (existingItem) {
        return prevCart.map(item =>
          item.snackId === snackId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { snackId, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (snackId: string) => {
    setCart(prevCart => prevCart.filter(item => item.snackId !== snackId))
  }

  const updateQuantity = (snackId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(snackId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.snackId === snackId ? { ...item, quantity } : item
      )
    )
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const snack = mockSnacks.find(s => s.id === item.snackId)
      return total + (snack ? snack.price * item.quantity : 0)
    }, 0)
  }

  const placeOrder = () => {
    // In a real application, this would send the order to the server
    console.log('Order placed:', cart)
    setOrderPlaced(true)
    setCart([])
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="mb-8">Thank you for your order. You will receive a confirmation email shortly.</p>
        <button 
          onClick={() => setOrderPlaced(false)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Place Another Order
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Snacks List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Available Snacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSnacks.map((snack) => (
              <div key={snack.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold">{snack.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{snack.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">৳{snack.price}</span>
                  <button
                    onClick={() => addToCart(snack.id)}
                    disabled={!snack.available}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50"
                  >
                    {snack.available ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shopping Cart */}
        <div className="border rounded-lg p-6 shadow-sm h-fit">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const snack = mockSnacks.find(s => s.id === item.snackId)
                  if (!snack) return null
                  
                  return (
                    <div key={item.snackId} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="font-medium">{snack.name}</h3>
                        <p className="text-gray-600 text-sm">৳{snack.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.snackId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.snackId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.snackId)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span>৳{calculateTotal()}</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}