import { callNvidiaJSON } from "./aiService";

export const getBotResponse = async (userMessage: string) => {
  const prompt = `
    User Message: "${userMessage}"
    Context: Eco-friendly brand customer support.
    Rules: 
    1. Returns allowed within 30 days.
    2. High priority issues: refunds, broken items, missing orders.
    
    Task: Provide a helpful, short reply and decide if this needs human escalation.
    Return JSON ONLY: { "reply": "string", "shouldEscalate": boolean }
  `;
  return await callNvidiaJSON(prompt);
};