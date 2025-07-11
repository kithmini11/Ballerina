import React, { useState } from 'react';

function Doctors() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All Specialties');
  const [statusFilter, setStatusFilter] = useState('All Doctors');
  
  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    qualifications: '',
    availability: 'Available',
    notes: ''
  });

  // Sample doctors data with schedule information
  const doctorsData = {
    'dr-sarah-mendis': {
      id: 'dr-sarah-mendis',
      name: 'Dr. Sarah Mendis',
      specialty: 'Senior Orthodontist',
      email: 'dr.sarah@dentix.lk',
      phone: '+94 76 123 4567',
      schedule: {
        today: {
          date: 'June 9, 2025',
          workingHours: '8:00 AM - 6:00 PM',
          breakTime: '12:00 PM - 1:00 PM',
          appointments: [
            {
              id: 'APT-001',
              time: '9:30 AM',
              patient: 'Amara Silva',
              patientId: 'PAT-2025-001',
              treatment: 'Braces Adjustment',
              duration: '30 min',
              status: 'Completed',
              type: 'Regular'
            },
            {
              id: 'APT-002',
              time: '10:30 AM',
              patient: 'Kamal Perera',
              patientId: 'PAT-2025-015',
              treatment: 'Initial Consultation',
              duration: '45 min',
              status: 'Completed',
              type: 'New Patient'
            },
            {
              id: 'APT-003',
              time: '2:00 PM',
              patient: 'Nisha Fernando',
              patientId: 'PAT-2025-023',
              treatment: 'Metal Braces Installation',
              duration: '60 min',
              status: 'In Progress',
              type: 'Treatment'
            },
            {
              id: 'APT-004',
              time: '3:30 PM',
              patient: 'Saman Rajapakse',
              patientId: 'PAT-2025-031',
              treatment: 'Follow-up Examination',
              duration: '30 min',
              status: 'Scheduled',
              type: 'Low-Income Support'
            },
            {
              id: 'APT-005',
              time: '4:30 PM',
              patient: 'Dilani Wijesinghe',
              patientId: 'PAT-2025-042',
              treatment: 'Retainer Fitting',
              duration: '45 min',
              status: 'Scheduled',
              type: 'Regular'
            }
          ]
        },
        stats: {
          totalPatientsToday: 14,
          completedToday: 6,
          scheduledToday: 8,
          nextAvailable: '15:30 PM',
          averageConsultationTime: '35 min'
        }
      }
    },
    'dr-raj-perera': {
      id: 'dr-raj-perera',
      name: 'Dr. Raj Perera',
      specialty: 'Orthodontist',
      email: 'dr.raj@dentix.lk',
      phone: '+94 77 789 1234',
      schedule: {
        today: {
          date: 'June 9, 2025',
          workingHours: '9:00 AM - 5:00 PM',
          breakTime: '1:00 PM - 2:00 PM',
          appointments: [
            {
              id: 'APT-006',
              time: '9:00 AM',
              patient: 'Malini Fernando',
              patientId: 'PAT-2025-003',
              treatment: 'Retainer Fitting',
              duration: '30 min',
              status: 'Completed',
              type: 'Regular'
            },
            {
              id: 'APT-007',
              time: '10:00 AM',
              patient: 'Tharaka Silva',
              patientId: 'PAT-2025-018',
              treatment: 'Ceramic Braces Installation',
              duration: '60 min',
              status: 'Completed',
              type: 'Treatment'
            },
            {
              id: 'APT-008',
              time: '2:30 PM',
              patient: 'Priya Mendis',
              patientId: 'PAT-2025-025',
              treatment: 'Braces Adjustment',
              duration: '30 min',
              status: 'Scheduled',
              type: 'Regular'
            },
            {
              id: 'APT-009',
              time: '3:30 PM',
              patient: 'Kasun Bandara',
              patientId: 'PAT-2025-038',
              treatment: 'Clear Aligners Progress Check',
              duration: '20 min',
              status: 'Scheduled',
              type: 'Regular'
            }
          ]
        },
        stats: {
          totalPatientsToday: 8,
          completedToday: 3,
          scheduledToday: 5,
          nextAvailable: '14:00 PM',
          averageConsultationTime: '32 min'
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('New doctor data:', newDoctor);
    
    // Reset form and close modal
    setNewDoctor({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialization: '',
      licenseNumber: '',
      experience: '',
      qualifications: '',
      availability: 'Available',
      notes: ''
    });
    setShowAddModal(false);
    
    // Show success message (you can replace with a proper notification system)
    alert('Doctor added successfully!');
  };

  const handleViewSchedule = (doctorId) => {
    const doctor = doctorsData[doctorId];
    if (doctor) {
      setSelectedDoctor(doctor);
      setShowScheduleModal(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Low-Income Support': return 'bg-yellow-100 text-yellow-800';
      case 'New Patient': return 'bg-blue-100 text-blue-800';
      case 'Treatment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Doctor
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Total Orthodontists</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600 mb-1">1</div>
            <div className="text-sm text-gray-600">Active Today</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600 mb-1">1</div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Doctor Directory</h3>
          <div className="flex space-x-2">
            <select 
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Specialties</option>
              <option>Orthodontists</option>
              <option>Oral Surgeons</option>
              <option>Pedodontists</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Doctors</option>
              <option>Active Today</option>
              <option>Off Duty</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doctor Card 1 */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-bold">SM</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Dr. Sarah Mendis</h4>
                  <p className="text-blue-100">Senior Orthodontist</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+94 76 123 4567</span>
              </div>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">dr.sarah@dentix.lk</span>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-green-600 font-medium">Active Today</span>
              </div>
              <div className="border-t pt-3 mt-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Patients Today:</span>
                  <span className="font-medium">14</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Next Available:</span>
                  <span className="font-medium">15:30 PM</span>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => handleViewSchedule('dr-sarah-mendis')}
                  className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View Full Schedule & Appointments
                </button>
              </div>
            </div>
          </div>

          {/* Doctor Card 2 */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-green-600 text-xl font-bold">RP</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Dr. Raj Perera</h4>
                  <p className="text-green-100">Orthodontist</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+94 77 789 1234</span>
              </div>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">dr.raj@dentix.lk</span>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-green-600 font-medium">Active Today</span>
              </div>
              <div className="border-t pt-3 mt-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Patients Today:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Next Available:</span>
                  <span className="font-medium">14:00 PM</span>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => handleViewSchedule('dr-raj-perera')}
                  className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm hover:bg-green-200 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View Full Schedule & Appointments
                </button>
              </div>
            </div>
          </div>          

          {/* Doctor Card 3 */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 text-white">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-indigo-600 text-xl font-bold">LG</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Dr. Lasith Gunasekara</h4>
                  <p className="text-indigo-100">Orthodontist</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+94 72 890 1234</span>
              </div>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">dr.lasith@dentix.lk</span>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-600 font-medium">On Leave</span>
              </div>
              <div className="border-t pt-3 mt-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Specialty:</span>
                  <span className="font-medium">Complex Cases</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Returns:</span>
                  <span className="font-medium">Jun 5, 2025</span>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm cursor-not-allowed flex items-center justify-center" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Currently On Leave - Schedule Unavailable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule and Appointments Modal */}
      {showScheduleModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{selectedDoctor.name} - Schedule & Appointments</h3>
                <p className="text-gray-600">{selectedDoctor.specialty} • {selectedDoctor.schedule.today.date}</p>
              </div>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {/* Doctor Info and Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{selectedDoctor.email}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-600">{selectedDoctor.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Today's Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Working Hours:</span>
                      <span className="font-medium">{selectedDoctor.schedule.today.workingHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Break Time:</span>
                      <span className="font-medium">{selectedDoctor.schedule.today.breakTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Available:</span>
                      <span className="font-medium text-green-600">{selectedDoctor.schedule.stats.nextAvailable}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Today's Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Patients:</span>
                      <span className="font-medium">{selectedDoctor.schedule.stats.totalPatientsToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium text-green-600">{selectedDoctor.schedule.stats.completedToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scheduled:</span>
                      <span className="font-medium text-blue-600">{selectedDoctor.schedule.stats.scheduledToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Duration:</span>
                      <span className="font-medium">{selectedDoctor.schedule.stats.averageConsultationTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointments List */}
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b bg-gray-50">
                  <h4 className="font-semibold text-gray-800">Today's Appointments</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Time</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Patient</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Treatment</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Duration</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Type</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDoctor.schedule.today.appointments.map((appointment, index) => (
                        <tr key={appointment.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="py-3 px-4 font-medium text-gray-900">{appointment.time}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{appointment.patient}</div>
                              <div className="text-sm text-gray-500">{appointment.patientId}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-900">{appointment.treatment}</td>
                          <td className="py-3 px-4 text-gray-600">{appointment.duration}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                              {appointment.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Schedule New Appointment
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  View Full Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Add New Doctor</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddDoctor} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={newDoctor.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newDoctor.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={newDoctor.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="doctor@dentix.lk"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newDoctor.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+94 XX XXX XXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Specialization *</label>
                    <select
                      name="specialization"
                      value={newDoctor.specialization}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Specialization</option>
                      <option value="Orthodontist">Orthodontist</option>
                      <option value="Senior Orthodontist">Senior Orthodontist</option>
                      <option value="Pediatric Orthodontist">Pediatric Orthodontist</option>
                      <option value="Oral Surgeon">Oral Surgeon</option>
                      <option value="General Dentist">General Dentist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">License Number *</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={newDoctor.licenseNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="SL-DC-XXXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Years of Experience *</label>
                    <input
                      type="number"
                      name="experience"
                      value={newDoctor.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Availability Status</label>
                    <select
                      name="availability"
                      value={newDoctor.availability}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Available">Available</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Qualifications</label>
                    <textarea
                      name="qualifications"
                      value={newDoctor.qualifications}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="BDS, MDS, Orthodontics certifications, etc."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={newDoctor.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Any additional information about the doctor..."
                    ></textarea>
                  </div>
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
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;