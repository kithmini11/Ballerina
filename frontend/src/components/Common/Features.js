import React from 'react';
import { Link } from 'react-router-dom';

function Features() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
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
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
                About Us
              </Link>
              <Link to="/features" className="text-blue-600 font-medium">
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

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
            DentiX Features
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our platform offers innovative solutions for all stakeholders in the orthodontic ecosystem
          </p>
          
          {/* Main Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-60 bg-blue-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/img2.jpg" 
                    alt="Simplified Ordering" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900 opacity-30"></div>
                  <div className="absolute">
                    <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21l4-7 4 7M3 7l6-1 6 1 6-1v11l-6 1-6-1-6 1V7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l6-6m0 6l-6-6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Simplified Ordering</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Multi-channel ordering via WhatsApp, SMS, or web platform</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time inventory tracking and availability</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automated order tracking and delivery status updates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Order history and reordering with a single click</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-60 bg-green-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/img3.jpg" 
                    alt="Loyalty Points System" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-900 opacity-30"></div>
                  <div className="absolute">
                    <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Loyalty Points System</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hospitals earn points with every supply purchase</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Points can be allocated to subsidize treatments for low-income patients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparent point tracking and usage history</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Analytics dashboard to monitor impact on community care</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Secondary Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Feature 3 */}
            <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group border border-gray-100 hover:shadow-lg hover:-translate-y-1">
              <div className="relative p-6 text-center">
                <div className="mb-4">
                  <svg className="h-10 w-10 text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our platform facilitates donations to low-income patients, ensuring quality dental care for everyone regardless of financial status.
                </p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group border border-gray-100 hover:shadow-lg hover:-translate-y-1">
              <div className="relative p-6 text-center">
                <div className="mb-4">
                  <svg className="h-10 w-10 text-yellow-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Treatment Tracking</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Patients and doctors can track treatment progress, appointments, and access electronic records securely from anywhere.
                </p>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group border border-gray-100 hover:shadow-lg hover:-translate-y-1">
              <div className="relative p-6 text-center">
                <div className="mb-4">
                  <svg className="h-10 w-10 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics & Reporting</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comprehensive dashboards provide insights on supply usage, treatment outcomes, and community impact.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-10 text-white text-center shadow-lg">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Ready to Experience DentiX?
            </h3>
            <p className="text-white text-opacity-90 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join our platform today and revolutionize your orthodontic care experience.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/signup" 
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 hover:shadow-md transition-all duration-300 shadow-sm transform hover:-translate-y-1"
              >
                Sign Up Now
              </Link>
              <Link 
                to="/how-it-works" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 hover:shadow-md transition-all duration-300 shadow-sm transform hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>      
    </div>
  );
}

export default Features;