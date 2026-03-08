import { Request, Response } from 'express';
import { generateB2BProposalAI } from '../services/moduleTwoService';
import { Proposal } from '../models/Proposal';

export const createProposal = async (req: Request, res: Response) => {
    try {
        const { clientName, budgetLimit, industry } = req.body;

        if (!clientName || !budgetLimit || !industry) {
            return res.status(400).json({ error: 'Missing required fields: clientName, budgetLimit, or industry' });
        }

        // Generating Proposal via AI
        const aiProposalData = await generateB2BProposalAI(industry, budgetLimit);

        // Save Proposal linked to the context of the business
        const newProposal = await Proposal.create({
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
    } catch (error) {
        console.error("Proposal Generation Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error during Proposal generation" });
    }
};
