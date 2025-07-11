import React from 'react';
import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Navigation Bar */}
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
              <Link to="/features" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
                Features
              </Link>
              <Link to="/how-it-works" className="text-blue-600 font-medium">
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
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">How DentiX Works</h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our innovative platform connects all stakeholders in the orthodontic ecosystem
          </p>
          
          {/* Process Steps */}
          <div className="mb-16">
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-200 z-0"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">Hospitals Order Supplies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Government hospitals place orders for orthodontic supplies through our platform. Each purchase earns loyalty points that can be used to support low-income patients.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white rounded-full border-4 border-blue-400 p-2 w-16 h-16 flex items-center justify-center z-10">
                  <span className="text-blue-600 text-2xl font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <img 
                    src="/images/img1.jpg" 
                    alt="Hospital Order" 
                    className="rounded-lg shadow-md w-80 h-48 object-cover mx-auto"
                  />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col md:flex-row-reverse items-center mb-12">
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 md:text-left">
                  <h3 className="text-2xl font-bold text-green-600 mb-3">Suppliers Fulfill Orders</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Registered suppliers receive and fulfill the orders, providing high-quality orthodontic supplies to hospitals through our efficient logistics system.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white rounded-full border-4 border-green-400 p-2 w-16 h-16 flex items-center justify-center z-10">
                  <span className="text-green-600 text-2xl font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pr-12 hidden md:block">
                  <img 
                    src="/images/img3.jpg" 
                    alt="Supplier Fulfillment" 
                    className="rounded-lg shadow-md w-80 h-48 object-cover mx-auto"
                  />
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold text-purple-600 mb-3">Doctors Provide Treatment</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Doctors use the supplies to provide quality orthodontic care to patients. They can manage appointments, track treatment progress, and coordinate with hospitals.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white rounded-full border-4 border-purple-400 p-2 w-16 h-16 flex items-center justify-center z-10">
                  <span className="text-purple-600 text-2xl font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <img 
                    src="/images/img2.jpg" 
                    alt="Doctor Treatment" 
                    className="rounded-lg shadow-md w-80 h-48 object-cover mx-auto"
                  />
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative z-10 flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 md:text-left">
                  <h3 className="text-2xl font-bold text-red-600 mb-3">Patients Receive Care</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Patients receive treatment, with low-income individuals benefiting from subsidized care through the loyalty points system. Everyone can track their treatment progress through the platform.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white rounded-full border-4 border-red-400 p-2 w-16 h-16 flex items-center justify-center z-10">
                  <span className="text-red-600 text-2xl font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pr-12 hidden md:block">
                  <img 
                    src="/images/img5.jpg" 
                    alt="Patient Care" 
                    className="rounded-lg shadow-md w-80 h-48 object-cover mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Role-based Information */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Platform for Everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-b-4 border-blue-500">
              <div className="bg-blue-50 p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-10 h-10 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800">For Doctors</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Manage patient records and treatment plans</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Schedule and track appointments</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Request supplies from hospital inventory</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Support low-income patients with point allocations</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/signup" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                    Sign Up as Doctor
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-b-4 border-green-500">
              <div className="bg-green-50 p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-10 h-10 text-green-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800">For Hospitals</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Order and manage orthodontic supplies</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Earn and manage loyalty points</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Coordinate doctor schedules and patient assignments</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Allocate points to subsidize low-income patient care</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/signup" className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                    Sign Up as Hospital
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
 {/* FAQs */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8 mb-16 border border-blue-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-3 mt-1 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      How does the loyalty points system work?
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Hospitals earn loyalty points with every purchase of orthodontic supplies through our platform. These points can then be allocated to subsidize treatment for low-income patients, making quality orthodontic care accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-3 mt-1 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      How are low-income patients identified?
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Doctors and hospitals can identify patients who need financial assistance and submit applications for support. The system reviews the applications and allocates points based on need and availability.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-3 mt-1 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      How do suppliers join the platform?
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Suppliers can register through our website and undergo a verification process. Once approved, they can list their products and fulfill orders from hospitals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-3 mt-1 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      Is the platform secure?
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Yes, DentiX employs industry-standard security measures to protect all user data and transactions. Patient information is handled in compliance with healthcare privacy regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to Join DentiX?</h3>
            <Link to="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl inline-block">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;