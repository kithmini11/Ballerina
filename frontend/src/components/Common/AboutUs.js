import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/images/orthodontic-pattern.png')] bg-opacity-10 bg-repeat"></div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/images/Logo2.png" alt="DentiX Logo" className="h-12 w-auto mr-3" />
              <span className="text-2xl font-bold text-blue-600">DentiX</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
                Home
              </Link>
              <Link to="/about" className="text-blue-600 font-medium">
                About Us
              </Link>
              <Link to="/features" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
                Features
              </Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
                How It Works
              </Link>              
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition duration-300">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ...existing code... */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl font-bold text-center text-blue-700 mb-4">
            About DentiX
          </h1>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Transforming orthodontic care in Sri Lanka with innovation and compassion
          </p>
          
          <div className="bg-white rounded-3xl shadow-lg p-10 mb-16 border border-gray-50 transform hover:-translate-y-2 transition-all duration-500">
            {/* Mission Section */}
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed text-base">
                  At DentiX, we're dedicated to revolutionizing orthodontic care in Sri Lanka by seamlessly connecting doctors, patients, hospitals, and suppliers on one innovative platform. Our goal is to make high-quality orthodontic supplies accessible to all, while empowering low-income patients through our unique loyalty points system.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/images/Logo2.png" 
                  alt="DentiX Logo" 
                  className="h-56 mx-auto transform hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
            
            {/* Story Section */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-base">
                Founded in 2024, DentiX was born from a vision to bridge critical gaps in Sri Lanka's orthodontic care system. Our founders, a passionate team of healthcare professionals and tech innovators, recognized the challenges faced by government hospitals and low-income patients in accessing essential orthodontic treatments.
              </p>
              <p className="text-gray-700 leading-relaxed text-base">
                By creating a unified platform, we streamline supply chains, enhance hospital operations, and foster community support through our loyalty points system. DentiX is more than a platform—it's a movement to make orthodontic care equitable and efficient for everyone.
              </p>
            </div>
          </div>
          
          {/* Impact Section */}
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Impact Card 1 - Patients Served */}
            <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group border border-gray-100 hover:shadow-lg hover:-translate-y-1">
              <div className="relative p-6 text-center">
                <div className="mb-4">
                  <svg className="h-10 w-10 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1,000+ Patients Served</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Empowering over a thousand low-income patients with access to affordable orthodontic care through our innovative platform.
                </p>
              </div>
            </div>
            
            {/* Impact Card 2 - Hospitals Connected */}
            <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group border border-gray-100 hover:shadow-lg hover:-translate-y-1">
              <div className="relative p-6 text-center">
                <div className="mb-4">
                  <svg className="h-10 w-10 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">50+ Hospitals Connected</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Partnering with hospitals across Sri Lanka to streamline orthodontic supply chains and enhance operational efficiency.
                </p>
              </div>
            </div>
            
            {/* Impact Card 3 - Supplies Delivered */}
            <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group border border-gray-100 hover:shadow-lg hover:-translate-y-1">
              <div className="relative p-6 text-center">
                <div className="mb-4">
                  <svg className="h-10 w-10 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">10,000+ Supplies Delivered</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Delivering critical orthodontic supplies to healthcare providers across Sri Lanka, ensuring quality care reaches those who need it most.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Join DentiX Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;