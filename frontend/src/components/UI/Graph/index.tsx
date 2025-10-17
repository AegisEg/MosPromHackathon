import React from 'react';
import { LineChart, Line, Legend, YAxis, XAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie } from 'recharts';
import './style.scss';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
// recharts.org
function Graph() {
  return (
    <div className="graph">
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
        <XAxis dataKey="name" />
        <YAxis width="auto" label={{ value: 'UV', position: 'insideLeft', angle: -90 }} />
        <Legend align="right" />
        <Tooltip />
      </LineChart>

      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#8884d8" barSize={30} />
      </BarChart>

      <PieChart width={400} height={400}>
        <Pie
          activeShape={{
            fill: 'red',
          }}
          data={
            [
              { name: 'Page A', uv: 590 },
              { name: 'Page B', uv: 590 },
              { name: 'Page C', uv: 868 },
            ]
          }
            dataKey="uv"
          />
        <Tooltip defaultIndex={2} />
      </PieChart>
    </div>
  );
}

export default Graph;
