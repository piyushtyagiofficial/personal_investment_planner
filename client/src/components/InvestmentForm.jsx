import useStore from '../store/investmentStore';

export default function InvestmentForm() {
  const { income, setIncome, riskProfile, setRiskProfile } = useStore();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Monthly Income (₹)</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your monthly income"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Risk Profile</label>
        <select
          value={riskProfile}
          onChange={(e) => setRiskProfile(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}