import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const categorizeProductAI = async (name: string, description: string) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `
    Analyze this product: Name: "${name}", Description: "${description}".
    1. Assign a primary category from: [Kitchen, Lifestyle, Personal Care, Office].
    2. Suggest a specific sub-category.
    3. Generate 7 SEO tags.
    4. List sustainability filters (e.g., plastic-free, vegan).
    
    Return ONLY this JSON format:
    {
      "category": "string",
      "subCategory": "string",
      "seoTags": ["string"],
      "sustainabilityFilters": ["string"]
    }
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};