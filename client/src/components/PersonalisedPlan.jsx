import useStore from '../store/investmentStore';
import PieChart from './PieChart';

export default function StrategyDisplay() {
  const { strategy, income } = useStore();

  if (!strategy) return null;

  // Prepare data for the chart
  const chartData = {
    labels: strategy.allocations.map(item => item.category),
    options: {
      responsive: true,
      animations: {
        radius: {
          duration: 9000,
          easing: 'easeOutBounce',
          delay: (ctx) => ctx.dataIndex * 300, // each slice waits a bit
        },
        backgroundColor: {
          duration: 1000,
          delay: (ctx) => ctx.dataIndex * 300,
        },
        borderWidth: {
          duration: 1000,
          delay: (ctx) => ctx.dataIndex * 300,
        },
      }
    },    
    datasets: [
      {
        label: 'Investment Allocation (%)',
        data: strategy.allocations.map(item => item.percentage),
        backgroundColor: [
          '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'
        ],
        borderWidth: 4,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">
          Your Personalized Investment Plan
        </h2>
        <p className="mb-4">
          For monthly savings of{" "}
          <span className="font-semibold">₹{income}</span>:
        </p>
        <ul className="list-disc pl-6">
          {strategy.allocations.map((item, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{item.category}:</span>{" "}
              {item.percentage}%
              {item.funds && item.funds.length > 0 && (
                <span>
                  {" "}
                  —{" "}
                  <span className="text-gray-500">
                    Recommended: {item.funds.join(", ")}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <PieChart data={chartData} />
      </div>
    </div>
  );
}
