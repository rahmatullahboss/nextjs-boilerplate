import { NextResponse } from 'next/server'
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

export async function GET() {
  return NextResponse.json(mockSnacks)
}