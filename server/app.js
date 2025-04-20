import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectToDB from './db/db.js'; 
import userRouter from './routes/user.routes.js';



// Load env variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectToDB();


// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/users', userRouter);

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Gemini route
app.post('/api/generate-strategy', async (req, res) => {
  const { income, riskProfile } = req.body;
  
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
      res.status(200).json(strategy);
    } catch (parseError) {
      console.error('JSON Parsing Error:', cleaned);
      res.status(500).json({ error: 'Failed to parse strategy from Gemini' });
    }
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Gemini API failed' });
  }

});

export default app;
 
