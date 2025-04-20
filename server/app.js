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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    const cleaned = text.replace(/```json|```/g, '').trim();

    // console.log('Gemini result:', result);
    // console.log('Raw Gemini Response:', text);
    // console.log('Gemini Response:', cleaned);

    res.status(200).json({ response: cleaned });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Gemini API failed' });
  }
});

export default app;
 
