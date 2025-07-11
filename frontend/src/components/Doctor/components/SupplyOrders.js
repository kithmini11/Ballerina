import React, { useState } from 'react';

function SupplyOrders() {
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const [prescriptions, setPrescriptions] = useState([
    { 
      id: 'PRESC-001',
      orderNumber: 'ORD-2025-0001',
      patientId: 'PAT-2025-001',
      patientName: 'Amara Silva',
      item: 'Ceramic Brackets',
      quantity: 30,
      requestDate: '2025-05-10',
      status: 'Sent to Hospital',
      priority: 'Normal',
      hospitalResponse: 'Under Review',
      patientType: 'General',
      notes: 'Standard ceramic brackets for adult patient treatment',
      doctorName: 'Dr. Sarah Mendis'
    },
    { 
      id: 'PRESC-002',
      orderNumber: 'ORD-2025-0002',
      patientId: 'PAT-2025-002',
      patientName: 'Dinesh Perera',
      item: 'Metal Brackets',
      quantity: 25,
      requestDate: '2025-05-12',
      status: 'Hospital Processing',
      priority: 'High',
      hospitalResponse: 'Inventory Check Complete - Ordering from Supplier',
      patientType: 'Low-Income',
      notes: 'Urgent requirement for low-income patient treatment',
      doctorName: 'Dr. Sarah Mendis'
    },
    { 
      id: 'PRESC-003',
      orderNumber: 'ORD-2025-0003',
      patientId: 'PAT-2025-003',
      patientName: 'Malini Fernando',
      item: 'Retainer',
      quantity: 1,
      requestDate: '2025-05-14',
      status: 'Completed',
      priority: 'Normal',
      hospitalResponse: 'Item Available - Ready for Treatment',
      patientType: 'General',
      notes: 'Custom retainer for post-treatment maintenance',
      doctorName: 'Dr. Sarah Mendis'
    },
    { 
      id: 'PRESC-004',
      orderNumber: 'ORD-2025-0004',
      patientId: 'PAT-2025-004',
      patientName: 'Kasun Rajapakse',
      item: 'Orthodontic Wires 0.016"',
      quantity: 50,
      requestDate: '2025-05-16',
      status: 'Hospital Processing',
      priority: 'High',
      hospitalResponse: 'Supplier Order Placed - ETA 3 days',
      patientType: 'Low-Income',
      notes: 'Special wires for complex case',
      doctorName: 'Dr. Sarah Mendis'
    },
    { 
      id: 'PRESC-005',
      orderNumber: 'ORD-2025-0005',
      patientId: 'PAT-2025-005',
      patientName: 'Nisha Wickramasinghe',
      item: 'Palatal Expander',
      quantity: 1,
      requestDate: '2025-05-18',
      status: 'Cancelled',
      priority: 'Normal',
      hospitalResponse: 'Patient postponed treatment',
      patientType: 'General',
      notes: 'Custom expander - treatment postponed by patient',
      doctorName: 'Dr. Sarah Mendis'
    }
  ]);

  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    item: '',
    quantity: '',
    priority: 'Normal',
    patientType: 'General',
    notes: ''
  });

  // Available dental items for prescription
  const dentalItems = [
    'Metal Brackets',
    'Ceramic Brackets',
    'Self-ligating Brackets',
    'Orthodontic Wires 0.014"',
    'Orthodontic Wires 0.016"',
    'Orthodontic Wires 0.018"',
    'NiTi Archwires',
    'Elastic Ligatures',
    'Power Chains',
    'Elastic Bands',
    'Retainer',
    'Palatal Expander',
    'Headgear',
    'Orthodontic Pliers',
    'Wire Cutters',
    'Bracket Placement Forceps'
  ];

  // Filter and search prescriptions
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesStatus = filterStatus === 'all' || prescription.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesSearch = !searchTerm || 
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.item.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort prescriptions
  const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
    switch(sortBy) {
      case 'date': return new Date(b.requestDate) - new Date(a.requestDate);
      case 'patient': return a.patientName.localeCompare(b.patientName);
      case 'item': return a.item.localeCompare(b.item);
      case 'status': return a.status.localeCompare(b.status);
      default: return 0;
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPrescription = (e) => {
    e.preventDefault();
    
    // Generate unique order number for patient reference
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(prescriptions.length + 1).padStart(4, '0')}`;
    
    const newPrescription = {
      id: `PRESC-${String(prescriptions.length + 1).padStart(3, '0')}`,
      orderNumber: orderNumber,
      patientId: formData.patientId,
      patientName: formData.patientName,
      item: formData.item,
      quantity: parseInt(formData.quantity),
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Sent to Hospital',
      priority: formData.priority,
      hospitalResponse: 'Pending Review',
      patientType: formData.patientType,
      notes: formData.notes,
      doctorName: 'Dr. Sarah Mendis'
    };
    
    setPrescriptions([...prescriptions, newPrescription]);
    
    // Show success message with order number
    alert(`Prescription sent successfully!\nOrder Number: ${orderNumber}\nPlease provide this number to your patient.`);
    
    setShowPrescriptionForm(false);
    setFormData({
      patientId: '',
      patientName: '',
      item: '',
      quantity: '',
      priority: 'Normal',
      patientType: 'General',
      notes: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Hospital Processing': return 'bg-blue-100 text-blue-800';
      case 'Sent to Hospital': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
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

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handlePrintOrder = (prescription) => {
    const printContent = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2>Dental Supply Order</h2>
        <hr>
        <p><strong>Order Number:</strong> ${prescription.orderNumber}</p>
        <p><strong>Patient:</strong> ${prescription.patientName} (${prescription.patientId})</p>
        <p><strong>Doctor:</strong> ${prescription.doctorName}</p>
        <p><strong>Item:</strong> ${prescription.item}</p>
        <p><strong>Quantity:</strong> ${prescription.quantity}</p>
        <p><strong>Priority:</strong> ${prescription.priority}</p>
        <p><strong>Date:</strong> ${prescription.requestDate}</p>
        <p><strong>Status:</strong> ${prescription.status}</p>
        <hr>
        <p><em>Please keep this order number for tracking your supply request.</em></p>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Statistics
  const totalPrescriptions = prescriptions.length;
  const pendingPrescriptions = prescriptions.filter(p => p.status === 'Sent to Hospital').length;
  const processingPrescriptions = prescriptions.filter(p => p.status === 'Hospital Processing').length;
  const completedPrescriptions = prescriptions.filter(p => p.status === 'Completed').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Supply Prescriptions</h2>
        <button 
          onClick={() => setShowPrescriptionForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Prescription
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Prescriptions</h3>
          <p className="text-2xl font-bold text-blue-600">{totalPrescriptions}</p>
          <p className="text-sm text-blue-500">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Hospital Review</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingPrescriptions}</p>
          <p className="text-sm text-yellow-500">Awaiting hospital action</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Hospital Processing</h3>
          <p className="text-2xl font-bold text-blue-600">{processingPrescriptions}</p>
          <p className="text-sm text-blue-500">Being fulfilled</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
          <p className="text-2xl font-bold text-green-600">{completedPrescriptions}</p>
          <p className="text-sm text-green-500">Ready for treatment</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="sent">Sent to Hospital</option>
              <option value="processing">Hospital Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="patient">Sort by Patient</option>
              <option value="item">Sort by Item</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Search prescriptions..." 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setFilterStatus('all');
                setSortBy('date');
                setSearchTerm('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Prescriptions Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient & Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hospital Response
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPrescriptions.map(prescription => (
                <tr key={prescription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{prescription.id}</div>
                      <div className="text-sm font-semibold text-blue-600">Order: {prescription.orderNumber}</div>
                      <div className="text-sm text-gray-500">{prescription.requestDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{prescription.patientName}</div>
                      <div className="text-sm text-gray-500">{prescription.item} (Qty: {prescription.quantity})</div>
                      <div className="text-xs text-gray-400">{prescription.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(prescription.status)}`}>
                        {prescription.status}
                      </span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(prescription.priority)}`}>
                        {prescription.priority}
                      </span>
                      {prescription.patientType === 'Low-Income' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Low-Income Support
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {prescription.hospitalResponse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewPrescription(prescription)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handlePrintOrder(prescription)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Print Order
                    </button>
                    {prescription.status === 'Sent to Hospital' && (
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">Showing {sortedPrescriptions.length} prescriptions</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Prescription Details Modal */}
      {showPrescriptionModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Prescription Details - {selectedPrescription.id}</h3>
                  <p className="text-sm text-gray-600">Requested on {selectedPrescription.requestDate}</p>
                </div>
                <button 
                  onClick={() => setShowPrescriptionModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Prescription ID:</span> {selectedPrescription.id}</div>
                <div><span className="font-medium">Order Number:</span> {selectedPrescription.orderNumber}</div>
                <div><span className="font-medium">Patient:</span> {selectedPrescription.patientName}</div>
                <div><span className="font-medium">Patient ID:</span> {selectedPrescription.patientId}</div>
                <div><span className="font-medium">Request Date:</span> {selectedPrescription.requestDate}</div>
                <div><span className="font-medium">Doctor:</span> {selectedPrescription.doctorName}</div>
                <div><span className="font-medium">Item:</span> {selectedPrescription.item}</div>
                <div><span className="font-medium">Quantity:</span> {selectedPrescription.quantity}</div>
                <div><span className="font-medium">Priority:</span> {selectedPrescription.priority}</div>
                <div><span className="font-medium">Patient Type:</span> {selectedPrescription.patientType}</div>
              </div>
              
              <div>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedPrescription.status)}`}>
                  {selectedPrescription.status}
                </span>
              </div>
              
              <div>
                <span className="font-medium">Hospital Response:</span>
                <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedPrescription.hospitalResponse}</p>
              </div>
              
              {selectedPrescription.notes && (
                <div>
                  <span className="font-medium">Clinical Notes:</span>
                  <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedPrescription.notes}</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowPrescriptionModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  onClick={() => handlePrintOrder(selectedPrescription)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2"
                >
                  Print Order
                </button>
                {selectedPrescription.status === 'Sent to Hospital' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Cancel Prescription
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* New Prescription Modal */}
      {showPrescriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">New Supply Prescription</h3>
                <button 
                  onClick={() => setShowPrescriptionForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitPrescription} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
                      Patient ID *
                    </label>
                    <input
                      id="patientId"
                      name="patientId"
                      type="text"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="PAT-2025-XXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                      Patient Name *
                    </label>
                    <input
                      id="patientName"
                      name="patientName"
                      type="text"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
                      Prescribed Item *
                    </label>
                    <select
                      id="item"
                      name="item"
                      value={formData.item}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select item</option>
                      {dentalItems.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                      Quantity *
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                      Priority *
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientType">
                      Patient Type *
                    </label>
                    <select
                      id="patientType"
                      name="patientType"
                      value={formData.patientType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="General">General Patient</option>
                      <option value="Low-Income">Low-Income Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                    Clinical Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Add clinical notes or special instructions..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowPrescriptionForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Send to Hospital
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

export default SupplyOrders;