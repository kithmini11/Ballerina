import React, { useState } from 'react';

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    guardian: '',
    guardianPhone: '',
    address: '',
    medicalHistory: '',
    treatmentType: '',
    doctorId: '',
    isLowIncome: false,
    urgency: 'Normal'
  });

  // Enhanced mock data for orthodontic patients
  const patients = [
    {
      id: 'PAT-2025-001',
      firstName: 'Amara',
      lastName: 'Silva',
      age: 14,
      gender: 'Female',
      email: 'asilva@gmail.com',
      phone: '+94 77 123 4567',
      guardian: 'Mrs. Kumari Silva',
      guardianPhone: '+94 71 234 5678',
      treatment: 'Metal Braces',
      doctor: 'Dr. Sarah Mendis',
      status: 'Active Treatment',
      category: 'General',
      nextAppointment: '2025-06-15',
      treatmentProgress: 65,
      estimatedCompletion: '2025-12-15',
      totalCost: 85000,
      paidAmount: 55000,
      registeredDate: '2025-01-15',
      medicalHistory: 'No significant medical history',
      treatmentNotes: 'Good compliance with oral hygiene'
    },
    {
      id: 'PAT-2025-002',
      firstName: 'Dinesh',
      lastName: 'Perera',
      age: 16,
      gender: 'Male',
      email: 'dperera@yahoo.com',
      phone: '+94 76 987 6543',
      guardian: 'Mr. Sunil Perera',
      guardianPhone: '+94 75 345 6789',
      treatment: 'Ceramic Braces',
      doctor: 'Dr. Sarah Mendis',
      status: 'Low-Income Support',
      category: 'Low-Income',
      nextAppointment: '2025-06-20',
      treatmentProgress: 30,
      estimatedCompletion: '2026-02-20',
      totalCost: 95000,
      paidAmount: 0,
      supportPoints: 950,
      registeredDate: '2025-03-10',
      medicalHistory: 'Mild asthma',
      treatmentNotes: 'Family qualifies for low-income support program'
    },
    {
      id: 'PAT-2025-003',
      firstName: 'Malini',
      lastName: 'Fernando',
      age: 15,
      gender: 'Female',
      email: 'mfernando@gmail.com',
      phone: '+94 78 555 1234',
      guardian: 'Mrs. Nayomi Fernando',
      guardianPhone: '+94 77 456 7890',
      treatment: 'Retainer',
      doctor: 'Dr. Raj Perera',
      status: 'Maintenance',
      category: 'General',
      nextAppointment: '2025-07-02',
      treatmentProgress: 100,
      estimatedCompletion: 'Completed',
      totalCost: 15000,
      paidAmount: 15000,
      registeredDate: '2024-08-20',
      medicalHistory: 'No allergies',
      treatmentNotes: 'Treatment completed successfully, regular check-ups required'
    },
    {
      id: 'PAT-2025-004',
      firstName: 'Kumara',
      lastName: 'Jayawardene',
      age: 13,
      gender: 'Male',
      email: 'kjaya@outlook.com',
      phone: '+94 75 777 8888',
      guardian: 'Mr. Rohan Jayawardene',
      guardianPhone: '+94 74 567 8901',
      treatment: 'Palatal Expander',
      doctor: 'Dr. Raj Perera',
      status: 'New Patient',
      category: 'General',
      nextAppointment: '2025-06-05',
      treatmentProgress: 10,
      estimatedCompletion: '2025-10-05',
      totalCost: 45000,
      paidAmount: 15000,
      registeredDate: '2025-05-20',
      medicalHistory: 'Previous dental trauma',
      treatmentNotes: 'Initial assessment completed, treatment plan approved'
    },
    {
      id: 'PAT-2025-005',
      firstName: 'Priya',
      lastName: 'Mendis',
      age: 12,
      gender: 'Female',
      email: 'pmendis@gmail.com',
      phone: '+94 76 333 4444',
      guardian: 'Mrs. Kumari Mendis',
      guardianPhone: '+94 75 678 9012',
      treatment: 'Full Braces Treatment',
      doctor: 'Dr. Sarah Mendis',
      status: 'Pending Approval',
      category: 'Low-Income',
      nextAppointment: 'Pending',
      treatmentProgress: 0,
      estimatedCompletion: 'TBD',
      totalCost: 85000,
      paidAmount: 0,
      supportPoints: 850,
      registeredDate: '2025-05-12',
      medicalHistory: 'No significant medical history',
      treatmentNotes: 'Awaiting low-income support approval'
    }
  ];

  const doctors = [
    { id: 'DR-001', name: 'Dr. Sarah Mendis', specialty: 'Orthodontist' },
    { id: 'DR-002', name: 'Dr. Raj Perera', specialty: 'Pediatric Orthodontist' },
    { id: 'DR-003', name: 'Dr. Nimal Perera', specialty: 'Orthodontist' },
    { id: 'DR-004', name: 'Dr. Kusal Peris', specialty: 'Oral Surgeon' }
  ];

  const treatmentTypes = [
    'Metal Braces',
    'Ceramic Braces',
    'Clear Aligners',
    'Palatal Expander',
    'Retainer',
    'Headgear',
    'Space Maintainer'
  ];

  // Filter patients based on active tab and search
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.treatment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'active' && patient.status === 'Active Treatment') ||
      (activeTab === 'low-income' && patient.category === 'Low-Income') ||
      (activeTab === 'new' && patient.status === 'New Patient') ||
      (activeTab === 'maintenance' && patient.status === 'Maintenance');

    return matchesSearch && matchesTab;
  });

  // Statistics
  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'Active Treatment').length,
    lowIncome: patients.filter(p => p.category === 'Low-Income').length,
    newThisMonth: patients.filter(p => new Date(p.registeredDate) > new Date('2025-05-01')).length
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    // Add patient logic here
    console.log('New patient:', newPatient);
    setShowAddModal(false);
    // Reset form
    setNewPatient({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      guardian: '',
      guardianPhone: '',
      address: '',
      medicalHistory: '',
      treatmentType: '',
      doctorId: '',
      isLowIncome: false,
      urgency: 'Normal'
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active Treatment': return 'bg-green-100 text-green-800';
      case 'Low-Income Support': return 'bg-purple-100 text-purple-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      case 'New Patient': return 'bg-indigo-100 text-indigo-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadge = (category) => {
    if (category === 'Low-Income') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 ml-2">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          Low-Income
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Patient Management</h2>
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Patient
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Treatments</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.lowIncome}</div>
            <div className="text-sm text-gray-600">Low-Income Support</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.newThisMonth}</div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'all', label: 'All Patients', count: stats.total },
            { id: 'active', label: 'Active Treatment', count: stats.active },
            { id: 'low-income', label: 'Low-Income Support', count: stats.lowIncome },
            { id: 'new', label: 'New Patients', count: 1 },
            { id: 'maintenance', label: 'Maintenance', count: 1 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {patient.firstName[0]}{patient.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                          {getCategoryBadge(patient.category)}
                        </div>
                        <div className="text-sm text-gray-500">{patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age} / {patient.gender[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.treatment}</div>
                    <div className="text-xs text-gray-500">
                      Rs. {patient.totalCost.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${patient.treatmentProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{patient.treatmentProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.nextAppointment === 'Pending' ? (
                      <span className="text-yellow-600">Pending</span>
                    ) : (
                      new Date(patient.nextAppointment).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedPatient(patient);
                        setShowPatientDetails(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
          <div className="flex space-x-2">
            <button className="border rounded-md px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100">
              Previous
            </button>
            <button className="border rounded-md px-3 py-1 text-sm bg-blue-600 text-white">
              1
            </button>
            <button className="border rounded-md px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100">
              2
            </button>
            <button className="border rounded-md px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Add New Patient</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddPatient} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={newPatient.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newPatient.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Age *</label>
                    <input
                      type="number"
                      name="age"
                      value={newPatient.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Gender *</label>
                    <select
                      name="gender"
                      value={newPatient.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newPatient.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newPatient.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+94 XX XXX XXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Guardian Name *</label>
                    <input
                      type="text"
                      name="guardian"
                      value={newPatient.guardian}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Guardian Phone *</label>
                    <input
                      type="tel"
                      name="guardianPhone"
                      value={newPatient.guardianPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+94 XX XXX XXXX"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                  <textarea
                    name="address"
                    value={newPatient.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              {/* Treatment Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Treatment Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Treatment Type *</label>
                    <select
                      name="treatmentType"
                      value={newPatient.treatmentType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Treatment</option>
                      {treatmentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Assigned Doctor *</label>
                    <select
                      name="doctorId"
                      value={newPatient.doctorId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Urgency Level</label>
                    <select
                      name="urgency"
                      value={newPatient.urgency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isLowIncome"
                      checked={newPatient.isLowIncome}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Apply for Low-Income Support Program
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Medical History</label>
                  <textarea
                    name="medicalHistory"
                    value={newPatient.medicalHistory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Any relevant medical history, allergies, or conditions..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {showPatientDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Patient Details - {selectedPatient.firstName} {selectedPatient.lastName}
              </h3>
              <button 
                onClick={() => setShowPatientDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Patient Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="space-y-3">
                    <div><strong>ID:</strong> {selectedPatient.id}</div>
                    <div><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</div>
                    <div><strong>Age:</strong> {selectedPatient.age} years</div>
                    <div><strong>Gender:</strong> {selectedPatient.gender}</div>
                    <div><strong>Email:</strong> {selectedPatient.email}</div>
                    <div><strong>Phone:</strong> {selectedPatient.phone}</div>
                    <div><strong>Guardian:</strong> {selectedPatient.guardian}</div>
                    <div><strong>Guardian Phone:</strong> {selectedPatient.guardianPhone}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Treatment Information</h4>
                  <div className="space-y-3">
                    <div><strong>Treatment:</strong> {selectedPatient.treatment}</div>
                    <div><strong>Doctor:</strong> {selectedPatient.doctor}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPatient.status)}`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                    <div><strong>Progress:</strong> {selectedPatient.treatmentProgress}%</div>
                    <div><strong>Total Cost:</strong> Rs. {selectedPatient.totalCost.toLocaleString()}</div>
                    <div><strong>Paid Amount:</strong> Rs. {selectedPatient.paidAmount.toLocaleString()}</div>
                    <div><strong>Next Appointment:</strong> {selectedPatient.nextAppointment}</div>
                    <div><strong>Registered:</strong> {new Date(selectedPatient.registeredDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {/* Treatment Progress */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Treatment Progress</h4>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium" 
                    style={{ width: `${selectedPatient.treatmentProgress}%` }}
                  >
                    {selectedPatient.treatmentProgress}%
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Estimated completion: {selectedPatient.estimatedCompletion}
                </p>
              </div>

              {/* Medical History & Notes */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Medical History</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedPatient.medicalHistory}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Treatment Notes</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedPatient.treatmentNotes}</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowPatientDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Edit Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;