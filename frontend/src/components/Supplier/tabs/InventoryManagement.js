import React, { useState } from 'react';

function InventoryManagement() {
  // Mock data for dental orthodontic inventory
  const [inventory, setInventory] = useState([
    { 
      id: 'INV-001', 
      item: 'Ceramic Brackets', 
      category: 'Brackets', 
      stock: 120, 
      reorderLevel: 50, 
      unitPrice: 750,
      supplier: 'OrthoTech Ltd',
      lastRestocked: '2025-05-01',
      location: 'Warehouse A-1',
      description: 'High-quality ceramic brackets for aesthetic orthodontic treatment',
      image: '/api/placeholder/40/40'
    },
    { 
      id: 'INV-002', 
      item: 'Orthodontic Wires 0.016"', 
      category: 'Wires', 
      stock: 25, 
      reorderLevel: 40, 
      unitPrice: 950,
      supplier: 'Wire Solutions Co',
      lastRestocked: '2025-04-28',
      location: 'Warehouse B-2',
      description: 'Stainless steel orthodontic wires for initial alignment',
      image: '/api/placeholder/40/40'
    },
    { 
      id: 'INV-003', 
      item: 'Elastic Ligatures', 
      category: 'Accessories', 
      stock: 350, 
      reorderLevel: 200, 
      unitPrice: 75,
      supplier: 'DentalCare Supplies',
      lastRestocked: '2025-05-05',
      location: 'Warehouse C-1',
      description: 'Color-coded elastic ligatures for securing archwires',
      image: '/api/placeholder/40/40'
    },
    { 
      id: 'INV-004', 
      item: 'Retainers', 
      category: 'Appliances', 
      stock: 8, 
      reorderLevel: 20, 
      unitPrice: 2500,
      supplier: 'Custom Orthodontics',
      lastRestocked: '2025-04-20',
      location: 'Warehouse D-1',
      description: 'Clear removable retainers for post-treatment maintenance',
      image: '/api/placeholder/40/40'
    },
    { 
      id: 'INV-005', 
      item: 'Palatal Expanders', 
      category: 'Appliances', 
      stock: 15, 
      reorderLevel: 10, 
      unitPrice: 7500,
      supplier: 'Advanced Ortho Systems',
      lastRestocked: '2025-04-15',
      location: 'Warehouse D-2',
      description: 'Rapid palatal expanders for maxillary expansion therapy',
      image: '/api/placeholder/40/40'
    },
    { 
      id: 'INV-006', 
      item: 'Self-Ligating Brackets', 
      category: 'Brackets', 
      stock: 85, 
      reorderLevel: 30, 
      unitPrice: 1200,
      supplier: 'ModernOrtho Inc',
      lastRestocked: '2025-05-03',
      location: 'Warehouse A-2',
      description: 'Self-ligating brackets for efficient tooth movement',
      image: '/api/placeholder/40/40'
    },
    { 
      id: 'INV-007', 
      item: 'Orthodontic Pliers', 
      category: 'Instruments', 
      stock: 12, 
      reorderLevel: 8, 
      unitPrice: 4500,
      supplier: 'Precision Tools Ltd',
      lastRestocked: '2025-04-25',
      location: 'Tool Storage',
      description: 'High-precision orthodontic pliers for wire manipulation',
      image: '/api/placeholder/40/40'
    },
    { 
      id: 'INV-008', 
      item: 'Archwires NiTi', 
      category: 'Wires', 
      stock: 0, 
      reorderLevel: 25, 
      unitPrice: 850,
      supplier: 'Wire Solutions Co',
      lastRestocked: '2025-03-15',
      location: 'Warehouse B-1',
      description: 'Nickel-titanium archwires for continuous light forces',
      image: '/api/placeholder/40/40'
    }
  ]);

  // State management
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('item');
  const [newItem, setNewItem] = useState({
    item: '',
    category: '',
    stock: 0,
    reorderLevel: 0,
    unitPrice: 0,
    supplier: '',
    location: '',
    description: ''
  });

  // Categories for dental orthodontic supplies
  const categories = ['Brackets', 'Wires', 'Accessories', 'Appliances', 'Instruments', 'Adhesives'];

  // Calculate inventory statistics
  const totalItems = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.unitPrice), 0);
  const lowStockItems = inventory.filter(item => item.stock <= item.reorderLevel).length;
  const outOfStockItems = inventory.filter(item => item.stock === 0).length;
  const criticalItems = inventory.filter(item => item.stock < item.reorderLevel / 2).length;

  // Filter and search logic
  const filteredInventory = inventory.filter(item => {
    const matchesCategory = !filterCategory || item.category === filterCategory;
    const matchesStatus = !filterStatus || 
      (filterStatus === 'low-stock' && item.stock <= item.reorderLevel) ||
      (filterStatus === 'out-of-stock' && item.stock === 0) ||
      (filterStatus === 'in-stock' && item.stock > item.reorderLevel);
    const matchesSearch = !searchTerm || 
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Sort inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    switch(sortBy) {
      case 'item': return a.item.localeCompare(b.item);
      case 'stock': return b.stock - a.stock;
      case 'unitPrice': return b.unitPrice - a.unitPrice;
      case 'category': return a.category.localeCompare(b.category);
      default: return 0;
    }
  });

  // Handler functions
  const handleStockUpdate = (itemId, newStock) => {
    setInventory(inventory.map(item => 
      item.id === itemId ? {
        ...item, 
        stock: Math.max(0, newStock),
        lastRestocked: newStock > item.stock ? new Date().toISOString().split('T')[0] : item.lastRestocked
      } : item
    ));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = `INV-${String(inventory.length + 1).padStart(3, '0')}`;
    setInventory([...inventory, { 
      id: newId,
      ...newItem,
      lastRestocked: new Date().toISOString().split('T')[0],
      image: '/api/placeholder/40/40'
    }]);
    setShowAddItemForm(false);
    setNewItem({
      item: '',
      category: '',
      stock: 0,
      reorderLevel: 0,
      unitPrice: 0,
      supplier: '',
      location: '',
      description: ''
    });
  };

  

  const getStockStatus = (item) => {
    if (item.stock === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (item.stock < item.reorderLevel / 2) return { status: 'Critical', color: 'bg-red-100 text-red-800' };
    if (item.stock <= item.reorderLevel) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
        <div className="flex gap-3">          
          <button 
            onClick={() => setShowAddItemForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Item
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Items</h3>
          <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
          <p className="text-sm text-blue-500">All categories</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Value</h3>
          <p className="text-2xl font-bold text-green-600">₨{(totalValue/1000).toFixed(0)}K</p>
          <p className="text-sm text-green-500">Current stock</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Low Stock</h3>
          <p className="text-2xl font-bold text-orange-600">{lowStockItems}</p>
          <p className="text-sm text-orange-500">{criticalItems} critical</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
          <p className="text-sm text-red-500">Needs attention</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="in-stock">In Stock ({inventory.filter(i => i.stock > i.reorderLevel).length})</option>
              <option value="low-stock">Low Stock ({lowStockItems})</option>
              <option value="out-of-stock">Out of Stock ({outOfStockItems})</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Search items, suppliers..." 
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setFilterCategory('');
                setFilterStatus('');
                setSearchTerm('');
                setSortBy('item');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedInventory.map((item) => {
          const stockStatus = getStockStatus(item);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.item}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}>
                    {stockStatus.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {item.category}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {item.supplier}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {item.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className="text-lg font-semibold text-blue-600">{item.stock}/{item.reorderLevel}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Unit Price</p>
                    <p className="text-lg font-semibold text-green-600">₨{item.unitPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Restocked:</span> {item.lastRestocked}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewItem(item)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => {
                      const newStock = prompt(`Update stock for ${item.item}:`, item.stock);
                      if (newStock !== null && !isNaN(newStock)) {
                        handleStockUpdate(item.id, parseInt(newStock, 10));
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-green-600 text-green-600 text-sm rounded-md hover:bg-green-50"
                  >
                    Update Stock
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sortedInventory.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Item Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Item Details - {selectedItem.id}</h3>
                  <p className="text-sm text-gray-600">{selectedItem.item}</p>
                </div>
                <button 
                  onClick={() => setShowDetailsModal(false)}
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
                {/* Item Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Item Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Item ID:</span> {selectedItem.id}</div>
                    <div><span className="font-medium">Category:</span> {selectedItem.category}</div>
                    <div><span className="font-medium">Stock:</span> {selectedItem.stock} units</div>
                    <div><span className="font-medium">Reorder Level:</span> {selectedItem.reorderLevel} units</div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${getStockStatus(selectedItem).color}`}>
                        {getStockStatus(selectedItem).status}
                      </span>
                    </div>
                    <div><span className="font-medium">Last Restocked:</span> {selectedItem.lastRestocked}</div>
                  </div>
                </div>

                {/* Supplier Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Supplier Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Supplier:</span> {selectedItem.supplier}</div>
                    <div><span className="font-medium">Location:</span> {selectedItem.location}</div>
                    <div><span className="font-medium">Unit Price:</span> ₨{selectedItem.unitPrice.toLocaleString()}</div>
                    <div><span className="font-medium">Total Value:</span> ₨{(selectedItem.stock * selectedItem.unitPrice).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedItem.description && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Description</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedItem.description}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total Value: ₨{(selectedItem.stock * selectedItem.unitPrice).toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      const newStock = prompt(`Update stock for ${selectedItem.item}:`, selectedItem.stock);
                      if (newStock !== null && !isNaN(newStock)) {
                        handleStockUpdate(selectedItem.id, parseInt(newStock, 10));
                        setSelectedItem({ ...selectedItem, stock: parseInt(newStock, 10) });
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {showAddItemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add New Inventory Item</h3>
                <button 
                  onClick={() => setShowAddItemForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleAddItem} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Ceramic Brackets"
                    value={newItem.item}
                    onChange={(e) => setNewItem({...newItem, item: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    min="0"
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({...newItem, stock: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level *</label>
                  <input
                    type="number"
                    min="0"
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    value={newItem.reorderLevel}
                    onChange={(e) => setNewItem({...newItem, reorderLevel: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (₨) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    value={newItem.unitPrice}
                    onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value) || 0})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., OrthoTech Ltd"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Warehouse A-1"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the item..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                ></textarea>
              </div>

              <div className="flex gap-2 mt-6 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setShowAddItemForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Actions Modal */}
      {showBulkUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Bulk Actions</h3>
                <button 
                  onClick={() => setShowBulkUpdateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">                
                <button className="w-full p-4 border border-blue-300 rounded-lg hover:bg-blue-50 text-left">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Export Stock Report</h4>
                      <p className="text-sm text-gray-600">Download detailed inventory report</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loyalty Points Summary */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-purple-800">DentiX Inventory Management Program</h3>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Efficient Supply Chain
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Maintain optimal stock levels to support dental care delivery with our streamlined inventory management system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
            <div className="text-sm font-medium text-gray-600">Critical Items</div>
            <div className="text-2xl font-bold text-purple-600">{criticalItems}</div>
            <div className="text-xs text-gray-500">Below half reorder level</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
            <div className="text-sm font-medium text-gray-600">Total Stock Value</div>
            <div className="text-2xl font-bold text-purple-600">₨{(totalValue/1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-500">Across {totalItems} items</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
            <div className="text-sm font-medium text-gray-600">Categories Managed</div>
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-xs text-gray-500">Dental supply types</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryManagement;