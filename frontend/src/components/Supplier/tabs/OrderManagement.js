import React, { useState } from 'react';

function Orders() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  
  // Enhanced mock data for orders
  const [orders, setOrders] = useState([
    { 
      id: "ORD-2025-001",
      hospital: "Lady Ridgeway Children's Hospital",
      contactPerson: "Dr. Nilantha Rathnayake",
      items: [
        { name: "Ceramic Brackets", quantity: 50, unitPrice: 750, total: 37500 },
        { name: "Orthodontic Wires 0.016\"", quantity: 30, unitPrice: 950, total: 28500 }
      ],
      date: "2025-05-14",
      requestDate: "2025-05-10",
      value: 66000,
      status: "Pending",
      priority: "High",
      pointsAllocated: 660,
      estimatedDelivery: "2025-05-20",
      shippingAddress: "No. 555, Sangaraja Mawatha, Colombo 8",
      notes: "Urgent requirement for pediatric orthodontic cases"
    },
    { 
      id: "ORD-2025-002",
      hospital: "National Dental Hospital",
      contactPerson: "Dr. Priyanka De Silva",
      items: [
        { name: "Metal Brackets", quantity: 100, unitPrice: 450, total: 45000 },
        { name: "Elastic Ligatures", quantity: 200, unitPrice: 75, total: 15000 }
      ],
      date: "2025-05-12",
      requestDate: "2025-05-08",
      value: 60000,
      status: "Processing",
      priority: "Medium",
      pointsAllocated: 600,
      estimatedDelivery: "2025-05-18",
      shippingAddress: "Ward Place, Colombo 7",
      notes: "Standard orthodontic supplies for general dental practice"
    },
    { 
      id: "ORD-2025-003",
      hospital: "Colombo General Hospital",
      contactPerson: "Dr. Manoj Fernando",
      items: [
        { name: "Retainers", quantity: 20, unitPrice: 2500, total: 50000 },
        { name: "Palatal Expanders", quantity: 5, unitPrice: 7500, total: 37500 }
      ],
      date: "2025-05-10",
      requestDate: "2025-05-05",
      value: 87500,
      status: "Shipped",
      priority: "Low",
      pointsAllocated: 875,
      estimatedDelivery: "2025-05-15",
      shippingAddress: "Regent Street, Colombo 7",
      notes: "Specialized appliances for complex cases",
      trackingNumber: "DHL1234567890"
    },
    { 
      id: "ORD-2025-004",
      hospital: "Kandy Teaching Hospital",
      contactPerson: "Dr. Laksiri Bandara",
      items: [
        { name: "Orthodontic Pliers", quantity: 5, unitPrice: 4500, total: 22500 },
        { name: "Wire Cutters", quantity: 3, unitPrice: 3200, total: 9600 }
      ],
      date: "2025-05-08",
      requestDate: "2025-05-03",
      value: 32100,
      status: "Delivered",
      priority: "Medium",
      pointsAllocated: 321,
      estimatedDelivery: "2025-05-12",
      shippingAddress: "Peradeniya Road, Kandy",
      notes: "Precision instruments for orthodontic procedures",
      trackingNumber: "DHL0987654321",
      deliveryDate: "2025-05-11"
    },
    { 
      id: "ORD-2025-005",
      hospital: "Galle District Hospital",
      contactPerson: "Dr. Samantha Perera",
      items: [
        { name: "Self-ligating Brackets", quantity: 30, unitPrice: 1200, total: 36000 },
        { name: "Archwires NiTi", quantity: 20, unitPrice: 850, total: 17000 }
      ],
      date: "2025-05-05",
      requestDate: "2025-05-01",
      value: 53000,
      status: "Delivered",
      priority: "Low",
      pointsAllocated: 530,
      estimatedDelivery: "2025-05-10",
      shippingAddress: "Karapitiya, Galle",
      notes: "Modern orthodontic materials for improved patient comfort",
      trackingNumber: "DHL5555666677",
      deliveryDate: "2025-05-09"
    }
  ]);

  // Filter and search orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = !searchTerm || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch(sortBy) {
      case 'date': return new Date(b.date) - new Date(a.date);
      case 'value': return b.value - a.value;
      case 'hospital': return a.hospital.localeCompare(b.hospital);
      case 'status': return a.status.localeCompare(b.status);
      default: return 0;
    }
  });

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;  
  const totalValue = orders.reduce((sum, order) => sum + order.value, 0);
  const totalPoints = orders.reduce((sum, order) => sum + order.pointsAllocated, 0);

  // Function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>        
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Orders</h3>
          <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
          <p className="text-sm text-blue-500">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Orders</h3>
          <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
          <p className="text-sm text-orange-500">Needs attention</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Value</h3>
          <p className="text-2xl font-bold text-green-600">₨{totalValue.toLocaleString()}</p>
          <p className="text-sm text-green-500">This month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Points Allocated</h3>
          <p className="text-2xl font-bold text-purple-600">{totalPoints.toLocaleString()}</p>
          <p className="text-sm text-purple-500">Loyalty program</p>
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
              <option value="pending">Pending ({orders.filter(o => o.status === 'Pending').length})</option>
              <option value="processing">Processing ({orders.filter(o => o.status === 'Processing').length})</option>
              <option value="shipped">Shipped ({orders.filter(o => o.status === 'Shipped').length})</option>
              <option value="delivered">Delivered ({orders.filter(o => o.status === 'Delivered').length})</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="value">Sort by Value</option>
              <option value="hospital">Sort by Hospital</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      
      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
                <div className="flex flex-col gap-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(order.priority)}`}>
                    {order.priority} Priority
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {order.hospital}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {order.contactPerson}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8V9a2 2 0 012-2h4a2 2 0 012 2v6m-6 4h6" />
                  </svg>
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Order Value</p>
                  <p className="text-lg font-semibold text-green-600">₨{(order.value/1000).toFixed(0)}K</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Points</p>
                  <p className="text-lg font-semibold text-purple-600">{order.pointsAllocated}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Ordered:</span> {new Date(order.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">ETA:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewOrder(order)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  View Details
                </button>
                {order.status === 'Pending' && (
                  <button 
                    onClick={() => handleUpdateStatus(order.id, 'Processing')}
                    className="flex-1 px-3 py-2 border border-green-600 text-green-600 text-sm rounded-md hover:bg-green-50"
                  >
                    Process
                  </button>
                )}
                {order.status === 'Processing' && (
                  <button 
                    onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                    className="flex-1 px-3 py-2 border border-purple-600 text-purple-600 text-sm rounded-md hover:bg-purple-50"
                  >
                    Ship
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedOrders.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Order Details - {selectedOrder.id}</h3>
                  <p className="text-sm text-gray-600">{selectedOrder.hospital}</p>
                </div>
                <button 
                  onClick={() => setShowOrderModal(false)}
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
                {/* Order Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Order ID:</span> {selectedOrder.id}</div>
                    <div><span className="font-medium">Request Date:</span> {selectedOrder.requestDate}</div>
                    <div><span className="font-medium">Order Date:</span> {selectedOrder.date}</div>
                    <div><span className="font-medium">Estimated Delivery:</span> {selectedOrder.estimatedDelivery}</div>
                    <div><span className="font-medium">Priority:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${getPriorityColor(selectedOrder.priority)}`}>
                        {selectedOrder.priority}
                      </span>
                    </div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div><span className="font-medium">Tracking:</span> {selectedOrder.trackingNumber}</div>
                    )}
                    {selectedOrder.deliveryDate && (
                      <div><span className="font-medium">Delivered:</span> {selectedOrder.deliveryDate}</div>
                    )}
                  </div>
                </div>

                {/* Hospital Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Hospital Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Hospital:</span> {selectedOrder.hospital}</div>
                    <div><span className="font-medium">Contact Person:</span> {selectedOrder.contactPerson}</div>
                    <div><span className="font-medium">Shipping Address:</span> {selectedOrder.shippingAddress}</div>
                    <div><span className="font-medium">Points Allocated:</span> {selectedOrder.pointsAllocated}</div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Unit Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm">{item.name}</td>
                          <td className="px-4 py-2 text-sm">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm">₨{item.unitPrice.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm font-medium">₨{item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-4 py-2 text-sm font-medium text-right">Total:</td>
                        <td className="px-4 py-2 text-sm font-bold">₨{selectedOrder.value.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Notes</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Order Value: ₨{selectedOrder.value.toLocaleString()} | Points: {selectedOrder.pointsAllocated}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowOrderModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Print Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loyalty Points Summary */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-purple-800">DentiX Loyalty Points Program</h3>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            1 Point = ₨1 for Patient Support
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Every order automatically allocates loyalty points (1% of order value) to support low-income patients through our community dental care program.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
            <div className="text-sm font-medium text-gray-600">Today's Contribution</div>
            <div className="text-2xl font-bold text-purple-600">₨{pendingOrders * 500}</div>
            <div className="text-xs text-gray-500">From {pendingOrders} pending orders</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
            <div className="text-sm font-medium text-gray-600">This Month</div>
            <div className="text-2xl font-bold text-purple-600">₨{totalPoints}</div>
            <div className="text-xs text-gray-500">From {totalOrders} orders</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
            <div className="text-sm font-medium text-gray-600">Patients Helped</div>
            <div className="text-2xl font-bold text-purple-600">{Math.floor(totalPoints / 1000)}</div>
            <div className="text-xs text-gray-500">Through dental care support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;