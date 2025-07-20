import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const [services, setServices] = useState([
    { id: 1, name: 'Regular Cleaning', description: 'Thorough cleaning of your entire home', price: '$99', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115' },
    { id: 2, name: 'Deep Cleaning', description: 'Intensive cleaning for every corner', price: '$199', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952' },
    { id: 3, name: 'Office Cleaning', description: 'Professional cleaning for workspaces', price: '$149', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36' },
  ]);

  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Sarah Johnson', comment: 'Cleanify saved me so much time! The cleaners are professional and thorough.', rating: 5 },
    { id: 2, name: 'Michael Chen', comment: 'Best cleaning service I\'ve ever used. Highly recommend!', rating: 5 },
    { id: 3, name: 'Emily Wilson', comment: 'My apartment has never been cleaner. Worth every penny.', rating: 4 },
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Cleanify!</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Book trusted cleaning services at your convenience. Professional cleaners at your doorstep.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/bookings" 
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Book Now
            </Link>
            <Link 
              to="/services" 
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Cleaning Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">{service.price}</span>
                    <Link 
                      to={`/book?service=${service.id}`} 
                      className="text-blue-600 hover:underline"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Book Online</h3>
              <p className="text-gray-600">Select your service and schedule in just a few clicks</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">We Clean</h3>
              <p className="text-gray-600">Our professional cleaners arrive fully equipped</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy</h3>
              <p className="text-gray-600">Relax in your sparkling clean space</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-bold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for a Cleaner Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who trust Cleanify with their cleaning needs.</p>
          <Link 
            to="/bookings" 
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}