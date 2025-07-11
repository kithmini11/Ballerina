import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardOverview from './components/DashboardOverview';
import PatientManagement from './components/PatientManagement';
import SupplyOrders from './components/SupplyOrders';
import Appointments from './components/Appointments';
import HospitalCoordination from './components/HospitalCoordination';

function DoctorPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'patients':
        return <PatientManagement />;
      case 'supplies':
        return <SupplyOrders />;
      case 'appointments':
        return <Appointments />;
      case 'hospital':
        return <HospitalCoordination />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <header className="bg-gradient-to-r from-blue-300 to-blue-400 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
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
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-white">
              <span className="mr-2">Dr. Sarah Mendis</span>
              <span className="bg-blue-600 rounded-full px-2 py-1 text-xs">Orthodontist</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Doctor Dashboard Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar / Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-white font-bold text-xl">Doctor Portal</h2>
                    <p className="text-blue-100 text-sm">Dr. Sarah Mendis</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'dashboard' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('patients')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'patients' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Patients
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('supplies')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'supplies' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Prescriptions
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('appointments')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'appointments' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Appointments
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('hospital')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'hospital' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Hospital Coordination
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="p-4 border-t">
                <button 
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorPortal;