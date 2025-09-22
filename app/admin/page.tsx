'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('orders')

  // Mock data for demonstration
  const mockOrders = [
    {
      id: '1',
      customer: 'John Doe',
      total: 250,
      status: 'pending',
      date: '2023-05-15',
    },
    {
      id: '2',
      customer: 'Jane Smith',
      total: 180,
      status: 'processing',
      date: '2023-05-14',
    },
    {
      id: '3',
      customer: 'Bob Johnson',
      total: 320,
      status: 'shipped',
      date: '2023-05-13',
    },
  ]

  const mockSnacks = [
    {
      id: '1',
      name: 'Potato Chips',
      price: 50,
      category: 'chips',
      available: true,
    },
    {
      id: '2',
      name: 'Chocolate Bar',
      price: 80,
      category: 'candy',
      available: true,
    },
  ]

  useEffect(() => {
    // In a real application, this would check authentication status
    // For demonstration, we'll simulate being logged in
    setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-8">Please log in to access the admin dashboard.</p>
        <Link 
          href="/login" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'orders' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'snacks' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('snacks')}
        >
          Snacks
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'settings' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Order ID</th>
                  <th className="py-2 px-4 border-b text-left">Customer</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">{order.customer}</td>
                    <td className="py-2 px-4 border-b">৳{order.total}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">{order.date}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        View
                      </button>
                      <button className="text-green-500 hover:text-green-700">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'snacks' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Snack Inventory</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add New Snack
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSnacks.map((snack) => (
              <div key={snack.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold">{snack.name}</h3>
                <p className="text-gray-600">৳{snack.price}</p>
                <p className="text-gray-600 text-sm mb-2">{snack.category}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    snack.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {snack.available ? 'Available' : 'Out of Stock'}
                  </span>
                  <div>
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Delivery Settings</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Inside Dhaka Delivery Charge (BDT)
              </label>
              <input
                type="number"
                defaultValue="60"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Outside Dhaka Delivery Charge (BDT)
              </label>
              <input
                type="number"
                defaultValue="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Free Delivery Threshold (BDT)
              </label>
              <input
                type="number"
                defaultValue="2000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}