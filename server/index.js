// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Routes
app.get('/', (req, res) => {
  res.send('Investment Strategy API');
});

app.post('/api/generate-strategy', async (req, res) => {
  const { income, riskProfile } = req.body;

  const prompt = `
    Create investment strategy for ₹${income}/month with ${riskProfile} risk.
    Include SIPs (40-60%), crypto (5-15%), gold (10-20%), equity.
    Return JSON: 
    {
      "allocations": [
        { "category": "", "percentage": , "funds": [] }
      ]
    }
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    const cleaned = text.replace(/```json|```/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Gemini API failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
