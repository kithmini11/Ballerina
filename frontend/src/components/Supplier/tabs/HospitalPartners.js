import React, { useState } from 'react';

function Hospitals() {
  // Mock data for hospital partners
  const [hospitals, setHospitals] = useState([
    { 
      id: 1, 
      name: 'Lady Ridgeway Children\'s Hospital', 
      location: 'Colombo', 
      contactPerson: 'Dr. Nilantha Rathnayake',
      email: 'nilantha@lrch.health.gov.lk',
      phone: '+94 11 2635 912',
      lastOrder: '2025-05-10',
      totalOrders: 24,
      revenue: 375000,
      status: 'Active',
      partnership: 'Premium',
      rating: 4.8
    },
    { 
      id: 2, 
      name: 'National Dental Hospital', 
      location: 'Colombo', 
      contactPerson: 'Dr. Priyanka De Silva',
      email: 'priyanka@ndh.health.gov.lk',
      phone: '+94 11 2678 452',
      lastOrder: '2025-05-12',
      totalOrders: 18,
      revenue: 280000,
      status: 'Active',
      partnership: 'Standard',
      rating: 4.5
    },
    { 
      id: 3, 
      name: 'Colombo General Hospital', 
      location: 'Colombo', 
      contactPerson: 'Dr. Manoj Fernando',
      email: 'manoj@cgh.health.gov.lk',
      phone: '+94 11 2689 732',
      lastOrder: '2025-05-14',
      totalOrders: 12,
      revenue: 205000,
      status: 'Active',
      partnership: 'Standard',
      rating: 4.3
    },
    { 
      id: 4, 
      name: 'Kandy Teaching Hospital', 
      location: 'Kandy', 
      contactPerson: 'Dr. Laksiri Bandara',
      email: 'laksiri@kth.health.gov.lk',
      phone: '+94 81 2234 561',
      lastOrder: '2025-05-15',
      totalOrders: 15,
      revenue: 245000,
      status: 'Active',
      partnership: 'Premium',
      rating: 4.7
    },
    { 
      id: 5, 
      name: 'Galle District Hospital', 
      location: 'Galle', 
      contactPerson: 'Dr. Samantha Perera',
      email: 'samantha@gdh.health.gov.lk',
      phone: '+94 91 2234 789',
      lastOrder: '2025-04-28',
      totalOrders: 8,
      revenue: 125000,
      status: 'Inactive',
      partnership: 'Basic',
      rating: 4.1
    },
    { 
      id: 6, 
      name: 'Jaffna Teaching Hospital', 
      location: 'Jaffna', 
      contactPerson: 'Dr. Kumaran Sivagnanam',
      email: 'kumaran@jth.health.gov.lk',
      phone: '+94 21 2222 345',
      lastOrder: '2025-05-08',
      totalOrders: 10,
      revenue: 165000,
      status: 'Active',
      partnership: 'Standard',
      rating: 4.4
    }
  ]);

  // Mock order data for each hospital
  const hospitalOrders = {
    1: [
      { id: 'ORD-2025-001', date: '2025-05-10', items: 'Ceramic Brackets (x50)', amount: 45000, status: 'Delivered', priority: 'High' },
      { id: 'ORD-2025-015', date: '2025-05-08', items: 'Orthodontic Wires 0.016" (x30)', amount: 28500, status: 'Shipped', priority: 'Medium' },
      { id: 'ORD-2025-012', date: '2025-05-06', items: 'Elastic Ligatures (x100)', amount: 15000, status: 'Delivered', priority: 'Low' },
      { id: 'ORD-2025-008', date: '2025-05-03', items: 'Retainers (x10)', amount: 25000, status: 'Delivered', priority: 'Medium' },
      { id: 'ORD-2025-005', date: '2025-05-01', items: 'Palatal Expanders (x5)', amount: 35000, status: 'Delivered', priority: 'High' }
    ],
    2: [
      { id: 'ORD-2025-002', date: '2025-05-12', items: 'Metal Brackets (x40)', amount: 32000, status: 'Processing', priority: 'Medium' },
      { id: 'ORD-2025-014', date: '2025-05-09', items: 'Archwires (x25)', amount: 22000, status: 'Delivered', priority: 'Low' },
      { id: 'ORD-2025-010', date: '2025-05-05', items: 'Buccal Tubes (x20)', amount: 18000, status: 'Delivered', priority: 'Medium' }
    ],
    3: [
      { id: 'ORD-2025-003', date: '2025-05-14', items: 'Ceramic Brackets Clear (x30)', amount: 35000, status: 'Pending', priority: 'High' },
      { id: 'ORD-2025-011', date: '2025-05-07', items: 'Elastic Chains (x50)', amount: 12000, status: 'Delivered', priority: 'Low' },
      { id: 'ORD-2025-006', date: '2025-05-02', items: 'Separators (x100)', amount: 8000, status: 'Delivered', priority: 'Low' }
    ],
    4: [
      { id: 'ORD-2025-004', date: '2025-05-15', items: 'Lingual Brackets (x25)', amount: 42000, status: 'Shipped', priority: 'High' },
      { id: 'ORD-2025-013', date: '2025-05-09', items: 'Power Chains (x30)', amount: 15000, status: 'Delivered', priority: 'Medium' },
      { id: 'ORD-2025-007', date: '2025-05-04', items: 'Coil Springs (x40)', amount: 18000, status: 'Delivered', priority: 'Medium' }
    ],
    5: [
      { id: 'ORD-2025-016', date: '2025-04-28', items: 'Basic Brackets (x20)', amount: 15000, status: 'Delivered', priority: 'Low' },
      { id: 'ORD-2025-009', date: '2025-04-25', items: 'Wires Set (x15)', amount: 12000, status: 'Delivered', priority: 'Low' }
    ],
    6: [
      { id: 'ORD-2025-017', date: '2025-05-08', items: 'Self-Ligating Brackets (x35)', amount: 38000, status: 'Processing', priority: 'Medium' },
      { id: 'ORD-2025-018', date: '2025-05-05', items: 'NiTi Wires (x20)', amount: 24000, status: 'Delivered', priority: 'High' }
    ]
  };
  
  // State for filters and search
  const [locationFilter, setLocationFilter] = useState('');
  const [partnershipFilter, setPartnershipFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  
  // Filtered hospitals
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesLocation = !locationFilter || hospital.location === locationFilter;
    const matchesPartnership = !partnershipFilter || hospital.partnership === partnershipFilter;
    const matchesSearch = !searchTerm || 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesLocation && matchesPartnership && matchesSearch;
  });

  // Get unique locations for filter dropdown
  const uniqueLocations = [...new Set(hospitals.map(h => h.location))];

  const handleContactHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowContactModal(true);
  };

  const handleViewOrders = (hospital) => {
    setSelectedHospital(hospital);
    setShowOrdersModal(true);
  };

  const handleAddNewHospital = () => {
    setShowAddModal(true);
  };

  const getPartnershipBadgeColor = (partnership) => {
    switch(partnership) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Standard': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getOrderStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Hospital Partners</h2>
        <button 
          onClick={handleAddNewHospital}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Hospital
        </button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Partners</h3>
          <p className="text-2xl font-bold text-blue-600">{hospitals.length}</p>
          <p className="text-sm text-green-500">+2 this month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Partners</h3>
          <p className="text-2xl font-bold text-green-600">{hospitals.filter(h => h.status === 'Active').length}</p>
          <p className="text-sm text-gray-500">83% active rate</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Premium Partners</h3>
          <p className="text-2xl font-bold text-purple-600">{hospitals.filter(h => h.partnership === 'Premium').length}</p>
          <p className="text-sm text-purple-500">High value clients</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">LKR {hospitals.reduce((sum, h) => sum + h.revenue, 0).toLocaleString()}</p>
          <p className="text-sm text-green-500">+15% growth</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partnership Level</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={partnershipFilter}
              onChange={(e) => setPartnershipFilter(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Basic">Basic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Search hospitals..." 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setLocationFilter('');
                setPartnershipFilter('');
                setSearchTerm('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Hospital Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map(hospital => (
          <div key={hospital.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{hospital.name}</h3>
                <div className="flex flex-col gap-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(hospital.status)}`}>
                    {hospital.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPartnershipBadgeColor(hospital.partnership)}`}>
                    {hospital.partnership}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {hospital.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {hospital.contactPerson}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last order: {new Date(hospital.lastOrder).toLocaleDateString()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Total Orders</p>
                  <p className="text-lg font-semibold text-blue-600">{hospital.totalOrders}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-semibold text-green-600">₨{(hospital.revenue/1000).toFixed(0)}K</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Rating:</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{hospital.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleContactHospital(hospital)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  Contact
                </button>
                <button 
                  onClick={() => handleViewOrders(hospital)}
                  className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 text-sm rounded-md hover:bg-blue-50"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
          <p className="text-gray-500">Try adjusting your search filters</p>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Contact {selectedHospital.name}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <p className="text-gray-900">{selectedHospital.contactPerson}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <a href={`mailto:${selectedHospital.email}`} className="text-blue-600 hover:underline">
                  {selectedHospital.email}
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <a href={`tel:${selectedHospital.phone}`} className="text-blue-600 hover:underline">
                  {selectedHospital.phone}
                </a>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {showOrdersModal && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Order History - {selectedHospital.name}</h3>
                  <p className="text-sm text-gray-600">Total Orders: {selectedHospital.totalOrders} | Total Revenue: ₨{selectedHospital.revenue.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => setShowOrdersModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {hospitalOrders[selectedHospital.id] && hospitalOrders[selectedHospital.id].length > 0 ? (
                <div className="space-y-4">
                  {hospitalOrders[selectedHospital.id].map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{order.id}</h4>
                          <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getOrderStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Items</p>
                          <p className="text-sm text-gray-900">{order.items}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Amount</p>
                          <p className="text-sm font-semibold text-green-600">₨{order.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-3 gap-2">
                        <button className="px-3 py-1 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No orders found</h4>
                  <p className="text-gray-500">This hospital hasn't placed any orders yet.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {hospitalOrders[selectedHospital.id]?.length || 0} orders
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowOrdersModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close
                  </button>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Hospital Modal - keeping existing functionality */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Hospital Partner</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                <input id="hospital-name" type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input id="hospital-location" type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input id="hospital-contact" type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input id="hospital-email" type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input id="hospital-phone" type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const newHospital = {
                    id: hospitals.length + 1,
                    name: document.getElementById('hospital-name').value,
                    location: document.getElementById('hospital-location').value,
                    contactPerson: document.getElementById('hospital-contact').value,
                    email: document.getElementById('hospital-email').value,
                    phone: document.getElementById('hospital-phone').value,
                    lastOrder: new Date().toISOString().split('T')[0],
                    totalOrders: 0,
                    revenue: 0,
                    status: 'Active',
                    partnership: 'Basic',
                    rating: 4.0
                  };
                  setHospitals([...hospitals, newHospital]);
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Hospital
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hospitals;