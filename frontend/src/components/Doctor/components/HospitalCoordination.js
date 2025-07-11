import React, { useState } from 'react';

function HospitalCoordination() {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [supportCases, setSupportCases] = useState([
    {
      id: 'LSC-001',
      patientName: 'Priya Mendis',
      patientId: 'PAT-2025-012',
      treatment: 'Full Braces Treatment',
      estimatedCost: 85000,
      pointsRequired: 850,
      status: 'Pending Approval',
      priority: 'Normal',
      submittedDate: '2025-06-05',
      reason: 'Single mother, low-income household, child needs orthodontic treatment for severe malocclusion',
      hospitalDecision: null,
      approvedAmount: null
    },
    {
      id: 'LSC-002',
      patientName: 'Amal Fernando',
      patientId: 'PAT-2025-018',
      treatment: 'Retainer',
      estimatedCost: 15000,
      pointsRequired: 150,
      status: 'Approved',
      priority: 'Low',
      submittedDate: '2025-05-28',
      reason: 'Family financial hardship due to job loss',
      hospitalDecision: '2025-06-02',
      approvedAmount: 15000
    },
    {
      id: 'LSC-003',
      patientName: 'Lakshmi Navaratne',
      patientId: 'PAT-2025-024',
      treatment: 'Palatal Expander',
      estimatedCost: 45000,
      pointsRequired: 450,
      status: 'In Review',
      priority: 'High',
      submittedDate: '2025-06-08',
      reason: 'Critical orthodontic intervention needed, family below poverty line',
      hospitalDecision: null,
      approvedAmount: null
    },
    {
      id: 'LSC-004',
      patientName: 'Chathura Perera',
      patientId: 'PAT-2025-031',
      treatment: 'Metal Braces Installation',
      estimatedCost: 55000,
      pointsRequired: 550,
      status: 'Rejected',
      priority: 'Normal',
      submittedDate: '2025-05-20',
      reason: 'Family income documentation incomplete',
      hospitalDecision: '2025-05-25',
      approvedAmount: 0
    }
  ]);

  const [recommendationForm, setRecommendationForm] = useState({
    patientId: '',
    patientName: '',
    treatmentType: '',
    estimatedCost: '',
    priority: 'Normal',
    reason: '',
    familyIncome: '',
    additionalNotes: ''
  });

  // Hospital coordination data
  const hospitalData = {
    name: "Lady Ridgeway Children's Hospital",
    points: 5230,
    pendingCases: supportCases.filter(c => c.status === 'Pending Approval' || c.status === 'In Review').length,
    activeTreatments: 48,
    totalApproved: supportCases.filter(c => c.status === 'Approved').length,
    contacts: {
      chief: {
        name: "Dr. Nilantha Rathnayake",
        title: "Chief Dental Officer",
        phone: "+94 11 2635 912",
        email: "nilantha.lrh@health.gov.lk"
      },
      coordinator: {
        name: "Ms. Kumari Perera",
        title: "Supply Coordinator",
        phone: "+94 11 2635 915",
        email: "kumari.lrh@health.gov.lk"
      }
    }
  };

  // Filter and search cases
  const filteredCases = supportCases.filter(supportCase => {
    const matchesStatus = filterStatus === 'all' || supportCase.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesSearch = !searchTerm || 
      supportCase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supportCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supportCase.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecommendationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRecommendation = (e) => {
    e.preventDefault();
    const pointsRequired = Math.floor(parseInt(recommendationForm.estimatedCost) / 100);
    
    const newCase = {
      id: `LSC-${String(supportCases.length + 1).padStart(3, '0')}`,
      patientName: recommendationForm.patientName,
      patientId: recommendationForm.patientId,
      treatment: recommendationForm.treatmentType,
      estimatedCost: parseInt(recommendationForm.estimatedCost),
      pointsRequired: pointsRequired,
      status: 'Pending Approval',
      priority: recommendationForm.priority,
      submittedDate: new Date().toISOString().split('T')[0],
      reason: recommendationForm.reason,
      hospitalDecision: null,
      approvedAmount: null
    };
    
    setSupportCases([...supportCases, newCase]);
    setShowRecommendationModal(false);
    setRecommendationForm({
      patientId: '',
      patientName: '',
      treatmentType: '',
      estimatedCost: '',
      priority: 'Normal',
      reason: '',
      familyIncome: '',
      additionalNotes: ''
    });
  };

  const handleViewCase = (supportCase) => {
    setSelectedCase(supportCase);
    setShowCaseModal(true);
  };

  // Statistics calculations
  const pendingCases = supportCases.filter(c => c.status === 'Pending Approval' || c.status === 'In Review').length;
  const totalValue = supportCases.filter(c => c.status === 'Approved').reduce((sum, c) => sum + c.estimatedCost, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Hospital Coordination</h2>
        <div className="text-sm text-gray-500">
          {hospitalData.name}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Hospital Points</h3>
              <p className="text-2xl font-bold text-blue-600">{hospitalData.points.toLocaleString()}</p>
              <p className="text-sm text-blue-500">Available support</p>
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
              <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Cases</h3>
              <p className="text-2xl font-bold text-yellow-600">{pendingCases}</p>
              <p className="text-sm text-yellow-500">Awaiting approval</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Active Treatments</h3>
              <p className="text-2xl font-bold text-green-600">{hospitalData.activeTreatments}</p>
              <p className="text-sm text-green-500">Currently ongoing</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Approved Value</h3>
              <p className="text-2xl font-bold text-purple-600">Rs. {totalValue.toLocaleString()}</p>
              <p className="text-sm text-purple-500">Support provided</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Information Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Current Hospital Partnership</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-3">Hospital Contacts</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">{hospitalData.contacts.chief.title}</div>
                  <div className="font-medium">{hospitalData.contacts.chief.name}</div>
                  <div className="text-blue-600 text-sm">{hospitalData.contacts.chief.phone}</div>
                  <div className="text-blue-600 text-sm">{hospitalData.contacts.chief.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">{hospitalData.contacts.coordinator.title}</div>
                  <div className="font-medium">{hospitalData.contacts.coordinator.name}</div>
                  <div className="text-blue-600 text-sm">{hospitalData.contacts.coordinator.phone}</div>
                  <div className="text-blue-600 text-sm">{hospitalData.contacts.coordinator.email}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left text-blue-600 hover:text-blue-800 font-medium flex items-center p-2 rounded hover:bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule coordination meeting
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-800 font-medium flex items-center p-2 rounded hover:bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Request supply allocation
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-800 font-medium flex items-center p-2 rounded hover:bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View coordination guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Low-Income Support Cases Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Low-Income Support Cases</h3>
          <button 
            onClick={() => setShowRecommendationModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Recommend Patient
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Approval</option>
              <option value="review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Search by case ID, patient name..." 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setFilterStatus('all');
                setSearchTerm('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Cases Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost & Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.map(supportCase => (
                <tr key={supportCase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{supportCase.id}</div>
                      <div className="text-sm text-gray-500">Submitted: {supportCase.submittedDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{supportCase.patientName}</div>
                      <div className="text-sm text-gray-500">{supportCase.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supportCase.treatment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Rs. {supportCase.estimatedCost.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{supportCase.pointsRequired} points</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(supportCase.status)}`}>
                        {supportCase.status}
                      </span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(supportCase.priority)}`}>
                        {supportCase.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewCase(supportCase)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    {supportCase.status === 'Pending Approval' && (
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendation Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Recommend Low-Income Patient</h3>
              <button 
                onClick={() => setShowRecommendationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitRecommendation} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Patient ID *</label>
                  <input
                    type="text"
                    name="patientId"
                    value={recommendationForm.patientId}
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
                    value={recommendationForm.patientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Treatment Type *</label>
                  <select
                    name="treatmentType"
                    value={recommendationForm.treatmentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select treatment</option>
                    <option value="Metal Braces Installation">Metal Braces Installation</option>
                    <option value="Ceramic Braces Installation">Ceramic Braces Installation</option>
                    <option value="Full Braces Treatment">Full Braces Treatment</option>
                    <option value="Retainer">Retainer</option>
                    <option value="Palatal Expander">Palatal Expander</option>
                    <option value="Clear Aligners">Clear Aligners</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Estimated Cost (Rs.) *</label>
                  <input
                    type="number"
                    name="estimatedCost"
                    value={recommendationForm.estimatedCost}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter estimated cost"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                <select
                  name="priority"
                  value={recommendationForm.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Reason for Recommendation *</label>
                <textarea
                  name="reason"
                  value={recommendationForm.reason}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Explain why this patient needs financial support..."
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowRecommendationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Recommendation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Case Details Modal */}
      {showCaseModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Case Details - {selectedCase.id}</h3>
              <button 
                onClick={() => setShowCaseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Case ID:</span> {selectedCase.id}</div>
                <div><span className="font-medium">Patient:</span> {selectedCase.patientName}</div>
                <div><span className="font-medium">Patient ID:</span> {selectedCase.patientId}</div>
                <div><span className="font-medium">Treatment:</span> {selectedCase.treatment}</div>
                <div><span className="font-medium">Estimated Cost:</span> Rs. {selectedCase.estimatedCost.toLocaleString()}</div>
                <div><span className="font-medium">Points Required:</span> {selectedCase.pointsRequired}</div>
                <div><span className="font-medium">Priority:</span> {selectedCase.priority}</div>
                <div>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedCase.status)}`}>
                    {selectedCase.status}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="font-medium">Reason:</span>
                <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedCase.reason}</p>
              </div>
              
              {selectedCase.hospitalDecision && (
                <div>
                  <span className="font-medium">Hospital Decision:</span>
                  <p className="mt-1 text-sm text-gray-600">Decided on {selectedCase.hospitalDecision}</p>
                  {selectedCase.approvedAmount > 0 && (
                    <p className="text-sm text-green-600">Approved Amount: Rs. {selectedCase.approvedAmount.toLocaleString()}</p>
                  )}
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowCaseModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedCase.status === 'Pending Approval' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Follow Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalCoordination;