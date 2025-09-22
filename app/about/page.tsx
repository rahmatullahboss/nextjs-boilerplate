export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Online Bazar</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <p className="text-lg mb-4">
          Online Bazar is your premier destination for delicious snacks delivered right to your doorstep. 
          We specialize in providing a wide selection of high-quality snacks from chips and candies to 
          cookies and nuts, all sourced from trusted suppliers.
        </p>
        
        <p className="text-lg mb-4">
          Founded in 2023, our mission is to make it easy and convenient for busy individuals and families 
          to enjoy their favorite snacks without having to visit physical stores. With our fast and reliable 
          delivery service, you can have your snacks delivered within hours of placing your order.
        </p>
        
        <p className="text-lg">
          Our commitment to quality, customer service, and convenience has made us the go-to online snack 
          store for thousands of satisfied customers across Dhaka. Whether you're looking for a quick snack 
          for yourself or planning a party, Online Bazar has got you covered.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-lg">Quality: We only offer snacks that meet our high standards</li>
            <li className="text-lg">Convenience: Easy ordering and fast delivery</li>
            <li className="text-lg">Customer Service: We're here to help with any questions or concerns</li>
            <li className="text-lg">Community: Supporting local suppliers and businesses</li>
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-2">Have questions or feedback? We'd love to hear from you!</p>
          <p className="text-lg mb-2">Email: support@onlinebazar.com</p>
          <p className="text-lg mb-2">Phone: +880 1234 567890</p>
          <p className="text-lg">Address: 123 Snack Street, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  )
}