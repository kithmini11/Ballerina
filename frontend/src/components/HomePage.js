import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Common/Navigation';

function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Navigation Bar */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Revolutionizing Orthodontic Care in Sri Lanka
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              DentiX connects doctors, hospitals, and suppliers on a single platform, making orthodontic supplies accessible while supporting low-income patients through our innovative points system.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
              </Link>
              <Link to="/login" className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium border-2 border-blue-600 hover:bg-blue-50 transition duration-300">
                Login
              </Link>
            </div>
          </div>
          
          {/* Hero Image Section */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white p-3 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="/images/img4.jpg" 
                    alt="Orthodontic care" 
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-white p-2 rounded-xl shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 z-10">
                <img 
                  src="/images/img2.jpg" 
                  alt="Doctor with patient" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white p-2 rounded-xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300 z-10">
                <img 
                  src="/images/img3.jpg" 
                  alt="Dental tools" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute top-16 -right-4 w-28 h-28 bg-white p-2 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="/images/img5.jpg" 
                  alt="Orthodontic braces" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose DentiX?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21l4-7 4 7M3 7l6-1 6 1 6-1v11l-6 1-6-1-6 1V7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l6-1 6 1 6-1M9 12l6-6m0 6l-6-6" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-4 text-gray-800 text-center">Simplified Ordering</h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Streamlined supply ordering process through WhatsApp, SMS, or web platform with just a few clicks.
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-4 text-gray-800 text-center">Loyalty Points System</h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Hospitals earn points with every purchase, creating opportunities to support low-income patients.
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l-8 8-4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-4 text-gray-800 text-center">Community Support</h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Our platform facilitates support for low-income patients, ensuring quality dental care for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-16 relative"
        style={{
          backgroundImage: 'url("/images/dental.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-blue-400 opacity-80"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-3xl font-bold mb-6 text-white">
            Ready to Transform Dental Care?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Join our platform today and be part of the revolution in orthodontic supply management.
          </p>
          <div className="flex justify-center space-x-4 flex-wrap">
            <Link to="/signup" className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition duration-300 shadow-lg m-2">
              Join as Doctor
            </Link>
            <Link to="/signup" className="px-8 py-3 bg-blue-800 text-white rounded-full font-medium hover:bg-blue-900 transition duration-300 shadow-lg m-2">
              Join as Hospital
            </Link>
            <Link to="/signup" className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition duration-300 shadow-lg m-2">
              Join as Supplier
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <img 
                  src="/images/Logo2.png" 
                  alt="DentiX" 
                  className="h-10 w-auto mr-3" 
                />
                DentiX
              </h4>
              <p className="text-gray-400">
                Revolutionizing orthodontic supply management in Sri Lankan government hospitals.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-white transition duration-300">Features</Link></li>
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition duration-300">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-gray-400 mb-2">Email: team.dentix@gmail.com</p>
              <div className="mt-4">
                <select className="bg-gray-700 text-white p-2 rounded w-full">
                  <option>English</option>
                  <option>Sinhala</option>
                  <option>Tamil</option>
                </select>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 DentiX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;