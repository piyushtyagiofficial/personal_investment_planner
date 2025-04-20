import { useState } from 'react';
import useStore from '../store/investmentStore';
import InvestmentForm from '../components/InvestmentForm';
import StrategyDisplay from '../components/StrategyDisplay';
import { generateStrategy } from '../services/gemini';

export default function Home() {
  const { income, riskProfile, setStrategy, setIsLoading, isLoading } = useStore();
  const [error, setError] = useState('');

  const handleFormSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      const strategy = await generateStrategy(income, riskProfile);
      setStrategy(strategy);
    } catch (err) {
      setError('Failed to generate strategy. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Personal Investment Planner</h1>
      <InvestmentForm onSubmit={handleFormSubmit} loading={isLoading} />
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      <StrategyDisplay />
    </div>
  );
}
