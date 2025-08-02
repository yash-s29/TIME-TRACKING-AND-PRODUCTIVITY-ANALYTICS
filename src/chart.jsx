import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './chart.css'; // Import the CSS file

const data = [
  {
    name: 'Mon', activity: 2400,
  },
  {
    name: 'Tue', activity: 1398,
  },
  {
    name: 'Wed', activity: 9800,
  },
  {
    name: 'Thu', activity: 3908,
  },
  {
    name: 'Fri', activity: 4800,
  },
  {
    name: 'Sat', activity: 3800,
  },
  {
    name: 'Sun', activity: 4300,
  },
];

const Chart = () => {
  return (
    <div className="chart-container">
      <h2>Weekly Activity Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activity" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
