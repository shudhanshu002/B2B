"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImpactReport = void 0;
const ImpactReport_1 = require("../models/ImpactReport");
const aiService_1 = require("../services/aiService");
const createImpactReport = async (req, res) => {
    try {
        const { orderId, products } = req.body; // products which --> is an array of {name, qty}
        const prompt = `
      Estimate environmental impact for: ${JSON.stringify(products)}.
      Calculate plastic saved (kg), carbon avoided (kg), and tree equivalents.
      Write a 2-sentence impactStatement.
      Return JSON: { "metrics": { "plasticSavedKg": 0, "carbonAvoidedKg": 0, "treesEquivalent": 0 }, "impactStatement": "", "localSourcingSummary": "" }
    `;
        const aiImpact = await (0, aiService_1.callNvidiaJSON)(prompt);
        const report = await ImpactReport_1.ImpactReport.create({ orderId, ...aiImpact });
        res.status(201).json({ success: true, data: report });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Impact Report Failed" });
    }
};
exports.createImpactReport = createImpactReport;
//# sourceMappingURL=impactController.js.map