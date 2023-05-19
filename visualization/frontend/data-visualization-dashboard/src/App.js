

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import './App.css';

import 'chart.js/auto';

const App = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: data.map((item) => item.topic),
          datasets: [
            {
              label: 'Intensity',
              data: data.map((item) => item.intensity),
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return (
    <div className="container">
      <h1>Data Visualization Dashboard</h1>
      <div className="chart-container">
        <canvas id="chart" ref={chartRef} />
      </div>
      <div>
        {data.map((item) => (
          <div className="data-item" key={item.title}>
            <h2>{item.title}</h2>
            <p>Intensity: {item.intensity}</p>
            <p>Topic: {item.topic}</p>
            <p>Insight: {item.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
