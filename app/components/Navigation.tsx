import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Online Bazar
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/snacks" className="hover:text-gray-300">
            Snacks
          </Link>
          <Link href="/order" className="hover:text-gray-300">
            Order
          </Link>
          <Link href="/orders" className="hover:text-gray-300">
            My Orders
          </Link>
          <Link href="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}