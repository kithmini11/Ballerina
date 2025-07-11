import React, { useState } from 'react';

function SupplyInventory() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [doctorPrescriptions, setDoctorPrescriptions] = useState([
    {
      id: 'PRESC-001',
      prescriptionId: 'PRESC-001',
      orderNumber: 'ORD-2025-0001',
      doctorName: 'Dr. Sarah Mendis',
      patientId: 'PAT-2025-001',
      patientName: 'Amara Silva',
      item: 'Ceramic Brackets',
      quantity: 30,
      priority: 'Normal',
      patientType: 'General',
      requestDate: '2025-05-10',
      status: 'Under Review',
      clinicalNotes: 'Standard ceramic brackets for adult patient treatment',
      inventoryStatus: 'Checking Stock',
      orderRequired: false
    },
    {
      id: 'PRESC-002',
      prescriptionId: 'PRESC-002',
      orderNumber: 'ORD-2025-0002',
      doctorName: 'Dr. Sarah Mendis',
      patientId: 'PAT-2025-002',
      patientName: 'Dinesh Perera',
      item: 'Metal Brackets',
      quantity: 25,
      priority: 'High',
      patientType: 'Low-Income',
      requestDate: '2025-05-12',
      status: 'Order Placed',
      clinicalNotes: 'Urgent requirement for low-income patient treatment',
      inventoryStatus: 'Out of Stock',
      orderRequired: true,
      orderPlaced: '2025-05-13',
      supplierOrderId: 'ORD-2025-020'
    },
    {
      id: 'PRESC-003',
      prescriptionId: 'PRESC-003',
      orderNumber: 'ORD-2025-0003',
      doctorName: 'Dr. Sarah Mendis',
      patientId: 'PAT-2025-003',
      patientName: 'Malini Fernando',
      item: 'Retainer',
      quantity: 1,
      priority: 'Normal',
      patientType: 'General',
      requestDate: '2025-05-14',
      status: 'Ready for Treatment',
      clinicalNotes: 'Custom retainer for post-treatment maintenance',
      inventoryStatus: 'Available in Stock',
      orderRequired: false
    }
  ]);

  const [supplierOrders, setSupplierOrders] = useState([
    {
      id: 'ORD-2025-018',
      items: 'Ceramic Brackets (x50)',
      supplier: 'DentSupply Ltd.',
      orderDate: '2025-05-10',
      status: 'Delivered',
      pointsEarned: 250,
      estimatedDelivery: '2025-05-14',
      actualDelivery: '2025-05-14'
    },
    {
      id: 'ORD-2025-019',
      items: 'Orthodontic Wires (x30)',
      supplier: 'OrthoTech Sri Lanka',
      orderDate: '2025-05-12',
      status: 'Shipping',
      pointsEarned: 180,
      estimatedDelivery: '2025-06-16'
    },
    {
      id: 'ORD-2025-020',
      items: 'Metal Brackets (x25)',
      supplier: 'Sri Lanka Medical Supplies',
      orderDate: '2025-05-13',
      status: 'Processing',
      pointsEarned: 150,
      estimatedDelivery: '2025-06-17'
    },
    {
      id: 'ORD-2025-021',
      items: 'Elastic Ligatures (x200)',
      supplier: 'DentSupply Ltd.',
      orderDate: '2025-05-14',
      status: 'Processing',
      pointsEarned: 100,
      estimatedDelivery: '2025-06-18'
    }
  ]);

  const [currentInventory, setCurrentInventory] = useState([
    { category: 'Brackets', item: 'Metal Brackets', stock: 45, minLevel: 20, status: 'Good' },
    { category: 'Brackets', item: 'Ceramic Brackets', stock: 32, minLevel: 25, status: 'Good' },
    { category: 'Brackets', item: 'Self-ligating Brackets', stock: 18, minLevel: 15, status: 'Good' },
    { category: 'Wires', item: 'Orthodontic Wires 0.014"', stock: 25, minLevel: 30, status: 'Low' },
    { category: 'Wires', item: 'Orthodontic Wires 0.016"', stock: 28, minLevel: 30, status: 'Low' },
    { category: 'Wires', item: 'Orthodontic Wires 0.018"', stock: 22, minLevel: 25, status: 'Low' },
    { category: 'Elastics', item: 'Elastic Ligatures', stock: 8, minLevel: 50, status: 'Critical' },
    { category: 'Elastics', item: 'Power Chains', stock: 15, minLevel: 20, status: 'Critical' },
    { category: 'Elastics', item: 'Elastic Bands', stock: 12, minLevel: 30, status: 'Critical' },
    { category: 'Instruments', item: 'Orthodontic Pliers', stock: 5, minLevel: 3, status: 'Good' },
    { category: 'Instruments', item: 'Wire Cutters', stock: 4, minLevel: 3, status: 'Good' },
    { category: 'Instruments', item: 'Bracket Placement Forceps', stock: 3, minLevel: 2, status: 'Good' }
  ]);

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Order form state
  const [orderForm, setOrderForm] = useState({
    supplier: '',
    items: [{ name: '', quantity: '', unitPrice: '' }],
    notes: '',
    priority: 'Normal'
  });

  const suppliers = [
    'DentSupply Ltd.',
    'OrthoTech Sri Lanka',
    'Sri Lanka Medical Supplies',
    'Dental Care Supplies',
    'Medical Equipment Co.'
  ];

  const availableItems = [
    'Metal Brackets',
    'Ceramic Brackets',
    'Self-ligating Brackets',
    'Orthodontic Wires 0.014"',
    'Orthodontic Wires 0.016"',
    'Orthodontic Wires 0.018"',
    'Elastic Ligatures',
    'Power Chains',
    'Elastic Bands',
    'Orthodontic Pliers',
    'Wire Cutters',
    'Bracket Placement Forceps'
  ];

  const handleOrderFormChange = (field, value) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addOrderItem = () => {
    setOrderForm(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: '', unitPrice: '' }]
    }));
  };

  const removeOrderItem = (index) => {
    if (orderForm.items.length > 1) {
      setOrderForm(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateOrderTotal = () => {
    return orderForm.items.reduce((total, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      return total + (quantity * unitPrice);
    }, 0).toFixed(2);
  };

  const handleSubmitOrder = () => {
    // Validate form
    if (!orderForm.supplier || !orderForm.items.some(item => item.name && item.quantity)) {
      alert('Please fill in required fields');
      return;
    }

    // Create new order
    const newOrder = {
      id: `ORD-2025-${String(supplierOrders.length + 22).padStart(3, '0')}`,
      items: orderForm.items
        .filter(item => item.name && item.quantity)
        .map(item => `${item.name} (x${item.quantity})`)
        .join(', '),
      supplier: orderForm.supplier,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Processing',
      pointsEarned: Math.floor(parseFloat(calculateOrderTotal()) / 10),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total: calculateOrderTotal(),
      priority: orderForm.priority,
      notes: orderForm.notes
    };

    setSupplierOrders(orders => [newOrder, ...orders]);

    // Reset form
    setOrderForm({
      supplier: '',
      items: [{ name: '', quantity: '', unitPrice: '' }],
      notes: '',
      priority: 'Normal'
    });

    setShowOrderModal(false);
    alert('Order placed successfully!');
  };

  const handleReviewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleInventoryAction = (prescriptionId, action, orderData = null) => {
    const prescription = doctorPrescriptions.find(p => p.id === prescriptionId);
    
    setDoctorPrescriptions(prescriptions => 
      prescriptions.map(p => {
        if (p.id === prescriptionId) {
          switch(action) {
            case 'available':
              // Update inventory when marking as available
              setCurrentInventory(inventory => 
                inventory.map(item => {
                  if (item.item === prescription.item) {
                    return {
                      ...item,
                      stock: item.stock - prescription.quantity,
                      status: (item.stock - prescription.quantity) < item.minLevel ? 
                        ((item.stock - prescription.quantity) <= item.minLevel / 2 ? 'Critical' : 'Low') : 
                        'Good'
                    };
                  }
                  return item;
                })
              );
              
              return {
                ...p,
                status: 'Ready for Treatment',
                inventoryStatus: 'Available in Stock'
              };
            case 'orderPlaced':
              // Add new order to supplier orders
              const newOrder = {
                id: `ORD-2025-${String(supplierOrders.length + 22).padStart(3, '0')}`,
                items: `${prescription.item} (x${prescription.quantity})`,
                supplier: 'DentSupply Ltd.',
                orderDate: new Date().toISOString().split('T')[0],
                status: 'Processing',
                pointsEarned: prescription.quantity * 5,
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
              };
              setSupplierOrders(orders => [...orders, newOrder]);
              
              return {
                ...p,
                status: 'Order Placed',
                inventoryStatus: 'Out of Stock - Order Placed',
                orderRequired: true,
                orderPlaced: new Date().toISOString().split('T')[0],
                supplierOrderId: newOrder.id
              };
            default:
              return p;
          }
        }
        return p;
      })
    );
    setShowPrescriptionModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready for Treatment': return 'bg-green-100 text-green-800';
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipping': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const checkInventoryForItem = (itemName, quantity) => {
    const inventoryItem = currentInventory.find(item => item.item === itemName);
    if (!inventoryItem) {
      return { available: false, currentStock: 0, message: 'Item not found in inventory' };
    }
    
    if (inventoryItem.stock >= quantity) {
      return { available: true, currentStock: inventoryItem.stock, message: 'Available in stock' };
    } else {
      return { 
        available: false, 
        currentStock: inventoryItem.stock, 
        message: `Insufficient stock (Available: ${inventoryItem.stock}, Required: ${quantity})` 
      };
    }
  };

  const pendingPrescriptions = doctorPrescriptions.filter(p => p.status === 'Under Review').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-2 px-1 ${activeTab === 'inventory' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Current Inventory
        </button>
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`pb-2 px-1 ${activeTab === 'prescriptions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Doctor Prescriptions {pendingPrescriptions > 0 && (
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {pendingPrescriptions}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-1 ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Supplier Orders
        </button>
      </div>

      {/* Current Inventory Tab */}
      {activeTab === 'inventory' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
            <button 
              onClick={() => setShowOrderModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Order Supplies
            </button>
          </div>
          
          {/* Summary Cards */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-blue-800">Brackets</div>
                  <div className="text-sm text-gray-600">Total Stock: {currentInventory.filter(item => item.category === 'Brackets').reduce((sum, item) => sum + item.stock, 0)}</div>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Good
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-green-800">Wires</div>
                  <div className="text-sm text-gray-600">Total Stock: {currentInventory.filter(item => item.category === 'Wires').reduce((sum, item) => sum + item.stock, 0)}</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                  Low
                </span>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-purple-800">Elastics</div>
                  <div className="text-sm text-gray-600">Total Stock: {currentInventory.filter(item => item.category === 'Elastics').reduce((sum, item) => sum + item.stock, 0)}</div>
                </div>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                  Critical
                </span>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-yellow-800">Instruments</div>
                  <div className="text-sm text-gray-600">Total Stock: {currentInventory.filter(item => item.category === 'Instruments').reduce((sum, item) => sum + item.stock, 0)}</div>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Good
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Inventory Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-left text-gray-600">Category</th>
                  <th className="py-3 px-4 text-left text-gray-600">Item</th>
                  <th className="py-3 px-4 text-left text-gray-600">Current Stock</th>
                  <th className="py-3 px-4 text-left text-gray-600">Minimum Level</th>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentInventory.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.item}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.stock}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.minLevel}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStockStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {item.status === 'Critical' || item.status === 'Low' ? (
                        <button 
                          onClick={() => setShowOrderModal(true)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          Reorder
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Doctor Prescriptions Tab */}
      {activeTab === 'prescriptions' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Doctor Prescriptions</h2>
            <div className="text-sm text-gray-500">
              {pendingPrescriptions} pending review
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-left text-gray-600">Prescription Details</th>
                  <th className="py-3 px-4 text-left text-gray-600">Doctor & Patient</th>
                  <th className="py-3 px-4 text-left text-gray-600">Item & Quantity</th>
                  <th className="py-3 px-4 text-left text-gray-600">Priority</th>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctorPrescriptions.map(prescription => (
                  <tr key={prescription.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900">{prescription.prescriptionId}</div>
                      <div className="text-sm font-semibold text-blue-600">Order: {prescription.orderNumber}</div>
                      <div className="text-sm text-gray-500">{prescription.requestDate}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900">{prescription.doctorName}</div>
                      <div className="text-sm text-gray-500">{prescription.patientName} ({prescription.patientId})</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900">{prescription.item}</div>
                      <div className="text-sm text-gray-500">Quantity: {prescription.quantity}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${prescription.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {prescription.priority}
                      </span>
                      {prescription.patientType === 'Low-Income' && (
                        <div className="mt-1">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            Low-Income
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(prescription.status)}`}>
                        {prescription.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{prescription.inventoryStatus}</div>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleReviewPrescription(prescription)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Supplier Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Supplier Orders</h2>
            <button 
              onClick={() => setShowOrderModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Order
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-left text-gray-600">Order ID</th>
                  <th className="py-3 px-4 text-left text-gray-600">Items</th>
                  <th className="py-3 px-4 text-left text-gray-600">Supplier</th>
                  <th className="py-3 px-4 text-left text-gray-600">Order Date</th>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600">Delivery</th>
                  <th className="py-3 px-4 text-left text-gray-600">Points Earned</th>
                </tr>
              </thead>
              <tbody>
                {supplierOrders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.items}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.supplier}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{order.orderDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {order.actualDelivery || order.estimatedDelivery}
                      {!order.actualDelivery && <span className="text-xs text-gray-500"> (Est.)</span>}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-green-600">{order.pointsEarned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prescription Review Modal */}
      {showPrescriptionModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Review Prescription - {selectedPrescription.prescriptionId}</h3>
                  <p className="text-sm text-gray-600">Order Number: {selectedPrescription.orderNumber}</p>
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
                <div><span className="font-medium">Prescription ID:</span> {selectedPrescription.prescriptionId}</div>
                <div><span className="font-medium">Order Number:</span> {selectedPrescription.orderNumber}</div>
                <div><span className="font-medium">Doctor:</span> {selectedPrescription.doctorName}</div>
                <div><span className="font-medium">Patient:</span> {selectedPrescription.patientName}</div>
                <div><span className="font-medium">Patient ID:</span> {selectedPrescription.patientId}</div>
                <div><span className="font-medium">Request Date:</span> {selectedPrescription.requestDate}</div>
                <div><span className="font-medium">Item:</span> {selectedPrescription.item}</div>
                <div><span className="font-medium">Quantity:</span> {selectedPrescription.quantity}</div>
                <div><span className="font-medium">Priority:</span> {selectedPrescription.priority}</div>
                <div><span className="font-medium">Patient Type:</span> {selectedPrescription.patientType}</div>
              </div>
              
              {selectedPrescription.clinicalNotes && (
                <div>
                  <span className="font-medium">Clinical Notes:</span>
                  <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedPrescription.clinicalNotes}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Inventory Check</h4>
                <p className="text-sm text-blue-700 mb-3">Check if the prescribed item is available in current inventory:</p>
                
                {(() => {
                  const inventoryCheck = checkInventoryForItem(selectedPrescription.item, selectedPrescription.quantity);
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <div className="font-medium">{selectedPrescription.item}</div>
                          <div className="text-sm text-gray-500">Current Stock: {inventoryCheck.currentStock} units</div>
                          <div className="text-xs text-gray-600">{inventoryCheck.message}</div>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Required: </span>{selectedPrescription.quantity} units
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowPrescriptionModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleInventoryAction(selectedPrescription.id, 'available')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={!checkInventoryForItem(selectedPrescription.item, selectedPrescription.quantity).available}
                >
                  Mark as Available
                </button>
                <button
                  onClick={() => handleInventoryAction(selectedPrescription.id, 'orderPlaced')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Place Supplier Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Order Supplies Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Place New Supply Order</h3>
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
            
            <div className="p-6 space-y-6">
              {/* Supplier Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={orderForm.supplier}
                    onChange={(e) => handleOrderFormChange('supplier', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map(supplier => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={orderForm.priority}
                    onChange={(e) => handleOrderFormChange('priority', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Items Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Order Items <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addOrderItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {orderForm.items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Item Name
                          </label>
                          <select
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Item</option>
                            {availableItems.map(itemName => (
                              <option key={itemName} value={itemName}>{itemName}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            placeholder="0"
                            min="1"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unit Price (LKR)
                            </label>
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                              placeholder="0.00"
                              step="0.01"
                              min="0"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          {orderForm.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOrderItem(index)}
                              className="text-red-600 hover:text-red-800 p-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      {item.quantity && item.unitPrice && (
                        <div className="mt-2 text-right text-sm text-gray-600">
                          Subtotal: LKR {(parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span>{orderForm.items.filter(item => item.name && item.quantity).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Quantity:</span>
                    <span>{orderForm.items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t pt-2">
                    <span>Total Amount:</span>
                    <span>LKR {calculateOrderTotal()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Points to Earn:</span>
                    <span>{Math.floor(parseFloat(calculateOrderTotal()) / 10)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  value={orderForm.notes}
                  onChange={(e) => handleOrderFormChange('notes', e.target.value)}
                  rows="3"
                  placeholder="Add any special instructions or notes for this order..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={!orderForm.supplier || !orderForm.items.some(item => item.name && item.quantity)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupplyInventory;
