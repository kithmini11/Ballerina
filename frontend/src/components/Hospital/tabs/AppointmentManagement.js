import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function AppointmentManagement() {
  const [viewMode, setViewMode] = useState('today'); // 'list', 'calendar', 'today'
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  // Appointment form state
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

  // Extended appointments data with more realistic entries
  const allAppointments = [
    {
      id: 'APT-001',
      patient: 'Amara Silva',
      patientId: 'PAT-2025-001',
      doctor: 'Dr. Sarah Mendis',
      doctorId: 'DR-001',
      treatment: 'Braces Adjustment',
      date: '2025-06-09',
      time: '09:30',
      status: 'Completed',
      patientType: 'General',
      priority: 'Normal',
      notes: 'Regular adjustment, good progress'
    },
    {
      id: 'APT-002',
      patient: 'Dinesh Perera',
      patientId: 'PAT-2025-002',
      doctor: 'Dr. Sarah Mendis',
      doctorId: 'DR-001',
      treatment: 'Metal Braces Installation',
      date: '2025-06-09',
      time: '11:00',
      status: 'In Progress',
      patientType: 'Low-Income',
      priority: 'Medium',
      notes: 'First time braces installation'
    },
    {
      id: 'APT-003',
      patient: 'Malini Fernando',
      patientId: 'PAT-2025-003',
      doctor: 'Dr. Nimal Perera',
      doctorId: 'DR-002',
      treatment: 'Retainer Fitting',
      date: '2025-06-09',
      time: '14:30',
      status: 'Scheduled',
      patientType: 'General',
      priority: 'Normal',
      notes: 'Final retainer fitting'
    },
    {
      id: 'APT-004',
      patient: 'Kasun Rajapakse',
      patientId: 'PAT-2025-004',
      doctor: 'Dr. Raj Perera',
      doctorId: 'DR-003',
      treatment: 'Initial Consultation',
      date: '2025-06-09',
      time: '15:45',
      status: 'Scheduled',
      patientType: 'Low-Income',
      priority: 'High',
      notes: 'Urgent case, requires immediate attention'
    },
    {
      id: 'APT-005',
      patient: 'Priya Mendis',
      patientId: 'PAT-2025-005',
      doctor: 'Dr. Sarah Mendis',
      doctorId: 'DR-001',
      treatment: 'Ceramic Braces Installation',
      date: '2025-06-10',
      time: '10:00',
      status: 'Scheduled',
      patientType: 'General',
      priority: 'Normal',
      notes: 'Patient prefers ceramic braces'
    },
    {
      id: 'APT-006',
      patient: 'Amal Fernando',
      patientId: 'PAT-2025-006',
      doctor: 'Dr. Kusal Peris',
      doctorId: 'DR-004',
      treatment: 'Emergency Visit',
      date: '2025-06-09',
      time: '16:30',
      status: 'Cancelled',
      patientType: 'General',
      priority: 'High',
      notes: 'Patient cancelled due to fever'
    },
    {
      id: 'APT-007',
      patient: 'Nimal Wijesinghe',
      patientId: 'PAT-2025-007',
      doctor: 'Dr. Sarah Mendis',
      doctorId: 'DR-001',
      treatment: 'Follow-up Examination',
      date: '2025-06-11',
      time: '09:00',
      status: 'Scheduled',
      patientType: 'General',
      priority: 'Normal',
      notes: 'Monthly check-up'
    },
    {
      id: 'APT-008',
      patient: 'Sanduni Perera',
      patientId: 'PAT-2025-008',
      doctor: 'Dr. Nimal Perera',
      doctorId: 'DR-002',
      treatment: 'Clear Aligners Progress Check',
      date: '2025-06-12',
      time: '14:00',
      status: 'Scheduled',
      patientType: 'Low-Income',
      priority: 'Medium',
      notes: 'Second week progress check'
    }
  ];

  // Available doctors
  const availableDoctors = [
    { id: 'DR-001', name: 'Dr. Sarah Mendis', specialty: 'Orthodontist' },
    { id: 'DR-002', name: 'Dr. Nimal Perera', specialty: 'Orthodontist' },
    { id: 'DR-003', name: 'Dr. Raj Perera', specialty: 'Pediatric Orthodontist' },
    { id: 'DR-004', name: 'Dr. Kusal Peris', specialty: 'Oral Surgeon' }
  ];

  // Treatment types
  const treatmentTypes = [
    'Initial Consultation',
    'Braces Adjustment',
    'Metal Braces Installation',
    'Ceramic Braces Installation',
    'Retainer Fitting',
    'Palatal Expander Check',
    'Clear Aligners Progress Check',
    'Follow-up Examination',
    'Emergency Visit'
  ];




  // Convert appointments to calendar events
  const events = allAppointments.map(appointment => {
    const [hours, minutes] = appointment.time.split(':');
    const startDate = new Date(appointment.date);
    startDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // 1 hour duration

    return {
      id: appointment.id,
      title: `${appointment.patient} - ${appointment.treatment}`,
      start: startDate,
      end: endDate,
      resource: appointment
    };
  });

  // Filter appointments based on current filters
  const filteredAppointments = allAppointments.filter(appointment => {
    const matchesStatus = filterStatus === 'all' || appointment.status.toLowerCase().replace(' ', '-') === filterStatus;
    const matchesDoctor = filterDoctor === 'all' || appointment.doctorId === filterDoctor;
    const matchesDate = !filterDate || appointment.date === filterDate;
    const matchesSearch = !searchTerm || 
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesDoctor && matchesDate && matchesSearch;
  });

  // Get today's appointments
  const todayAppointments = allAppointments.filter(apt => apt.date === '2025-06-09');

  // Statistics
  const todayTotal = todayAppointments.length;
  const completed = todayAppointments.filter(apt => apt.status === 'Completed').length;
  const pending = todayAppointments.filter(apt => apt.status === 'Scheduled' || apt.status === 'In Progress').length;
  const cancelled = todayAppointments.filter(apt => apt.status === 'Cancelled').length;

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Calendar event styling
  const eventStyleGetter = (event) => {
    const appointment = event.resource;
    let backgroundColor = '#3174ad';
    
    switch (appointment.status) {
      case 'Completed':
        backgroundColor = '#10b981';
        break;
      case 'In Progress':
        backgroundColor = '#3b82f6';
        break;
      case 'Scheduled':
        backgroundColor = '#8b5cf6';
        break;
      case 'Cancelled':
        backgroundColor = '#ef4444';
        break;
      default:
        backgroundColor = '#6b7280'; // Default gray color
        break;
    }


   // Highlight high priority appointments
    if (appointment.priority === 'High') {
      backgroundColor = '#dc2626';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '12px'
      }
    };
  };


  // Form handlers
  const handleAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    console.log('New appointment:', appointmentForm);
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
    alert('Appointment scheduled successfully!');
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log(`Changing appointment ${appointmentId} status to ${newStatus}`);
    // In a real app, this would update the database
    alert(`Appointment status changed to ${newStatus}`);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  // Component views
  const TodaySchedule = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule - June 9, 2025</h3>
      <div className="space-y-3">
        {todayAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No appointments scheduled for today</p>
        ) : (
          todayAppointments.map(appointment => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                    {appointment.patientType === 'Low-Income' && (
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                        Low-Income
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{appointment.treatment}</p>
                  <p className="text-xs text-gray-500">{appointment.doctor} • {formatTime(appointment.time)}</p>
                  {appointment.notes && (
                    <p className="text-xs text-gray-500 mt-1 italic">{appointment.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  <div className="flex gap-1">
                    {appointment.status === 'Scheduled' && (
                      <button 
                        onClick={() => handleStatusChange(appointment.id, 'In Progress')}
                        className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                        title="Start Appointment"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m5-9a12 12 0 11-24 0 12 12 0 0124 0z" />
                        </svg>
                      </button>
                    )}
                    {appointment.status === 'In Progress' && (
                      <button 
                        onClick={() => handleStatusChange(appointment.id, 'Completed')}
                        className="text-green-600 hover:bg-green-50 p-1 rounded"
                        title="Complete Appointment"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                    <button 
                      onClick={() => handleReschedule(appointment)}
                      className="text-yellow-600 hover:bg-yellow-50 p-1 rounded"
                      title="Reschedule"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const AppointmentsList = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">All Appointments</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Patient</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Treatment</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Doctor</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Date & Time</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Priority</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{appointment.patient}</div>
                    <div className="text-sm text-gray-500">{appointment.patientId}</div>
                    {appointment.patientType === 'Low-Income' && (
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                        Low-Income
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{appointment.treatment}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{appointment.doctor}</td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900">{appointment.date}</div>
                  <div className="text-xs text-gray-500">{formatTime(appointment.time)}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                    {appointment.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleReschedule(appointment)}
                      className="text-blue-600 hover:bg-blue-50 p-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                      className="text-red-600 hover:bg-red-50 p-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AppointmentsCalendar = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Calendar View</h3>
      
      {/* Calendar Legend */}
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Cancelled/High Priority</span>
        </div>
      </div>

      <div style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => handleReschedule(event.resource)}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="week"
          step={30}
          timeslots={2}
          min={new Date(2025, 5, 9, 8, 0, 0)} // 8:00 AM
          max={new Date(2025, 5, 9, 18, 0, 0)} // 6:00 PM
          formats={{
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
              localizer.format(start, 'HH:mm', culture) + ' - ' +
              localizer.format(end, 'HH:mm', culture)
          }}
          components={{
            event: ({ event }) => (
              <div className="text-xs">
                <div className="font-semibold">{event.resource.patient}</div>
                <div>{event.resource.treatment}</div>
                <div>{event.resource.doctor}</div>
              </div>
            )
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Appointment Management</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAppointmentModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Appointment
            </button>
          </div>
        </div>

        {/* View Mode Toggles */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setViewMode('today')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'today' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Today's Schedule
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'calendar' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Calendar View
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select 
            value={filterDoctor} 
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Doctors</option>
            {availableDoctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
          
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-blue-800 font-semibold">Today's Total</h3>
              <p className="text-2xl font-bold text-blue-600">{todayTotal}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-2">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-green-800 font-semibold">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{completed}</p>
            </div>
            <div className="bg-green-100 rounded-full p-2">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-yellow-800 font-semibold">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">{pending}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-2">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold">Cancelled</h3>
              <p className="text-2xl font-bold text-red-600">{cancelled}</p>
            </div>
            <div className="bg-red-100 rounded-full p-2">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'today' && <TodaySchedule />}
      {viewMode === 'list' && <AppointmentsList />}
      {viewMode === 'calendar' && <AppointmentsCalendar />}
      
      {/* New Appointment Modal */}
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
                    {availableDoctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
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
                    {treatmentTypes.map(treatment => (
                      <option key={treatment} value={treatment}>{treatment}</option>
                    ))}
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

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Reschedule Appointment</h3>
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">Patient: <span className="font-medium">{selectedAppointment.patient}</span></p>
                <p className="text-sm text-gray-600">Treatment: <span className="font-medium">{selectedAppointment.treatment}</span></p>
                <p className="text-sm text-gray-600">Current: <span className="font-medium">{selectedAppointment.date} at {formatTime(selectedAppointment.time)}</span></p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">New Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">New Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowRescheduleModal(false);
                    alert('Appointment rescheduled successfully!');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentManagement;