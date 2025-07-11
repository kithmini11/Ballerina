import React, { useState } from 'react';

function PatientManagement() {
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);

  const [patients, setPatients] = useState([
    { 
      id: 'PAT-2025-001', 
      name: 'Amara Silva', 
      email: 'asilva@gmail.com',
      age: 16, 
      gender: 'F',
      treatment: 'Metal Braces', 
      nextAppointment: '2025-06-15', 
      status: 'Active',
      isLowIncome: false,
      phone: '+94 77 123 4567',
      registrationDate: '2025-01-15',
      lastVisit: '2025-05-20',
      notes: 'Regular checkups required for braces adjustment'
    },
    { 
      id: 'PAT-2025-002', 
      name: 'Dinesh Perera', 
      email: 'dperera@yahoo.com',
      age: 14, 
      gender: 'M',
      treatment: 'Ceramic Braces', 
      nextAppointment: '2025-06-18', 
      status: 'Active',
      isLowIncome: true,
      phone: '+94 71 987 6543',
      registrationDate: '2025-02-10',
      lastVisit: '2025-05-18',
      notes: 'Enrolled in low-income support program'
    },
    { 
      id: 'PAT-2025-003', 
      name: 'Malini Fernando', 
      email: 'mfernando@gmail.com',
      age: 15, 
      gender: 'F',
      treatment: 'Retainer', 
      nextAppointment: '2025-07-02', 
      status: 'Maintenance',
      isLowIncome: false,
      phone: '+94 76 555 7890',
      registrationDate: '2024-11-05',
      lastVisit: '2025-05-15',
      notes: 'Treatment completed, maintenance phase'
    },
    { 
      id: 'PAT-2025-004', 
      name: 'Tharushi Jayawardena', 
      email: 'tjaya@gmail.com',
      age: 13, 
      gender: 'F',
      treatment: 'Palatal Expander', 
      nextAppointment: '2025-06-22', 
      status: 'Waiting for Supplies',
      isLowIncome: false,
      phone: '+94 70 444 1234',
      registrationDate: '2025-03-12',
      lastVisit: '2025-05-25',
      notes: 'Waiting for custom palatal expander delivery'
    },
    { 
      id: 'PAT-2025-005', 
      name: 'Kasun Bandara', 
      email: 'kbandara@gmail.com',
      age: 17, 
      gender: 'M',
      treatment: 'Clear Aligners', 
      nextAppointment: '2025-06-25', 
      status: 'Active',
      isLowIncome: false,
      phone: '+94 75 888 9999',
      registrationDate: '2025-04-01',
      lastVisit: '2025-05-22',
      notes: 'Advanced aligner treatment for complex case'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    treatment: '',
    appointment: '',
    notes: '',
    isLowIncome: false
  });

  // Filter and search patients
  const filteredPatients = patients.filter(patient => {
    const matchesStatus = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = !searchTerm || 
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch(sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'age': return b.age - a.age;
      case 'date': return new Date(b.nextAppointment) - new Date(a.nextAppointment);
      case 'status': return a.status.localeCompare(b.status);
      default: return 0;
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: `PAT-2025-${String(patients.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      gender: formData.gender,
      treatment: formData.treatment,
      nextAppointment: formData.appointment,
      status: 'New Patient',
      isLowIncome: formData.isLowIncome,
      phone: formData.phone,
      registrationDate: new Date().toISOString().split('T')[0],
      lastVisit: null,
      notes: formData.notes
    };
    
    setPatients([...patients, newPatient]);
    setShowNewPatientForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      treatment: '',
      appointment: '',
      notes: '',
      isLowIncome: false
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'New Patient':
        return 'bg-indigo-100 text-indigo-800';
      case 'Waiting for Supplies':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getInitialsColor = (name) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-yellow-100 text-yellow-600',
      'bg-red-100 text-red-600'
    ];
    return colors[name.length % colors.length];
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  // Statistics
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'Active').length;
  const lowIncomePatients = patients.filter(p => p.isLowIncome).length;
  const waitingForSupplies = patients.filter(p => p.status === 'Waiting for Supplies').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
        <button 
          onClick={() => setShowNewPatientForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Patient
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Patients</h3>
          <p className="text-2xl font-bold text-blue-600">{totalPatients}</p>
          <p className="text-sm text-blue-500">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Treatments</h3>
          <p className="text-2xl font-bold text-green-600">{activePatients}</p>
          <p className="text-sm text-green-500">Currently treated</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Low-Income Patients</h3>
          <p className="text-2xl font-bold text-purple-600">{lowIncomePatients}</p>
          <p className="text-sm text-purple-500">Support program</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Waiting for Supplies</h3>
          <p className="text-2xl font-bold text-red-600">{waitingForSupplies}</p>
          <p className="text-sm text-red-500">Needs attention</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active ({patients.filter(p => p.status === 'Active').length})</option>
              <option value="maintenance">Maintenance ({patients.filter(p => p.status === 'Maintenance').length})</option>
              <option value="new patient">New Patient ({patients.filter(p => p.status === 'New Patient').length})</option>
              <option value="waiting for supplies">Waiting for Supplies ({patients.filter(p => p.status === 'Waiting for Supplies').length})</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="age">Sort by Age</option>
              <option value="date">Sort by Appointment</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Search by Patient ID, name or email..." 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setFilterStatus('all');
                setSortBy('name');
                setSearchTerm('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age/Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Treatment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center ${getInitialsColor(patient.name)}`}>
                        <span className="font-medium">{getInitials(patient.name)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.treatment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(patient.status)}`}>
                        {patient.status}
                      </span>
                      {patient.isLowIncome && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Low-Income Support
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.nextAppointment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewPatient(patient)}
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

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">Showing {sortedPatients.length} patients</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* No Results */}
      {sortedPatients.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Patient Details Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Patient Details - {selectedPatient.id}</h3>
                  <p className="text-sm text-gray-600">{selectedPatient.name}</p>
                </div>
                <button 
                  onClick={() => setShowPatientModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Patient ID:</span> {selectedPatient.id}</div>
                    <div><span className="font-medium">Full Name:</span> {selectedPatient.name}</div>
                    <div><span className="font-medium">Age:</span> {selectedPatient.age} years</div>
                    <div><span className="font-medium">Gender:</span> {selectedPatient.gender === 'M' ? 'Male' : 'Female'}</div>
                    <div><span className="font-medium">Email:</span> {selectedPatient.email}</div>
                    <div><span className="font-medium">Phone:</span> {selectedPatient.phone}</div>
                    <div><span className="font-medium">Registration Date:</span> {selectedPatient.registrationDate}</div>
                  </div>
                </div>

                {/* Treatment Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Treatment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Treatment:</span> {selectedPatient.treatment}</div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${getStatusBadge(selectedPatient.status)}`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                    <div><span className="font-medium">Next Appointment:</span> {selectedPatient.nextAppointment}</div>
                    <div><span className="font-medium">Last Visit:</span> {selectedPatient.lastVisit || 'N/A'}</div>
                    <div><span className="font-medium">Low-Income Support:</span> {selectedPatient.isLowIncome ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedPatient.notes && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Notes</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedPatient.notes}</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Patient since {new Date(selectedPatient.registrationDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowPatientModal(false)}
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
        </div>
      )}

      {/* Add New Patient Modal */}
      {showNewPatientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Patient</h3>
                <button 
                  onClick={() => setShowNewPatientForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddPatient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="patient@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+94 XX XXX XXXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                      Age *
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Age"
                      min="1"
                      max="100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment">
                      Treatment Type *
                    </label>
                    <select
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select treatment type</option>
                      <option value="Initial Consultation">Initial Consultation</option>
                      <option value="Metal Braces">Metal Braces</option>
                      <option value="Ceramic Braces">Ceramic Braces</option>
                      <option value="Clear Aligners">Clear Aligners</option>
                      <option value="Retainer">Retainer</option>
                      <option value="Palatal Expander">Palatal Expander</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointment">
                      First Appointment *
                    </label>
                    <input
                      id="appointment"
                      name="appointment"
                      type="date"
                      value={formData.appointment}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Add any notes about the patient's condition or special requirements"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="isLowIncome"
                    name="isLowIncome"
                    type="checkbox"
                    checked={formData.isLowIncome}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isLowIncome" className="ml-2 block text-sm text-gray-900">
                    Mark as low-income patient (eligible for support program)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowNewPatientForm(false)}
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
        </div>
      )}
    </div>
  );
}

export default PatientManagement;