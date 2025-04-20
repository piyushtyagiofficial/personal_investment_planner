import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const generateStrategy = async (income, riskProfile) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
  You are a financial advisor AI.
  
  Generate an investment strategy for a user who can invest ₹${income} per month and has a ${riskProfile} risk tolerance.
  
  The strategy must include the following allocation ranges:
  - SIPs: 40% to 60%
  - Crypto: 5% to 15%
  - Gold: 10% to 20%
  - Equity: Remaining amount
  
  Return the result in **pure JSON format only**. Do not include any explanations or markdown.
  
  Use this format:
  {
    "allocations": [
      { "category": "SIPs", "percentage": 50, "funds": ["Fund A", "Fund B"] },
      { "category": "Crypto", "percentage": 10, "funds": ["Bitcoin", "Ethereum"] },
      { "category": "Gold", "percentage": 15, "funds": ["SGBs", "Gold ETF"] },
      { "category": "Equity", "percentage": 25, "funds": ["Nifty 50", "Mid-cap Stocks"] }
    ]
  }
  `;
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // or any correct model
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const cleaned = text.replace(/```json|```/g, '').trim();

    try {
      const strategy = JSON.parse(cleaned);
      res.json(strategy);
    } catch (parseError) {
      console.error('JSON Parsing Error:', cleaned);
      res.status(500).json({ error: 'Failed to parse strategy from Gemini' });
    }
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Gemini API failed' });
  }

};
