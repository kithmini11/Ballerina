

function Dashboard({ setActiveTab }) {  
  
  // Enhanced mock data with more details
  const orders = [
    { 
      id: 'ORD-2025-001', 
      hospital: 'Lady Ridgeway Children\'s Hospital', 
      items: 'Ceramic Brackets (x50)', 
      requestDate: '2025-05-10', 
      status: 'Pending', 
      priority: 'High',
      amount: 45000,
      estimatedDelivery: '2025-05-15'
    },
    { 
      id: 'ORD-2025-002', 
      hospital: 'National Dental Hospital', 
      items: 'Orthodontic Wires 0.016" (x30)', 
      requestDate: '2025-05-12', 
      status: 'Processing', 
      priority: 'Medium',
      amount: 28500,
      estimatedDelivery: '2025-05-16'
    },
    { 
      id: 'ORD-2025-003', 
      hospital: 'Colombo General Hospital', 
      items: 'Elastic Ligatures (x100)', 
      requestDate: '2025-05-14', 
      status: 'Shipped', 
      priority: 'Low',
      amount: 15000,
      estimatedDelivery: '2025-05-17'
    },
    { 
      id: 'ORD-2025-004', 
      hospital: 'Kandy Teaching Hospital', 
      items: 'Retainers (x15)', 
      requestDate: '2025-05-13', 
      status: 'Ready to Ship', 
      priority: 'Medium',
      amount: 37500,
      estimatedDelivery: '2025-05-18'
    }
  ];

  const inventory = [
    { id: 'INV-001', item: 'Ceramic Brackets', category: 'Brackets', stock: 120, reorderLevel: 50, price: 900, trend: 'stable' },
    { id: 'INV-002', item: 'Orthodontic Wires 0.016"', category: 'Wires', stock: 25, reorderLevel: 40, price: 950, trend: 'declining' },
    { id: 'INV-003', item: 'Elastic Ligatures', category: 'Accessories', stock: 350, reorderLevel: 200, price: 150, trend: 'increasing' },
    { id: 'INV-004', item: 'Retainers', category: 'Appliances', stock: 8, reorderLevel: 20, price: 2500, trend: 'critical' },
    { id: 'INV-005', item: 'Palatal Expanders', category: 'Appliances', stock: 15, reorderLevel: 10, price: 7000, trend: 'stable' }
  ];

  // Quick actions
  const quickActions = [
    { name: 'Orders', icon: 'plus', action: () => setActiveTab('orders'), color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
    { name: 'Add Inventory', icon: 'package', action: () => setActiveTab('inventory'), color: 'bg-green-50 border-green-200 hover:bg-green-100' },
    { name: 'Contact Hospital', icon: 'phone', action: () => setActiveTab('hospitals'), color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
    { name: 'View Reports', icon: 'chart', action: () => setActiveTab('analytics'), color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' }
  ];  

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const lowStockItems = inventory.filter(item => item.stock <= item.reorderLevel).length;
  const criticalStockItems = inventory.filter(item => item.stock < item.reorderLevel / 2).length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Ready to Ship': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'increasing': return '📈';
      case 'declining': return '📉';
      case 'critical': return '⚠️';
      default: return '➡️';
    }
  };

  const getActionIcon = (icon, color) => {
    const iconClass = color.includes('blue') ? 'text-blue-600' : 
                     color.includes('green') ? 'text-green-600' : 
                     color.includes('purple') ? 'text-purple-600' : 'text-orange-600';
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icon === 'plus' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
        {icon === 'package' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
        {icon === 'phone' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
        {icon === 'chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
      </svg>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supplier Dashboard</h1>          
        </div>
        <div className="flex gap-3">          
          <button 
            onClick={() => setActiveTab('analytics')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Analytics
          </button>
        </div>
      </div>
      
      {/* Statistics Cards - Keep the same blue gradient */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => setActiveTab('orders')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Pending Orders</p>
              <h3 className="text-3xl font-bold mt-1">{pendingOrders}</h3>
              <p className="text-blue-100 text-xs mt-2">Click to manage orders</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => setActiveTab('analytics')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">₨{(totalRevenue/1000).toFixed(0)}K</h3>
              <p className="text-blue-100 text-xs mt-2">+8% from last month</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => setActiveTab('inventory')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Low Stock Items</p>
              <h3 className="text-3xl font-bold mt-1">{lowStockItems}</h3>
              <p className="text-blue-100 text-xs mt-2">{criticalStockItems} critical items</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => setActiveTab('hospitals')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Active Hospitals</p>
              <h3 className="text-3xl font-bold mt-1">6</h3>
              <p className="text-blue-100 text-xs mt-2">100% satisfaction rate</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Improved design */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-4 border-2 rounded-xl transition-all duration-200 ${action.color}`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3">
                  {getActionIcon(action.icon, action.color)}
                </div>
                <span className="text-sm font-medium text-gray-700">{action.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders - Card Style */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.slice(0, 4).map(order => (
              <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{order.hospital}</h4>
                    <p className="text-sm text-gray-600">{order.items}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-500">#{order.id}</span>
                  <span className={`font-medium ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-600">₨{(order.amount/1000).toFixed(0)}K</span>
                  <span className="text-xs text-gray-500">{order.requestDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Alerts - Improved layout */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Inventory Alerts</h2>
            <button 
              onClick={() => setActiveTab('inventory')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
            >
              Manage
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {inventory.filter(item => item.stock <= item.reorderLevel).map(item => (
              <div key={item.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{item.item}</span>
                      <span className="text-sm">{getTrendIcon(item.trend)}</span>
                    </div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold ${item.stock < item.reorderLevel/2 ? 'text-red-600' : 'text-orange-600'}`}>
                      {item.stock} units
                    </span>
                    <div className="text-xs text-gray-500">Min: {item.reorderLevel}</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${item.stock < item.reorderLevel/2 ? 'bg-red-500' : 'bg-orange-500'}`}
                    style={{ width: `${Math.min((item.stock / item.reorderLevel) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {inventory.filter(item => item.stock <= item.reorderLevel).length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-gray-500 font-medium">All inventory levels are healthy</p>
                <p className="text-sm text-gray-400">No action required</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Hospital Partners - Card Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Top Hospital Partners</h2>
          <button 
            onClick={() => setActiveTab('hospitals')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
          >
            View All Partners
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-gray-200 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">Premium</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">Lady Ridgeway Children's Hospital</h3>
            <p className="text-sm text-gray-600 mb-3">Colombo</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">₨375K</span>
              <span className="text-sm text-gray-500">24 orders</span>
            </div>
          </div>

          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-gray-200 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Standard</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">National Dental Hospital</h3>
            <p className="text-sm text-gray-600 mb-3">Colombo</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">₨280K</span>
              <span className="text-sm text-gray-500">18 orders</span>
            </div>
          </div>

          <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-gray-200 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">Premium</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">Kandy Teaching Hospital</h3>
            <p className="text-sm text-gray-600 mb-3">Kandy</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">₨245K</span>
              <span className="text-sm text-gray-500">15 orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;