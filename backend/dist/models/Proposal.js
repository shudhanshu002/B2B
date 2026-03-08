"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
const mongoose_1 = require("mongoose");
const ProposalSchema = new mongoose_1.Schema({
    clientName: { type: String, required: true },
    budgetLimit: { type: Number, required: true },
    industry: { type: String, required: true },
    suggestedProductMix: [{
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
            productName: { type: String },
            quantity: { type: Number },
            unitPrice: { type: Number },
            lineTotal: { type: Number }
        }],
    totalEstimatedCost: { type: Number },
    impactPositioning: { type: String },
    aiGeneratedAt: { type: Date, default: Date.now }
});
exports.Proposal = (0, mongoose_1.model)('Proposal', ProposalSchema);
//# sourceMappingURL=Proposal.js.map