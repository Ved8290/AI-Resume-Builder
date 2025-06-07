// gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';

// dotenv.config();
const GEMINI_API_KEY = "AIzaSyC1ve2-r_Qp66Cy3JdMwAynLU83TFJgwbk";

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function aimodel(que) {
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(que);
  const response = await result.response;
  const text = await response.text();
  return text;
}

// Optional local test
const r = async () => {
  const t = await aimodel("hii");
  console.log(t);
};

r();
