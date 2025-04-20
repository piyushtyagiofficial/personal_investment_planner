import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function PieChart({ data }) {
  if (!data || !data.labels || !data.datasets) return null;

  return (
    <div className="bg-white p-4 rounded-lg my-4">
      <h3 className="text-lg font-semibold mb-2">Investment Allocation</h3>
      <Pie data={data} options={{ responsive: true }} />
    </div>
  );
}
