import React from 'react';

function DashboardOverview({ setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, Dr. Sarah</h2>            
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-blue-600 font-semibold text-sm">Next Appointment</div>
            <div className="text-blue-800 font-bold text-lg">9:30 AM</div>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-blue-100 text-sm">Today's Appointments</div>
                <div className="text-2xl font-bold">7</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-100 text-sm">Pending Orders</div>
                <div className="text-2xl font-bold">3</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-100 text-sm">Treatment Plans</div>
                <div className="text-2xl font-bold">12</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-orange-100 text-sm">Active Patients</div>
                <div className="text-2xl font-bold">48</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Today's Schedule</h3>
              <button 
                onClick={() => setActiveTab('appointments')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">AS</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Amara Silva</div>
                    <div className="text-sm text-gray-500">Braces Adjustment</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">9:30 AM</div>
                  <div className="text-xs text-green-600">Confirmed</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">DP</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Dinesh Perera</div>
                    <div className="text-sm text-gray-500">New Braces Installation</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">11:00 AM</div>
                  <div className="text-xs text-green-600">Confirmed</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">MF</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Malini Fernando</div>
                    <div className="text-sm text-gray-500">Retainer Fitting</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">2:30 PM</div>
                  <div className="text-xs text-yellow-600">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Supply Status */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Supply Status</h3>
              <button 
                onClick={() => setActiveTab('supplies')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium">Ceramic Brackets</span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">In Stock</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="font-medium">Orthodontic Wires 0.016"</span>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Low Stock</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-medium">Elastic Ligatures</span>
                </div>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Out of Stock</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium">Retainers</span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Patient Updates */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Recent Patient Updates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm font-semibold">AS</span>
                    </div>
                    <span className="font-medium text-gray-800">Amara Silva</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">Braces tightened</td>
                <td className="py-4 px-6 text-gray-600">9:30 AM</td>
                <td className="py-4 px-6">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completed</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm font-semibold">DP</span>
                    </div>
                    <span className="font-medium text-gray-800">Dinesh Perera</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">Treatment plan approved</td>
                <td className="py-4 px-6 text-gray-600">10:15 AM</td>
                <td className="py-4 px-6">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Approved</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <span className="text-purple-600 text-sm font-semibold">MF</span>
                    </div>
                    <span className="font-medium text-gray-800">Malini Fernando</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">Waiting for retainer</td>
                <td className="py-4 px-6 text-gray-600">11:45 AM</td>
                <td className="py-4 px-6">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;