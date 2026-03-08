"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotResponse = void 0;
const aiService_1 = require("./aiService");
const getBotResponse = async (userMessage) => {
    const prompt = `
    User Message: "${userMessage}"
    Context: Eco-friendly brand customer support.
    Rules: 
    1. Returns allowed within 30 days.
    2. High priority issues: refunds, broken items, missing orders.
    
    Task: Provide a helpful, short reply and decide if this needs human escalation.
    Return JSON ONLY: { "reply": "string", "shouldEscalate": boolean }
  `;
    return await (0, aiService_1.callNvidiaJSON)(prompt);
};
exports.getBotResponse = getBotResponse;
//# sourceMappingURL=moduleFourService.js.map