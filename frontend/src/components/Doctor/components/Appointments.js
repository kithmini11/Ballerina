import React, { useState } from 'react';

function Appointments() {
  const [activeView, setActiveView] = useState('today');
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointments data relevant to orthodontic care
  const [appointments, setAppointments] = useState([
    {
      id: 'APT-001',
      time: '9:30 AM',
      patient: { name: 'Amara Silva', id: 'PAT-2025-001', age: 16, phone: '+94 77 123 4567' },
      type: 'Braces Adjustment',
      duration: '30 min',
      status: 'Completed',
      priority: 'Normal',
      notes: 'Monthly adjustment - wire change required',
      isLowIncome: false
    },
    {
      id: 'APT-002',
      time: '11:00 AM',
      patient: { name: 'Dinesh Perera', id: 'PAT-2025-002', age: 14, phone: '+94 71 987 6543' },
      type: 'Metal Braces Installation',
      duration: '60 min',
      status: 'In Progress',
      priority: 'High',
      notes: 'First braces installation - low-income support patient',
      isLowIncome: true
    },
    {
      id: 'APT-003',
      time: '2:30 PM',
      patient: { name: 'Malini Fernando', id: 'PAT-2025-003', age: 15, phone: '+94 76 555 7890' },
      type: 'Retainer Fitting',
      duration: '30 min',
      status: 'Waiting',
      priority: 'Normal',
      notes: 'Custom retainer ready for fitting',
      isLowIncome: false
    },
    {
      id: 'APT-004',
      time: '4:00 PM',
      patient: { name: 'Tharushi Jayawardena', id: 'PAT-2025-004', age: 13, phone: '+94 70 444 1234' },
      type: 'Palatal Expander Check',
      duration: '25 min',
      status: 'Scheduled',
      priority: 'Normal',
      notes: 'Weekly expansion check and adjustment',
      isLowIncome: false
    },
    {
      id: 'APT-005',
      time: '5:00 PM',
      patient: { name: 'Kasun Bandara', id: 'PAT-2025-005', age: 17, phone: '+94 75 888 9999' },
      type: 'Clear Aligners Progress Check',
      duration: '20 min',
      status: 'Scheduled',
      priority: 'Normal',
      notes: 'Check progress and provide next set of aligners',
      isLowIncome: false
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    patientName: '',
    date: '',
    time: '',
    type: '',
    duration: '30',
    priority: 'Normal',
    notes: ''
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Normal': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleUpdateStatus = (appointmentId, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    const newApt = {
      id: `APT-${String(appointments.length + 1).padStart(3, '0')}`,
      time: newAppointment.time,
      patient: { 
        name: newAppointment.patientName, 
        id: newAppointment.patientId,
        phone: '+94 XX XXX XXXX'
      },
      type: newAppointment.type,
      duration: `${newAppointment.duration} min`,
      status: 'Scheduled',
      priority: newAppointment.priority,
      notes: newAppointment.notes,
      isLowIncome: false
    };
    
    setAppointments([...appointments, newApt]);
    setShowNewAppointmentModal(false);
    setNewAppointment({
      patientId: '', patientName: '', date: '', time: '',
      type: '', duration: '30', priority: 'Normal', notes: ''
    });
  };

  // Calculate statistics
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
  const inProgressAppointments = appointments.filter(a => a.status === 'In Progress').length;
  const scheduledAppointments = appointments.filter(a => a.status === 'Scheduled').length;
  const waitingAppointments = appointments.filter(a => a.status === 'Waiting').length;
  const highPriorityAppointments = appointments.filter(a => a.priority === 'High').length;
  const lowIncomeAppointments = appointments.filter(a => a.isLowIncome).length;

  // Calculate total estimated time
  const totalDuration = appointments.reduce((total, apt) => {
    return total + parseInt(apt.duration.replace(' min', ''));
  }, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
        <div className="text-sm text-gray-500">
          Today: June 9, 2025 | {appointments.length} appointments
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Appointments</h3>
              <p className="text-2xl font-bold text-blue-600">{totalAppointments}</p>
              <p className="text-sm text-blue-500">Today's schedule</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{completedAppointments}</p>
              <p className="text-sm text-green-500">Successfully finished</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">In Progress/Waiting</h3>
              <p className="text-2xl font-bold text-yellow-600">{inProgressAppointments + waitingAppointments}</p>
              <p className="text-sm text-yellow-500">Active treatments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Low-Income Support</h3>
              <p className="text-2xl font-bold text-purple-600">{lowIncomeAppointments}</p>
              <p className="text-sm text-purple-500">Support program patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">High Priority</h3>
              <p className="text-2xl font-bold text-red-600">{highPriorityAppointments}</p>
              <p className="text-sm text-red-500">Urgent appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Duration</h3>
              <p className="text-2xl font-bold text-indigo-600">{totalDuration}</p>
              <p className="text-sm text-indigo-500">Minutes scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v14a2 2 0 002 2m0 0h2a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Scheduled</h3>
              <p className="text-2xl font-bold text-gray-600">{scheduledAppointments}</p>
              <p className="text-sm text-gray-500">Upcoming appointments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Appointment Management</h3>
          <button 
            onClick={() => setShowNewAppointmentModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Appointment
          </button>
        </div>
        
        {/* View Controls and Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveView('today')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeView === 'today' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
              }`}
            >
              Today ({appointments.length})
            </button>
            <button 
              onClick={() => setActiveView('week')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeView === 'week' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
              }`}
            >
              This Week
            </button>
            <button 
              onClick={() => setActiveView('month')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeView === 'month' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
              }`}
            >
              This Month
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="flex space-x-4 text-sm">
            <div className="text-green-600">
              <span className="font-medium">{completedAppointments}</span> Completed
            </div>
            <div className="text-blue-600">
              <span className="font-medium">{inProgressAppointments}</span> In Progress
            </div>
            <div className="text-yellow-600">
              <span className="font-medium">{waitingAppointments}</span> Waiting
            </div>
            <div className="text-gray-600">
              <span className="font-medium">{scheduledAppointments}</span> Scheduled
            </div>
          </div>
        </div>
        
        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Time</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Patient</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Treatment Type</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Duration</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Priority</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-900">{appointment.time}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900 flex items-center">
                          {appointment.patient.name}
                          {appointment.isLowIncome && (
                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              Low-Income Support
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">ID: {appointment.patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{appointment.type}</td>
                  <td className="py-4 px-4 text-gray-600">{appointment.duration}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewAppointment(appointment)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {appointment.status === 'Scheduled' && (
                        <button 
                          onClick={() => handleUpdateStatus(appointment.id, 'In Progress')}
                          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                          title="Start Appointment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8M7 7h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
                          </svg>
                        </button>
                      )}
                      {appointment.status === 'In Progress' && (
                        <button 
                          onClick={() => handleUpdateStatus(appointment.id, 'Completed')}
                          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                          title="Complete Appointment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50" title="Edit Appointment">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Schedule New Appointment</h3>
              <button 
                onClick={() => setShowNewAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitAppointment} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Patient ID *</label>
                  <input
                    type="text"
                    name="patientId"
                    value={newAppointment.patientId}
                    onChange={handleInputChange}
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
                    value={newAppointment.patientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Treatment Type *</label>
                  <select
                    name="type"
                    value={newAppointment.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select treatment type</option>
                    <option value="Initial Consultation">Initial Consultation</option>
                    <option value="Braces Adjustment">Braces Adjustment</option>
                    <option value="Metal Braces Installation">Metal Braces Installation</option>
                    <option value="Ceramic Braces Installation">Ceramic Braces Installation</option>
                    <option value="Clear Aligners Progress Check">Clear Aligners Progress Check</option>
                    <option value="Retainer Fitting">Retainer Fitting</option>
                    <option value="Palatal Expander Check">Palatal Expander Check</option>
                    <option value="Follow-up Examination">Follow-up Examination</option>
                    <option value="Emergency Visit">Emergency Visit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Duration (minutes) *</label>
                  <select
                    name="duration"
                    value={newAppointment.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="15">15 minutes</option>
                    <option value="20">20 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                <select
                  name="priority"
                  value={newAppointment.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={newAppointment.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Additional notes for the appointment..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
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

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Appointment Details</h3>
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Appointment ID:</span> {selectedAppointment.id}</div>
                <div><span className="font-medium">Time:</span> {selectedAppointment.time}</div>
                <div><span className="font-medium">Patient:</span> {selectedAppointment.patient.name}</div>
                <div><span className="font-medium">Patient ID:</span> {selectedAppointment.patient.id}</div>
                <div><span className="font-medium">Treatment:</span> {selectedAppointment.type}</div>
                <div><span className="font-medium">Duration:</span> {selectedAppointment.duration}</div>
                <div><span className="font-medium">Priority:</span> {selectedAppointment.priority}</div>
                <div>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>
              
              {selectedAppointment.notes && (
                <div>
                  <span className="font-medium">Notes:</span>
                  <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedAppointment.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Edit Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;