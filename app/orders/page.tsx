'use client'

import { useState } from 'react'

// Define types
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'refunded';
  date: string;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1001',
    items: [
      { name: 'Potato Chips', quantity: 2, price: 50 },
      { name: 'Chocolate Bar', quantity: 1, price: 80 },
    ],
    total: 180,
    status: 'completed',
    date: '2023-05-15',
  },
  {
    id: '1002',
    items: [
      { name: 'Oreo Cookies', quantity: 1, price: 120 },
    ],
    total: 120,
    status: 'shipped',
    date: '2023-05-10',
  },
  {
    id: '1003',
    items: [
      { name: 'Mixed Nuts', quantity: 1, price: 200 },
      { name: 'Salted Crackers', quantity: 3, price: 70 },
    ],
    total: 410,
    status: 'pending',
    date: '2023-05-05',
  },
]

export default function OrderHistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-indigo-100 text-indigo-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      {selectedOrder ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold">Order #{selectedOrder.id}</h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Back to Orders
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Order Date</p>
                <p className="font-medium">{selectedOrder.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Items</h3>
            <div className="space-y-4">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>৳{selectedOrder.total}</span>
            </div>
          </div>
          
          {selectedOrder.status === 'pending' && (
            <div className="mt-6">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cancel Order
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">#{order.id}</td>
                  <td className="py-4 px-6">{order.date}</td>
                  <td className="py-4 px-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        {item.name} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-6 font-medium">৳{order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}