import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoyaltyPointsChart from './tabs/LoyaltyPointsChart';
import PatientDistributionChart from './tabs/PatientDistributionChart';
import Doctors from './tabs/Doctors';
import PatientManagement from './tabs/PatientManagement';
import SupplyInventory from './tabs/SupplyInventory';
import LoyaltyProgram from './tabs/LoyaltyProgram';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AppointmentManagement from './tabs/AppointmentManagement';

function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: '',
    patientName: '',
    doctorId: '',
    date: '',
    time: '',
    treatmentType: '',
    priority: 'Normal',
    notes: ''
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Enhanced mock data for better dashboard
  const recentAppointments = [
    {
      id: 'APT-001',
      patient: 'Amara Silva',
      patientId: 'PAT-2025-001',
      doctor: 'Dr. Sarah Mendis',
      treatment: 'Braces Adjustment',
      time: '9:30 AM',
      status: 'Completed',
      patientType: 'General'
    },
    {
      id: 'APT-002',
      patient: 'Dinesh Perera',
      patientId: 'PAT-2025-002',
      doctor: 'Dr. Sarah Mendis',
      treatment: 'New Braces Installation',
      time: '11:00 AM',
      status: 'In Progress',
      patientType: 'Low-Income'
    },
    {
      id: 'APT-003',
      patient: 'Malini Fernando',
      patientId: 'PAT-2025-003',
      doctor: 'Dr. Sarah Mendis',
      treatment: 'Retainer Fitting',
      time: '2:30 PM',
      status: 'Waiting',
      patientType: 'General'
    },
    {
      id: 'APT-004',
      patient: 'Kasun Rajapakse',
      patientId: 'PAT-2025-004',
      doctor: 'Dr. Nimal Perera',
      treatment: 'Initial Consultation',
      time: '3:45 PM',
      status: 'Scheduled',
      patientType: 'Low-Income'
    }
  ];

  const lowIncomeCases = [
    {
      id: 'LIC-001',
      patient: 'Priya Mendis',
      patientId: 'PAT-2025-005',
      treatment: 'Full Braces Treatment',
      doctor: 'Dr. Sarah Mendis',
      estimatedCost: 85000,
      pointsRequired: 850,
      status: 'Pending Approval',
      urgency: 'Medium',
      submittedDate: '2025-05-12'
    },
    {
      id: 'LIC-002',
      patient: 'Amal Fernando',
      patientId: 'PAT-2025-006',
      treatment: 'Retainer',
      doctor: 'Dr. Sarah Mendis',
      estimatedCost: 15000,
      pointsRequired: 150,
      status: 'Approved',
      urgency: 'Low',
      submittedDate: '2025-05-10',
      approvedDate: '2025-05-11'
    },
    {
      id: 'LIC-003',
      patient: 'Lakshmi Navaratne',
      patientId: 'PAT-2025-007',
      treatment: 'Palatal Expander',
      doctor: 'Dr. Nimal Perera',
      estimatedCost: 45000,
      pointsRequired: 450,
      status: 'In Review',
      urgency: 'High',
      submittedDate: '2025-05-13'
    },
    {
      id: 'LIC-004',
      patient: 'Chamara Silva',
      patientId: 'PAT-2025-008',
      treatment: 'Orthodontic Surgery',
      doctor: 'Dr. Sarah Mendis',
      estimatedCost: 125000,
      pointsRequired: 1250,
      status: 'Under Review',
      urgency: 'High',
      submittedDate: '2025-05-14'
    }
  ];

  // Available doctors data
  const availableDoctors = [
    {
      id: 'DR-001',
      name: 'Dr. Sarah Mendis',
      specialty: 'Orthodontist',
      status: 'Active',
      nextAvailable: '9:00 AM'
    },
    {
      id: 'DR-002', 
      name: 'Dr. Nimal Perera',
      specialty: 'Orthodontist',
      status: 'Active',
      nextAvailable: '10:30 AM'
    },
    {
      id: 'DR-003',
      name: 'Dr. Raj Perera', 
      specialty: 'Pediatric Orthodontist',
      status: 'Active',
      nextAvailable: '2:00 PM'
    },
    {
      id: 'DR-004',
      name: 'Dr. Kusal Peris',
      specialty: 'Oral Surgeon',
      status: 'Active', 
      nextAvailable: '11:00 AM'
    }
  ];

  // Handle appointment form changes
  const handleAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle appointment submission
  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    
    // Find selected doctor
    const selectedDoctor = availableDoctors.find(doc => doc.id === appointmentForm.doctorId);
    
    const newAppointment = {
      id: `APT-${String(recentAppointments.length + 1).padStart(3, '0')}`,
      patient: appointmentForm.patientName,
      patientId: appointmentForm.patientId,
      doctor: selectedDoctor ? selectedDoctor.name : 'Unknown Doctor',
      treatment: appointmentForm.treatmentType,
      time: appointmentForm.time,
      status: 'Scheduled',
      patientType: 'General'
    };

    // Add to appointments (in a real app, this would be an API call)
    console.log('New appointment scheduled:', newAppointment);
    
    // Reset form and close modal
    setAppointmentForm({
      patientId: '',
      patientName: '',
      doctorId: '',
      date: '',
      time: '',
      treatmentType: '',
      priority: 'Normal',
      notes: ''
    });
    setShowAppointmentModal(false);
    
    // Show success message (you can replace with a proper notification system)
    alert('Appointment scheduled successfully!');
  };

  const quickActions = [
    { 
      name: 'New Patient', 
      icon: 'user-add', 
      action: () => setActiveTab('patients'), 
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      description: 'Register new patient'
    },
    { 
      name: 'Order Supplies', 
      icon: 'package', 
      action: () => setActiveTab('inventory'), 
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      description: 'Manage inventory'
    },
    { 
      name: 'Loyalty Review', 
      icon: 'star', 
      action: () => setActiveTab('loyalty'), 
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      description: 'Review applications'
    },
    { 
      name: 'Schedule Appointment', 
      icon: 'calendar', 
      action: () => setShowAppointmentModal(true), 
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      description: 'Book appointment'
    }
  ];

  // Statistics calculations
  const totalPatients = 156;
  const todayAppointments = recentAppointments.length;
  const loyaltyPoints = 5230;
  const lowIncomePatients = lowIncomeCases.filter(c => c.status !== 'Approved').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-orange-100 text-orange-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipping': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getActionIcon = (icon, color) => {
    const iconClass = color.includes('blue') ? 'text-blue-600' : 
                     color.includes('green') ? 'text-green-600' : 
                     color.includes('purple') ? 'text-purple-600' : 'text-orange-600';
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icon === 'user-add' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />}
        {icon === 'package' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
        {icon === 'star' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
        {icon === 'calendar' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
      </svg>
    );
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
              <span className="mr-2">Lady Ridgeway Children's Hospital</span>
              <span className="bg-blue-600 rounded-full px-2 py-1 text-xs">Admin</span>
            </div>
            <div className="bg-white rounded-full p-1 h-10 w-10 flex items-center justify-center shadow-md">
              <span className="text-blue-600 font-bold">LR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 mb-6 md:mb-0 md:mr-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h2 className="text-white font-bold text-xl">Hospital Portal</h2>
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
                      onClick={() => setActiveTab('inventory')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'inventory' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Inventory                      
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('doctors')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'doctors' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Doctors
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('loyalty')}
                      className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center ${
                        activeTab === 'loyalty' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Loyalty Program                      
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

          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h2>                      
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                       onClick={() => setActiveTab('patients')}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Patients</p>
                        <h3 className="text-3xl font-bold mt-1">{totalPatients}</h3>
                        <p className="text-blue-100 text-xs mt-2">+12 this month</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                       onClick={() => setActiveTab('patients')}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Today's Appointments</p>
                        <h3 className="text-3xl font-bold mt-1">{todayAppointments}</h3>
                        <p className="text-blue-100 text-xs mt-2">3 completed</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                       onClick={() => setActiveTab('loyalty')}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Loyalty Points</p>
                        <h3 className="text-3xl font-bold mt-1">{loyaltyPoints.toLocaleString()}</h3>
                        <p className="text-blue-100 text-xs mt-2">+530 this month</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                       onClick={() => setActiveTab('loyalty')}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Low-Income Cases</p>
                        <h3 className="text-3xl font-bold mt-1">{lowIncomePatients}</h3>
                        <p className="text-blue-100 text-xs mt-2">Pending review</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className={`p-4 border-2 rounded-xl transition-all duration-200 ${action.color}`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className="p-3">
                            {getActionIcon(action.icon, action.color)}
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium text-gray-700 block">{action.name}</span>
                            <span className="text-xs text-gray-500">{action.description}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Appointments */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
                    <button 
                      onClick={() => setActiveTab('appointments')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                    >
                      View All
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentAppointments.map(appointment => (
                      <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                              {appointment.patientType === 'Low-Income' && (
                                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Low-Income
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{appointment.treatment}</p>
                            <p className="text-xs text-gray-500">{appointment.doctor}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <div className="text-sm font-medium text-gray-900 mt-1">{appointment.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charts Section - Full Width with Better Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Loyalty Points Trend</h3>
                    <div className="h-80 w-full flex items-center justify-center">
                      <div className="w-full h-full">
                        <LoyaltyPointsChart />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Patient Distribution</h3>
                    <div className="h-80 w-full flex items-center justify-center">
                      <div className="w-full h-full">
                        <PatientDistributionChart />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Low-Income Support Program */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Low-Income Support Program</h2>
                    <button 
                      onClick={() => setActiveTab('loyalty')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                    >
                      Manage All
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="py-3 px-4 text-left text-gray-600 font-medium">Patient</th>
                          <th className="py-3 px-4 text-left text-gray-600 font-medium">Treatment</th>
                          <th className="py-3 px-4 text-left text-gray-600 font-medium">Doctor</th>
                          <th className="py-3 px-4 text-left text-gray-600 font-medium">Points Required</th>
                          <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                          <th className="py-3 px-4 text-left text-gray-600 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lowIncomeCases.slice(0, 3).map(case_ => (
                          <tr key={case_.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium text-gray-900">{case_.patient}</div>
                                <div className="text-sm text-gray-500">{case_.patientId}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="text-sm text-gray-900">{case_.treatment}</div>
                                <div className="text-xs text-gray-500">Rs. {case_.estimatedCost.toLocaleString()}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900">{case_.doctor}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{case_.pointsRequired}</span>
                                <span className={`text-xs ${getUrgencyColor(case_.urgency)}`}>
                                  {case_.urgency}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                                {case_.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button 
                                onClick={() => setActiveTab('loyalty')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                  case_.status === 'Approved' 
                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                              >
                                {case_.status === 'Approved' ? 'View' : 'Review'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Other tabs */}
            {activeTab === 'inventory' && <SupplyInventory/>}
            {activeTab === 'doctors' && <Doctors />}
            {activeTab === 'patients' && <PatientManagement />}
            {activeTab === 'appointments' && <AppointmentManagement />}
            
            {/* Replace the old loyalty section with the new component */}
            {activeTab === 'loyalty' && <LoyaltyProgram />}
          </div>
        </div>
      </div>

      {/* Schedule Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Schedule New Appointment</h3>
              <button 
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleScheduleAppointment} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Patient ID *</label>
                  <input
                    type="text"
                    name="patientId"
                    value={appointmentForm.patientId}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="PAT-2025-XXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Patient Name *</label>
                  <input
                    type="text"
                    name="patientName"
                    value={appointmentForm.patientName}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Select Doctor *</label>
                  <select
                    name="doctorId"
                    value={appointmentForm.doctorId}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose available doctor</option>
                    {availableDoctors.filter(doc => doc.status === 'Active').map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty} (Next: {doctor.nextAvailable})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Treatment Type *</label>
                  <select
                    name="treatmentType"
                    value={appointmentForm.treatmentType}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select treatment</option>
                    <option value="Initial Consultation">Initial Consultation</option>
                    <option value="Braces Adjustment">Braces Adjustment</option>
                    <option value="Metal Braces Installation">Metal Braces Installation</option>
                    <option value="Ceramic Braces Installation">Ceramic Braces Installation</option>
                    <option value="Retainer Fitting">Retainer Fitting</option>
                    <option value="Palatal Expander Check">Palatal Expander Check</option>
                    <option value="Clear Aligners Progress Check">Clear Aligners Progress Check</option>
                    <option value="Follow-up Examination">Follow-up Examination</option>
                    <option value="Emergency Visit">Emergency Visit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={appointmentForm.date}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={appointmentForm.time}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                <select
                  name="priority"
                  value={appointmentForm.priority}
                  onChange={handleAppointmentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={appointmentForm.notes}
                  onChange={handleAppointmentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Any special requirements or notes for the appointment..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalDashboard;