import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LoyaltyPointsChart = () => {
  const data = [
    { month: 'Jan', points: 1200 },
    { month: 'Feb', points: 1500 },
    { month: 'Mar', points: 1800 },
    { month: 'Apr', points: 1650 },
    { month: 'May', points: 2100 },
    { month: 'Jun', points: 2450 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="points" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoyaltyPointsChart;