"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProposal = void 0;
const moduleTwoService_1 = require("../services/moduleTwoService");
const Proposal_1 = require("../models/Proposal");
const createProposal = async (req, res) => {
    try {
        const { clientName, budgetLimit, industry } = req.body;
        if (!clientName || !budgetLimit || !industry) {
            return res.status(400).json({ error: 'Missing required fields: clientName, budgetLimit, or industry' });
        }
        // Generating Proposal via AI
        const aiProposalData = await (0, moduleTwoService_1.generateB2BProposalAI)(industry, budgetLimit);
        // Save Proposal linked to the context of the business
        const newProposal = await Proposal_1.Proposal.create({
            clientName,
            budgetLimit,
            industry,
            ...aiProposalData,
        });
        res.status(201).json({
            success: true,
            message: 'B2B Proposal Generated Successfully',
            data: newProposal,
        });
    }
    catch (error) {
        console.error("Proposal Generation Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error during Proposal generation" });
    }
};
exports.createProposal = createProposal;
//# sourceMappingURL=proposalController.js.map