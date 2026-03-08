"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateB2BProposalAI = void 0;
const axios_1 = __importDefault(require("axios"));
const Product_1 = require("../models/Product");
const generateB2BProposalAI = async (industry, budget) => {
    // Fetch existing categories from Module 1
    const existingCategories = await Product_1.Product.distinct("category");
    const prompt = `
Create a B2B sustainable product proposal for a client in the ${industry} industry.
Total Budget: $${budget}.
Available Categories: ${existingCategories.join(", ") || "Eco-friendly Office, Kitchen, Lifestyle"}.

Instructions:
1. Suggest 3-5 specific products relevant to ${industry}.
2. Distribute quantities so the total cost is between 80% and 95% of $${budget}.
3. Provide a professional 'impactPositioning' summary focusing on sustainability.

Return ONLY valid JSON:

{
  "suggestedProductMix": [
    { "productName": "string", "quantity": number, "unitPrice": number, "lineTotal": number }
  ],
  "totalEstimatedCost": number,
  "impactPositioning": "string"
}
`;
    const response = await axios_1.default.post("https://integrate.api.nvidia.com/v1/chat/completions", {
        model: "meta/llama3-70b-instruct",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.2,
        max_tokens: 600
    }, {
        headers: {
            Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
            "Content-Type": "application/json"
        }
    });
    const text = response.data.choices[0].message.content;
    // Clean markdown if AI returns ```json
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    // Extract JSON safely
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}") + 1;
    const jsonString = cleaned.substring(start, end);
    return JSON.parse(jsonString);
};
exports.generateB2BProposalAI = generateB2BProposalAI;
//# sourceMappingURL=moduleTwoService.js.map