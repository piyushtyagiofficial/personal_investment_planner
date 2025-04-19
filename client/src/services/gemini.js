import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const generateStrategy = async (income, riskProfile) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Create investment strategy for ₹${income}/month with ${riskProfile} risk.
  Include SIPs (40-60%), crypto (5-15%), gold (10-20%), equity. Return JSON: 
  { "allocations": [{"category":"","percentage":,"funds":[]}] }`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text.replace(/``````/g, ''));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
