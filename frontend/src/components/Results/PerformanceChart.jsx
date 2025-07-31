import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Calendar, TrendingUp, BarChart } from 'lucide-react';
import Button from '../Common/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PerformanceChart = ({ data = [] }) => {
  const [chartType, setChartType] = useState('line');
  const [timeframe, setTimeframe] = useState('7d');

  // Sample data if none provided
  const defaultData = [
    { date: '2024-01-01', math: 75, english: 82, physics: 68, chemistry: 71, average: 74 },
    { date: '2024-01-02', math: 78, english: 85, physics: 72, chemistry: 74, average: 77 },
    { date: '2024-01-03', math: 82, english: 88, physics: 75, chemistry: 78, average: 81 },
    { date: '2024-01-04', math: 79, english: 86, physics: 73, chemistry: 76, average: 79 },
    { date: '2024-01-05', math: 85, english: 90, physics: 78, chemistry: 82, average: 84 },
    { date: '2024-01-06', math: 88, english: 92, physics: 82, chemistry: 85, average: 87 },
    { date: '2024-01-07', math: 86, english: 89, physics: 80, chemistry: 83, average: 85 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  const getTimeframeData = () => {
    switch (timeframe) {
      case '7d':
        return chartData.slice(-7);
      case '30d':
        return chartData.slice(-30);
      case '90d':
        return chartData.slice(-90);
      default:
        return chartData;
    }
  };

  const timeframeData = getTimeframeData();

  const lineChartData = {
    labels: timeframeData.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Average Score',
        data: timeframeData.map(item => item.average),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Mathematics',
        data: timeframeData.map(item => item.math),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'English',
        data: timeframeData.map(item => item.english),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Physics',
        data: timeframeData.map(item => item.physics),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgb(249, 115, 22)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Chemistry',
        data: timeframeData.map(item => item.chemistry),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgb(236, 72, 153)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const barChartData = {
    labels: timeframeData.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Mathematics',
        data: timeframeData.map(item => item.math),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'English',
        data: timeframeData.map(item => item.english),
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Physics',
        data: timeframeData.map(item => item.physics),
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: 'rgb(249, 115, 22)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Chemistry',
        data: timeframeData.map(item => item.chemistry),
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value) {
            return value + '%';
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={chartType === 'line' ? 'primary' : 'ghost'}
            onClick={() => setChartType('line')}
            icon={TrendingUp}
          >
            Line
          </Button>
          <Button
            size="sm"
            variant={chartType === 'bar' ? 'primary' : 'ghost'}
            onClick={() => setChartType('bar')}
            icon={BarChart}
          >
            Bar
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 relative">
        {chartType === 'line' ? (
          <Line data={lineChartData} options={chartOptions} />
        ) : (
          <Bar data={barChartData} options={chartOptions} />
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {[
          { label: 'Mathematics', value: Math.round(timeframeData.reduce((acc, item) => acc + item.math, 0) / timeframeData.length), color: 'text-blue-600' },
          { label: 'English', value: Math.round(timeframeData.reduce((acc, item) => acc + item.english, 0) / timeframeData.length), color: 'text-purple-600' },
          { label: 'Physics', value: Math.round(timeframeData.reduce((acc, item) => acc + item.physics, 0) / timeframeData.length), color: 'text-orange-600' },
          { label: 'Chemistry', value: Math.round(timeframeData.reduce((acc, item) => acc + item.chemistry, 0) / timeframeData.length), color: 'text-pink-600' },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;