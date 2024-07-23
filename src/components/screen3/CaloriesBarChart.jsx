import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../../css/barChart.css";
import { useNavigate } from 'react-router-dom';

const generateRandomData = () => {
  const data = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      calories: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return data;
};

const data = generateRandomData();

const CaloriesBarChart = () => {
  const navigate = useNavigate();
  const backToHome=()=>{
    navigate('/');
  }
  return (
    <>
      <div className="chart-container">
        <h2 className="chart-title">Calories Trend for the Last 7 Days</h2>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calories" fill="#8884d8" />
        </BarChart>
      </div>
      <button className='save-btn' onClick={backToHome}>Go to Home</button>
    </>
  );
};

export default CaloriesBarChart;
