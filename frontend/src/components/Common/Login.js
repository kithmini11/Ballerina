import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!email || !password || !role) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    // Demo credentials for each role
    const validCredentials = {
      doctor: { email: 'doctor@example.com', password: 'password123' },
      hospital: { email: 'hospital@example.com', password: 'password123' },
      supplier: { email: 'supplier@example.com', password: 'password123' },
      admin: { email: 'admin@example.com', password: 'password123' }
    };
    
    try {
      if (validCredentials[role] && 
          email === validCredentials[role].email && 
          password === validCredentials[role].password) {
        
        // Call login function with user data
        login({ email, role });
        
        // Navigate to role-specific dashboard
        navigate(`/${role}`, { replace: true });
      } else {
        setError('Invalid credentials for the selected role');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-green-200 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-35"></div>
      </div>

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-50 flex">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-100 to-blue-200">
          <img
            src="/images/img3.jpg"
            alt="Orthodontic Care"
            className="w-full h-full object-cover opacity-90"
          />          
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="shadow-blue-200 transform hover:-translate-y-2 transition-all duration-500">
            {/* Header with consistent blue gradient */}
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-6 px-6 rounded-t-2xl relative">
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20"></div>
              
              <div className="relative z-10 text-center">
                <Link to="/">
                  <div className="bg-white rounded-2xl p-3 shadow-sm inline-block mb-4 border border-gray-50 transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/Logo.png" 
                      alt="DentiX Logo" 
                      className="h-12 w-auto" 
                    />
                  </div>
                </Link>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome Back to DentiX
                </h2>
                <p className="text-white text-opacity-90 text-sm">
                  Sign in to your {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'DentiX'} account
                </p>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 bg-white rounded-b-2xl">
              {error && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 transition-all duration-300">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    I am a:
                  </label>
                  <select 
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    autoComplete="organization-title"
                    required
                    disabled={loading}
                  >
                    <option value="">Select your role</option>
                    <option value="doctor">Doctor</option>
                    <option value="hospital">Hospital</option>
                    <option value="supplier">Supplier</option>                   
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="mb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </div>
              </form>
              
              <div className="text-center space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Demo Accounts:
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Doctor: doctor@example.com / password123</p>
                    <p>Hospital: hospital@example.com / password123</p>
                    <p>Supplier: supplier@example.com / password123</p>                    
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    Sign up
                  </Link>
                </p>
                
                <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;