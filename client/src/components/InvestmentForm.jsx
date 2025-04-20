import { useState } from 'react';
import useStore from '../store/investmentStore';
import axios from 'axios';

export default function InvestmentForm({ onSubmit, loading }) {
  const { income, setIncome, riskProfile, setRiskProfile } = useStore();
  const [strategy, setStrategy] = useState("")
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!income || income <= 0) {
      setError('Please enter a valid income.');
      return;
    }
  
    setError('');
    const formData = {
      income: parseFloat(income),
      riskProfile,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/api/generate-strategy', formData);
      setStrategy(response.data);
      setIncome('');
    } catch (err) {
      console.error('Error generating strategy:', err);
      setError('Failed to generate strategy. Please try again.');
    }
  };  

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
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
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>
    </form>
  );
}
