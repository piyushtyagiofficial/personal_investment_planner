import { create } from 'zustand';

const useStore = create((set) => ({
  income: '',
  riskProfile: 'low',
  strategy: '',
  isLoading: false,
  
  setIncome: (income) => set({ income }),
  setRiskProfile: (profile) => set({ riskProfile: profile }),
  setStrategy: (strategy) => set({ strategy }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useStore;