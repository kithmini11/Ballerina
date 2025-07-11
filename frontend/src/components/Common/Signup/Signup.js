import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorSignupForm from './DoctorSignupForm';
import HospitalSignupForm from './HospitalSignupForm';
import SupplierSignupForm from './SupplierSignupForm';
import { useAuth } from '../../../context/AuthContext';

function Signup() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // User role options with enhanced vibrant colors
  const userRoles = [
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Manage patient treatments, order supplies, and coordinate with hospitals',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-500 hover:via-blue-600 hover:to-blue-700',
      shadowColor: 'shadow-blue-200',
      cardGradient: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200',
      cardHover: 'hover:from-blue-100 hover:via-blue-200 hover:to-blue-300',
      features: ['Patient Management', 'Treatment Planning', 'Supply Requests']
    },    
    {
      id: 'hospital',
      title: 'Hospital',
      description: 'Manage doctors, inventory, and coordinate orthodontic care services',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-green-400 via-green-500 to-green-600',
      hoverGradient: 'hover:from-green-500 hover:via-green-600 hover:to-green-700',
      shadowColor: 'shadow-green-200',
      cardGradient: 'bg-gradient-to-br from-green-50 via-green-100 to-green-200',
      cardHover: 'hover:from-green-100 hover:via-green-200 hover:to-green-300',
      features: ['Inventory Management', 'Staff Coordination', 'Loyalty Points']
    },
    {
      id: 'supplier',
      title: 'Supplier',
      description: 'Manage inventory, fulfill orders, and coordinate with hospitals',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
      hoverGradient: 'hover:from-purple-500 hover:via-purple-600 hover:to-purple-700',
      shadowColor: 'shadow-purple-200',
      cardGradient: 'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200',
      cardHover: 'hover:from-purple-100 hover:via-purple-200 hover:to-purple-300',
      features: ['Order Fulfillment', 'Inventory Tracking', 'Delivery Management']
    }
  ];

 const handleSignupSubmit = (formData) => {
    console.log('Signup data:', formData);
    
    // Create a simplified user object
    const user = {
      ...formData,
      role: selectedRole,
      name: formData.name || formData.hospitalName || formData.companyName || 'New User'
    };
    
    // Login the user automatically after signup
    login(user);
    
    // Redirect to the appropriate dashboard
    navigate(`/${selectedRole}`);
  };

  // If user hasn't selected a role, show the role selection cards
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
        {/* Simplified background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-40"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-green-100 rounded-full opacity-40"></div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-6xl w-full">
            {/* Header Section */}
            <div className="text-center mb-12">
              <Link to="/" className="inline-block mb-8">
                <div className="flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/Logo.png" 
                      alt="DentiX Logo" 
                      className="h-16 w-auto" 
                    />
                  </div>
                </div>
              </Link>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Welcome to DentiX
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Join thousands of healthcare professionals revolutionizing orthodontic care in Sri Lanka
              </p>
            </div>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {userRoles.map((role, index) => (
                <div 
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group relative bg-white rounded-2xl shadow-md hover:shadow-lg ${role.shadowColor} p-8 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-50`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Card background gradient on hover */}
                  <div className={`absolute inset-0 ${role.cardGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  {/* Icon container */}
                  <div className={`w-20 h-20 ${role.gradient} ${role.hoverGradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-md group-hover:shadow-lg`}>
                    <div className="text-white">
                      {role.icon}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-800 transition-colors">
                    {role.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {role.description}
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Call to action */}
                  <div className={`w-full py-3 px-4 ${role.gradient} ${role.hoverGradient} text-white rounded-xl text-center font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}>
                    Get Started as {role.title}
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  Sign in here
                </Link>
              </p>
              <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If a role is selected, show the appropriate form
  const selectedRoleData = userRoles.find(r => r.id === selectedRole);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">     
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-50">
            {/* Header with role-specific gradient */}
            <div className={`${selectedRoleData.gradient} py-8 px-8 relative`}>
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20"></div>
              
              <div className="relative z-10 text-center">
                <div className="bg-white rounded-2xl p-3 shadow-sm inline-block mb-4 border border-gray-50">
                  <img 
                    src="/images/Logo.png" 
                    alt="DentiX Logo" 
                    className="h-12 w-auto" 
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedRoleData.title} Registration
                </h2>
                <p className="text-gray-700">
                  Create your DentiX account and join our platform
                </p>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-8">
              {/* Form Components */}
              {selectedRole === 'doctor' && <DoctorSignupForm onSubmit={handleSignupSubmit} />}          
              {selectedRole === 'hospital' && <HospitalSignupForm onSubmit={handleSignupSubmit} />}
              {selectedRole === 'supplier' && <SupplierSignupForm onSubmit={handleSignupSubmit} />}
              
              {/* Navigation Links */}
              <div className="mt-8 space-y-4">
                <div className="text-center">
                  <button 
                    onClick={() => setSelectedRole(null)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to role selection
                  </button>
                </div>
                
                <div className="text-center border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                      Sign in
                    </Link>
                  </p>
                </div>

                <div className="text-center">
                  <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;