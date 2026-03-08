"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactReport = void 0;
const mongoose_1 = require("mongoose");
const ImpactReportSchema = new mongoose_1.Schema({
    orderId: { type: String, required: true },
    clientName: { type: String },
    metrics: {
        plasticSavedKg: Number,
        carbonAvoidedKg: Number,
        treesEquivalent: Number
    },
    impactStatement: { type: String }, // ai-generated human-readable story
    localSourcingSummary: { type: String },
    generatedAt: { type: Date, default: Date.now }
});
exports.ImpactReport = (0, mongoose_1.model)('ImpactReport', ImpactReportSchema);
//# sourceMappingURL=ImpactReport.js.map