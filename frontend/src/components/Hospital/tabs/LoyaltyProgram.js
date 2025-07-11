import React, { useState } from 'react';
import LoyaltyPointsChart from './LoyaltyPointsChart';

function LoyaltyProgram() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    patientId: '',
    patientName: '',
    age: '',
    guardian: '',
    contact: '',
    treatmentType: '',
    estimatedCost: '',
    doctorId: '',
    urgency: 'Medium',
    notes: '',
    incomeDocuments: []
  });

  // Mock data for low-income support cases
  const lowIncomeCases = [
    {
      id: 'LIC-001',
      patient: 'Priya Mendis',
      patientId: 'PAT-2025-005',
      age: 12,
      guardian: 'Mrs. Kumari Mendis',
      contact: '+94 77 123 4567',
      treatment: 'Full Braces Treatment',
      doctor: 'Dr. Sarah Mendis',
      estimatedCost: 85000,
      pointsRequired: 850,
      status: 'Pending Approval',
      urgency: 'Medium',
      submittedDate: '2025-05-12',
      notes: 'Family income below poverty line. Single mother with 3 children.',
      documents: ['Income Certificate', 'Family Details', 'Medical Report']
    },
    {
      id: 'LIC-002',
      patient: 'Amal Fernando',
      patientId: 'PAT-2025-006',
      age: 14,
      guardian: 'Mr. Sunil Fernando',
      contact: '+94 71 987 6543',
      treatment: 'Retainer',
      doctor: 'Dr. Sarah Mendis',
      estimatedCost: 15000,
      pointsRequired: 150,
      status: 'Approved',
      urgency: 'Low',
      submittedDate: '2025-05-10',
      approvedDate: '2025-05-11',
      notes: 'Unemployed father, mother working part-time.',
      documents: ['Income Certificate', 'Employment Letter', 'Medical Report']
    },
    {
      id: 'LIC-003',
      patient: 'Lakshmi Navaratne',
      patientId: 'PAT-2025-007',
      age: 10,
      guardian: 'Mrs. Sita Navaratne',
      contact: '+94 76 555 1234',
      treatment: 'Palatal Expander',
      doctor: 'Dr. Nimal Perera',
      estimatedCost: 45000,
      pointsRequired: 450,
      status: 'In Review',
      urgency: 'High',
      submittedDate: '2025-05-13',
      notes: 'Urgent case - severe overcrowding affecting speech.',
      documents: ['Income Certificate', 'Medical Report', 'Speech Assessment']
    },
    {
      id: 'LIC-004',
      patient: 'Chamara Silva',
      patientId: 'PAT-2025-008',
      age: 16,
      guardian: 'Mr. Rohan Silva',
      contact: '+94 75 444 5678',
      treatment: 'Orthodontic Surgery',
      doctor: 'Dr. Sarah Mendis',
      estimatedCost: 125000,
      pointsRequired: 1250,
      status: 'Under Review',
      urgency: 'High',
      submittedDate: '2025-05-14',
      notes: 'Complex case requiring surgical intervention.',
      documents: ['Income Certificate', 'Surgical Assessment', 'X-rays']
    }
  ];

  // Points statistics
  const pointsStats = {
    available: 5230,
    used: 1250,
    pending: 1300,
    totalEarned: 7780,
    monthlyEarned: 530,
    patientsHelped: 23,
    averageSupport: 650
  };

  // Recent point activities
  const recentActivities = [
    {
      id: 'ACT-001',
      type: 'earned',
      points: 450,
      description: 'Orthodontic supplies purchase',
      date: '2025-05-15',
      orderId: 'ORD-2025-045'
    },
    {
      id: 'ACT-002',
      type: 'used',
      points: 150,
      description: 'Support for Amal Fernando - Retainer',
      date: '2025-05-11',
      caseId: 'LIC-002'
    },
    {
      id: 'ACT-003',
      type: 'earned',
      points: 280,
      description: 'Dental equipment purchase',
      date: '2025-05-10',
      orderId: 'ORD-2025-043'
    }
  ];

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Process the application
    console.log('New application submitted:', applicationForm);
    setShowApplicationModal(false);
    setApplicationForm({
      patientId: '',
      patientName: '',
      age: '',
      guardian: '',
      contact: '',
      treatmentType: '',
      estimatedCost: '',
      doctorId: '',
      urgency: 'Medium',
      notes: '',
      incomeDocuments: []
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-orange-100 text-orange-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Loyalty Program</h2>
            <p className="text-gray-600 mt-2">Supporting low-income patients through community points</p>
          </div>
          <button
            onClick={() => setShowApplicationModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Application
          </button>
        </div>

        {/* Statistics Cards - Updated to match PatientManagement style */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600 mb-1">{pointsStats.available.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Available Points</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600 mb-1">{pointsStats.patientsHelped}</div>
            <div className="text-sm text-gray-600">Patients Helped</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600 mb-1">{pointsStats.used.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Points Used</div>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
            <div className="text-3xl font-bold text-orange-600 mb-1">{lowIncomeCases.filter(c => c.status !== 'Approved').length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', icon: 'chart' },
              { id: 'applications', name: 'Applications', icon: 'folder' },
              { id: 'history', name: 'Points History', icon: 'clock' },
              { id: 'analytics', name: 'Analytics', icon: 'analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`${
                  activeSection === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {tab.icon === 'chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                  {tab.icon === 'folder' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />}
                  {tab.icon === 'clock' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {tab.icon === 'analytics' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                </svg>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Points Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Points Trend</h3>
                <LoyaltyPointsChart />
              </div>

              {/* Recent Activities */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${activity.type === 'earned' ? 'bg-green-100' : 'bg-blue-100'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${activity.type === 'earned' ? 'text-green-600' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {activity.type === 'earned' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            )}
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                      <div className={`font-semibold ${activity.type === 'earned' ? 'text-green-600' : 'text-blue-600'}`}>
                        {activity.type === 'earned' ? '+' : '-'}{activity.points} points
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Applications Section */}
          {activeSection === 'applications' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Support Applications</h3>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>All Status</option>
                    <option>Pending Approval</option>
                    <option>In Review</option>
                    <option>Approved</option>
                  </select>
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>All Urgency</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treatment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost & Points</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {lowIncomeCases.map(case_ => (
                      <tr key={case_.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{case_.patient}</div>
                            <div className="text-sm text-gray-500">{case_.patientId} • Age: {case_.age}</div>
                            <div className="text-sm text-gray-500">Guardian: {case_.guardian}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm text-gray-900">{case_.treatment}</div>
                            <div className="text-sm text-gray-500">{case_.doctor}</div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(case_.urgency)}`}>
                              {case_.urgency} Priority
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">Rs. {case_.estimatedCost.toLocaleString()}</div>
                            <div className="text-sm text-purple-600">{case_.pointsRequired} points required</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                            {case_.status}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            Submitted: {case_.submittedDate}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedCase(case_)}
                              className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                            >
                              View Details
                            </button>
                            {case_.status !== 'Approved' && (
                              <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                                Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Points History Section */}
          {activeSection === 'history' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Points Transaction History</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-600">Total Earned</div>
                    <div className="text-2xl font-bold text-green-600">{pointsStats.totalEarned.toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-600">Total Used</div>
                    <div className="text-2xl font-bold text-blue-600">{pointsStats.used.toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-600">Current Balance</div>
                    <div className="text-2xl font-bold text-purple-600">{pointsStats.available.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${activity.type === 'earned' ? 'bg-green-100' : 'bg-blue-100'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activity.type === 'earned' ? 'text-green-600' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {activity.type === 'earned' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            )}
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                          {activity.orderId && (
                            <p className="text-xs text-gray-400">Order: {activity.orderId}</p>
                          )}
                          {activity.caseId && (
                            <p className="text-xs text-gray-400">Case: {activity.caseId}</p>
                          )}
                        </div>
                      </div>
                      <div className={`text-lg font-semibold ${activity.type === 'earned' ? 'text-green-600' : 'text-blue-600'}`}>
                        {activity.type === 'earned' ? '+' : '-'}{activity.points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Program Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Treatment Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Braces Treatment</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retainers</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Palatal Expanders</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Impact Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Average Support Amount</div>
                      <div className="text-xl font-bold text-blue-600">Rs. {pointsStats.averageSupport.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Families Supported</div>
                      <div className="text-xl font-bold text-green-600">{pointsStats.patientsHelped}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                      <div className="text-xl font-bold text-purple-600">92%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Points Flow</h4>
                <LoyaltyPointsChart />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">New Support Application</h3>
              <button 
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleApplicationSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Patient ID *</label>
                  <input
                    type="text"
                    name="patientId"
                    value={applicationForm.patientId}
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
                    value={applicationForm.patientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={applicationForm.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Guardian Name *</label>
                  <input
                    type="text"
                    name="guardian"
                    value={applicationForm.guardian}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="contact"
                    value={applicationForm.contact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Treatment Type *</label>
                  <select
                    name="treatmentType"
                    value={applicationForm.treatmentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select treatment</option>
                    <option value="Full Braces Treatment">Full Braces Treatment</option>
                    <option value="Partial Braces">Partial Braces</option>
                    <option value="Retainer">Retainer</option>
                    <option value="Palatal Expander">Palatal Expander</option>
                    <option value="Orthodontic Surgery">Orthodontic Surgery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Estimated Cost (Rs.) *</label>
                  <input
                    type="number"
                    name="estimatedCost"
                    value={applicationForm.estimatedCost}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Attending Doctor *</label>
                  <select
                    name="doctorId"
                    value={applicationForm.doctorId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select doctor</option>
                    <option value="DR-001">Dr. Sarah Mendis - Orthodontist</option>
                    <option value="DR-002">Dr. Nimal Perera - Orthodontist</option>
                    <option value="DR-003">Dr. Raj Perera - Pediatric Orthodontist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Urgency Level</label>
                  <select
                    name="urgency"
                    value={applicationForm.urgency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Family Financial Situation & Notes *</label>
                <textarea
                  name="notes"
                  value={applicationForm.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Please describe the family's financial situation, income sources, number of dependents, and any other relevant information..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Required Documents</label>
                <div className="text-sm text-gray-600 mb-2">
                  Please ensure these documents are collected before submission:
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Income Certificate / Poverty Certificate</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Family Details (Birth Certificates, ID copies)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Medical Report / Treatment Plan</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Guardian Employment Letter (if applicable)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Application Details</h3>
              <button 
                onClick={() => setSelectedCase(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {selectedCase.patient}</div>
                    <div><span className="font-medium">ID:</span> {selectedCase.patientId}</div>
                    <div><span className="font-medium">Age:</span> {selectedCase.age} years</div>
                    <div><span className="font-medium">Guardian:</span> {selectedCase.guardian}</div>
                    <div><span className="font-medium">Contact:</span> {selectedCase.contact}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Treatment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Treatment:</span> {selectedCase.treatment}</div>
                    <div><span className="font-medium">Doctor:</span> {selectedCase.doctor}</div>
                    <div><span className="font-medium">Estimated Cost:</span> Rs. {selectedCase.estimatedCost.toLocaleString()}</div>
                    <div><span className="font-medium">Points Required:</span> {selectedCase.pointsRequired}</div>
                    <div>
                      <span className="font-medium">Priority:</span>
                      <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedCase.urgency)}`}>
                        {selectedCase.urgency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Application Status</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Current Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCase.status)}`}>
                      {selectedCase.status}
                    </span>
                  </div>
                  <div><span className="font-medium">Submitted:</span> {selectedCase.submittedDate}</div>
                  {selectedCase.approvedDate && (
                    <div><span className="font-medium">Approved:</span> {selectedCase.approvedDate}</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Family Situation</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedCase.notes}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Supporting Documents</h4>
                <div className="space-y-2">
                  {selectedCase.documents.map((doc, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {doc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedCase.status !== 'Approved' && (
                  <>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                      Request More Info
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Approve Application
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoyaltyProgram;