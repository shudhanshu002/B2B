import { callNvidiaJSON } from "./aiService";

export const generateImpactData = async (products: any[]) => {

  const productListString = products
    .map(p => `${p.quantity}x ${p.productName}`)
    .join(", ");

  const prompt = `
Analyze the environmental impact of these products: ${productListString}.

Tasks:
1. Estimate plastic saved (kg) compared to plastic alternatives.
2. Estimate carbon emissions avoided (kg).
3. Calculate equivalent trees planted.
4. Write a short 2-sentence human-readable impact statement.
5. Summarize local sourcing benefits.

Return ONLY valid JSON:

{
  "metrics": {
    "plasticSavedKg": number,
    "carbonAvoidedKg": number,
    "treesEquivalent": number
  },
  "impactStatement": "string",
  "localSourcingSummary": "string"
}
`;

  return await callNvidiaJSON(prompt);
};
