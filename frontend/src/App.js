import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import DoctorPortal from './components/Doctor/DoctorPortal';
import SupplierDashboard from './components/Supplier/SupplierDashboard';
import HospitalDashboard from './components/Hospital/HospitalDashboard';
import Login from './components/Common/Login';
import Signup from './components/Common/Signup/Signup';
import AboutUs from './components/Common/AboutUs';
import Features from './components/Common/Features';
import HowItWorks from './components/Common/HowItWorks';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// Protected route component
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// Home route component with redirect logic
function HomeRoute() {
  const { user } = useAuth();
  
  if (user) {
    switch (user.role) {
      case 'doctor':
        return <Navigate to="/doctor" replace />;
      case 'supplier':
        return <Navigate to="/supplier" replace />;
      case 'hospital':
        return <Navigate to="/hospital" replace />;     
      default:
        break;
    }
  }
  
  return <HomePage />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/doctor" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorPortal />
              </ProtectedRoute>
            } />
            <Route path="/supplier" element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <SupplierDashboard />
              </ProtectedRoute>
            } />
            <Route path="/hospital" element={
              <ProtectedRoute allowedRoles={['hospital']}>
                <HospitalDashboard />
              </ProtectedRoute>
            } />            
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;