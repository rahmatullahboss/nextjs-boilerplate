export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-xl">Loading...</p>
      </div>
    </div>
  )
}