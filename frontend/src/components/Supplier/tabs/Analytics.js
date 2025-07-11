import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

function Analytics() {  
  
  // Chart data
  const hospitalOrdersData = [
    { name: 'Lady Ridgeway', orders: 45, revenue: 375000 },
    { name: 'General Hospital', orders: 38, revenue: 320000 },
    { name: 'Teaching Hospital', orders: 32, revenue: 285000 },
    { name: 'Private Hospital', orders: 28, revenue: 245000 },
    { name: 'District Hospital', orders: 22, revenue: 195000 },
  ];

  const productCategoryData = [
    { name: 'Brackets', value: 35, revenue: 450000 },
    { name: 'Wires', value: 25, revenue: 320000 },
    { name: 'Tools', value: 20, revenue: 280000 },
    { name: 'Accessories', value: 20, revenue: 150000 },
  ];

  const monthlyTrendsData = [
    { month: 'Jan', orders: 45, revenue: 650000 },
    { month: 'Feb', orders: 52, revenue: 720000 },
    { month: 'Mar', orders: 48, revenue: 680000 },
    { month: 'Apr', orders: 61, revenue: 850000 },
    { month: 'May', orders: 68, revenue: 950000 },
    { month: 'Jun', orders: 75, revenue: 1100000 },
  ];

  const inventoryData = [
    { product: 'Ceramic Brackets', stock: 85, status: 'Good' },
    { product: 'Metal Wires', stock: 45, status: 'Low' },
    { product: 'Pliers', stock: 92, status: 'Good' },
    { product: 'Elastics', stock: 25, status: 'Critical' },
    { product: 'Retainers', stock: 78, status: 'Good' },
  ];

  const customerSatisfactionData = [
    { month: 'Jan', satisfaction: 4.2, complaints: 12 },
    { month: 'Feb', satisfaction: 4.5, complaints: 8 },
    { month: 'Mar', satisfaction: 4.3, complaints: 10 },
    { month: 'Apr', satisfaction: 4.7, complaints: 5 },
    { month: 'May', satisfaction: 4.6, complaints: 7 },
    { month: 'Jun', satisfaction: 4.8, complaints: 3 },
  ];

  const deliveryPerformanceData = [
    { week: 'Week 1', onTime: 85, delayed: 15 },
    { week: 'Week 2', onTime: 92, delayed: 8 },
    { week: 'Week 3', onTime: 88, delayed: 12 },
    { week: 'Week 4', onTime: 95, delayed: 5 },
  ];

  const topProductsData = [
    { name: 'Ceramic Brackets Pro', sales: 245, revenue: 187500 },
    { name: 'Orthodontic Wires', sales: 189, revenue: 145200 },
    { name: 'Dental Pliers Set', sales: 156, revenue: 98400 },
    { name: 'Elastic Bands', sales: 234, revenue: 67800 },
    { name: 'Retainer Kit', sales: 98, revenue: 89200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Function to get color based on stock level
  const getStockColor = (stock) => {
    if (stock < 30) return '#FF8042'; // Critical/Low - Red
    if (stock < 60) return '#FFBB28'; // Medium - Yellow
    return '#00C49F'; // Good - Green
  };

  // Calculate KPIs
  const totalOrders = hospitalOrdersData.reduce((sum, item) => sum + item.orders, 0);
  const totalRevenue = hospitalOrdersData.reduce((sum, item) => sum + item.revenue, 0);
  const avgSatisfaction = customerSatisfactionData[customerSatisfactionData.length - 1]?.satisfaction || 0;
  const onTimeDelivery = deliveryPerformanceData.reduce((sum, item) => sum + item.onTime, 0) / deliveryPerformanceData.length;

  return (
    <div className="p-6">
      {/* Date Range Selector */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>        
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Orders</h3>
          <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
          <p className="text-sm text-green-500">+12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">LKR {totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-500">+8% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Satisfaction</h3>
          <p className="text-2xl font-bold text-yellow-600">{avgSatisfaction}/5.0</p>
          <p className="text-sm text-green-500">+0.3 from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">On-Time Delivery</h3>
          <p className="text-2xl font-bold text-purple-600">{onTimeDelivery.toFixed(1)}%</p>
          <p className="text-sm text-green-500">+5% from last month</p>
        </div>
      </div>
      
      {/* Top Row Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by Hospital</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hospitalOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Product Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {productCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Second Row Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Order Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="product" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="stock">
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStockColor(entry.stock)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Third Row Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Satisfaction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={customerSatisfactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="satisfaction" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Line yAxisId="right" type="monotone" dataKey="complaints" stroke="#ff7300" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" stackId="a" fill="#00C49F" />
              <Bar dataKey="delayed" stackId="a" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row Chart */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;