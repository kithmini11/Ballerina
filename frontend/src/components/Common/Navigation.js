import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-300 to-blue-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="mr-4 bg-white rounded-full p-1 shadow-lg">
            <img 
              src="/images/Logo.png" 
              alt="DentiX Logo" 
              className="h-8 w-auto" 
            />
          </div>
          <h1 className="text-3xl font-bold text-blue-800 drop-shadow-lg">
            DentiX
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {currentUser ? (
            <>
              <Link to={`/${currentUser.role}`} className="text-white hover:text-blue-100 transition duration-300 font-medium text-lg">
                My Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-white focus:outline-none hover:text-blue-100 transition duration-300 font-medium text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/about" className="text-white hover:text-blue-100 transition duration-300 font-medium text-lg">About Us</Link>
              <Link to="/features" className="text-white hover:text-blue-100 transition duration-300 font-medium text-lg">Features</Link>
              <Link to="/how-it-works" className="text-white hover:text-blue-100 transition duration-300 font-medium text-lg">How It Works</Link>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition duration-300 font-medium">Login</Link>
              <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition duration-300 font-medium">Sign Up</Link>
            </>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navigation;