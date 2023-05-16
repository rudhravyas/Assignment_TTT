import React, { useState } from 'react';
import "./App.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const text = await response.text();
    const words = text.split(/\s+/);
    const counts = {};
    words.forEach((word) => {
      counts[word] = (counts[word] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20);
    const chartData = sorted.map(([word, count]) => ({ word, count }));
    setData(chartData);
  };

  const exportData = () => {
    const csv = data.map(({ word, count }) => `${word},${count}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'histogram.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    
    <div id='div'>
      <h2>TTT Assignment</h2>
      <button className='btn' onClick={fetchData}>Submit</button>
      {data.length > 0 && (
        <>
        <div className='chart'>
          <BarChart width={600} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#e89988" />
          </BarChart>
        </div>
          <button className="btn" onClick={exportData}>Export</button>
      </>
      )}
    </div>
  );
}

export default App;