"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImpactData = void 0;
const aiService_1 = require("./aiService");
const generateImpactData = async (products) => {
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
    return await (0, aiService_1.callNvidiaJSON)(prompt);
};
exports.generateImpactData = generateImpactData;
//# sourceMappingURL=moduleThreeService.js.map