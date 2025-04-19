import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function PieChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [{
      data: data.map(item => item.percentage),
      backgroundColor: ['#2563eb', '#f59e42', '#22c55e', '#e11d48', '#a21caf'],
    }]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md my-4">
      <h3 className="text-lg font-semibold mb-2">Investment Allocation</h3>
      <Pie data={chartData} options={{ responsive: true }} />
    </div>
  );
}
