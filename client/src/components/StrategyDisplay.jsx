import useStore from '../store/investmentStore';
import PieChart from './PieChart';

export default function StrategyDisplay() {
  const { strategy, income } = useStore();

  if (!strategy) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">Your Personalized Investment Plan</h2>
        <p className="mb-4">For a monthly income of <span className="font-semibold">₹{income}</span>:</p>
        <ul className="list-disc pl-6">
          {strategy.allocations.map((item, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{item.category}:</span> {item.percentage}% 
              {item.funds && item.funds.length > 0 && (
                <span> — <span className="text-gray-500">Recommended: {item.funds.join(', ')}</span></span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p>{strategy.allocations} </p>
    </div>
  );
}
