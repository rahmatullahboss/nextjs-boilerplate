export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main className="flex flex-col gap-8">
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Online Bazar</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Your one-stop shop for delicious snacks delivered right to your doorstep.
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Wide Selection</h2>
            <p className="text-gray-600">
              Choose from our extensive range of chips, candies, cookies, nuts, crackers, and drinks.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Fast Delivery</h2>
            <p className="text-gray-600">
              Quick and reliable delivery across Dhaka with competitive shipping rates.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Easy Ordering</h2>
            <p className="text-gray-600">
              Simple and secure checkout process with multiple payment options.
            </p>
          </div>
        </section>
        
        <section className="bg-blue-50 p-8 rounded-lg text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Browse our delicious snacks and place your order in just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/snacks" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              Browse Snacks
            </a>
            <a 
              href="/order" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
            >
              Place Order
            </a>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Snacks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Potato Chips</h3>
              <p className="text-gray-600 text-sm mb-2">Crispy and delicious</p>
              <span className="font-bold">৳50</span>
            </div>
            
            <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Chocolate Bar</h3>
              <p className="text-gray-600 text-sm mb-2">Rich and creamy</p>
              <span className="font-bold">৳80</span>
            </div>
            
            <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Oreo Cookies</h3>
              <p className="text-gray-600 text-sm mb-2">Classic sandwich cookies</p>
              <span className="font-bold">৳120</span>
            </div>
            
            <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Mixed Nuts</h3>
              <p className="text-gray-600 text-sm mb-2">Healthy and nutritious</p>
              <span className="font-bold">৳200</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
