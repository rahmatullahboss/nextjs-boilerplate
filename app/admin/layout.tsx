import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-xl font-bold">
            Admin Dashboard
          </Link>
          <div className="space-x-4">
            <Link href="/admin" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/" className="hover:text-gray-300">
              Back to Site
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}